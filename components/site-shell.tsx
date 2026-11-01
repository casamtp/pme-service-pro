import Link from "next/link";
import { ArrowRight, Building2, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/config/site";

const phoneHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : undefined;

export function SiteHeader() {
  return <header className="sticky top-0 z-30 border-b border-primary/10 bg-white/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8"><Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.businessName}, accueil`}><span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white"><Building2 className="h-5 w-5" /></span><span className="leading-tight"><span className="block text-sm font-bold tracking-tight text-primary">{site.businessName}</span><span className="mt-1 block text-[11px] font-semibold uppercase tracking-[.12em] text-primary/55">{site.tagline}</span></span></Link><nav className="hidden items-center gap-6 text-sm font-medium text-primary/65 lg:flex" aria-label="Navigation principale"><Link href="/#services" className="hover:text-primary">Services</Link><Link href="/#equipe" className="hover:text-primary">Équipe</Link><Link href="/#chiffres" className="hover:text-primary">Chiffres clés</Link><Link href="/#faq" className="hover:text-primary">FAQ</Link><Link href="/#contact" className="hover:text-primary">Contact</Link></nav><div className="flex items-center gap-2">{phoneHref && <a href={phoneHref} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 xl:flex"><Phone className="h-4 w-4" />{site.phone}</a>}<Button asChild size="sm"><Link href={phoneHref || "/#contact"}>{phoneHref ? <><Phone className="h-4 w-4" />RDV téléphonique</> : <>Nous contacter<ArrowRight className="h-4 w-4" /></>}</Link></Button></div></div></header>;
}

export function SiteFooter() {
  return <footer className="bg-primary py-9 text-white/75"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-sm sm:flex-row sm:text-left lg:px-8"><Link href="/" className="inline-flex items-center gap-2 font-semibold text-white"><ShieldCheck className="h-5 w-5 text-accent" />{site.businessName}</Link><span>{site.tagline}{site.city ? ` · ${site.city}` : ""}</span><div className="flex flex-wrap items-center justify-center gap-4"><Link href="/#services" className="hover:text-white">Services</Link><Link href="/#contact" className="hover:text-white">Contact</Link>{site.email && <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>}</div><span className="text-white/50">© {new Date().getFullYear()} {site.businessName}</span></div></footer>;
}
