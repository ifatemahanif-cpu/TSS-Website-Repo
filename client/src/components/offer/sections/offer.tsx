import { Check, X } from "lucide-react";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

const IN = [
  ["Up to five pages.", "We work out what those pages need to be."],
  [
    "The words.",
    "You don’t have to hand us finished copy. Writing and editing is quite literally our job.",
  ],
  ["The build.", "Designed, built, mobile-optimised and ready to go."],
  [
    "10 working days.",
    "Once we have your assets, the clock starts. No three-month timeline.",
  ],
  [
    "The technical bits.",
    "Meta tags, OG tags, analytics, compressed images, working forms.",
  ],
  [
    "All for ₹79,000.",
    "No mysterious agency maths. No “copywriting billed separately.”",
  ],
];

const OUT = [
  ["A store.", "No Shopify, no cart, no payments on the site."],
  ["A blog or CMS you edit yourself.", "Different build, different price."],
  ["A large catalogue.", "Five pages doesn’t hold 40 products."],
  [
    "Custom illustration or photography.",
    "We’ll work with what you have, and tell you honestly if it isn’t enough.",
  ],
  [
    "A new brand identity.",
    "If you don’t have a logo or a palette yet, say so on the call — that’s a separate conversation.",
  ],
];

function List({
  items,
  variant,
}: {
  items: string[][];
  variant: "in" | "out";
}) {
  const isIn = variant === "in";
  const Icon = isIn ? Check : X;

  return (
    <div className="h-full rounded-2xl border border-white/8 bg-white/3 p-7 sm:p-9">
      <p className="o-eyebrow mb-7 text-white/45">
        {isIn ? "WHAT’S IN" : "WHAT’S NOT"}
      </p>
      <ul className="space-y-6">
        {items.map(([title, body]) => (
          <li key={title} className="flex gap-4">
            <Icon
              aria-hidden
              className={
                isIn
                  ? "mt-1 size-[15px] shrink-0 text-magenta-lift"
                  : "mt-1 size-[15px] shrink-0 text-white/30"
              }
            />
            <p className="text-[15px] leading-[1.7] text-white/65">
              <span className="font-semibold text-white">{title}</span> {body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Offer() {
  return (
    <Section eyebrow="THE OFFER" className="bg-navy-lift">
      <Reveal>
        <MixedHeading display="So, what" light="do you actually get?" />
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal delay={1} className="h-full">
          <List items={IN} variant="in" />
        </Reveal>
        <Reveal delay={2} className="h-full">
          <List items={OUT} variant="out" />
        </Reveal>
      </div>

    </Section>
  );
}
