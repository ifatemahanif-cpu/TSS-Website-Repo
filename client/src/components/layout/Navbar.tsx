import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Our Story", href: "/our-story" },
    { name: "The Collective Model", href: "/collective-model" },
    { name: "Join the collective", href: "/join" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 md:px-12 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-2.5" : "bg-transparent border-b border-foreground/10"
    )}>
      <Link href="/" className="flex items-center gap-2">
        <span className={cn(
          "font-serif font-bold text-xl tracking-tight transition-colors text-foreground"
        )}>
          Story Shapers
        </span>
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
        href="#"
        className="hidden md:flex items-center justify-center px-6 py-2.5 border rounded text-sm font-medium transition-colors border-secondary text-secondary hover:bg-secondary hover:text-white"
      
      >
        Let's Talk
      </a>
    </nav>
  );
}
