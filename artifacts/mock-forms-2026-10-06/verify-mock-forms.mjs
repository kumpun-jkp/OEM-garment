import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:3003";
const results = [];
const products = JSON.parse(
  await readFile(
    new URL("../../src/content/tm-products.json", import.meta.url),
  ),
);

async function page(path, kind, checks = []) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/g,
    "",
  );
  assert.equal((html.match(/<form\b/g) ?? []).length, 1);
  assert.match(html, /method="post"/);
  assert.match(html, /action="\/api\/enquiries"/);
  assert.match(html, /encType="multipart\/form-data"/);
  assert.match(html, new RegExp(`name="kind" value="${kind}"`));
  for (const name of [
    "name",
    "company",
    "email",
    "phone",
    "message",
    "consent",
  ])
    assert.match(html, new RegExp(`name="${name}"`));
  if (kind === "project")
    for (const name of ["country", "category", "stage", "volume", "files"])
      assert.match(html, new RegExp(`name="${name}"`));
  assert.match(html, /Mock preview|แบบฟอร์มจำลอง/);
  for (const check of checks) assert.match(html, check);
  results.push({
    path,
    kind,
    status: response.status,
    nativePost: true,
    mockLabel: true,
  });
}

for (const locale of ["th", "en"]) {
  await page(`/${locale}/contact`, "contact");
  await page(`/${locale}/start-your-project`, "project");
}
await page(
  "/en/contact?inquiry=visit&subject=Mock%20factory%20visit",
  "contact",
  [/value="visit" selected=""/, />Mock factory visit<\/textarea>/],
);
await page(
  `/en/start-your-project?stage=reference&category=Other&productId=${products[0].id}`,
  "project",
  [
    new RegExp(`name="productId" value="${products[0].id}"`),
    /value="Other" selected=""/,
    /name="stage"[^>]*checked=""[^>]*value="reference"/,
  ],
);

const contact = {
  kind: "contact",
  name: "Mock QA",
  company: "Test brand",
  email: "mock@example.com",
  phone: "+66 81 123 4567",
  inquiry: "general",
  message: "Mock test only",
  consent: "on",
};
const project = {
  ...contact,
  kind: "project",
  country: "Thailand",
  category: "Other",
  stage: "reference",
  volume: "under-800",
  productId: products[0].id,
};
async function submit(
  label,
  fields,
  expected,
  files = [],
  origin = new URL(base).origin,
) {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.set(key, value);
  for (const file of files) body.append("files", file);
  const response = await fetch(base + "/api/enquiries", {
    method: "POST",
    headers: { Origin: origin },
    body,
  });
  assert.equal(response.status, expected, label);
  const outcome = await response.json();
  if (expected === 200) {
    assert.equal(outcome.mock, true, label);
    assert.equal(outcome.delivered, false, label);
    assert.match(outcome.message, /No enquiry has been sent/);
  }
  results.push({ label, status: response.status, outcome });
}
await submit("valid contact mock", contact, 200);
await submit(
  "valid project mock with product reference and attachment",
  project,
  200,
  [new File(["Mock QA attachment"], "mock.pdf", { type: "application/pdf" })],
);
await submit("repeat contact mock", contact, 200);
await submit(
  "client cannot enable live delivery",
  { ...contact, ENQUIRY_MODE: "live", mock: "false" },
  200,
);
await submit("invalid phone", { ...contact, phone: "++++++" }, 422);
await submit("missing consent", { ...contact, consent: "" }, 422);
await submit(
  "unknown product reference",
  { ...project, productId: "unknown-reference" },
  422,
);
await submit("unsupported attachment", project, 422, [
  new File(["Mock"], "mock.exe"),
]);
await submit("honeypot", { ...contact, website: "filled" }, 400);
await submit("cross-origin", contact, 403, [], "https://unrelated.example");

await writeFile(
  new URL("results.json", import.meta.url),
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      base,
      scope:
        "Server-rendered forms and HTTP validation; no Chrome interaction or visual coverage claimed.",
      results,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Verified ${results.length} mock-form render/API scenarios. Valid submissions never report delivery.`,
);
