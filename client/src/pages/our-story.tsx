import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

export default function OurStory() {
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
                  color: "rgba(255, 255, 255, 0.4)",
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
                  color: "#2A2870",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
                data-testid="text-story-label"
              >
                Our Story
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
                  The Story Shapers:{" "}
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
                  An Origin
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
                Once upon a time, which is how all good stories begin, there were three marketers. Not musketeers, though they'd later discover they shared the same battle scars.
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
                They'd built careers helping others find their voice. And somewhere along the way, they'd misplaced their own.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                They worked in different corners of the industry. Agencies. Corporates. Startups. Strategy rooms with too much air conditioning and not enough oxygen. They were good at what they did. Sometimes great. But the work had started to feel like a photocopy of a photocopy, each version a little more faded than the last.
              </p>

              <div
                className="my-12 pl-8"
                style={{
                  borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="space-y-6">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    One had spent years writing for others. Brand voices. Campaign manifestos. Thought pieces with neat conclusions. Her own words lived elsewhere, half-formed, sitting in drafts she never sent.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    Another had mastered the art of the perfect pitch deck. She could sell a vision in her sleep, and had long stopped counting how many times she'd stood in a room presenting someone else's thinking as if it were her own.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    And the third had simply grown tired of being the smartest person in rooms that didn't want to listen.
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
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "#2A2870",
                    letterSpacing: "0.3em",
                    opacity: 0.5,
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                They didn't meet in a boardroom. Or a conference. Or one of those networking events where everyone talks and no one says anything.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                They met the way most meaningful things happen, slowly, then all at once. A late-night message that said: "Is it just me, or does this feel broken?"
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
                It wasn't just her.
              </p>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "#2A2870",
                    letterSpacing: "0.3em",
                    opacity: 0.5,
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                What they discovered was that they'd all been carrying the same quiet weight: knowing exactly what a brand needed, and watching it do the opposite. Being senior enough to see the problem, but not free enough to fix it.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                And then one day, they stopped waiting for permission.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                No agency. No corporate ladder. No one else's rules about what work should look like or who gets to shape it.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                Just three humans, a writer, a thinker, a doer (all three of each, really), asking a precarious question:
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
                  What if we actually did this the way we've always known it should be done?
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
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "#2A2870",
                    letterSpacing: "0.3em",
                    opacity: 0.5,
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                The Story Shapers wasn't born from any grand business idea.
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
                It was born from a collective exhale.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                Interdisciplinary by design. Flexible by intention. Built on the radical idea that the best work doesn't ask you to shrink — into a role, a title, a lane, a niche. It asks you to show up whole.
              </p>

              <div
                className="my-14"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5rem",
                    color: "#2A2870",
                    letterSpacing: "0.3em",
                    opacity: 0.5,
                  }}
                >
                  &#9830;
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                Now they do for others what they finally did for themselves. They help businesses find the story that's been there all along, buried under decks and campaigns and "we've always done it this way."
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 2,
                }}
              >
                They don't claim to have all the answers. But they've learned, the hard way, the only way, that the story you're afraid to tell is usually the one that matters most.
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
                  This is us. The Story Shapers.
                </p>
                <div
                  className="mt-4 mx-auto"
                  style={{
                    width: "40px",
                    height: "2px",
                    backgroundColor: "#2A2870",
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
