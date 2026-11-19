import { useEffect, useId, useState, type FormEvent } from "react";
import { CheckCircle2, Info, Phone } from "lucide-react";

import { FORM_IS_DEMO, submitEstimate, type EstimateValues } from "@/lib/form-submit";
import { FORM_SERVICE_OPTIONS, PREFILL_EVENT, type PrefillDetail } from "@/lib/estimator-data";
import { siteConfig } from "@/config";
import { BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/site-config";
import { ctaButton } from "./buttons";

type Variant = "compact" | "full";
type Values = Required<EstimateValues>;
type Status = "idle" | "submitting" | "success" | "demo" | "error";

const EMPTY: Values = {
  name: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  details: "",
};

const fieldBase =
  "h-12 w-full rounded-lg border bg-white px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/35";
const fieldOk = "border-border focus:border-accent";
const fieldErr = "border-destructive focus:border-destructive";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}{" "}
        {required && (
          <span className="text-accent-ink" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

// Estimate request form. `compact` (hero): name, phone, city, project type,
// description. `full` (contact section): first/last name, phone, email, city,
// service, details. Delivery is handled by src/lib/form-submit.ts; success is
// only shown after the provider confirms receipt.
export function EstimateForm({ variant, formId }: { variant: Variant; formId: string }) {
  const uid = useId();
  const full = variant === "full";
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  // The project estimator can pre-fill the service and a project summary.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { service, details } = (e as CustomEvent<PrefillDetail>).detail;
      setValues((v) => ({ ...v, service, details }));
      setErrors({});
      setStatus("idle");
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2)
      next.name = full ? "Please enter your first name." : "Please enter your name.";
    if (full && values.lastName.trim().length < 2) next.lastName = "Please enter your last name.";
    if (values.phone.replace(/\D/g, "").length < 10)
      next.phone = "Please enter a 10-digit phone number.";
    if (full && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.city.trim().length < 2) next.city = "Please enter your project city.";
    if (!values.service) next.service = "Please select a project type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitEstimate(values, honeypot);
    if (result.status === "success") {
      setStatus("success");
      setValues(EMPTY);
    } else if (result.status === "demo") {
      setStatus("demo");
    } else {
      setStatus("error");
    }
  }

  const id = (k: string) => `${uid}-${k}`;
  const cls = (k: keyof Values) => `${fieldBase} ${errors[k] ? fieldErr : fieldOk}`;
  const aria = (k: keyof Values) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
  });

  if (status === "demo" || status === "success") {
    const demo = status === "demo";
    return (
      <div
        id={formId}
        role="status"
        className="flex flex-col items-center rounded-2xl border border-border bg-secondary px-6 py-10 text-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent-ink">
          {demo ? <Info className="size-8" /> : <CheckCircle2 className="size-8" />}
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-primary">
          {demo ? "Preview Only — Not Sent" : "Thank You — We'll Be in Touch"}
        </h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
          {demo
            ? "This website preview isn't connected to an inbox yet, so your request was not delivered. Please call to reach Benjamin."
            : "Your estimate request has been received. Benjamin will reach out about your project."}
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          Need to reach us now?{" "}
          <a href={BUSINESS_PHONE_TEL} className="font-semibold text-primary hover:text-accent-ink">
            Call {BUSINESS_PHONE}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-accent-ink hover:underline"
        >
          {demo ? "Back to the form" : "Submit another request"}
        </button>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={onSubmit} noValidate className="relative space-y-3.5">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input
          id={id("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {full ? (
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field id={id("name")} label="First name" required error={errors.name}>
            <input
              id={id("name")}
              type="text"
              autoComplete="given-name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className={cls("name")}
              {...aria("name")}
            />
          </Field>
          <Field id={id("lastName")} label="Last name" required error={errors.lastName}>
            <input
              id={id("lastName")}
              type="text"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={cls("lastName")}
              {...aria("lastName")}
            />
          </Field>
        </div>
      ) : (
        <Field id={id("name")} label="Full name" required error={errors.name}>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={cls("name")}
            {...aria("name")}
          />
        </Field>
      )}

      <div className={full ? "grid gap-3.5 sm:grid-cols-2" : "space-y-3.5"}>
        <Field id={id("phone")} label="Phone number" required error={errors.phone}>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Your phone number"
            className={cls("phone")}
            {...aria("phone")}
          />
        </Field>
        {full && (
          <Field id={id("email")} label="Email" required error={errors.email}>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              className={cls("email")}
              {...aria("email")}
            />
          </Field>
        )}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field id={id("city")} label={full ? "Project city" : "City"} required error={errors.city}>
          <input
            id={id("city")}
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            className={cls("city")}
            {...aria("city")}
          />
        </Field>
        <Field
          id={id("service")}
          label={full ? "Service needed" : "Project type"}
          required
          error={errors.service}
        >
          <select
            id={id("service")}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className={`${cls("service")} cursor-pointer`}
            {...aria("service")}
          >
            <option value="" disabled>
              Select…
            </option>
            {FORM_SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={id("details")} label={full ? "Project details" : "Brief project description"}>
        <textarea
          id={id("details")}
          rows={full ? 5 : 3}
          value={values.details}
          onChange={(e) => update("details", e.target.value)}
          placeholder="Tell us about the work you need done."
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/35"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={ctaButton({ variant: "gold", size: "lg" }) + " w-full"}
      >
        {status === "submitting" ? "Sending…" : "Request Free Estimate"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-sm font-medium text-destructive">
          We couldn't send your request. Please try again or call{" "}
          <a href={BUSINESS_PHONE_TEL} className="underline">
            {BUSINESS_PHONE}
          </a>
          .
        </p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Phone className="size-3.5 text-accent-ink" />
        Free estimate • No obligation
      </p>
      {FORM_IS_DEMO && siteConfig.form.showDemoNotice && (
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          Preview mode — form not connected yet
        </p>
      )}
    </form>
  );
}

// Compact white card used in the hero.
export function EstimateFormCard({ id }: { id?: string }) {
  return (
    <div
      id={id}
      className="scroll-mt-28 rounded-3xl border border-border bg-white p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:p-7"
    >
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          Get a Free Estimate
        </h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
          Tell us about your project and we'll be in touch.
        </p>
      </div>
      <EstimateForm variant="compact" formId="hero-estimate-form" />
    </div>
  );
}
