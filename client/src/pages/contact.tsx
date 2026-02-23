import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

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
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(240, 235, 216, 0.06)" }} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          color: "#748CAB",
          letterSpacing: "0.3em",
          opacity: 0.5,
        }}
      >
        &#9830;
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(240, 235, 216, 0.06)" }} />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  color: "#F0EBD8",
  backgroundColor: "rgba(240, 235, 216, 0.04)",
  border: "1px solid rgba(116, 140, 171, 0.3)",
  borderRadius: "8px",
  padding: "0.85rem 1rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.6rem",
  color: "rgba(240, 235, 216, 0.5)",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: "0.5rem",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical" as const,
};

function FormInput({ label, name, type = "text", placeholder, required = true, testId }: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  testId: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={e => {
          e.currentTarget.style.borderColor = "rgba(116, 140, 171, 0.6)";
          e.currentTarget.style.backgroundColor = "rgba(240, 235, 216, 0.06)";
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = "rgba(116, 140, 171, 0.3)";
          e.currentTarget.style.backgroundColor = "rgba(240, 235, 216, 0.04)";
        }}
        data-testid={testId}
      />
    </div>
  );
}

function FormTextarea({ label, name, placeholder, required = true, testId }: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  testId: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        style={textareaStyle}
        onFocus={e => {
          e.currentTarget.style.borderColor = "rgba(116, 140, 171, 0.6)";
          e.currentTarget.style.backgroundColor = "rgba(240, 235, 216, 0.06)";
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = "rgba(116, 140, 171, 0.3)";
          e.currentTarget.style.backgroundColor = "rgba(240, 235, 216, 0.04)";
        }}
        data-testid={testId}
      />
    </div>
  );
}

export default function Contact() {
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [talkSubmitted, setTalkSubmitted] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    }
  }, []);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
  };

  const handleTalkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTalkSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#0D1321", minHeight: "100vh" }}>
      <Navbar />

      <div
        className="relative px-2 md:px-4 lg:px-6 pt-24 pb-4"
        style={{ backgroundColor: "#0D1321" }}
      >
        <div
          style={{
            backgroundColor: "#1D2D44",
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
                  color: "rgba(240, 235, 216, 0.4)",
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

            {/* ===== SECTION 1: Join the Collective ===== */}
            <motion.div
              id="join"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid rgba(116, 140, 171, 0.4)",
                    backgroundColor: "rgba(116, 140, 171, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5rem",
                      color: "#748CAB",
                      fontWeight: 600,
                    }}
                  >
                    01
                  </span>
                </div>
                <h2
                  style={{
                    color: "#F0EBD8",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 400,
                    }}
                  >
                    Join the{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      opacity: 0.6,
                    }}
                  >
                    Collective
                  </span>
                </h2>
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(240, 235, 216, 0.55)",
                  lineHeight: 2,
                }}
              >
                Fill the form thoughtfully. Tell us what you're good at, what you want to do more of, and how you like to work.
              </p>

              {joinSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    backgroundColor: "rgba(116, 140, 171, 0.08)",
                    border: "1px solid rgba(116, 140, 171, 0.3)",
                    borderRadius: "14px",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                  }}
                  data-testid="text-join-success"
                >
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "1.1rem",
                      color: "#F0EBD8",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Thank you for reaching out.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(240, 235, 216, 0.5)",
                    }}
                  >
                    We'll review your submission and get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleJoinSubmit} data-testid="form-join">
                  <div
                    style={{
                      backgroundColor: "rgba(116, 140, 171, 0.04)",
                      border: "1px solid rgba(116, 140, 171, 0.15)",
                      borderRadius: "14px",
                      padding: "1.75rem",
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <FormInput
                        label="Your Name"
                        name="name"
                        placeholder="Full name"
                        testId="input-join-name"
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        testId="input-join-email"
                      />
                    </div>

                    <div className="mb-5">
                      <FormTextarea
                        label="What are you good at?"
                        name="expertise"
                        placeholder="Your core expertise and skills — brand strategy, content, SEO, community, etc."
                        testId="input-join-expertise"
                      />
                    </div>

                    <div className="mb-5">
                      <FormTextarea
                        label="What do you want to do more of?"
                        name="aspirations"
                        placeholder="The kind of work that lights you up..."
                        testId="input-join-aspirations"
                      />
                    </div>

                    <div className="mb-6">
                      <FormTextarea
                        label="How do you like to work?"
                        name="workstyle"
                        placeholder="Your ideal working rhythm, collaboration style, availability..."
                        testId="input-join-workstyle"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        color: "#F0EBD8",
                        backgroundColor: "#748CAB",
                        border: "none",
                        borderRadius: "8px",
                        padding: "1rem 2.5rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        width: "100%",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3E5C76"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#748CAB"; }}
                      data-testid="button-submit-join"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            <SectionDivider />

            {/* ===== SECTION 2: Let's Talk ===== */}
            <motion.div
              id="talk"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid rgba(116, 140, 171, 0.4)",
                    backgroundColor: "rgba(116, 140, 171, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5rem",
                      color: "#748CAB",
                      fontWeight: 600,
                    }}
                  >
                    02
                  </span>
                </div>
                <h2
                  style={{
                    color: "#F0EBD8",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 400,
                    }}
                  >
                    Let's{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      opacity: 0.6,
                    }}
                  >
                    Talk
                  </span>
                </h2>
              </div>

              <p
                className="mb-8"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                  color: "rgba(240, 235, 216, 0.55)",
                  lineHeight: 2,
                }}
              >
                Got a challenge that needs clarity? Tell us what you're working on and we'll figure out how we can help.
              </p>

              {talkSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    backgroundColor: "rgba(116, 140, 171, 0.08)",
                    border: "1px solid rgba(116, 140, 171, 0.3)",
                    borderRadius: "14px",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                  }}
                  data-testid="text-talk-success"
                >
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "1.1rem",
                      color: "#F0EBD8",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message received.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(240, 235, 216, 0.5)",
                    }}
                  >
                    We'll be in touch soon to start the conversation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleTalkSubmit} data-testid="form-talk">
                  <div
                    style={{
                      backgroundColor: "rgba(240, 235, 216, 0.02)",
                      border: "1px solid rgba(240, 235, 216, 0.08)",
                      borderRadius: "14px",
                      padding: "1.75rem",
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <FormInput
                        label="Your Name"
                        name="name"
                        placeholder="Full name"
                        testId="input-talk-name"
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        testId="input-talk-email"
                      />
                    </div>

                    <div className="mb-5">
                      <FormInput
                        label="Company / Brand"
                        name="company"
                        placeholder="Your company or brand name"
                        required={false}
                        testId="input-talk-company"
                      />
                    </div>

                    <div className="mb-6">
                      <FormTextarea
                        label="What are you working on?"
                        name="message"
                        placeholder="Tell us about your challenge, project, or what you're trying to figure out..."
                        testId="input-talk-message"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        color: "#F0EBD8",
                        backgroundColor: "#748CAB",
                        border: "none",
                        borderRadius: "8px",
                        padding: "1rem 2.5rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        width: "100%",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3E5C76"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#748CAB"; }}
                      data-testid="button-submit-talk"
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            <div style={{ height: "4rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
