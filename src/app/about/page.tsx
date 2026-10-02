import type { Metadata } from "next";
import Image from "next/image";
import { assets, copy, machinery } from "@/content/site";
import {
  ButtonLink,
  DataRows,
  Metrics,
  Photo,
  SectionHeader,
} from "@/components/primitives";
import { CTASection, Manufacturing } from "@/components/shared-sections";

export const metadata: Metadata = { title: "About Us" };
const facilities = [
  [
    "Sector A // CAD-CAM",
    "01. Automated pre-production",
    "Gerber Accumark pattern digitalisation with automated tension-free fabric spreading tables calibrated to 0.1 mm tolerance.",
  ],
  [
    "Sector B // Modular assembly",
    "02. Synchronous line modules",
    "Yamato interlock and Juki automated stitch stations operating lean U-cell formations for instantaneous flow adjustment.",
  ],
  [
    "Sector C // AQL lab",
    "03. Physical & wet testing",
    "In-house spectrophotometer verification, crocking friction resistance testing, and dual-aperture needle detection corridors.",
  ],
];
const certifications = [
  [
    "ISO 9001:2015",
    "Quality management systems",
    "TH-2023-8891",
    "SGS International (Thailand) Ltd.",
    "Unconditional Pass",
    "Valid through Nov 2026",
  ],
  [
    "WRAP Gold Certificate",
    "Worldwide Responsible Accredited Production",
    "Facility ID #18492",
    "Independent Third-Party Social Auditor",
    "Grade A (Full Compliance)",
    "Annual Renewal (Aug 2025)",
  ],
  [
    "OEKO-TEX Standard 100",
    "Class I (Baby & Infant) & Class II",
    "Cert No. 24.HTH.99120",
    "Hohenstein Textile Testing Institute",
    "Zero Harmful Substances",
    "Valid through Jan 2026",
  ],
  [
    "SEDEX SMETA 4-Pillar",
    "Ethical trade, labor, health & environment",
    "Sedex Ref ZC40822194",
    "Intertek Testing Services",
    "0 Critical Non-Conformances",
    "Continuous Bi-Monthly Review",
  ],
];
const team = [
  [
    "VP Industrial Engineering",
    "22 years exp",
    "Marcus Vance",
    "Former technical line coordinator for leading European performance outerwear groups. Leads plant throughput optimisation, machinery telemetry integration, and automated vector calibration.",
    "CAM Automation & Lean Six Sigma",
  ],
  [
    "Chief Patternmaker & CAD Lead",
    "19 years exp",
    "Supaporn Thanakit",
    "Master pattern engineer specialising in drape mechanics, complex tailored seams, and high-yield nested marker efficiency. Oversees sample prototyping and Gerber digitising desks.",
    "Geometric Grading & 3D Fitting",
  ],
  [
    "Quality Assurance Director",
    "16 years exp",
    "Aris Thorne",
    "Leads the 4-tier inspection team and compliance registry. Former lead auditor at SGS with extensive expertise in AQL 1.0 protocols, chemical restriction lists, and tensile durability metrics.",
    "AQL Audit & Material Chemistry",
  ],
];

