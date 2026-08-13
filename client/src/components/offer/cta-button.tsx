import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Primary CTA. Scrolls to the embedded form — never off the page.
 *
 * Two pieces of feedback, both cheap: hover fills it from the left rather than
 * cross-fading, so the button has a direction and the arrow follows it, and
 * pressing gives back a small physical push.
 *
 * It used to also lean toward the cursor. That was cut: a button that chases
 * the pointer *and* wipes is two gestures competing, and this page is meant to
 * read as an editorial studio rather than a product tour.
 */
export function CtaButton({
  children = "I need a website now!",
  className,
}: {
  children?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href="#apply"
      whileTap={reduced ? undefined : { scale: 0.975 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "o-cta relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-magenta px-6 py-3.5 text-sm font-medium tracking-[0.28px] text-white",
        className,
      )}
    >
      {/* Sits above the button's own background but below its label. */}
      <span aria-hidden className="o-cta-sweep" />
      <span className="relative">{children}</span>
      <ArrowRight aria-hidden className="o-cta-arrow relative size-4" />
    </motion.a>
  );
}
