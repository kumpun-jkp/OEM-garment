import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import Image from "next/image";
import { assets, copy, qualityCards, stages } from "@/content/site";
import { ButtonLink, Photo, SectionHeader } from "@/components/primitives";
import { CapabilityCard, CTASection } from "@/components/shared-sections";
export const generateMetadata = pageMetadata("OEM Journey");
const stageIcons = [
  "brief",
  "calculator",
  "shirts",
  "sewing",
  "quality",
  "delivery",
] as const;
const questions = [
  "What details should I send to start a project?",
  "How much does a sample cost, and can the fee be credited?",
  "How long does sampling and bulk production take?",
  "When is the production deposit due, and what is checked?",
];
const answers = [
  "Send a design, reference image or physical sample, with quantities, sizes, colours and your required delivery date. The team can review the information you have.",
  "The supplied sample fee is THB 1,000–2,000. It can be credited as a discount when you place a production order; confirm the amount and terms with the team.",
  "Allow approximately 7–14 days per sample round and 30–45 days for bulk production, depending on fabric ordering and quantity. QC and packing/delivery each take about 2–5 days. These estimates are not a combined delivery guarantee.",
  "A 50% deposit starts bulk production after sample approval. The team samples work during sewing, checks every completed garment and checks for needle or metal fragments before packing.",
];
export default async function Journey() {
  const { t, href: localHref, locale: activeLocale } = await getTranslations();

  return (
    <>
      <section className="journey-hero">
        <Image
          src={assets.journeyHero}
          alt={t("")}
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container grid-two">
          <div>
            <p className="eyebrow">{t("OEM process")}</p>
            <h1 lang={activeLocale}>
              {t("เปลี่ยนไอเดียของคุณ")} <br />
              {t("สู่สินค้าพร้อมขายอย่างเป็นระบบ")}
            </h1>
            <p lang={activeLocale}>{t(copy.journey)}</p>
            <div className="button-row">
              <ButtonLink
                href={localHref("/start-your-project")}
                variant="secondary"
              >
                {t("Start your project")}
              </ButtonLink>
              <ButtonLink href={localHref("/our-work")} variant="secondary">
                {t("Explore our work")}
              </ButtonLink>
            </div>
          </div>
          <div className="photo-caption-wrap">
            <Photo
              src={assets.factory}
              alt={t("Main assembly line factory floor")}
              priority
            />
            <span className="image-caption">
              <AppIcon name="factory" size={14} />
              {t("Garment production / Factory floor")}
            </span>
          </div>
        </div>
      </section>
      <section className="section process-stages">
        <div className="container">
          <SectionHeader
            label={t("Synchronised from requirement to delivery")}
            icon="brief"
            title={
              <span lang={activeLocale}>
                {t("จากไอเดียสู่สินค้าพร้อมขาย")}
                <br />
                {t("ใน 6 ขั้นตอนหลัก")}
              </span>
            }
            aside={
              <p className="micro">
                {t("Estimates vary with fabric, quantity & sample revisions")}
              </p>
            }
          />
          <ol className="stage-grid">
            {stages.map(([title, body, output, step], index) => (
              <li key={title}>
                <p className="eyebrow section-cue">
                  <span className="context-icon-badge">
                    <AppIcon name={stageIcons[index]} size={32} />
                  </span>
                  {t(step)}
                </p>
                <h3>{t(title)}</h3>
                <p lang={activeLocale}>{t(body)}</p>
                <div className="stage-output">
                  <p className="eyebrow">{t("Outcome / estimate")}</p>
                  <p lang={activeLocale}>{t(output)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section journey-quality dark" id="quality">
        <div className="container">
          <Photo
            src={assets.quality}
            alt={t("Quality technician measuring fabric on a testing table")}
            sizes="100vw"
          />
          <SectionHeader
            label={t("// Be trusted")}
            icon="quality"
            title={t("Quality control protocol")}
            aside={
              <p className="micro">
                {t("In-line sample checks · Every garment checked at end-line")}
              </p>
            }
          />
          <div className="grid-four">
            {qualityCards.map((content, i) => (
              <CapabilityCard key={i} content={content} />
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container">
          <p className="eyebrow">{t("// Inquiry resolution")}</p>
          <h2>{t("Technical FAQ")}</h2>
          <div className="faq-list">
            {questions.map((question, i) => (
              <details key={question}>
                <summary>
                  <span className="brand-accent micro">
                    {t("0")}
                    {t(i + 1)}
                  </span>
                  {t(question)}
                  <AppIcon name="expand" className="faq-arrow" />
                </summary>
                <p>
                  {t(answers[i])}
                  {t(" ")}
                  <ButtonLink
                    href={localHref(
                      `/contact?inquiry=general&subject=${encodeURIComponent(question)}`,
                    )}
                    variant="secondary"
                  >
                    {t("Discuss this question")}
                  </ButtonLink>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTASection title={t("พร้อมที่จะเริ่มงานของพวกเรา ไปด้วยกันหรือยัง")} />
    </>
  );
}
