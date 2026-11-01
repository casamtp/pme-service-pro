import type { MetadataRoute } from "next";
import site from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!base) return [];
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...site.services.map((service) => ({ url: `${base}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))
  ];
}
