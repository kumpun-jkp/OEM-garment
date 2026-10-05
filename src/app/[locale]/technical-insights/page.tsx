import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import { assets, ownerUpdateCopy } from "@/content/site";
import { ButtonLink, Photo, SectionHeader } from "@/components/primitives";
import { CTASection } from "@/components/shared-sections";
import {
  InsightLibrary,
  ShrinkageCalculator,
} from "@/components/insight-library";
export const generateMetadata = pageMetadata("Technical Insights");
export default async function Insights() {
  const { t, href: localHref } = await getTranslations();

  return (
    <>
      <header className="insights-intro">
        <div className="container">
          <p className="eyebrow">
            <AppIcon name="checklist" size={14} />
            {t(
              "Materials & production planning // Practical guidance for your garment brief",
            )}
          </p>
          <div className="grid-two">
            <h1>
              {t(
                "Fabric choices, garment details & production planning guidance",
              )}
            </h1>
            <div>
              <p>
                {t(
                  "Start with the product you want to make. Review fabric feel, shape, movement and finishing options, then agree the materials, sizes and details through a sample before bulk production.",
                )}
              </p>
              <p className="micro">
                {t("Material review · Sample approval · Production checks")}
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className="featured-bulletin">
        <div className="container grid-two">
          <div className="featured-photo">
            <Photo
              src={assets.materialScience}
              alt={t("Textile testing bench with instruments and sample cloth")}
              priority
            />
            <div className="featured-label micro">
              {t("Material guide // 01")}
              <span>{t("Confirm the fabric spec")}</span>
            </div>
            <div className="yarn-comparison">
              <p className="eyebrow">
                {t("Product use · Fabric choice · Sample review")}
              </p>
              <p>
                {t("Everyday comfort")}
                <AppIcon name="forward" size={16} />
                {t("Structure, stretch or drape to suit your product")}
              </p>
            </div>
          </div>
          <article className="featured-copy">
            <p className="eyebrow section-cue">
              <span className="context-icon-badge">
                <AppIcon name="fabric" size={32} />
              </span>
              {t("Material selection // Match fabric to product use")}
            </p>
            <p className="micro">
              {t("Discuss composition, finish and availability with the team")}
            </p>
            <h2>
              {t(
                "Choose fabric by feel, shape and the way your garment will be used",
              )}
            </h2>
            <p>
              {t(
                "Cotton and knit suit soft everyday styles; woven and twill offer structure. Sports and stretch fabrics support movement, Ottoman suits cargo styles, and rayon gives drape to resort shirts, sleepwear and dresses.",
              )}
            </p>
            <div className="engineering-summary">
              <h3 className="micro">
                {t("Engineering summary / Three core takeaways")}
              </h3>
              <ol>
                <li>
                  {t(
                    "Match fabric feel, structure and stretch to the product's intended use, then review the selected material in a sample.",
                  )}
                </li>
                <li>{t(ownerUpdateCopy.sourcing.en)}</li>
                <li>
                  {t(
                    "Water repellency and other performance details depend on the actual fabric specification. Confirm before production.",
                  )}
                </li>
              </ol>
            </div>
            <div className="split-label">
              <ButtonLink
                href={localHref(
                  "/contact?inquiry=general&subject=Discuss%20fabric%20choices",
                )}
                variant="dark"
              >
                {t("Discuss fabric choices")}
              </ButtonLink>
              <p className="micro">
                {t("Fabric sourcing // Spec & availability")}
              </p>
            </div>
          </article>
        </div>
      </section>
      <InsightLibrary />
      <section className="section toolkit" id="toolkit">
        <div className="container">
          <SectionHeader
            label={t("Project preparation // Guides & calculations")}
            icon="brief"
            title={t("Practical tools & specification calculators")}
            aside={
              <p className="micro">
                {t("Confirm your project requirements with the team")}
              </p>
            }
          />
          <div className="grid-three">
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                <AppIcon name="measure" size={28} />
              </span>
              <p className="eyebrow">{t("Sizes & measurements")}</p>
              <h3>{t("Sizing matrix spec sheet")}</h3>
              <p>
                {t(
                  "Prepare the sizes and measurements your garment needs. Review fit, shape and garment details in the sample, then approve the specifications that will guide bulk production.",
                )}
              </p>
              <ButtonLink
                href={localHref(
                  "/contact?inquiry=general&subject=Request%20sizing%20matrix%20XLSX",
                )}
                variant="secondary"
                className="tool-button"
              >
                {t("Request spec sheet (XLSX)")}
              </ButtonLink>
            </article>
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                <AppIcon name="calculator" size={28} />
              </span>
              <p className="eyebrow">
                {t("Measured sample // Dimensional change")}
              </p>
              <h3>{t("Fabric shrinkage calculator")}</h3>
              <p>
                {t(
                  "Measure fabric dimensional change and calculate a corresponding pattern scaling factor from your original and washed sample measurements.",
                )}
              </p>
              <ShrinkageCalculator />
            </article>
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                <AppIcon name="checklist" size={28} />
              </span>
              <p className="eyebrow">{t("Pre-production brief")}</p>
              <h3>{t("Technical dossier checklist")}</h3>
              <p>
                {t(
                  "Bring the design, reference images, quantities, sizes, colours, materials, trims and required delivery date. A physical sample can help the team review your brief before sampling.",
                )}
              </p>
              <ButtonLink
                href={localHref(
                  "/contact?inquiry=general&subject=Request%20technical%20dossier%20PDF",
                )}
                variant="secondary"
                className="tool-button"
              >
                {t("Request dossier (PDF)")}
              </ButtonLink>
            </article>
          </div>
        </div>
      </section>
      <CTASection
        title={t("เริ่มต้นด้วยผ้า หรือดีไซน์ ที่ตอบโจทย์กับ Brand ของคุณ")}
      />
    </>
  );
}
