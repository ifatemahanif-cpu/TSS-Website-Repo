import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

export default function OurStory() {
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
              <span
                className="block mb-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#0C0A3E",
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
                  color: "#7B1E7A",
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
              className="space-y-0"
            >
              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                  color: "rgba(123, 30, 122, 0.85)",
                  lineHeight: 2,
                  fontStyle: "italic",
                }}
                data-testid="text-story-opening"
              >
                Once upon a time — which is how all good stories begin — there were three marketers who had forgotten how to tell theirs.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                They worked in different corners of the industry. Agencies. Corporates. Startups. Consulting rooms with too much air conditioning and not enough oxygen. They were good at what they did. Sometimes great. But somewhere along the way, the work had started to feel like a photocopy of a photocopy — each version a little more faded than the last.
              </p>

              <div
                className="my-12 pl-8"
                style={{
                  borderLeft: "2px solid rgba(12, 10, 62, 0.4)",
                }}
              >
                <div className="space-y-6">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    One had spent years building brands for others while her own ideas collected dust in notebooks no one would ever read.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    Another had mastered the art of the perfect pitch deck — and lost count of how many times she'd presented someone else's vision as if it were her own.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    A third had watched "strategy" become a word people used to make PowerPoints feel important.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    And the fourth had simply grown tired of being the smartest person in rooms that didn't want to listen.
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

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
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
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                They met the way most meaningful things happen — slowly, then all at once. A conversation here. A shared frustration there. A late-night message that said: "Is it just me, or does this feel broken?"
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#7B1E7A",
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

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                What they discovered, in those early conversations, was that they'd all been carrying the same quiet weight.
              </p>

              <div
                className="my-10 pl-8"
                style={{
                  borderLeft: "2px solid rgba(12, 10, 62, 0.4)",
                }}
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
                    The weight of ideas that never made it past the approval chain.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    The weight of knowing exactly what a brand needed — and watching it do the opposite.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    The weight of being senior enough to see the problem, but not free enough to fix it.
                  </p>
                </div>
              </div>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#7B1E7A",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                They'd spent years shaping stories for others. But somewhere along the way, they'd stopped believing they could shape their own.
              </p>

              <div
                className="my-14"
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

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                And then one day — because this is the part of the story where something shifts — they decided to stop waiting for permission.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                No agency. No corporate ladder. No one else's rules about what marketing should look like or who gets to make the decisions.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                Just four people who knew how to build brands, sitting in a room (a virtual one, but still), asking a dangerous question:
              </p>

              <div
                className="my-12"
                style={{
                  backgroundColor: "rgba(12, 10, 62, 0.08)",
                  border: "1px solid rgba(12, 10, 62, 0.25)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                    color: "#7B1E7A",
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

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                The Story Shapers wasn't born from a business plan. It was born from a collective exhale.
              </p>

              <div
                className="my-10 pl-8"
                style={{
                  borderLeft: "2px solid rgba(12, 10, 62, 0.4)",
                }}
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
                    From the freedom of finally working with people who didn't need convincing.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    From the joy of building something where the best idea wins — not the loudest voice or the longest title.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      color: "rgba(123, 30, 122, 0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    From the quiet rebellion of saying: We've spent twenty years shaping stories for brands. Maybe it's time we shaped one for ourselves.
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

              <p
                className="mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  color: "#7B1E7A",
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                And now?
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                Now they do for others what they finally did for themselves.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                They help founders find the story that's been there all along — buried under decks and campaigns and "we've always done it this way."
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                They bring clarity to brands that have outgrown guesswork but haven't yet found their footing.
              </p>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                They sit in the rooms where decisions get stuck, and they unstick them.
              </p>

              <p
                className="mb-10"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(123, 30, 122, 0.65)",
                  lineHeight: 2,
                }}
              >
                Not because they have all the answers. But because they've learned — the hard way, the only way — that the story you're afraid to tell is usually the one that matters most.
              </p>

              <div
                className="mt-16 mb-8 text-center"
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                    color: "#7B1E7A",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                  data-testid="text-story-closing"
                >
                  We are The Story Shapers.
                </p>
                <div
                  className="mt-4 mx-auto"
                  style={{
                    width: "40px",
                    height: "2px",
                    backgroundColor: "#0C0A3E",
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
