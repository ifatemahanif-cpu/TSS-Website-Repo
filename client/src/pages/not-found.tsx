import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const NAVY = "#0C0A3E";

/**
 * 404.
 *
 * What was here was the starter template's: a grey card, a red warning icon,
 * and the line "Did you forget to add the page to the router?" — a question
 * addressed to a developer, shown to whoever had just mistyped a URL or
 * followed a dead link out of a search result. It was also the only page on the
 * site in none of the site's own colours or typefaces.
 *
 * The footer is the point of this page rather than decoration on it. Somebody
 * who lands here asked for something specific and did not get it, so the useful
 * response is the map, not an apology.
 */
export default function NotFound() {
  return (
    <div style={{ backgroundColor: NAVY }} className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-8 pb-[clamp(4rem,10vh,7rem)] pt-[clamp(7rem,18vh,11rem)]">
        <div className="w-full max-w-[36rem] text-center">
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              color: "#cf81cd",
              margin: 0,
            }}
          >
            404
          </p>
          <h1
            className="mt-[1.2rem] mb-0"
            style={{
              fontFamily: "'Zodiak', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              textWrap: "balance",
            }}
            data-testid="text-404-heading"
          >
            That page isn't here.
          </h1>
          <p
            className="mx-auto mt-[1.4rem] mb-0 max-w-[26rem]"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "1.02rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            The link may be wrong, or the page may have moved since it was
            written.
          </p>
          <Link
            href="/"
            className="mt-[2.2rem] inline-flex min-h-12 items-center gap-[0.6rem] rounded-full px-[2rem] py-[1.05rem] no-underline transition-colors duration-200 hover:bg-[#e0a0de] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
            style={{
              backgroundColor: "#cf81cd",
              color: NAVY,
              fontFamily: "'Switzer', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
            data-testid="link-404-home"
          >
            Back to the homepage <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
