"use client";
import { useLocale } from "@/components/locale-provider";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppIcon, type AppIconName } from "./app-icon";

export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { t } = useLocale();

  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={t(alt)} fill sizes={sizes} priority={priority} />
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}) {
  const { t, href: localHref } = useLocale();

  return (
    <Link
      className={`button button--${variant} ${className}`}
      href={localHref(href)}
    >
      {t(children)}
      <AppIcon name="outward" size={18} className="button-icon" />
    </Link>
  );
}

export function SectionHeader({
  label,
  title,
  aside,
  id,
  level = 2,
  wide = false,
  icon,
}: {
  label?: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
  level?: 1 | 2;
  wide?: boolean;
  icon?: AppIconName;
}) {
  const { t } = useLocale();

  const Heading = level === 1 ? "h1" : "h2";
  if (wide)
    return (
      <header className="section-header section-header--wide" id={id}>
        <div className="section-label-row">
          {(label || icon) && (
            <p className="eyebrow section-cue">
              {icon && (
                <span className="context-icon-badge">
                  <AppIcon name={icon} size={32} />
                </span>
              )}
              {t(label)}
            </p>
          )}
          {aside && <div className="section-aside">{t(aside)}</div>}
        </div>
        <Heading>{t(title)}</Heading>
      </header>
    );
  return (
    <header className="section-header" id={id}>
      <div>
        {(label || icon) && (
          <p className="eyebrow section-cue">
            {icon && (
              <span className="context-icon-badge">
                <AppIcon name={icon} size={32} />
              </span>
            )}
            {t(label)}
          </p>
        )}
        <Heading>{t(title)}</Heading>
      </div>
      {aside && <div className="section-aside">{t(aside)}</div>}
    </header>
  );
}

export function Metrics({
  items,
  className = "",
}: {
  items: readonly (readonly [string, string, string?])[];
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <dl className={`metrics ${className}`}>
      {items.map(([value, label, detail]) => (
        <div key={label}>
          <dt>{t(label)}</dt>
          <dd>{t(value)}</dd>
          {detail && <p className="micro">{t(detail)}</p>}
        </div>
      ))}
    </dl>
  );
}

export function DataRows({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  const { t } = useLocale();

  return (
    <dl className="data-rows">
      {items.map(([name, value]) => (
        <div key={name}>
          <dt>{t(name)}</dt>
          <dd>{t(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
