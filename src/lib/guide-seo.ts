import type { Metadata } from "next";
import type { GuideSummary, GuideLocale } from "../content/guides";

export function guideMetadata(
  guide: GuideSummary,
  locale: GuideLocale,
  origin?: string,
): Metadata {
  const path = `/guides/${guide.slug}`;
  const url = origin ? `${origin}/${locale}${path}` : undefined;
  return {
    title: guide.title[locale],
    description: guide.excerpt[locale],
    alternates: origin
      ? {
          canonical: url,
          languages: {
            th: `${origin}/th${path}`,
            en: `${origin}/en${path}`,
            "x-default": `${origin}/th${path}`,
          },
        }
      : undefined,
    openGraph: {
      title: guide.title[locale],
      description: guide.excerpt[locale],
      type: guide.complete ? "article" : "website",
      locale: locale === "th" ? "th_TH" : "en_GB",
      siteName: "Thonburi Master",
      ...(url ? { url } : {}),
    },
  };
}

export function guideStructuredData(
  guide: GuideSummary,
  locale: GuideLocale,
  origin?: string,
) {
  if (!origin) return undefined;
  const url = `${origin}/${locale}/guides/${guide.slug}`;
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "th" ? "หน้าแรก" : "Home",
        item: `${origin}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "th"
            ? "แนวทางวางแผนการผลิต"
            : "Production planning guidelines",
        item: `${origin}/${locale}/technical-insights#guidelines`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title[locale],
        item: url,
      },
    ],
  };
  // Preview pages are not labelled as completed editorial articles.
  const article = guide.complete
    ? [
        {
          "@type": "Article",
          "@id": `${url}#article`,
          url,
          headline: guide.title[locale],
          description: guide.excerpt[locale],
          inLanguage: locale,
          mainEntityOfPage: url,
          publisher: {
            "@type": "Organization",
            name: "Thonburi Master",
            url: `${origin}/${locale}`,
          },
        },
      ]
    : [];
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbs, ...article],
  };
}

export function serialiseStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
