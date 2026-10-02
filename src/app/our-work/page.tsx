import type { Metadata } from "next";
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

export const metadata: Metadata = { title: "Our Work" };
export default function Work() {
  return (
    <>
      <section className="work-hero">
        <Image
          src={assets.workHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container">
          <div className="work-hero-copy grid-two">
            <div>
              <p className="eyebrow">Our work, delivered trust</p>
              <h1 lang="th">
                ผลงานของเรา:
                <br />
                ความไว้วางใจที่เราส่งต่อเป็นสินค้าจริง
              </h1>
              <div className="button-row">
                <ButtonLink href="/start-your-project">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/oem-journey" variant="secondary">
                  Explore OEM process
                </ButtonLink>
              </div>
            </div>
            <p lang="th">
              ตลอดประสบการณ์การผลิตตั้งแต่ปี พ.ศ. 2541 TM Apparel
              ได้ร่วมสร้างสรรค์สินค้าให้แบรนด์และห้างค้าปลีกชั้นนำของไทย
              ผลงานทุกชิ้นสะท้อนความไว้วางใจและการวางแผนการผลิต
              เพื่อเปลี่ยนเป็นสินค้าพร้อมใช้งานและพร้อมส่งมอบ
            </p>
          </div>
          <Metrics
            items={[
              ["300", "Our brand partners", "Brands · with over 89% recurring"],
              [
                "24",
                "Export destinations",
                "Countries · EU, US, JP, AU primary hubs",
              ],
              ["1998", "Manufacturing since", "Experience with lead brands"],
              [
                "08",
                "Active automated suites",
                "Cells · Gerber CNC + ultrasonic bonding",
              ],
            ]}
          />
        </div>
      </section>
      <Customers />
      <section className="section work-capabilities" id="capabilities">
        <div className="container">
          <p className="eyebrow capabilities-ribbon">
            ■ Industrial infrastructure / Thailand · OEM & ODM manufacturing ·
            Facility code BKK-YNN-01 · ISO 9001:2015 registered
          </p>
          <div className="capabilities-grid">
            <div>
              <p className="eyebrow">
                Catalogue & technical scope // Matrix V3.8
              </p>
              <h2>Our capabilities</h2>
              <p>
                Bangkok cut-and-sew facilities and proprietary textile
                partnerships engineered for precision apparel brands globally.
                Calibrated for custom GSMs, rapid sampling, and zero-defect
                export standards.
              </p>
              <div className="button-row">
                <ButtonLink href="/start-your-project">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/technical-insights" variant="secondary">
                  Explore technical insight
                </ButtonLink>
              </div>
            </div>
            <div className="photo-caption-wrap">
              <Photo src={assets.factory} alt="Main factory production floor" />
              <span className="image-caption">
                Line 03: Gerber CAD & cutting floor
              </span>
            </div>
            <div className="photo-caption-wrap">
              <Photo
                src={assets.fabric}
                alt="Close-up of blue fabric texture"
              />
              <span className="image-caption">500 GSM Terry / Macro</span>
            </div>
          </div>
          <Metrics
            items={[
              ["120K", "Specification 1", "Pcs/mo · 78% line utilisation (Q2)"],
              [
                "10",
                "Standard sample turnaround",
                "Working days · Tech pack digitisation",
              ],
              ["800", "Minimum order (MOQ)", "Pcs/style · Multi-colour runs"],
              [
                "0.18%",
                "Defect margin (AQL 1.5)",
                "Actual avg · 3-point inspection",
              ],
            ]}
          />
        </div>
      </section>
      <section className="section work-projects">
        <div className="container">
          <SectionHeader
            label="Execution archive // Batch 2024–2025"
            title="Verified production cases"
            aside={
              <p className="micro">
                Sorted by industrial complexity
                <br />
                <strong>
                  All specs extracted from QA dispatch certificates
                </strong>
              </p>
            }
          />
          <ProjectCatalogue />
        </div>
      </section>
      <CTASection title="แล้วคุณล่ะ? ถึงคราว Batch ของคุณบ้างแล้ว" />
    </>
  );
}
