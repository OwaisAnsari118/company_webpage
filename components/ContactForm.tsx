"use client";

import { cloneElement, useEffect, useRef, useState, type FormEvent } from "react";
import { products, getProductBySlug } from "@/data/products";
import { Button } from "./Button";
import { IconCheck } from "./icons";

/**
 * Contact / evaluation request form.
 *
 * Pre-selection via URL, e.g. /contact?product=uart-controller&type=datasheet
 *   product = a product slug from data/products.ts
 *   type    = "general" | "datasheet" | "evaluation"
 *
 * TODO(email): Submissions are currently only logged to the console.
 * To deliver them, create a route handler (app/api/contact/route.ts) that sends
 * the payload with an email service (e.g. Resend, Postmark, SendGrid) or forwards
 * it to a CRM, then replace the console.log in `handleSubmit` with:
 *   await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
 * Keep API keys in Vercel environment variables, never in client code.
 */

const requestTypes = [
  { value: "general", label: "General inquiry" },
  { value: "datasheet", label: "Request datasheet" },
  { value: "evaluation", label: "Request evaluation" },
] as const;

type FormData = {
  name: string;
  company: string;
  email: string;
  country: string;
  product: string;
  type: string;
  message: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (d.company.trim().length < 2) e.company = "Please enter your company name.";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email address.";
  if (d.country.trim().length < 2) e.country = "Please enter your country.";
  if (!d.product) e.product = "Please choose a product.";
  if (d.message.trim().length < 10) e.message = "Please add a short message (at least 10 characters).";
  return e;
}

export function ContactForm() {
  const empty: FormData = {
    name: "",
    company: "",
    email: "",
    country: "",
    product: "",
    type: "general",
    message: "",
  };

  const [data, setData] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select product / request type from the URL after mount. Reading
  // window.location here (instead of useSearchParams) keeps the page fully
  // static and the form present in the server-rendered HTML.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = getProductBySlug(params.get("product") ?? "")?.slug;
    const typeParam = params.get("type") ?? "";
    const type = requestTypes.some((t) => t.value === typeParam) ? typeParam : undefined;
    if (product || type) {
      setData((d) => ({ ...d, product: product ?? d.product, type: type ?? d.type }));
    }
  }, []);

  const update = (field: keyof FormData, value: string) => {
    const next = { ...data, [field]: value };
    setData(next);
    // After the first submit attempt, re-validate live so errors clear as the user fixes them.
    if (attempted) setErrors(validate(next));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(data);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // TODO(email): replace with a POST to /api/contact (see note at top of file).
    console.log("[Pineapplix] Contact form submission:", { ...data, submittedAt: new Date().toISOString() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-black/10 bg-white p-8 sm:p-12">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow">
          <IconCheck className="h-6 w-6 text-brand-black" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-brand-black">Thank you, {data.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-ink-800">
          We&apos;ve received your message and will get back to you at{" "}
          <strong className="text-brand-black">{data.email}</strong> shortly.
        </p>
        <Button
          type="button"
          variant="outline-light"
          className="mt-8"
          onClick={() => {
            setData(empty);
            setErrors({});
            setAttempted(false);
            setSubmitted(false);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-white p-6 sm:p-10"
      aria-describedby="form-required-note"
    >
      <p id="form-required-note" className="mb-6 text-sm text-ink-800">
        Fields marked <span className="text-brand-black font-semibold">*</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} required>
          <input
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>
        <Field label="Company" name="company" error={errors.company} required>
          <input
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </Field>
        <Field label="Work email" name="email" error={errors.email} required>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label="Country" name="country" error={errors.country} required>
          <input
            type="text"
            autoComplete="country-name"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </Field>
        <Field label="Product of interest" name="product" error={errors.product} required>
          <select value={data.product} onChange={(e) => update("product", e.target.value)}>
            <option value="">Select a product…</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
                {p.status === "coming-soon" ? " (coming soon)" : ""}
              </option>
            ))}
            <option value="other">Other / custom IP</option>
          </select>
        </Field>
        <Field label="Request type" name="type">
          <select value={data.type} onChange={(e) => update("type", e.target.value)}>
            {requestTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" name="message" error={errors.message} required>
            <textarea
              rows={5}
              placeholder="Tell us about your project, target process/FPGA and timeline."
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-800">
          {/* PLACEHOLDER: link your privacy policy here */}
          We only use your details to respond to this request.
        </p>
        <Button type="submit" variant="dark">
          Send message
        </Button>
      </div>
    </form>
  );
}

/**
 * Label + control + error message wrapper. Injects id, name, aria-* and
 * shared styling into its single child input/select/textarea.
 */
function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: keyof FormData;
  error?: string;
  required?: boolean;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const control = cloneElement(children, {
      id,
      name,
      required,
      "aria-required": required || undefined,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
      className: `mt-1.5 block w-full rounded-md border bg-offwhite px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-800/60 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
        error
          ? "border-red-600 focus:ring-red-600/30"
          : "border-black/15 focus:border-brand-black focus:ring-brand-yellow"
      }`,
  });

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-black">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {control}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
