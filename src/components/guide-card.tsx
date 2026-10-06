import Link from "next/link";
import { AppIcon } from "./app-icon";
import {
  guidePath,
  type GuideSummary,
  type GuideLocale,
} from "@/content/guides";
import { localeHref } from "@/lib/locale";

export function GuideCard({
  guide,
  locale,
}: {
  guide: GuideSummary;
  locale: GuideLocale;
}) {
  return (
    <article className="article-card guide-card">
      <Link
        className="guide-card-link"
        href={localeHref(`${guidePath(guide.slug)}#guide-start`, locale)}
        aria-label={`${guide.cta[locale]}: ${guide.title[locale]}`}
      >
        <div className="article-copy">
          <div className="split-label micro">
            <span>{guide.category[locale]}</span>
            <span className="guide-status">
              {guide.complete
                ? locale === "th"
                  ? "ฉบับเต็ม"
                  : "Full guide"
                : locale === "th"
                  ? "ฉบับย่อ"
                  : "Preview"}
            </span>
          </div>
          <h3>{guide.title[locale]}</h3>
          <p>{guide.excerpt[locale]}</p>
          <p className="guide-takeaway">{guide.takeaway[locale]}</p>
        </div>
        <div className="article-foot">
          <span>{guide.cta[locale]}</span>
          <AppIcon name="forward" className="guide-read-icon" size={20} />
        </div>
      </Link>
    </article>
  );
}
