// Cathedral rose window SVG — stained glass aesthetic for CogPrint hero
// Inspired by Gothic tracery + Art Nouveau botanical ornament

const C = 250; // SVG center (500×500 viewBox)

function pt(r: number, deg: number): [number, number] {
  const rad = (deg - 90) * (Math.PI / 180);
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)];
}

// Annular segment (donut slice) path
function seg(r1: number, r2: number, a1: number, a2: number): string {
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r1, a2);
  const [x3, y3] = pt(r2, a2);
  const [x4, y4] = pt(r2, a1);
  const lg = a2 - a1 >= 180 ? 1 : 0;
  return `M${x1} ${y1} A${r1} ${r1} 0 ${lg} 1 ${x2} ${y2} L${x3} ${y3} A${r2} ${r2} 0 ${lg} 0 ${x4} ${y4}Z`;
}

// Jewel-tone palette — stained glass cathedral colours
// Muted and luminous, not neon
const J = [
  "#1E4A8C", // deep sapphire
  "#5C2D7A", // amethyst
  "#1A7A6A", // jade teal
  "#A05C20", // amber/bronze
  "#8C1A4A", // ruby rose
  "#1A3C8C", // cobalt blue
  "#6B3A9C", // violet
  "#1A6B4A", // emerald
];

// Lead-line colour (dark grout between glass panes)
const LEAD = "#0D0814";

interface Props {
  className?: string;
}

export default function RoseWindow({ className = "" }: Props) {
  const N = 8;
  const step = 360 / N;

  // Build spoke endpoints for radial lead lines
  const spokes = Array.from({ length: N * 2 }, (_, i) => {
    const [x1, y1] = pt(62, i * (step / 2));
    const [x2, y2] = pt(208, i * (step / 2));
    return { x1, y1, x2, y2, thick: i % 2 === 0 };
  });

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Central radial glow — the light source inside the window */}
        <radialGradient id="rw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.25" />
          <stop offset="45%"  stopColor="#5C2D7A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Subtle drop-shadow filter for lead lines */}
        <filter id="rw-lead-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Ambient background glow ── */}
      <circle cx={C} cy={C} r={240} fill="url(#rw-glow)" />

      {/* ══════════════════════════════════
          LAYER 1 — Outer petal lobes
          (small circles around the perimeter, like the petite roses
           at the edge of a cathedral window)
      ══════════════════════════════════ */}
      {Array.from({ length: N }, (_, i) => {
        const [px, py] = pt(213, i * step);
        return (
          <circle
            key={`petal-${i}`}
            cx={px} cy={py} r={23}
            fill={J[i]} fillOpacity={0.55}
            stroke={LEAD} strokeWidth={1.5}
          />
        );
      })}

      {/* Small accent circles between petals (Gothic foils) */}
      {Array.from({ length: N }, (_, i) => {
        const [px, py] = pt(210, i * step + step / 2);
        return (
          <circle
            key={`foil-${i}`}
            cx={px} cy={py} r={10}
            fill={J[(i + 4) % N]} fillOpacity={0.45}
            stroke={LEAD} strokeWidth={1.2}
          />
        );
      })}

      {/* ══════════════════════════════════
          LAYER 2 — Outer ring (r 175–207)
          8 main segments
      ══════════════════════════════════ */}
      {Array.from({ length: N }, (_, i) => (
        <path
          key={`outer-${i}`}
          d={seg(207, 175, i * step + 1.5, (i + 1) * step - 1.5)}
          fill={J[(i + 2) % N]} fillOpacity={0.48}
          stroke={LEAD} strokeWidth={1.5}
        />
      ))}

      {/* ══════════════════════════════════
          LAYER 3 — Middle ring (r 128–172)
          16 segments (double density)
      ══════════════════════════════════ */}
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={`mid-${i}`}
          d={seg(172, 128, i * 22.5 + 1, (i + 1) * 22.5 - 1)}
          fill={J[i % N]} fillOpacity={0.42}
          stroke={LEAD} strokeWidth={1.5}
        />
      ))}

      {/* ══════════════════════════════════
          LAYER 4 — Inner ring (r 62–125)
          8 segments — largest visible panes
      ══════════════════════════════════ */}
      {Array.from({ length: N }, (_, i) => (
        <path
          key={`inner-${i}`}
          d={seg(125, 62, i * step + 2, (i + 1) * step - 2)}
          fill={J[(i + 5) % N]} fillOpacity={0.52}
          stroke={LEAD} strokeWidth={1.5}
        />
      ))}

      {/* ══════════════════════════════════
          STRUCTURAL — Ring borders (lead came circles)
      ══════════════════════════════════ */}
      {[238, 210, 207, 175, 172, 128, 125, 62, 59].map((r) => (
        <circle
          key={`ring-${r}`}
          cx={C} cy={C} r={r}
          stroke={LEAD} strokeWidth={r === 238 ? 2 : 1.4}
        />
      ))}

      {/* ══════════════════════════════════
          STRUCTURAL — Radial spokes (lead ribs)
      ══════════════════════════════════ */}
      {spokes.map((s, i) => (
        <line
          key={`spoke-${i}`}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke={LEAD} strokeWidth={s.thick ? 1.5 : 1}
        />
      ))}

      {/* ══════════════════════════════════
          LAYER 5 — Centre medallion
          (the heart of the window)
      ══════════════════════════════════ */}
      {/* Quadrant fills */}
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={`quad-${i}`}
          d={seg(57, 0, i * 90 + 2, (i + 1) * 90 - 2)}
          fill={J[i * 2]} fillOpacity={0.6}
          stroke={LEAD} strokeWidth={1.2}
        />
      ))}
      {/* Centre ring */}
      <circle cx={C} cy={C} r={22}
        fill="#00C8D8" fillOpacity={0.7}
        stroke={LEAD} strokeWidth={1.5} />
      {/* Cross lines through centre */}
      {[0, 90].map((a) => {
        const [x1, y1] = pt(57, a);
        const [x2, y2] = pt(57, a + 180);
        return <line key={`cross-${a}`} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={LEAD} strokeWidth={1.5} />;
      })}
      {/* Centre dot — like the oculus */}
      <circle cx={C} cy={C} r={8}
        fill="#00E5FF" fillOpacity={0.9}
        stroke={LEAD} strokeWidth={1} />

      {/* ══════════════════════════════════
          DECORATIVE — Outer tracery joints
          Small circles at the intersection of spokes + outer ring
          (like the bosses in Gothic vaulting)
      ══════════════════════════════════ */}
      {Array.from({ length: N }, (_, i) => {
        const [px, py] = pt(238, i * step + step / 2);
        return (
          <circle key={`boss-${i}`} cx={px} cy={py} r={3.5}
            fill={LEAD} />
        );
      })}
      {Array.from({ length: N }, (_, i) => {
        const [px, py] = pt(238, i * step);
        return (
          <circle key={`boss2-${i}`} cx={px} cy={py} r={5}
            fill={LEAD} />
        );
      })}
    </svg>
  );
}
