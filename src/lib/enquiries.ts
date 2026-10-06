export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "ai",
  "dxf",
  "zip",
  "xlsx",
  "png",
]);
export const enquiryTypes = [
  "general",
  "quote",
  "visit",
  "audit",
  "policy",
] as const;
export type EnquiryKind = "project" | "contact";

export async function readEnquiryBody(
  request: Request,
  limit = MAX_TOTAL_BYTES + 1024 * 1024,
): Promise<FormData> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing form body");
  const chunks: ArrayBuffer[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new RangeError("The enquiry is too large.");
    }
    const chunk = new ArrayBuffer(value.byteLength);
    new Uint8Array(chunk).set(value);
    chunks.push(chunk);
  }
  return new Response(new Blob(chunks), {
    headers: { "Content-Type": request.headers.get("content-type") ?? "" },
  }).formData();
}

export function fileError(files: readonly File[]): string | undefined {
  if (files.length > 5) return "Attach up to five files.";
  if (
    files.some(
      (file) =>
        !ALLOWED_EXTENSIONS.has(
          file.name.split(".").pop()?.toLowerCase() ?? "",
        ),
    )
  )
    return "Supported files: PDF, AI, DXF, ZIP, XLSX, and PNG.";
  if (files.some((file) => file.size > MAX_FILE_BYTES))
    return "Each file must be 50 MB or smaller.";
  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES)
    return "The total attachment size must be 100 MB or smaller.";
}

export function validateEnquiry(data: FormData) {
  const kind = data.get("kind");
  const errors: Record<string, string> = {};
  if (kind !== "project" && kind !== "contact")
    errors.kind = "Choose a valid enquiry form.";
  const fields: Record<string, string> = {};
  const allowedFields = new Set([
    "kind",
    "name",
    "company",
    "preincorporation",
    "email",
    "phone",
    "country",
    "line",
    "communication",
    "inquiry",
    "category",
    "stage",
    "message",
    "volume",
    "handover",
    "nda",
    "consent",
    "productId",
  ]);
  for (const [key, value] of data.entries())
    if (typeof value === "string" && allowedFields.has(key))
      fields[key] = value.trim();
  const required =
    kind === "project"
      ? [
          "name",
          "email",
          "phone",
          "country",
          "category",
          "stage",
          "message",
          "volume",
        ]
      : ["name", "company", "email", "phone", "inquiry", "message"];
  for (const key of required)
    if (!fields[key]) errors[key] = "This field is required.";
  if (kind === "project" && !fields.preincorporation && !fields.company)
    errors.company = "Enter your company or select pre-incorporation / studio.";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address.";
  if (
    fields.phone &&
    (!/^[+()\d\s.-]{6,40}$/.test(fields.phone) ||
      !/^\d{6,15}$/.test(fields.phone.replace(/\D/g, "")))
  )
    errors.phone = "Enter a phone number with country code.";
  if (fields.productId && !/^[a-z0-9-]{1,64}$/.test(fields.productId))
    errors.productId = "Choose a valid product reference.";
  if (
    kind === "contact" &&
    !enquiryTypes.includes(fields.inquiry as (typeof enquiryTypes)[number])
  )
    errors.inquiry = "Choose a valid inquiry type.";
  if (kind === "project" && !["concept", "reference"].includes(fields.stage))
    errors.stage = "Select your project starting point.";
  if (
    kind === "project" &&
    ![
      "T-shirt",
      "Polo",
      "Uniform",
      "Sportswear",
      "Streetwear",
      "Other",
    ].includes(fields.category)
  )
    errors.category = "Choose a valid apparel category.";
  if (
    kind === "project" &&
    ![
      "under-800",
      "800-2000",
      "2000-5000",
      "5000-10000",
      "10000-plus",
      "unsure",
    ].includes(fields.volume)
  )
    errors.volume = "Choose a production volume.";
  if (fields.consent !== "on")
    errors.consent = "Consent is required to process your enquiry.";
  for (const [key, value] of Object.entries(fields))
    if (value.length > (key === "message" ? 8000 : 320))
      errors[key] = "This entry is too long.";
  const files = data
    .getAll("files")
    .filter(
      (value): value is File => typeof value !== "string" && value.size > 0,
    );
  const attachmentError = fileError(files);
  if (attachmentError) errors.files = attachmentError;
  return { fields, files, errors };
}
