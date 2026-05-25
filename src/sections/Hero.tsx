import { useState } from "react";
import BrainSvg from "../components/BrainSvg";

export default function Hero() {
  const [sketchLoaded, setSketchLoaded] = useState(true);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Deep radial background */}
      <div className="absolute inset-0 bg-gradient-radial from-cog-purple-dark/30 via-cog-bg to-cog-bg" />

      {/* Subtle hex-grid texture */}
      <div className="absolute inset-0 hex-grid opacity-40" />

      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cog-cyan/20 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4  w-[600px] h-[600px] rounded-full bg-cog-purple/6  blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cog-cyan/4   blur-[120px] pointer-events-none" />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-12
                      flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

        {/* LEFT — text block */}
        <div className="flex-1 text-center lg:text-left lg:pr-12">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          border border-cog-border bg-cog-navy/50
                          text-[11px] font-mono text-cog-muted tracking-widest mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-cog-cyan animate-pulse" />
            INTERNATIONAL · YOUTH-LED · DATA DRIVEN
          </div>

          <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6">
            <span className="block text-[clamp(2.8rem,7vw,5.5rem)] text-white/90">
              Introducing
            </span>
            {/* Gradient CogPrint — cyan flows into purple */}
            <span
              className="block text-[clamp(3.5rem,9vw,7rem)]"
              style={{
                backgroundImage: "linear-gradient(120deg, #00E5FF 20%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(0,229,255,0.25))",
              }}
            >
              CogPrint
            </span>
          </h1>

          <p className="text-cog-muted text-lg leading-relaxed max-w-md mb-8">
            Individualized, evidence-based strategies for{" "}
            <em className="text-white/80 not-italic font-medium">cognitive optimization</em>{" "}
            and productive learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <a
              href="#c1"
              className="px-7 py-3 rounded-full bg-cog-cyan text-cog-bg font-bold text-sm
                         hover:shadow-[0_0_32px_rgba(0,229,255,0.35)] hover:-translate-y-0.5
                         transition-all duration-200"
            >
              Explore
            </a>
            <a
              href="#c5"
              className="px-7 py-3 rounded-full border border-white/15 text-white/70 font-semibold text-sm
                         hover:border-cog-cyan/50 hover:text-cog-cyan transition-all duration-200 hover:-translate-y-0.5"
            >
              Join the Study
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { v: "6",   l: "Phases"    },
              { v: "24",  l: "Members"   },
              { v: "11+", l: "Countries" },
              { v: "RCT", l: "Design"    },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display font-bold text-2xl text-cog-cyan">{s.v}</div>
                <div className="text-[11px] text-cog-muted mt-0.5 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — brain sketch + spine tail */}
        <div className="flex-shrink-0 relative flex items-center justify-center lg:w-[44%]">

          {/* Large static ambient glow — doesn't drift */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)",
              animation: "brain-aura-pulse 6s ease-in-out infinite",
              transform: "scale(1.6)",
            }}
          />

          {/* Floating brain */}
          <div
            className="relative"
            style={{ animation: "brain-drift 10s ease-in-out infinite" }}
          >
            {/* Brain image with pulsing halos */}
            <div className="relative w-64 sm:w-72 lg:w-80 xl:w-96">

              {/* Outer halo — cyan */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-3rem",
                  background: "radial-gradient(circle, rgba(0,229,255,0.13) 20%, transparent 68%)",
                  animation: "brain-aura-pulse 3.8s ease-in-out infinite",
                }}
              />
              {/* Inner halo — purple */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-1.5rem",
                  background: "radial-gradient(circle, rgba(124,58,237,0.15) 20%, transparent 70%)",
                  animation: "brain-aura-pulse 3.8s ease-in-out infinite 1.1s",
                }}
              />

              {sketchLoaded ? (
                <img
                  src="/brain-sketch.png"
                  alt="CogPrint neural network"
                  className="relative w-full h-auto"
                  onError={() => setSketchLoaded(false)}
                  style={{
                    filter:
                      "invert(1) " +
                      "drop-shadow(0 0 52px rgba(0,229,255,0.6)) " +
                      "drop-shadow(0 0 22px rgba(124,58,237,0.35)) " +
                      "drop-shadow(0 0 8px rgba(0,229,255,0.5))",
                    mixBlendMode: "screen",
                  }}
                />
              ) : (
                <BrainSvg className="relative w-full h-auto" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-mono tracking-[0.25em] text-cog-muted/40">SCROLL</span>
        <div className="spine-line w-px h-10" />
        <div className="w-1 h-1 rounded-full bg-cog-cyan/50 animate-bounce" />
      </div>
    </section>
  );
}
