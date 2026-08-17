import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { SectionLabel } from "@/components/home/SectionAnimations";
import { apiRequest } from "@/lib/queryClient";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

const PAGE_TITLE = "Independence Day Website Offer | The Story Shapers";
const PAGE_DESCRIPTION =
  "We write every word and build the whole thing. Live in 10 working days, ₹79,000 all in. Five brands this August. A brand site by The Story Shapers collective.";
const PAGE_URL = "https://www.storyshaperscollective.com/websites";
const TERMS_URL = "/websites/terms";

// PLACEHOLDER — replace with the real booking link before launch.
const CALENDLY_URL = "https://calendly.com/REPLACE-WITH-REAL-LINK";

// Slot state is edited by hand and redeployed (second wave ~21 Aug: set to 3;
// after 31 Aug: set to 0, which flips the hero eyebrow into its closed state).
const SLOTS_REMAINING: number = 5;

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
    body: "You don't have to hand us a finished copy. Writing and editing is quite literally our job.",
  },
  { title: "The build.", body: "Designed, built, mobile-optimised and ready to go." },
  {
    title: "10 working days.",
    body: "Once we have your assets, the clock starts. No three-month timeline.",
  },
  {
    title: "All for ₹79,000.",
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

// Scroll recordings of live sites we built, captured from production.
const SHOWCASE_SITES = [
  { name: "tuisajewels.com", video: "/videos/site-tuisa.webm", poster: "/videos/site-tuisa.jpg" },
  { name: "schmancy.in", video: "/videos/site-schmancy.webm", poster: "/videos/site-schmancy.jpg" },
  { name: "humanintheloop.co.in", video: "/videos/site-hitl.webm", poster: "/videos/site-hitl.jpg" },
];

// Testimonials slot: intentionally empty until REAL client quotes land.
// Never populate with invented businesses or quotes.
const TESTIMONIALS: Array<{ quote: string; name: string; business: string }> = [];

const FAQS = [
  {
    q: "I don't know what my brand should say. Is that a problem?",
    a: "That is the job. We define your brand story and write it; that is what this offer exists to do. If you find you want to go deeper than the website, further brand work is something we can discuss on the call.",
  },
  {
    q: "How long will this take?",
    a: "About 10 working days, if you have your brand assets and everything else ready to go. The clock starts the day everything reaches us, not the day you pay.",
  },
  {
    q: "What do I need to have ready?",
    a: "Photos, product or service information, brand guidelines if they exist, a tone of voice document if one exists, and anything already written about the brand. If some of this doesn't exist, say so on the call and we will work around it.",
  },
  {
    q: "Who actually writes it?",
    a: "A senior writer. A senior marketing strategist is directly involved in talking to you about your brand story, writing it, and getting the website done. Nobody junior inherits your brand after the call.",
  },
  {
    q: "What if I don't like the first version?",
    a: "Two rounds of revisions are included. When something feels off it is usually the positioning rather than the design, and that conversation happens before anything gets built.",
  },
  {
    q: "Can I edit the site myself afterwards?",
    a: "This build ships without a CMS, which is what keeps it fast and the price flat. If a site you edit yourself is what you need, that sits outside this offer, but we are happy to scope it for you. Otherwise, text changes come back to us.",
  },
  {
    q: "What if I need more pages, a blog, or a store later?",
    a: "All of it can be discussed. Say it on the call and we will scope it honestly, at its own price.",
  },
  {
    q: "What is the ₹25,000 deposit? Do I get it back?",
    a: "It holds your slot and comes off the ₹79,000, so ₹54,000 is what remains on the day your site goes live. The deposit isn't refundable if you change your mind, because once you're in, we've turned someone else away. If we're the ones who decline or can't deliver, it comes back in full.",
  },
  {
    q: "Why only five brands?",
    a: "Because we know when to stop. We want to do justice to the brands we take on, not stack up quick fixes so we can take on more of them. Five is what we can do properly, quickly and ourselves.",
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

// Full-sentence questions stay readable in sentence case; mono micro-caps are
// kept for the short identity fields only.
const questionLabelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 500,
  lineHeight: 1.5,
  color: "rgba(255, 255, 255, 0.8)",
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
  e.currentTarget.style.borderColor = "rgba(192, 132, 252, 0.75)";
  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192, 132, 252, 0.25)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
  e.currentTarget.style.boxShadow = "none";
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

// Headings reveal through a mask: the text slides up into view, which reads as
// hierarchy without adding a second fade on top of Reveal's.
function Heading({ children, style = {} }: { children: ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  return (
    <h2
      ref={ref}
      style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        fontWeight: 400,
        color: "#FFFFFF",
        marginBottom: "1.5rem",
        textWrap: "balance" as const,
        overflow: "hidden",
        ...style,
      }}
    >
      <motion.span
        style={{ display: "block", paddingBottom: "0.15em" }}
        initial={reduce ? { y: 0 } : { y: "110%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {children}
      </motion.span>
    </h2>
  );
}

// Parallax drift only earns its place where the scatter offsets exist (md+);
// on the mobile stack it just makes the gaps uneven.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function scrollToApply(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("apply")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", "#apply");
}

// Magnetic CTA: the button leans a few pixels toward the cursor and springs
// back on leave. Driven by motion values so it never re-renders React.
function ApplyCta({ testId }: { testId: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });
  return (
    <motion.a
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
        transition: "background-color 0.2s",
        x,
        y,
      }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.22);
        my.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9B3E9A")}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#7B1E7A";
        mx.set(0);
        my.set(0);
      }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      data-testid={testId}
    >
      I need a website NOW
    </motion.a>
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
      {SLOTS_REMAINING > 0
        ? "Offer valid till 31st August 2026, limited slots only"
        : "All five slots are taken."}
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
            price: "79000",
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
        <WhoWeAre />
        <BrandsTicker />
        {TESTIMONIALS.length > 0 && <Testimonials />}
        <Scope />
        <HowItWorks />
        <Apply />
        <Faq />
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
      style={{ minHeight: "82dvh", padding: "7rem 2rem 3rem" }}
    >
      <motion.div
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
        animate={reduce ? undefined : { x: [0, -28, 0], y: [0, 34, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
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
            ? `Independence Day Offer. ${
                SLOTS_REMAINING === 5 ? "Selected 5 brands only." : `${SLOTS_REMAINING} of 5 slots open.`
              } Closes 31 August.`
            : "Independence Day Offer. Slots full."}
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
            marginBottom: "1.25rem",
          }}
          data-testid="text-hero-headline"
        >
          Freedom from websites
          <span className="sr-only">{HERO_SUFFIXES[0]}</span>
          <span
            aria-hidden="true"
            className="block min-h-[3.9em] md:min-h-[2.6em]"
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
            ...bodyStyle,
            fontSize: "clamp(1rem, 1.35vw, 1.15rem)",
            maxWidth: "56ch",
            marginBottom: "2.5rem",
          }}
          data-testid="text-hero-offer"
        >
          This August we are handpicking five brands to shape their story and build them a
          high-functioning website at{" "}
          <span style={{ color: "#FFFFFF", fontWeight: 600, whiteSpace: "nowrap" }}>
            ₹79,000
            <a
              href={TERMS_URL}
              aria-label="Terms and conditions apply"
              style={{
                color: "#c084fc",
                textDecoration: "none",
                padding: "0.3em 0.25em",
                margin: "0 -0.12em 0 -0.22em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              onFocus={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onBlur={(e) => (e.currentTarget.style.textDecoration = "none")}
              data-testid="link-hero-terms"
            >
              *
            </a>
          </span>
          all in!
        </motion.p>
        <motion.div {...line(0.3)}>
          <ApplyCta testId="link-hero-apply" />
          <UrgencyLine />
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)",
              marginTop: "0.6rem",
            }}
            data-testid="text-hero-footnote"
          >
            <a
              href={TERMS_URL}
              style={{ color: "#c084fc", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              *T&amp;C apply
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Each showcase card drifts at its own rate as the page scrolls and holds a
// slight rotation, so the group reads as a scattered desk of real work rather
// than a grid. Transforms only; collapses to static under reduced motion.
function SiteCard({
  site,
  delay,
  className = "",
  rotate = 0,
  drift = 0,
}: {
  site: (typeof SHOWCASE_SITES)[number];
  delay: number;
  className?: string;
  rotate?: number;
  drift?: number;
}) {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  return (
    <motion.div
      ref={wrapRef}
      className={className}
      style={reduce || !isDesktop ? { rotate } : { y: parallaxY, rotate }}
    >
      <Reveal delay={delay}>
      <figure
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#0C0A3E",
          boxShadow: "0 24px 60px rgba(5, 4, 30, 0.55)",
        }}
      >
        <figcaption
          className="flex items-center"
          style={{
            padding: "0.6rem 0.9rem",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <span aria-hidden="true" className="flex gap-[5px]">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.22)",
                  display: "inline-block",
                }}
              />
            ))}
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {site.name}
          </span>
        </figcaption>
        {reduce ? (
          <img
            src={site.poster}
            alt={`The ${site.name} website`}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        ) : (
          <video
            src={site.video}
            poster={site.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`Scrolling through the ${site.name} website. Click to pause.`}
            style={{ display: "block", width: "100%", height: "auto", cursor: "pointer" }}
            onClick={(e) => {
              const v = e.currentTarget;
              if (v.paused) v.play();
              else v.pause();
            }}
          />
        )}
      </figure>
      </Reveal>
    </motion.div>
  );
}

