import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    agent: "Agent 1",
    title: "Analyze Material",
    color: "#4f6ef7",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
    desc: "Paste your learning material. CogPrint builds a structured knowledge map — every concept tagged by type, difficulty, and connections.",
    tags: ["Factual", "Conceptual", "Procedural", "Difficulty rating"],
  },
  {
    num: "02",
    agent: "Agent 2",
    title: "Build Your Fingerprint",
    color: "#00B4CC",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    desc: "Log each study session. Over time, the system correlates technique, sleep, stress, and timing with your retention scores — building a unique cognitive profile.",
    tags: ["Pearson r correlations", "7-day retention", "Spaced repetition", "Pattern detection"],
    highlight: true,
  },
  {
    num: "03",
    agent: "Agent 3",
    title: "Personalized Plan",
    color: "#7c3aed",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    desc: "Get a day-by-day study schedule built specifically for you — the right technique, the right time of day, the right session length — driven by your own data.",
    tags: ["Day-by-day schedule", "Your optimal timing", "Technique matching", "Spaced repetition"],
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("visible", e.isIntersecting),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="c3" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C3</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 3</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          </div>
        </div>

        <p className="text-gray-500 text-lg mb-10 max-w-2xl">
          Three AI agents working in sequence — from raw material to personalized schedule.
          Generic on day 1. Fully tailored by week 4.
        </p>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line between cards (desktop) */}
          <div className="hidden md:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-[#4f6ef7] via-[#00B4CC] to-[#7c3aed] opacity-20" />

          {STEPS.map((s) => (
            <div
              key={s.num}
              className={`light-card rounded-2xl p-6 relative transition-all hover:-translate-y-1 ${
                s.highlight ? "border-[#00B4CC]/40 shadow-lg" : ""
              }`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-cog-cyan text-white">
                  CORE ALGORITHM
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}20` }}
                >
                  {s.icon}
                </div>
                <span className="font-mono text-2xl font-bold" style={{ color: `${s.color}18` }}>
                  {s.num}
                </span>
              </div>

              <div className="text-[10px] font-mono font-semibold mb-1" style={{ color: s.color }}>
                {s.agent}
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                    style={{
                      borderColor: `${s.color}22`,
                      color: `${s.color}aa`,
                      background: `${s.color}08`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progression callout */}
        <div className="mt-8 light-card rounded-xl p-5 flex flex-wrap items-center gap-4">
          <div className="text-2xl">📈</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">The system gets smarter every session</p>
            <p className="text-xs text-gray-500 mt-1">
              Confidence levels:{" "}
              <span className="text-gray-400">Generic</span>
              <span className="text-gray-300 mx-2">→</span>
              <span className="text-amber-500 font-medium">Learning your patterns</span>
              <span className="text-gray-300 mx-2">→</span>
              <span className="font-semibold" style={{ color: "#00B4CC" }}>Fully personalized</span>
              <span className="text-gray-400 ml-2">(unlocks after 16 sessions)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
