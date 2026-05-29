import { useEffect, useState } from "react";
import BrainSvg from "./BrainSvg";

function LogoImg() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src="/official_logo.png"
      alt="CogPrint"
      className="w-9 h-9 rounded-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.35))" }}
      onError={() => setOk(false)}
    />
  );
}

const LINKS = [
  { label: "Mission",      href: "#c1" },
  { label: "Research",     href: "#c2" },
  { label: "How It Works", href: "#c3" },
  { label: "Technology",   href: "#c4" },
  { label: "Team",         href: "#c6" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cog-bg/90 backdrop-blur-md border-b border-cog-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — real PNG or SVG fallback */}
        <a href="#hero" className="flex items-center gap-3 group">
          <LogoImg />
          <span className="font-display font-bold text-lg tracking-tight">
            Cog<span className="text-cog-cyan" style={{ textShadow: "0 0 12px rgba(0,229,255,0.5)" }}>Print</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cog-muted hover:text-cog-cyan transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#c5"
            className="px-4 py-2 rounded-full text-sm font-semibold border border-cog-cyan text-cog-cyan hover:bg-cog-cyan hover:text-cog-bg transition-all"
          >
            Join Study
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-cog-muted hover:text-cog-cyan transition-colors"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cog-navy border-t border-cog-border px-6 py-4 space-y-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-cog-muted hover:text-cog-cyan transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
