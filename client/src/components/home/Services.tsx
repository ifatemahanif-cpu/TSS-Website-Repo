import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "clarity",
    title: "Clarity & Direction",
    subtitle: "You've outgrown gut decisions. Investors want a story. Your team wants a plan. You want both — yesterday.",
    items: [
      "Brand audit + competitive landscape",
      "Positioning & differentiation",
      "Messaging hierarchy + value proposition",
      "GTM strategy + 90-day roadmap",
    ],
  },
  {
    id: "website",
    title: "Website & Messaging",
    subtitle: "Traffic is fine. Conversions aren't. People land, scroll, leave. Something's off — you just can't name it.",
    items: [
      "Website structure + information architecture",
      "Homepage + service page copy",
      "Conversion-led messaging + CTAs",
      "Landing page optimisation",
    ],
  },
  {
    id: "content",
    title: "Content Systems",
    subtitle: "Your founder posts when they remember. Your social feels random. You know consistency matters — you just can't maintain it.",
    items: [
      "Content pillars + editorial strategy",
      "Calendar + distribution plan",
      "Templates + storytelling frameworks",
      "Repurposing system (AI-assisted where it helps)",
    ],
  },
  {
    id: "discovery",
    title: "Discoverability",
    subtitle: "You're doing good work. But when someone searches for what you do, you don't show up. Your competitors do.",
    items: [
      "SEO strategy + content opportunity mapping",
      "On-page optimisation + internal linking",
      "AEO-ready structuring (answers + intent)",
      "Authority-building plan",
    ],
  },
  {
    id: "campaigns",
    title: "Brand & Campaigns",
    subtitle: "You've done the one-off launches. Now you need marketing that compounds — not campaigns that spike and fade.",
    items: [
      "Brand marketing strategy + campaign calendar",
      "Integrated campaign planning",
      "Launch messaging + creative direction",
      "Always-on storytelling system",
    ],
  },
  {
    id: "fractional",
    title: "Fractional Leadership",
    subtitle: "You're not ready for a full-time CMO. But you're past the point where the founder can do it all. You need a senior mind in the room — not another agency.",
    items: [
      "Fractional CMO / advisory retainers",
      "Quarterly planning + prioritisation",
      "Campaign reviews + performance dashboards",
      "Team enablement + operating playbooks",
    ],
  },
  {
    id: "ai",
    title: "AI-Powered Solutions",
    subtitle: "Some problems don't need more people. They need smarter systems. We build custom AI workflows for content, research, reporting, and ops — tailored to your stack, your team, your constraints.",
    items: [
      "AI content assistants tuned to your voice",
      "Automated reporting + insight generation",
      "Research and competitive monitoring systems",
      "Workflow automation for lean teams",
    ],
  },
];

