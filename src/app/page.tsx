import Image from "next/image";
import Link from "next/link";
import { assets, copy } from "@/content/site";
import { ButtonLink, Photo, SectionHeader } from "@/components/primitives";
import {
  CTASection,
  Customers,
  Manufacturing,
} from "@/components/shared-sections";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Image
          src={assets.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background"
        />
        <div className="container">
          <div className="hero-ribbon micro">
            <span>■ Garment OEM · Bangkok HQ</span>
            <span>ISO 9001:2015 registered　 Capacity: 120K pcs/mo</span>
          </div>
          <div className="hero-columns">
            <div>
              <h1 lang="th">เปลี่ยนไอเดียของคุณ ให้เป็นสินค้าพร้อมขาย</h1>
              <div className="button-row">
                <ButtonLink href="/about">About us</ButtonLink>
                <ButtonLink href="/our-work" variant="secondary">
                  Our work
                </ButtonLink>
              </div>
            </div>
            <p lang="th">{copy.intro}</p>
          </div>
        </div>
      </section>
      <section className="why-section">
        <div className="container">
          <div className="why-copy">
            <p className="eyebrow">Why us?</p>
            <h2 lang="th">
              เราเป็นพาร์ตเนอร์การผลิต ตั้งแต่เริ่มบรีฟจนถึงส่งมอบ
            </h2>
            <p lang="th">{copy.why}</p>
            <div className="button-row">
              <ButtonLink href="/about">About us</ButtonLink>
              <ButtonLink href="/our-work" variant="secondary">
                Our work
              </ButtonLink>
            </div>
          </div>
          <figure className="facility-photo">
            <Photo
              src={assets.factory}
              alt="Wide view of a garment factory production floor"
              sizes="100vw"
            />
            <figcaption className="image-caption">
              Facility // Yannawa plant A
            </figcaption>
            <div className="facility-status micro">
              <div>
                Lead time<strong>21–28 days</strong>
              </div>
              <div>
                In-line QC<strong>AQL 2.5 pass</strong>
              </div>
            </div>
          </figure>
        </div>
      </section>
      <section className="home-facts">
        <div>
          <span className="eyebrow">01</span>
          <h2>Operated since 1998</h2>
          <p className="micro">Our experience</p>
        </div>
        <div>
          <span className="eyebrow">02</span>
          <h2>Flexible inputs</h2>
          <p className="micro">CAD tech pack, sample reference, or sketch</p>
        </div>
        <div>
          <span className="eyebrow">03</span>
          <h2>50,000 pcs per month</h2>
          <p className="micro">Trusted production capacity</p>
        </div>
        <div>
          <span className="eyebrow">04</span>
          <h2>24h review</h2>
          <p className="micro">Direct review by production engineers</p>
        </div>
      </section>
      <section className="section gateways">
        <div className="container">
          <SectionHeader
            label="Submission gateways"
            title="Select your starting point"
            aside={<p lang="th">{copy.gateways}</p>}
          />
          <div className="grid-two gateway-grid">
            {[
              {
                image: assets.idea,
                label: "Stage 01 / Concept",
                tag: "Consultative",
                title: "Start from scratch",
                description:
                  "บอกเราเกี่ยวกับสินค้าที่อยากทำ กลุ่มลูกค้า หรือผลลัพธ์ที่ต้องการ เพื่อช่วยกันกำหนดข้อมูลที่จำเป็นก่อนเริ่มผลิต",
                cta: "Request consultation",
                stage: "concept",
              },
              {
                image: assets.production,
                label: "Stage 02 / Production",
                tag: "Ready to production",
                title: "Early product idea",
                description:
                  "ส่งตัวอย่างสินค้า ภาพอ้างอิง สเก็ตช์ หรือแบบที่มี พร้อมระบุจำนวนที่ต้องการและวันที่ต้องการใช้งาน",
                cta: "Submit reference brief",
                stage: "reference",
              },
            ].map((item) => (
              <article className="gateway-card" key={item.stage}>
                <div className="split-label micro">
                  <span>{item.label}</span>
                  <span>{item.tag}</span>
                </div>
                <Photo
                  src={item.image}
                  alt={
                    item.stage === "concept"
                      ? "Team reviewing garment concepts and sample materials"
                      : "Apparel samples prepared for production"
                  }
                />
                <h3>{item.title}</h3>
                <p lang="th">{item.description}</p>
                <ButtonLink
                  href={`/start-your-project?stage=${item.stage}`}
                  variant="secondary"
                  className="card-link"
                >
                  {item.cta}
                  <span aria-hidden="true">↗</span>
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Manufacturing />
      <section className="section selected-work">
        <div className="container">
          <SectionHeader
            label="Material & production execution"
            title="Core manufacturing lines"
            aside={
              <p className="micro">Audited factory specs · 100% in-house</p>
            }
          />
          <div className="work-editorial">
            <div className="split-label">
              <div>
                <p className="eyebrow pink">Selected work</p>
                <h3>Ideas, made real.</h3>
                <p>
                  Explore recent partnerships and the disciplines we bring
                  together.
                </p>
              </div>
              <ButtonLink href="/our-work" variant="dark">
                View all projects
              </ButtonLink>
            </div>
            <div className="grid-two editorial-projects">
              {[
                {
                  image: assets.marrow,
                  meta: "Brand system · 2026",
                  title: "Marrow — a cultural identity built to move.",
                  body: "A flexible identity and launch campaign for a new home of contemporary dance.",
                  tags: "Strategy · Identity · Campaign",
                },
                {
                  image: assets.arcadia,
                  meta: "Digital product · 2026",
                  title: "Arcadia — a calmer way to navigate the city.",
                  body: "A human-first travel platform that turns complex urban journeys into clear choices.",
                  tags: "Research · UX/UI · Motion",
                },
              ].map((item) => (
                <article key={item.title}>
                  <Photo src={item.image} alt={item.title} />
                  <div>
                    <p className="micro pink">{item.meta}</p>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <p className="micro">{item.tags}</p>
                    <ButtonLink href="/our-work" variant="primary">
                      View project →
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
            <h4 className="micro">Browse by discipline</h4>
            <div className="discipline-grid">
              {[
                "Brand strategy|Positioning & voice",
                "Visual identity|Systems & art direction",
                "Digital products|Research, UX & UI",
                "Campaigns|Concept through rollout",
                "Web experiences|Design & build",
                "Packaging|Shelf to unboxing",
                "Editorial|Publications & content",
                "Motion|Film & animation",
              ].map((item) => {
                const [title, body] = item.split("|");
                return (
                  <Link key={title} href="/our-work">
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </Link>
                );
              })}
            </div>
            <div className="split-label micro">
              <span>■ Booking select projects for Q1 2027</span>
              <Link href="/start-your-project">
                Tell us what you’re making →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Customers />
      <CTASection />
    </>
  );
}
