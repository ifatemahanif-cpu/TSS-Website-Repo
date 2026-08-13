import { useId, useState } from "react";
import { Plus } from "lucide-react";

export type QA = { q: string; a: string };

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-white/8">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q} className="border-b border-white/8">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="o-accordion-row flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-white/90"
            >
              <span className="o-display text-[17px] leading-snug sm:text-[19px]">
                {item.q}
              </span>
              {/* Grey when closed, brand accent when open: the one place on
                  the row where colour carries the state. Hover nudges it up a
                  notch so the whole row feels pressable. */}
              <Plus
                aria-hidden
                data-open={isOpen}
                className="o-plus mt-1 size-4 shrink-0"
              />
            </button>
            <div
              id={panelId}
              // The panel stays in the DOM when closed, so hide it from
              // assistive tech rather than leaving a second copy of every
              // answer in the accessibility tree.
              aria-hidden={!isOpen}
              className={`o-answer-grid grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {/* Slides up into place as the row opens, so the answer reads
                    as arriving rather than as a box being stretched. */}
                <p
                  data-open={isOpen}
                  className="o-answer max-w-[70ch] pb-7 pr-10 text-[15px] leading-[1.75] text-white/70"
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