const questions = [
  {
    id: 1,
    question: "When someone asks what your brand stands for, your team...",
    options: [
      { text: "Gives a clear, consistent answer", score: { clarity: 0 } },
      { text: "Each person says something slightly different", score: { clarity: 2 } },
      { text: "Struggles to articulate it at all", score: { clarity: 3 } },
    ],
  },
  {
    id: 2,
    question: "Your website's conversion rate is...",
    options: [
      { text: "Strong — visitors become leads or customers", score: { website: 0 } },
      { text: "Decent traffic, but people don't convert", score: { website: 2 } },
      { text: "We're not sure — we don't track it closely", score: { website: 3 } },
    ],
  },
  {
    id: 3,
    question: "Your content output looks like...",
    options: [
      { text: "A structured system with pillars and a calendar", score: { content: 0 } },
      { text: "Sporadic — we post when we remember", score: { content: 2 } },
      { text: "Non-existent or completely ad-hoc", score: { content: 3 } },
    ],
  },
  {
    id: 4,
    question: "When someone searches for what you do, you...",
    options: [
      { text: "Show up on page one consistently", score: { discovery: 0 } },
      { text: "Appear sometimes, but competitors rank higher", score: { discovery: 2 } },
      { text: "Are basically invisible in search", score: { discovery: 3 } },
    ],
  },
  {
    id: 5,
    question: "Your marketing campaigns tend to...",
    options: [
      { text: "Build on each other and compound over time", score: { campaigns: 0 } },
      { text: "Spike and fade — each one feels like starting over", score: { campaigns: 2 } },
      { text: "We haven't run any structured campaigns yet", score: { campaigns: 3 } },
    ],
  },
  {
    id: 6,
    question: "Who owns marketing strategy at your company?",
    options: [
      { text: "A dedicated senior marketing leader", score: { fractional: 0 } },
      { text: "The founder, alongside everything else", score: { fractional: 2 } },
      { text: "No one — it's everyone's side job", score: { fractional: 3 } },
    ],
  },
  {
    id: 7,
    question: "Your messaging across platforms is...",
    options: [
      { text: "Consistent — same voice, same story everywhere", score: { clarity: 0 } },
      { text: "Somewhat aligned but drifts by channel", score: { clarity: 1, website: 1 } },
      { text: "Different on every platform", score: { clarity: 2, website: 1 } },
    ],
  },
  {
    id: 8,
    question: "How do you feel about your team's marketing tools and workflows?",
    options: [
      { text: "Efficient — we have systems that save time", score: { ai: 0 } },
      { text: "Functional but lots of manual work", score: { ai: 2 } },
      { text: "Chaotic — too many tools, nothing connects", score: { ai: 3 } },
    ],
  },
  {
    id: 9,
    question: "Your go-to-market strategy for new products or features is...",
    options: [
      { text: "Documented and repeatable", score: { campaigns: 0 } },
      { text: "Improvised each time", score: { campaigns: 2, clarity: 1 } },
      { text: "We don't really have one", score: { campaigns: 3, clarity: 1 } },
    ],
  },
  {
    id: 10,
    question: "Honestly, your biggest marketing frustration right now is...",
    options: [
      { text: "We know what to do but can't execute fast enough", score: { ai: 1, content: 1 } },
      { text: "We're doing a lot but nothing seems to compound", score: { content: 2, campaigns: 1 } },
      { text: "We don't know what we should be doing differently", score: { clarity: 2, fractional: 2 } },
    ],
  },
];

type ScoreKey = "clarity" | "website" | "content" | "discovery" | "campaigns" | "fractional" | "ai";

const areaLabels: Record<ScoreKey, { title: string; description: string }> = {
  clarity: {
    title: "Clarity & Direction",
    description: "You've outgrown gut decisions. Investors want a story. Your team wants a plan. You need both.",
  },
  website: {
    title: "Website & Messaging",
    description: "Traffic is fine. Conversions aren't. People land, scroll, leave. Something's off.",
  },
  content: {
    title: "Content Systems",
    description: "Your founder posts when they remember. Consistency matters — you just can't maintain it.",
  },
  discovery: {
    title: "Discoverability",
    description: "You're doing good work. But when someone searches for what you do, you don't show up.",
  },
  campaigns: {
    title: "Brand & Campaigns",
    description: "You need marketing that compounds — not campaigns that spike and fade.",
  },
  fractional: {
    title: "Fractional Leadership",
    description: "You're not ready for a full-time CMO. But you're past the point where the founder can do it all.",
  },
  ai: {
    title: "AI-Powered Solutions",
    description: "Some problems don't need more people. They need smarter systems.",
  },
};

