"use client";
import { useState } from "react";
import { ButtonLink } from "./primitives";

const article = {
  title:
    "Eliminating sizing drift: how to grade garments for global distribution",
  body: "Addressing cross-market delta differences between Asian, European, and US size blocks. Best practices for automated CAD seam allowance scaling without distorting sleeve crowns or neck opening curves.",
};
function ArticleCard({ index }: { index: number }) {
  return (
    <article className="article-card">
      <div className="article-copy">
        <div className="split-label micro">
          <span className="bronze">Tech pack protocol</span>
          <span>6 min read</span>
        </div>
        <p className="micro">Spec #CAD-011 // Master pattern studio</p>
        <h3>{article.title}</h3>
        <p>{article.body}</p>
      </div>
      <div className="article-foot">
        <div className="split-label micro">
          <span>Grade tolerance: ±0.5 cm</span>
          <span>Gerber Accumark CAD</span>
        </div>
        <details>
          <summary>
            Access spec CAD guide <span aria-hidden="true">↗</span>
          </summary>
          <p>
            Request the complete specification guide from the engineering desk.
          </p>
          <ButtonLink
            href={`/contact?inquiry=general&subject=${encodeURIComponent(`Request CAD-011 guide (${index + 1})`)}`}
            variant="secondary"
          >
            Request CAD guide →
          </ButtonLink>
        </details>
      </div>
    </article>
  );
}
export function InsightLibrary() {
  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const show =
    (topic === "all" || topic === "pattern") &&
    `${article.title} ${article.body} CAD-011 pattern tech pack Gerber`
      .toLowerCase()
      .includes(search.toLowerCase());
  return (
    <>
      <div className="insight-filters">
        <div className="container filter-tabs" aria-label="Bulletin topics">
          {[
            ["all", "All bulletins (14)"],
            ["fabric", "Fabric & yarn science (4)"],
            ["pattern", "Pattern & CAD tolerances (3)"],
            ["qc", "QC & AQL standards (3)"],
            ["sourcing", "Thailand sourcing & tariffs (4)"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setTopic(value)}
              aria-pressed={topic === value}
            >
              {label}
            </button>
          ))}
          <label className="insight-search">
            <span className="sr-only">Search technical bulletins</span>
            <input
              type="search"
              placeholder="Filter by topic, ASTM, or ISO…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
      </div>
      <section className="section article-compendium">
        <div className="container">
          <div className="split-label">
            <h2 className="micro">Curated technical compendium</h2>
            <p className="micro" role="status">
              Showing {show ? 9 : 0} published specifications
            </p>
          </div>
          {show ? (
            <div className="grid-three article-grid">
              {Array.from({ length: 9 }, (_, i) => (
                <ArticleCard key={i} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No published bulletins match this filter.</h3>
              <button
                className="button button--secondary"
                onClick={() => {
                  setTopic("all");
                  setSearch("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ShrinkageCalculator() {
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
      <summary className="tool-button">Open calculator suite ↗</summary>
      <div className="calculator-content">
        <p>
          Calculate dimensional change from a measured wash sample. Use the same
          unit for both measurements.
        </p>
        <label>
          Original length
          <input
            type="number"
            min="0.01"
            step="any"
            value={before}
            onChange={(event) => setBefore(event.target.value)}
          />
        </label>
        <label>
          Length after washing
          <input
            type="number"
            min="0.01"
            step="any"
            value={after}
            onChange={(event) => setAfter(event.target.value)}
          />
        </label>
        <output aria-live="polite">
          {valid
            ? `${Math.abs(change).toFixed(2)}% ${change < 0 ? "growth" : "shrinkage"} · Scale factor ${(original / washed).toFixed(4)}`
            : "Enter two positive measurements."}
        </output>
        <p className="micro">
          Change = (original − washed) ÷ original × 100. Scale = original ÷
          washed. This calculation does not perform or certify an AATCC test.
        </p>
      </div>
    </details>
  );
}
