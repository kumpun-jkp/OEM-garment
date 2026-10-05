import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import Image from "next/image";
import {
  assets,
  companyHistory,
  copy,
  machinery,
  factoryStandards,
  ownerUpdateCopy,
} from "@/content/site";
import {
  ButtonLink,
  DataRows,
  Metrics,
  Photo,
  SectionHeader,
} from "@/components/primitives";
import { CTASection, Manufacturing } from "@/components/shared-sections";

export const generateMetadata = pageMetadata("About Us");
const facilities = [
  [
    "Material review // Before cutting",
    "01. Fabric & colour checks",
    "Inspect fabric type, colour, pattern and quantity before cutting. Compare colours in a light-controlled room with a colour cabinet.",
  ],
  [
    "Production briefing // Shared standards",
    "02. Brief, cut & sew",
    "Cutting, sewing and pressing teams review the style, sizes, materials and sewing details together before production begins.",
  ],
  [
    "Quality review // Before packing",
    "03. Check, finish & pack",
    "Sample checks during sewing and checks of every completed garment are followed by pressing, folding, needle checks and packing.",
  ],
];
const team = [
  [
    "Pre-production team",
    "Brief & materials",
    "Sample development",
    "Review your design, fabric, colours, sizes and trims before making a sample. Customer feedback and approval guide the move into bulk production.",
    "Materials, fit & sample review",
  ],
  [
    "Production team",
    "Cut, sew & finish",
    "Cutting & sewing",
    "Align on the approved style before cutting and sewing. Experienced craftspeople handle assembly, decoration and garment details against the agreed sample.",
    "Pattern cutting, seams & decoration",
  ],
  [
    "Quality & packing team",
    "Check & prepare",
    "Quality & delivery",
    "Sample work during sewing and inspect every completed garment. Coordinate corrections, pressing, needle checks, labels and counts before packing for delivery.",
    "In-line QC, end-line QC & packing",
  ],
];