export function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<Record<ScoreKey, number>>({
    clarity: 0, website: 0, content: 0, discovery: 0, campaigns: 0, fractional: 0, ai: 0,
  });
  const [direction, setDirection] = useState(1);

  const isFinished = quizActive && currentStep >= questions.length;
  const progress = quizActive ? Math.min(currentStep / questions.length, 1) : 0;

  const toggleService = useCallback((id: string) => {
    setExpandedService(prev => prev === id ? null : id);
  }, []);

  const handleAnswer = useCallback((questionIndex: number, optionIndex: number) => {
    if (answers[questionIndex] !== undefined) return;
    const newAnswers = { ...answers, [questionIndex]: optionIndex };
    setAnswers(newAnswers);

    const freshScores: Record<ScoreKey, number> = {
      clarity: 0, website: 0, content: 0, discovery: 0, campaigns: 0, fractional: 0, ai: 0,
    };
    for (const [qIdx, oIdx] of Object.entries(newAnswers)) {
      const q = questions[Number(qIdx)];
      if (!q) continue;
      const opt = q.options[oIdx];
      if (!opt) continue;
      for (const [key, val] of Object.entries(opt.score)) {
        freshScores[key as ScoreKey] += val;
      }
    }
    setScores(freshScores);
    setDirection(1);
    setTimeout(() => {
      setCurrentStep(questionIndex + 1);
    }, 400);
  }, [answers]);

  const handleStartQuiz = useCallback(() => {
    setQuizActive(true);
    setCurrentStep(0);
    setAnswers({});
    setScores({ clarity: 0, website: 0, content: 0, discovery: 0, campaigns: 0, fractional: 0, ai: 0 });
    setDirection(1);
  }, []);

  const handleRestart = useCallback(() => {
    setQuizActive(false);
    setCurrentStep(0);
    setAnswers({});
    setScores({ clarity: 0, website: 0, content: 0, discovery: 0, campaigns: 0, fractional: 0, ai: 0 });
    setDirection(-1);
  }, []);

  const topAreas = Object.entries(scores)
    .filter(([, val]) => val > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3) as [ScoreKey, number][];

  return (
    <section
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#000" }}
      data-testid="services-section"
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0C0A3E",
          borderRadius: "20px",
          padding: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 md:mb-14">
            <span
              className="block mb-3 tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#7B1E7A",
                letterSpacing: "0.3em",
              }}
              data-testid="text-services-label"
            >
              004 / How We Work
            </span>
            <h2
              className="mb-5"
              style={{
                color: "#FDE8E9",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
              data-testid="text-services-heading"
            >
              <span
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 400,
                }}
              >
                Interactive{" "}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  opacity: 0.6,
                }}
              >
                Discovery
              </span>
            </h2>
            <p
              className="max-w-3xl"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                color: "rgba(253, 232, 233, 0.55)",
                lineHeight: 1.8,
              }}
              data-testid="text-services-intro"
            >
              We don't just deliver decks. We build systems that let your team keep running after we leave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {services.map((service, idx) => {
              const isExpanded = expandedService === service.id;
              return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className={`group ${service.id === "ai" ? "md:col-span-2" : ""}`}
                style={{
                  border: `1px solid ${isExpanded ? "rgba(123, 30, 122, 0.6)" : "rgba(253, 232, 233, 0.1)"}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  backgroundColor: isExpanded ? "rgba(123, 30, 122, 0.12)" : "rgba(253, 232, 233, 0.04)",
                  cursor: "pointer",
                }}
                whileHover={{
                  borderColor: isExpanded ? "rgba(123, 30, 122, 0.7)" : "rgba(123, 30, 122, 0.35)",
                  backgroundColor: isExpanded ? "rgba(123, 30, 122, 0.14)" : "rgba(253, 232, 233, 0.06)",
                }}
                data-testid={`card-service-${service.id}`}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full text-left"
                  style={{
                    padding: "1.5rem 1.75rem",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "#FDE8E9",
                  }}
                  data-testid={`button-toggle-${service.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.55rem",
                            color: "#7B1E7A",
                            letterSpacing: "0.15em",
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                            fontWeight: 600,
                            color: "#FDE8E9",
                          }}
                        >
                          {service.title}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: "clamp(0.78rem, 0.95vw, 0.87rem)",
                          color: "rgba(253, 232, 233, 0.65)",
                          lineHeight: 1.75,
                        }}
                      >
                        {service.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 shrink-0 mt-0.5">
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: `1.5px solid ${isExpanded ? "#7B1E7A" : "rgba(123, 30, 122, 0.4)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isExpanded ? "rgba(123, 30, 122, 0.2)" : "transparent",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "1rem",
                            color: isExpanded ? "#FDE8E9" : "#7B1E7A",
                            lineHeight: 1,
                            fontWeight: 300,
                          }}
                        >
                          +
                        </span>
                      </motion.div>
                      {!isExpanded && (
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.45rem",
                            color: "rgba(123, 30, 122, 0.5)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase" as const,
                          }}
                        >
                          Details
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 1.75rem 1.5rem 1.75rem",
                          borderTop: "1px solid rgba(123, 30, 122, 0.2)",
                          paddingTop: "1.25rem",
                        }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-start gap-2.5"
                            >
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: "#7B1E7A",
                                  flexShrink: 0,
                                  marginTop: "0.45rem",
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "0.82rem",
                                  color: "rgba(253, 232, 233, 0.75)",
                                  lineHeight: 1.6,
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              );
            })}
          </div>

          <div
            style={{
              border: "1px solid rgba(123, 30, 122, 0.25)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {!quizActive ? (
              <div
                className="flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <div className="flex-1">
                  <span
                    className="block mb-2"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      color: "#7B1E7A",
                      letterSpacing: "0.2em",
                      opacity: 0.7,
                    }}
                  >
                    MARKETING DIAGNOSTIC
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
                      color: "#FDE8E9",
                      lineHeight: 1.4,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Not sure what you need?
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(253, 232, 233, 0.45)",
                      lineHeight: 1.7,
                    }}
                  >
                    Answer 10 questions. We'll tell you what's missing and where to start.
                  </p>
                </div>
                <button
                  onClick={handleStartQuiz}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "#FDE8E9",
                    backgroundColor: "#7B1E7A",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.9rem 2rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap" as const,
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B2E9A"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; }}
                  data-testid="button-start-quiz"
                >
                  GET OUR RECOMMENDATION
                </button>
              </div>
            ) : (
              <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                {!isFinished && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          color: "#7B1E7A",
                          letterSpacing: "0.15em",
                        }}
                      >
                        QUESTION {currentStep + 1} / {questions.length}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          color: "rgba(253, 232, 233, 0.3)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {Math.round(progress * 100)}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "2px",
                        backgroundColor: "rgba(123, 30, 122, 0.2)",
                        borderRadius: "1px",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        style={{
                          height: "100%",
                          backgroundColor: "#7B1E7A",
                          borderRadius: "1px",
                        }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait" custom={direction}>
                  {!isFinished && currentStep < questions.length && (
                    <motion.div
                      key={`q-${currentStep}`}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -40 }}
                      transition={{ duration: 0.35 }}
                    >
                      <span
                        className="block mb-3"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.55rem",
                          color: "#7B1E7A",
                          letterSpacing: "0.2em",
                          opacity: 0.6,
                        }}
                      >
                        Q{String(currentStep + 1).padStart(2, "0")}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                          color: "#FDE8E9",
                          lineHeight: 1.6,
                          marginBottom: "1.25rem",
                        }}
                        data-testid={`text-quiz-question-${currentStep}`}
                      >
                        {questions[currentStep].question}
                      </h3>
                      <div className="space-y-3">
                        {questions[currentStep].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(currentStep, idx)}
                            className="w-full text-left"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                              color: answers[currentStep] === idx ? "#FDE8E9" : "rgba(253, 232, 233, 0.6)",
                              backgroundColor: answers[currentStep] === idx ? "rgba(123, 30, 122, 0.3)" : "rgba(253, 232, 233, 0.03)",
                              border: `1px solid ${answers[currentStep] === idx ? "rgba(123, 30, 122, 0.6)" : "rgba(253, 232, 233, 0.08)"}`,
                              borderRadius: "10px",
                              padding: "0.9rem 1.1rem",
                              cursor: "pointer",
                              transition: "all 0.2s",
                              lineHeight: 1.6,
                            }}
                            onMouseEnter={e => {
                              if (answers[currentStep] !== idx) {
                                e.currentTarget.style.borderColor = "rgba(123, 30, 122, 0.4)";
                                e.currentTarget.style.backgroundColor = "rgba(253, 232, 233, 0.05)";
                              }
                            }}
                            onMouseLeave={e => {
                              if (answers[currentStep] !== idx) {
                                e.currentTarget.style.borderColor = "rgba(253, 232, 233, 0.08)";
                                e.currentTarget.style.backgroundColor = "rgba(253, 232, 233, 0.03)";
                              }
                            }}
                            data-testid={`button-quiz-option-${currentStep}-${idx}`}
                          >
                            <span className="flex items-start gap-3">
                              <span
                                className="shrink-0 mt-0.5"
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "0.6rem",
                                  color: "#7B1E7A",
                                  opacity: 0.6,
                                }}
                              >
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {option.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {isFinished && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="mb-6">
                        <div
                          style={{
                            height: "2px",
                            backgroundColor: "#7B1E7A",
                            borderRadius: "1px",
                            marginBottom: "0.75rem",
                          }}
                        />
                        <span
                          className="block mb-4"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.55rem",
                            color: "#7B1E7A",
                            letterSpacing: "0.2em",
                          }}
                        >
                          DIAGNOSTIC COMPLETE
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                          color: "#FDE8E9",
                          lineHeight: 1.5,
                          marginBottom: "0.5rem",
                        }}
                        data-testid="text-quiz-results-heading"
                      >
                        {topAreas.length > 0
                          ? "Here's where to focus first."
                          : "You're in great shape."}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(253, 232, 233, 0.45)",
                          lineHeight: 1.7,
                          marginBottom: "1.5rem",
                        }}
                      >
                        {topAreas.length > 0
                          ? "Based on your answers, these are the areas where strategic attention would have the most impact."
                          : "Your marketing foundations look solid. A conversation could still uncover opportunities to compound what's working."}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                        {topAreas.length > 0 ? topAreas.map(([key, val], idx) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 * idx, duration: 0.4 }}
                            style={{
                              border: "1px solid rgba(123, 30, 122, 0.3)",
                              borderRadius: "10px",
                              padding: "1rem 1.1rem",
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "0.85rem",
                                  color: "#FDE8E9",
                                  fontWeight: 500,
                                }}
                              >
                                {areaLabels[key].title}
                              </span>
                              <span
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "0.5rem",
                                  color: "#7B1E7A",
                                  opacity: 0.8,
                                }}
                              >
                                #{idx + 1}
                              </span>
                            </div>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.75rem",
                                color: "rgba(253, 232, 233, 0.4)",
                                lineHeight: 1.5,
                              }}
                            >
                              {areaLabels[key].description}
                            </p>
                            <div className="mt-2" style={{ height: "3px", borderRadius: "2px", backgroundColor: "rgba(123, 30, 122, 0.15)" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((val / 6) * 100, 100)}%` }}
                                transition={{ delay: 0.3 + 0.15 * idx, duration: 0.6, ease: "easeOut" }}
                                style={{
                                  height: "100%",
                                  backgroundColor: "#7B1E7A",
                                  borderRadius: "2px",
                                }}
                              />
                            </div>
                          </motion.div>
                        )) : (
                          <div
                            className="md:col-span-3"
                            style={{
                              border: "1px solid rgba(123, 30, 122, 0.3)",
                              borderRadius: "10px",
                              padding: "1rem 1.25rem",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.85rem",
                                color: "rgba(253, 232, 233, 0.6)",
                                lineHeight: 1.7,
                              }}
                            >
                              No critical gaps detected. Your marketing foundations are stronger than most. Let's talk about what's next.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleRestart}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            color: "rgba(253, 232, 233, 0.5)",
                            backgroundColor: "transparent",
                            border: "1px solid rgba(253, 232, 233, 0.12)",
                            borderRadius: "8px",
                            padding: "0.7rem 1.25rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(253, 232, 233, 0.25)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(253, 232, 233, 0.12)"; }}
                          data-testid="button-retake-quiz"
                        >
                          RETAKE
                        </button>
                        <button
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            color: "#FDE8E9",
                            backgroundColor: "#7B1E7A",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0.7rem 1.25rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B2E9A"; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; }}
                          data-testid="button-book-call"
                        >
                          BOOK A DISCOVERY CALL
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
