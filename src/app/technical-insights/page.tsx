import type { Metadata } from "next";
import { assets } from "@/content/site";
import { ButtonLink, Photo, SectionHeader } from "@/components/primitives";
import { CTASection } from "@/components/shared-sections";
import {
  InsightLibrary,
  ShrinkageCalculator,
} from "@/components/insight-library";
export const metadata: Metadata = { title: "Technical Insights" };
export default function Insights() {
  return (
    <>
      <header className="insights-intro">
        <div className="container">
          <p className="eyebrow">
            ■ Industrial sourcing archive // Technical bulletins & procurement
            science
          </p>
          <div className="grid-two">
            <h1>
              Technical guides, fabric science &amp; garment manufacturing
              intelligence
            </h1>
            <div>
              <p>
                Researched, practical engineering bulletins for brand founders,
                procurement leads, and technical apparel designers navigating
                yarn selections, pattern tolerances, and tariff frameworks in
                Southeast Asia.
              </p>
              <p className="micro">
                Audit metric: AQL 1.5　 ·　 Standard: ISO 2859-1
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
              alt="Textile testing bench with instruments and sample cloth"
              priority
            />
            <div className="featured-label micro">
              Featured bulletin // 01-A <span>Lab audit complete</span>
            </div>
            <div className="yarn-comparison">
              <p className="eyebrow">
                Yarn comparative analysis · Tolerance ±3%
              </p>
              <p>
                16s Open-End (Rough Drag) <span aria-hidden="true">→</span> 32/2
                Compact Ring (Optimum Drape)
              </p>
            </div>
          </div>
          <article className="featured-copy">
            <p className="eyebrow">
              Material science // GSM & yarn counts · 7 min read
            </p>
            <p className="micro">
              Reviewed: August 2026 by S. Thanakit (Lead textile eng)
            </p>
            <h2>
              GSM vs. yarn count: Deconstructing real apparel fabric weight and
              hand-feel
            </h2>
            <p>
              Why higher GSM does not automatically guarantee longevity or
              premium drape. A comparative laboratory analysis of 16s vs. 32/2
              combed cotton, twisted compact yarns, and finishing enzyme wash
              shrinkage ratios.
            </p>
            <div className="engineering-summary">
              <h3 className="micro">
                Engineering summary / Three core takeaways
              </h3>
              <ol>
                <li>
                  Single-jersey vs loopback French Terry yarn twist dynamics
                  direct air permeability and surface torque.
                </li>
                <li>
                  How singeing and bio-polishing counteract surface pilling in
                  dense 300+ GSM heavyweight knits.
                </li>
                <li>
                  Practical tolerance limits: ±3% GSM deviation across
                  lot-to-lot vat dyeing runs.
                </li>
              </ol>
            </div>
            <div className="split-label">
              <ButtonLink
                href="/contact?inquiry=general&subject=Request%20MAT-0492-26%20bulletin"
                variant="dark"
              >
                Read technical bulletin ↗
              </ButtonLink>
              <p className="micro">Spec registry // #MAT-0492-26</p>
            </div>
          </article>
        </div>
      </section>
      <InsightLibrary />
      <section className="section toolkit" id="toolkit">
        <div className="container">
          <SectionHeader
            label="Procurement & sourcing toolkit // Download center"
            title="Practical tools & specification calculators"
            aside={
              <p className="micro">
                Audited compliance templates // Revision 2026.4
              </p>
            }
          />
          <div className="grid-three">
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                ☑
              </span>
              <p className="eyebrow">Excel / CAD compatible</p>
              <h3>Sizing matrix spec sheet</h3>
              <p>
                Standardised grade-rules mapping XS through 3XL for North
                American and European standard fits. Includes built-in
                mathematical tolerance guardrails to identify grading distortion
                early.
              </p>
              <ButtonLink
                href="/contact?inquiry=general&subject=Request%20sizing%20matrix%20XLSX"
                variant="secondary"
                className="tool-button"
              >
                Request spec sheet (XLSX) ↗
              </ButtonLink>
            </article>
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                ☑
              </span>
              <p className="eyebrow">Interactive script // AATCC 135</p>
              <h3>Fabric shrinkage calculator</h3>
              <p>
                Measure fabric dimensional change and calculate a corresponding
                pattern scaling factor from your original and washed sample
                measurements.
              </p>
              <ShrinkageCalculator />
            </article>
            <article className="tool-card">
              <span className="tool-icon" aria-hidden="true">
                ☑
              </span>
              <p className="eyebrow">PDF dossier // 14 pages</p>
              <h3>Technical dossier checklist</h3>
              <p>
                The exact pre-production vetting checklist utilised across our
                Bangkok line managers before initiating bulk fabric knife
                cutting. Covers grainline verify, needle type, thread spec, and
                label placements.
              </p>
              <ButtonLink
                href="/contact?inquiry=general&subject=Request%20technical%20dossier%20PDF"
                variant="secondary"
                className="tool-button"
              >
                Request dossier (PDF) ↗
              </ButtonLink>
            </article>
          </div>
        </div>
      </section>
      <CTASection title="เริ่มต้นด้วยผ้า หรือดีไซน์ ที่ตอบโจทย์กับ Brand ของคุณ" />
    </>
  );
}
