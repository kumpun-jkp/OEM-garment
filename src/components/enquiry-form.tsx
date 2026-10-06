"use client";
import { useLocale } from "@/components/locale-provider";

import Link from "next/link";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type ReactElement,
  type HTMLAttributes,
} from "react";
import { enquiryTypes, fileError, type EnquiryKind } from "@/lib/enquiries";
import { AppIcon, type AppIconName } from "./app-icon";
import { company } from "@/content/site";

const FieldErrors = createContext<Record<string, string>>({});
function Field({
  name,
  label,
  required = false,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  const { t } = useLocale();

  const error = useContext(FieldErrors)[name];
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {t(label)}
        {required && <span aria-hidden="true">{t("*")}</span>}
      </label>
      {t(
        Children.map(children, (child) =>
          isValidElement(child) &&
          typeof child.type === "string" &&
          ["input", "select", "textarea"].includes(child.type)
            ? cloneElement(child as ReactElement<HTMLAttributes<HTMLElement>>, {
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? `${name}-error` : undefined,
              })
            : child,
        ),
      )}
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {t(error)}
        </p>
      )}
    </div>
  );
}
function FormSection({
  number,
  title,
  aside,
  children,
  icon,
}: {
  number: string;
  title: string;
  aside: string;
  children: ReactNode;
  icon?: AppIconName;
}) {
  const { t } = useLocale();

  return (
    <fieldset className="form-section">
      <legend>
        <span className="stage-number">{t(number)}</span>
        {icon && (
          <span className="context-icon-badge">
            <AppIcon name={icon} size={32} />
          </span>
        )}
        {t(title)}
      </legend>
      <span className="form-section-aside micro">{t(aside)}</span>
      {t(children)}
    </fieldset>
  );
}

