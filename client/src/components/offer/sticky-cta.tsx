import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only bar. Appears after the hero, hides once the form is on screen so
 * it never sits on top of the thing it points at.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("apply");
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      setVisible(window.scrollY > 560 && formTop > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10.4px] uppercase tracking-[2.08px] text-white/70">
            FIVE SITES · CLOSES 31 AUG
          </p>
          <p className="mt-1 font-display text-[15px]">₹79,000 all in</p>
        </div>
        <a
          href="#apply"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-magenta px-4 py-3 text-[13px] font-medium text-white"
        >
          Apply
          <ArrowRight aria-hidden className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
