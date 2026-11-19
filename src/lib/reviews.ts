// ───────────────────────────────────────────────────────────────────────────
// Customer reviews shown in the homepage "What Our Customers Say" section.
//
// These three came from an AI-generated mockup and are NOT verified. Until
// Benjamin confirms each one is a real customer review:
//   • They live in UNVERIFIED_PREVIEW, which exists ONLY in local dev
//     (`npm run dev`), shown under an "unverified preview" banner. Production
//     builds strip it out entirely — the text is not in the shipped JS.
//   • To publish a review: confirm it with Benjamin, get the customer's OK to
//     use their name/city, then MOVE it into VERIFIED_REVIEWS with
//     verified: true.
//
// Stars: SHOW_STARS stays false. Turn it on only if Benjamin confirms the
// original reviews were five-star ratings. No review counts, Google badges, or
// structured review data are added anywhere.
// ───────────────────────────────────────────────────────────────────────────

export type Review = {
  quote: string;
  name: string;
  location: string;
  verified: boolean;
};

export const SHOW_STARS = false;

// Confirmed real reviews (shown on the live site). Empty until confirmed.
const VERIFIED_REVIEWS: Review[] = [];

// Dev-only placeholders from the AI mockup. Compiled out of production builds.
const UNVERIFIED_PREVIEW: Review[] = import.meta.env.DEV
  ? [
      {
        quote:
          "Harr fixed water damage on our ceiling and replaced rotted baseboards before even touching a paintbrush. Most painters would have just painted over it. You can tell he has over 20 years in the trades.",
        name: "Mark K.",
        location: "Onalaska, WI",
        verified: false,
      },
      {
        quote:
          "Extremely clean work. Every night the floor was completely vacuumed, furniture covered, and zero mess left behind. Our living room and kitchen look brand new.",
        name: "Sarah R.",
        location: "Holmen, WI",
        verified: false,
      },
      {
        quote:
          "As a landlord in La Crosse, having one guy who can fix drywall, repair subflooring, AND paint the entire unit between tenants saves me thousands. Reliable and fast.",
        name: "David B.",
        location: "La Crosse, WI",
        verified: false,
      },
    ]
  : [];

export const REVIEWS: Review[] = [...VERIFIED_REVIEWS, ...UNVERIFIED_PREVIEW];
