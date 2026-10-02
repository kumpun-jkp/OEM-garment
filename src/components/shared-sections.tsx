import Image from "next/image";
import Link from "next/link";
import { assets, copy } from "@/content/site";
import { ButtonLink, DataRows, Photo, SectionHeader } from "./primitives";

export function ContactBlock() {
  return (
    <aside className="contact-block">
      <h3>Contact us</h3>
      <DataRows
        items={[
          ["Location", "Yannawa, Bangkok"],
          ["Operating", "10:00 AM to 4:30 PM"],
          ["Email", "tmapparel.work@gmail.com"],
          ["Phone", "090-000-0000"],
          ["Lead time", "5 business days notice"],
        ]}
      />
      <p className="micro">Live line verification code: BKK-AUDIT-ACTIVE</p>
      <Link
        href="/contact"
        className="block-link"
        aria-label="View contact details"
      />
    </aside>
  );
}

export function CTASection({
  title = "เริ่มงานกับเราทันที เราพร้อมแล้วที่จะ Support คุณ",
}: {
  title?: string;
}) {
  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <div>
          <p className="eyebrow">Welcome · Be our partner</p>
          <h2 lang="th">{title}</h2>
          <p lang="th">{copy.visit}</p>
          <div className="button-row">
            <ButtonLink href="/contact?inquiry=visit">
              Request plant visit
            </ButtonLink>
            <ButtonLink href="/start-your-project" variant="secondary">
              Start your project
            </ButtonLink>
          </div>
        </div>
        <ContactBlock />
      </div>
    </section>
  );
}

export function Customers() {
  return (
    <section className="customers section" id="customers">
      <div className="container">
        <SectionHeader
          label="We are trusted by leader"
          title="Our customers"
          aside={<p lang="th">{copy.customers}</p>}
        />
        <div className="customer-logos">
          <Image src="/icons/big-c.svg" alt="Big C" width={222} height={222} />
          <Image src="/icons/lotus.svg" alt="Lotus’s" width={238} height={51} />
          <Image
            src="/icons/the-mall.svg"
            alt="The Mall"
            width={244}
            height={211}
          />
        </div>
      </div>
    </section>
  );
}

export function CapabilityCard() {
  return (
    <article className="capability-card">
      <div className="capability-photo">
        <Photo
          src={assets.manufacturing}
          alt="Fabric laid out for production cutting"
        />
        <span className="image-caption">Sweater</span>
      </div>
      <div className="capability-body">
        <div className="split-label micro">
          <span>In-house embellishment</span>
          <span>12-colour auto</span>
        </div>
        <h3>Screen print &amp; 3D stitch</h3>
        <p>
          Discharge, silicone puff, and Japanese 20-head embroidery with strict
          ISO wash-fastness.
        </p>
        <div className="card-foot micro">
          <span>Grade 4–5 fastness</span>
          <span>OEKO-TEX inks</span>
        </div>
      </div>
    </article>
  );
}

export function Manufacturing({
  title = "Core manufacturing lines",
  dark = false,
  id = "manufacturing",
}: {
  title?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section className={`section manufacturing ${dark ? "dark" : ""}`} id={id}>
      <div className="container">
        <SectionHeader
          label="Material & production execution"
          title={title}
          aside={<p className="micro">Audited factory specs · 100% in-house</p>}
        />
        <div className="grid-four">
          {Array.from({ length: 4 }, (_, i) => (
            <CapabilityCard key={i} />
          ))}
        </div>
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
      ["Client Manifest", "/our-work#customers"],
      ["Textile Archive", "/oem-products"],
      ["Technical Bulletins", "/technical-insights"],
    ],
  },
  {
    title: "Evidence",
    items: [
      ["AQL Inspection", "/oem-journey#quality"],
      ["Machinery Roster", "/about#process"],
      ["Bangkok Plant Tour", "/contact?inquiry=visit"],
      ["Audit Certifications", "/about#compliance"],
      ["Sustainability & ESG", "/about#stewardship"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Enterprise Heritage", "/about"],
      ["Engineering Team", "/about#leadership"],
      ["Corporate Governance", "/about#compliance"],
      ["Export Desk", "/contact"],
      ["Industrial Apprenticeship", "/contact?inquiry=general"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link className="footer-wordmark" href="/">
              THONBURI MASTER <span>/ Thailand</span>
            </Link>
            <p>
              High-precision garment engineering &amp; industrial textile
              execution for international apparel houses. Operating with
              architectural rigor, ethical labor governance, and ISO-grade
              compliance in Bangkok.
            </p>
            <p className="micro bronze">■ Line status: operational (Grade-A)</p>
            <p className="micro">
              ISO 9001:2015 · WRAP certified · OEKO-TEX Standard 100
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Legal &amp; policy</h2>
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
                    href={`/contact?inquiry=policy&subject=${encodeURIComponent(item)}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <p className="micro light">
              Plant operations &amp; registered facility
            </p>
            <p className="micro">
              78/12 Industrial Ring Road, Yannawa, Bangkok 10120, Thailand
            </p>
            <p className="micro">
              Mon – Fri: 08:00 – 17:30 ICT (UTC+7) | Secure B2B transmission
              encrypted
            </p>
          </div>
          <div className="copyright">
            <p className="micro" lang="th">
              สงวนลิขสิทธิ์ พ.ศ. 2567 โรงงานผลิตเสื้อผ้าสำเร็จรูปเพื่อการส่งออก
              ประเทศไทย
            </p>
            <p className="micro">
              © 2025 Atelier OEM Apparel (Thailand) Co., Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
