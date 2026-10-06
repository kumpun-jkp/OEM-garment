"use client";
import { useLocale } from "@/components/locale-provider";
import { useState } from "react";
import { AppIcon } from "./app-icon";
import { GuideCard } from "./guide-card";
import { guides, guideTopics, filterGuides } from "@/content/guides";
export function InsightLibrary() {
  const { t, locale, isThai } = useLocale();

  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const visibleGuides = filterGuides(topic, search);
  return (
    <>
      <div className="insight-filters">
        <div
          className="container filter-tabs"
          aria-label={t("Bulletin topics")}
        >
          {[
            {
              id: "all",
              label: isThai
                ? `แนวทางทั้งหมด (${guides.length})`
                : `All guides (${guides.length})`,
            },
            ...guideTopics.map((item) => ({
              id: item.id,
              label: item.label[locale],
            })),
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTopic(id)}
              aria-pressed={topic === id}
            >
              {label}
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
      <section
        className="section article-compendium"
        id="guidelines"
        aria-labelledby="guidelines-title"
      >
        <div className="container">
          <div className="split-label">
            <div>
              <p className="eyebrow">
                {isThai ? "จากแนวคิดสู่การผลิต" : "From idea to production"}
              </p>
              <h2 id="guidelines-title">
                {isThai
                  ? "แนวทางวางแผนการผลิต"
                  : "Production planning guidelines"}
              </h2>
              <p className="guide-hub-intro">
                {isThai
                  ? "เลือกเรื่องที่ตรงกับขั้นตอนของคุณ แล้วอ่านแนวทางเพื่อเตรียมรายละเอียดก่อนคุยกับโรงงาน"
                  : "Choose the topic that fits your next step, then prepare the details for your conversation with the factory."}
              </p>
            </div>
            <p className="micro" role="status">
              {isThai
                ? `แสดงแนวทาง ${visibleGuides.length} รายการ`
                : `Showing ${visibleGuides.length} guides`}
            </p>
          </div>
          {visibleGuides.length ? (
            <div className="grid-three article-grid">
              {visibleGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} locale={locale} />
              ))}
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
