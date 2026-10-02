"use client";

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
  const error = useContext(FieldErrors)[name];
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {Children.map(children, (child) =>
        isValidElement(child) &&
        typeof child.type === "string" &&
        ["input", "select", "textarea"].includes(child.type)
          ? cloneElement(child as ReactElement<HTMLAttributes<HTMLElement>>, {
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? `${name}-error` : undefined,
            })
          : child,
      )}
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
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
}: {
  number: string;
  title: string;
  aside: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="form-section">
      <legend>
        <span className="stage-number">{number}</span>
        {title}
      </legend>
      <span className="form-section-aside micro">{aside}</span>
      {children}
    </fieldset>
  );
}

export function EnquiryForm({
  kind,
  initialStage = "concept",
  initialCategory = "",
  initialInquiry = "general",
  subject = "",
}: {
  kind: EnquiryKind;
  initialStage?: string;
  initialCategory?: string;
  initialInquiry?: string;
  subject?: string;
}) {
  const [stage, setStage] = useState(
    initialStage === "reference" ? "reference" : "concept",
  );
  const [preincorporation, setPreincorporation] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
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
      setStatus("sent");
      setNotice(
        "Your enquiry has been delivered. The team will contact you using the details provided.",
      );
      form.reset();
      setFiles([]);
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
  const identity = (
    <div className="form-grid">
      <Field name="name" label="Full name" required>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={160}
          placeholder="e.g. Marcus Vance"
        />
      </Field>
      <Field
        name="company"
        label={project ? "Brand / company" : "Company / registered entity"}
        required={!preincorporation}
      >
        <input
          id="company"
          name="company"
          autoComplete="organization"
          required={!preincorporation}
          maxLength={200}
          placeholder="e.g. Vance Studios Co."
        />
        {project && (
          <label className="check-label preincorporation">
            <input
              type="checkbox"
              name="preincorporation"
              checked={preincorporation}
              onChange={(event) => setPreincorporation(event.target.checked)}
            />
            Pre-incorporation / studio
          </label>
        )}
      </Field>
      <Field name="email" label="Official work email" required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="marcus@brand.com"
        />
      </Field>
      <Field
        name="phone"
        label="Direct phone / WhatsApp (with country code)"
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
          placeholder="+66 81 123 4567"
        />
      </Field>
      {project && (
        <>
          <Field name="country" label="Country of brand headquarters" required>
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select country / operational jurisdiction
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
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field name="line" label="LINE ID (optional)">
            <input
              id="line"
              name="line"
              maxLength={160}
              placeholder="Enter your LINE ID"
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
        {project
          ? "B2B manufacturing data policy: I consent to processing my contact details and project specifications for feasibility review."
          : "I consent to processing my corporate contact details and this message to respond to my enquiry."}{" "}
        <Link href="/contact?inquiry=policy&subject=Privacy%20Policy">
          Request privacy policy
        </Link>
      </span>
    </label>
  );
  return (
    <FieldErrors.Provider value={errors}>
      <form
        className={`enquiry-form ${project ? "project-form" : "contact-form"}`}
        onSubmit={submit}
      >
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        {project ? (
          <>
            <FormSection
              number="01"
              title="About you & your brand"
              aside="Required credentials"
            >
              {identity}
              <fieldset className="communication">
                <legend>Preferred communication protocol</legend>
                {["Email", "LINE", "Call"].map((item, i) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="communication"
                      value={item}
                      defaultChecked={i === 0}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </fieldset>
            </FormSection>
            <FormSection
              number="02"
              title="Product details & project stage"
              aside="Categorisation"
            >
              <Field name="category" label="Primary apparel category" required>
                <select
                  id="category"
                  name="category"
                  defaultValue={initialCategory}
                  required
                >
                  <option value="" disabled>
                    Select a category: T-shirt / Polo / Uniform / Sportswear /
                    Other
                  </option>
                  {[
                    "T-shirt",
                    "Polo",
                    "Uniform",
                    "Sportswear",
                    "Streetwear",
                    "Other",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <fieldset className="readiness">
                <legend>Technical readiness / current starting point *</legend>
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
                      <span className="eyebrow">{label}</span>
                      <strong>{title}</strong>
                      <span>{body}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field name="message" label="Tell us about your product" required>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={8000}
                  placeholder="Describe the product style, intended use, preferred fabric or colour, sizing, and any important details."
                />
              </Field>
            </FormSection>
            <FormSection
              number="03"
              title="Requirements"
              aside="BOM parameters"
            >
              <Field
                name="volume"
                label="Estimated production volume (per style / colourway)"
                required
              >
                <select id="volume" name="volume" defaultValue="" required>
                  <option value="" disabled>
                    Select pilot or mass run capacity
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
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name="handover" label="Target handover / on-port window">
                <input
                  id="handover"
                  name="handover"
                  maxLength={160}
                  placeholder="e.g. Q3 2027 (July – September)"
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
                  ↥
                </span>
                <h3>Drag &amp; drop specification assets</h3>
                <p className="micro" id="file-hint">
                  PDF, AI, DXF, ZIP, XLSX, PNG · 50 MB per file · 5 files / 100
                  MB total
                </p>
                <label className="upload-button" htmlFor="files">
                  Browse machine directory ↗
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
                {attachmentError}
              </p>
              {files.length > 0 && (
                <div className="attachment-list">
                  <p className="micro">
                    Attached technical documentation [{files.length} files]
                  </p>
                  {files.map((file, i) => (
                    <div key={`${file.name}-${i}`}>
                      <span>
                        {file.name}
                        <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => {
                          setFiles(files.filter((_, index) => index !== i));
                          setAttachmentError("");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="consent-box">
                <label className="check-label">
                  <input type="checkbox" name="nda" />
                  <span>
                    <strong>Request bilateral mutual NDA:</strong> I request an
                    NDA before sharing confidential pattern engineering
                    specifications.
                  </span>
                </label>
                {consent}
              </div>
            </FormSection>
            <div className="submission-panel">
              <h2>Ready for feasibility audit</h2>
              <p className="micro">
                Production engineering review · Project brief intake
              </p>
              <button
                type="submit"
                className="button button--primary"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Submitting…"
                  : "Submit project brief for feasibility review ↗"}
              </button>
              <p className="micro">Human pattern engineers only</p>
            </div>
          </>
        ) : (
          <>
            <div className="split-label">
              <h2 className="micro">Desk transmission terminal</h2>
              <span className="eyebrow">Form ref: OEM-BKK-09</span>
            </div>
            <div className="form-info">
              For detailed BOM evaluations and CAD uploads, please use the
              structured{" "}
              <Link href="/start-your-project">Start Your Project ↗</Link> brief
              terminal. Use this desk form for commercial inquiries, factory
              visit requests, and general partnership dialog.
            </div>
            {identity}
            <Field name="inquiry" label="Inquiry type" required>
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
                <option value="general">General partnership inquiry</option>
                <option value="quote">Commercial quotation</option>
                <option value="visit">Factory visit</option>
                <option value="audit">
                  Buyer audit / certification binder
                </option>
                <option value="policy">Legal / privacy policy request</option>
              </select>
            </Field>
            <Field
              name="message"
              label="Detailed message / specification notes"
              required
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                maxLength={8000}
                defaultValue={subject}
                placeholder="Specify estimated production volumes, technical requirements (e.g., GSM, fibre blend, seam sealing), or desired audit schedule…"
              />
            </Field>
            <div className="consent-box">{consent}</div>
            <button
              type="submit"
              className="button button--dark"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Dispatching…"
                : "Dispatch desk message ↗"}
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
          {notice && <p>{notice}</p>}
          {Object.entries(errors).length > 0 && (
            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <a href={`#${field}`}>
                    {field}: {message}
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
