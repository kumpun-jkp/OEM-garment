import { getTranslations } from "@/lib/translations";
import { privacyPolicyHref } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import {
  i18nCopy,
  company,
  fabricCards,
  finishingCards,
  type CapabilityCopy,
} from "@/content/site";
import { ButtonLink, DataRows, Photo, SectionHeader } from "./primitives";
import { AppIcon } from "./app-icon";
import { ScrollShelf } from "./scroll-shelf";

export async function ContactBlock() {
  const { t, href: localHref } = await getTranslations();

  return (
    <aside className="contact-block">
      <h3>{t("Contact us")}</h3>
      <DataRows
        items={[
          ["Location", company.location],
          ["Operating", company.hours],
          ["Phone", company.telephone],
          ["Fax", company.fax],
          ["Visits", "Arrange in advance"],
        ]}
      />
      <p className="micro">{t("Arrange a visit with the production team")}</p>
      <Link
        href={localHref("/contact")}
        className="block-link"
        aria-label={t("View contact details")}
      >
        <AppIcon name="outward" size={20} />
      </Link>
    </aside>
  );
}

export async function CTASection({ title }: { title?: string }) {
  const { t, href: localHref, locale: activeLocale } = await getTranslations();

  const isThai = activeLocale === "th";
  const localizedCopy = i18nCopy[activeLocale];
  const defaultTitle = isThai
    ? "เริ่มงานกับเราทันที เราพร้อมแล้วที่จะ Support คุณ"
    : "Start working with us today, we are ready to support you";

  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <div>
          <p className="eyebrow section-cue">
            <span className="context-icon-badge">
              <AppIcon name="brief" size={32} />
            </span>
            {t("Welcome · Be our partner")}
          </p>
          <h2 lang={activeLocale}>{t(title || defaultTitle)}</h2>
          <p lang={activeLocale}>{t(localizedCopy.visit)}</p>
          <p lang={activeLocale}>
            {t(isThai ? company.visitHoursThai : company.visitHours)}
            {activeLocale === "th" ? " น. " : ". "}
            {t(" ")}
            {t(isThai ? company.visitBookingThai : company.visitBooking)}
          </p>
          <div className="button-row">
            <ButtonLink href={localHref("/contact?inquiry=visit")}>
              {t("Request plant visit")}
            </ButtonLink>
            <ButtonLink
              href={localHref("/start-your-project")}
              variant="secondary"
            >
              {t("Start your project")}
            </ButtonLink>
          </div>
        </div>
        <ContactBlock />
      </div>
    </section>
  );
}

export async function Customers() {
  const { t, locale: activeLocale } = await getTranslations();

  const localizedCopy = i18nCopy[activeLocale];
  return (
    <section className="customers section" id="customers">
      <div className="container">
        <SectionHeader
          label={t("Experience with retail partners")}
          title={t("Our customers")}
          aside={<p lang={activeLocale}>{t(localizedCopy.customers)}</p>}
        />
        <div className="customer-logos">
          <Image
            src="/icons/big-c.svg"
            alt={t("Big C")}
            width={222}
            height={222}
          />
          <Image
            src="/icons/lotus.svg"
            alt={t("Lotus’s")}
            width={238}
            height={51}
          />
          <Image
            src="/icons/the-mall.svg"
            alt={t("The Mall")}
            width={244}
            height={211}
          />
        </div>
      </div>
    </section>
  );
}

export async function CapabilityCard({
  content = finishingCards[0],
}: {
  content?: CapabilityCopy;
}) {
  const { t } = await getTranslations();

  return (
    <article className="capability-card">
      <div className="capability-photo">
        <Photo
          src={content.image}
          alt={t(content.alt)}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, (min-width: 1280px) 280px, 25vw"
        />
        <span className="image-caption">{t(content.caption)}</span>
      </div>
      <div className="capability-body">
        <div className="split-label micro">
          <span>{t(content.label)}</span>
          <span>{t(content.tag)}</span>
        </div>
        <h3>{t(content.title)}</h3>
        <p>{t(content.body)}</p>
        <div className="card-foot micro">
          <span>{t(content.foot[0])}</span>
          <span>{t(content.foot[1])}</span>
        </div>
      </div>
    </article>
  );
}

