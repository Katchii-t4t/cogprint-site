// Animated SVG neural network — abstract neurons connecting like the image
// Used as background for NeuralInterlude section

// All coordinates in a 100×56 viewBox (≈ 16:9 screen ratio)
const NEURONS = [
  // top band
  { id: 0,  x: 7,   y: 9,   r: 2.2, s: 3  },
  { id: 1,  x: 20,  y: 4,   r: 1.4, s: 11 },
  { id: 2,  x: 33,  y: 13,  r: 3.0, s: 5  },
  { id: 3,  x: 51,  y: 6,   r: 1.8, s: 17 },
  { id: 4,  x: 65,  y: 14,  r: 2.6, s: 2  },
  { id: 5,  x: 80,  y: 7,   r: 1.5, s: 8  },
  { id: 6,  x: 93,  y: 12,  r: 2.0, s: 14 },
  // middle band
  { id: 7,  x: 3,   y: 28,  r: 1.6, s: 9  },
  { id: 8,  x: 17,  y: 24,  r: 2.9, s: 6  },
  { id: 9,  x: 30,  y: 33,  r: 1.4, s: 13 },
  { id: 10, x: 46,  y: 27,  r: 3.3, s: 1  },
  { id: 11, x: 61,  y: 35,  r: 1.8, s: 15 },
  { id: 12, x: 75,  y: 26,  r: 2.5, s: 4  },
  { id: 13, x: 89,  y: 31,  r: 1.7, s: 10 },
  // bottom band
  { id: 14, x: 11,  y: 46,  r: 1.8, s: 7  },
  { id: 15, x: 27,  y: 51,  r: 1.4, s: 16 },
  { id: 16, x: 43,  y: 47,  r: 2.7, s: 12 },
  { id: 17, x: 58,  y: 53,  r: 1.5, s: 20 },
  { id: 18, x: 72,  y: 48,  r: 2.1, s: 19 },
  { id: 19, x: 87,  y: 51,  r: 1.6, s: 5  },
] as const;

// Pre-compute axon connections between nearby neurons
const AXON_DIST = 28;
const AXONS = (() => {
  const out: { x1: number; y1: number; x2: number; y2: number; idx: number }[] = [];
  let idx = 0;
  for (let i = 0; i < NEURONS.length; i++) {
    for (let j = i + 1; j < NEURONS.length; j++) {
      const a = NEURONS[i], b = NEURONS[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < AXON_DIST) {
        out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, idx: idx++ });
      }
    }
  }
  return out;
})();

// Generate dendritic process paths for one neuron
function dendrites(n: { x: number; y: number; r: number; s: number }): string[] {
  const arms = 5 + (n.s % 3); // 5–7 arms
  const paths: string[] = [];

  for (let i = 0; i < arms; i++) {
    const angle = (i / arms) * Math.PI * 2 + n.s * 0.38;
    const len = n.r * 2.8 + ((n.s * 2 + i * 3) % 9) * 0.8;

    // Slight Bezier curve for organic feel
    const perpAngle = angle + Math.PI / 2;
    const bend = ((n.s * 3 + i * 5) % 9 - 4) * 0.45;
    const cpx = n.x + Math.cos(angle) * len * 0.5 + Math.cos(perpAngle) * bend;
    const cpy = n.y + Math.sin(angle) * len * 0.5 + Math.sin(perpAngle) * bend;
    const ex  = n.x + Math.cos(angle) * len;
    const ey  = n.y + Math.sin(angle) * len;

    paths.push(
      `M${n.x},${n.y} Q${cpx.toFixed(2)},${cpy.toFixed(2)} ${ex.toFixed(2)},${ey.toFixed(2)}`
    );

    // Fork at the tip (alternating arms)
    if ((n.s + i) % 2 === 0) {
      const bl = len * 0.38;
      paths.push(`M${ex.toFixed(2)},${ey.toFixed(2)} L${(ex + Math.cos(angle + 0.42) * bl).toFixed(2)},${(ey + Math.sin(angle + 0.42) * bl).toFixed(2)}`);
      paths.push(`M${ex.toFixed(2)},${ey.toFixed(2)} L${(ex + Math.cos(angle - 0.42) * bl).toFixed(2)},${(ey + Math.sin(angle - 0.42) * bl).toFixed(2)}`);
    }
  }

  return paths;
}

interface Props {
  className?: string;
}

export default function NeuralNetworkBg({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* ── Axon connections ── */}
      {AXONS.map((ax) => (
        <line
          key={ax.idx}
          x1={ax.x1} y1={ax.y1}
          x2={ax.x2} y2={ax.y2}
          stroke="rgba(0,229,255,0.18)"
          strokeWidth="0.22"
          strokeDasharray="3 14"
          style={{
            animationName: "neural-signal",
            animationDuration: `${5 + (ax.idx % 7) * 1.3}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: `${(ax.idx * 0.85) % 7}s`,
          }}
        />
      ))}

      {/* ── Neurons ── */}
      {NEURONS.map((n) => (
        <g key={n.id}>
          {/* Dendritic processes */}
          {dendrites(n).map((d, j) => (
            <path
              key={j}
              d={d}
              stroke="rgba(0,200,216,0.24)"
              strokeWidth="0.14"
              strokeLinecap="round"
            />
          ))}

          {/* Soma outer glow */}
          <circle
            cx={n.x} cy={n.y}
            r={n.r * 1.8}
            fill="rgba(0,229,255,0.04)"
          />

          {/* Soma body */}
          <circle
            cx={n.x} cy={n.y}
            r={n.r}
            fill="rgba(0,200,216,0.1)"
            stroke="rgba(0,229,255,0.6)"
            strokeWidth="0.18"
            style={{
              animationName: "neural-soma-pulse",
              animationDuration: `${3.2 + (n.s % 5) * 0.7}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${(n.s * 0.45) % 4}s`,
            }}
          />

          {/* Nucleus dot */}
          <circle
            cx={n.x} cy={n.y}
            r={n.r * 0.32}
            fill="rgba(0,229,255,0.8)"
          />
        </g>
      ))}
    </svg>
  );
}
