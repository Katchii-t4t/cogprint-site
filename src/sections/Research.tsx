import { useEffect, useRef } from "react";

const PHASES: {
  num: string; label: string; duration: string; desc: string;
  active?: boolean; parallel?: boolean; done?: boolean;
}[] = [
  { num: "01", label: "Research Design",      duration: "1–2 mo",  desc: "Hypothesis, materials, pilot study, data collection setup", done: true },
  { num: "02", label: "Run the Study",         duration: "2–3 mo",  desc: "Recruit participants, multi-day testing, performance + biometric data", active: true },
  { num: "03", label: "Analysis & Report",     duration: "1–2 mo",  desc: "Statistical analysis, research paper, peer review" },
  { num: "04", label: "Prototype",             duration: "2–4 mo",  desc: "AI-powered personalization tool built from research findings", parallel: true },
  { num: "05", label: "Institutional Testing", duration: "6–12 mo", desc: "Validated across multiple institutions, outcome comparison" },
  { num: "06", label: "Scale & Launch",        duration: "6–18 mo", desc: "Public platform, open access, global deployment" },
];

export default function Research() {
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
    <section id="c2" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C2</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 2</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">The Research</h2>
          </div>
        </div>

        {/* Study design callout */}
        <div className="light-card rounded-2xl p-6 mb-10 border-l-4 border-cog-cyan">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Design",   value: "Randomized Controlled Trial" },
              { label: "Groups",   value: "Control  ·  Treatment"       },
              { label: "Metric",   value: "7-day retention (primary)"   },
              { label: "Analysis", value: "ANCOVA on pre/post scores"   },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[10px] font-mono text-gray-400 mb-1 tracking-widest uppercase">{s.label}</div>
                <div className="font-semibold text-gray-900 text-sm">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6-phase timeline */}
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">6-Phase Roadmap</h3>
        <div className="space-y-3">
          {PHASES.map((p) => (
            <div
              key={p.num}
              className={`light-card rounded-xl p-4 flex items-start gap-4 transition-all ${
                p.active   ? "border-l-4 border-cog-cyan shadow-md shadow-cyan-50" :
                p.parallel ? "border-l-4 border-purple-300" :
                p.done     ? "" :
                "opacity-60"
              }`}
            >
              <div className={`font-mono text-lg font-bold shrink-0 ${
                p.active   ? "text-cog-cyan"    :
                p.parallel ? "text-purple-400"  :
                p.done     ? "text-gray-300"    :
                "text-gray-200"
              }`}>
                {p.num}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-semibold text-sm ${
                    p.active || p.parallel ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {p.label}
                  </span>

                  {p.done && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-400 border border-gray-200">
                      ✓ COMPLETE
                    </span>
                  )}
                  {p.active && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cog-cyan border border-cog-cyan/30">
                      CURRENT
                    </span>
                  )}
                  {p.parallel && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-500 border border-purple-200">
                      IN PARALLEL
                    </span>
                  )}
                </div>

                <div className={`text-xs mt-0.5 ${
                  p.active || p.parallel ? "text-gray-500" : "text-gray-400"
                }`}>
                  {p.desc}
                </div>
              </div>

              <div className={`text-xs font-mono shrink-0 ${
                p.active || p.parallel ? "text-gray-500" : "text-gray-300"
              }`}>
                {p.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
