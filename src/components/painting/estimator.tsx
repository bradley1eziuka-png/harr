import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PREFILL_EVENT,
  PROJECT_CONDITIONS,
  PROJECT_SIZES,
  PROJECT_TYPES,
  type PrefillDetail,
} from "@/lib/estimator-data";
import { SectionHeading } from "./section-heading";
import { ctaButton } from "./buttons";

type Choice = { type: string; size: string; condition: string };
const EMPTY: Choice = { type: "", size: "", condition: "" };

function OptionGroup({
  step,
  title,
  options,
  value,
  onChange,
  cols,
}: {
  step: number;
  title: string;
  options: readonly { label: string; hint?: string }[];
  value: string;
  onChange: (v: string) => void;
  cols: string;
}) {
  const labelId = `est-step-${step}`;
  return (
    <fieldset>
      <legend id={labelId} className="mb-3 flex items-center gap-3">
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full text-sm font-bold",
            value ? "bg-accent text-primary" : "bg-primary text-white",
          )}
        >
          {value ? <Check className="size-4" /> : step}
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-primary">
          {title}
        </span>
      </legend>
      <div role="radiogroup" aria-labelledby={labelId} className={cn("grid gap-3", cols)}>
        {options.map((o) => {
          const selected = value === o.label;
          return (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.label)}
              className={cn(
                "rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selected
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-border bg-white hover:border-primary/40",
              )}
            >
              <span className="block text-sm font-semibold text-primary">{o.label}</span>
              {o.hint && (
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                  {o.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// Three-step project estimator. It deliberately shows NO dollar amounts (no
// pricing has been supplied) - it builds a project summary and passes it to
// the contact form so the customer can request a real free estimate.
export function Estimator() {
  const [c, setC] = useState<Choice>(EMPTY);
  const complete = Boolean(c.type && c.size && c.condition);
  const set = (k: keyof Choice) => (v: string) => setC((p) => ({ ...p, [k]: v }));

  function requestEstimate() {
    const detail: PrefillDetail = {
      service: c.type,
      details: `Project estimator selections: Type: ${c.type}. Approximate size: ${c.size}. Condition: ${c.condition}.\n\nAdditional details: `,
    };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: detail }));
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section id="estimator" className="section-pad scroll-mt-24 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Project Estimator"
          title="Plan Your Project"
          description="Tell us what you need done, and we'll help you get started with a free estimate."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div className="space-y-8 rounded-3xl border border-border bg-white p-6 shadow-[0_2px_20px_-14px_rgba(0,0,0,0.14)] sm:p-8">
            <OptionGroup
              step={1}
              title="Project type"
              options={PROJECT_TYPES.map((label) => ({ label }))}
              value={c.type}
              onChange={set("type")}
              cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            />
            <OptionGroup
              step={2}
              title="Project size"
              options={PROJECT_SIZES}
              value={c.size}
              onChange={set("size")}
              cols="sm:grid-cols-3"
            />
            <OptionGroup
              step={3}
              title="Project condition"
              options={PROJECT_CONDITIONS}
              value={c.condition}
              onChange={set("condition")}
              cols="sm:grid-cols-3"
            />
          </div>

          <aside
            aria-live="polite"
            className="flex flex-col rounded-3xl bg-primary p-7 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8 lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Your project summary
            </p>
            <dl className="mt-5 space-y-4">
              {(
                [
                  ["Project type", c.type],
                  ["Approximate size", c.size],
                  ["Condition", c.condition],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="border-b border-white/10 pb-3">
                  <dt className="text-xs uppercase tracking-wider text-white/55">{k}</dt>
                  <dd className={cn("mt-1 font-semibold", v ? "text-white" : "text-white/35")}>
                    {v || "Not selected yet"}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-white/80">
              {complete
                ? "Thanks! We'll prepare a free estimate based on your selections."
                : "Choose an option in each step."}
            </p>

            <button
              type="button"
              disabled={!complete}
              onClick={requestEstimate}
              className={cn(
                ctaButton({ variant: "gold", size: "lg" }),
                "mt-6 w-full disabled:bg-white/10 disabled:text-white/40 disabled:opacity-100 disabled:shadow-none",
              )}
            >
              Get My Free Estimate
              <ArrowRight className="size-4" />
            </button>
            {(c.type || c.size || c.condition) && (
              <button
                type="button"
                onClick={() => setC(EMPTY)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white"
              >
                <RotateCcw className="size-3.5" /> Start over
              </button>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