export function EnquiryForm({
  kind,
  initialStage = "concept",
  initialCategory = "",
  initialInquiry = "general",
  subject = "",
  available = false,
  mock = false,
  privacyHref,
  productReference,
}: {
  kind: EnquiryKind;
  initialStage?: string;
  initialCategory?: string;
  initialInquiry?: string;
  subject?: string;
  available?: boolean;
  mock?: boolean;
  privacyHref?: string;
  productReference?: { id: string; title: string };
}) {
  const { t, href: localHref } = useLocale();

  const [stage, setStage] = useState(
    initialStage === "reference" ? "reference" : "concept",
  );
  const [preincorporation, setPreincorporation] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "mock" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const project = kind === "project";
  function addFiles(incoming: File[]) {
    const next = [...files, ...incoming];
    const error = fileError(next);
    setAttachmentError(error ?? "");
    if (!error) setFiles(next);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (attachmentError) {
      setStatus("error");
      setNotice(attachmentError);
      return;
    }
    setStatus("sending");
    setNotice("");
    setErrors({});
    const data = new FormData(form);
    data.set("kind", kind);
    data.delete("files");
    files.forEach((file) => data.append("files", file));
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors ?? {});
        throw new Error(
          result.message ??
            "Your enquiry could not be delivered. Please try again.",
        );
      }
      if (result.mock === true && result.delivered === false) {
        setStatus("mock");
        setNotice("Mock submission checked. No enquiry has been sent.");
      } else if (result.delivered === true) {
        setStatus("sent");
        setNotice(
          "Your enquiry has been delivered. The team will contact you using the details provided.",
        );
        form.reset();
        setFiles([]);
        setStage(initialStage === "reference" ? "reference" : "concept");
        setPreincorporation(false);
      } else {
        throw new Error(
          "Your enquiry could not be delivered. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "A connection error occurred. Please try again.",
      );
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }
  if (!mock && (!available || !privacyHref)) {
    return (
      <div
        className={`enquiry-form ${project ? "project-form" : "contact-form"}`}
      >
        <h2>{t("Talk to our team")}</h2>
        <p>
          {t(
            "Online enquiries are temporarily unavailable. Please call our team to discuss your project, arrange a visit or request policy information.",
          )}
        </p>
        {productReference && (
          <p className="micro">
            {t("Product reference")}: {productReference.title} (
            {productReference.id})
          </p>
        )}
        <a className="button button--primary" href={company.telephoneHref}>
          {t("Call our team")} · {company.telephone}
          <AppIcon name="forward" />
        </a>
        <p className="micro">{t(company.hours)}</p>
        {privacyHref && <Link href={privacyHref}>{t("Privacy Policy")}</Link>}
      </div>
    );
  }
  const identity = (
    <div className="form-grid">
      <Field name="name" label={t("Full name")} required>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={160}
          placeholder={t("e.g. Marcus Vance")}
        />
      </Field>
      <Field
        name="company"
        label={t(project ? "Brand / company" : "Company / registered entity")}
        required={!preincorporation}
      >
        <input
          id="company"
          name="company"
          autoComplete="organization"
          required={!preincorporation}
          maxLength={200}
          placeholder={t("e.g. Vance Studios Co.")}
        />
        {project && (
          <label className="check-label preincorporation">
            <input
              type="checkbox"
              name="preincorporation"
              checked={preincorporation}
              onChange={(event) => setPreincorporation(event.target.checked)}
            />
            {t("Pre-incorporation / studio")}
          </label>
        )}
      </Field>
      <Field name="email" label={t("Official work email")} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={t("marcus@brand.com")}
        />
      </Field>
      <Field
        name="phone"
        label={t("Direct phone / WhatsApp (with country code)")}
        required
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
          minLength={6}
          pattern={"(?=(?:[^0-9]*[0-9]){6,15}[^0-9]*$)[+\\(\\)0-9 .\\-]{6,40}"}
          placeholder={t("+66 81 123 4567")}
        />
      </Field>
      {project && (
        <>
          <Field
            name="country"
            label={t("Country of brand headquarters")}
            required
          >
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              defaultValue=""
              required
            >
              <option value="" disabled>
                {t("Select country / operational jurisdiction")}
              </option>
              {[
                "Thailand",
                "Australia",
                "China",
                "France",
                "Germany",
                "Japan",
                "Singapore",
                "United Kingdom",
                "United States",
                "Other",
              ].map((item) => (
                <option key={item} value={item}>
                  {t(item)}
                </option>
              ))}
            </select>
          </Field>
          <Field name="line" label={t("LINE ID (optional)")}>
            <input
              id="line"
              name="line"
              maxLength={160}
              placeholder={t("Enter your LINE ID")}
            />
          </Field>
        </>
      )}
    </div>
  );
  const consent = (
    <label className="check-label consent">
      <input id="consent" name="consent" type="checkbox" required />
      <span>
        {t(
          mock
            ? "I understand that this is a mock submission and no enquiry will be sent."
            : project
              ? "B2B manufacturing data policy: I consent to processing my contact details and project specifications for feasibility review."
              : "I consent to processing my corporate contact details and this message to respond to my enquiry.",
        )}
        {privacyHref && (
          <>
            {t(" ")}
            <Link href={privacyHref}>{t("Privacy Policy")}</Link>
          </>
        )}
      </span>
    </label>
  );
  return (
    <FieldErrors.Provider value={errors}>
      <form
        className={`enquiry-form ${project ? "project-form" : "contact-form"}`}
        method="post"
        action="/api/enquiries"
        encType="multipart/form-data"
        aria-busy={status === "sending"}
        onSubmit={submit}
        onInvalid={(event) => {
          const field = event.target;
          if (!(
            field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement ||
            field instanceof HTMLTextAreaElement
          ))
            return;
          field.setCustomValidity(
            t(
              field.validity.valueMissing
                ? "This field is required."
                : field instanceof HTMLInputElement && field.type === "email"
                  ? "Enter a valid email address."
                  : "Enter a valid value.",
            ),
          );
        }}
        onInput={(event) => {
          const field = event.target;
          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement ||
            field instanceof HTMLTextAreaElement
          )
            field.setCustomValidity("");
        }}
      >
        <input type="hidden" name="kind" value={kind} />
        {mock && (
          <p className="micro">
            <strong>{t("Mock preview")}</strong>
            {t(" ")}
            {t(
              "Use test details only. Submissions are validated without sending an enquiry.",
            )}
          </p>
        )}
        {productReference && (
          <>
            <input type="hidden" name="productId" value={productReference.id} />
            <p id="productId" tabIndex={-1} className="micro">
              {t("Product reference")}: {productReference.title} (
              {productReference.id})
            </p>
          </>
        )}
        <noscript>
          <p>
            {t(
              "Without JavaScript, submitting this form opens the delivery response on a new page. Please call our team if you need help.",
            )}
          </p>
        </noscript>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">{t("Leave this field empty")}</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        {project ? (
          <>
            <FormSection
              number="01"
              title={t("About you & your brand")}
              icon="person"
              aside={t("Required credentials")}
            >
              {t(identity)}
              <fieldset className="communication">
                <legend>{t("Preferred communication protocol")}</legend>
                {["Email", "LINE", "Call"].map((item, i) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="communication"
                      value={item}
                      defaultChecked={i === 0}
                    />
                    <span>{t(item)}</span>
                  </label>
                ))}
              </fieldset>
            </FormSection>
            <FormSection
              number="02"
              title={t("Product details & project stage")}
              icon="shirts"
              aside={t("Categorisation")}
            >
              <Field
                name="category"
                label={t("Primary apparel category")}
                required
              >
                <select
                  id="category"
                  name="category"
                  defaultValue={
                    [
                      "T-shirt",
                      "Polo",
                      "Uniform",
                      "Sportswear",
                      "Streetwear",
                      "Other",
                    ].includes(initialCategory)
                      ? initialCategory
                      : ""
                  }
                  required
                >
                  <option value="" disabled>
                    {t(
                      "Select a category: T-shirt / Polo / Uniform / Sportswear / Other",
                    )}
                  </option>
                  {[
                    "T-shirt",
                    "Polo",
                    "Uniform",
                    "Sportswear",
                    "Streetwear",
                    "Other",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {t(item)}
                    </option>
                  ))}
                </select>
              </Field>
              <fieldset className="readiness">
                <legend>
                  {t("Technical readiness / current starting point *")}
                </legend>
                <div className="grid-two">
                  {[
                    [
                      "concept",
                      "Level 01",
                      "I need help from the beginning",
                      "Share your idea, reference image, quantity, and intended use. Our team will help assess the appropriate next step.",
                    ],
                    [
                      "reference",
                      "Level 02",
                      "I already have a design or reference",
                      "Upload your design, sample image, or product details so we can assess the production requirements.",
                    ],
                  ].map(([value, label, title, body]) => (
                    <label
                      className={stage === value ? "selected" : ""}
                      key={value}
                    >
                      <input
                        type="radio"
                        name="stage"
                        value={value}
                        checked={stage === value}
                        onChange={() => setStage(value)}
                        required
                      />
                      <span className="eyebrow">{t(label)}</span>
                      <strong>{t(title)}</strong>
                      <span>{t(body)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field
                name="message"
                label={t("Tell us about your product")}
                required
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={8000}
                  placeholder={t(
                    "Describe the product style, intended use, preferred fabric or colour, sizing, and any important details.",
                  )}
                />
              </Field>
            </FormSection>
            <FormSection
              number="03"
              title={t("Requirements")}
              icon="brief"
              aside={t("BOM parameters")}
            >
              <Field
                name="volume"
                label={t("Estimated production volume (per style / colourway)")}
                required
              >
                <select id="volume" name="volume" defaultValue="" required>
                  <option value="" disabled>
                    {t("Select pilot or mass run capacity")}
                  </option>
                  {[
                    ["under-800", "Under 800 pieces"],
                    ["800-2000", "800–2,000 pieces"],
                    ["2000-5000", "2,000–5,000 pieces"],
                    ["5000-10000", "5,000–10,000 pieces"],
                    ["10000-plus", "Over 10,000 pieces"],
                    ["unsure", "Not sure yet"],
                  ].map(([value, label]) => (
                    <option key={value} value={value}>
                      {t(label)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                name="handover"
                label={t("Target handover / on-port window")}
              >
                <input
                  id="handover"
                  name="handover"
                  maxLength={160}
                  placeholder={t("e.g. Q3 2027 (July – September)")}
                />
              </Field>
              <div
                className="upload-zone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  addFiles(Array.from(event.dataTransfer.files));
                }}
              >
                <span className="upload-symbol" aria-hidden="true">
                  <AppIcon name="upload" size={36} />
                </span>
                <h3>{t("Drag & drop specification assets")}</h3>
                <p className="micro" id="file-hint">
                  {t(
                    "PDF, AI, DXF, ZIP, XLSX, PNG · 50 MB per file · 5 files / 100 MB total",
                  )}
                </p>
                <label className="upload-button" htmlFor="files">
                  {t("Browse machine directory")}
                  <AppIcon name="upload" />
                </label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept=".pdf,.ai,.dxf,.zip,.xlsx,.png"
                  aria-describedby="file-hint file-error"
                  onChange={(event) => {
                    addFiles(Array.from(event.target.files ?? []));
                    event.target.value = "";
                  }}
                />
              </div>
              <p id="file-error" className="field-error" role="status">
                {t(attachmentError)}
              </p>
              {files.length > 0 && (
                <div className="attachment-list">
                  <p className="micro">
                    {t("Attached technical documentation [{count} files]", {
                      count: files.length,
                    })}
                  </p>
                  {files.map((file, i) => (
                    <div key={`${file.name}-${i}`}>
                      <span>
                        {t(file.name)}
                        <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                      </span>
                      <button
                        type="button"
                        aria-label={t("Remove {file}", { file: file.name })}
                        onClick={() => {
                          setFiles(files.filter((_, index) => index !== i));
                          setAttachmentError("");
                        }}
                      >
                        {t("Remove")}
                        <AppIcon name="close" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="consent-box">
                <label className="check-label">
                  <input type="checkbox" name="nda" />
                  <span>
                    <strong>{t("Request bilateral mutual NDA:")}</strong>{" "}
                    {t(
                      "I request an NDA before sharing confidential pattern engineering specifications.",
                    )}
                  </span>
                </label>
                {t(consent)}
              </div>
            </FormSection>
            <div className="submission-panel">
              <h2>{t("Ready for feasibility audit")}</h2>
              <p className="micro">
                {t("Production engineering review · Project brief intake")}
              </p>
              <button
                type="submit"
                className="button button--primary"
                disabled={status === "sending"}
              >
                {t(
                  status === "sending"
                    ? "Submitting…"
                    : "Submit project brief for feasibility review",
                )}
                <AppIcon name="send" />
              </button>
              <p className="micro">{t("Human pattern engineers only")}</p>
            </div>
          </>
        ) : (
          <>
            <div className="split-label">
              <h2 className="micro">{t("Desk transmission terminal")}</h2>
              <span className="eyebrow">{t("Form ref: OEM-BKK-09")}</span>
            </div>
            <div className="form-info">
              {t(
                "For detailed BOM evaluations and CAD uploads, please use the structured",
              )}
              {t(" ")}
              <Link href={localHref("/start-your-project")}>
                {t("Start Your Project")}
                <AppIcon name="outward" size={16} />
              </Link>
              {t(" ")}
              {t(
                "brief terminal. Use this desk form for commercial inquiries, factory visit requests, and general partnership dialog.",
              )}
            </div>
            {t(identity)}
            <Field name="inquiry" label={t("Inquiry type")} required>
              <select
                id="inquiry"
                name="inquiry"
                required
                defaultValue={
                  enquiryTypes.includes(
                    initialInquiry as (typeof enquiryTypes)[number],
                  )
                    ? initialInquiry
                    : "general"
                }
              >
                <option value="general">
                  {t("General partnership inquiry")}
                </option>
                <option value="quote">{t("Commercial quotation")}</option>
                <option value="visit">{t("Factory visit")}</option>
                <option value="audit">
                  {t("Buyer audit / certification binder")}
                </option>
                <option value="policy">
                  {t("Legal / privacy policy request")}
                </option>
              </select>
            </Field>
            <Field
              name="message"
              label={t("Detailed message / specification notes")}
              required
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                maxLength={8000}
                defaultValue={subject}
                placeholder={t(
                  "Specify estimated production volumes, technical requirements (e.g., GSM, fibre blend, seam sealing), or desired audit schedule…",
                )}
              />
            </Field>
            <div className="consent-box">{t(consent)}</div>
            <button
              type="submit"
              className="button button--dark"
              disabled={status === "sending"}
            >
              {t(
                status === "sending" ? "Dispatching…" : "Dispatch desk message",
              )}
              <AppIcon name="send" />
            </button>
          </>
        )}
        <div
          className="form-status"
          ref={summaryRef}
          tabIndex={-1}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {notice && <p>{t(notice)}</p>}
          {Object.entries(errors).length > 0 && (
            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <a href={localHref(`#${field}`)}>
                    {t(field)}: {t(message)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </FieldErrors.Provider>
  );
}
