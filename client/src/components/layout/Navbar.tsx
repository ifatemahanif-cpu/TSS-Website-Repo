import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Our Story", href: "/our-story" },
    { name: "Join the collective", href: "/join" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 md:px-12 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-2.5" : "bg-transparent border-b border-foreground/10"
    )}>
      <Link href="/" className="flex items-center gap-2">
        <img
          src={logoImg}
          alt="Story Shapers"
          style={{
            height: "40px",
            width: "auto",
            filter: "invert(1) brightness(2)",
          }}
          data-testid="img-logo"
        />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          link.href.startsWith("/") ? (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-100 opacity-80 text-foreground"
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-100 opacity-80 text-foreground"
            >
              {link.name}
            </a>
          )
        ))}
      </div>

      <a
        href="/contact#talk"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/contact#talk";
        }}
        className="hidden md:flex items-center justify-center px-6 py-2.5 rounded text-sm font-medium transition-colors bg-secondary text-white border border-secondary hover:bg-[#9B3E9A] hover:border-[#9B3E9A]"
      >
        Let's Talk
      </a>
    </nav>
  );
}
