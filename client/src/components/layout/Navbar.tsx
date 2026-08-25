import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNarrow } from "@/hooks/use-act-progress";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

/** how far down the bar the ground is sampled — inside it, not at its edge */
const PROBE = 26;

type Ground = { g: "dark" | "light"; bg: string; photo: boolean };

/**
 * WHICH GROUND IS UNDER THE BAR.
 *
 * The homepage changes ground colour underneath a fixed nav: navy, near-black,
 * bone, navy again. A bar that is white on navy disappears the moment the peak
 * pins, so it has to read what is beneath it and invert. Acts publish
 * `data-ground` and `data-bg` for exactly this (see Act.tsx).
 *
 * Returns null on any page that publishes no acts, and the bar keeps its
 * ordinary treatment there. That is deliberate rather than lazy: the scrim
 * below is painted in the CURRENT ACT'S colour, and on a page with no acts
 * there is no such colour to copy.
 *
 * THE BOX TO MEASURE IS THE STAGE, NOT THE SECTION. A pinned act's section is
 * 2.8 viewports tall but its bone stage is only ever one viewport of that — at
 * the section's tail the stage has already scrolled away and navy is showing,
 * and the bar would still be calling it bone. Where two stages overlap at a
 * seam, the LAST one in document order is the one painting on top.
 */
function useGround(pathname: string): Ground | null {
  const [ground, setGround] = useState<Ground | null>(null);
  const last = useRef<string>("");

  const paint = useCallback(() => {
    const acts = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-ground]"),
    );
    if (!acts.length) {
      last.current = "";
      setGround(null);
      return;
    }

    let g: "dark" | "light" = "dark";
    let bg = "#0C0A3E";
    for (const act of acts) {
      const box = (act.firstElementChild as HTMLElement) ?? act;
      const r = box.getBoundingClientRect();
      if (r.top <= PROBE && r.bottom > PROBE) {
        g = (act.dataset.ground as "dark" | "light") ?? "dark";
        bg = act.dataset.bg ?? "#0C0A3E";
      }
    }

    const photo = g === "light" && peakPhotoUnderBar();
    const key = `${g}|${bg}|${photo}`;
    if (key === last.current) return;
    last.current = key;
    setGround({ g, bg, photo });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [paint, pathname]);

  return ground;
}

/** how far across a wiping layer has travelled: inset(0 X% 0 0) reveals it from
 *  its left edge to (100-X)% across */
