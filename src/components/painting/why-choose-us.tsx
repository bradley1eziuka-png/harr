import { BadgeDollarSign, ClipboardCheck, Hammer, Sparkles, Wrench } from "lucide-react";

import { SectionHeading } from "./section-heading";

const REASONS = [
  {
    icon: Hammer,
    title: "Experienced Workmanship",
    description: "Hands-on construction experience since 1998.",
  },
  {
    icon: Sparkles,
    title: "Clean & Dependable",
    description: "Respectful service and clear communication.",
  },
  {
    icon: Wrench,
    title: "Painting & Home Repairs",
    description: "Painting, siding, drywall, roofing, and more from one business.",
  },
  {
    icon: ClipboardCheck,
    title: "Free Estimates",
    description: "Know where you stand before you commit.",
  },
  {
    icon: BadgeDollarSign,
    title: "New Customer Discounts",
    description: "Ask about discounts for first-time customers.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-pad scroll-mt-24 bg-primary">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          light
          eyebrow="Why Choose Harr's"
          title="Why Choose Harr's Painting & Services?"
          description="With over 25 years of construction experience, Benjamin Harr provides dependable painting, repairs, and home improvement services. Whether it's a small repair or a larger project, quality work and attention to detail come first."
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white/10 ${
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                } ${i === 4 ? "sm:col-span-2" : ""}`}
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary shadow-sm">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/70">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
