import { ArrowRight, BadgeCheck, Hammer, Phone, ShieldCheck } from "lucide-react";

import { BUSINESS_PHONE, BUSINESS_PHONE_TEL, COPY } from "@/lib/site-config";
import { IMAGES } from "@/lib/site-images";
import { ctaButton } from "./buttons";
import { EstimateFormCard } from "./estimate-form";

const HIGHLIGHTS = [
  { icon: Hammer, label: "25+ Years of Experience" },
  { icon: BadgeCheck, label: "Free Estimates" },
  { icon: ShieldCheck, label: "Reliable, Quality Work" },
];

// Two-column hero: headline, copy, trust highlights and CTAs on the left,
// compact estimate form on the right. Stacks on mobile.
export function Hero() {
  // Accent the location at the end of the headline ("... in Onalaska, WI").
  const match = COPY.hero.headline.match(/^(.*?\sin)\s+(.+)$/);
  const lead = match?.[1];
  const tail = match?.[2]?.trim().replace(", ", ",\u00a0");
  return (
    <section id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGES.hero}
          alt="A painter rolling a fresh coat of paint onto a living room wall"
          className="h-full w-full object-cover object-[35%_center]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/70 to-primary/40" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-28 sm:py-32 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {COPY.hero.eyebrow}
            </p>

            <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[3.5rem]">
              {lead && tail ? (
                <>
                  {lead} <span className="text-gold">{tail}</span>
                </>
              ) : (
                COPY.hero.headline
              )}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {COPY.hero.subheadline}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold leading-snug text-white backdrop-blur-sm sm:flex-col sm:items-start"
                >
                  <Icon className="size-5 shrink-0 text-gold" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#estimate" className={ctaButton({ variant: "gold", size: "lg" })}>
                Get a Free Estimate
                <ArrowRight className="size-4" />
              </a>
              <a
                href={BUSINESS_PHONE_TEL}
                className={ctaButton({ variant: "outlineLight", size: "lg" })}
              >
                <Phone className="size-4" />
                Call {BUSINESS_PHONE}
              </a>
            </div>
          </div>

          <div className="lg:pl-4">
            <EstimateFormCard id="estimate" />
          </div>
        </div>
      </div>
    </section>
  );
}