function revealedFraction(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  const m = cs.clipPath.match(/inset\([^ ]+ ([\d.]+)%/);
  if (m) return (100 - parseFloat(m[1])) / 100;
  return parseFloat(cs.opacity) > 0.5 ? 1 : 0;
}

/**
 * Is one of the peak's PHOTOGRAPHS under the bar, rather than its bone?
 *
 * The peak's light ground is bone at the intro and the convergence and a
 * full-bleed portrait in between. A navy wordmark disappears into dark hair and
 * struggles against a bright arch, so over a picture it goes back to white and
 * takes a shadow.
 *
 * Read off the DOM rather than plumbed through from Team.tsx, because the honest
 * question is not "which panel is showing" but "is there a photograph beneath
 * this pixel" — and a panel is only revealed as far as its clip has travelled,
 * so a panel showing at 12% has bone under a wordmark sitting at 5% of the
 * width and a portrait under one at 3%.
 */
function peakPhotoUnderBar(): boolean {
  const act = document.getElementById("act-peak");
  if (!act) return false;

  /* THE CONVERGENCE FIRST, AND THIS IS NOT AN OPTIMISATION.
     The peak's layers only ever RISE — a panel's clip opens and then stays
     open, and the three of them are covered by the convergence rather than
     closed. So at the end of the act all three portraits still report as fully
     revealed while what is actually on the screen is bone, and the wordmark
     spent the last quarter of the peak white-on-bone. */
  const all = act.querySelector<HTMLElement>('[data-testid="panel-shapers-all"]');
  if (all && revealedFraction(all) > 0.08) return false;

  const panels = Array.from(
    act.querySelectorAll<HTMLElement>('[data-testid^="panel-shaper-"]'),
  );

  for (const panel of panels) {
    const revealed = revealedFraction(panel);
    if (revealed <= 0) continue;

    const img = panel.querySelector("img");
    if (!img) continue;
    const r = img.getBoundingClientRect();
    if (r.top > PROBE || r.bottom <= PROBE) continue;
    /* the wordmark sits in the left gutter; if the picture reaches that far
       across and the wipe has uncovered it, there is a face under the mark */
    if (r.left <= 0.08 * window.innerWidth && revealed > 0.08) return true;
  }
  return false;
}

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const ground = useGround(location);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Our Story", href: "/our-story" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Join the collective", href: "/join" },
  ];

  const light = ground?.g === "light";
  const photo = ground?.photo ?? false;

  /* THE WORDMARK AND THE LINKS ARE ON DIFFERENT THINGS, and above 60rem they
     need opposite treatments. The peak's panel is a picture on the left and a
     bone column on the right, so with a portrait under the bar the mark is
     standing on a photograph and the links are standing on bone. Turning the
     whole bar white for the mark's sake made "Our Story / Team / Blog"
     invisible. Below 60rem the panel stacks and the portrait runs full width,
     so then it IS the whole bar. */
  const wide = !useNarrow(60);
  const inkOnPhoto = photo && !wide;
  const ink = light && !inkOnPhoto ? "#0C0A3E" : "#FFFFFF";

  return (
    <nav
      data-ground={ground?.g}
      data-peakphoto={photo ? "" : undefined}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 md:px-12 transition-colors duration-300",
        /* An act-scored page paints its own scrim below; anywhere else the bar
           keeps the treatment it has always had. */
        !ground &&
          (scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border py-2.5"
            : "bg-transparent border-b border-foreground/10"),
        ground && "border-b-0",
      )}
      style={
        ground
          ? {
              color: ink,
              textShadow: inkOnPhoto ? "0 1px 6px rgba(0,0,0,0.6)" : undefined,
            }
          : undefined
      }
    >
      {/* A SCRIM, NOT A BAR, AND PAINTED IN THE GROUND'S OWN COLOUR.
          Two things have to be true at once and they pull against each other:
          copy scrolling underneath must not read through the links, and the
          strip must not look like browser chrome bolted across a poster. A
          translucent scrim cannot do both — at the alpha that actually hides a
          paragraph it is a visibly darker band, because this page has four dark
          grounds and one bone one and the scrim only ever had one colour. So it
          copies the current act's background, fills opaquely, and a mask fades
          it out 44px below the bar. Nothing to see, and nothing readable
          through it. It comes off entirely over a portrait, where all it did
          was haze the top of somebody's photograph. */}
      {ground && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-44px] top-0 -z-10 transition-opacity duration-300"
          style={{
            backgroundColor: ground.bg,
            opacity: scrolled && !photo ? 1 : 0,
            WebkitMaskImage:
              "linear-gradient(#000 0%, #000 62%, rgba(0,0,0,0.5) 80%, transparent 100%)",
            maskImage:
              "linear-gradient(#000 0%, #000 62%, rgba(0,0,0,0.5) 80%, transparent 100%)",
          }}
        />
      )}

      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setLocation("/");
          window.scrollTo(0, 0);
        }}
        className="flex items-center gap-2"
      >
        <img
          src={logoImg}
          alt="Story Shapers"
          style={{
            height: "40px",
            width: "auto",
            transition: "filter 300ms ease",
            /* A bone HALO on the light ground rather than `filter: none`. On
               bone itself the halo is invisible; over the convergence
               thumbnails — which pass directly under the bar as the peak scrolls
               out on a phone — it is the only thing keeping a navy wordmark off
               a dark portrait. Over a full-bleed photograph the mark goes back
               to white and takes a shadow instead: invisible on the dark parts
               of a picture, and the only thing holding it up on the light. */
            filter: photo
              ? "invert(1) brightness(2) drop-shadow(0 1px 5px rgba(0,0,0,0.65))"
              : light
                ? "drop-shadow(0 0 3px rgba(244,241,234,0.95)) drop-shadow(0 1px 3px rgba(244,241,234,0.85))"
                : "invert(1) brightness(2)",
          }}
          data-testid="img-logo"
        />
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) =>
          link.href.startsWith("/") ? (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-100 opacity-80",
                !ground && "text-foreground",
              )}
              style={ground ? { color: "inherit" } : undefined}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-100 opacity-80",
                !ground && "text-foreground",
              )}
              style={ground ? { color: "inherit" } : undefined}
            >
              {link.name}
            </a>
          ),
        )}
      </div>

      <a
        href="/contact#talk"
        onClick={(e) => {
          e.preventDefault();
          setLocation("/contact");
          setTimeout(() => {
            const el = document.getElementById("talk");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }}
        className="hidden md:flex items-center justify-center px-6 py-2.5 rounded text-sm font-medium transition-colors bg-secondary text-white border border-secondary hover:bg-[#9B3E9A] hover:border-[#9B3E9A]"
      >
        Let's Talk
      </a>
    </nav>
  );
}
