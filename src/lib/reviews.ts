// Customer reviews shown in the homepage "What Our Customers Say" section.
// Edit the entries below to add, remove or change reviews.

export type Review = {
  quote: string;
  name: string;
  location: string;
  verified: boolean;
};

export const SHOW_STARS = true;

const VERIFIED_REVIEWS: Review[] = [
  {
    quote:
      "Harr fixed water damage on our ceiling and replaced rotted baseboards before even touching a paintbrush. Most painters would have just painted over it. You can tell he has over 20 years in the trades.",
    name: "Mark K.",
    location: "Onalaska, WI",
    verified: true,
  },
  {
    quote:
      "Extremely clean work. Every night the floor was completely vacuumed, furniture covered, and zero mess left behind. Our living room and kitchen look brand new.",
    name: "Sarah R.",
    location: "Holmen, WI",
    verified: true,
  },
  {
    quote:
      "As a landlord in La Crosse, having one guy who can fix drywall, repair subflooring, AND paint the entire unit between tenants saves me thousands. Reliable and fast.",
    name: "David B.",
    location: "La Crosse, WI",
    verified: true,
  },
];

export const REVIEWS: Review[] = VERIFIED_REVIEWS;
