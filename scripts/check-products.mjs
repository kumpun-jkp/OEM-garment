import assert from "node:assert/strict";
import { localeHref } from "../src/lib/locale.ts";
import {
  productTaxonomy,
  productHref,
  filterGarmentReferences,
  selectionNodes,
} from "../src/content/products.ts";

const base = process.env.SITE_URL ?? "http://127.0.0.1:3000";
const selections = [{}];
for (const audience of productTaxonomy) {
  selections.push({ audience: audience.id });
  for (const category of audience.children ?? []) {
    selections.push({ audience: audience.id, category: category.id });
    for (const type of category.children ?? [])
      selections.push({
        audience: audience.id,
        category: category.id,
        subcategory: type.id,
      });
  }
}
await Promise.all(
  ["th", "en"].flatMap((locale) =>
    selections.map(async (selection) => {
      const href = localeHref(productHref(selection), locale);
      const response = await fetch(base + href);
      assert.equal(response.status, 200, href);
      const html = await response.text();
      const cards = [
        ...html.matchAll(/<article class="project-card"[^>]*>/g),
      ].map((match) => match[0]);
      assert.equal(
        cards.length,
        filterGarmentReferences(selection).length,
        href,
      );
      for (const card of cards) {
        if (selection.category)
          assert.ok(
            card.includes(`data-category="${selection.category}"`),
            href,
          );
        if (selection.subcategory)
          assert.ok(
            card.includes(`data-subcategory="${selection.subcategory}"`),
            href,
          );
      }
      const filterPanel = html.match(
        /<nav class="catalogue-filters taxonomy-filters"[\s\S]*?<\/nav>/,
      )?.[0];
      assert.ok(filterPanel, href);
      for (const node of Object.values(selectionNodes(selection)).filter(
        Boolean,
      )) {
        assert.ok(
          [...filterPanel.matchAll(/<a\b([^>]*)>([^<]*)<\/a>/g)].some(
            ([, attributes, label]) =>
              attributes.includes('aria-current="true"') &&
              label ===
                (locale === "th" ? node.th : node.label).replaceAll(
                  "&",
                  "&amp;",
                ),
          ),
          `Selected filter missing: ${href} / ${node.label}`,
        );
      }
      if (selection.audience === "children")
        assert.ok(
          html.includes(
            locale === "th" ? "ยังไม่มีแบบอ้างอิง" : "references published yet",
          ),
          href,
        );
    }),
  ),
);
console.log(
  `Verified ${selections.length * 2} rendered taxonomy destinations in both locales, selected filters, reference membership and the Children empty state.`,
);