function WhoWeAre() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem clamp(2rem, 4vw, 3rem)" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <Reveal>
          <Heading>The website is the easy part.</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ ...bodyStyle, maxWidth: "68ch" }}>
            Figuring out what it should say isn't. Between us, The Story Shapers has 45+ years of
            writing, editing and building experience. We've spent those years finding the story,
            cutting the waffle, asking the annoying questions, sharpening the pitch and making
            complicated things easy to understand.
          </p>
        </Reveal>
      </div>
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        style={{ maxWidth: "1100px", marginTop: "clamp(2.5rem, 5vw, 4.5rem)" }}
        data-testid="showcase-strip"
      >
        <SiteCard
          site={SHOWCASE_SITES[0]}
          delay={0}
          rotate={-1.4}
          drift={26}
          className="md:col-span-7 md:col-start-1"
        />
        <SiteCard
          site={SHOWCASE_SITES[1]}
          delay={0.12}
          rotate={1.8}
          drift={58}
          className="md:col-span-5 md:col-start-8 md:mt-16"
        />
        <SiteCard
          site={SHOWCASE_SITES[2]}
          delay={0.24}
          rotate={-0.8}
          drift={40}
          className="md:col-span-6 md:col-start-4 md:-mt-24 relative z-[1]"
        />
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
    <section style={{ padding: "0 0 clamp(2.5rem, 5vw, 4rem)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <p
        className="text-center"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
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
          {TICKER_BRANDS.map((brand, i) => (
            <span key={brand}>
              <span style={{ whiteSpace: "nowrap" }}>
                {brand}
                {i < TICKER_BRANDS.length - 1 && <span aria-hidden="true"> ·</span>}
              </span>{" "}
            </span>
          ))}
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
            <span aria-hidden="true" className="inline-flex items-center">
              {row}
            </span>
          </div>
          <style>{`
            @keyframes ws-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            [data-testid="ticker-marquee"]:hover div, [data-testid="ticker-marquee"]:focus-within div { animation-play-state: paused; }
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

function CrossMark({ delay }: { delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const stroke = { duration: 0.35, ease: "easeOut" as const };
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
        d="M3.5 3.5 L12.5 12.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ ...stroke, delay }}
      />
      <motion.path
        d="M12.5 3.5 L3.5 12.5"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ ...stroke, delay: delay + 0.2 }}
      />
    </svg>
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
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
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
                What you get
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
            }}
            className="border-t [border-top-color:rgba(255,255,255,0.12)] md:border-t-0 md:border-l md:[border-left-color:rgba(255,255,255,0.12)]"
          >
            <Reveal delay={0.1} className="h-full flex flex-col">
              <Heading style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", marginBottom: "1.75rem", color: "rgba(255,255,255,0.8)" }}>
                What you don't get
              </Heading>
              <ul className="md:flex-1 md:flex md:flex-col md:justify-between" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {NOT_INCLUDED.map((item, i) => (
                  <li key={item} className="flex items-start gap-3" style={{ padding: "0.7rem 0" }}>
                    <CrossMark delay={0.15 + i * 0.12} />
                    <span style={{ ...bodyStyle, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// The steps rail draws itself left-to-right as the section enters, so the eye
// travels the sequence in order before reading the steps.
function RailDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="hidden md:block absolute"
      style={{
        top: "1.75rem",
        left: "0.6rem",
        right: "29.5%",
        height: "1px",
        transformOrigin: "left center",
        background:
          "linear-gradient(to right, transparent, rgba(123,30,122,0.55) 4%, rgba(123,30,122,0.55) 96%, transparent)",
      }}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
    />
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Apply using the form below." },
    {
      n: "02",
      title: "If we are a mutual fit, we get on a 30-minute alignment call to discuss further.",
    },
    {
      n: "03",
      title: "We book your slot and you send us everything we need to get started.",
    },
  ];

  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem", backgroundColor: "#0E0C45" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <Reveal>
          <Heading style={{ marginBottom: "3.5rem" }}>Here's how this works.</Heading>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-10 relative">
          <RailDraw />
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12}>
              <div className="relative">
                {/* The chip hangs slightly into the margin so its digits sit
                    flush with the title's left edge below it. */}
                <div
                  className="flex items-center justify-center md:ml-[-1.15rem]"
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(123,30,122,0.8)",
                    backgroundColor: "#0E0C45",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1rem",
                    color: "#c084fc",
                    marginBottom: "1.25rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {step.n}
                </div>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1.15rem, 1.7vw, 1.4rem)",
                    lineHeight: 1.5,
                    color: "#FFFFFF",
                    maxWidth: "28ch",
                  }}
                >
                  {step.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
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
    if (!priceAccepted) {
      setError("Tick the terms box first.");
      return;
    }
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
      <style>{`#apply select:invalid { color: rgba(255,255,255,0.5); } #apply select option { color: #0C0A3E; background: #FFFFFF; } #apply input::placeholder, #apply textarea::placeholder { color: rgba(255,255,255,0.45); }`}</style>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div style={{ maxWidth: "640px" }}>
        <div ref={headRef}>
          <SectionLabel isInView={isInView} testId="text-apply-eyebrow">
            The application
          </SectionLabel>
          <Heading>Book my slot.</Heading>
          <p style={{ ...bodyStyle, marginBottom: "0.75rem" }}>
            Tell us what you are building. Twelve questions, ten minutes, no deck required.
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
            {SLOTS_REMAINING === 0
              ? "All five slots are taken."
              : SLOTS_REMAINING === 5
                ? "Five slots. Applications close 31 August."
                : `${SLOTS_REMAINING} of five slots open. Applications close 31 August.`}
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
              You're in.
            </p>
            <p style={{ ...bodyStyle, marginBottom: "1.75rem" }}>
              Application received. Now pick a slot for your call; it takes a minute.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
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
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9B3E9A")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7B1E7A")}
              data-testid="link-book-call"
            >
              Book your call
            </a>
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
                <label style={labelStyle} htmlFor="ws-instagram">Instagram handle (optional)</label>
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
              <label style={questionLabelStyle} htmlFor="ws-about">In two or three lines, what does the brand do or sell? *</label>
              <textarea id="ws-about" name="brandDescription" required style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} onFocus={focusIn} onBlur={focusOut} data-testid="input-about" />
            </div>
            <div>
              <label style={questionLabelStyle} htmlFor="ws-stage">Where are you in the journey? *</label>
              <select id="ws-stage" name="journeyStage" required defaultValue="" style={selectStyle} onFocus={focusIn} onBlur={focusOut} data-testid="select-stage">
                <option value="" disabled>Choose one</option>
                <option value="Pre-launch">Pre-launch</option>
                <option value="Launched, under 6 months">Launched, under 6 months</option>
                <option value="6 to 18 months">6 to 18 months</option>
                <option value="18 months plus">18 months plus</option>
              </select>
            </div>
            <div>
              <label style={questionLabelStyle} htmlFor="ws-store">Do you need to sell products directly on the site? *</label>
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
              <label style={questionLabelStyle} htmlFor="ws-assets">Can you get us photos, product information and brand material within 48 hours of kickoff? *</label>
              <select id="ws-assets" name="assets48h" required defaultValue="" style={selectStyle} onFocus={focusIn} onBlur={focusOut} data-testid="select-assets">
                <option value="" disabled>Choose one</option>
                <option value="Yes">Yes</option>
                <option value="Probably">Probably</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label style={questionLabelStyle} htmlFor="ws-decider">Who is the single decision-maker on this project? *</label>
              <input id="ws-decider" name="decisionMaker" type="text" required placeholder="Name and role" style={inputStyle} onFocus={focusIn} onBlur={focusOut} data-testid="input-decider" />
            </div>
            <div>
              <label style={questionLabelStyle} htmlFor="ws-problem">What's not working about your current site, or why don't you have one yet? *</label>
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
                onChange={(e) => {
                  setPriceAccepted(e.target.checked);
                  if (e.target.checked) setError(null);
                }}
                style={{ marginTop: "0.35rem", width: "1rem", height: "1rem", accentColor: "#7B1E7A", flexShrink: 0 }}
                data-testid="checkbox-price"
              />
              <span>
                I have read and agree to the{" "}
                <a
                  href={TERMS_URL}
                  target="_blank"
                  rel="noopener"
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
                disabled={submitting}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: "#7B1E7A",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  transition: "background-color 0.2s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = "#9B3E9A";
                }}
                onMouseLeave={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = "#7B1E7A";
                }}
                data-testid="button-apply-submit"
              >
                {submitting ? "Sending..." : "Apply and book my call"}
              </button>
              {error && (
                <p role="alert" style={{ ...bodyStyle, fontSize: "0.85rem", color: "#E8A0E7", marginTop: "0.75rem" }} data-testid="text-apply-error">
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section style={{ padding: "clamp(3.5rem, 7vw, 7rem) 2rem" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div style={{ maxWidth: "760px" }}>
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
            marginBottom: "1.25rem",
          }}
          data-testid="link-footer-email"
        >
          hello@storyshaperscollective.com
        </a>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", marginBottom: "1.5rem" }}
        >
          {[
            { label: "Home", href: "/", testId: "link-footer-home", external: false },
            {
              label: "Instagram",
              href: "https://www.instagram.com/storyshapers_/",
              testId: "link-footer-instagram",
              external: true,
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/story-shapers",
              testId: "link-footer-linkedin",
              external: true,
            },
            { label: "Terms and conditions", href: TERMS_URL, testId: "link-footer-terms", external: false },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              data-testid={link.testId}
            >
              {link.label}
            </a>
          ))}
        </nav>
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
