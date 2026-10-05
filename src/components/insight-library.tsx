"use client";
import { useLocale } from "@/components/locale-provider";
import { useState } from "react";
import { ButtonLink } from "./primitives";
import { AppIcon } from "./app-icon";

const article = {
  title:
    "From garment brief to approved sample: details to confirm before production",
  body: "Prepare your design, sizes, colours and quantities. Select fabric and trims, then review sample fit, shape and decoration before approving the details for bulk production.",
};
function ArticleCard({ index }: { index: number }) {
  const { t, href: localHref } = useLocale();

  return (
    <article className="article-card">
      <div className="article-copy">
        <div className="split-label micro">
          <span className="brand-accent">{t("Sample preparation")}</span>
          <span>{t("Brief / review")}</span>
        </div>
        <p className="micro">
          {t("Project planning // Design & sample details")}
        </p>
        <h3>{t(article.title)}</h3>
        <p>{t(article.body)}</p>
      </div>
      <div className="article-foot">
        <div className="split-label micro">
          <span>{t("Confirm sizes & fit")}</span>
          <span>{t("Approve before production")}</span>
        </div>
        <details>
          <summary>
            {t("Discuss sample details")}
            {t(" ")}
            <AppIcon name="expand" className="disclosure-icon" />
          </summary>
          <p>
            {t(
              "Discuss the sample requirements and approval details with our team.",
            )}
          </p>
          <ButtonLink
            href={localHref(
              `/contact?inquiry=general&subject=${encodeURIComponent(`Discuss sample details (${index + 1})`)}`,
            )}
            variant="secondary"
          >
            {t("Discuss your brief")}
          </ButtonLink>
        </details>
      </div>
    </article>
  );
}
export function InsightLibrary() {
  const { t } = useLocale();

  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const show =
    (topic === "all" || topic === "pattern") &&
    `${article.title} ${article.body} ${t(article.title)} ${t(article.body)} pattern tech pack sample fabric`
      .toLowerCase()
      .includes(search.toLowerCase());
  return (
    <>
      <div className="insight-filters">
        <div
          className="container filter-tabs"
          aria-label={t("Bulletin topics")}
        >
          {[
            ["all", "All planning excerpts (9)"],
            ["fabric", "Fabric selection"],
            ["pattern", "Design & sample planning"],
            ["qc", "Quality checkpoints"],
            ["sourcing", "Material sourcing"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setTopic(value)}
              aria-pressed={topic === value}
            >
              {t(label)}
            </button>
          ))}
          <label className="insight-search">
            <AppIcon name="search" size={18} />
            <span className="sr-only">{t("Search technical bulletins")}</span>
            <input
              type="search"
              placeholder={t("Search design, sizes, fabric or samples…")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
      </div>
      <section className="section article-compendium">
        <div className="container">
          <div className="split-label">
            <h2 className="micro">{t("Curated technical compendium")}</h2>
            <p className="micro" role="status">
              {t("Showing {count} planning excerpts", { count: show ? 1 : 0 })}
            </p>
          </div>
          {show ? (
            <div className="grid-three article-grid">
              <ArticleCard index={0} />
            </div>
          ) : (
            <div className="empty-state">
              <h3>{t("No planning excerpts match this filter.")}</h3>
              <button
                className="button button--secondary"
                onClick={() => {
                  setTopic("all");
                  setSearch("");
                }}
              >
                {t("Clear filters")}
                <AppIcon name="reset" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ShrinkageCalculator() {
  const { t } = useLocale();

  const [before, setBefore] = useState("100");
  const [after, setAfter] = useState("95");
  const original = Number(before),
    washed = Number(after);
  const valid =
    Number.isFinite(original) &&
    Number.isFinite(washed) &&
    original > 0 &&
    washed > 0;
  const change = valid ? (100 * (original - washed)) / original : 0;
  return (
    <details className="calculator">
      <summary className="tool-button">
        {t("Open calculator suite")}
        {t(" ")}
        <AppIcon name="expand" className="disclosure-icon" />
      </summary>
      <div className="calculator-content">
        <p>
          {t(
            "Calculate dimensional change from a measured wash sample. Use the same unit for both measurements.",
          )}
        </p>
        <label>
          {t("Original length")}
          <input
            type="number"
            min="0.01"
            step="any"
            value={before}
            onChange={(event) => setBefore(event.target.value)}
          />
        </label>
        <label>
          {t("Length after washing")}
          <input
            type="number"
            min="0.01"
            step="any"
            value={after}
            onChange={(event) => setAfter(event.target.value)}
          />
        </label>
        <output aria-live="polite">
          {t(
            valid
              ? t("{change}% {direction} · Scale factor {scale}", {
                  change: Math.abs(change).toFixed(2),
                  direction: t(change < 0 ? "growth" : "shrinkage"),
                  scale: (original / washed).toFixed(4),
                })
              : "Enter two positive measurements.",
          )}
        </output>
        <p className="micro">
          {t(
            "Change = (original − washed) ÷ original × 100. Scale = original ÷ washed. This calculation does not perform or certify an AATCC test.",
          )}
        </p>
      </div>
    </details>
  );
}
