"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  createTranslator,
  localeHref,
  persistLocale,
  type Dictionary,
  type Locale,
} from "@/lib/locale";

const LocaleContext = createContext<ReturnType<typeof makeLocale> | null>(null);
function makeLocale(locale: Locale, dictionary: Dictionary) {
  return {
    locale,
    isThai: locale === "th",
    t: createTranslator(dictionary),
    href: (path: string) => localeHref(path, locale),
  };
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo(
    () => makeLocale(locale, dictionary),
    [locale, dictionary],
  );
  useEffect(() => persistLocale(locale), [locale]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is required.");
  return context;
}
