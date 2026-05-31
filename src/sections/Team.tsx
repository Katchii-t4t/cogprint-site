import { useEffect, useRef, useState } from "react";

type Category = "lead" | "tech" | "research" | "outreach" | "social";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "lead",     label: "Lead",         emoji: "🎯" },
  { id: "tech",     label: "Tech",         emoji: "💻" },
  { id: "research", label: "Research",     emoji: "🔬" },
  { id: "outreach", label: "Outreach",     emoji: "🌐" },
  { id: "social",   label: "Social Media", emoji: "📱" },
];

// Active tab pill colors
const TAB_ACTIVE: Record<Category, string> = {
  lead:     "border-cyan-400   text-cyan-700   bg-cyan-50",
  tech:     "border-blue-400   text-blue-700   bg-blue-50",
  research: "border-purple-400 text-purple-700 bg-purple-50",
  outreach: "border-teal-400   text-teal-700   bg-teal-50",
  social:   "border-pink-400   text-pink-700   bg-pink-50",
};

// Featured leader card accent border
const FEATURED_BORDER: Record<Category, string> = {
  lead:     "border-cyan-300",
  tech:     "border-blue-300",
  research: "border-purple-300",
  outreach: "border-teal-300",
  social:   "border-pink-300",
};

// Role badge colors
const BADGE: Record<Category, string> = {
  lead:     "border-cyan-300   text-cyan-700   bg-cyan-50",
  tech:     "border-blue-300   text-blue-700   bg-blue-50",
  research: "border-purple-300 text-purple-700 bg-purple-50",
  outreach: "border-teal-300   text-teal-700   bg-teal-50",
  social:   "border-pink-300   text-pink-700   bg-pink-50",
};

type TeamMember = {
  name: string;
  country: string;
  flag: string;
  role?: string;
  cat: Category;
  badgeCat?: Category;
  founding?: boolean;
  featured?: boolean; // true = leader card shown at top of tab
};

const TEAM: TeamMember[] = [
  // ── Lead ─────────────────────────────────────────────────────────────
  { name: "Katchi S",      country: "Norway",                   flag: "🇳🇴", role: "Project & Tech Lead",                cat: "lead",     badgeCat: "tech",   featured: true },
  { name: "Azeemah S",     country: "Bangladesh",               flag: "🇧🇩", role: "Project Co-lead & Social Media Lead", cat: "lead",     badgeCat: "social", featured: true },

  // ── Tech ──────────────────────────────────────────────────────────────
  { name: "Katchi S",      country: "Norway",                   flag: "🇳🇴", role: "Tech Lead",           cat: "tech",                     featured: true },
  { name: "Kevin N",       country: "Norway",                   flag: "🇳🇴", role: "Data & Statistics",   cat: "tech" },
  { name: "Rishi U",       country: "India",                    flag: "🇮🇳", role: "Software Developer",  cat: "tech" },

  // ── Research ──────────────────────────────────────────────────────────
  { name: "Aiman A",       country: "Pakistan",                 flag: "🇵🇰", role: "Med Student (4th yr)",                cat: "research" },
  { name: "Lycia M",       country: "Canada",                   flag: "🇨🇦", role: "Medical School",                      cat: "research" },
  { name: "Elisa",         country: "Ghana",                    flag: "🇬🇭", role: "Data Collection",                     cat: "research" },
  { name: "Amna A",        country: "Sri Lanka",                flag: "🇱🇰", role: "Biomed (Uni)",                        cat: "research", founding: true },
  { name: "Alia H",        country: "Malaysia",                 flag: "🇲🇾",                                              cat: "research" },
  { name: "Anumta R",      country: "Pakistan",                 flag: "🇵🇰",                                              cat: "research" },
  { name: "Sambriddhi C",  country: "Nepal",                    flag: "🇳🇵",                                              cat: "research", founding: true },
  { name: "Rameen S",      country: "Pakistan",                 flag: "🇵🇰",                                              cat: "research" },
  { name: "Linda A",       country: "Iraq",                     flag: "🇮🇶",                                              cat: "research" },
  { name: "Nava M",        country: "Canada",                   flag: "🇨🇦",                                              cat: "research" },
  { name: "Stacy A",       country: "Jamaica",                  flag: "🇯🇲",                                              cat: "research" },
  { name: "Sameeha A",     country: "Pakistan",                 flag: "🇵🇰",                                              cat: "research" },
  { name: "Lynn A",        country: "Saudi Arabia",             flag: "🇸🇦",                                              cat: "research" },

  // ── Outreach ──────────────────────────────────────────────────────────
  { name: "Viana D",       country: "Canada",                   flag: "🇨🇦", role: "Outreach Lead",      cat: "outreach", founding: true, featured: true },
  { name: "Tony W",        country: "China",                    flag: "🇨🇳", role: "Outreach Co-lead",   cat: "outreach",                featured: true },

  // ── Social Media ──────────────────────────────────────────────────────
  { name: "Azeemah S",     country: "Bangladesh",               flag: "🇧🇩", role: "Social Media Lead",            cat: "social",  featured: true },
  { name: "Tassnim CH",    country: "Morocco",                  flag: "🇲🇦", role: "Social Media Co-lead",         cat: "social",  featured: true },
  { name: "Saiyara S",     country: "Bangladesh",               flag: "🇧🇩", role: "Design",                       cat: "social" },
  { name: "Ayesha N",      country: "Pakistan",                 flag: "🇵🇰", role: "Pre-Med · Research & Social",  cat: "social" },
  { name: "Fardowsa A",    country: "United States of America", flag: "🇺🇸", role: "Marketing",                    cat: "social" },
  { name: "Rahma",         country: "Nigeria",                  flag: "🇳🇬", role: "Content & Outreach",           cat: "social" },
  { name: "Dagmawit A",    country: "Ethiopia",                 flag: "🇪🇹",                                       cat: "social" },
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
  const leaders  = filtered.filter((m) => m.featured);
  const members  = filtered.filter((m) => !m.featured);

  // Continent stats
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
            { value: String(new Set(TEAM.map(m => m.name)).size),                                label: "Members"    },
            { value: String(new Set(TEAM.filter(m => m.country).map(m => m.country)).size),     label: "Countries"  },
            { value: String(continents.size),                                                   label: "Continents" },
            { value: "Youth-Led",                                                               label: "Identity"   },
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
            const count = new Set(TEAM.filter((m) => m.cat === cat.id).map(m => m.name)).size;
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

        {/* Tab content — key triggers remount → CSS fades it in smoothly */}
        <div key={active} className="team-tab-in" style={{ minHeight: "280px" }}>

          {/* ── Featured leaders (centered at top) ── */}
          {leaders.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {leaders.map((member) => (
                <div
                  key={member.name + "-leader"}
                  className={`light-card rounded-xl p-5 flex flex-col items-center text-center border-2 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all ${FEATURED_BORDER[active]}`}
                  style={{ width: "11rem" }}
                >
                  <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-3xl mb-3">
                    {member.flag || "🌐"}
                  </div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">{member.name}</div>
                  {member.country && (
                    <div className="text-xs text-gray-400 mt-0.5">{member.country}</div>
                  )}
                  {member.role && (
                    <div className={`text-[10px] font-semibold mt-2 px-2 py-0.5 rounded-full border ${BADGE[member.badgeCat ?? member.cat]}`}>
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
          )}

          {/* ── Divider between leaders and rest ── */}
          {leaders.length > 0 && members.length > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Team</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          )}

          {/* ── Regular member grid ── */}
          {members.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="light-card rounded-xl p-4 flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
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
          )}

        </div>

      </div>
    </section>
  );
}
