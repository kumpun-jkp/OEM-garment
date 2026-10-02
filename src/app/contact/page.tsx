import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { Photo, SectionHeader } from "@/components/primitives";
import { assets } from "@/content/site";
export const metadata: Metadata = { title: "Contact Us" };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <>
      <section className="contact-intro">
        <div className="container">
          <p className="eyebrow">
            ■ Direct desk channels // BKK commercial & production operations //
            UTC+7 · Triage SLA: &lt;4 hours
          </p>
          <SectionHeader
            level={1}
            title="Direct access to our Bangkok industrial desk & production engineers"
            aside={
              <p>
                Engage directly with our commercial quotation leads, master
                pattern engineers, and export dispatch officers in Yannawa,
                Bangkok. No middle-tier sales agents.
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
              <p className="eyebrow">Plant dispatch registry</p>
              <div className="split-label">
                <h2>
                  Yannawa
                  <br />
                  industrial campus
                </h2>
                <p className="micro">
                  Lat 13.6987° N<br />
                  Lon 100.5422° E
                </p>
              </div>
              <a
                className="location-map"
                href="https://www.google.com/maps/search/?api=1&query=13.6987%2C100.5422"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Yannawa industrial campus coordinates in Google Maps"
              >
                <span className="micro">Sector BKK-South // C-4 facility</span>
                <span className="map-marker" aria-hidden="true" />
                <span className="micro">
                  ■ 78/12 Industrial Ring Road · Active gate 02 ↗
                </span>
              </a>
              <div className="registered-address">
                <h3 className="micro">Registered facility address</h3>
                <address>
                  78/12 Industrial Ring Road, Chong Nonsi, Yannawa, Bangkok
                  10120, Thailand
                </address>
                <p className="micro">
                  Tax identification ID: 0105558190241 · Registered export
                  license #EXP-TH-9412
                </p>
              </div>
              <h3 className="micro bronze">
                Strategic export logistical proximity
              </h3>
              <div className="proximity">
                {[
                  ["14 km", "Klong Toey river port"],
                  ["32 km", "Suvarnabhumi air cargo (BKK)"],
                  ["118 km", "Laem Chabang deep sea port"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <p className="micro">{label}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="contact-channels">
              <div className="split-label">
                <h2 className="micro">Direct channels roster</h2>
                <span className="eyebrow">Monitored UTC+7</span>
              </div>
              <div className="grid-two channel-grid">
                <div>
                  <h3 className="eyebrow">Bangkok production desk</h3>
                  <a href="tel:+6622128900" className="channel-phone">
                    +66 2 212 8900
                  </a>
                  <p className="micro">Lines 01–06 switchboard</p>
                </div>
                <div>
                  <h3 className="eyebrow">Encrypted CAD / tech briefs</h3>
                  <a href="mailto:briefs@atelier-oem.com">
                    briefs@atelier-oem.com
                  </a>
                  <p className="micro">Engineering routing</p>
                </div>
                <div>
                  <h3 className="eyebrow">Commercial & contract office</h3>
                  <a href="mailto:commercial@atelier-oem.com">
                    commercial@atelier-oem.com
                  </a>
                  <p className="micro">RFQ evaluation unit</p>
                </div>
                <div>
                  <h3 className="eyebrow">Direct B2B messaging</h3>
                  <a
                    href="https://wa.me/66819924500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp: +66 81 992 4500
                  </a>
                  <a
                    href="https://line.me/R/ti/p/%40atelieroem"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LINE OA: @atelieroem
                  </a>
                </div>
              </div>
              <div className="visit-protocol">
                <h3 className="micro">Plant visit & buyer audit protocol</h3>
                <p>
                  To guarantee undisturbed production line cadence and adhere to
                  ISO/WRAP industrial compliance guidelines, facility
                  walk-throughs require formal scheduling:
                </p>
                <ul className="micro">
                  <li>Minimum 48 hours advance booking via commercial desk</li>
                  <li>
                    Mandatory safety PPE (steel-toe caps, eye protection)
                    supplied at gate 02
                  </li>
                  <li>
                    Mutual NDA executed prior to pattern archive room entrance
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
              "08:00 – 17:30",
              "Monday through Friday (UTC+7)",
            ],
            ["Response guarantee", "≤ 4 hours", "Direct engineering triage"],
            [
              "Export regulatory hub",
              "Customs Form D/E",
              "ASEAN-EU preferential clearance",
            ],
          ].map(([label, value, body]) => (
            <div key={label}>
              <h2 className="eyebrow">{label}</h2>
              <strong>{value}</strong>
              <p className="micro">{body}</p>
            </div>
          ))}
          <Link href="/start-your-project">
            <h2 className="eyebrow">Spec evaluation terminal</h2>
            <strong>Start Project →</strong>
            <p className="micro">Structured CAD / BOM intake</p>
          </Link>
        </div>
      </section>
      <section className="contact-photos">
        <div className="container grid-three">
          {[
            "Laser cutting suite 02 · BKK plant",
            "Materials testing & QC bay · AQL 1.5 calibration",
            "Container dispatch gate 02 · Daily port shuttle",
          ].map((label, i) => (
            <figure key={label}>
              <Photo src={assets.contact[i]} alt={label} />
              <figcaption className="micro">{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
