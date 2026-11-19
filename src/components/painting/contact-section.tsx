import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/config";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  LOCATION_LABEL,
} from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { EstimateForm } from "./estimate-form";

export function ContactSection() {
  const { hours } = siteConfig.business;
  const items = [
    {
      icon: Phone,
      label: "Phone",
      node: (
        <a href={BUSINESS_PHONE_TEL} className="hover:text-accent-ink">
          {BUSINESS_PHONE}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      node: (
        <a href={`mailto:${BUSINESS_EMAIL}`} className="break-all hover:text-accent-ink">
          {BUSINESS_EMAIL}
        </a>
      ),
    },
    { icon: MapPin, label: "Location", node: <span>{LOCATION_LABEL}</span> },
    {
      icon: Clock,
      label: "Hours",
      node: (
        <span>
          {hours.map((h) => (
            <span key={h.days} className="block">
              {h.days}, {h.hours}
            </span>
          ))}
        </span>
      ),
    },
  ];

  return (
    <section id="contact" className="section-pad scroll-mt-24 bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Get Your Free Estimate"
            description="Need painting, siding, drywall, or home repairs? Contact Harr's Painting and Services today to discuss your project."
          />
          <ul className="mt-9 space-y-5">
            {items.map(({ icon: Icon, label, node }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-gold">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <div className="mt-0.5 text-lg font-semibold text-primary">{node}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Based in {LOCATION_LABEL} and serving the surrounding tri-state area.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)] sm:p-8">
          <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight text-primary">
            Project Details
          </h3>
          <div id="contact-form" className="scroll-mt-28">
            <EstimateForm variant="full" formId="contact-estimate-form" />
          </div>
        </div>
      </div>
    </section>
  );
}
