import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
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
  return (
    <Link className={`button button--${variant} ${className}`} href={href}>
      {children}
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
}: {
  label?: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
  level?: 1 | 2;
  wide?: boolean;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  if (wide)
    return (
      <header className="section-header section-header--wide" id={id}>
        <div className="section-label-row">
          {label && <p className="eyebrow">{label}</p>}
          {aside && <div className="section-aside">{aside}</div>}
        </div>
        <Heading>{title}</Heading>
      </header>
    );
  return (
    <header className="section-header" id={id}>
      <div>
        {label && <p className="eyebrow">{label}</p>}
        <Heading>{title}</Heading>
      </div>
      {aside && <div className="section-aside">{aside}</div>}
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
  return (
    <dl className={`metrics ${className}`}>
      {items.map(([value, label, detail]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
          {detail && <p className="micro">{detail}</p>}
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
  return (
    <dl className="data-rows">
      {items.map(([name, value]) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
