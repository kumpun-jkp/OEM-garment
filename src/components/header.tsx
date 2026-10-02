"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [thai, setThai] = useState(false);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Link
          className="wordmark"
          href="/"
          aria-label="Thonburi Master home"
          onClick={() => setOpen(false)}
        >
          <strong>
            THONBURI MASTER <span>/ TH</span>
          </strong>
          <span className="wordmark-tagline">Garment manufacturing</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {thai ? item.th : item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-control" aria-label="Navigation language">
            <button
              type="button"
              onClick={() => setThai(false)}
              aria-pressed={!thai}
              aria-label="Display navigation in English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setThai(true)}
              aria-pressed={thai}
              aria-label="แสดงเมนูภาษาไทย"
            >
              ไทย
            </button>
          </div>
          <Link
            className="button button--primary header-cta"
            href="/start-your-project"
          >
            {thai ? "เริ่มโปรเจกต์" : "Start your project"}
          </Link>
          <Link
            className="account-link"
            href="/start-your-project"
            aria-label="Project enquiry"
          >
            <Image src="/icons/account.svg" alt="" width={12} height={12} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls={open ? "mobile-navigation" : undefined}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ...navigation,
              {
                href: "/oem-products",
                label: "OEM Products",
                th: "สินค้า OEM",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {thai ? item.th : item.label}
              </Link>
            ))}
            <Link href="/start-your-project" onClick={() => setOpen(false)}>
              Start your project →
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