export default async function About() {
  const { t, href: localHref, locale: activeLocale } = await getTranslations();

  return (
    <>
      <section className="about-hero dark">
        <Image
          src={assets.aboutHero}
          alt={t("")}
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow chip">{t("Thonburi Master · TM Apparel")}</p>
            <h1 lang={activeLocale}>
              {t("โรงงานรับผลิตเสื้อผ้า OEM")} <br />
              {t("สำหรับ Brand ไทยและต่างประเทศ")}
            </h1>
            <p lang={activeLocale}>{t(copy.about)}</p>
            <p lang={activeLocale}>
              {t(
                "เราวางแผนงานร่วมกับลูกค้าตั้งแต่เลือกผ้าและวัสดุ จนถึงอนุมัติตัวอย่าง ทีมตัด เย็บ และรีดประชุมเปิดแบบร่วมกันก่อนเริ่มผลิต เพื่อให้ขนาด รูปทรง เทคนิค และจุดตรวจคุณภาพเป็นไปตามรายละเอียดที่ตกลง",
              )}
            </p>
            <div className="button-row">
              <ButtonLink href={localHref("/start-your-project")}>
                {t("Start your project")}
              </ButtonLink>
              <ButtonLink href={localHref("/our-work")} variant="secondary">
                {t("Explore our work")}
              </ButtonLink>
            </div>
          </div>
          <aside className="factory-summary">
            <div className="split-label micro">
              <strong>{t("Summary")}</strong>
              <span>{t("Factory overview")}</span>
            </div>
            <DataRows
              items={[
                ["Total facility area", "Approx. 1,500 sqm"],
                ["Materials", "Woven, knit and stretch fabrics"],
                ["Production scope", "Cut, sew and decorate"],
                ["Quality checks", "In-line and end-line QC"],
                ["Minimum batch", "Discuss by style and fabric"],
                ["Preparation", "Press, check needles and pack"],
              ]}
            />
            <p className="micro">
              {t(
                "Your approved sample guides materials, cutting, sewing and finishing. Quality checks and order counts support preparation for delivery.",
              )}
            </p>
          </aside>
        </div>
      </section>
      <section className="section" id="history">
        <div className="container">
          <SectionHeader
            label={t("Company history // ประวัติบริษัท")}
            title={t("Our milestones")}
          />
          <DataRows
            items={companyHistory.map(([year, thai, english]) => [
              year,
              activeLocale === "th" ? thai : english,
            ])}
          />
        </div>
      </section>
      <section className="facility-cards section">
        <div className="container grid-three">
          {facilities.map(([label, title, body], i) => (
            <article key={title}>
              <div className="photo-caption-wrap">
                <Photo src={assets.facilities[i]} alt={t(title)} />
                <span className="image-caption">{t(label)}</span>
              </div>
              <h2>{t(title)}</h2>
              <p>{t(body)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section production-process" id="process">
        <div className="container">
          <SectionHeader
            label={t("Factory workflow // From materials to delivery")}
            icon="sewing"
            wide
            title={t("Our production process")}
            aside={
              <p className="micro">
                {t("In-house sewing and decoration")}
                <br />
                {t("Checks before cutting, packing and delivery")}
              </p>
            }
          />
          <Metrics
            items={[
              ["1,500", "Approx. facility area", "Square metres"],
              ["Sew", "Garment assembly", "Cutting, sewing and decoration"],
              ["QC", "Quality checkpoints", "In-line and end-line checks"],
              ["Solar", "Energy provision", "Solar panels at the factory"],
            ]}
          />
          <div className="machine-grid">
            {machinery.map((item, i) => (
              <article key={item.zone}>
                <p className="eyebrow">
                  {t(item.zone)}
                  <span className="float-right">
                    {t("Detail")} {i + 1}
                  </span>
                </p>
                <h3>{t(item.title)}</h3>
                <p>{t(item.body)}</p>
                <DataRows items={item.details} />
              </article>
            ))}
            <article>
              <p className="eyebrow">{t("Before production")}</p>
              <h3>{t("Shared production briefing")}</h3>
            </article>
          </div>
        </div>
      </section>
      <Manufacturing />
      <Manufacturing title={t("Fabrics")} id="fabrics" />
      <section className="section compliance" id="compliance">
        <div className="container">
          <SectionHeader
            label={t("Partner assessments // Factory documents")}
            wide
            title={t("Factory audits & documents")}
            aside={
              <p className="micro">{t("Audit periods shown where supplied")}</p>
            }
          />
          <div className="compliance-note">
            <h3 className="micro">{t("Partner audit highlights")}</h3>
            <p>{t(ownerUpdateCopy.bigC.en)}</p>
            <p>{t(ownerUpdateCopy.lotus.en)}</p>
            <p>{t(ownerUpdateCopy.notification.en)}</p>
            <p>{t(ownerUpdateCopy.operatingLicence.en)}</p>
          </div>
          <div
            className="table-scroll"
            role="region"
            tabIndex={0}
            aria-label={t("Factory audit and document summary")}
          >
            <table>
              <thead>
                <tr>
                  {[
                    "Assessment / document",
                    "Reference / scope",
                    "Assessor / authority",
                    "Result / document type",
                    "Period / validity",
                    "Record status",
                  ].map((item) => (
                    <th key={item} scope="col">
                      {t(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {factoryStandards.map(
                  ([name, detail, ref, auditor, score, validity, status]) => (
                    <tr key={name}>
                      <th scope="row">
                        {t(name)}
                        <span className="micro">{t(detail)}</span>
                      </th>
                      <td>{t(ref)}</td>
                      <td>{t(auditor)}</td>
                      <td>{t(score)}</td>
                      <td>{t(validity)}</td>
                      <td>
                        <span className="status-badge">
                          <AppIcon name="verified" size={14} /> {t(status)}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="split-label micro ledger-foot">
            <span>
              {t(
                "Partner audit highlights · Current document details on request",
              )}
            </span>
            <ButtonLink
              href={localHref("/contact?inquiry=audit")}
              variant="secondary"
            >
              {t("Discuss audit details")}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section stewardship" id="stewardship">
        <div className="container grid-two">
          <div>
            <p className="eyebrow">
              {t("People & workplace // Responsible operations")}
            </p>
            <h2>{t("Staff welfare, workplace safety & energy")}</h2>
            <p>{t(ownerUpdateCopy.workforce.en)}</p>
            <div className="ethics-note">
              <h3 className="micro">{t("No child labour")}</h3>
              <p>{t(ownerUpdateCopy.noChildLabour.en)}</p>
            </div>
          </div>
          <div className="ethics-grid">
            {[
              [
                "Care",
                "Wages & social security",
                ownerUpdateCopy.wages.en,
                "Staff support provisions",
              ],
              [
                "Team",
                "Everyday staff welfare",
                ownerUpdateCopy.welfare.en,
                "Meals, water & annual benefits",
              ],
              [
                "Safe",
                "Workplace safety",
                "Fire drills, fire equipment, first-aid supplies and warning signs support workplace preparedness. Annual health checks are included in staff provisions.",
                "Fire drills & first aid",
              ],
              [
                "Solar",
                "Factory solar panels",
                ownerUpdateCopy.solar.en,
                "Solar panels at the factory",
              ],
            ].map(([value, title, body, foot], i) => (
              <article key={title}>
                <p className="eyebrow">
                  {t("Metric {number} // {title}", {
                    number: `0${i + 1}`,
                    title: t(title),
                  })}
                </p>
                <strong className="stat-value">{t(value)}</strong>
                <h3>{t(title)}</h3>
                <p>{t(body)}</p>
                <p className="micro brand-accent">{t(foot)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section team-section" id="leadership">
        <div className="container">
          <SectionHeader
            label={t("The teams behind your order")}
            title={t("People & production")}
            aside={
              <p className="micro">
                {t("From sample review to sewing, checks and packing")}
              </p>
            }
          />
          <div className="grid-three">
            {team.map(([role, exp, name, body, discipline], i) => (
              <article className="team-card" key={name}>
                <Photo
                  src={assets.team[i]}
                  alt={t("Illustrative {role} activity", { role: t(role) })}
                />
                <div className="team-body">
                  <div className="split-label micro">
                    <span>{t(role)}</span>
                    <span>{t(exp)}</span>
                  </div>
                  <h3>{t(name)}</h3>
                  <p>{t(body)}</p>
                  <p className="micro">
                    <strong>{t("Discipline:")}</strong>
                    <br />
                    {t(discipline)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection title={t("ประสบการณ์การผลิต ที่เติบโตไปพร้อมกับ Brand")} />
    </>
  );
}
