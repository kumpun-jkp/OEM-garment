import { NextRequest, NextResponse } from "next/server";
import {
  MAX_TOTAL_BYTES,
  readEnquiryBody,
  validateEnquiry,
} from "@/lib/enquiries";
import { garmentReferences } from "@/content/products";
import { enquiryDeliveryAvailable, enquiryMockMode } from "@/lib/site-config";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const expectedOrigin =
    process.env.SITE_URL?.trim().replace(/\/$/, "") ||
    `${protocol}://${request.headers.get("host")}`;
  if (origin && origin !== expectedOrigin)
    return NextResponse.json(
      { message: "This form must be submitted from the website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return NextResponse.json(
      { message: "Submit a multipart form." },
      { status: 415 },
    );
  if (
    Number(request.headers.get("content-length") ?? 0) >
    MAX_TOTAL_BYTES + 1024 * 1024
  )
    return NextResponse.json(
      { message: "The enquiry is too large." },
      { status: 413 },
    );
  let data: FormData;
  try {
    data = await readEnquiryBody(request);
  } catch (error) {
    if (error instanceof RangeError)
      return NextResponse.json(
        { message: "The enquiry is too large." },
        { status: 413 },
      );
    return NextResponse.json(
      { message: "The submitted form could not be read." },
      { status: 400 },
    );
  }
  if (data.get("website"))
    return NextResponse.json(
      { message: "The enquiry could not be accepted." },
      { status: 400 },
    );
  const { errors, fields, files } = validateEnquiry(data);
  if (Object.keys(errors).length)
    return NextResponse.json(
      { message: "Please review the highlighted fields.", errors },
      { status: 422 },
    );
  if (fields.productId) {
    const reference = garmentReferences.find(
      (item) => item.id === fields.productId,
    );
    if (!reference || fields.kind !== "project")
      return NextResponse.json(
        {
          message: "Please review the highlighted fields.",
          errors: { productId: "Choose a valid product reference." },
        },
        { status: 422 },
      );
    fields.productTitle = reference.title;
  }
  if (enquiryMockMode())
    return NextResponse.json({
      mock: true,
      delivered: false,
      message: "Mock submission checked. No enquiry has been sent.",
    });
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint || !enquiryDeliveryAvailable())
    return NextResponse.json(
      {
        message:
          "Form delivery is not configured yet. Your enquiry has not been sent. Please use the direct contact channels.",
      },
      { status: 503 },
    );
  let destination: URL;
  try {
    destination = new URL(endpoint);
  } catch {
    return NextResponse.json(
      { message: "Form delivery is temporarily unavailable." },
      { status: 503 },
    );
  }
  if (destination.protocol !== "https:")
    return NextResponse.json(
      { message: "Form delivery is temporarily unavailable." },
      { status: 503 },
    );
  const outgoing = new FormData();
  for (const [key, value] of Object.entries(fields))
    if (key !== "website") outgoing.append(key, value);
  for (const file of files)
    outgoing.append(
      "files",
      file,
      file.name.replace(/[^\p{L}\p{N}._-]/gu, "_"),
    );
  try {
    const response = await fetch(destination, {
      method: "POST",
      body: outgoing,
      headers: process.env.ENQUIRY_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
        : {},
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return NextResponse.json({ delivered: true });
  } catch {
    return NextResponse.json(
      {
        message:
          "The delivery service did not confirm receipt. Your enquiry has not been marked as sent. Please try again or use the direct contact channels.",
      },
      { status: 502 },
    );
  }
}
