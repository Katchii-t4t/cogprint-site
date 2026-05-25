import { useEffect, useRef } from "react";

const SIGNALS = [
  { label: "Study technique",    icon: "📚", desc: "7 techniques tracked: active recall, spaced repetition, interleaving, and more" },
  { label: "Sleep quality",      icon: "😴", desc: "Hours of sleep correlated with next-day retention scores (Pearson r)" },
  { label: "Stress level",       icon: "🧠", desc: "Self-reported 1–5 scale, correlated with performance outcomes" },
  { label: "Time of day",        icon: "🕐", desc: "Morning / afternoon / evening / night performance comparison" },
  { label: "Session duration",   icon: "⏱",  desc: "Optimal session length identified from your own performance data" },
  { label: "24h & 7d retention", icon: "📊", desc: "The primary metric — measures true learning, not just short-term recall" },
];

export default function Technology() {
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
    <section id="c4" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C4</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 4</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Technology</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — fingerprint concept */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                The Cognitive Fingerprint
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Like a fingerprint, every person's cognitive profile is unique. CogPrint maps yours
                by tracking six key signals across every study session — then uses AI to synthesize
                patterns invisible to the human eye.
              </p>
            </div>

            {/* Dark code block — standard for technical/academic pages */}
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs space-y-2">
              <div className="text-gray-400 text-[10px] mb-3 tracking-widest uppercase">
                Sample Fingerprint Output
              </div>
              {[
                { key: "confidence",          val: '"high"',          color: "text-green-400"  },
                { key: "best_technique",      val: '"active_recall"', color: "text-cyan-400"   },
                { key: "7d_retention_avg",    val: "0.84",            color: "text-cyan-400"   },
                { key: "optimal_time",        val: '"morning"',       color: "text-purple-400" },
                { key: "sleep_score_r",       val: "+0.71",           color: "text-green-400"  },
                { key: "stress_score_r",      val: "-0.58",           color: "text-red-400"    },
                { key: "improving_over_time", val: "true",            color: "text-green-400"  },
              ].map(({ key, val, color }) => (
                <div key={key} className="flex gap-2">
                  <span className="text-gray-500">{key}:</span>
                  <span className={color}>{val}</span>
                </div>
              ))}
            </div>

            {/* AI stack */}
            <div>
              <div className="text-[10px] font-mono text-gray-400 mb-3 tracking-widest uppercase">
                Powered By
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Claude Opus 4.7",    sub: "Core reasoning"         },
                  { label: "Claude Sonnet 4.6",  sub: "Material analysis"      },
                  { label: "Adaptive Thinking",  sub: "Deep pattern synthesis" },
                  { label: "Structured Outputs", sub: "Validated JSON"         },
                ].map((t) => (
                  <div key={t.label} className="light-card px-3 py-2 rounded-lg">
                    <div className="text-xs font-semibold text-gray-900">{t.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — signals grid */}
          <div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
              What We Measure
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SIGNALS.map((s) => (
                <div
                  key={s.label}
                  className="light-card rounded-xl p-4 hover:border-cog-cyan/30 hover:shadow-md transition-all cursor-default"
                >
                  <div className="text-xl mb-2">{s.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{s.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
