import { ArrowRight } from "lucide-react";

import { PROJECTS } from "@/lib/projects";
import { IMAGES } from "@/lib/site-images";
import { BeforeAfterSlider } from "./before-after-slider";
import { SectionHeading } from "./section-heading";
import { ctaButton } from "./buttons";

// Representative stock imagery — NOT Harr's projects. Replaced by real photos
// via src/lib/projects.ts as they arrive.
const SAMPLES = [
  {
    src: IMAGES.galleryLivingRoom,
    alt: "Living room with freshly painted warm neutral walls",
    label: "Interior painting",
  },
  {
    src: IMAGES.galleryExterior,
    alt: "Home exterior with painted siding and white trim",
    label: "Exterior painting",
  },
  {
    src: IMAGES.galleryTrim,
    alt: "Close-up of crisp white painted trim and baseboards",
    label: "Trim & detail",
  },
];

export function Gallery() {
  const hasProjects = PROJECTS.length > 0;
  return (
    <section id="our-work" className="section-pad scroll-mt-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Our Work"
          description="Take a look at some of the painting and home improvement projects we can help with."
        />

        {hasProjects ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <figure key={p.title}>
                <BeforeAfterSlider before={p.before} after={p.after} alt={p.alt} />
                <figcaption className="mt-3 font-display text-base font-semibold text-primary">
                  {p.title}
                  {p.caption && (
                    <span className="block text-sm font-normal text-muted-foreground">
                      {p.caption}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-3xl">
            <BeforeAfterSlider alt="project photos" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Placeholder — real before-and-after project photos will appear here.
            </p>
          </div>
        )}

        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Representative imagery — not photos of Harr&rsquo;s completed projects
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {SAMPLES.map((item) => (
              <figure
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary/85 to-transparent p-4 pt-10 text-sm font-semibold text-white">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className={ctaButton({ variant: "solid", size: "md" })}>
            Start Your Project
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
