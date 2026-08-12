import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative border-t border-white/8 px-6 py-28 md:px-12 md:py-40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1120px]">
        {eyebrow && (
          <Reveal>
            <p className="o-eyebrow mb-8 flex items-center gap-3 text-white/60">
              <span className="h-px w-8 bg-magenta-lift/60" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Baskerville for the emotional half, Inter Light for the plain half. */
export function MixedHeading({
  display,
  light,
  className,
}: {
  display: string;
  light?: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "o-display text-[30px] leading-[1.14] sm:text-[38px] md:text-[46px]",
        className,
      )}
    >
      {display}
      {light && (
        <>
          {" "}
          <span className="font-body font-light text-white/70">{light}</span>
        </>
      )}
    </h2>
  );
}
