import assert from "node:assert/strict";
import { localeHref } from "../src/lib/locale.ts";
import {
  productTaxonomy,
  productHref,
  filterGarmentReferences,
  garmentReferences,
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
      const expected = filterGarmentReferences(selection);
      assert.deepEqual(
        cards
          .map((card) => card.match(/data-product-id="([^"]+)"/)?.[1])
          .sort(),
        expected.map((item) => item.id).sort(),
        `Each product must render exactly once: ${href}`,
      );
      assert.equal(
        (html.match(/class="product-gallery"/g) ?? []).length,
        expected.length,
        href,
      );
      if (expected.length === 0)
        assert.ok(
          html.includes(
            locale === "th" ? "ยังไม่มีแบบอ้างอิง" : "references published yet",
          ),
          href,
        );
    }),
  ),
);
const assets = garmentReferences.flatMap((product) =>
  product.images.map((image) => image.src),
);
for (let start = 0; start < assets.length; start += 12) {
  await Promise.all(
    assets.slice(start, start + 12).map(async (src) => {
      const response = await fetch(base + src);
      assert.equal(response.status, 200, src);
      assert.match(
        response.headers.get("content-type") ?? "",
        /image\/webp/,
        src,
      );
      assert.ok((await response.arrayBuffer()).byteLength > 0, src);
    }),
  );
}
console.log(
  `Verified ${selections.length * 2} rendered taxonomy destinations in both locales, selected filters, exact product membership, galleries, empty states and ${assets.length} served product images.`,
);
