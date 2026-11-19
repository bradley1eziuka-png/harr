// Shared options for the project estimator and the estimate request forms.
// No prices live here on purpose - the client has not supplied pricing.

export const PROJECT_TYPES = [
  "Interior Painting",
  "Exterior Painting",
  "Siding",
  "Drywall",
  "Roofing",
  "Remodeling",
  "General Repairs",
] as const;

export const FORM_SERVICE_OPTIONS = [...PROJECT_TYPES, "Something else"];

export const PROJECT_SIZES = [
  { label: "Small", hint: "A single area or a smaller job" },
  { label: "Medium", hint: "Several areas or a mid-sized job" },
  { label: "Large", hint: "A whole-property or multi-area project" },
] as const;

export const PROJECT_CONDITIONS = [
  { label: "Minor preparation needed", hint: "Mostly in good shape" },
  { label: "Moderate repairs needed", hint: "Some repair work first" },
  { label: "Extensive work needed", hint: "Significant repair or rework" },
] as const;

export const PREFILL_EVENT = "harrs:prefill";
export type PrefillDetail = { service: string; details: string };
