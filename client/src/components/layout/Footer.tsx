import { Link, useLocation } from "wouter";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";
import { CONTACT, mailto } from "@/lib/contact";

const NAVY = "#0C0A3E";
const MONO = "ui-monospace, monospace";

/**
 * The site footer.
 *
 * What it replaced was a centred logo, the email, and a copyright line — which
 * put the same address 240px under the close, where the close had just printed
 * it. Two prints of one address, one of them with nothing else around it, reads
 * as an accident rather than as a footer.
 *
 * This is a footer's actual job: where else to go. The close is the invitation;
 * this is the map. The address appears once more here, but now inside a column
 * of things you can do rather than on its own as a repeat.
 *
 * ON EVERY PAGE, NOT JUST THE HOMEPAGE. It began as home-only, which left
 * /our-story, /blog, /join, /contact and every article ending in nothing at all
 * — and on a phone, where the bar had no menu either, that was a page with no
 * way off it.
 *
 * Which makes the in-page links the one thing to be careful about. "The
 * Shapers" and "The work" are acts on the homepage rather than routes of their
 * own, so they are `#act-peak` while you are standing on it and `/#act-peak`
 * when you are not. Home reads that hash on arrival — see pages/home.tsx.
 */
export function Footer() {
  const [location] = useLocation();
  const onHome = location === "/";
  /* a bare hash scrolls; a hash on a path navigates first and then scrolls */
  const act = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <footer
      data-ground="dark"
      data-bg={NAVY}
      style={{
        backgroundColor: NAVY,
        color: "#FFFFFF",
        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
      className="px-[clamp(1.5rem,5vw,5rem)] pt-[clamp(3rem,8vh,5.5rem)] pb-[clamp(2rem,5vh,3rem)]"
      data-testid="footer"
    >
      <div className="mx-auto w-full max-w-[78rem]">
        {/* One column on a phone. Two 150px columns at 375px could not hold
            hello@storyshaperscollective.com, which ran straight off the right
            of the screen — and a footer is exactly where a long address is
            most likely to be the widest thing on the page. */}
        <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={logoImg}
              alt="The Story Shapers"
              style={{ height: "30px", width: "auto", filter: "invert(1) brightness(2)" }}
              data-testid="img-footer-logo"
            />
            <p
              className="mt-[1.4rem] mb-0 max-w-[24rem]"
              style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" }}
            >
              A senior-led, full-service marketing collective. You work with the
              people who do the work.
            </p>
          </div>

          <div>
            <K>The site</K>
            <ul className="m-0 grid list-none gap-[0.6rem] p-0">
              <Item href="/our-story">Our Story</Item>
              <Item href={act("act-peak")}>The Shapers</Item>
              <Item href={act("act-proof")}>The work</Item>
              <Item href="/blog">Blog</Item>
              <Item href="/join">Join the collective</Item>
            </ul>
          </div>

          <div>
            <K>Start something</K>
            <ul className="m-0 grid list-none gap-[0.6rem] p-0">
              <Item href={mailto}>{CONTACT.email}</Item>
              <Item href={act("act-close")}>Tell us your story</Item>
            </ul>
          </div>
        </div>

        <div
          className="mt-[clamp(2.5rem,6vh,4rem)] flex flex-wrap justify-between gap-x-[1.4rem] gap-y-[0.6rem] pt-[1.4rem]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.52)",
          }}
        >
          <span>© 2026 The Story Shapers</span>
          <span>Shaped in India, read everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

function K({ children }: { children: string }) {
  return (
    <div
      className="mb-4"
      style={{
        fontFamily: MONO,
        fontSize: "0.66rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      {children}
    </div>
  );
}

function Item({ href, children }: { href: string; children: string }) {
  const style = {
    color: "rgba(255,255,255,0.84)",
    textDecoration: "none",
    fontSize: "0.94rem",
    /* `anywhere`, not `break-word`. The address is one unbreakable token, and a
       grid track sizes itself to its MIN-CONTENT — which under break-word is
       still the whole string, so the column refused to shrink and the email ran
       off the right of a 768px screen. `anywhere` is the one value that also
       lowers min-content. */
    overflowWrap: "anywhere",
  } as const;
  const className = "transition-colors duration-200 hover:text-[#cf81cd]";

  /* wouter for real routes, a plain anchor for the in-page ones and mailto —
     routing "#act-peak" through the router navigates to a path that does not
     exist and the reader lands on a 404 instead of three screens up */
  const internal = href.startsWith("/");

  return (
    <li className="min-w-0">
      {internal ? (
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      ) : (
        <a href={href} className={className} style={style}>
          {children}
        </a>
      )}
    </li>
  );
}
