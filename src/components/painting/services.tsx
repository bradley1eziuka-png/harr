import { ArrowRight, Hammer, Home, Layers, Paintbrush, Square, Wrench } from "lucide-react";
import type { ComponentType } from "react";

import { SERVICE_LIST, type ServiceIcon } from "@/lib/services-data";
import { SectionHeading } from "./section-heading";

const ICONS: Record<ServiceIcon, ComponentType<{ className?: string }>> = {
  paintbrush: Paintbrush,
  layers: Layers,
  square: Square,
  home: Home,
  hammer: Hammer,
  wrench: Wrench,
};

// Homepage services grid — every enabled service, each linking to its page.
export function Services() {
  return (
    <section id="services" className="section-pad scroll-mt-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Painting & Home Improvement Services"
          description="From painting and drywall to siding and remodeling, we help homeowners and businesses keep their properties looking their best."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICE_LIST.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.slug}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]"
              >
                <span className="flex size-14 items-center justify-center rounded-xl bg-primary text-gold shadow-sm transition-colors group-hover:bg-accent group-hover:text-primary">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>
                <ul
                  className="mt-5 flex flex-1 flex-wrap content-start gap-2"
                  aria-label="Includes"
                >
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={service.path}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink transition-all hover:gap-2.5"
                >
                  Learn more
                  <ArrowRight className="size-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
