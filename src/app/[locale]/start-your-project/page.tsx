import { getTranslations, pageMetadata } from "@/lib/translations";
import { AppIcon } from "@/components/app-icon";
import { EnquiryForm } from "@/components/enquiry-form";
import { Photo, DataRows } from "@/components/primitives";
import { assets, company } from "@/content/site";
export const generateMetadata = pageMetadata("Start Your Project");
export default async function Start({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { t } = await getTranslations();

  const params = await searchParams;
  return (
    <div className="start-page dark">
      <div className="container">
        <header className="start-intro">
          <div className="split-label micro">
            <span>
              <AppIcon name="checklist" size={14} />
              {t(
                "Garment project brief · Design, quantity & delivery requirements",
              )}
            </span>
            <span>
              {t(
                "Materials · Sample review · Production checks · Packing & delivery",
              )}
            </span>
          </div>
          <h1>{t("Start your OEM garment project")}</h1>
          <p>
            {t(
              "Tell us what you want to make, how many pieces you need, and when you need them. Our team will review your brief and contact you to discuss the next step.",
            )}
          </p>
        </header>
        <div className="start-grid">
          <EnquiryForm
            kind="project"
            initialStage={
              typeof params.stage === "string" ? params.stage : undefined
            }
            initialCategory={
              typeof params.category === "string" ? params.category : undefined
            }
          />
          <aside className="start-sidebar">
            <section className="sidebar-panel">
              <p className="eyebrow">{t("Production desk / Bangkok")}</p>
              <h2>{t("From brief to sample")}</h2>
              <p className="micro">
                {t("Select materials and review your garment sample")}
              </p>
              <Photo
                src={assets.startFactory}
                alt={t("Factory cutting and sampling floor")}
              />
              <div className="sidebar-stats micro">
                <div>
                  <strong>{t("7–14 days")}</strong>
                  <span>{t("Sample estimate / round")}</span>
                </div>
                <div>
                  <strong>{t("50%")}</strong>
                  <span>{t("Bulk production deposit")}</span>
                </div>
              </div>
            </section>
            <section className="sidebar-panel">
              <h2 className="micro">
                {t("What happens next")}
                {t(" ")}
                <span className="float-right brand-accent">
                  {t("Protocol")}
                </span>
              </h2>
              <ol className="next-steps">
                {[
                  [
                    "Brief review · Approx. 1–2 days",
                    "Send your design, references, sizes, colours, quantity and delivery date.",
                  ],
                  [
                    "Quotation · Approx. 2–5 days",
                    "Review the price, order quantity and materials with the team.",
                  ],
                  [
                    "Sample making & approval",
                    "Sample fee: THB 1,000–2,000; credit towards a production order under agreed terms.",
                  ],
                  [
                    "Bulk production · Approx. 30–45 days",
                    "After approval and a 50% deposit; timing depends on fabric ordering and quantity.",
                  ],
                ].map(([title, body]) => (
                  <li key={title}>
                    <strong>{t(title)}</strong>
                    <p>{t(body)}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section className="sidebar-panel confidentiality">
              <h2 className="micro brand-accent">
                {t("Design & agreement requirements")}
              </h2>
              <p>
                {t(
                  "Tell the team if your brief includes confidential designs or requires an NDA. Confirm the agreement, permitted use and handling of project files before sharing sensitive material. Selecting an NDA request in the form starts that discussion.",
                )}
              </p>
              <p className="micro">
                {t("Confirm project terms before production")}
              </p>
            </section>
            <section className="sidebar-panel">
              <h2 className="micro">{t("Direct desk channels")}</h2>
              <DataRows
                items={[
                  ["Telephone", company.telephone],
                  ["Fax", company.fax],
                  ["Factory location", company.location],
                ]}
              />
              <p className="micro">
                {t("Operating hours:")} {t(company.hours)} ICT (UTC+7)
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