export default function About() {
  return (
    <>
      <section className="about-hero dark">
        <Image
          src={assets.aboutHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow chip">About TM Apparel</p>
            <h1 lang="th">
              โรงงานรับผลิตเสื้อผ้า OEM
              <br />
              สำหรับ Brand ไทยและต่างประเทศ
            </h1>
            <p lang="th">{copy.about}</p>
            <p lang="th">
              โรงงานของเราก่อตั้งขึ้นในปี พ.ศ. 2541
              และสั่งสมประสบการณ์ในการผลิตเสื้อผ้าให้แก่ห้างค้าปลีกชั้นนำของไทย
              อาทิ Tesco Lotus, Big C และ The Mall
              เพื่อวางแผนทุกขั้นตอนให้เหมาะกับแต่ละโปรเจกต์
            </p>
            <div className="button-row">
              <ButtonLink href="/start-your-project">
                Start your project
              </ButtonLink>
              <ButtonLink href="/our-work" variant="secondary">
                Explore our work
              </ButtonLink>
            </div>
          </div>
          <aside className="factory-summary">
            <div className="split-label micro">
              <strong>Summary</strong>
              <span>Factory overview</span>
            </div>
            <DataRows
              items={[
                ["Total facility area", "8,200 sqm"],
                ["Our compliance", "50,000 pieces"],
                ["Throughput index", "50,000 pcs / month"],
                ["Our team", "328 full-time staff"],
                ["Minimum batch", "800 pcs / batch"],
                ["Primary workstations", "140+ units"],
              ]}
            />
            <p className="micro">
              Single-facility jurisdiction: all patternmaking, laser grading,
              assembly, wash treatments, and export customs bonding occur inside
              plant parameter BKK-YNN-01.
            </p>
          </aside>
        </div>
      </section>
      <section className="facility-cards section">
        <div className="container grid-three">
          {facilities.map(([label, title, body], i) => (
            <article key={title}>
              <div className="photo-caption-wrap">
                <Photo src={assets.facilities[i]} alt={title} />
                <span className="image-caption">{label}</span>
              </div>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section production-process" id="process">
        <div className="container">
          <SectionHeader
            label="Manufacturing topology // 6 active zones"
            wide
            title="Our registered production process"
            aside={
              <p className="micro">
                Floor ratio: 100% in-house contiguous
                <br />
                Zero outsourcing to unverified sweatshops
              </p>
            }
          />
          <Metrics
            items={[
              ["8,200", "Total facility area", "Square meters"],
              ["140+", "Modular workstations", "Juki / Brother / Yamato"],
              ["50,000", "Monthly capacity", "Finished units / month"],
              ["350", "Our team", "Full-time staff"],
            ]}
          />
          <div className="machine-grid">
            {machinery.map((item, i) => (
              <article key={item.zone}>
                <p className="eyebrow">
                  {item.zone}
                  <span className="float-right">Bay {i + 1}</span>
                </p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <DataRows items={item.details} />
              </article>
            ))}
            <article>
              <p className="eyebrow">Machine 6</p>
              <h3>Machine 6</h3>
            </article>
          </div>
        </div>
      </section>
      <Manufacturing />
      <Manufacturing title="Fabrics" id="fabrics" />
      <section className="section compliance" id="compliance">
        <div className="container">
          <SectionHeader
            label="Quality audit register // Third-party probity"
            wide
            title="Compliance & verification ledger"
            aside={<p className="micro">Last accreditation cycle: Q4 2024</p>}
          />
          <div className="compliance-note">
            <h3 className="micro">Mandatory compliance integrity note</h3>
            <p>
              Atelier OEM operates under strict international supply-chain
              probity. All listed certifications are actively maintained with
              annual on-site inspections. Any certification that lapses or fails
              renewal criteria is immediately quarantined from customer
              contracts. Verifiable certificate registry IDs are disclosed below
              for unannounced validation.
            </p>
          </div>
          <div
            className="table-scroll"
            role="region"
            tabIndex={0}
            aria-label="Certification ledger"
          >
            <table>
              <thead>
                <tr>
                  {[
                    "Standard / Standard body",
                    "Certificate & facility ref",
                    "Auditing authority",
                    "Score / tier",
                    "Validity horizon",
                    "Ledger status",
                  ].map((item) => (
                    <th key={item} scope="col">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {certifications.map(
                  ([name, detail, ref, auditor, score, validity]) => (
                    <tr key={name}>
                      <th scope="row">
                        {name}
                        <span className="micro">{detail}</span>
                      </th>
                      <td>{ref}</td>
                      <td>{auditor}</td>
                      <td>{score}</td>
                      <td>{validity}</td>
                      <td>
                        <span className="status-badge">■ Active</span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="split-label micro ledger-foot">
            <span>
              All certificates backed by direct chain-of-custody tracking
            </span>
            <ButtonLink href="/contact?inquiry=audit" variant="secondary">
              Request audit binder ↗
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section stewardship" id="stewardship">
        <div className="container grid-two">
          <div>
            <p className="eyebrow">Social charter // Operational ethics</p>
            <h2>Ethical labor, fair wage &amp; ESG stewardship</h2>
            <p>
              Atelier OEM rejects low-cost labor arbitrage. We operate on the
              premise that garment engineering excellence requires dignified
              working conditions, career trajectory stability, and strict
              environmental accountability. Our factory floor reflects high
              Scandinavian and Japanese manufacturing hygiene standards.
            </p>
            <div className="ethics-note">
              <h3 className="micro">Zero-tolerance code</h3>
              <p>
                100% prohibited: Underage labor, uncompensated overtime,
                piece-rate wage manipulation, and non-voluntary employment.
                Audited unannounced 6 times annually by accredited neutral
                observers.
              </p>
            </div>
          </div>
          <div className="ethics-grid">
            {[
              [
                "140%",
                "Living wage index",
                "Base floor compensation is pegged at 140% above the statutory minimum wage for the Bangkok Metropolitan Area, supplemented with healthcare bonuses and productivity dividends.",
                "Guaranteed living base",
              ],
              [
                "0.0%",
                "Child / forced labor",
                "Biometric identity verification and government-integrated civil registration audits guarantee absolute adherence to ILO Conventions 138 and 182.",
                "Third-party audited",
              ],
              [
                "24/7",
                "On-site healthcare",
                "Full-time registered nurse stationed during operational hours, comprehensive maternal leave protections, ergonomic workstation engineering, and annual executive health screenings for all operators.",
                "Direct floor medical support",
              ],
              [
                "100%",
                "Closed-loop water",
                "Industrial biological and reverse-osmosis wastewater filtration treats 100% of dye and wash effluent on-site prior to recycling into pre-wash rinse circuits.",
                "Zero chemical discharge",
              ],
            ].map(([value, title, body, foot], i) => (
              <article key={title}>
                <p className="eyebrow">{`Metric 0${i + 1} // ${title}`}</p>
                <strong className="stat-value">{value}</strong>
                <h3>{title}</h3>
                <p>{body}</p>
                <p className="micro bronze">{foot}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section team-section" id="leadership">
        <div className="container">
          <SectionHeader
            label="Our specialised team"
            title="Leadership & engineering"
            aside={
              <p className="micro">
                Operational directors directly accessible to client partners
              </p>
            }
          />
          <div className="grid-three">
            {team.map(([role, exp, name, body, discipline], i) => (
              <article className="team-card" key={name}>
                <Photo src={assets.team[i]} alt={`${name}, ${role}`} />
                <div className="team-body">
                  <div className="split-label micro">
                    <span>{role}</span>
                    <span>{exp}</span>
                  </div>
                  <h3>{name}</h3>
                  <p>{body}</p>
                  <p className="micro">
                    <strong>Discipline:</strong>
                    <br />
                    {discipline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="ประสบการณ์การผลิต ที่เติบโตไปพร้อมกับ Brand" />
    </>
  );
}
