import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { useCmsFaqs } from "@/hooks/use-cms";

const PAGE_TITLE = "FAQ | The Story Shapers";
const PAGE_DESCRIPTION =
  "How The Story Shapers works: who we work with, what engagements look like, services, pricing and how to start. Straight answers from a senior marketing collective.";

// Fallback content, shown until the CMS FAQ entries load (and used as the
// page copy if the CMS has none). Editable under Admin → FAQ.
const fallbackFaqs = [
  {
    question: "What is The Story Shapers?",
    answer:
      "The Story Shapers is a senior marketing collective founded by three strategists: Fatema Hanif, Shaili Contractor and Aakanksha Singh Devi. We help growing brands with brand strategy, content strategy, positioning and growth marketing. We're based in India and work with clients around the world.",
  },
  {
    question: "How are you different from a marketing agency?",
    answer:
      "You work with the people doing the work. There are no account managers, no handoffs and no junior team behind the curtain. Each of us has 15 to 20 years of experience inside agencies, newsrooms and fast-scaling companies, and we stay deliberately small so that experience is what you're actually buying.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Brands that have real traction and need their story, positioning and content to catch up. We've done this for a hospitality group with 55+ outlets (SOCIAL), a global experiences platform (Headout), an art discovery platform (Art Fervour), a city discovery brand (LBB) and founder-led businesses like Kelly & Crew. If the product is working but the marketing doesn't sound like you, that's usually our cue.",
  },
  {
    question: "What does an engagement look like?",
    answer:
      "Three shapes, depending on the problem. A focused project, like a positioning or messaging system. An embedded sprint, where we work inside your team for a set period (at Art Fervour, 90 days). Or ongoing strategy and content leadership. Every engagement starts the same way: you tell us what feels off, we tell you what we see.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Brand strategy and positioning. Messaging and brand voice. Go-to-market strategy. Content strategy and content operations. SEO and AEO. Social media, performance and retention marketing. Brand audits and repositioning. Most engagements combine a few of these, because the problems usually arrive tangled together.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the shape of the engagement, and we scope it with you after the first conversation. What we can promise: you'll know exactly what you're paying for before you commit, and we'll tell you honestly if a smaller engagement solves your problem.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes. We're based in India and work remotely with clients worldwide. Between us we've worked with brands across India, Southeast Asia and the US, including Singapore Tourism Board, Coca-Cola and Google Pixel.",
  },
  {
    question: "How do we start?",
    answer:
      "Use the form on our contact page to tell us what you're working on and where things feel stuck. We'll reply with what we see and where we'd begin. If it's a fit, we take it from there.",
  },
];

export default function Faq() {
  const { data: cmsFaqs } = useCmsFaqs();
  const faqs = cmsFaqs && cmsFaqs.length > 0 ? cmsFaqs : fallbackFaqs;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", PAGE_DESCRIPTION);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.setAttribute("data-faq-jsonld", "true");
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f: any) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.title = prevTitle;
      if (prevDescription !== null) meta?.setAttribute("content", prevDescription);
      jsonLd.remove();
    };
  }, [faqs]);

  return (
    <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
      <Navbar />

      <div
        className="relative px-2 md:px-4 lg:px-6 pt-24 pb-4"
        style={{ backgroundColor: "#0C0A3E" }}
      >
        <div
          style={{
            backgroundColor: "#0C0A3E",
            borderRadius: "20px",
            padding: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <div className="max-w-[800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-12 group"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255, 255, 255, 0.5)",
                  textDecoration: "none",
                }}
                data-testid="link-back-home"
              >
                ← BACK TO HOME
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                className="block mb-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
                data-testid="text-faq-label"
              >
                FAQ
              </span>

              <h1
                className="mb-8"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
                data-testid="text-faq-heading"
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 400,
                  }}
                >
                  Questions,{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  answered.
                </span>
              </h1>

              <div
                style={{
                  height: "2px",
                  background: "linear-gradient(to right, #2A2870, transparent)",
                  marginBottom: "3rem",
                  borderRadius: "1px",
                }}
              />
            </motion.div>

            <div>
              {faqs.map((f: any, i: number) => (
                <motion.div
                  key={f.id ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                  style={{ marginBottom: "3rem" }}
                  data-testid={`faq-item-${i}`}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      color: "rgba(255, 255, 255, 0.35)",
                      letterSpacing: "0.1em",
                      marginBottom: "0.75rem",
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#FFFFFF",
                      lineHeight: 1.35,
                      marginBottom: "1rem",
                    }}
                    data-testid={`faq-question-${i}`}
                  >
                    {f.question}
                  </h2>
                  {String(f.answer)
                    .split(/\n\s*\n/)
                    .map((para: string, j: number) => (
                      <p
                        key={j}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "1rem",
                          lineHeight: 1.8,
                          color: "rgba(255, 255, 255, 0.8)",
                          marginBottom: "1rem",
                        }}
                        data-testid={j === 0 ? `faq-answer-${i}` : undefined}
                      >
                        {para.trim()}
                      </p>
                    ))}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: "3rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.85)",
                  marginBottom: "1.5rem",
                }}
              >
                Still have a question we haven't answered?
              </p>
              <Link
                href="/contact#talk"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                  paddingBottom: "0.2rem",
                }}
                data-testid="link-faq-contact"
              >
                ASK US DIRECTLY →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
