import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import {
  productTaxonomy,
  productHref,
  resolveProductSelection,
  garmentReferences,
  filterGarmentReferences,
  projectReferenceHref,
} from "../src/content/products.ts";

test("every product enquiry destination retains its unique reference", () => {
  const destinations = garmentReferences.map((item) => {
    const url = new URL(projectReferenceHref(item), "https://example.com");
    assert.equal(url.pathname, "/start-your-project");
    assert.equal(url.searchParams.get("productId"), item.id);
    assert.equal(url.searchParams.get("stage"), "reference");
    return url.href;
  });
  assert.equal(new Set(destinations).size, garmentReferences.length);
});

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
        if (type?.id === "sports-team-shirts")
          assert.equal(references.length, 0);
        else assert.ok(references.length > 0, url.href);
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
  assert.equal(filterGarmentReferences({ category: "shirts" }).length, 7);
  assert.equal(filterGarmentReferences({ category: "trousers" }).length, 44);
  assert.equal(
    filterGarmentReferences({ subcategory: "hawaiian-shirts" }).length,
    5,
  );
  assert.equal(filterGarmentReferences({ audience: "children" }).length, 0);
});

test("every source image is represented exactly once by a valid bilingual product", async () => {
  const root = new URL("../", import.meta.url);
  const inventory = JSON.parse(
    await fs.readFile(
      new URL("artifacts/tm-products/source-inventory.json", root),
      "utf8",
    ),
  );
  const manifest = JSON.parse(
    await fs.readFile(
      new URL("artifacts/tm-products/product-manifest.json", root),
      "utf8",
    ),
  );
  const actual = await fs.readdir(new URL("TM apparel/", root), {
    recursive: true,
    withFileTypes: true,
  });
  const sourceFiles = actual
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .sort();
  assert.deepEqual(
    sourceFiles,
    inventory.map((file) => file.source).sort(),
    "inventory covers the actual directory",
  );
  assert.equal(garmentReferences.length, 89);
  assert.equal(inventory.length, 185);
  assert.equal(garmentReferences.filter((p) => p.images.length > 1).length, 66);
  assert.deepEqual(
    manifest.map((p) => p.id),
    garmentReferences.map((p) => p.id),
  );
  const sources = manifest.flatMap((p) => p.sources);
  assert.equal(sources.length, inventory.length);
  assert.equal(
    new Set(sources.map((image) => image.source)).size,
    inventory.length,
  );
  assert.equal(
    new Set(sources.map((image) => image.src)).size,
    inventory.length,
  );
  assert.equal(
    new Set(garmentReferences.map((p) => p.title)).size,
    garmentReferences.length,
  );
  assert.deepEqual(sources.map((s) => s.source).sort(), sourceFiles);
  const shapes = [
    "shirt",
    "jacket",
    "trousers",
    "shorts",
    "set",
    "dress",
    "skirt",
  ];
  for (const [index, product] of garmentReferences.entries()) {
    const mapped = manifest[index];
    assert.deepEqual(
      resolveProductSelection(product),
      {
        audience: product.audience,
        category: product.category,
        ...(product.subcategory ? { subcategory: product.subcategory } : {}),
      },
      product.id,
    );
    assert.ok(shapes.includes(product.shape), product.id);
    assert.match(product.th, /\p{Script=Thai}/u);
    assert.match(product.descriptionTh, /\p{Script=Thai}/u);
    assert.doesNotMatch(
      product.title + product.description,
      /\p{Script=Thai}/u,
    );
    assert.ok(product.images.length > 0, product.id);
    assert.equal(mapped.sources.filter((image) => image.primary).length, 1);
    assert.equal(mapped.sources[0].primary, true);
    assert.deepEqual(
      product.images.map((image) => image.src),
      mapped.sources.map((image) => image.src),
    );
  }
  for (const source of sources) {
    const original = await fs.readFile(
      new URL(`TM apparel/${source.source}`, root),
    );
    const web = await fs.readFile(new URL(`public${source.src}`, root));
    const file = inventory.find((image) => image.source === source.source);
    assert.equal(
      createHash("sha256").update(original).digest("hex"),
      source.sha256,
      source.source,
    );
    assert.equal(source.sha256, file.sha256);
    assert.equal(
      createHash("sha256").update(web).digest("hex"),
      source.webSha256,
      source.src,
    );
    const metadata = await sharp(web).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, file.width, source.src);
    assert.equal(metadata.height, file.height, source.src);
  }
});

test("classification follows garment construction where source filenames or labels conflict", () => {
  const find = (id) => garmentReferences.find((p) => p.id === id);
  assert.equal(find("tm-skirt-03").subcategory, "shorts");
  assert.equal(find("tm-skirt-04").subcategory, "shorts");
  assert.equal(find("tm-cargo-01").subcategory, "shorts");
  assert.equal(find("tm-cargo-24").category, "skirts");
  assert.equal(find("tm-elephant-30").category, "skirts");
  assert.equal(find("tm-elephant-26").shape, "trousers");
  assert.equal(find("tm-shirt-01").category, "shirts");
  assert.equal(find("tm-shirt-01").subcategory, undefined);
  assert.equal(
    find("tm-short-31").images.length,
    2,
    "grey plaid shorts are distinct from pink plaid skorts",
  );
  assert.equal(
    find("tm-short-01").images.length,
    6,
    "flat and model photos remain one product",
  );
  assert.equal(
    find("tm-short-26").images.length,
    3,
    "supplied colourway board and model photos remain grouped",
  );
  assert.ok(
    find("tm-elephant-25").images[0].src.endsWith("elephant-25.webp"),
    "front tie-waist view is primary",
  );
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
