import { useRef, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Primary CTA. Scrolls to the embedded form — never off the page.
 * On desktop pointers it leans toward the cursor by at most 6px.
 */
export function CtaButton({
  children = "I need a website now!",
  className,
  magnetic = false,
}: {
  children?: string;
  className?: string;
  magnetic?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: Math.max(-6, Math.min(6, dx * 0.12)),
      y: Math.max(-6, Math.min(6, dy * 0.2)),
    });
  };

  return (
    <motion.a
      ref={ref}
      href="#apply"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg bg-magenta px-6 py-3.5 text-sm font-medium tracking-[0.28px] text-white transition-colors hover:bg-magenta-lift",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform group-hover:translate-x-1"
      />
    </motion.a>
  );
}
