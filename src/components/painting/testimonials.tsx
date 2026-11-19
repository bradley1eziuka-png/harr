import { Quote, Star } from "lucide-react";

import { REVIEWS, SHOW_STARS } from "@/lib/reviews";
import { SectionHeading } from "./section-heading";

// Reviews live in src/lib/reviews.ts. The section is hidden if there are none.
export function Testimonials() {
  if (REVIEWS.length === 0) return null;

  return (
    <section id="reviews" className="section-pad scroll-mt-24 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Customer Reviews" title="What Our Customers Say" />

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_2px_20px_-14px_rgba(0,0,0,0.14)]"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-7 text-accent" aria-hidden />
                {SHOW_STARS && (
                  <span className="flex gap-0.5 text-gold" role="img" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-5 fill-current" aria-hidden />
                    ))}
                  </span>
                )}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-primary">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
