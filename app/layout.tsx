import type { Metadata, Viewport } from "next";
import site from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  title: { default: site.seo.title, template: `%s | ${site.businessName}` },
  description: site.seo.description,
  keywords: [site.seo.targetPhrase, "nettoyage professionnel Montpellier", "gardiennage Montpellier", "entretien de bureaux"],
  openGraph: { title: site.seo.title, description: site.seo.description, locale: "fr_FR", type: "website", ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}) },
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL } } : {}),
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: site.backgroundColor };

function rgbChannels(hex: string) {
  const value = hex.replace(/^#/, "");
  if (!/^[\da-fA-F]{6}$/.test(value)) return "91 61 69";
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)).join(" ");
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body style={{ "--site-primary": rgbChannels(site.primaryColor), "--site-accent": rgbChannels(site.accentColor), "--site-background": rgbChannels(site.backgroundColor) } as React.CSSProperties}>{children}</body></html>;
}
