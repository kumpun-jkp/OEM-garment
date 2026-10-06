import { locale as routeLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content/translations";
import { createTranslator, isLocale, localeHref } from "./locale";
import type { Metadata } from "next";
import { publicSiteOrigin } from "./site-config";

const pagePaths: Record<string, string> = {
  "About Us": "/about",
  "Our Work": "/our-work",
  "Garment Style References": "/oem-products",
  "OEM Journey": "/oem-journey",
  "Technical Insights": "/technical-insights",
  "Start Your Project": "/start-your-project",
  "Contact Us": "/contact",
};

export async function getTranslations() {
  const locale = await routeLocale();
  if (!isLocale(locale)) notFound();
  return {
    locale,
    isThai: locale === "th",
    t: createTranslator(dictionaries[locale]),
    href: (path: string) => localeHref(path, locale),
  };
}

export function pageMetadata(title: string) {
  return async ({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = createTranslator(dictionaries[locale]);
    const origin = publicSiteOrigin();
    const path = pagePaths[title];
    const url =
      origin && path !== undefined ? `${origin}/${locale}${path}` : undefined;
    return {
      title: t(title),
      alternates: url
        ? {
            canonical: url,
            languages: {
              th: `${origin}/th${path}`,
              en: `${origin}/en${path}`,
              "x-default": `${origin}/th${path}`,
            },
          }
        : undefined,
      openGraph: url
        ? {
            title: `${t(title)} | Thonburi Master`,
            url,
            siteName: "Thonburi Master",
            type: "website",
            locale: locale === "th" ? "th_TH" : "en_GB",
          }
        : undefined,
    };
  };
}
