import { Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { INSTAGRAM_URL, LINKEDIN_URL, SITE_URL } from "@/lib/offer-config";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-navy-deep px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <a href={SITE_URL} target="_blank" rel="noreferrer" className="shrink-0">
          <img
            src="/images/tss-logo-white.webp"
            alt="The Story Shapers"
            width={640}
            height={167}
            className="h-9 w-auto opacity-90 transition-opacity hover:opacity-100 sm:h-11"
          />
        </a>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
          <nav className="flex items-center gap-8 text-[14px]">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              Home
            </a>
            <Link
              href="/offer/terms"
              className="text-white/70 transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="The Story Shapers on Instagram"
              className="grid size-10 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-magenta-lift/60 hover:text-white"
            >
              <Instagram aria-hidden className="size-[17px]" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="The Story Shapers on LinkedIn"
              className="grid size-10 place-items-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-magenta-lift/60 hover:text-white"
            >
              <Linkedin aria-hidden className="size-[17px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
