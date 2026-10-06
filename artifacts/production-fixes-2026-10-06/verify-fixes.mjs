import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { garmentReferences } from "../../src/content/products.ts";

const base = "http://127.0.0.1:3003";
// Port 3004 uses non-routable .invalid fixture URLs. GET rendering checks only.
// No valid form is submitted to a configured receiver by this script.
const fixture = "http://127.0.0.1:3004";
const reference = garmentReferences[0];
const checks = [];
for (const locale of ["th", "en"]) {
  for (const path of ["contact", "start-your-project"]) {
    const response = await fetch(
      `${base}/${locale}/${path}?productId=${reference.id}`,
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert(
      !/<form\b/.test(html),
      "Unavailable intake must not invite an unusable submission",
    );
    assert(html.includes('href="tel:+6628935951"'));
    if (path === "start-your-project") assert(html.includes(reference.id));
    checks.push({
      locale,
      path,
      state: "unconfigured",
      forms: 0,
      telephoneFallback: true,
      referenceRetained: path === "start-your-project",
    });

    const enabled = await fetch(
      `${fixture}/${locale}/${path}?stage=reference&category=Other&productId=${reference.id}`,
    );
    assert.equal(enabled.status, 200);
    const markup = await enabled.text();
    const form = markup.match(/<form\b[^>]*>/)?.[0];
    assert(form);
    assert(form.includes('method="post"'));
    assert(form.includes('action="/api/enquiries"'));
    assert(
      form.includes('encType="multipart/form-data"') ||
        form.includes('enctype="multipart/form-data"'),
    );
    const kind = path === "contact" ? "contact" : "project";
    assert(markup.includes(`name="kind" value="${kind}"`));
    assert(markup.includes('href="https://qa.invalid/privacy"'));
    assert(markup.includes("<noscript>"));
    if (kind === "project")
      assert(markup.includes(`name="productId" value="${reference.id}"`));
    const phoneTag = [...markup.matchAll(/<input\b[^>]*>/g)]
      .map((match) => match[0])
      .find((tag) => tag.includes('name="phone"'));
    const pattern = phoneTag.match(/pattern="([^"]+)"/)[1];
    const validator = new RegExp(`^(?:${pattern})$`, "v");
    assert(validator.test("+66 81 123 4567"));
    assert(!validator.test("------"));
    assert(!validator.test("1234567890123456"));
    checks.push({
      locale,
      path,
      state: "render-only-fixture",
      form,
      privacyLink: true,
      nativeKind: kind,
      clientPhonePattern: "valid",
    });
  }
  const html = await (
    await fetch(`${base}/${locale}/technical-insights`)
  ).text();
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert(!text.includes("All planning excerpts (9)"));
  assert(!text.includes("ทั้งหมด (9)"));
  assert(
    text.includes(
      locale === "en" ? "All planning excerpts (1)" : "แนวทางวางแผนทั้งหมด (1)",
    ),
  );
  checks.push({ locale, path: "technical-insights", correctedCount: 1 });
}

const fields = {
  kind: "contact",
  name: "Local QA",
  company: "Local only",
  email: "qa@example.com",
  phone: "------",
  inquiry: "general",
  message: "No external delivery",
  consent: "on",
};
const formData = (values) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) form.set(key, value);
  return form;
};
const invalidPhone = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { Origin: base },
  body: formData(fields),
});
assert.equal(invalidPhone.status, 422);
assert((await invalidPhone.json()).errors.phone);
checks.push({ api: "punctuation-only phone", status: 422 });
const project = {
  ...fields,
  kind: "project",
  phone: "+66 81 123 4567",
  country: "Thailand",
  category: "Other",
  stage: "reference",
  volume: "unsure",
  productId: reference.id,
};
const known = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { Origin: base },
  body: formData(project),
});
assert.equal(known.status, 503);
checks.push({
  api: "known product reference",
  status: 503,
  notes: "Validated reference; delivery remains unconfigured",
});
const unknown = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { Origin: base },
  body: formData({ ...project, productId: "unknown-product" }),
});
assert.equal(unknown.status, 422);
assert((await unknown.json()).errors.productId);
checks.push({ api: "unknown product reference", status: 422 });

for (const path of [
  "/icon.svg",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  const body = Buffer.from(await response.arrayBuffer());
  if (path === "/favicon.ico") {
    assert.equal(body.readUInt16LE(2), 1);
    assert.equal(body.readUInt16LE(4), 1);
    assert.equal(body[6], 32);
    assert.equal(body[7], 32);
  }
  if (path === "/robots.txt") assert(body.toString().includes("Disallow: /"));
  if (path === "/sitemap.xml") assert(!body.toString().includes("<loc>"));
  checks.push({ asset: path, status: 200, bytes: body.length });
}

const result = {
  date: "2026-10-06",
  timeZone: "Asia/Bangkok",
  base,
  fixture,
  checks,
  passed: checks.length,
  browserCoverage: "Not run; Chrome connection pending",
  releaseDecision: "NO_GO_PENDING_CONFIGURATION_AND_CHROME",
};
await fs.writeFile(
  new URL("./fix-verification.json", import.meta.url),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  `Verified ${checks.length} fix cases against production responses; no configured receiver was contacted.`,
);
