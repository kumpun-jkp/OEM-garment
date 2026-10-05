import { locale as routeLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content/translations";
import { createTranslator, isLocale, localeHref } from "./locale";
import type { Metadata } from "next";

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
    return { title: createTranslator(dictionaries[locale])(title) };
  };
}
