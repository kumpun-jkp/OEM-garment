export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";
export const localeCookie = "site-locale";

export function persistLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export function isLocale(value: unknown): value is Locale {
  return value === "th" || value === "en";
}

/** Change only the locale segment; preserve query, hash and stable system values. */
export function localeHref(href: string, locale: Locale): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    /^\/(?:api|_next|media|icons)(?:\/|\?|$)/.test(href)
  )
    return href;
  const path = href.replace(/^\/(?:th|en)(?=\/|\?|#|$)/, "");
  return `/${locale}${path === "/" ? "" : path}`;
}

export type Dictionary = Readonly<Record<string, string>>;

/** Translate display copy only. Identifiers and submitted values stay stable. */
export function createTranslator(dictionary: Dictionary) {
  return function t<T>(
    value: T,
    parameters?: Record<string, string | number>,
  ): T {
    if (typeof value !== "string") return value;
    const key = value.trim().replace(/\s+/g, " ");
    const translated = dictionary[key];
    const text =
      translated === undefined
        ? value
        : value.replace(value.trim(), translated);
    return (
      parameters
        ? text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
            parameters[name] === undefined
              ? placeholder
              : String(parameters[name]),
          )
        : text
    ) as T;
  };
}
