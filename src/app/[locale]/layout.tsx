import type { Metadata } from "next";
import "@fontsource/athiti/latin-400.css";
import "@fontsource/athiti/thai-400.css";
import "@fontsource/athiti/latin-500.css";
import "@fontsource/athiti/thai-500.css";
import "@fontsource/athiti/latin-600.css";
import "@fontsource/athiti/thai-600.css";
import "@fontsource/athiti/latin-700.css";
import "@fontsource/athiti/thai-700.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared-sections";
import { LocaleProvider } from "@/components/locale-provider";
import { MotionSurface } from "@/components/motion-surface";
import { dictionaries } from "@/content/translations";
import { createTranslator, isLocale, locales } from "@/lib/locale";
import { notFound } from "next/navigation";
import "../globals.css";
import "../silk-motion.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = createTranslator(dictionaries[locale]);
  return {
    title: {
      default: t("Thonburi Master | Garment Manufacturing"),
      template: "%s | Thonburi Master",
    },
    description: t(
      "Thonburi Master garment manufacturing, with OEM apparel services through TM Apparel. Explore materials, production and project enquiries.",
    ),
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = createTranslator(dictionaries[locale]);
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale} dictionary={dictionaries[locale]}>
          <a className="skip-link" href="#main-content">
            {t("Skip to content")}
          </a>
          <Header />
          <MotionSurface>{children}</MotionSurface>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
