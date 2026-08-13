import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A magenta rule that draws itself under a phrase as the phrase scrolls in.
 *
 * Deliberately rationed: it marks the two numbers this page is asking a founder
 * to weigh against each other — the experience behind it, and the price. Put it
 * on a third thing and it stops meaning anything.
 *
 * The rule is absolutely positioned, so it never affects line height or wrap.
 */
export function Highlight({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <span className="o-highlight">
      {children}
      {reduced ? (
        <span aria-hidden className="o-highlight-rule" />
      ) : (
        <motion.span
          aria-hidden
          className="o-highlight-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </span>
  );
}
