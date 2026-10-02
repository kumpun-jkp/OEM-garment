"use client";

import { useMemo, useState } from "react";
import { cases } from "@/content/site";
import { ButtonLink, DataRows, Photo } from "./primitives";

export function ProjectCatalogue({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState("all");
  const [fabric, setFabric] = useState("all");
  const [finish, setFinish] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const entries = useMemo(
    () =>
      Array.from({ length: full || expanded ? 18 : 6 }, (_, i) => ({
        ...cases[i % 6],
        key: `case-${i + 1}`,
      })),
    [full, expanded],
  );
  const filtered = entries.filter(
    () =>
      (category === "all" || category === "streetwear") &&
      (fabric === "all" || fabric === "terry") &&
      (finish === "all" || finish === "puff"),
  );
  return (
    <div className="catalogue">
      <div className="catalogue-filters">
        <div className="filter-tabs" aria-label="Production category">
          {[
            ["all", `All production runs (${entries.length})`],
            ["streetwear", "Streetwear & heavyweight jersey"],
            ["technical", "Technical & cycling activewear"],
            ["utility", "Utility & airline uniforms"],
            ["rainwear", "Rainwear & bonded shells"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <span className="micro">Fabric compatibility:</span>
          {[
            ["all", "All fibers"],
            ["terry", "500 GSM French Terry"],
            ["recycled", "Recycled PET"],
            ["ripstop", "TC Ripstop / Cordura"],
            ["flax", "Flax linen / Pima"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={fabric === value}
              onClick={() => setFabric(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <span className="micro">Finish / applique:</span>
          {[
            ["all", "All finishes"],
            ["pigment", "Pigment dye"],
            ["welded", "PU welded tapes"],
            ["puff", "3D puff screen"],
            ["teflon", "Teflon DWR"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={finish === value}
              onClick={() => setFinish(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        {filtered.length} production runs shown
      </p>
      <div className="grid-three project-grid">
        {filtered.map((item) => (
          <article className="project-card" key={item.key}>
            <div className="project-card-label split-label micro">
              <strong>
                Case #LU-04 <span>/ Tokyo, JP</span>
              </strong>
              <span className="export-tag">Export</span>
            </div>
            <div className="photo-caption-wrap">
              <Photo
                src={item.image}
                alt={item.alt}
                sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="image-caption">
                Inspection lot: {item.lot} pcs
              </span>
            </div>
            <div className="project-card-copy">
              <p className="eyebrow">{item.category}</p>
              <h3>{item.title}</h3>
              <p>
                Engineered for Japanese streetwear label demanding extreme
                structural rigidity, zero collar sag, and seamless pocket
                insertion.
              </p>
            </div>
            <DataRows
              items={[
                ["Substrate", item.fabric],
                ["Embellishment", item.finish],
                ["Defect variance", "0.12% (AQL 1.5 / Major: 0)"],
                ["Delivery lead time", "26 production days"],
              ]}
            />
            <ButtonLink
              href="/start-your-project?stage=reference&category=Streetwear"
              variant="secondary"
              className="card-link"
            >
              Start with this idea <span aria-hidden="true">→</span>
            </ButtonLink>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No published runs match these filters.</h3>
          <p>Discuss your material or finish with our production team.</p>
          <button
            className="button button--secondary"
            onClick={() => {
              setCategory("all");
              setFabric("all");
              setFinish("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="catalogue-end">
        <p className="micro">
          ■ Displaying {filtered.length} industrial production runs
        </p>
        {!full && !expanded && (
          <button
            className="button button--secondary"
            onClick={() => setExpanded(true)}
          >
            Load historical logs (2020–2023) ↓
          </button>
        )}
        {!full && (
          <ButtonLink href="/oem-products" variant="dark">
            View OEM product list →
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
