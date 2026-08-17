import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";
import {
  TESTIMONIALS,
  TESTIMONIALS_APPROVED,
  type Testimonial,
} from "@/lib/offer-config";

/**
 * Social proof, sitting between "how it works" and the form — proof directly
 * before the ask.
 *
 * The quotes in offer-config.ts are PLACEHOLDERS written by an AI. Until
 * TESTIMONIALS_APPROVED is true, this section renders a visible ribbon saying
 * so, on purpose: a fabricated testimonial that ships silently is a
 * misleading-advertising problem. See the note above TESTIMONIALS in
 * client/src/lib/offer-config.ts.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section id="testimonials" eyebrow="IN THEIR WORDS">
      {!TESTIMONIALS_APPROVED && <PlaceholderRibbon />}

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        <Reveal>
          <MixedHeading
            display="What it’s like"
            light="on the other side of it."
          />
        </Reveal>

        <div className="max-w-[62ch]">
          <Reveal delay={1}>
            <p className="text-[16px] leading-[1.8] text-white/80">
              Every one of these started the same way — a founder who knew their
              business inside out and couldn’t get it onto a page.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
        {TESTIMONIALS.map((testimonial, i) => (
          <Reveal key={testimonial.quote} delay={i + 1} className="h-full">
            <Card testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Card({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, result } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/3 p-7 sm:p-8">
      {/* Baskerville quote mark, not an icon — matches the editorial type. */}
      <span
        aria-hidden
        className="o-display mb-1 block text-[44px] leading-[0.6] text-magenta-lift/70"
      >
        &ldquo;
      </span>

      <blockquote className="text-[15px] leading-[1.75] text-white/80">
        {quote}
      </blockquote>

      {/* mt-auto: captions line up along the bottom of the row even though
          the quotes are different lengths. */}
      <figcaption className="mt-7 border-t border-white/8 pt-5 md:mt-auto">
        <p className="text-[14px] font-semibold text-white">{name}</p>
        <p className="mt-1 text-[13px] leading-[1.6] text-white/50">{role}</p>
        {result && (
          <p className="o-eyebrow mt-4 flex items-start gap-2.5 text-white/45">
            <span className="mt-1.5 h-px w-5 shrink-0 bg-magenta-lift/60" />
            {result}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * Deliberately ugly and deliberately visible. If you're looking at this on a
 * live site, the quotes below it are invented — replace them, then set
 * TESTIMONIALS_APPROVED to true.
 */
function PlaceholderRibbon() {
  return (
    <div className="mb-10 rounded-xl border border-dashed border-magenta-lift/50 bg-magenta/12 px-6 py-4">
      <p className="o-eyebrow text-white/80">PLACEHOLDER — NOT REAL QUOTES</p>
      <p className="mt-2 text-[14px] leading-[1.7] text-white/70">
        These three testimonials were written as design placeholders. Replace
        them with real, permissioned client quotes in{" "}
        <code className="font-mono text-[13px] text-white">
          client/src/lib/offer-config.ts
        </code>{" "}
        and set{" "}
        <code className="font-mono text-[13px] text-white">
          TESTIMONIALS_APPROVED = true
        </code>{" "}
        to remove this notice — or delete{" "}
        <code className="font-mono text-[13px] text-white">
          &lt;Testimonials /&gt;
        </code>{" "}
        from the page and ship without the section.
      </p>
    </div>
  );
}
