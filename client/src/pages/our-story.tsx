import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { useCmsSettings } from "@/hooks/use-cms";

export default function OurStory() {
  const { data: settings } = useCmsSettings();
  const s = settings?.ourStory ?? {};

  const label = s.label ?? "Our Story";
  const headingMain = s.headingMain ?? "The Story Shapers:";
  const headingItalic = s.headingItalic ?? "An Origin";
  const opening = s.opening ?? "Once upon a time, which is how all good stories begin, there were three marketers. Not musketeers, though they'd later discover they shared the same battle scars.";
  const misplacedVoice = s.misplacedVoice ?? "They'd built careers helping others find their voice. And somewhere along the way, they'd misplaced their own.";
  const photocopy = s.photocopy ?? "They worked in different corners of the industry. Agencies. Corporates. Startups. Strategy rooms with too much air conditioning and not enough oxygen. They were good at what they did. Sometimes great. But the work had started to feel like a photocopy of a photocopy, each version a little more faded than the last.";
  const person1 = s.person1 ?? "One had spent years writing for others. Brand voices. Campaign manifestos. Thought pieces with neat conclusions. Her own words lived elsewhere, half-formed, sitting in drafts she never sent.";
  const person2 = s.person2 ?? "Another had mastered the art of the perfect pitch deck. She could sell a vision in her sleep, and had long stopped counting how many times she'd stood in a room presenting someone else's thinking as if it were her own.";
  const person3 = s.person3 ?? "And the third had simply grown tired of being the smartest person in rooms that didn't want to listen.";
  const notBoardroom = s.notBoardroom ?? "They didn't meet in a boardroom. Or a conference. Or one of those networking events where everyone talks and no one says anything.";
  const slowlyThenAtOnce = s.slowlyThenAtOnce ?? 'They met the way most meaningful things happen, slowly, then all at once. A late-night message that said: "Is it just me, or does this feel broken?"';
  const notJustHer = s.notJustHer ?? "It wasn't just her.";
  const sameWeight = s.sameWeight ?? "What they discovered was that they'd all been carrying the same quiet weight: knowing exactly what a brand needed, and watching it do the opposite. Being senior enough to see the problem, but not free enough to fix it.";
  const stoppedWaiting = s.stoppedWaiting ?? "And then one day, they stopped waiting for permission.";
  const noAgency = s.noAgency ?? "No agency. No corporate ladder. No one else's rules about what work should look like or who gets to shape it.";
  const threeHumans = s.threeHumans ?? "Just three humans, a writer, a thinker, a doer (all three of each, really), asking a precarious question:";
  const bigQuestion = s.bigQuestion ?? "What if we actually did this the way we've always known it should be done?";
  const notBornFromBusiness = s.notBornFromBusiness ?? "The Story Shapers wasn't born from any grand business idea.";
  const collectiveExhale = s.collectiveExhale ?? "It was born from a collective exhale.";
  const interdisciplinary = s.interdisciplinary ?? "Interdisciplinary by design. Flexible by intention. Built on the radical idea that the best work doesn't ask you to shrink — into a role, a title, a lane, a niche. It asks you to show up whole.";
  const nowTheyDo = s.nowTheyDo ?? 'Now they do for others what they finally did for themselves. They help businesses find the story that\'s been there all along, buried under decks and campaigns and "we\'ve always done it this way."';
  const dontClaimAnswers = s.dontClaimAnswers ?? "They don't claim to have all the answers. But they've learned, the hard way, the only way, that the story you're afraid to tell is usually the one that matters most.";
  const closing = s.closing ?? "This is us. The Story Shapers.";

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
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
                data-testid="text-story-label"
              >
                {label}
              </span>

              <h1
                className="mb-8"
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
                data-testid="text-story-heading"
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 400,
                  }}
                >
                  {headingMain}{" "}
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
              className="space-y-0"
            >
              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 2,
                  fontStyle: "italic",
                }}
                data-testid="text-story-opening"
              >
                {opening}
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {misplacedVoice}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {photocopy}
              </p>

              <div
                className="my-12 pl-8"
                style={{
                  borderLeft: "2px solid rgba(255, 255, 255, 0.25)",
                }}
              >
                <div className="space-y-6">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.85)",
                      lineHeight: 1.9,
                    }}
                  >
                    {person1}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.85)",
                      lineHeight: 1.9,
                    }}
                  >
                    {person2}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.85)",
                      lineHeight: 1.9,
                    }}
                  >
                    {person3}
                  </p>
                </div>
              </div>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255, 255, 255, 0.25)",
                    letterSpacing: "0.3em",
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {notBoardroom}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {slowlyThenAtOnce}
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {notJustHer}
              </p>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255, 255, 255, 0.25)",
                    letterSpacing: "0.3em",
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {sameWeight}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {stoppedWaiting}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {noAgency}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {threeHumans}
              </p>

              <div
                className="my-12"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                    color: "#FFFFFF",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  {bigQuestion}
                </p>
              </div>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255, 255, 255, 0.25)",
                    letterSpacing: "0.3em",
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {notBornFromBusiness}
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {collectiveExhale}
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {interdisciplinary}
              </p>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(255, 255, 255, 0.25)",
                    letterSpacing: "0.3em",
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {nowTheyDo}
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 2,
                }}
              >
                {dontClaimAnswers}
              </p>

              <div
                className="mt-16 mb-8 text-center"
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                  data-testid="text-story-closing"
                >
                  {closing}
                </p>
                <div
                  className="mt-4 mx-auto"
                  style={{
                    width: "40px",
                    height: "2px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
