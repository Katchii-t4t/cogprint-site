import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "c1", label: "C1", title: "Mission",      jewel: "#1E5CAA", glow: "rgba(30,92,170,0.6)"   },
  { id: "c2", label: "C2", title: "Research",     jewel: "#6B3FA0", glow: "rgba(107,63,160,0.6)"  },
  { id: "c3", label: "C3", title: "How It Works", jewel: "#1A8C72", glow: "rgba(26,140,114,0.6)"  },
  { id: "c4", label: "C4", title: "Technology",   jewel: "#B87820", glow: "rgba(184,120,32,0.6)"  },
  { id: "c5", label: "C5", title: "Join Us",      jewel: "#A01A4A", glow: "rgba(160,26,74,0.6)"   },
  { id: "c6", label: "C6", title: "Team",         jewel: "#5C2D7A", glow: "rgba(92,45,122,0.6)"   },
];

export default function SpineNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-0">
      {/* Top connector */}
      <div className="spine-line w-px h-8" />

      {SECTIONS.map((s, i) => {
        const isActive = active === s.id;
        return (
          <div key={s.id} className="flex flex-col items-center">
            <a href={`#${s.id}`} className="group flex items-center gap-3">

              {/* Vertebra hex — jewel tone when active */}
              <div
                className="vertebra w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-500"
                style={
                  isActive
                    ? {
                        background: s.jewel,
                        boxShadow: `0 0 18px ${s.glow}, 0 0 36px ${s.glow.replace("0.6", "0.25")}`,
                        border: `1px solid ${s.jewel}`,
                      }
                    : {
                        background: "rgba(13,22,40,0.8)",
                        border: "1px solid rgba(0,229,255,0.12)",
                      }
                }
              >
                <span
                  className="font-mono text-[10px] font-bold transition-colors duration-300"
                  style={{ color: isActive ? "#ffffff" : s.jewel }}
                >
                  {s.label}
                </span>
              </div>

              {/* Side label — slides in on hover / active */}
              <span
                className="text-xs font-medium whitespace-nowrap transition-all duration-300"
                style={{
                  color: isActive ? s.jewel : "#94a3b8",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-8px)",
                }}
              >
                {s.title}
              </span>
            </a>

            {/* Connector between vertebrae */}
            {i < SECTIONS.length - 1 && (
              <div
                className="w-px h-10 transition-all duration-700"
                style={{
                  background: isActive
                    ? `linear-gradient(to bottom, ${s.jewel}80, ${SECTIONS[i + 1].jewel}40)`
                    : "linear-gradient(to bottom, rgba(0,229,255,0.15), rgba(0,229,255,0.05))",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Bottom connector */}
      <div className="spine-line w-px h-8" />

      {/* Root endings */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M10 0 Q6 8, 2 16 Q0 20, 1 24"    stroke="rgba(92,45,122,0.4)"  strokeWidth="1" />
        <path d="M10 0 Q10 10, 10 24"               stroke="rgba(0,200,216,0.5)"  strokeWidth="1.5" />
        <path d="M10 0 Q14 8, 18 16 Q20 20, 19 24" stroke="rgba(30,92,170,0.4)"  strokeWidth="1" />
      </svg>
    </div>
  );
}
