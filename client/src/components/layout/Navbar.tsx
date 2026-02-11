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
    { name: "Our Story", href: "#" },
    { name: "The Collective Model", href: "#" },
    { name: "Join the collective", href: "#" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent border-b border-white/10"
    )}>
      <div className="flex items-center gap-2">
        <span className={cn(
          "font-serif font-bold text-xl tracking-tight transition-colors",
          scrolled ? "text-foreground" : "text-white"
        )}>
          Story Shapers
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:opacity-100 opacity-80",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            {link.name}
          </a>
        ))}
      </div>

      <a
        href="#"
        className={cn(
          "hidden md:flex items-center justify-center px-6 py-2.5 border rounded text-sm font-medium transition-colors",
          scrolled 
            ? "border-foreground text-foreground hover:bg-foreground hover:text-background" 
            : "border-white/30 text-white hover:bg-white hover:text-primary"
        )}
      >
        Let's Talk
      </a>
    </nav>
  );
}
