import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

const collectiveAdvantages = [
  {
    title: "Combined Expertise",
    body: "Together we offer a wider range of skills and experiences than any one person alone. This means we can tackle larger, more complex projects as a team, without giving up the agility of independent work.",
  },
  {
    title: "Agility and Flexibility",
    body: "We aren't bound by rigid agency structures or long chain-of-command approvals. The collective stays nimble and can adapt to project needs quickly – adjusting team size, skills, and approach as needed without the bureaucracy.",
  },
  {
    title: "Quality & Consistency",
    body: "Clients get senior-level thinking with personal ownership. By working as a close-knit team of veterans, we maintain consistency and depth in our work that lone freelancers might struggle with. Each project benefits from peer review and shared standards, so quality never falls through the cracks.",
  },
  {
    title: "Support & Community",
    body: "Going solo can be isolating. In our model, members have a support network of peers to bounce ideas off, get feedback, or share resources. We celebrate each other's wins and learn from each other's expertise, which makes us all better.",
  },
  {
    title: "Shared Reputation",
    body: "Under The Story Shapers banner, we collectively build a brand that stands for clarity and credibility. This shared reputation can open bigger opportunities than an individual might secure alone – while still keeping our individual brands and independence intact.",
  },
];

const memberBenefits = [
  {
    title: "Bigger, Better Projects",
    body: "As a team, we can pursue more ambitious projects and high-profile clients that would be hard to win or execute solo. Members can tap into projects that match their \"zone of genius,\" without having to be an expert in everything – the collective fills in the gaps.",
  },
  {
    title: "Autonomy with Backup",
    body: "You maintain the freedom of a freelancer (choosing projects, setting your schedule) with the backup of a team. When you need a second set of eyes on a strategy or someone to cover a skill you don't have, the collective has your back. You're independent, but never alone.",
  },
  {
    title: "Shared Learning",
    body: "Each member brings decades of experience across domains (brand, content, SEO, social, community, etc.). We regularly share insights, frameworks, and feedback. This pooled intelligence means continuous learning – you grow faster by collaborating with other senior strategists than you would in isolation.",
  },
  {
    title: "Reduced Overhead and Hassle",
    body: "The collective structure takes care of a lot of administrative overhead that solo consultants face. We develop common tools, templates, and processes (from proposal decks to contracts) so you don't reinvent the wheel each time. We also handle things like invoicing systems, knowledge libraries, and marketing under one umbrella (more on the 20% contribution later), so you can focus more on your craft.",
  },
];

const levels = [
  {
    label: "CORE",
    title: "Core Members",
    body: "The backbone. Deeply involved in shaping direction, leading projects, mentoring others. Available most of the time. First in line for new opportunities — and first to step up when things get hard.",
  },
  {
    label: "CONTRIBUTING",
    title: "Contributing Members",
    body: "Active, but project-based. You join when the right work comes. You step back when it doesn't. Flexibility without obligation.",
  },
  {
    label: "AFFILIATE",
    title: "Affiliates",
    body: "On the roster for specific expertise. Called in when needed. Light commitment, occasional collaboration.",
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
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(253, 232, 233, 0.06)" }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          color: "#7B1E7A",
          letterSpacing: "0.3em",
          opacity: 0.5,
        }}
      >
        &#9830;
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(253, 232, 233, 0.06)" }} />
    </div>
  );
}

