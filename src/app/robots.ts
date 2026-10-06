import type { MetadataRoute } from "next";
import { publicIndexingEnabled, publicSiteOrigin } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const origin = publicSiteOrigin();
  return {
    rules: publicIndexingEnabled()
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap:
      origin && publicIndexingEnabled() ? `${origin}/sitemap.xml` : undefined,
  };
}
