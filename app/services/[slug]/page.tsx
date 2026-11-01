import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import site from "@/config/site";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export function generateStaticParams() { return site.services.map((service) => ({ slug: service.slug })); }

export function generateMetadata({ params }: Props): Metadata {
  const service = site.services.find((item) => item.slug === params.slug);
  if (!service) return { title: "Service introuvable" };
  const title = service.metaTitle || `${service.title} à ${site.city} | ${site.businessName}`;
  const description = service.metaDescription || `${service.summary} Découvrez le service ${service.title.toLowerCase()} proposé à ${site.city}.`;
  return {
    title,
    description,
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/services/${service.slug}` } } : {}),
    openGraph: { title, description, locale: "fr_FR", type: "website" }
  };
}

export default function ServicePage({ params }: Props) {
  const service = site.services.find((item) => item.slug === params.slug);
  if (!service) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Service", name: service.title, serviceType: service.title, description: service.description, provider: { "@type": "ProfessionalService", name: site.businessName, ...(site.phone ? { telephone: site.phone } : {}), ...(site.address ? { address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressCountry: "FR" } } : {}) }, areaServed: site.serviceAreas.map((area) => ({ "@type": "City", name: area })) };
  const phoneHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : undefined;
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><SiteHeader /><main className="bg-page"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-sm text-primary/55"><Link href="/" className="hover:text-primary">Accueil</Link><span aria-hidden="true">/</span><Link href="/#services" className="hover:text-primary">Nos services</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-semibold text-primary">{service.title}</span></nav><Link href="/#services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary/65 hover:text-primary"><ArrowLeft className="h-4 w-4" />Tous nos services</Link><div className="mt-7 grid gap-12 lg:grid-cols-[1fr_.75fr] lg:items-start"><article><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Société de nettoyage à {site.city}</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-primary sm:text-5xl">{service.title}</h1><p className="mt-5 text-lg leading-8 text-primary/70">{service.summary}</p><p className="mt-8 leading-8 text-primary/75">{service.description}</p><h2 className="mt-10 text-xl font-bold text-primary">Une prestation définie selon votre site</h2><ul className="mt-5 space-y-4">{service.details.map((detail) => <li key={detail} className="flex gap-3 text-sm leading-6 text-primary/70"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-primary"><Check className="h-3.5 w-3.5" /></span>{detail}</li>)}</ul></article><aside className="rounded-2xl bg-primary p-7 text-white shadow-soft sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10"><ShieldCheck className="h-6 w-6 text-blue-200" /></span><h2 className="mt-6 text-2xl font-bold">Étudions votre besoin</h2><p className="mt-3 text-sm leading-6 text-white/65">Parlons de votre site, de vos contraintes et du périmètre de la prestation.</p><div className="mt-7 flex flex-col gap-3"><Button asChild><Link href="/#contact">Demander une étude<ArrowRight className="h-4 w-4" /></Link></Button>{phoneHref && <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href={phoneHref}><Phone className="h-4 w-4" />Prendre RDV par téléphone</a></Button>}</div><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/45">{site.businessName} · {site.city}</p></aside></div><div className="mt-16 border-t border-primary/10 pt-8"><p className="text-sm text-primary/55">Besoin d’une autre prestation ? <Link href="/#services" className="font-semibold text-primary underline underline-offset-4">Découvrez nos services</Link>.</p></div></div></main><SiteFooter /></>;
}
