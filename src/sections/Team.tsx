import { useEffect, useRef, useState } from "react";

type Category = "lead" | "tech" | "research" | "social";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "lead",     label: "Lead",         emoji: "🎯" },
  { id: "tech",     label: "Tech",         emoji: "💻" },
  { id: "research", label: "Research",     emoji: "🔬" },
  { id: "social",   label: "Social Media", emoji: "📱" },
];

// Light-mode tab colors
const TAB_ACTIVE: Record<Category, string> = {
  lead:     "border-cyan-400   text-cyan-700   bg-cyan-50",
  tech:     "border-blue-400   text-blue-700   bg-blue-50",
  research: "border-purple-400 text-purple-700 bg-purple-50",
  social:   "border-pink-400   text-pink-700   bg-pink-50",
};

// Light-mode role badge colors
const BADGE: Record<Category, string> = {
  lead:     "border-cyan-300   text-cyan-700   bg-cyan-50",
  tech:     "border-blue-300   text-blue-700   bg-blue-50",
  research: "border-purple-300 text-purple-700 bg-purple-50",
  social:   "border-pink-300   text-pink-700   bg-pink-50",
};

const TEAM: { name: string; country: string; flag: string; role?: string; cat: Category; badgeCat?: Category; founding?: boolean }[] = [
  // Lead
  { name: "Katchi S",      country: "Norway",     flag: "🇳🇴", role: "Project & Tech Lead",                  cat: "lead", badgeCat: "social" },
  { name: "Azeemah S",    country: "Bangladesh", flag: "🇧🇩", role: "Project Co-lead & Social Media Lead",   cat: "lead", badgeCat: "social" },
  // Tech
  { name: "Kevin N",       country: "Norway",     flag: "🇳🇴", role: "Data & Statistics",          cat: "tech"     },
  { name: "Rishi U",       country: "India",      flag: "🇮🇳", role: "Software Developer",         cat: "tech"     },
  // Research
  { name: "Aiman A",       country: "Pakistan",   flag: "🇵🇰", role: "Med Student (4th yr)",       cat: "research" },
  { name: "Saiyara S",     country: "Bangladesh", flag: "🇧🇩", role: "Design",                     cat: "social"   },
  { name: "Lycia M",       country: "Canada",     flag: "🇨🇦", role: "Medical School",             cat: "research" },
  { name: "Ayesha N",      country: "Pakistan",   flag: "🇵🇰", role: "Pre-Med · Research & Social", cat: "social"   },
  { name: "Elisa",         country: "Ghana",      flag: "🇬🇭", role: "Data Collection",            cat: "research" },
  { name: "Amna A",        country: "Sri Lanka",  flag: "🇱🇰", role: "Biomed (Uni)",               cat: "research", founding: true },
  { name: "Alia H",        country: "Malaysia",   flag: "🇲🇾",                                     cat: "research" },
  { name: "Anumta R",      country: "Pakistan",   flag: "🇵🇰",                                     cat: "research" },
  { name: "Tony W",        country: "China",      flag: "🇨🇳",                                     cat: "research" },
  { name: "Sambriddhi C",  country: "Nepal",      flag: "🇳🇵",                                     cat: "research", founding: true },
  { name: "Rameen S",      country: "Pakistan",   flag: "🇵🇰",                                     cat: "research" },
  { name: "Linda A",       country: "Iraq",       flag: "🇮🇶",                                     cat: "research" },
  { name: "Nava M",        country: "Canada",     flag: "🇨🇦",                                     cat: "research" },
  { name: "Stacy A",       country: "Jamaica",    flag: "🇯🇲",                                     cat: "research" },
  { name: "Sameeha A",     country: "Pakistan",   flag: "🇵🇰",                                     cat: "research" },
  { name: "Viana D",       country: "Canada",     flag: "🇨🇦", role: "Outreach Responsible",       cat: "research", founding: true },
  { name: "Lynn A",        country: "Saudi Arabia", flag: "🇸🇦",                                   cat: "research" },
  // Social Media — leads first
  { name: "Azeemah S",    country: "Bangladesh", flag: "🇧🇩", role: "Social Media Lead",           cat: "social"   },
  { name: "Tassnim CH",   country: "Morocco",    flag: "🇲🇦", role: "Social Media Co-lead",        cat: "social"   },
  { name: "Fardowsa A",   country: "United States of America", flag: "🇺🇸", role: "Marketing",     cat: "social"   },
  { name: "Rahma",         country: "Nigeria",    flag: "🇳🇬", role: "Content & Outreach",         cat: "social"   },
  { name: "Dagmawit A",   country: "Ethiopia",    flag: "🇪🇹",                                     cat: "social"   },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Category>("lead");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("visible", e.isIntersecting),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = TEAM.filter((m) => m.cat === active);

  // Continent mapping
  const continents = new Set(
    TEAM.filter((m) => m.flag).map((m) => {
      const asia     = ["🇵🇰","🇧🇩","🇲🇾","🇨🇳","🇮🇳","🇳🇵","🇮🇶","🇱🇰","🇸🇦"];
      const africa   = ["🇳🇬","🇬🇭","🇪🇹","🇲🇦"];
      const namerica = ["🇨🇦","🇺🇸","🇯🇲"];
      const europe   = ["🇳🇴"];
      if (asia.includes(m.flag))     return "Asia";
      if (africa.includes(m.flag))   return "Africa";
      if (namerica.includes(m.flag)) return "N. America";
      if (europe.includes(m.flag))   return "Europe";
      return "Other";
    })
  );

  return (
    <section id="c6" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        {/* Vertebra header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C6</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 6</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Meet the Team</h2>
          </div>
        </div>

        {/* Global stats */}
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { value: String(new Set(TEAM.map(m => m.name)).size),                                    label: "Members"    },
            { value: String(new Set(TEAM.filter(m => m.country).map(m => m.country)).size),         label: "Countries"  },
            { value: String(continents.size),                                                       label: "Continents" },
            { value: "Youth-Led",                                                                   label: "Identity"   },
          ].map((s) => (
            <div key={s.label} className="light-card rounded-xl px-5 py-3 text-center min-w-[90px]">
              <div className="font-display font-bold text-xl text-cog-cyan">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const count = TEAM.filter((m) => m.cat === cat.id).length;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  isActive
                    ? TAB_ACTIVE[cat.id] + " shadow-sm"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/60" : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Member grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((member) => (
            <div
              key={member.name}
              className="light-card rounded-xl p-4 flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              {/* Flag / avatar circle */}
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl mb-3">
                {member.flag || "🌐"}
              </div>
              <div className="font-semibold text-gray-900 text-sm leading-tight">{member.name}</div>
              {member.country && (
                <div className="text-xs text-gray-400 mt-0.5">{member.country}</div>
              )}
              {member.role && (
                <div className={`text-[10px] font-medium mt-2 px-2 py-0.5 rounded-full border ${BADGE[member.badgeCat ?? member.cat]}`}>
                  {member.role}
                </div>
              )}
              {member.founding && (
                <div className="text-[9px] font-semibold mt-1.5 px-2 py-0.5 rounded-full border border-amber-300 text-amber-700 bg-amber-50 tracking-wide">
                  ✦ Founding Member
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
