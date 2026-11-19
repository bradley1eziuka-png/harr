import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  /** Real photos. Omit both to show the clearly-labelled placeholder state. */
  before?: string;
  after?: string;
  alt: string;
  className?: string;
};

function Panel({ src, label, alt }: { src?: string | undefined; label: string; alt: string }) {
  if (src) return <img src={src} alt={alt} draggable={false} className="size-full object-cover" />;
  const isBefore = label === "Before";
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 text-center",
        isBefore ? "bg-[#c9d3da]" : "bg-[#e6edf1]",
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(13,34,41,0.06) 0 14px, transparent 14px 28px)",
        ...(isBefore ? { paddingRight: "50%" } : { paddingLeft: "50%" }),
      }}
    >
      <ImageIcon className="size-8 text-primary/40" aria-hidden />
      <span className="text-sm font-semibold text-primary/60">{label} photo placeholder</span>
    </div>
  );
}

// Accessible before/after comparison. Drag, tap, or use the arrow keys.
export function BeforeAfterSlider({ before, after, alt, className }: Props) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function moveTo(clientX: number) {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }
  function onPointerDown(e: PointerEvent) {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  }

  return (
    <div
      ref={box}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className={cn(
        "relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-border bg-secondary",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Panel src={after} label="After" alt={`After: ${alt}`} />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Panel src={before} label="Before" alt={`Before: ${alt}`} />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        After
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className="absolute inset-y-0 z-10 w-10 -translate-x-1/2 cursor-ew-resize focus-visible:outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow" />
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-accent text-sm font-bold text-primary shadow-lg">
          ⇆
        </span>
      </div>
    </div>
  );
}
