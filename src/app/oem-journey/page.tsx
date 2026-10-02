import type { Metadata } from "next";
import Image from "next/image";
import { assets, copy, stages } from "@/content/site";
import { ButtonLink, Photo, SectionHeader } from "@/components/primitives";
import { CapabilityCard, CTASection } from "@/components/shared-sections";
export const metadata: Metadata = { title: "OEM Journey" };
const questions = [
  "What if our brand does not have complete CAD tech packs?",
  "How are proto sampling fees credited towards bulk production?",
  "What is the standard production timeline from proto to port dispatch?",
  "How is client intellectual property and design protected?",
];
export default function Journey() {
  return (
    <>
      <section className="journey-hero">
        <Image
          src={assets.journeyHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container grid-two">
          <div>
            <p className="eyebrow">OEM process</p>
            <h1 lang="th">
              เปลี่ยนไอเดียของคุณ
              <br />
              สู่สินค้าพร้อมขายอย่างเป็นระบบ
            </h1>
            <p lang="th">{copy.journey}</p>
            <div className="button-row">
              <ButtonLink href="/start-your-project" variant="secondary">
                Start your project
              </ButtonLink>
              <ButtonLink href="/our-work" variant="secondary">
                Explore our work
              </ButtonLink>
            </div>
          </div>
          <div className="photo-caption-wrap">
            <Photo
              src={assets.factory}
              alt="Main assembly line factory floor"
              priority
            />
            <span className="image-caption">
              ■ Yannawa main assembly line / Live factory gate
            </span>
          </div>
        </div>
      </section>
      <section className="section process-stages">
        <div className="container">
          <SectionHeader
            label="Synchronised from requirement to delivery"
            title={
              <span lang="th">
                จากไอเดียสู่สินค้าพร้อมขาย
                <br />
                ใน 8 ขั้นตอน
              </span>
            }
            aside={<p className="micro">Standard SLA: 24–38 working days</p>}
          />
          <ol className="stage-grid">
            {stages.map(([title, body, output], i) => (
              <li key={title}>
                <p className="eyebrow">
                  Stage {String(i + 1).padStart(2, "0")}
                </p>
                <h3>{title}</h3>
                <p lang="th">{body}</p>
                <div className="stage-output">
                  <p className="eyebrow">Output</p>
                  <p lang="th">{output}</p>
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
            alt="Quality technician measuring fabric on a testing table"
            sizes="100vw"
          />
          <SectionHeader
            label="// Be trusted"
            title="Quality control protocol"
            aside={
              <p className="micro">
                Zero defect tolerance · 100% human conveyor scanned
              </p>
            }
          />
          <div className="grid-four">
            {Array.from({ length: 4 }, (_, i) => (
              <CapabilityCard key={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container">
          <p className="eyebrow">{"// Inquiry resolution"}</p>
          <h2>Technical FAQ</h2>
          <div className="faq-list">
            {questions.map((question, i) => (
              <details key={question}>
                <summary>
                  <span className="bronze micro">0{i + 1}</span>
                  {question}
                  <span className="faq-arrow" aria-hidden="true">
                    ⌄
                  </span>
                </summary>
                <p>
                  {i === 0
                    ? "You can start with an idea, sample, sketch, or reference image. Submit the details you have for feasibility review."
                    : "The commercial desk can confirm the terms, timeline, and documentation for your project."}{" "}
                  <ButtonLink
                    href={`/contact?inquiry=general&subject=${encodeURIComponent(question)}`}
                    variant="secondary"
                  >
                    Discuss this question →
                  </ButtonLink>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="พร้อมที่จะเริ่มงานของพวกเรา ไปด้วยกันหรือยัง" />
    </>
  );
}
