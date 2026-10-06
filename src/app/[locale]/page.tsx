import Image from "next/image";
import { getTranslations } from "@/lib/translations";
import { ProductShowcase } from "@/components/product-showcase";
import { HomeJourney } from "@/components/home-journey";
import { AppIcon } from "@/components/app-icon";
import { assets, homeCopy, stages } from "@/content/site";
import { ButtonLink, SectionHeader } from "@/components/primitives";
import { ContactBlock, Customers } from "@/components/shared-sections";
const reasons = [
  ["skilled", "skilledBody"],
  ["spec", "specBody"],
  ["moq", "moqBody"],
  ["care", "careBody"],
] as const;
const checks = [
  ["before", "beforeBody"],
  ["during", "duringBody"],
  ["after", "afterBody"],
] as const;
const questions = [
  ["timeQuestion", "timeAnswer"],
  ["designQuestion", "designAnswer"],
  ["sampleQuestion", "sampleAnswer"],
] as const;
export default async function Home() {
  const { t, href, locale } = await getTranslations();
  const text = (key: keyof typeof homeCopy) => homeCopy[key][locale];
  const actions = (
    <div className="button-row">
      <ButtonLink href={href("/start-your-project")}>
        {text("project")}
      </ButtonLink>
      <ButtonLink href={href("/contact?inquiry=visit")} variant="secondary">
        {text("visit")}
      </ButtonLink>
    </div>
  );
  const exploreActions = (
    <div className="button-row">
      <ButtonLink href={href("/about")}>{t("About us")}</ButtonLink>
      <ButtonLink href={href("/our-work")} variant="secondary">
        {t("Our work")}
      </ButtonLink>
    </div>
  );
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
            <span>
              <AppIcon name="factory" size={14} />
              {t("Garment OEM · Bangkok HQ")}
            </span>
            <span>
              {t("Experienced craftspeople · From sample to delivery")}
            </span>
          </div>
          <div className="hero-columns">
            <div>
              <h1>{text("hero")}</h1>
              {exploreActions}
            </div>
            <p>{text("intro")}</p>
          </div>
          <a className="hero-scroll-link micro" href="#home-partner">
            {locale === "th" ? "สำรวจแนวทางของเรา" : "Explore our approach"}
            <AppIcon name="expand" size={18} />
          </a>
        </div>
      </section>
      <HomeJourney />
      <section className="why-section home-partner" id="home-partner">
        <div className="container">
          <div className="why-copy">
            <p className="eyebrow">{t("Why us?")}</p>
            <h2>{text("partner")}</h2>
            <p>{text("partnerBody")}</p>
            {exploreActions}
          </div>
        </div>
      </section>
      <section className="home-facts" aria-label={t("Factory facts")}>
        {(
          [
            ["years", "experience"],
            ["capacity", "monthly"],
            ["total", "produced"],
            ["people", "team"],
          ] as const
        ).map(([value, label], index) => (
          <div key={value}>
            <span className="eyebrow">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{text(value)}</h2>
            <p className="micro">{text(label)}</p>
          </div>
        ))}
      </section>
      <Customers />
      <section className="why-section home-reasons">
        <div className="container">
          <div className="why-copy">
            <p className="eyebrow">{t("Why us?")}</p>
            <h2>{text("why")}</h2>
          </div>
          <div className="home-reason-grid">
            {reasons.map(([title, body], index) => (
              <article key={title}>
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{text(title)}</h3>
                <p>{text(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProductShowcase />
      <section
        className="section process-stages home-process"
        id="home-process"
      >
        <div className="container">
          <SectionHeader
            icon="brief"
            label={t("OEM process")}
            title={text("process")}
            aside={<p>{text("processIntro")}</p>}
          />
          <ol className="stage-grid">
            {stages.map(([title, body, , step]) => (
              <li key={step}>
                <p className="eyebrow">{t(step)}</p>
                <h3>{t(title)}</h3>
                <p>{t(body)}</p>
              </li>
            ))}
          </ol>
          <div className="button-row">
            <ButtonLink href={href("/oem-journey")} variant="dark">
              {text("processCta")}
            </ButtonLink>
            <ButtonLink
              href={href("/technical-insights#guidelines")}
              variant="secondary"
            >
              {locale === "th"
                ? "อ่านแนวทางวางแผนการผลิต"
                : "Read production planning guidelines"}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section home-quality dark" id="home-quality">
        <div className="container">
          <SectionHeader
            icon="quality"
            label={t("Quality Control")}
            title={text("quality")}
            aside={<p>{text("qualityIntro")}</p>}
          />
          <div className="home-quality-grid">
            {checks.map(([title, body], index) => (
              <article key={title}>
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{text(title)}</h3>
                <p>{text(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section home-contact" id="home-contact">
        <div className="container cta-grid">
          <div>
            <p className="eyebrow">{t("Start your project")}</p>
            <h2>{text("contact")}</h2>
            <p>{text("contactIntro")}</p>
            {actions}
            <div className="faq-list home-faq">
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {text(question)}
                    <AppIcon name="expand" className="faq-arrow" />
                  </summary>
                  <p>{text(answer)}</p>
                </details>
              ))}
            </div>
          </div>
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
