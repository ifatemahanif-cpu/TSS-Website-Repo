import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { SectionLabel } from "@/components/home/SectionAnimations";
import { apiRequest } from "@/lib/queryClient";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

const PAGE_TITLE = "Five Websites in August | The Story Shapers";
const PAGE_DESCRIPTION =
  "We write every word and build the whole thing. Live in 10 working days, ₹75,000 flat. Five slots in August. A brand site by The Story Shapers collective.";
const PAGE_URL = "https://www.storyshaperscollective.com/websites";

// Slot state is edited by hand and redeployed (second wave ~21 Aug: set to 3;
// after 31 Aug: set to 0, which flips the hero eyebrow into its closed state).
const SLOTS_REMAINING = 5;

const EASE = [0.16, 1, 0.3, 1] as const;

// Hero autocomplete suffixes. First entry doubles as the reduced-motion static line.
// Three of the five point at the words, which is the part nobody else includes.
const HERO_SUFFIXES = [
  "waiting on you for the words.",
  "with a homepage that says nothing.",
  "you're embarrassed to send an investor.",
  "that took six months and still say coming soon.",
  "built by someone who never asked what you do.",
];

const TICKER_BRANDS = [
  "Art Fervour",
  "LBB",
  "Headout",
  "SOCIAL",
  "Singapore Tourism Board",
  "Coca-Cola",
  "Cadbury's",
  "Heinz",
  "Google Pixel",
];

const INCLUDED = [
  { title: "Up to five pages.", body: "We work out what those pages need to be." },
  {
    title: "The words.",
    body: "You don't have to hand us finished copy. Writing and editing is quite literally our job.",
  },
  { title: "The build.", body: "Designed, built, mobile-optimised and ready to go." },
  {
    title: "10 working days.",
    body: "Once we have your assets, the clock starts. No three-month timeline.",
  },
  {
    title: "All for ₹75,000.",
    body: "No mysterious agency maths. No “copywriting billed separately.”",
  },
];

const NOT_INCLUDED = [
  "E-commerce, a cart or a checkout",
  "A blog or CMS you edit yourself",
  "Custom illustration or photography",
  "More than five pages",
  "Logo or identity design",
];

// Testimonials slot: intentionally empty until REAL client quotes land.
// Never populate with invented businesses or quotes.
const TESTIMONIALS: Array<{ quote: string; name: string; business: string }> = [];

const FAQS = [
  {
    q: "I don't know what my brand should say. Is that a problem?",
    a: "That is the job. Most founders can describe what they do in conversation and freeze when it has to go on a page. The call is where we find the words, and then we write them.",
  },
  {
    q: "How much of my time will this take?",
    a: "About four hours in total: a thirty-minute call, one drop of photos and information, and two rounds of feedback. We won't need you in a weekly meeting.",
  },
  {
    q: "What do I need to have ready?",
    a: "Photos, any product or service detail, and whatever brand material exists. If you have nothing written down, that is fine, and it is the usual case.",
  },
  {
    q: "Who actually writes it?",
    a: "The three of us who run the collective. There are no juniors on this and nobody is handed your brand after the call.",
  },
  {
    q: "What if I don't like the first version?",
    a: "Two rounds of revisions per page are included. When something feels off it is usually the positioning rather than the design, and that conversation happens before anything gets built.",
  },
  {
    q: "Can I edit the site myself afterwards?",
    a: "Not without a developer. This build has no CMS, which is what keeps it fast and the price flat. Text changes come back to us, or to any developer you like.",
  },
  {
    q: "What if I need more pages, or a store, later?",
    a: "Both are a separate conversation at a separate price. Say it on the call and we will scope it honestly.",
  },
  {
    q: "Is ₹75,000 the whole number?",
    a: "Yes, for everything in the You get column. Your domain and hosting stay in your name and usually cost nothing on a free tier.",
  },
];

