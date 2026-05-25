// Fallback SVG when brain-sketch.png is absent.
// Looks like the pen-drawn brain+tree sketch: organic brain with sulci,
// twin brainstem strands, and spreading root branches below.

export default function BrainSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="bsvgGlow" cx="50%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.04" />
        </radialGradient>
        <linearGradient id="bsvgStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.80" />
        </linearGradient>
        <linearGradient id="bsvgHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#4f6ef7" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id="bsvgStem" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.20" />
        </linearGradient>
        <filter id="bsvgSoftGlow">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient fill glow behind brain */}
      <ellipse cx="100" cy="80" rx="80" ry="68" fill="url(#bsvgGlow)" />

      {/* ── Brain outer outline (asymmetric, organic hemisphere) ── */}
      <path
        d="M26 96
           C20 64, 28 32, 54 20
           C68 13, 84 16, 100 17
           C116 16, 132 13, 146 20
           C172 32, 180 64, 174 96
           C178 120, 164 144, 146 154
           C130 162, 115 164, 100 164
           C85 164, 70 162, 54 154
           C36 144, 22 120, 26 96 Z"
        stroke="url(#bsvgStroke)"
        strokeWidth="1.6"
        fill="rgba(6,11,26,0.72)"
        filter="url(#bsvgSoftGlow)"
      />

      {/* ── Interhemispheric fissure (medial longitudinal) ── */}
      <path
        d="M100 17 C99 38, 100 62, 100 88 Q100 108, 100 118"
        stroke="rgba(0,229,255,0.22)"
        strokeWidth="0.9"
      />

      {/* ── Left hemisphere sulci (organic curves, NOT hexagons) ── */}
      <path d="M58 34 C64 44, 62 60, 56 72"
        stroke="rgba(0,229,255,0.28)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M36 62 C52 56, 65 68, 60 85"
        stroke="rgba(0,229,255,0.20)" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M30 90 C46 84, 62 92, 58 110"
        stroke="rgba(0,229,255,0.18)" strokeWidth="0.65" strokeLinecap="round" />
      <path d="M76 25 C78 38, 76 52, 70 65"
        stroke="rgba(0,229,255,0.22)" strokeWidth="0.65" strokeLinecap="round" />
      <path d="M52 110 C62 116, 78 120, 90 118"
        stroke="rgba(0,229,255,0.16)" strokeWidth="0.6" strokeLinecap="round" />

      {/* ── Right hemisphere sulci ── */}
      <path d="M142 34 C136 44, 138 60, 144 72"
        stroke="rgba(0,229,255,0.28)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M164 62 C148 56, 135 68, 140 85"
        stroke="rgba(0,229,255,0.20)" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M170 90 C154 84, 138 92, 142 110"
        stroke="rgba(0,229,255,0.18)" strokeWidth="0.65" strokeLinecap="round" />
      <path d="M124 25 C122 38, 124 52, 130 65"
        stroke="rgba(0,229,255,0.22)" strokeWidth="0.65" strokeLinecap="round" />
      <path d="M148 110 C138 116, 122 120, 110 118"
        stroke="rgba(0,229,255,0.16)" strokeWidth="0.6" strokeLinecap="round" />

      {/* ── Hexagonal cell clusters — CogPrint brand identity ── */}
      {/* Center hex */}
      <polygon
        points="100,50 115,58 115,74 100,82 85,74 85,58"
        stroke="#00E5FF" strokeWidth="1.1"
        fill="rgba(0,229,255,0.06)"
        filter="url(#bsvgSoftGlow)"
      />
      {/* Top-left hex */}
      <polygon
        points="73,42 88,50 88,66 73,74 58,66 58,50"
        stroke="url(#bsvgHexGrad)" strokeWidth="0.9"
        fill="rgba(79,110,247,0.05)"
      />
      {/* Top-right hex */}
      <polygon
        points="127,42 142,50 142,66 127,74 112,66 112,50"
        stroke="url(#bsvgHexGrad)" strokeWidth="0.9"
        fill="rgba(79,110,247,0.05)"
      />
      {/* Bottom-left hex */}
      <polygon
        points="73,74 88,82 88,98 73,106 58,98 58,82"
        stroke="url(#bsvgHexGrad)" strokeWidth="0.9"
        fill="rgba(0,229,255,0.04)"
      />
      {/* Bottom-right hex */}
      <polygon
        points="127,74 142,82 142,98 127,106 112,98 112,82"
        stroke="url(#bsvgHexGrad)" strokeWidth="0.9"
        fill="rgba(0,229,255,0.04)"
      />
      {/* Bottom-center hex */}
      <polygon
        points="100,82 115,90 115,106 100,114 85,106 85,90"
        stroke="#00E5FF" strokeWidth="0.9"
        fill="rgba(0,229,255,0.05)"
        filter="url(#bsvgSoftGlow)"
      />

      {/* ── Wispy dendritic filaments — left edge ── */}
      <path d="M40 58  Q22 50, 10 42" stroke="rgba(0,229,255,0.35)" strokeWidth="0.55" />
      <path d="M33 78  Q16 72,  6 67" stroke="rgba(0,229,255,0.26)" strokeWidth="0.45" />
      <path d="M34 98  Q18 95,  8 88" stroke="rgba(0,229,255,0.20)" strokeWidth="0.40" />
      <path d="M40 118 Q24 120, 14 114" stroke="rgba(124,58,237,0.28)" strokeWidth="0.40" />
      {/* sub-branches */}
      <path d="M10 42 Q5 38, 2 33"  stroke="rgba(0,229,255,0.16)" strokeWidth="0.30" />
      <path d="M10 42 Q6 46, 3 50"  stroke="rgba(0,229,255,0.13)" strokeWidth="0.30" />
      <path d="M 6 67 Q2 64, 0 60"  stroke="rgba(0,229,255,0.14)" strokeWidth="0.28" />
      <path d="M 8 88 Q3 86, 0 82"  stroke="rgba(0,229,255,0.12)" strokeWidth="0.28" />

      {/* ── Wispy dendritic filaments — right edge ── */}
      <path d="M160 58  Q178 50, 190 42" stroke="rgba(0,229,255,0.35)" strokeWidth="0.55" />
      <path d="M167 78  Q184 72, 194 67" stroke="rgba(0,229,255,0.26)" strokeWidth="0.45" />
      <path d="M166 98  Q182 95, 192 88" stroke="rgba(0,229,255,0.20)" strokeWidth="0.40" />
      <path d="M160 118 Q176 120, 186 114" stroke="rgba(124,58,237,0.28)" strokeWidth="0.40" />
      <path d="M190 42 Q195 38, 198 33" stroke="rgba(0,229,255,0.16)" strokeWidth="0.30" />
      <path d="M194 67 Q198 64, 200 60" stroke="rgba(0,229,255,0.14)" strokeWidth="0.28" />

      {/* ── Brainstem — twin organic strands ── */}
      <path
        d="M92 164 Q88 178, 90 192 Q92 206, 90 218 Q88 230, 90 244"
        stroke="url(#bsvgStem)" strokeWidth="2.0"
        strokeLinecap="round" filter="url(#bsvgSoftGlow)"
      />
      <path
        d="M108 164 Q112 178, 110 192 Q108 206, 110 218 Q112 230, 110 244"
        stroke="url(#bsvgStem)" strokeWidth="2.0"
        strokeLinecap="round" filter="url(#bsvgSoftGlow)"
      />
      {/* Central weave between strands */}
      <path
        d="M100 164 Q96 174, 100 184 Q104 194, 100 204 Q96 214, 100 224 Q104 234, 100 244"
        stroke="rgba(0,229,255,0.38)" strokeWidth="0.9"
      />

      {/* ── Root branches spreading from brainstem base ── */}
      {/* Far left root */}
      <path d="M91 244 Q72 254, 54 264 Q40 272, 28 278"
        stroke="url(#bsvgStem)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Near left root */}
      <path d="M91 244 Q82 256, 75 266 Q70 274, 66 280"
        stroke="rgba(0,229,255,0.50)" strokeWidth="1.0" strokeLinecap="round" />
      {/* Center root */}
      <path d="M100 246 Q99 258, 98 270 Q97 276, 96 284"
        stroke="url(#bsvgStem)" strokeWidth="1.5" strokeLinecap="round"
        filter="url(#bsvgSoftGlow)"
      />
      {/* Near right root */}
      <path d="M109 244 Q118 256, 125 266 Q130 274, 134 280"
        stroke="rgba(0,229,255,0.50)" strokeWidth="1.0" strokeLinecap="round" />
      {/* Far right root */}
      <path d="M109 244 Q128 254, 146 264 Q160 272, 172 278"
        stroke="url(#bsvgStem)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Fine root tip filaments */}
      <path d="M28 278 Q20 281, 14 284" stroke="rgba(0,229,255,0.22)" strokeWidth="0.5" />
      <path d="M66 280 Q60 283, 55 286" stroke="rgba(0,229,255,0.18)" strokeWidth="0.4" />
      <path d="M172 278 Q180 281, 186 284" stroke="rgba(0,229,255,0.22)" strokeWidth="0.5" />
      <path d="M134 280 Q140 283, 145 286" stroke="rgba(0,229,255,0.18)" strokeWidth="0.4" />

      {/* Neural endpoint dots */}
      {(
        [[10,42],[6,67],[8,88],[14,114],
         [190,42],[194,67],[192,88],[186,114]] as [number,number][]
      ).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.0} fill="#00E5FF" opacity={0.55} />
      ))}
    </svg>
  );
}
