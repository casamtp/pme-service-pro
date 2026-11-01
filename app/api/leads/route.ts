import { NextResponse } from "next/server";
import site from "@/config/site";
import { supabaseAdminConfig, supabaseAdminHeaders } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const db = supabaseAdminConfig();
    if (!db) return NextResponse.json({ error: "Le formulaire n’est pas configuré pour le moment." }, { status: 503 });
    const body = await request.json();
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const allowedServices = new Set([...site.services.map((item) => item.title), "Autre demande"]);
    if (!company || company.length > 160 || !name || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !phone || phone.length > 30 || !allowedServices.has(service) || message.length < 10 || message.length > 4000 || body.consent !== "true") {
      return NextResponse.json({ error: "Vérifiez les informations du formulaire." }, { status: 400 });
    }
    const response = await fetch(`${db.url}/rest/v1/leads`, {
      method: "POST", headers: supabaseAdminHeaders(db.key, { Prefer: "return=minimal" }),
      body: JSON.stringify({ company, contact_name: name, email, phone, service, message, status: "new" })
    });
    if (!response.ok) return NextResponse.json({ error: "La demande n’a pas pu être enregistrée. Réessayez ou appelez-nous." }, { status: 502 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }
}
