import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const links = [
    { name: "Our Story", href: "#" },
    { name: "The Collective Model", href: "#" },
    { name: "Join the collective", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12 bg-transparent text-white/90">
      <div className="flex items-center gap-2">
        <div className="size-6 bg-white/20 rounded-sm backdrop-blur-sm border border-white/30" />
        <span className="font-display font-bold text-xl tracking-tight text-white">
          Story Shapers
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium hover:text-white transition-colors opacity-80 hover:opacity-100"
          >
            {link.name}
          </a>
        ))}
      </div>

      <a
        href="#"
        className="hidden md:flex items-center justify-center px-6 py-2.5 border border-white/20 rounded text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
      >
        Let's Talk
      </a>
    </nav>
  );
}
