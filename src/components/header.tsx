"use client";
import { useLocale } from "@/components/locale-provider";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/site";
import { ProductDirectory } from "./product-directory";
import { AppIcon } from "./app-icon";
import { persistLocale, localeHref, type Locale } from "@/lib/locale";

export function Header() {
  const { t, href: localHref, locale, isThai } = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentPage = pathname.replace(/^\/(th|en)/, "") || "/";
  const currentNavigation = (href: string) =>
    currentPage === href
      ? "page"
      : href === "/technical-insights" && currentPage.startsWith("/guides/")
        ? "location"
        : undefined;
  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    persistLocale(nextLocale);
    closeMenus();
    router.push(
      localeHref(`${pathname}${location.search}${location.hash}`, nextLocale),
      { scroll: currentPage.startsWith("/guides/") && Boolean(location.hash) },
    );
  }
  const [workOpen, setWorkOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const workTrigger = useRef<HTMLButtonElement>(null);
  const focusDirectory = useRef(false);
  const closeMenus = () => {
    setOpen(false);
    setWorkOpen(false);
  };
  useEffect(() => {
    if (workOpen && focusDirectory.current) {
      headerRef.current
        ?.querySelector<HTMLAnchorElement>("#work-mega-menu a")
        ?.focus();
      focusDirectory.current = false;
    }
  }, [workOpen]);
  useEffect(() => {
    if (!workOpen && !open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false);
        setWorkOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [workOpen, open]);
  return (
    <header
      ref={headerRef}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
      }}
      onKeyDown={(event) => {
        if (workOpen && event.key === "Escape") {
          setWorkOpen(false);
          workTrigger.current?.focus();
        } else if (open && event.key === "Escape") {
          setOpen(false);
          document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Link
          className="wordmark"
          href={localHref(`/${locale || "th"}`)}
          aria-label={t("Thonburi Master home")}
          onClick={closeMenus}
        >
          <strong>
            {t("THONBURI MASTER")}
            <span>{t("THAILAND")}</span>
          </strong>
          <span className="wordmark-tagline">{t("Garment manufacturing")}</span>
        </Link>
        <nav className="desktop-nav" aria-label={t("Main navigation")}>
          {navigation.map((item) =>
            item.href === "/our-work" ? (
              <button
                key={item.href}
                ref={workTrigger}
                className="work-menu-trigger"
                type="button"
                aria-expanded={workOpen}
                aria-controls="work-mega-menu"
                aria-current={
                  currentPage === "/our-work" || currentPage === "/oem-products"
                    ? "page"
                    : undefined
                }
                onClick={() => setWorkOpen(!workOpen)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (workOpen) {
                      headerRef.current
                        ?.querySelector<HTMLAnchorElement>("#work-mega-menu a")
                        ?.focus();
                    } else {
                      focusDirectory.current = true;
                      setWorkOpen(true);
                    }
                  }
                }}
              >
                {t(isThai ? item.th : item.label)}
                {t(" ")}
                <AppIcon name="expand" size={16} className="disclosure-icon" />
              </button>
            ) : (
              <Link
                key={item.href}
                href={localHref(
                  `/${locale || "th"}${item.href === "/" ? "" : item.href}`,
                )}
                aria-current={currentNavigation(item.href)}
                onClick={closeMenus}
              >
                {t(isThai ? item.th : item.label)}
              </Link>
            ),
          )}
        </nav>
        <nav
          id="work-mega-menu"
          className="work-mega-menu"
          aria-label={t(isThai ? "ประเภทสินค้า" : "Our work garment directory")}
          hidden={!workOpen}
        >
          <ProductDirectory onNavigate={closeMenus} />
        </nav>
        <div className="header-actions">
          <div
            className="language-control"
            aria-label={t("Navigation language")}
          >
            <button
              type="button"
              onClick={() => switchLocale("en")}
              aria-pressed={!isThai}
              aria-label={t("Switch to English")}
            >
              {t("EN")}
            </button>
            <button
              type="button"
              onClick={() => switchLocale("th")}
              aria-pressed={isThai}
              aria-label={t("Switch to Thai")}
            >
              {t("TH")}
            </button>
          </div>
          <Link
            className="button button--primary header-cta"
            href={localHref(`/${locale || "th"}/start-your-project`)}
          >
            {t(isThai ? "เริ่มโปรเจกต์" : "Start your project")}
            <AppIcon name="outward" className="button-icon" />
          </Link>
          <Link
            className="account-link"
            href={localHref(`/${locale || "th"}/start-your-project`)}
            aria-label={t("Project enquiry")}
          >
            <AppIcon name="person" size={20} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={t(open ? "Close menu" : "Open menu")}
            aria-controls={open ? "mobile-navigation" : undefined}
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);
              setWorkOpen(false);
            }}
          >
            {t(open ? "Close" : "Menu")}
            <AppIcon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={t("Mobile navigation")}
          >
            {[
              ...navigation,
              {
                href: "/oem-products",
                label: "Garment Style References",
                th: "แบบเสื้อผ้าอ้างอิง",
              },
            ].map((item) =>
              item.href === "/our-work" ? (
                <details key={item.href} className="mobile-work-directory">
                  <summary>
                    <AppIcon name="work" />
                    {t(isThai ? item.th : item.label)}
                    <AppIcon name="expand" className="disclosure-icon" />
                  </summary>
                  <ProductDirectory compact onNavigate={closeMenus} />
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={localHref(
                    `/${locale || "th"}${item.href === "/" ? "" : item.href}`,
                  )}
                  aria-current={currentNavigation(item.href)}
                  onClick={closeMenus}
                >
                  {t(isThai ? item.th : item.label)}
                </Link>
              ),
            )}
            <Link
              href={localHref(`/${locale || "th"}/start-your-project`)}
              onClick={() => setOpen(false)}
            >
              {t("Start your project")}
              <AppIcon name="forward" />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
