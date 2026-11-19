import { Quote, Star } from "lucide-react";

import { REVIEWS, SHOW_STARS } from "@/lib/reviews";
import { SectionHeading } from "./section-heading";

// REVIEWS holds only verified reviews in production; unverified placeholders
// exist in local dev only (see src/lib/reviews.ts) and show under a banner.
export function Testimonials() {
  const items = REVIEWS;
  if (items.length === 0) return null;
  const hasUnverified = items.some((r) => !r.verified);

  return (
    <section id="reviews" className="section-pad scroll-mt-24 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Customer Reviews" title="What Our Customers Say" />

        {hasUnverified && (
          <p
            role="note"
            className="mx-auto mt-8 max-w-2xl rounded-lg border border-dashed border-accent bg-accent/10 px-4 py-3 text-center text-sm font-medium text-primary"
          >
            Dev preview only — these reviews are unverified and are hidden on the live site until
            Benjamin confirms them.
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {items.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_2px_20px_-14px_rgba(0,0,0,0.14)]"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-7 text-accent" aria-hidden />
                {SHOW_STARS && r.verified && (
                  <span className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                )}
                {!r.verified && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                    Unverified
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
