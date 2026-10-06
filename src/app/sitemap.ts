import type { MetadataRoute } from "next";
import { publicSiteOrigin, publicIndexingEnabled } from "@/lib/site-config";
import { guides, guidePath } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicSiteOrigin();
  if (!origin || !publicIndexingEnabled()) return [];
  return [
    "",
    "/about",
    "/our-work",
    "/oem-products",
    "/oem-journey",
    "/technical-insights",
    "/start-your-project",
    "/contact",
    ...guides.map((guide) => guidePath(guide.slug)),
  ].flatMap((path) =>
    ["th", "en"].map((locale) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: { th: `${origin}/th${path}`, en: `${origin}/en${path}` },
      },
    })),
  );
}
