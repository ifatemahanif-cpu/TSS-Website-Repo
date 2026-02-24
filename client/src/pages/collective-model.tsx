import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

const beliefs = [
  {
    title: "Clarity before creativity.",
    body: "The best marketing doesn't start with a campaign. It starts with a question: What are we actually trying to say? Most brands skip this step. We don't.",
  },
  {
    title: "The people you meet should be the people doing the work.",
    body: "No bait-and-switch. No \"let me loop in my team.\" When you hire us, you get us. Senior strategists. In the room. Doing the thinking.",
  },
  {
    title: "Strategy that stays in a deck is decoration.",
    body: "We build systems, not just recommendations. Playbooks your team can run. Calendars they can follow. Structures that outlast us.",
  },
  {
    title: "Less is more — when it's the right less.",
    body: "We don't believe in more content, more channels, more noise. We believe in focus. In doing fewer things, better. In knowing what to stop.",
  },
  {
    title: "We're not here to become permanent.",
    body: "Our job is to make ourselves unnecessary. To leave your team stronger, clearer, more capable than when we arrived.",
  },
];

const models = [
  {
    label: "PROJECTS",
    title: "When you need clarity fast.",
    body: "A 4–6 week engagement to crack positioning, fix your website, build your content system, or audit what's not working. Clear scope. Clear deliverables. Clear end.",
  },
  {
    label: "RETAINERS",
    title: "When you need a steady hand.",
    body: "Ongoing strategic partnership. Monthly planning, campaign oversight, team enablement. Think of it as a fractional marketing leader — without the full-time cost.",
  },
  {
    label: "SPRINTS",
    title: "When you need multiple minds.",
    body: "Short, intense engagements where we bring a team — strategy, content, growth — to solve a specific problem or launch something fast.",
  },
];

function SectionDivider() {
  return (
    <div
      className="my-16 md:my-20"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(123, 30, 122, 0.06)" }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          color: "#0C0A3E",
          letterSpacing: "0.3em",
          opacity: 0.5,
        }}
      >
        &#9830;
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(123, 30, 122, 0.06)" }} />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      className="block mb-5"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        color: "#0C0A3E",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ serif, italic }: { serif: string; italic: string }) {
  return (
    <h2
      className="mb-6"
      style={{
        color: "#7B1E7A",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
      }}
    >
      <span
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          fontWeight: 400,
        }}
      >
        {serif}{" "}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          fontWeight: 300,
          fontStyle: "italic",
          opacity: 0.6,
        }}
      >
        {italic}
      </span>
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-8"
      style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
        color: "rgba(123, 30, 122, 0.65)",
        lineHeight: 2,
      }}
    >
      {children}
    </p>
  );
}

function EmphasisText({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-8"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
        color: "#7B1E7A",
        lineHeight: 1.8,
        fontWeight: 500,
        fontStyle: "italic",
      }}
    >
      {children}
    </p>
  );
}

