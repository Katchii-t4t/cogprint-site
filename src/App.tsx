import { useState } from "react";
import Navbar from "./components/Navbar";
import SpineNav from "./components/SpineNav";
import Hero from "./sections/Hero";
import Mission from "./sections/Mission";
import Research from "./sections/Research";
import HowItWorks from "./sections/HowItWorks";
import Technology from "./sections/Technology";
import JoinUs from "./sections/JoinUs";
import Team from "./sections/Team";
import NeuralInterlude from "./components/NeuralInterlude";
import NerveNetworkFooter from "./components/NerveNetworkFooter";

function FooterLogo() {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="w-10 h-10 rounded-full border border-cog-border bg-cog-card
                      flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-cog-cyan">CP</span>
      </div>
    );
  }
  return (
    <img
      src="/logo.png"
      alt="CogPrint"
      className="w-10 h-10 rounded-full object-cover opacity-80 shrink-0"
      onError={() => setOk(false)}
    />
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-cog-navy py-12 px-6">
      <div className="max-w-5xl mx-auto xl:pl-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <FooterLogo />
            <div>
              <div className="font-display font-bold text-cog-text">
                Cog<span className="text-cog-cyan">Print</span>
              </div>
              <div className="text-xs text-cog-muted mt-0.5">
                International Research · Youth-Led · Data Driven
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-cog-muted">
            {["Mission", "Research", "How It Works", "Technology", "Join Us"].map((label, i) => (
              <a
                key={label}
                href={`#c${i + 1}`}
                className="hover:text-cog-cyan transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Spine roots decoration */}
        <div className="flex justify-center mt-10 mb-6 opacity-30">
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            <path d="M60 0 Q45 10, 30 25 Q18 35, 8 40"  stroke="#00E5FF" strokeWidth="1.5" />
            <path d="M60 0 Q52 12, 45 25 Q40 33, 38 40" stroke="#00E5FF" strokeWidth="1" />
            <path d="M60 0 Q60 14, 60 30 Q60 36, 60 40" stroke="#00E5FF" strokeWidth="2" />
            <path d="M60 0 Q68 12, 75 25 Q80 33, 82 40" stroke="#00E5FF" strokeWidth="1" />
            <path d="M60 0 Q75 10, 90 25 Q102 35, 112 40" stroke="#00E5FF" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="text-center text-xs text-cog-muted">
          © {new Date().getFullYear()} The Cognitive Fingerprint Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-cog-bg">
      <Navbar />
      <SpineNav />
      <Hero />

      {/* ── Gradient bridge: dark hero → light sections ── */}
      <div
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, #060B1A 0%, #0e1e35 18%, #1e3a55 38%, #4a6878 58%, #8fa5b0 78%, #E5E7EB 100%)",
        }}
      />

      {/* ── Light content sections ── */}
      <div className="bg-[#E5E7EB]">
        <Mission />
        <Research />
      </div>

      {/* ── Cinematic interlude — neuron image full screen ── */}
      <NeuralInterlude />

      {/* ── More light content sections ── */}
      <div className="bg-[#E5E7EB]">
        <HowItWorks />
        <Technology />
        <JoinUs />
        <Team />
      </div>

      <NerveNetworkFooter />

      <Footer />
    </div>
  );
}
