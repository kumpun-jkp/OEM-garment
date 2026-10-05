import assert from "node:assert/strict";
import { test } from "node:test";
import { createTranslator, isLocale, localeHref } from "../src/lib/locale.ts";
import { loadDictionaries } from "../scripts/lib/load-dictionaries.mjs";

test("locale switching preserves deep paths, queries, hashes and safe external links", () => {
  assert.equal(
    localeHref("/th/oem-products?audience=adults&category=shirts#styles", "en"),
    "/en/oem-products?audience=adults&category=shirts#styles",
  );
  assert.equal(
    localeHref("/en?stage=reference#main-content", "th"),
    "/th?stage=reference#main-content",
  );
  assert.equal(
    localeHref("/contact?inquiry=visit", "en"),
    "/en/contact?inquiry=visit",
  );
  for (const link of [
    "https://example.com",
    "//example.com",
    "#quality",
    "mailto:test@example.com",
    "/api/enquiries",
    "/media/example.png",
  ])
    assert.equal(localeHref(link, "th"), link);
  assert.equal(localeHref("/en/about", "en"), "/en/about");
  assert.equal(isLocale("fr"), false);
});

test("English copy uses Latin script and Thai copy retains industry terms", async () => {
  const dictionaries = await loadDictionaries();
  for (const [key, value] of Object.entries(dictionaries.en))
    assert.doesNotMatch(
      value,
      /[\p{Script=Thai}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Cyrillic}\p{Script=Arabic}]/u,
      key,
    );
  const en = createTranslator(dictionaries.en),
    th = createTranslator(dictionaries.th);
  assert.match(
    en(
      "14/160 หมู่บ้านศรีทวีวิลล์ ถนนเอกชัย แขวงบางบอน เขตบางบอน กรุงเทพมหานคร 10150",
    ),
    /Si Thawi Ville.*Ekkachai.*Bang Bon/,
  );
  assert.equal(en("ผลิตให้โบ๊เบ๊"), "Produced garments for Bobae");
  assert.match(
    th("In-line QC · End-line QC · Needle checks before packing"),
    /In-line QC · End-line QC/,
  );
  assert.equal(
    th("Showing {count} planning excerpts", { count: 9 }),
    "แสดงแนวทาง 9 รายการ",
  );
  assert.match(
    th(
      "Form delivery is not configured yet. Your enquiry has not been sent. Please use the direct contact channels.",
    ),
    /ยังไม่ได้ส่ง/,
  );
});
