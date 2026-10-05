import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { Photo, SectionHeader } from "@/components/primitives";
import { assets, company } from "@/content/site";
export const generateMetadata = pageMetadata("Contact Us");
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { t, href: localHref } = await getTranslations();

  const params = await searchParams;
  return (
    <>
      <section className="contact-intro">
        <div className="container">
          <p className="eyebrow">
            <AppIcon name="work" size={14} />
            {t(
              "Project enquiries // Garment briefs, quotations & factory visits // UTC+7 · Arrange a time with the team",
            )}
          </p>
          <SectionHeader
            icon="brief"
            label={t("Discuss your garment brief")}
            level={1}
            title={t(
              "Talk to our team about your garment project & production requirements",
            )}
            aside={
              <p>
                {t(
                  "Share your design, quantities, sizes, colours and delivery requirements. The team can discuss materials, sampling, quotations and the next steps for your project.",
                )}
              </p>
            }
          />
        </div>
      </section>
      <section className="section contact-content">
        <div className="container grid-two contact-columns">
          <EnquiryForm
            kind="contact"
            initialInquiry={
              typeof params.inquiry === "string" ? params.inquiry : undefined
            }
            subject={
              typeof params.subject === "string" ? params.subject : undefined
            }
          />
          <div>
            <section className="plant-registry dark">
              <p className="eyebrow">
                {t("Thonburi Master · Factory location")}
              </p>
              <div className="split-label">
                <h2>
                  {t("Bang Bon")}
                  <br />
                  {t("garment factory")}
                </h2>
                <p className="micro">
                  {t("Bangkok")}
                  <br />
                  {t("10150 · Thailand")}
                </p>
              </div>
              <a
                className="location-map"
                href={localHref(company.mapHref)}
                target="_blank"
                rel="noreferrer"
                aria-label={t(
                  "Open Thonburi Master factory address in Google Maps",
                )}
              >
                <span className="micro">{t("Bang Bon // Bangkok")}</span>
                <AppIcon name="location" size={40} className="map-marker" />
                <span className="micro">
                  {t("14/160 หมู่บ้านศรีทวีวิลล์ · ถนนเอกชัย")}
                  {t(" ")}
                  <AppIcon name="outward" size={14} />
                </span>
              </a>
              <div className="registered-address">
                <h3 className="micro">{t("Factory address")}</h3>
                <address>{t(company.address)}</address>
                <p className="micro">
                  {t(
                    "Discuss factory audit and operating document details with our team.",
                  )}
                </p>
              </div>
              <h3 className="micro brand-accent">
                {t("Project planning estimates")}
              </h3>
              <div className="proximity">
                {[
                  ["1–2 days", "Brief review estimate"],
                  ["7–14 days", "Sample estimate / round"],
                  ["30–45 days", "Bulk estimate · Fabric & quantity dependent"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <strong>{t(value)}</strong>
                    <p className="micro">{t(label)}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="contact-channels">
              <div className="split-label">
                <h2 className="micro">{t("Direct channels roster")}</h2>
                <span className="eyebrow">{t("Monitored UTC+7")}</span>
              </div>
              <div className="grid-two channel-grid">
                <div>
                  <h3 className="eyebrow">
                    <AppIcon name="phone" size={16} />
                    {t("Telephone")}
                  </h3>
                  <a
                    href={localHref(company.telephoneHref)}
                    className="channel-phone"
                  >
                    {t(company.telephone)}
                  </a>
                  <p className="micro">{t("Thonburi Master · TM Apparel")}</p>
                </div>
                <div>
                  <h3 className="eyebrow">
                    <AppIcon name="fax" size={16} />
                    {t("Fax")}
                  </h3>
                  <span className="channel-phone">{t(company.fax)}</span>
                  <p className="micro">{t("Factory office")}</p>
                </div>
                <div>
                  <h3 className="eyebrow">
                    <AppIcon name="schedule" size={16} />
                    {t("Monday–Friday")}
                  </h3>
                  <span>{t("08:00–18:00")}</span>
                  <p className="micro">{t("Bangkok time · UTC+7")}</p>
                </div>
                <div>
                  <h3 className="eyebrow">
                    <AppIcon name="schedule" size={16} />
                    {t("Saturday")}
                  </h3>
                  <span>{t("08:00–18:00")}</span>
                  <Link href={localHref("/contact?inquiry=visit")}>
                    {t("Arrange a factory visit")}
                  </Link>
                </div>
              </div>
              <div className="visit-protocol">
                <h3 className="micro">
                  {t("Plant visit & buyer audit protocol")}
                </h3>
                <p>
                  {t(company.visitHours)}
                  {t("(Bangkok time · UTC+7).")}
                  {t(" ")}
                  {t(company.visitBooking)}
                </p>
                <ul className="micro">
                  <li>{t("Agree a visit date and time with the team")}</li>
                  <li>{t("Ask about visitor instructions before arrival")}</li>
                  <li>
                    {t("Discuss confidentiality requirements when booking")}
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className="contact-schedule">
        <div className="container grid-four">
          {[
            [
              "Operating schedule",
              "08:00–18:00",
              "Monday through Saturday (UTC+7)",
            ],
            [
              "Brief review estimate",
              "1–2 days",
              "Approximate · Confirm your schedule",
            ],
            [
              "Quotation estimate",
              "2–5 days",
              "Approximate · Depends on project details",
            ],
          ].map(([label, value, body]) => (
            <div key={label}>
              <h2 className="eyebrow">{t(label)}</h2>
              <strong>{t(value)}</strong>
              <p className="micro">{t(body)}</p>
            </div>
          ))}
          <Link href={localHref("/start-your-project")}>
            <h2 className="eyebrow">{t("Spec evaluation terminal")}</h2>
            <strong>
              {t("Start Project")}
              <AppIcon name="forward" />
            </strong>
            <p className="micro">{t("Structured CAD / BOM intake")}</p>
          </Link>
        </div>
      </section>
      <section className="contact-photos">
        <div className="container grid-three">
          {[
            "Fabric preparation & cutting · Factory reference",
            "Material review & quality checks · Factory reference",
            "Packing & delivery preparation · Factory reference",
          ].map((label, i) => (
            <figure key={label}>
              <Photo src={assets.contact[i]} alt={t(label)} />
              <figcaption className="micro">{t(label)}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
