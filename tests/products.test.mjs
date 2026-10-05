import test from "node:test";
import assert from "node:assert/strict";
import {
  productTaxonomy,
  productHref,
  resolveProductSelection,
  garmentReferences,
  filterGarmentReferences,
} from "../src/content/products.ts";

test("the supplied hierarchy preserves adults, children and each adult branch", () => {
  assert.deepEqual(
    productTaxonomy.map((node) => node.id),
    ["adults", "children"],
  );
  assert.deepEqual(
    productTaxonomy[0].children.map((node) => node.id),
    ["trousers", "shirts", "elephant-sets", "sleepwear", "dresses", "skirts"],
  );
  assert.equal(productTaxonomy[1].children, undefined);
  assert.equal(
    new Set(garmentReferences.map((item) => item.id)).size,
    garmentReferences.length,
  );
});

test("every category and product-type link round trips and selects its own references", () => {
  for (const audience of productTaxonomy) {
    for (const category of audience.children ?? []) {
      for (const type of [undefined, ...(category.children ?? [])]) {
        const selection = {
          audience: audience.id,
          category: category.id,
          ...(type ? { subcategory: type.id } : {}),
        };
        const url = new URL(productHref(selection), "https://example.com");
        assert.deepEqual(
          resolveProductSelection(Object.fromEntries(url.searchParams)),
          selection,
        );
        const references = filterGarmentReferences(selection);
        assert.ok(references.length > 0, url.href);
        assert.ok(
          references.every(
            (item) =>
              item.audience === audience.id &&
              item.category === category.id &&
              (!type || item.subcategory === type.id),
          ),
        );
      }
    }
  }
});

test("parent filters include descendants and type filters exclude unrelated photos", () => {
  assert.equal(filterGarmentReferences({ category: "shirts" }).length, 6);
  assert.equal(filterGarmentReferences({ category: "trousers" }).length, 3);
  assert.deepEqual(
    filterGarmentReferences({ subcategory: "hawaiian-shirts" }).map(
      (item) => item.id,
    ),
    ["hawaiian-shirts"],
  );
  assert.equal(filterGarmentReferences({ audience: "children" }).length, 0);
});

test("unknown and contradictory filters recover to valid hierarchy levels", () => {
  assert.deepEqual(
    resolveProductSelection({ audience: "children", category: "shirts" }),
    { audience: "children" },
  );
  assert.deepEqual(
    resolveProductSelection({ category: "shirts", subcategory: "shorts" }),
    { audience: "adults", category: "shirts" },
  );
  assert.equal(
    productHref({ audience: "unknown", category: "<script>" }),
    "/oem-products",
  );
  assert.deepEqual(
    resolveProductSelection({ category: "shirts", subcategory: "missing" }),
    { audience: "adults", category: "shirts" },
  );
});
