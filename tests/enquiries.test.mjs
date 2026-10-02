import assert from "node:assert/strict";
import test from "node:test";
import {
  validateEnquiry,
  fileError,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  readEnquiryBody,
} from "../src/lib/enquiries.ts";

function contact() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    kind: "contact",
    name: "Test Person",
    company: "Test Brand",
    email: "test@example.com",
    phone: "+66 81 123 4567",
    inquiry: "visit",
    message: "Please arrange a plant visit.",
    consent: "on",
  }))
    form.set(key, value);
  return form;
}
test("valid contact is accepted and trimmed", () => {
  const data = contact();
  data.set("name", " Test Person ");
  const result = validateEnquiry(data);
  assert.deepEqual(result.errors, {});
  assert.equal(result.fields.name, "Test Person");
});
test("missing consent, invalid email, and invalid classification are rejected", () => {
  const data = contact();
  data.delete("consent");
  data.set("email", "invalid");
  data.set("inquiry", "unknown");
  assert.deepEqual(Object.keys(validateEnquiry(data).errors).sort(), [
    "consent",
    "email",
    "inquiry",
  ]);
});
test("project requires a starting point, category and production volume", () => {
  const data = contact();
  data.set("kind", "project");
  data.set("country", "Thailand");
  assert.deepEqual(Object.keys(validateEnquiry(data).errors).sort(), [
    "category",
    "stage",
    "volume",
  ]);
  data.set("category", "T-shirt");
  data.set("stage", "concept");
  data.set("volume", "800-2000");
  assert.deepEqual(validateEnquiry(data).errors, {});
  data.delete("company");
  data.set("preincorporation", "on");
  assert.deepEqual(validateEnquiry(data).errors, {});
});
test("unsupported files, individual size, combined size and count are rejected", () => {
  assert.match(fileError([new File(["x"], "payload.exe")]), /Supported/);
  assert.match(
    fileError([{ name: "sample.pdf", size: MAX_FILE_BYTES + 1 }]),
    /50 MB/,
  );
  assert.match(
    fileError(
      Array.from({ length: 3 }, () => ({
        name: "sample.pdf",
        size: MAX_TOTAL_BYTES / 3 + 1,
      })),
    ),
    /100 MB/,
  );
  assert.match(
    fileError(Array.from({ length: 6 }, () => new File(["x"], "sample.pdf"))),
    /five/,
  );
  assert.equal(fileError([new File(["x"], "sample.PDF")]), undefined);
});
test("message length is bounded", () => {
  const data = contact();
  data.set("message", "x".repeat(8001));
  assert.equal(validateEnquiry(data).errors.message, "This entry is too long.");
});
test("multipart parsing preserves fields and rejects actual oversized bodies", async () => {
  const request = new Request("http://localhost/api/enquiries", {
    method: "POST",
    body: contact(),
  });
  assert.equal((await readEnquiryBody(request)).get("name"), "Test Person");
  const oversized = new Request("http://localhost/api/enquiries", {
    method: "POST",
    body: "0123456789",
    headers: { "Content-Type": "multipart/form-data; boundary=test" },
  });
  await assert.rejects(readEnquiryBody(oversized, 5), RangeError);
});
test("unexpected webhook fields are not forwarded", () => {
  const data = contact();
  data.set("unexpected", "value");
  assert.equal(validateEnquiry(data).fields.unexpected, undefined);
});