const TERMS = [
  {
    title: "Payment",
    body: "₹75,000 in total. ₹25,000 confirms your slot and is non-refundable. The balance of ₹50,000 is due on the day the site goes live.",
  },
  {
    title: "Scope",
    body: "Up to five pages, written and built by The Story Shapers. A page means a single page of reasonable length, using Tuisa's About page as the reference for scale. Additional pages are quoted separately.",
  },
  {
    title: "Timeline",
    body: "Ten working days from the day all your assets and information reach us, not from the day you pay. If we do not hear from you for five working days, your slot moves behind clients who are ready.",
  },
  {
    title: "Feedback",
    body: "We reply within 24 hours and ask the same of you. Each day a response sits with your side moves the delivery date by a day. Two rounds of revisions per page are included.",
  },
  {
    title: "Decision maker",
    body: "You name one person for feedback and sign-off before work starts.",
  },
  {
    title: "Not included",
    body: "E-commerce, cart or checkout. A blog or CMS you edit yourself. Custom illustration or photography. Logo or identity design.",
  },
  {
    title: "Ownership",
    body: "The site, the copy and the files are yours on final payment. Your domain and hosting stay in your own account throughout.",
  },
  {
    title: "This offer",
    body: "Applications close 31 August 2026. Slots are confirmed by signature and deposit by that date. Delivery may fall after it, on the schedule agreed on your call.",
  },
];

// ---------- shared bits ----------

const inputStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  color: "#FFFFFF",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  padding: "0.85rem 1rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.6rem",
  color: "rgba(255, 255, 255, 0.65)",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: "0.5rem",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
  lineHeight: 1.8,
  color: "rgba(255, 255, 255, 0.85)",
};

const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
};

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ children, style = {} }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        fontWeight: 400,
        color: "#FFFFFF",
        marginBottom: "1.5rem",
        textWrap: "balance" as const,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function scrollToApply(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("apply")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", "#apply");
}

function ApplyCta({ testId }: { testId: string }) {
  return (
    <a
      href="#apply"
      onClick={scrollToApply}
      className="inline-block"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "#FFFFFF",
        backgroundColor: "#7B1E7A",
        padding: "0.9rem 2.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "background-color 0.2s, transform 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9B3E9A")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7B1E7A")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      data-testid={testId}
    >
      Book my slot
    </a>
  );
}

function UrgencyLine({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
        marginTop: "1.25rem",
        ...style,
      }}
      data-testid="text-urgency"
    >
      Offer closes 31 August, or when all five slots are taken.
    </p>
  );
}

// ---------- page ----------

export default function Websites() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      const prev = el?.getAttribute("content") ?? null;
      el?.setAttribute("content", value);
      return () => {
        if (prev !== null) el?.setAttribute("content", prev);
      };
    };

    const restores = [
      setMeta('meta[name="description"]', PAGE_DESCRIPTION),
      setMeta('meta[property="og:title"]', PAGE_TITLE),
      setMeta('meta[property="og:description"]', PAGE_DESCRIPTION),
      setMeta('meta[property="og:url"]', PAGE_URL),
      setMeta('meta[property="og:image"]', "https://www.storyshaperscollective.com/og-websites.jpg"),
      setMeta('meta[name="twitter:title"]', PAGE_TITLE),
      setMeta('meta[name="twitter:description"]', PAGE_DESCRIPTION),
      setMeta('meta[name="twitter:image"]', "https://www.storyshaperscollective.com/og-websites.jpg"),
    ];

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", PAGE_URL);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.setAttribute("data-websites-jsonld", "true");
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Brand website: copy and build",
          serviceType: "Website copywriting and build",
          description: PAGE_DESCRIPTION,
          url: PAGE_URL,
          provider: {
            "@type": "Organization",
            name: "The Story Shapers",
            url: "https://www.storyshaperscollective.com/",
          },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            price: "75000",
            priceCurrency: "INR",
            availability: "https://schema.org/LimitedAvailability",
            validThrough: "2026-08-31",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.title = prevTitle;
      restores.forEach((r) => r());
      if (prevCanonical !== null) canonical?.setAttribute("href", prevCanonical);
      jsonLd.remove();
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#0C0A3E" }} className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhoWeAre />
        <BrandsTicker />
        {TESTIMONIALS.length > 0 && <Testimonials />}
        <Scope />
        <HowItWorks />
        <WhyFive />
        <Apply />
        <Faq />
        <Terms />
        <Footer />
      </main>
    </div>
  );
}

// ---------- sections ----------

function useTypewriter(phrases: string[], active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    let phrase = 0;
    let pos = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const current = phrases[phrase];
      if (!deleting) {
        pos += 1;
        setText(current.slice(0, pos));
        if (pos === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 45);
      } else {
        pos -= 1;
        setText(current.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 22);
      }
    };

    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [phrases, active]);
  return text;
}