export default function CollectiveModel() {
  return (
    <div style={{ backgroundColor: "#FDE8E9", minHeight: "100vh" }}>
      <Navbar />

      <div
        className="relative px-2 md:px-4 lg:px-6 pt-24 pb-4"
        style={{ backgroundColor: "#FDE8E9" }}
      >
        <div
          style={{
            backgroundColor: "#FDE8E9",
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
                  color: "rgba(123, 30, 122, 0.4)",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                data-testid="link-back-home"
              >
                <span style={{ transition: "transform 0.2s", display: "inline-block" }} className="group-hover:-translate-x-1">
                  &larr;
                </span>
                BACK TO HOME
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SectionLabel>The Collective Model</SectionLabel>

              <h1
                className="mb-8"
                style={{
                  color: "#7B1E7A",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
                data-testid="text-collective-heading"
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 400,
                  }}
                >
                  What We Are{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.6,
                  }}
                >
                  (and Are Not)
                </span>
              </h1>

              <div
                style={{
                  height: "2px",
                  background: "linear-gradient(to right, #0C0A3E, transparent)",
                  marginBottom: "3rem",
                  borderRadius: "1px",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* What We Are */}
              <div
                className="mb-10"
                style={{
                  backgroundColor: "rgba(12, 10, 62, 0.08)",
                  border: "1px solid rgba(12, 10, 62, 0.25)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                <span
                  className="block mb-3"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    color: "#0C0A3E",
                    letterSpacing: "0.2em",
                  }}
                >
                  WHAT WE ARE
                </span>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                    color: "rgba(123, 30, 122, 0.8)",
                    lineHeight: 2,
                  }}
                >
                  A senior-led collective of experienced brand and content strategists. We pool our complementary skills to deliver thoughtful, custom solutions – the kind big agencies offer, but tailored to each client's unique story. We operate as a flexible network rather than a traditional firm, ensuring the people who pitch the work are the ones who actually deliver it. We champion clarity, creativity, and collective ownership in everything we do.
                </p>
              </div>

              <div
                className="mb-10"
                style={{
                  border: "1px solid rgba(123, 30, 122, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                <span
                  className="block mb-3"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    color: "rgba(123, 30, 122, 0.3)",
                    letterSpacing: "0.2em",
                  }}
                >
                  WHAT WE ARE NOT
                </span>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                    color: "rgba(123, 30, 122, 0.55)",
                    lineHeight: 2,
                  }}
                >
                  We are not a large, bureaucratic agency with layers of hierarchy, nor a "full-service" shop that overpromises and under-delivers. We're also not a loose referral group with no quality control. Unlike agencies that use juniors or account managers as intermediaries, our clients never get a bait-and-switch – they work directly with seasoned strategists at every step. And unlike a generic outsourcing platform or "template factory," we don't do cookie-cutter solutions. Every engagement is bespoke, because every brand's story is different.
                </p>
              </div>

              <SectionDivider />

              {/* Why We Exist */}
              <SectionHeading serif="Why We" italic="Exist" />

              <EmphasisText>
                There's a gap in marketing that nobody talks about.
              </EmphasisText>

              <BodyText>
                On one side: bloated agencies. Layers of account managers. Junior teams learning on your brief. Decks that look impressive but don't survive contact with reality.
              </BodyText>

              <BodyText>
                On the other: solo freelancers. Brilliant, but stretched thin. Hard to scale. Easy to lose.
              </BodyText>

              <EmphasisText>
                We lived on both sides. For years.
              </EmphasisText>

              <BodyText>
                We watched great ideas get killed by hierarchy. We watched founders drown in execution while strategy collected dust. We watched talented people burn out trying to be everything to everyone.
              </BodyText>

              <BodyText>
                And somewhere along the way, we started asking: What if there was a middle ground?
              </BodyText>

              <div
                className="my-10 pl-8"
                style={{ borderLeft: "2px solid rgba(12, 10, 62, 0.4)" }}
              >
                <div className="space-y-5">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    Not an agency. Not a freelancer. Something in between.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    A collective of senior strategists who show up like partners, not vendors. Who do the work themselves — no handoffs, no juniors, no surprises. Who bring the rigor of an agency and the agility of an independent, without the baggage of either.
                  </p>
                </div>
              </div>

              <EmphasisText>
                That's what we built.
              </EmphasisText>

              <SectionDivider />

              {/* What We Believe */}
              <SectionHeading serif="What We" italic="Believe" />

              <div className="space-y-5 mb-8">
                {beliefs.map((belief, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.07, duration: 0.4 }}
                    style={{
                      border: "1px solid rgba(123, 30, 122, 0.08)",
                      borderRadius: "12px",
                      padding: "1.25rem 1.5rem",
                      transition: "border-color 0.3s",
                    }}
                    data-testid={`card-belief-${idx}`}
                  >
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                        color: "#7B1E7A",
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {belief.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "clamp(0.82rem, 1.05vw, 0.9rem)",
                        color: "rgba(123, 30, 122, 0.55)",
                        lineHeight: 1.85,
                      }}
                    >
                      {belief.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <SectionDivider />

              {/* How We Work */}
              <SectionHeading serif="How We" italic="Work" />

              <EmphasisText>
                We're small by design.
              </EmphasisText>

              <BodyText>
                Each of us works with two or three brands at a time. That's it. No client rosters. No account management layer. Just presence.
              </BodyText>

              <BodyText>
                When you work with The Story Shapers, you get a lead strategist as your single point of contact. They own the relationship, the deliverables, the outcomes. Behind them: a collective of specialists they can pull in when needed — content, SEO, campaigns, positioning — all senior, all vetted.
              </BodyText>

              <div
                className="my-10"
                style={{
                  backgroundColor: "rgba(12, 10, 62, 0.08)",
                  border: "1px solid rgba(12, 10, 62, 0.25)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                    color: "#7B1E7A",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  We call it collective intelligence. You're not just hiring one person. You're accessing the thinking of a team that's built to collaborate.
                </p>
              </div>

              <SectionDivider />

              {/* The Model */}
              <SectionHeading serif="The" italic="Model" />

              <div className="grid grid-cols-1 gap-5 mb-10">
                {models.map((model, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    style={{
                      border: "1px solid rgba(12, 10, 62, 0.3)",
                      borderRadius: "14px",
                      padding: "clamp(1.5rem, 3vw, 2rem)",
                      backgroundColor: "rgba(12, 10, 62, 0.06)",
                    }}
                    data-testid={`card-model-${idx}`}
                  >
                    <span
                      className="block mb-2"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.55rem",
                        color: "#0C0A3E",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {model.label}
                    </span>
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                        color: "#7B1E7A",
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {model.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "clamp(0.85rem, 1.1vw, 0.93rem)",
                        color: "rgba(123, 30, 122, 0.6)",
                        lineHeight: 1.9,
                      }}
                    >
                      {model.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <BodyText>
                We shape the engagement to what you need. Not what's easiest to package.
              </BodyText>

              {/* CTA */}
              <div className="mt-14 text-center">
                <Link
                  href="/contact#talk"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#FDE8E9",
                    backgroundColor: "#0C0A3E",
                    border: "none",
                    borderRadius: "8px",
                    padding: "1rem 2.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#2A2870"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#0C0A3E"; }}
                  data-testid="button-lets-talk"
                >
                  LET'S TALK
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