export async function Manufacturing({
  title = "Core manufacturing lines",
  dark = false,
  id = "manufacturing",
}: {
  title?: string;
  dark?: boolean;
  id?: string;
}) {
  const { t } = await getTranslations();

  return (
    <section className={`section manufacturing ${dark ? "dark" : ""}`} id={id}>
      <div className="container">
        <SectionHeader
          icon={id === "fabrics" ? "fabric" : "sewing"}
          label={t(
            id === "fabrics"
              ? "Materials matched to your product"
              : "Sewing & finishing techniques",
          )}
          title={t(title)}
          aside={
            <p className="micro">
              {t(
                id === "fabrics"
                  ? "Certified fabric options: GOTS / GRS / RCS · Subject to spec, MOQ & sourcing"
                  : "In-house decoration · Matched to your design",
              )}
            </p>
          }
        />
        <ScrollShelf kind={id === "fabrics" ? "fabrics" : "techniques"}>
          {(id === "fabrics" ? fabricCards : finishingCards).map(
            (content, i) => (
              <CapabilityCard key={i} content={content} />
            ),
          )}
        </ScrollShelf>
      </div>
    </section>
  );
}

const footerGroups = [
  {
    title: "Explore",
    items: [
      ["Capabilities Matrix", "/our-work#capabilities"],
      ["OEM Workflow", "/oem-journey"],
      ["Retail Partners", "/our-work#customers"],
      ["Garment Style References", "/oem-products"],
      ["Planning Guides", "/technical-insights"],
    ],
  },
  {
    title: "Evidence",
    items: [
      ["Quality Checks", "/oem-journey#quality"],
      ["Machinery Roster", "/about#process"],
      ["Bang Bon Factory Visit", "/contact?inquiry=visit"],
      ["Audits & Documents", "/about#compliance"],
      ["Sustainability & ESG", "/about#stewardship"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Enterprise Heritage", "/about"],
      ["Production Team", "/about#leadership"],
      ["Corporate Governance", "/about#compliance"],
      ["Project Enquiries", "/contact"],
      ["General Enquiries", "/contact?inquiry=general"],
    ],
  },
] as const;

export async function Footer() {
  const { t, href: localHref, locale: activeLocale } = await getTranslations();
  const policyHref = privacyPolicyHref();

  const isThai = activeLocale === "th";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link className="footer-wordmark" href={localHref("/")}>
              {t("THONBURI MASTER")} <span>{t("THAILAND")}</span>
            </Link>
            <p>
              {t(
                "Garment OEM production for brands, from brief and sample review to cutting, sewing, decoration, quality checks and delivery. Discuss your materials, product details and order requirements with the TM Apparel team.",
              )}
            </p>
            <p className="micro brand-accent">
              <AppIcon name="factory" size={14} />
              {t("Garment OEM · From brief to delivery")}
            </p>
            <p className="micro">
              {t("In-line QC · End-line QC · Needle checks before packing")}
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{t(group.title)}</h2>
              <ul>
                {group.items.map(([label, href]) => (
                  <li key={label}>
                    <Link href={localHref(href)}>{t(label)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>{t("Legal & policy")}</h2>
            <ul>
              {[
                "Privacy Policy",
                "Terms of Supply",
                "IP & Spec Retention",
                "NDA Framework",
                "Customs Compliance",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Privacy Policy" && policyHref
                        ? policyHref
                        : localHref(
                            `/contact?inquiry=policy&subject=${encodeURIComponent(item)}`,
                          )
                    }
                  >
                    {t(
                      item === "Privacy Policy" && !policyHref
                        ? "Request privacy policy"
                        : item,
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <p className="micro light">
              {t("Plant operations & registered facility")}
            </p>
            <p className="micro">{t(company.address)}</p>
            <p className="micro">{t(company.hours)} ICT (UTC+7)</p>
            <p className="micro">
              {t("Factory visits:")}
              {t(" ")}
              {t(isThai ? company.visitHoursThai : company.visitHours)}
              {t(".")}
              {t(" ")}
              {t(isThai ? company.visitBookingThai : company.visitBooking)}
            </p>
          </div>
          <div className="copyright">
            <p className="micro">
              {t("© 2026 Thonburi Master. All rights reserved.")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
