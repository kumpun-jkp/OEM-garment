import type { Metadata } from "next";
import "@fontsource/athiti/latin-400.css";
import "@fontsource/athiti/thai-400.css";
import "@fontsource/athiti/latin-600.css";
import "@fontsource/athiti/thai-600.css";
import "@fontsource/athiti/latin-700.css";
import "@fontsource/athiti/thai-700.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared-sections";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Thonburi Master | Garment Manufacturing",
    template: "%s | Thonburi Master",
  },
  description:
    "Thonburi Master — garment manufacturing, OEM products, production processes, and project enquiries.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
