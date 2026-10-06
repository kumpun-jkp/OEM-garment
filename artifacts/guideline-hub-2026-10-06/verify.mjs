import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { guides } from "../../src/content/guides.ts";
import { guideArticles } from "../../src/content/guide-articles.ts";

const base = "http://127.0.0.1:3003";
const decode = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const results = [];
for (const locale of ["th", "en"]) {
  for (const guide of guides) {
    const path = `/${locale}/guides/${guide.slug}`;
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const title = decode(html.match(/<title>(.*?)<\/title>/s)[1]);
    const description = decode(
      html.match(/<meta name="description" content="([^"]*)"/)[1],
    );
    assert.equal(title, `${guide.title[locale]} | Thonburi Master`);
    assert.equal(description, guide.excerpt[locale]);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    assert(
      html.includes('aria-label="Breadcrumb"') ||
        html.includes('aria-label="เส้นทางหน้าปัจจุบัน"'),
    );
    assert(html.includes('id="preparation-checklist"'));
    assert(html.includes('id="related-guides-title"'));
    for (const related of guide.related)
      assert(html.includes(`href="/${locale}/guides/${related}#guide-start"`));
    assert(html.includes(`href="/${locale}/contact?`));
    results.push({ path, title, description, complete: guide.complete });
  }
  const hub = await (
    await fetch(`${base}/${locale}/technical-insights`)
  ).text();
  assert.equal((hub.match(/class="guide-card-link"/g) ?? []).length, 9);
  assert(!hub.includes('class="article-disclosure-content"'));
  assert.equal(
    (await fetch(`${base}/${locale}/guides/no-such-guide`)).status,
    404,
  );
}
const contentSummary = guides.map((guide) => {
  const article = guideArticles[guide.slug];
  const narrative = [
    article.introduction.en,
    ...article.sections.flatMap((s) => s.paragraphs.map((p) => p.en)),
  ].join(" ");
  return {
    slug: guide.slug,
    complete: guide.complete,
    narrativeWords: narrative.split(/\s+/).length,
    sections: article.sections.length,
  };
});
await fs.writeFile(
  new URL("./route-results.json", import.meta.url),
  JSON.stringify({ results, contentSummary }, null, 2),
);
console.log(
  `Verified ${results.length} article pages, unique title/description pairs, semantic headings, breadcrumbs, checklists, related links, contact handoffs, nine-card hubs and unknown-slug 404s.`,
);
console.log(JSON.stringify(contentSummary));
