import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import Image from "next/image";
import { assets } from "@/content/site";
import {
  ButtonLink,
  Metrics,
  Photo,
  SectionHeader,
} from "@/components/primitives";
import { CTASection, Customers } from "@/components/shared-sections";
import { ProjectCatalogue } from "@/components/project-catalogue";

export const generateMetadata = pageMetadata("Our Work");
export default async function Work() {
  const { t, href: localHref, locale: activeLocale } = await getTranslations();

  return (
    <>
      <section className="work-hero">
        <Image
          src={assets.workHero}
          alt={t("")}
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container">
          <div className="work-hero-copy grid-two">
            <div>
              <p className="eyebrow">{t("Our work, delivered trust")}</p>
              <h1 lang={activeLocale}>
                {t("ผลงานของเรา:")}
                <br />
                {t("ความไว้วางใจที่เราส่งต่อเป็นสินค้าจริง")}
              </h1>
              <div className="button-row">
                <ButtonLink href={localHref("/start-your-project")}>
                  {t("Start your project")}
                </ButtonLink>
                <ButtonLink
                  href={localHref("/oem-journey")}
                  variant="secondary"
                >
                  {t("Explore OEM process")}
                </ButtonLink>
              </div>
            </div>
            <p lang={activeLocale}>
              {t(
                "TM Apparel ดูแลงานผลิตเสื้อผ้าตามแบบและรายละเอียดที่ลูกค้าอนุมัติ ตั้งแต่เลือกผ้า พัฒนาตัวอย่าง ตัดเย็บ และตกแต่ง จนถึงตรวจคุณภาพและเตรียมส่งมอบ เพื่อให้วัสดุ ขนาด และรายละเอียดของสินค้าสอดคล้องกับความต้องการของแบรนด์",
              )}
            </p>
          </div>
          <Metrics
            items={[
              [
                "Brief",
                "Your requirements",
                "Design, sizes, colours and quantity",
              ],
              ["Fit", "Sample review", "Approve shape, materials and detail"],
              ["Sew", "Garment production", "Cut, assemble and decorate"],
              ["QC", "Quality checks", "Review work before packing"],
            ]}
          />
        </div>
      </section>
      <Customers />
      <section className="section work-capabilities" id="capabilities">
        <div className="container">
          <p className="eyebrow capabilities-ribbon">
            <AppIcon name="factory" size={14} />
            {t(
              "Garment OEM / Thailand · Fabric selection, sample making, cutting, sewing and in-house decoration",
            )}
          </p>
          <div className="capabilities-grid">
            <div>
              <p className="eyebrow">
                {t("Materials & techniques // Matched to your brief")}
              </p>
              <h2>{t("Our capabilities")}</h2>
              <p>
                {t(
                  "Choose from cotton, woven, twill, knit, sports, Ottoman, stretch and rayon fabrics. Pair suitable materials with print, embroidery, washing, pleating and garment details that follow your approved design.",
                )}
              </p>
              <div className="button-row">
                <ButtonLink href={localHref("/start-your-project")}>
                  {t("Start your project")}
                </ButtonLink>
                <ButtonLink
                  href={localHref("/technical-insights")}
                  variant="secondary"
                >
                  {t("Explore technical insight")}
                </ButtonLink>
              </div>
            </div>
            <div className="photo-caption-wrap">
              <Photo
                src={assets.factory}
                alt={t("Main factory production floor")}
              />
              <span className="image-caption">
                {t("Cutting & sewing / Factory floor")}
              </span>
            </div>
            <div className="photo-caption-wrap">
              <Photo
                src={assets.fabric}
                alt={t("Close-up of blue fabric texture")}
              />
              <span className="image-caption">
                {t("Fabric texture / Detail reference")}
              </span>
            </div>
          </div>
          <Metrics
            items={[
              [
                "7–14",
                "Sample-making estimate",
                "Days per round · Confirm your schedule",
              ],
              ["50%", "Bulk production deposit", "After sample approval"],
              [
                "QC",
                "In-line & end-line",
                "Sample during sewing; check every garment",
              ],
              [
                "Pack",
                "Delivery preparation",
                "Press, check needles, label and count",
              ],
            ]}
          />
        </div>
      </section>
      <section className="section work-projects">
        <div className="container">
          <SectionHeader
            label={t("Garment gallery // Style & detail references")}
            icon="shirts"
            title={t("Garment references")}
            aside={
              <p className="micro">
                {t("Explore style and finishing directions")}
                <br />
                <strong>
                  {t("Confirm fabric and details for your own order")}
                </strong>
              </p>
            }
          />
          <ProjectCatalogue />
        </div>
      </section>
      <CTASection title={t("แล้วคุณล่ะ? ถึงคราว Batch ของคุณบ้างแล้ว")} />
    </>
  );
}