export default function Join() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div
        className="relative px-2 md:px-4 lg:px-6 pt-24 pb-4"
        style={{ backgroundColor: "#000" }}
      >
        <div
          style={{
            backgroundColor: "#0C0A3E",
            borderRadius: "20px",
            padding: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <div className="max-w-[800px] mx-auto">
            {/* Back link */}
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
                  color: "rgba(253, 232, 233, 0.4)",
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

            {/* Header */}
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
                  color: "#7B1E7A",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Join the Collective
              </span>

              <h1
                className="mb-6"
                style={{
                  color: "#FDE8E9",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
                data-testid="text-join-heading"
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                  }}
                >
                  This isn't a job.{" "}
                </span>
                <br className="hidden md:block" />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.6,
                  }}
                >
                  It's not a gig platform either.
                </span>
              </h1>

              <div
                style={{
                  height: "2px",
                  background: "linear-gradient(to right, #7B1E7A, transparent)",
                  marginBottom: "3rem",
                  borderRadius: "1px",
                }}
              />
            </motion.div>

            {/* Intro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.02rem)",
                  color: "rgba(253, 232, 233, 0.75)",
                  lineHeight: 2.1,
                }}
              >
                The Story Shapers is a collective — a small, intentional group of senior strategists who've chosen to work together instead of alone.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.02rem)",
                  color: "rgba(253, 232, 233, 0.65)",
                  lineHeight: 2.1,
                }}
              >
                We built this because we were tired of the two options the industry offers: agencies that drown good work in process, or solo freelancing that trades depth for freedom.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.02rem)",
                  color: "rgba(253, 232, 233, 0.65)",
                  lineHeight: 2.1,
                }}
              >
                We wanted both. Autonomy and collaboration. Independence and support. Big thinking and small teams.
              </p>

              <p
                className="mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                  color: "#FDE8E9",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                So we created a third space.
              </p>

              <SectionDivider />

              {/* Collective Advantages */}
              <div className="space-y-4 mb-4">
                {collectiveAdvantages.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.07, duration: 0.4 }}
                    style={{
                      backgroundColor: "rgba(123, 30, 122, 0.06)",
                      border: "1px solid rgba(123, 30, 122, 0.2)",
                      borderRadius: "12px",
                      padding: "1.5rem 1.75rem",
                    }}
                    data-testid={`card-advantage-${idx}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="shrink-0 mt-1"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.5rem",
                          color: "#7B1E7A",
                          letterSpacing: "0.1em",
                          opacity: 0.7,
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <p
                          className="mb-2"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "clamp(0.92rem, 1.2vw, 1.02rem)",
                            color: "#FDE8E9",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Libre Baskerville', serif",
                            fontSize: "clamp(0.83rem, 1.05vw, 0.92rem)",
                            color: "rgba(253, 232, 233, 0.58)",
                            lineHeight: 1.9,
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <SectionDivider />

              {/* Benefits for Collective Members */}
              <h2
                className="mb-6"
                style={{
                  color: "#FDE8E9",
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
                  Benefits for{" "}
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
                  Collective Members
                </span>
              </h2>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(253, 232, 233, 0.6)",
                  lineHeight: 2,
                }}
              >
                Being a Story Shapers collaborator comes with tangible benefits, beyond what solo consulting or a traditional job can offer:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {memberBenefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    style={{
                      border: "1px solid rgba(253, 232, 233, 0.08)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                    }}
                    data-testid={`card-benefit-${idx}`}
                  >
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.9rem, 1.15vw, 1rem)",
                        color: "#FDE8E9",
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {benefit.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "clamp(0.8rem, 1vw, 0.88rem)",
                        color: "rgba(253, 232, 233, 0.55)",
                        lineHeight: 1.85,
                      }}
                    >
                      {benefit.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <SectionDivider />

              {/* The Levels */}
              <h2
                className="mb-6"
                style={{
                  color: "#FDE8E9",
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
                  The{" "}
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
                  Levels
                </span>
              </h2>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.92rem, 1.2vw, 1.02rem)",
                  color: "rgba(253, 232, 233, 0.65)",
                  lineHeight: 1.8,
                }}
              >
                Not everyone participates the same way. That's by design.
              </p>

              <div className="space-y-4 mb-8">
                {levels.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-5"
                    style={{
                      backgroundColor: "rgba(123, 30, 122, 0.06)",
                      border: "1px solid rgba(123, 30, 122, 0.25)",
                      borderRadius: "14px",
                      padding: "1.5rem 1.75rem",
                    }}
                    data-testid={`card-level-${idx}`}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        border: "1px solid rgba(123, 30, 122, 0.4)",
                        backgroundColor: "rgba(123, 30, 122, 0.12)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.5rem",
                          color: "#7B1E7A",
                          letterSpacing: "0.05em",
                          fontWeight: 600,
                        }}
                      >
                        {level.label.substring(0, 3)}
                      </span>
                    </div>
                    <div>
                      <p
                        className="mb-1.5"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                          color: "#FDE8E9",
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        {level.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: "clamp(0.83rem, 1.05vw, 0.92rem)",
                          color: "rgba(253, 232, 233, 0.6)",
                          lineHeight: 1.85,
                        }}
                      >
                        {level.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p
                className="mb-4"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(253, 232, 233, 0.6)",
                  lineHeight: 2,
                }}
              >
                You can move between levels as your life changes. The only ask: communicate clearly so we can plan accordingly.
              </p>

              <SectionDivider />

              {/* Operating Principles */}
              <h2
                className="mb-8"
                style={{
                  color: "#FDE8E9",
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
                  Operating{" "}
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
                  Principles
                </span>
              </h2>

              <div className="flex flex-wrap gap-3 mb-4">
                {["Clarity", "Integrity", "Collaboration", "Creativity", "Impact"].map((principle, idx) => (
                  <motion.span
                    key={principle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                      color: "#FDE8E9",
                      fontWeight: 500,
                      border: "1px solid rgba(123, 30, 122, 0.35)",
                      borderRadius: "8px",
                      padding: "0.6rem 1.25rem",
                      backgroundColor: "rgba(123, 30, 122, 0.08)",
                    }}
                    data-testid={`tag-principle-${idx}`}
                  >
                    {principle}
                  </motion.span>
                ))}
              </div>

              <SectionDivider />

              {/* How to Join */}
              <h2
                className="mb-6"
                style={{
                  color: "#FDE8E9",
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
                  How to{" "}
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
                  Join
                </span>
              </h2>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.02rem)",
                  color: "rgba(253, 232, 233, 0.65)",
                  lineHeight: 2.1,
                }}
              >
                Fill the form thoughtfully. Tell us what you're good at, what you want to do more of, and how you like to work.
              </p>

              <div className="text-center">
                <a
                  href="#"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#FDE8E9",
                    backgroundColor: "#7B1E7A",
                    border: "none",
                    borderRadius: "8px",
                    padding: "1rem 2.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B2E9A"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; }}
                  data-testid="button-fill-form"
                >
                  FILL THE FORM
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
