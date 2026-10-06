import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, findGuide } from "@/content/guides";
import { guideArticles } from "@/content/guide-articles";
import { isLocale, localeHref } from "@/lib/locale";
import { publicSiteOrigin } from "@/lib/site-config";
import {
  guideMetadata,
  guideStructuredData,
  serialiseStructuredData,
} from "@/lib/guide-seo";
import { GuideCard } from "@/components/guide-card";
import { AppIcon } from "@/components/app-icon";
import { ButtonLink } from "@/components/primitives";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const guide = findGuide(slug);
  if (!isLocale(locale) || !guide) notFound();
  return guideMetadata(guide, locale, publicSiteOrigin());
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = findGuide(slug);
  const article = guideArticles[slug];
  if (!isLocale(locale) || !guide || !article) notFound();
  const th = locale === "th";
  const href = (path: string) =>
    localeHref(
      path.startsWith("/guides/") && !path.includes("#")
        ? `${path}#guide-start`
        : path,
      locale,
    );
  const schema = guideStructuredData(guide, locale, publicSiteOrigin());
  const related = guide.related
    .map(findGuide)
    .filter((item) => item !== undefined);
  const contactHref = href(
    `/contact?inquiry=general&subject=${encodeURIComponent(guide.title[locale])}`,
  );
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseStructuredData(schema) }}
        />
      )}
      <article className="guide-article">
        <header className="guide-hero" id="guide-start">
          <div className="container">
            <nav
              className="guide-breadcrumb"
              aria-label={th ? "เส้นทางหน้าปัจจุบัน" : "Breadcrumb"}
            >
              <ol>
                <li>
                  <Link href={href("/")}>{th ? "หน้าแรก" : "Home"}</Link>
                </li>
                <li>
                  <Link href={href("/technical-insights#guidelines")}>
                    {th
                      ? "แนวทางวางแผนการผลิต"
                      : "Production planning guidelines"}
                  </Link>
                </li>
                <li aria-current="page">
                  {guide.category[locale].split(" / ")[1]}
                </li>
              </ol>
            </nav>
            <div className="guide-hero-grid">
              <div>
                <p className="eyebrow">{guide.category[locale]}</p>
                <h1>{guide.title[locale]}</h1>
                <p className="guide-deck">{guide.excerpt[locale]}</p>
              </div>
              <aside
                className="guide-key-idea"
                aria-label={th ? "ประเด็นสำคัญ" : "Key idea"}
              >
                <AppIcon name="brief" size={32} />
                <p className="eyebrow">
                  {th ? "สิ่งที่ควรนำไปใช้" : "What to take away"}
                </p>
                <p>{guide.takeaway[locale]}</p>
                <span className="guide-status">
                  {guide.complete
                    ? th
                      ? "แนวทางฉบับเต็ม"
                      : "Complete guide"
                    : th
                      ? "แนวทางฉบับย่อ"
                      : "Guideline preview"}
                </span>
              </aside>
            </div>
            <p className="guide-series-note">
              {th
                ? "ชุดความรู้ OEM / บรีฟ → ตัวอย่าง → อนุมัติ → ผลิตและส่งมอบ"
                : "OEM knowledge series / Brief → Sample → Approve → Produce & deliver"}
            </p>
          </div>
        </header>
        <div className="container guide-reading-layout">
          <aside className="guide-toc">
            <nav aria-label={th ? "สารบัญบทความ" : "On this page"}>
              <p className="eyebrow">{th ? "ในแนวทางนี้" : "On this page"}</p>
              <ol>
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title[locale]}</a>
                  </li>
                ))}
              </ol>
              <a className="guide-checklist-link" href="#preparation-checklist">
                <AppIcon name="checklist" size={18} />
                {th ? "Checklist เตรียมพร้อม" : "Preparation checklist"}
              </a>
            </nav>
          </aside>
          <div className="guide-body">
            {!guide.complete && (
              <p className="guide-preview-note">
                {th
                  ? "ฉบับย่อสำหรับเริ่มวางแผน · บทความนี้จะขยายรายละเอียดเพิ่มเติมในรอบถัดไป"
                  : "A short starting guide · This article is prepared for further expansion."}
              </p>
            )}
            <p className="guide-introduction">{article.introduction[locale]}</p>
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="guide-content-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.title[locale]}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph[locale]}</p>
                ))}
                {section.subheading && <h3>{section.subheading[locale]}</h3>}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet, index) => (
                      <li key={index}>{bullet[locale]}</li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <ul className="guide-context-links">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={href(link.href)}>
                          {link.label[locale]}
                          <AppIcon name="forward" size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section
              className="guide-checklist"
              id="preparation-checklist"
              aria-labelledby="checklist-title"
            >
              <p className="eyebrow">
                <AppIcon name="checklist" size={18} />
                {th ? "ก่อนคุยกับโรงงาน" : "Before speaking with the factory"}
              </p>
              <h2 id="checklist-title">
                {th ? "Checklist เตรียมพร้อม" : "Your preparation checklist"}
              </h2>
              <ul>
                {article.checklist.map((item, index) => (
                  <li key={index}>
                    <AppIcon name="verified" size={18} />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </section>
            <aside className="guide-advice">
              <p className="eyebrow">
                {th ? "ข้อควรพิจารณา" : "A useful consideration"}
              </p>
              <p>{article.advice[locale]}</p>
            </aside>
            <section
              className="guide-service-links"
              aria-labelledby="service-links-title"
            >
              <h2 id="service-links-title">
                {th
                  ? "เชื่อมต่อกับงานผลิตของเรา"
                  : "Connect this guide to production"}
              </h2>
              <ul>
                {article.services.map((link) => (
                  <li key={link.href}>
                    <Link href={href(link.href)}>
                      {link.label[locale]}
                      <AppIcon name="forward" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <section
          className="section guide-related"
          aria-labelledby="related-guides-title"
        >
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">
                  {th ? "วางแผนขั้นต่อไป" : "Plan your next step"}
                </p>
                <h2 id="related-guides-title">
                  {th ? "แนวทางที่เกี่ยวข้อง" : "Related guidelines"}
                </h2>
              </div>
              <Link href={href("/technical-insights#guidelines")}>
                {th ? "ดูแนวทางทั้งหมด" : "Browse all guidelines"}
                <AppIcon name="forward" size={18} />
              </Link>
            </div>
            <div className="grid-three article-grid">
              {related.map((item) => (
                <GuideCard key={item.slug} guide={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </article>
      <section className="guide-contact">
        <div className="container">
          <div>
            <p className="eyebrow">
              {th
                ? "ก้าวต่อไปกับ TM Apparel"
                : "Your next step with TM Apparel"}
            </p>
            <h2>{article.contact[locale]}</h2>
            <p>
              {th
                ? "ส่งสิ่งที่คุณมี แล้วให้ทีมช่วยทบทวนรายละเอียดและขั้นตอนที่เหมาะกับโปรเจกต์"
                : "Share what you have and let the team review the details and next steps for your project."}
            </p>
          </div>
          <ButtonLink href={contactHref}>
            {th ? "พูดคุยกับโรงงาน" : "Talk to the factory"}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
