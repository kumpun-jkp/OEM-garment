import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, localeCookie, locales } from "./lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    // Prefetches must not overwrite the visitor's selected language.
    if (request.headers.get("sec-fetch-dest") === "document")
      response.cookies.set(localeCookie, pathname.split("/")[1], {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      });
    return response;
  }

  // Redirect if there is no locale
  const preference = request.cookies.get(localeCookie)?.value;
  request.nextUrl.pathname = `/${isLocale(preference) ? preference : defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public folder images
    "/((?!_next|media(?:/|$)|icons(?:/|$)|api(?:/|$)|favicon.ico|.*\\.[^/]+$).*)",
  ],
};
