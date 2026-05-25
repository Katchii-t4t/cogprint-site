import { useEffect, useRef, useState } from "react";

const TO = "cogprint888@gmail.com";

export default function JoinUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("visible", e.isIntersecting),
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Opens the user's mail client with a pre-filled message to cogprint888@gmail.com.
    // Replies come directly to the participant's own address — no backend needed.
    const subject = encodeURIComponent("CogPrint Study — Interest Registration");
    const body = encodeURIComponent(
      [
        `Name: ${name || "(not provided)"}`,
        `Email: ${email}`,
        institution ? `Institution: ${institution}` : null,
        "",
        "— Submitted via cogprint.org",
      ]
        .filter((l) => l !== null)
        .join("\n")
    );
    window.open(`mailto:${TO}?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section id="c5" className="section-full py-24 light-section">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 xl:pl-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="vertebra w-12 h-12 bg-gray-50 border border-cog-cyan flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-cog-cyan">C5</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cog-cyan tracking-widest mb-0.5">CERVICAL 5</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Join the Study</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — why join */}
          <div className="space-y-6">
            <p className="text-gray-500 text-lg leading-relaxed">
              We're recruiting participants for Phase 2 of the Cognitive Fingerprint Project.
              Join as a learner and help shape the future of personalized education.
            </p>

            <div className="space-y-3">
              {[
                { icon: "🧪", text: "Participate in a randomized controlled trial" },
                { icon: "🧠", text: "Discover your unique cognitive fingerprint" },
                { icon: "📈", text: "Get a personalized study plan based on your data" },
                { icon: "📚", text: "Contribute to open, youth-led research" },
                { icon: "🌍", text: "Be part of an international study" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-gray-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="light-card rounded-xl p-4 border-l-4 border-cog-cyan">
              <p className="text-xs text-gray-600">
                <span className="text-cog-cyan font-semibold">Time commitment:</span>{" "}
                3–5 study sessions per week, 30–60 minutes each, over 4 weeks.
                Quiz + retention checks included. All data anonymized.
              </p>
            </div>
          </div>

          {/* Right — sign up form */}
          <div className="light-card rounded-2xl p-7 shadow-xl shadow-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">You're in!</h3>
                <p className="text-gray-500 text-sm">
                  We'll be in touch with next steps. Your fingerprint journey begins soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-gray-900">Express interest</h3>
                <p className="text-xs text-gray-500">
                  Leave your email and we'll reach out when participant onboarding opens.
                </p>

                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cog-cyan focus:ring-1 focus:ring-cog-cyan/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cog-cyan focus:ring-1 focus:ring-cog-cyan/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Institution (optional)</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. University of Oslo"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cog-cyan focus:ring-1 focus:ring-cog-cyan/20 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cog-cyan text-white font-bold text-sm
                             hover:shadow-lg hover:shadow-cyan-200/60 hover:-translate-y-0.5 transition-all"
                >
                  Express Interest
                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  No commitment required. Data used only for research purposes.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
