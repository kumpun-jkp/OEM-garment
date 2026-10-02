import assert from "node:assert/strict";
const base = process.env.SITE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/about",
  "/our-work",
  "/oem-products",
  "/oem-journey",
  "/technical-insights",
  "/start-your-project",
  "/contact",
];
const pages = await Promise.all(
  routes.map(async (route) => {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) ?? []).length,
      1,
      `${route}: exactly one h1`,
    );
    return { route, html };
  }),
);
const links = new Set();
const media = new Set();
for (const { html } of pages) {
  for (const [, href] of html.matchAll(/href="(\/[^" ]*)"/g))
    if (!href.startsWith("/_next/")) links.add(href.replaceAll("&amp;", "&"));
  for (const [, src] of html.matchAll(/src="(\/[^" ]*)"/g))
    media.add(src.replaceAll("&amp;", "&"));
}
for (const href of links) {
  const url = new URL(href, base);
  assert(
    routes.includes(url.pathname),
    `Unknown internal destination: ${href}`,
  );
  if (url.hash) {
    const page = pages.find((page) => page.route === url.pathname);
    assert(
      page.html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
      `Missing anchor: ${href}`,
    );
  }
}
await Promise.all(
  [...media].map(async (src) =>
    assert.equal((await fetch(base + src)).status, 200, src),
  ),
);
const missing = await fetch(base + "/nonexistent-page");
assert.equal(missing.status, 404);
const invalid = new FormData();
invalid.set("kind", "contact");
assert.equal(
  (await fetch(base + "/api/enquiries", { method: "POST", body: invalid }))
    .status,
  422,
);
const valid = new FormData();
for (const [key, value] of Object.entries({
  kind: "contact",
  name: "Test Person",
  company: "Test Brand",
  email: "test@example.com",
  phone: "+66 81 123 4567",
  inquiry: "general",
  message: "Local verification only",
  consent: "on",
}))
  valid.set(key, value);
const crossOrigin = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { Origin: "https://unrelated.example" },
  body: valid,
});
assert.equal(crossOrigin.status, 403);
// This check is intentionally limited to an unconfigured local delivery endpoint.
const delivery = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { Origin: new URL(base).origin },
  body: valid,
});
assert.equal(delivery.status, 503);
assert.match((await delivery.json()).message, /has not been sent/);
console.log(
  `Verified ${routes.length} routes, ${links.size} internal links, ${media.size} rendered assets, 404 handling, validation, origin checks, and explicit unconfigured delivery.`,
);
