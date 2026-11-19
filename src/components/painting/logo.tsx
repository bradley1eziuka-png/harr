import { cn } from "@/lib/utils";
import { BUSINESS_NAME, LOGO } from "@/lib/site-config";

// Temporary text-based brand mark: an understated "H" monogram plus a stacked
// HARR'S / PAINTING & SERVICES wordmark. Set branding.logo.src in
// site.config.json to swap in a real logo later.
export function Logo({ className }: { className?: string }) {
  if (LOGO.src) {
    return (
      <img
        src={LOGO.src}
        alt={LOGO.alt || `${BUSINESS_NAME} logo`}
        className={cn("h-10 w-auto max-w-[9rem] shrink-0 object-contain", className)}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg border border-accent/70 bg-primary font-display text-xl font-extrabold leading-none text-accent",
        className,
      )}
    >
      H
    </span>
  );
}

export function Brand({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Logo />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-[0.08em]",
            dark ? "text-primary" : "text-white",
          )}
        >
          HARR&rsquo;S
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold italic tracking-[0.2em]",
            dark ? "text-accent-ink" : "text-gold",
          )}
        >
          PAINTING &amp; SERVICES
        </span>
      </span>
    </span>
  );
}
