import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Act, ActLabel, ActWrap } from "./Act";
import { useCmsSettings, useCmsServices } from "@/hooks/use-cms";

const DEEP = "#09072B";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The three stages, as the CMS serves them. Unlike the peak's bios, this is a
 * FALLBACK and not the source of truth — /api/cms/services already returns
 * exactly these three with exactly these six things inside each, so the section
 * stays wired to the CMS and this is what shows when the database is
 * unreachable (which includes `npm run dev:client`).
 *
 * It is worth keeping in step by hand. The old fallback listed five services
 * with subtitles, none of which had been true since the CMS rows were rewritten,
 * so every reader who arrived during a database blip got a different offer from
 * everyone else.
 */
const FALLBACK = [
  {
    id: "shape",
    title: "Shape your story",
    items: [
      "Market & category research",
      "Product-market fit narrative",
      "Go-to-market strategy",
      "Brand voice & messaging document",
      "Content strategy",
      "Social starter kit",
    ],
  },
  {
    id: "scale",
    title: "Scale your story",
    items: [
      "Multi-channel content",
      "SEO/AEO content & strategy",
      "Performance marketing",
      "Social media marketing",
      "Customer retention marketing",
      "Content operations",
    ],
  },
  {
    id: "sharpen",
    title: "Sharpen your story",
    items: [
      "Brand strategy audit",
      "Content strategy audit",
      "Repositioning strategy",
      "Digital PR",
      "Brand partnerships",
      "Brand retrospective",
    ],
  },
];

/**
 * WHAT WE DO — three stages, eighteen things, no sentence in front of them.
 *
 * The study had invented a four-way "a symptom you'd recognise" framing that
 * exists nowhere else in the business. This is the live site's offer verbatim,
 * because the three named stages ARE the answer to "how we work with you" and a
 * standfirst in front of them only delayed it. Fatema cut that standfirst on
 * 25 Aug along with the work rail's, which is why the heading carries the gap
 * down to the list itself.
 *
 * The eighteen things used to be a faint list at 0.74 white and 15px, which is
 * how a full service offer ends up looking like small print. Each one now gets
 * an accent rule of its own and enough weight to be read as a line item —
 * eighteen ruled entries is what "full-stack" looks like without anyone having
 * to claim it.
 */
export function Services() {
  return (
    <Act id="services" kind="flow" ground="dark" bg={DEEP}>
      {(progress) => <Do progress={progress} />}
    </Act>
  );
}

function Do({ progress }: { progress: MotionValue<number> }) {
  const headRef = useRef<HTMLDivElement>(null);
  const headIn = useInView(headRef, { once: true, margin: "-80px" });

  const { data: settings } = useCmsSettings();
  const { data: cmsServices } = useCmsServices();

  const serviceSettings = settings?.services;
  const rows =
    cmsServices && cmsServices.length
      ? cmsServices.map((s: any, i: number) => ({
          id: s.id?.toString() ?? `service-${i}`,
          title: (s.title ?? "").trim(),
          /* the CMS rows carry trailing spaces from whoever typed them, and a
             trailing space inside a grid cell is a wider cell */
          items: (s.items ?? []).map((t: string) => t.trim()).filter(Boolean),
        }))
      : FALLBACK;

  return (
    <ActWrap>
      <div ref={headRef}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ActLabel className="mb-[1.1rem]" data-testid="text-services-label">
            {serviceSettings?.label ?? "Services"}
          </ActLabel>

          {/* the standfirst below this used to carry the gap down to the list;
              with it gone the heading owns that space itself */}
          <h2
            className="mb-[clamp(2.2rem,4.5vh,3.4rem)]"
            style={{
              fontFamily: "'Zodiak', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              textWrap: "balance",
              color: "#FFFFFF",
              margin: 0,
            }}
            data-testid="text-services-heading"
          >
            {serviceSettings?.heading ?? "How we work with you."}
          </h2>
        </motion.div>
      </div>

      <div className="grid">
        {rows.map((row, i) => (
          <Row key={row.id} row={row} index={i} progress={progress} />
        ))}
      </div>
    </ActWrap>
  );
}

function Row({
  row,
  index,
  progress,
}: {
  row: { id: string; title: string; items: string[] };
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();

  /* windows sit around p 0.26-0.62: this is a FLOW act, so progress runs across
     the section's whole visible life and 0.5 is the moment it is centred */
  const q = useTransform(progress, [0.26 + 0.085 * index, 0.37 + 0.085 * index], [0, 1], {
    clamp: true,
  });
  const y = useTransform(q, (v) => (1 - v) * 16);

  return (
    <motion.div
      className="group grid grid-cols-[2.2rem_1fr] items-start gap-x-[clamp(1rem,3vw,3rem)] gap-y-[0.9rem] border-t border-white/[0.13] py-[clamp(1.6rem,3vh,2.4rem)] last:border-b md:grid-cols-[3rem_1fr_1.5fr]"
      style={reduced ? undefined : { opacity: q, y }}
      data-testid={`services-row-${index + 1}`}
    >
      <div
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          /* 0.34 measured 2.99:1 at 11.5px against 4.5:1 required — the numbers
             read as accidental marks in a gutter rather than as a ranking */
          color: "rgba(255,255,255,0.54)",
          paddingTop: "0.45rem",
        }}
      >
        {`0${index + 1}`}
      </div>

      <h3
        style={{
          fontFamily: "'Zodiak', Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          margin: 0,
        }}
        data-testid={`text-services-title-${index + 1}`}
      >
        {row.title}
      </h3>

      {/* two columns per stage above 46rem, so a service reads as a short menu
          rather than as a scroll of its own. Starts in the second column on a
          phone, under the title rather than under the number. */}
      <ul className="col-start-2 m-0 grid list-none grid-cols-1 gap-x-[1.8rem] gap-y-[0.7rem] p-0 sm:grid-cols-2 md:col-start-3">
        {row.items.map((item, j) => (
          <Item
            key={item}
            label={item}
            progress={progress}
            at={0.29 + 0.085 * index + 0.016 * j}
          />
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * A rule, not a bullet. It sits on the item's own baseline grid and reads as an
 * index entry rather than as a list of features.
 *
 * The six inside a stage come up one after another, the same way the pillars do
 * under the hero — a service is a list, and a list that arrives as one block is
 * a paragraph pretending to be one.
 */
function Item({
  label,
  progress,
  at,
}: {
  label: string;
  progress: MotionValue<number>;
  at: number;
}) {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, [at, at + 0.05], [0, 1], { clamp: true });

  return (
    <motion.li
      className="grid grid-cols-[1.1rem_minmax(0,1fr)] items-baseline gap-[0.75rem] transition-colors duration-200 text-white/90 group-hover:text-white"
      style={{
        fontSize: "clamp(0.96rem, 1.14vw, 1.08rem)",
        lineHeight: 1.45,
        ...(reduced ? null : { opacity }),
      }}
    >
      <span
        aria-hidden="true"
        className="block h-px w-full -translate-y-[0.34em] bg-[#cf81cd] opacity-70 transition-opacity duration-200 group-hover:opacity-100"
      />
      {label}
    </motion.li>
  );
}
