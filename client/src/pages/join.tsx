import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { useCmsSettings } from "@/hooks/use-cms";

const defaultCollectiveAdvantages = [
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

const defaultMemberBenefits = [
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

const defaultLevels = [
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
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      <span
        style={{
          fontFamily: "'Switzer', sans-serif",
          fontSize: "0.5rem",
          color: "rgba(255, 255, 255, 0.25)",
          letterSpacing: "0.3em",
        }}
      >
        &#9830;
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
    </div>
  );
}

export default function Join() {
  const { data: settings } = useCmsSettings();
  const cms = settings?.join;

  const collectiveAdvantages = cms?.collectiveAdvantages ?? defaultCollectiveAdvantages;
  const memberBenefits = cms?.memberBenefits ?? defaultMemberBenefits;
  const levels = cms?.levels ?? defaultLevels;
  const label = cms?.label ?? "Join the Collective";
  const headingMain = cms?.headingMain ?? "This isn't a job.";
  const headingItalic = cms?.headingItalic ?? "It's not a gig platform either.";
  const introParagraphs = cms?.introParagraphs ?? [
    "The Story Shapers is a collective — a small, intentional group of senior strategists who've chosen to work together instead of alone.",
    "We built this because we were tired of the two options the industry offers: agencies that drown good work in process, or solo freelancing that trades depth for freedom.",
    "We wanted both. Autonomy and collaboration. Independence and support. Big thinking and small teams.",
  ];
  const thirdSpace = cms?.thirdSpace ?? "So we created a third space.";
  const principles = cms?.principles ?? ["Clarity", "Integrity", "Collaboration", "Creativity", "Impact"];
  const benefitsIntro = cms?.benefitsIntro ?? "Being a Story Shapers collaborator comes with tangible benefits, beyond what solo consulting or a traditional job can offer:";
  const levelsIntro = cms?.levelsIntro ?? "Not everyone participates the same way. That's by design.";
  const levelsFooter = cms?.levelsFooter ?? "You can move between levels as your life changes. The only ask: communicate clearly so we can plan accordingly.";
  const howToJoinIntro = cms?.howToJoinIntro ?? "Fill the form thoughtfully. Tell us what you're good at, what you want to do more of, and how you like to work.";
  const howToJoinButton = cms?.howToJoinButton ?? "FILL THE FORM";

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
          <div className="max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-12 group"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(255, 255, 255, 0.6)",
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
              <span
                className="block mb-4"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>

              <h1
                className="mb-6"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
                data-testid="text-join-heading"
              >
                <span
                  style={{
                    fontFamily: "'Zodiak', serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                  }}
                >
                  {headingMain}{" "}
                </span>
                <br className="hidden md:block" />
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  {headingItalic}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {introParagraphs.map((para: string, idx: number) => (
                <p
                  key={idx}
                  className="mb-8"
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: 1.8,
                  }}
                >
                  {para}
                </p>
              ))}

              <p
                className="mb-4"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {thirdSpace}
              </p>

              <SectionDivider />

              <h2
                className="mb-8"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Zodiak', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 400,
                  }}
                >
                  Operating{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  Principles
                </span>
              </h2>

              <div className="flex flex-wrap gap-3 mb-4">
                {principles.map((principle: string, idx: number) => (
                  <motion.span
                    key={principle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: "clamp(0.85rem, 1vw, 0.92rem)",
                      color: "#FFFFFF",
                      fontWeight: 500,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "0.6rem 1.25rem",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }}
                    data-testid={`tag-principle-${idx}`}
                  >
                    {principle}
                  </motion.span>
                ))}
              </div>

              <SectionDivider />

              <div className="space-y-4 mb-4">
                {collectiveAdvantages.map((item: { title: string; body: string }, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.07, duration: 0.4 }}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "1.5rem 1.75rem",
                    }}
                    data-testid={`card-advantage-${idx}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="shrink-0 mt-1"
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: "0.55rem",
                          color: "rgba(255, 255, 255, 0.5)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <p
                          className="mb-2"
                          style={{
                            fontFamily: "'Switzer', sans-serif",
                            fontSize: "clamp(0.92rem, 1.2vw, 1.02rem)",
                            color: "#FFFFFF",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Switzer', sans-serif",
                            fontSize: "clamp(0.85rem, 1.05vw, 0.95rem)",
                            color: "rgba(255, 255, 255, 0.8)",
                            lineHeight: 1.8,
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

              <h2
                className="mb-6"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Zodiak', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 400,
                  }}
                >
                  Benefits for{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  Collective Members
                </span>
              </h2>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "clamp(0.9rem, 1.15vw, 1rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.8,
                }}
              >
                {benefitsIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {memberBenefits.map((benefit: { title: string; body: string }, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                    }}
                    data-testid={`card-benefit-${idx}`}
                  >
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "clamp(0.9rem, 1.15vw, 1rem)",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {benefit.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.8,
                      }}
                    >
                      {benefit.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <SectionDivider />

              <h2
                className="mb-6"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Zodiak', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 400,
                  }}
                >
                  The{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  Levels
                </span>
              </h2>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "clamp(0.92rem, 1.2vw, 1.02rem)",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.8,
                }}
              >
                {levelsIntro}
              </p>

              <div className="space-y-4 mb-8">
                {levels.map((level: { label: string; title: string; body: string }, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-5"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
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
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: "0.5rem",
                          color: "rgba(255, 255, 255, 0.6)",
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
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                          color: "#FFFFFF",
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        {level.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: "clamp(0.85rem, 1.05vw, 0.95rem)",
                          color: "rgba(255, 255, 255, 0.8)",
                          lineHeight: 1.8,
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
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "clamp(0.9rem, 1.15vw, 1rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.8,
                }}
              >
                {levelsFooter}
              </p>

              <SectionDivider />

              <h2
                className="mb-6"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Zodiak', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 400,
                  }}
                >
                  How to{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  Join
                </span>
              </h2>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.8,
                }}
              >
                {howToJoinIntro}
              </p>

              <div className="text-center">
                <Link
                  href="/contact#join"
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#FFFFFF",
                    backgroundColor: "#7B1E7A",
                    border: "none",
                    borderRadius: "8px",
                    padding: "1rem 2.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B3E9A"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; }}
                  data-testid="button-fill-form"
                >
                  {howToJoinButton}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
