import test from "node:test";
import assert from "node:assert/strict";
import { guides, guideTopics, filterGuides } from "../src/content/guides.ts";
import { guideArticles } from "../src/content/guide-articles.ts";
import {
  guideMetadata,
  guideStructuredData,
  serialiseStructuredData,
} from "../src/lib/guide-seo.ts";

test("the bilingual hub has nine distinct destinations and exactly two complete guides", () => {
  assert.equal(guides.length, 9);
  assert.equal(new Set(guides.map((g) => g.slug)).size, 9);
  assert.equal(guides.filter((g) => g.complete).length, 2);
  for (const locale of ["th", "en"]) {
    assert.equal(new Set(guides.map((g) => g.title[locale])).size, 9);
    assert.equal(new Set(guides.map((g) => g.excerpt[locale])).size, 9);
    for (const guide of guides) {
      const article = guideArticles[guide.slug];
      assert(article, `Missing article: ${guide.slug}`);
      assert(article.introduction[locale]);
      assert(article.sections.length >= 2);
      assert(article.checklist.length >= 3);
      assert.equal(
        new Set(article.sections.map((s) => s.id)).size,
        article.sections.length,
      );
      assert(
        guide.related.every(
          (slug) => slug !== guide.slug && guides.some((g) => g.slug === slug),
        ),
      );
      if (guide.complete) assert(article.sections.length >= 5);
    }
  }
});

test("topic filters cover all guides, and search supports both languages and spaced multiword queries", () => {
  assert.equal(filterGuides("all", "  ").length, 9);
  assert.deepEqual(
    guideTopics
      .flatMap((t) => filterGuides(t.id, ""))
      .map((g) => g.slug)
      .sort(),
    guides.map((g) => g.slug).sort(),
  );
  assert(
    filterGuides("all", "  sample   approval ").some(
      (g) => g.slug === "sample-approval-process",
    ),
  );
  assert(
    filterGuides("all", "อนุมัติ").some(
      (g) => g.slug === "sample-approval-process",
    ),
  );
  assert.equal(filterGuides("materials", "").length, 1);
  assert.equal(filterGuides("materials", "MOQ").length, 0);
  assert.equal(filterGuides("all", "zz-no-such-guide-zz").length, 0);
});

test("guide canonicals and language alternates point to each article, never the homepage", () => {
  for (const guide of guides)
    for (const locale of ["th", "en"]) {
      const meta = guideMetadata(guide, locale, "https://factory.example");
      assert.equal(
        meta.alternates.canonical,
        `https://factory.example/${locale}/guides/${guide.slug}`,
      );
      assert.equal(
        meta.alternates.languages.th,
        `https://factory.example/th/guides/${guide.slug}`,
      );
      assert.equal(
        meta.alternates.languages.en,
        `https://factory.example/en/guides/${guide.slug}`,
      );
      assert.equal(meta.description, guide.excerpt[locale]);
      assert.equal(guideMetadata(guide, locale).alternates, undefined);
    }
});

test("structured data has matching breadcrumbs and only marks complete guides as Article", () => {
  for (const guide of guides) {
    const schema = guideStructuredData(guide, "en", "https://factory.example");
    assert.equal(
      schema["@graph"][0].itemListElement[2].item,
      `https://factory.example/en/guides/${guide.slug}`,
    );
    assert.equal(
      schema["@graph"].some((item) => item["@type"] === "Article"),
      guide.complete,
    );
    assert.equal(guideStructuredData(guide, "en"), undefined);
  }
  const encoded = serialiseStructuredData({
    headline: "</script><script>alert(1)</script>",
  });
  assert(!encoded.includes("<"));
  assert.equal(
    JSON.parse(encoded).headline,
    "</script><script>alert(1)</script>",
  );
});
