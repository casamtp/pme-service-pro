"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import site from "@/config/site";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending"); setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Le message n’a pas pu être envoyé.");
      form.reset(); setState("sent");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Le message n’a pas pu être envoyé."); setState("error"); }
  }
  const input = "mt-2 h-12 w-full rounded-lg border border-primary/15 bg-white px-4 text-sm text-primary outline-none transition placeholder:text-primary/35 focus:border-accent focus:ring-4 focus:ring-accent/10";
  return <form onSubmit={submit} className="space-y-5" aria-label="Formulaire de contact professionnel">
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-primary/80">Société<input name="company" autoComplete="organization" required maxLength={160} className={input} placeholder="Nom de votre société" /></label><label className="text-sm font-semibold text-primary/80">Votre nom<input name="name" autoComplete="name" required maxLength={120} className={input} placeholder="Nom et prénom" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-primary/80">E-mail professionnel<input name="email" type="email" autoComplete="email" required maxLength={254} className={input} placeholder="vous@entreprise.fr" /></label><label className="text-sm font-semibold text-primary/80">Téléphone<input name="phone" type="tel" autoComplete="tel" required maxLength={30} className={input} placeholder="Votre numéro direct" /></label></div>
    <label className="block text-sm font-semibold text-primary/80">Prestation concernée<select name="service" required defaultValue="" className={input}><option value="" disabled>Choisir une prestation</option>{site.services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option value="Autre demande">Autre demande</option></select></label>
    <label className="block text-sm font-semibold text-primary/80">Votre besoin<textarea name="message" required minLength={10} maxLength={4000} className="mt-2 min-h-36 w-full rounded-lg border border-primary/15 bg-white p-4 text-sm text-primary outline-none transition placeholder:text-primary/35 focus:border-accent focus:ring-4 focus:ring-accent/10" placeholder="Type de site, surface approximative, fréquence souhaitée, horaires ou contexte de votre demande…" /></label>
    <label className="flex items-start gap-3 text-xs leading-5 text-primary/60"><input type="checkbox" name="consent" value="true" required className="mt-1 accent-blue-700" /><span>J’accepte que mes informations soient utilisées pour répondre à cette demande.</span></label>
    {state === "sent" && <p role="status" className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-5 w-5" />Votre demande a bien été transmise. Merci.</p>}
    {state === "error" && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><Button type="submit" size="lg" disabled={state === "sending"}>{state === "sending" ? <><LoaderCircle className="h-4 w-4 animate-spin" />Envoi en cours</> : <>Envoyer ma demande<ArrowRight className="h-4 w-4" /></>}</Button><span className="text-xs text-primary/50">Sans engagement · Réponse par téléphone ou e-mail</span></div>
    <p className="text-[11px] leading-5 text-primary/45">Les champs marqués obligatoires sont nécessaires pour traiter votre demande. N’incluez pas de données sensibles dans votre message.</p>
  </form>;
}