function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(HERO_SUFFIXES, !reduce);
  const suffix = reduce ? HERO_SUFFIXES[0] : typed;

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "88dvh", padding: "7rem 2rem 4rem" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(ellipse at center, rgba(123,30,122,0.25) 0%, rgba(42,40,112,0.18) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-[1] w-full mx-auto" style={{ maxWidth: "1100px" }}>
        <motion.p
          {...line(0)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "2rem",
          }}
          data-testid="text-hero-eyebrow"
        >
          {SLOTS_REMAINING > 0
            ? `August · ${SLOTS_REMAINING === 5 ? "five slots" : `${SLOTS_REMAINING} of five slots open`}`
            : "August · slots full"}
        </motion.p>
        <motion.h1
          {...line(0.12)}
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            color: "#FFFFFF",
            marginBottom: "2rem",
          }}
          data-testid="text-hero-headline"
        >
          Freedom from websites
          <span
            aria-live="off"
            className="block min-h-[2.6em] md:min-h-[1.3em]"
            style={{
              fontStyle: "italic",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.2,
              paddingBottom: "0.15em",
            }}
          >
            {suffix}
            {!reduce && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "0.85em",
                  backgroundColor: "rgba(255,255,255,0.55)",
                  marginLeft: "0.12em",
                  transform: "translateY(0.12em)",
                  animation: "ws-caret 1.1s step-end infinite",
                }}
              />
            )}
          </span>
        </motion.h1>
        <style>{`@keyframes ws-caret { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
        <motion.p
          {...line(0.2)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(0.62rem, 0.9vw, 0.72rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c084fc",
            lineHeight: 2,
            marginBottom: "1.5rem",
          }}
          data-testid="text-hero-facts"
        >
          ₹75,000 flat &nbsp;·&nbsp; Up to 5 pages &nbsp;·&nbsp; Copy + build + go-live in 10 working
          days &nbsp;·&nbsp; Five brands only
        </motion.p>
        <motion.p
          {...line(0.28)}
          style={{
            ...bodyStyle,
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            maxWidth: "56ch",
            marginBottom: "2.75rem",
          }}
          data-testid="text-hero-subtext"
        >
          So, your website called. It wants freedom from the generic, slightly-superficial and
          not-so-amazing content you've put on it.
        </motion.p>
        <motion.div {...line(0.36)}>
          <ApplyCta testId="link-hero-apply" />
          <UrgencyLine />
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section style={{ padding: "clamp(3rem, 6vw, 5.5rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "660px" }}>
        <Reveal>
          <p style={{ ...bodyStyle, fontSize: "clamp(1rem, 1.35vw, 1.15rem)", marginBottom: "1.5rem" }}>
            You have a logo. A deck. A snazzy Instagram page. Maybe even some passable images and
            text. But when someone asks, &ldquo;Send me something about what you do,&rdquo; you still
            find yourself typing out a three-paragraph WhatsApp message.
          </p>
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
            data-testid="text-problem-payoff"
          >
            We can fix that.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <Reveal>
          <Heading>The website is the easy part.</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            Figuring out what it should say isn't. Between us, The Story Shapers has 60 years of
            writing, editing and building experience. We have spent those years finding the story,
            cutting the waffle, asking the annoying questions, sharpening the pitch and making
            complicated things easy to understand.
          </p>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>That's what we're bringing to your website.</p>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            Not 14 rounds of &ldquo;Can we make this sound more premium?&rdquo;. Not 800 words of
            fluff on your About page. And definitely not &ldquo;innovative solutions for a rapidly
            evolving world&rdquo;.
          </p>
          <p style={bodyStyle}>
            Just a clear, sharp website that sounds like you and tells people why they should care.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhyFive() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 6rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <Reveal>
          <Heading>Why only five spots?</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            Because we know when to stop. We want to do justice to the brands we take on. No
            nonsense quick fixes just so we can take on more of them. We are serious about getting
            people to notice your brand through this website, and about you making the right first
            impression.
          </p>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            We are opening five slots at ₹75,000 because we want to do these properly, quickly and
            ourselves.
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c084fc",
            }}
            data-testid="text-whyfive-close"
          >
            Offer closes 31 August, or when all five slots are taken.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BrandsTicker() {
  const reduce = useReducedMotion();
  const row = TICKER_BRANDS.map((brand, i) => (
    <span key={`${brand}-${i}`} className="inline-flex items-center">
      <span style={{ whiteSpace: "nowrap" }}>{brand}</span>
      <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.5em", margin: "0 1.75rem" }}>
        &#9830;
      </span>
    </span>
  ));

  return (
    <section style={{ padding: "clamp(2rem, 4vw, 3.5rem) 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <p
        className="text-center"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "1.5rem",
          padding: "0 2rem",
        }}
      >
        Brands we have worked with
      </p>
      {reduce ? (
        <p
          className="text-center"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 2,
            padding: "0 2rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
          data-testid="text-ticker-static"
        >
          {TICKER_BRANDS.join(" · ")}
        </p>
      ) : (
        <div className="overflow-hidden" style={{ whiteSpace: "nowrap" }} data-testid="ticker-marquee">
          <div
            className="inline-flex items-center"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "rgba(255,255,255,0.75)",
              animation: "ws-marquee 36s linear infinite",
            }}
          >
            {row}
            {row}
          </div>
          <style>{`
            @keyframes ws-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            @media (prefers-reduced-motion: reduce) { [data-testid="ticker-marquee"] div { animation: none; } }
          `}</style>
        </div>
      )}
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem" }}>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" style={{ maxWidth: "1100px" }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure>
              <blockquote style={{ ...bodyStyle, fontFamily: "'Libre Baskerville', serif", fontStyle: "italic" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "1rem",
                }}
              >
                {t.name}, {t.business}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TickMark({ delay }: { delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  return (
    <svg
      ref={ref}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "0.45rem" }}
    >
      <motion.path
        d="M2.5 8.5 L6.5 12.5 L13.5 3.5"
        stroke="#c084fc"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

function Scope() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            <Reveal>
              <Heading style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", marginBottom: "1.75rem" }}>
                So, what do you actually get?
              </Heading>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {INCLUDED.map((item, i) => (
                  <li key={item.title} className="flex items-start gap-3" style={{ padding: "0.7rem 0" }}>
                    <TickMark delay={0.15 + i * 0.12} />
                    <span style={bodyStyle}>
                      <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{item.title}</span>{" "}
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div
            style={{
              padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
              backgroundColor: "#0E0C45",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
            className="md:border-t-0 md:border-l md:[border-left-color:rgba(255,255,255,0.12)] flex flex-col justify-center"
          >
            <Reveal delay={0.1}>
              <Heading style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", marginBottom: "1.25rem", color: "rgba(255,255,255,0.8)" }}>
                What we don't do.
              </Heading>
              <p style={{ ...bodyStyle, color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
                This isn't for everyone. This is for brands and businesses that need a smart,
                good-looking, well-written home on the world wide web. And need it now.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3" style={{ ...bodyStyle, color: "rgba(255,255,255,0.6)", padding: "0.55rem 0" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: "16px",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.3)",
                        marginTop: "0.15rem",
                      }}
                    >
                      &ndash;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
              color: "#FFFFFF",
              marginTop: "1.75rem",
            }}
            data-testid="text-price-line"
          >
            ₹75,000 for everything on the left. Nothing else to pay.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "You apply.",
      body: "We ask you a few questions first, because we would rather work out whether we are right for each other before putting another meeting on everyone's calendar.",
    },
    {
      n: "02",
      title: "We talk.",
      body: "If it looks like a fit, we have a 20-minute call.",
    },
    {
      n: "03",
      title: "You hold your slot.",
      body: "₹25,000 books it, and the balance is due when your site goes live.",
    },
    {
      n: "04",
      title: "You send us everything we need.",
      body: "And then, voila, 10 working days later, your website is live.",
    },
  ];

  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem", backgroundColor: "#0E0C45" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <Reveal>
          <Heading style={{ marginBottom: "3rem" }}>Here's how this works.</Heading>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-8 relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute"
            style={{
              top: "1.4rem",
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(123,30,122,0.55) 15%, rgba(123,30,122,0.55) 85%, transparent)",
            }}
          />
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12}>
              <div className="relative">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "2.8rem",
                    height: "2.8rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(123,30,122,0.8)",
                    backgroundColor: "#0E0C45",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem",
                    color: "#c084fc",
                    marginBottom: "1.5rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {step.n}
                </div>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "1.3rem",
                    color: "#FFFFFF",
                    marginBottom: "0.6rem",
                  }}
                >
                  {step.title}
                </p>
                <p style={{ ...bodyStyle, fontSize: "0.92rem", color: "rgba(255,255,255,0.7)" }}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p
            style={{
              ...bodyStyle,
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
            data-testid="text-how-footnote"
          >
            If your assets arrive late, the launch moves with them. We like deadlines. We also like
            realistic ones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsStore, setNeedsStore] = useState("");
  const [priceAccepted, setPriceAccepted] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceAccepted) return;
    setError(null);
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => {
      data[key] = val as string;
    });
    data.termsAccepted = "yes";
    try {
      await apiRequest("POST", "/api/forms/submit", { formType: "websites", data });
      setSubmitted(true);
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none" as const,
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1.5 L6 6.5 L11 1.5' stroke='rgba(255,255,255,0.55)' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    paddingRight: "2.75rem",
  };

  return (
    <section id="apply" style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem", backgroundColor: "#0E0C45", scrollMarginTop: "5rem" }}>
      <style>{`#apply select:invalid { color: rgba(255,255,255,0.5); } #apply select option { color: #0C0A3E; background: #FFFFFF; }`}</style>
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <div ref={headRef}>
          <SectionLabel isInView={isInView} testId="text-apply-eyebrow">
            The application
          </SectionLabel>
          <Heading>Book my slot.</Heading>
          <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>
            Tell us what you are building. Fourteen questions, ten minutes, no deck required.
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c084fc",
              marginBottom: "3rem",
            }}
            data-testid="text-apply-urgency"
          >
            Five slots. Applications close 31 August.
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "2.5rem",
            }}
            data-testid="text-apply-success"
          >
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "1rem" }}>
              Received.
            </p>
            <p style={bodyStyle}>
              A person on our side reads every application, not a filter. We reply within 24 hours
              with next steps, or with a straight no if it's not a fit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle} htmlFor="ws-name">Your name *</label>
                <input id="ws-name" name="name" type="text" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-name" />
              </div>
              <div>
                <label style={labelStyle} htmlFor="ws-brand">Brand name *</label>
                <input id="ws-brand" name="brandName" type="text" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-brand" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle} htmlFor="ws-email">Email *</label>
                <input id="ws-email" name="email" type="email" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-email" />
              </div>
              <div>
                <label style={labelStyle} htmlFor="ws-whatsapp">WhatsApp number *</label>
                <input id="ws-whatsapp" name="whatsapp" type="tel" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-whatsapp" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle} htmlFor="ws-instagram">Instagram handle</label>
                <input id="ws-instagram" name="instagram" type="text" required={false} style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-instagram" />
              </div>
              <div>
                <label style={labelStyle} htmlFor="ws-website">Current website *</label>
                <input
                  id="ws-website"
                  name="currentWebsite"
                  type="text"
                  required
                  placeholder="URL, or: we don't have one yet"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                  data-testid="input-website"
                />
              </div>
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-about">In two or three lines, what does the brand do or sell? *</label>
              <textarea id="ws-about" name="brandDescription" required style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} onFocus={focusIn} onBlur={focusOut} data-testid="input-about" />
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-stage">Where are you in the journey? *</label>
              <select id="ws-stage" name="journeyStage" required defaultValue="" style={selectStyle} onFocus={focusIn} onBlur={focusOut} data-testid="select-stage">
                <option value="" disabled>Choose one</option>
                <option value="Pre-launch">Pre-launch</option>
                <option value="Launched, under 6 months">Launched, under 6 months</option>
                <option value="6 to 18 months">6 to 18 months</option>
                <option value="18 months plus">18 months plus</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-store">Do you need to sell products directly on the site? *</label>
              <select
                id="ws-store"
                name="needsEcommerce"
                required
                defaultValue=""
                style={selectStyle}
                onFocus={focusIn}
                onBlur={focusOut}
                onChange={(e) => setNeedsStore(e.target.value)}
                data-testid="select-store"
              >
                <option value="" disabled>Choose one</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not sure">Not sure</option>
              </select>
              <div aria-live="polite">
                {needsStore === "Yes" && (
                  <p
                    style={{
                      ...bodyStyle,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(123,30,122,0.7)",
                      backgroundColor: "rgba(123,30,122,0.12)",
                      borderRadius: "8px",
                      padding: "1rem 1.25rem",
                      marginTop: "0.75rem",
                    }}
                    data-testid="text-store-notice"
                  >
                    This offer builds a brand site, not a store, so it won't include products, a
                    cart, or checkout. If selling directly on the site matters to you, we're glad
                    to talk through what that separate build looks like. You can still submit this
                    application either way.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-assets">Can you get us photos, product information and brand material within 48 hours of kickoff? *</label>
              <select id="ws-assets" name="assets48h" required defaultValue="" style={selectStyle} onFocus={focusIn} onBlur={focusOut} data-testid="select-assets">
                <option value="" disabled>Choose one</option>
                <option value="Yes">Yes</option>
                <option value="Probably">Probably</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-decider">Who is the single decision-maker on this project? *</label>
              <input id="ws-decider" name="decisionMaker" type="text" required placeholder="Name and role" style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-decider" />
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-when">When do you want to be live? *</label>
              <select id="ws-when" name="liveWhen" required defaultValue="" style={selectStyle} onFocus={focusIn} onBlur={focusOut} data-testid="select-when">
                <option value="" disabled>Choose one</option>
                <option value="As soon as possible">As soon as possible</option>
                <option value="This month">This month</option>
                <option value="Next month">Next month</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="ws-problem">What's not working about your current site, or why don't you have one yet? *</label>
              <textarea id="ws-problem" name="currentSiteProblem" required style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} onFocus={focusIn} onBlur={focusOut} data-testid="input-problem" />
            </div>

            <label
              className="flex items-start gap-3 cursor-pointer"
              style={{ ...bodyStyle, fontSize: "0.9rem", userSelect: "none" }}
              data-testid="label-price-checkbox"
            >
              <input
                type="checkbox"
                checked={priceAccepted}
                onChange={(e) => setPriceAccepted(e.target.checked)}
                style={{ marginTop: "0.35rem", width: "1rem", height: "1rem", accentColor: "#7B1E7A", flexShrink: 0 }}
                data-testid="checkbox-price"
              />
              <span>
                I have read and agree to the{" "}
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    document.getElementById("terms")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                  }}
                  style={{ color: "#c084fc", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  data-testid="link-terms"
                >
                  terms and conditions
                </a>
                .
              </span>
            </label>

            <div>
              <button
                type="submit"
                disabled={!priceAccepted || submitting}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: priceAccepted ? "#7B1E7A" : "rgba(123,30,122,0.35)",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: priceAccepted && !submitting ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (priceAccepted && !submitting) e.currentTarget.style.backgroundColor = "#9B3E9A";
                }}
                onMouseLeave={(e) => {
                  if (priceAccepted && !submitting) e.currentTarget.style.backgroundColor = "#7B1E7A";
                }}
                data-testid="button-apply-submit"
              >
                {submitting ? "Sending..." : "Send the application"}
              </button>
              {!priceAccepted && (
                <p style={{ ...bodyStyle, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "0.75rem" }}>
                  Tick the box to send this. The terms are at the bottom of this page, including the
                  ₹25,000 that holds a slot.
                </p>
              )}
              {error && (
                <p role="alert" style={{ ...bodyStyle, fontSize: "0.85rem", color: "#E8A0E7", marginTop: "0.75rem" }} data-testid="text-apply-error">
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "760px" }}>
        <Reveal>
          <Heading>Questions we get asked.</Heading>
        </Reveal>
        <div style={{ marginTop: "2rem" }}>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <details
                className="group"
                name="faq"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: i === FAQS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  padding: "1.1rem 0",
                }}
                data-testid={`faq-item-${i}`}
              >
                <summary
                  className="cursor-pointer list-none flex items-baseline justify-between gap-6"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-open:rotate-45"
                    style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", flexShrink: 0 }}
                  >
                    +
                  </span>
                </summary>
                <p style={{ ...bodyStyle, color: "rgba(255,255,255,0.7)", marginTop: "0.9rem", maxWidth: "60ch" }}>
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section
      id="terms"
      style={{
        padding: "clamp(2.5rem, 5vw, 4rem) 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        scrollMarginTop: "5rem",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <Reveal>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1rem",
            }}
          >
            Appendix
          </p>
          <Heading style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>Terms and conditions</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5" style={{ marginTop: "1.5rem" }}>
            {TERMS.map((item) => (
              <div key={item.title}>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.title}
                </p>
                <p style={{ ...bodyStyle, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0C0A3E",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "3rem 2rem",
        textAlign: "center",
        color: "#FFFFFF",
      }}
      data-testid="footer"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-[1]">
        <img
          src={logoImg}
          alt="The Story Shapers"
          style={{
            height: "32px",
            width: "auto",
            filter: "invert(1) brightness(2)",
            marginBottom: "1rem",
            display: "inline-block",
          }}
          data-testid="img-footer-logo"
        />
        <a
          href="mailto:hello@storyshaperscollective.com"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            display: "block",
            marginBottom: "1.5rem",
          }}
          data-testid="link-footer-email"
        >
          hello@storyshaperscollective.com
        </a>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            opacity: 0.4,
          }}
        >
          © 2026 The Story Shapers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
