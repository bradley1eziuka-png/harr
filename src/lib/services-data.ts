// ───────────────────────────────────────────────────────────────────────────
// Service content for Harr's Painting and Services.
//
// Only services the client confirmed are listed. Do not add guarantees,
// certifications, pricing, or services Benjamin has not provided.
// To hide a service, remove its key from site.config.json → services.enabled.
// ───────────────────────────────────────────────────────────────────────────

import { siteConfig, type ServiceKey } from "@/config";

export type ServiceStep = { number: string; title: string; description: string };
export type ServiceFaq = { q: string; a: string };
export type ServiceIcon = "paintbrush" | "layers" | "square" | "home" | "hammer" | "wrench";

export interface ServiceConfig {
  slug: string;
  path: string;
  title: string;
  icon: ServiceIcon;
  eyebrow: string;
  shortDescription: string;
  /** Specific work included - shown as chips on the card and a list on the page. */
  includes: string[];
  explanation: { title: string; body: string };
  faqs: ServiceFaq[];
  /** Pre-selected value in the estimate forms (matches PROJECT_TYPES labels). */
  formValue: string;
}

export const SHARED_PROCESS: ServiceStep[] = [
  {
    number: "01",
    title: "Request Your Free Estimate",
    description: "Tell us about your project by phone or with the estimate form.",
  },
  {
    number: "02",
    title: "Talk Through the Details",
    description:
      "Benjamin reviews the work, answers your questions, and plans next steps with you.",
  },
  {
    number: "03",
    title: "Get the Work Done",
    description:
      "Benjamin handles most projects himself and brings in experienced help for larger jobs.",
  },
];

const BASE_SERVICES = {
  painting: {
    slug: "painting",
    path: "/services/painting",
    title: "Interior & Exterior Painting",
    icon: "paintbrush",
    eyebrow: "Painting Services",
    shortDescription:
      "Interior and exterior painting to freshen up and protect homes and businesses.",
    includes: ["Interior", "Exterior", "Residential", "Commercial", "Surface prep"],
    explanation: {
      title: "Careful Prep. Clean Finish.",
      body: "Good paint work starts well before the first coat. Harr's Painting and Services handles interior and exterior painting for homes and commercial properties, including the surface preparation and finishing that help the result look right and last.",
    },
    faqs: [
      {
        q: "Do you paint both homes and commercial spaces?",
        a: "Yes. Harr's handles residential and commercial painting, inside and out.",
      },
    ],
    formValue: "Interior Painting",
  },
  siding: {
    slug: "siding",
    path: "/services/siding",
    title: "Siding Installation & Replacement",
    icon: "layers",
    eyebrow: "Siding Services",
    shortDescription: "New siding installation and replacement for homes and buildings.",
    includes: ["Installation", "Replacement", "Repairs", "New construction"],
    explanation: {
      title: "Siding for Existing Homes and New Builds",
      body: "Whether a section of siding needs repair, an older exterior needs to be replaced, or a new building needs siding installed, Benjamin can look at the project and talk through what it will take.",
    },
    faqs: [
      {
        q: "Can you install siding on new construction?",
        a: "Yes. Siding work covers existing properties as well as new construction.",
      },
    ],
    formValue: "Siding",
  },
  drywall: {
    slug: "drywall",
    path: "/services/drywall",
    title: "Drywall Repair & Installation",
    icon: "square",
    eyebrow: "Drywall Services",
    shortDescription: "Drywall repairs, replacement, installation, and finishing.",
    includes: ["Installation", "Repair", "Replacement", "Finishing"],
    explanation: {
      title: "Smooth Walls, Start to Finish",
      body: "From patching damage to hanging and finishing new drywall, solid drywall work is the foundation for a clean paint finish. Harr's can handle the drywall and the painting so one person is responsible for the whole result.",
    },
    faqs: [
      {
        q: "Can you handle drywall and painting together?",
        a: "Yes. Benjamin does both, so a repair or remodel doesn't need separate contractors for each step.",
      },
    ],
    formValue: "Drywall",
  },
  roofing: {
    slug: "roofing",
    path: "/services/roofing",
    title: "Roofing Services",
    icon: "home",
    eyebrow: "Roofing Services",
    shortDescription: "Roof repairs, replacements, and roofing for new construction.",
    includes: ["Repairs", "Replacement", "New construction"],
    explanation: {
      title: "Roof Repairs and Replacement",
      body: "Request an estimate for a roof repair, a full replacement, or roofing on a new build. Benjamin will talk through the project with you and follow up with next steps.",
    },
    faqs: [
      {
        q: "Do you do roofing on new construction?",
        a: "Yes. Roofing services include repairs, replacement, and roofing for new construction.",
      },
    ],
    formValue: "Roofing",
  },
  remodeling: {
    slug: "remodeling",
    path: "/services/remodeling",
    title: "Remodeling & Home Improvements",
    icon: "hammer",
    eyebrow: "Remodeling Services",
    shortDescription:
      "Bathroom remodeling, window and door installation, and other home improvements.",
    includes: ["Bathroom remodeling", "Renovations", "Windows", "Doors"],
    explanation: {
      title: "Updates That Improve How Your Home Works",
      body: "Benjamin's construction background covers residential remodeling, including bathrooms, renovations, and window and door installation. Share what you have in mind and he'll help you figure out the next step.",
    },
    faqs: [
      {
        q: "What remodeling work do you do?",
        a: "Bathroom remodeling, window and door installation, and other home improvements.",
      },
    ],
    formValue: "Remodeling",
  },
  repairs: {
    slug: "general-repairs",
    path: "/services/general-repairs",
    title: "General Repairs & Maintenance",
    icon: "wrench",
    eyebrow: "Repairs & Maintenance",
    shortDescription:
      "Soffit and fascia, concrete steps and flatwork, sandblasting, lawn care, and other property repairs.",
    includes: ["Soffit & fascia", "Concrete flatwork & steps", "Sandblasting", "Lawn care"],
    explanation: {
      title: "One Call for the Odd Jobs",
      body: "Properties need ongoing attention. Harr's handles soffit and fascia, concrete flatwork and steps, sandblasting, lawn care, and other general maintenance so smaller jobs don't pile up.",
    },
    faqs: [
      {
        q: "My project isn't listed. Can you still help?",
        a: "Call or send a request describing the work. Benjamin will let you know whether it's something he can take on.",
      },
    ],
    formValue: "General Repairs",
  },
} satisfies Record<ServiceKey, ServiceConfig>;

// Apply optional title/description overrides from site.config.json.
export const SERVICES = Object.fromEntries(
  Object.entries(BASE_SERVICES).map(([key, base]) => {
    const o = siteConfig.services.overrides[key as ServiceKey] ?? {};
    return [
      key,
      {
        ...base,
        ...(o.title ? { title: o.title } : {}),
        ...(o.shortDescription ? { shortDescription: o.shortDescription } : {}),
      },
    ];
  }),
) as Record<ServiceKey, ServiceConfig>;

export function isServiceEnabled(key: ServiceKey) {
  return siteConfig.services.enabled.includes(key);
}

// Ordered list for the nav, footer, and homepage grid.
export const SERVICE_LIST: ServiceConfig[] = siteConfig.services.enabled.map((k) => SERVICES[k]);
