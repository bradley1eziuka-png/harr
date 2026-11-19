// Trust-building strip shown in place of customer reviews until real,
// verified reviews exist. Facts only - no ratings, counts, or credentials.
const FACTS = [
  { value: "Since 1998", label: "in the construction industry" },
  { value: "Owner-operated", label: "Benjamin handles most projects himself" },
  { value: "Free estimates", label: "a clear starting point, no commitment" },
  { value: "Mon–Sat", label: "6:30 AM–5:30 PM" },
];

export function FactsBand() {
  return (
    <section aria-label="At a glance" className="bg-accent">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 lg:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.value} className="text-primary">
            <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              {f.value}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-primary/80">{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
