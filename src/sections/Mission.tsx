import { useEffect, useRef } from "react";

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("visible", e.isIntersecting),
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="c1" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        {/* Vertebra label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C1</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 1</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Our Mission</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-gray-500 text-lg leading-relaxed">
              Every brain is different. Yet education treats all learners the same — the same techniques,
              the same schedules, the same one-size-fits-all approach.
            </p>
            <p className="text-gray-700 leading-relaxed">
              CogPrint is changing that. We're building the world's first evidence-based system to map
              individual cognitive patterns — then use those patterns to fundamentally personalize how
              people learn.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Not based on learning style myths. Based on real data: quiz performance, retention over
              days and weeks, sleep, stress, session length, time of day — all measured, all correlated,
              all feeding into a growing picture of{" "}
              <span className="text-cog-cyan font-medium">your unique cognitive fingerprint</span>.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🔬", title: "Evidence-Based", desc: "Every recommendation grounded in your own performance data" },
              { icon: "🌍", title: "International",  desc: "Youth-led research spanning multiple institutions"          },
              { icon: "🔒", title: "Privacy-First",  desc: "All participant data anonymized and ethically handled"      },
              { icon: "📖", title: "Open Research",  desc: "Findings published and freely available to the community"  },
            ].map((v) => (
              <div
                key={v.title}
                className="light-card rounded-xl p-4 hover:border-cog-cyan/40 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">{v.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{v.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
