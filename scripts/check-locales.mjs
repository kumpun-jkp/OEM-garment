import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { guides, guidePath } from "../src/content/guides.ts";
const base = process.env.SITE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "",
  "/about",
  "/our-work",
  "/oem-products",
  "/oem-journey",
  "/technical-insights",
  "/start-your-project",
  "/contact",
  ...guides.map((guide) => guidePath(guide.slug)),
];
const results = [];
for (const locale of ["th", "en"]) {
  for (const route of routes) {
    const response = await fetch(`${base}/${locale}${route}`);
    assert.equal(response.status, 200, `${locale}${route}`);
    const html = await response.text();
    const ui = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
    assert.match(ui, new RegExp(`<html[^>]*lang="${locale}"`));
    const native = ui.match(/[\u0e00-\u0e7f]+/g) ?? [];
    if (locale === "en")
      assert.deepEqual(
        native,
        [],
        `Native script in /${locale}${route}: ${native.join(", ")}`,
      );
    else assert(native.length > 0, `Missing Thai copy: ${route}`);
    const links = [...ui.matchAll(/<a\b[^>]*\bhref="(\/[^" ]*)"/g)]
      .map(([, href]) => href)
      .filter((href) => !/^\/(?:_next|media|icons)/.test(href));
    for (const link of links)
      assert(
        link.startsWith(`/${locale}`),
        `Locale lost: ${locale}${route} -> ${link}`,
      );
    results.push({
      route: `/${locale}${route}`,
      status: response.status,
      nativeScriptMatches: native.length,
      internalLinks: links.length,
    });
  }
}
const preferred = await fetch(`${base}/contact?inquiry=visit`, {
  headers: { Cookie: "site-locale=en" },
  redirect: "manual",
});
assert.equal(preferred.status, 307);
assert.equal(
  new URL(preferred.headers.get("location"), base).pathname,
  "/en/contact",
);
assert.equal(
  new URL(preferred.headers.get("location"), base).search,
  "?inquiry=visit",
);
const invalid = await fetch(`${base}/fr/contact`);
assert.equal(invalid.status, 404);
await fs.writeFile(
  new URL("../artifacts/LOCALE_QA.json", import.meta.url),
  JSON.stringify(results, null, 2) + "\n",
);
console.log(
  `Verified both locales across ${results.length} pages, English script policy, locale links, preference redirect and invalid route handling.`,
);
