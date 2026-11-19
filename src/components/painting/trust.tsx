import { ArrowRight } from "lucide-react";

import { SectionHeading } from "./section-heading";
import { ctaButton } from "./buttons";

// "Meet Benjamin Harr". No owner photo exists yet, and a stock photo must not
// imply it shows Benjamin, so the visual is a typographic experience panel.
// Swap in a real portrait here once the client provides one.
const MILESTONES = [
  { year: "1998", text: "Begins working in the construction industry" },
  { year: "2024", text: "Founds Harr's Painting and Services in May" },
  { year: "Today", text: "Personally handles most projects" },
];

export function Trust() {
  return (
    <section id="about" className="section-pad scroll-mt-24 bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="rounded-3xl bg-primary p-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-10">
          <span
            aria-hidden
            className="flex size-16 items-center justify-center rounded-xl border border-accent/70 font-display text-4xl font-extrabold text-accent"
          >
            H
          </span>
          <p className="mt-6 font-display text-2xl font-semibold tracking-tight">Benjamin Harr</p>
          <p className="text-sm text-white/60">Owner, Harr&rsquo;s Painting and Services LLC</p>
          <ol className="mt-8 space-y-5 border-l border-white/15 pl-6">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-accent" />
                <p className="font-display text-lg font-bold text-gold">{m.year}</p>
                <p className="text-[0.95rem] text-white/80">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeading align="left" eyebrow="About" title="Meet Benjamin Harr" />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Benjamin has worked in construction since 1998, gaining experience in painting,
              remodeling, sandblasting, and repairs.
            </p>
            <p>
              He started Harr&rsquo;s Painting and Services in 2024 to provide dependable, hands-on
              service to homeowners and businesses in the area.
            </p>
            <p>
              Benjamin handles most projects personally and works with other experienced
              tradespeople when additional help is needed.
            </p>
          </div>
          <div className="mt-8">
            <a href="#estimate" className={ctaButton({ variant: "solid", size: "md" })}>
              Get a Free Estimate
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
