import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Photo, DataRows } from "@/components/primitives";
import { assets } from "@/content/site";
export const metadata: Metadata = { title: "Start Your Project" };
export default async function Start({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <div className="start-page dark">
      <div className="container">
        <header className="start-intro">
          <div className="split-label micro">
            <span>
              ■ Secure intake portal · Bilateral NDA encrypted transmission
            </span>
            <span>
              TLS 1.3 256-bit　 |　 ISO 9001:2015 audited facility　 |　 BKK
              desk: active
            </span>
          </div>
          <h1>Start your OEM garment project</h1>
          <p>
            Tell us what you want to make, how many pieces you need, and when
            you need them. Our team will review your brief and contact you to
            discuss the next step.
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
              <p className="eyebrow">Production desk / Bangkok</p>
              <h2>Yannawa clean lines</h2>
              <p className="micro">
                Automated Gerber vector cutting & sampling lab
              </p>
              <Photo
                src={assets.startFactory}
                alt="Factory cutting and sampling floor"
              />
              <div className="sidebar-stats micro">
                <div>
                  <strong>18 days</strong>
                  <span>Avg sample speed</span>
                </div>
                <div>
                  <strong>99.4%</strong>
                  <span>AQL pass rate</span>
                </div>
              </div>
            </section>
            <section className="sidebar-panel">
              <h2 className="micro">
                What happens next{" "}
                <span className="float-right bronze">Protocol</span>
              </h2>
              <ol className="next-steps">
                {[
                  [
                    "Intake triage within 4 hours",
                    "Project is routed directly to a designated line engineer.",
                  ],
                  [
                    "Material & BOM costing in 24h",
                    "Feasibility, textile yardage, stock check, and volume bracket.",
                  ],
                  [
                    "Prototype & fit schedule",
                    "Lead timeline committed for pre-production sample approval.",
                  ],
                  [
                    "Bilateral NDA countersignatures",
                    "Signed copy of bilateral agreement transmitted along with registered production intake ID.",
                  ],
                ].map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section className="sidebar-panel confidentiality">
              <h2 className="micro bronze">Confidentiality assurance</h2>
              <p>
                All proprietary pattern blocks, grading increments, tech packs,
                and visual graphics transmitted through this intake terminal
                remain strictly your exclusive intellectual property. We do not
                white-label client patterns for third-party production under any
                circumstances.
              </p>
              <p className="micro">ISO 27001 data secured · Bangkok HQ</p>
            </section>
            <section className="sidebar-panel">
              <h2 className="micro">Direct desk channels</h2>
              <DataRows
                items={[
                  ["Bangkok production desk", "+66 2 212 8900"],
                  ["Encrypted brief email", "briefs@atelier-oem.com"],
                  ["Registered facility", "Yannawa, Bangkok, TH"],
                ]}
              />
              <p className="micro">
                Operating hours: Mon – Fri | 08:00 – 17:30 ICT (UTC+7)
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
