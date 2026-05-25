import { useEffect, useRef } from "react";

// ── Quadratic-bezier helpers ──────────────────────────────────────────────────
function qb(t: number, p0: number, p1: number, p2: number) {
  const mt = 1 - t;
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2;
}
function bright(r: number, g: number, b: number): [number, number, number] {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < 70) {
    const s = 70 / Math.max(lum, 1);
    return [Math.min(255, (r * s) | 0), Math.min(255, (g * s) | 0), Math.min(255, (b * s) | 0)];
  }
  return [r, g, b];
}

// ── Flags ─────────────────────────────────────────────────────────────────────
const FLAGS = [
  { emoji: "🇳🇴", name: "Norway"     },
  { emoji: "🇧🇩", name: "Bangladesh" },
  { emoji: "🇮🇳", name: "India"      },
  { emoji: "🇵🇰", name: "Pakistan"   },
  { emoji: "🇨🇦", name: "Canada"     },
  { emoji: "🇬🇭", name: "Ghana"      },
  { emoji: "🇱🇰", name: "Sri Lanka"  },
  { emoji: "🇲🇾", name: "Malaysia"   },
  { emoji: "🇨🇳", name: "China"      },
  { emoji: "🇲🇦", name: "Morocco"    },
  { emoji: "🇳🇵", name: "Nepal"      },
  { emoji: "🇮🇶", name: "Iraq"       },
  { emoji: "🇯🇲", name: "Jamaica"    },
  { emoji: "🇺🇸", name: "USA"        },
  { emoji: "🇳🇬", name: "Nigeria"    },
  { emoji: "🇪🇹", name: "Ethiopia"   },
];

const FW = 200, FH = 120;

function drawFlag(ctx: CanvasRenderingContext2D, emoji: string) {
  ctx.clearRect(0, 0, FW, FH);
  const fill = (c: string, x = 0, y = 0, w = FW, h = FH) => {
    ctx.fillStyle = c; ctx.fillRect(x, y, w, h);
  };
  const hbands = (...cols: string[]) =>
    cols.forEach((c, i) => fill(c, 0, (i / cols.length) * FH, FW, FH / cols.length));
  const vbands = (...cols: string[]) =>
    cols.forEach((c, i) => fill(c, (i / cols.length) * FW, 0, FW / cols.length, FH));
  const disc = (c: string, cx: number, cy: number, r: number) => {
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  };

  switch (emoji) {
    case "🇳🇴":
      fill("#EF2B2D");
      fill("#FFFFFF", FW * 6 / 22, 0, FW * 3 / 22, FH);
      fill("#FFFFFF", 0, FH * 6.5 / 16, FW, FH * 3 / 16);
      fill("#003087", FW * 7 / 22, 0, FW * 1 / 22, FH);
      fill("#003087", 0, FH * 7.5 / 16, FW, FH * 1 / 16);
      break;
    case "🇧🇩":
      fill("#006A4E"); disc("#F42A41", FW * 0.45, FH * 0.5, FH * 0.3); break;
    case "🇮🇳":
      hbands("#FF9933", "#FFFFFF", "#138808");
      ctx.strokeStyle = "#000080"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(FW / 2, FH / 2, FH * 0.13, 0, Math.PI * 2); ctx.stroke();
      break;
    case "🇵🇰":
      fill("#FFFFFF", 0, 0, FW * 0.25, FH); fill("#01411C", FW * 0.25, 0, FW * 0.75, FH); break;
    case "🇨🇦":
      fill("#FF0000", 0, 0, FW * 0.25, FH);
      fill("#FFFFFF", FW * 0.25, 0, FW * 0.5, FH);
      fill("#FF0000", FW * 0.75, 0, FW * 0.25, FH);
      break;
    case "🇬🇭":
      hbands("#CE1126", "#FCD116", "#006B3F"); disc("#000000", FW / 2, FH / 2, FH * 0.12); break;
    case "🇱🇰":
      fill("#8D153A"); fill("#FF8000", 0, 0, FW * 0.11, FH); fill("#006A4E", FW * 0.11, 0, FW * 0.11, FH); break;
    case "🇲🇾":
      for (let i = 0; i < 14; i++)
        fill(i % 2 === 0 ? "#CC0001" : "#FFFFFF", 0, (i / 14) * FH, FW, FH / 14);
      fill("#010066", 0, 0, FW * 0.5, FH * 0.5);
      disc("#FFCC00", FW * 0.22, FH * 0.25, FH * 0.12);
      break;
    case "🇨🇳":
      fill("#DE2910"); disc("#FFDE00", FW * 0.13, FH * 0.25, FH * 0.2); break;
    case "🇲🇦":
      fill("#C1272D");
      ctx.strokeStyle = "#006233"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(FW / 2, FH / 2, FH * 0.24, 0, Math.PI * 2); ctx.stroke();
      break;
    case "🇳🇵":
      fill("#003893");
      fill("#DC143C", FW * 0.05, FH * 0.05, FW * 0.55, FH * 0.9);
      fill("#FFFFFF", FW * 0.06, FH * 0.06, FW * 0.4, FH * 0.07);
      break;
    case "🇮🇶":
      hbands("#CE1126", "#FFFFFF", "#000000");
      fill("#007A3D", FW * 0.35, FH * 0.36, FW * 0.3, FH * 0.28);
      break;
    case "🇯🇲":
      fill("#000000");
      ctx.strokeStyle = "#FED100"; ctx.lineWidth = FH * 0.35;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(FW, FH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(FW, 0); ctx.lineTo(0, FH); ctx.stroke();
      ctx.fillStyle = "#007B3B";
      ctx.beginPath(); ctx.moveTo(0,0);  ctx.lineTo(FW,0);  ctx.lineTo(FW/2,FH/2); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0,FH); ctx.lineTo(FW,FH); ctx.lineTo(FW/2,FH/2); ctx.closePath(); ctx.fill();
      break;
    case "🇺🇸":
      for (let i = 0; i < 13; i++)
        fill(i % 2 === 0 ? "#B22234" : "#FFFFFF", 0, (i / 13) * FH, FW, FH / 13);
      fill("#3C3B6E", 0, 0, FW * 0.4, FH * 0.54);
      disc("#FFFFFF", FW * 0.1, FH * 0.14, FH * 0.06);
      break;
    case "🇳🇬": vbands("#008751", "#FFFFFF", "#008751"); break;
    case "🇪🇹":
      hbands("#078930", "#FCDD09", "#DA121A"); disc("#1D5FAF", FW / 2, FH / 2, FH * 0.22); break;
    default: fill("#00E5FF");
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
type NNode  = { x: number; y: number; adj: number[] };
type NEdge  = { i: number; j: number; cpx: number; cpy: number; mx: number; my: number };
type Stub   = { x0: number; y0: number; cpx: number; cpy: number; x1: number; y1: number };
type Signal = { from: number; to: number; ei: number; t: number; speed: number };
type Burst  = { x: number; y: number; age: number; r: number; g: number; b: number };

// ── Component ─────────────────────────────────────────────────────────────────
export default function NerveNetworkFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current!;   // non-null: effect only runs after mount
    if (!cv) return;
    const ctx = cv.getContext("2d")!;

    // Offscreen canvas 1: flag colour sampling
    const flagCv  = document.createElement("canvas");
    flagCv.width  = FW; flagCv.height = FH;
    const flagCtx = flagCv.getContext("2d")!;
    let flagPx: Uint8ClampedArray | null = null;

    // Offscreen canvas 2: pre-rendered static network (dim bg) — draw once per build
    const bgCv  = document.createElement("canvas");
    let bgCtx: CanvasRenderingContext2D;

    let raf = 0, prev = 0, fi = -1;
    let nodes:   NNode[]  = [];
    let edges:   NEdge[]  = [];
    let stubs:   Stub[]   = [];
    let eMap     = new Map<string, number>();
    let eAlpha:  Float32Array = new Float32Array(0);

    let signals:  Signal[] = [];
    let bursts:   Burst[]  = [];
    let activated = new Set<number>();
    let pending   = new Set<number>();
    let waveDone  = false, waveTimer = 0;
    let labelAlpha = 0, labelFading = false;

    // ── Colour sampling ───────────────────────────────────────────────────────
    function sample(x: number, y: number): [number, number, number] {
      if (!flagPx) return [0, 229, 255];
      const fx = Math.min(FW - 1, Math.max(0, (x / cv.width  * FW) | 0));
      const fy = Math.min(FH - 1, Math.max(0, (y / cv.height * FH) | 0));
      const i  = (fy * FW + fx) * 4;
      if (flagPx[i + 3] < 10) return [0, 229, 255];
      return bright(flagPx[i], flagPx[i + 1], flagPx[i + 2]);
    }

    function bakeFlag() {
      drawFlag(flagCtx, FLAGS[fi].emoji);
      flagPx = flagCtx.getImageData(0, 0, FW, FH).data;
    }

    // ── Pre-render static dim background ─────────────────────────────────────
    function renderBg() {
      bgCv.width = cv.width; bgCv.height = cv.height;
      bgCtx = bgCv.getContext("2d")!;
      bgCtx.lineCap = "round";

      // Dendritic stubs (thinnest, dimmest)
      bgCtx.strokeStyle = "rgba(0,229,255,0.045)";
      bgCtx.lineWidth   = 0.45;
      for (const s of stubs) {
        bgCtx.beginPath();
        bgCtx.moveTo(s.x0, s.y0);
        bgCtx.quadraticCurveTo(s.cpx, s.cpy, s.x1, s.y1);
        bgCtx.stroke();
      }

      // Main axon edges
      bgCtx.strokeStyle = "rgba(0,229,255,0.08)";
      bgCtx.lineWidth   = 0.7;
      for (const e of edges) {
        bgCtx.beginPath();
        bgCtx.moveTo(nodes[e.i].x, nodes[e.i].y);
        bgCtx.quadraticCurveTo(e.cpx, e.cpy, nodes[e.j].x, nodes[e.j].y);
        bgCtx.stroke();
      }

      // Node soma dots
      bgCtx.fillStyle = "rgba(0,229,255,0.14)";
      for (const n of nodes) {
        bgCtx.beginPath();
        bgCtx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        bgCtx.fill();
      }
    }

    // ── Build network + dendritic stubs ───────────────────────────────────────
    function build() {
      const W = cv.width, H = cv.height;
      nodes = []; edges = []; stubs = []; eMap = new Map();

      // Main node grid
      const count = Math.max(44, (W * H / 5200) | 0);
      const cols  = Math.round(Math.sqrt(count * W / H));
      const rows  = Math.ceil(count / cols);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: (c + 0.5) / cols * W + (Math.random() - 0.5) * W / cols * 0.82,
            y: (r + 0.5) / rows * H + (Math.random() - 0.5) * H / rows * 0.82,
            adj: [],
          });
        }
      }

      // Axon edges with bezier bends
      const maxD  = Math.min(W / 4.5, 165);
      const maxD2 = maxD * maxD;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          if (dx * dx + dy * dy >= maxD2) continue;
          nodes[a].adj.push(b); nodes[b].adj.push(a);

          const len  = Math.sqrt(dx * dx + dy * dy);
          const mx   = (nodes[a].x + nodes[b].x) / 2;
          const my   = (nodes[a].y + nodes[b].y) / 2;
          const px   = -dy / len, py = dx / len;
          const bend = (Math.random() * 2 - 1) * len * 0.24;
          const cpx  = mx + px * bend;
          const cpy  = my + py * bend;
          const ei   = edges.length;
          eMap.set(`${a},${b}`, ei); eMap.set(`${b},${a}`, ei);
          // Precompute midpoint on the bezier curve (saves qb() call every frame)
          edges.push({
            i: a, j: b, cpx, cpy,
            mx: qb(0.5, nodes[a].x, cpx, nodes[b].x),
            my: qb(0.5, nodes[a].y, cpy, nodes[b].y),
          });
        }
      }
      eAlpha = new Float32Array(edges.length);

      // Dendritic stubs: 2–4 per node, random angles, dead-ends
      for (const n of nodes) {
        const nStubs = 2 + Math.floor(Math.random() * 3); // 2–4
        for (let s = 0; s < nStubs; s++) {
          const angle = Math.random() * Math.PI * 2;
          const len   = 14 + Math.random() * 44;
          const tip   = { x: n.x + Math.cos(angle) * len, y: n.y + Math.sin(angle) * len };
          const pa    = angle + Math.PI / 2;
          const bend  = (Math.random() - 0.5) * len * 0.45;
          stubs.push({
            x0: n.x, y0: n.y,
            cpx: (n.x + tip.x) / 2 + Math.cos(pa) * bend,
            cpy: (n.y + tip.y) / 2 + Math.sin(pa) * bend,
            x1: tip.x, y1: tip.y,
          });
        }
      }

      renderBg();
    }

    // ── Start a new impulse wave ──────────────────────────────────────────────
    function wave() {
      signals = []; bursts = [];
      activated = new Set(); pending = new Set();
      waveDone  = false; waveTimer = 0;
      labelAlpha = 0; labelFading = false;
      eAlpha.fill(0);
      fi = (fi + 1) % FLAGS.length;
      bakeFlag();

      const W = cv.width, H = cv.height;
      const mg   = Math.min(W, H) * 0.12;
      const pool = nodes.filter(n => n.x > mg && n.x < W - mg && n.y > mg && n.y < H - mg);
      const src  = (pool.length ? pool : nodes)[Math.floor(Math.random() * (pool.length || nodes.length))];
      const oi   = nodes.indexOf(src);
      activated.add(oi); pending.add(oi);

      for (const nb of src.adj) {
        if (pending.has(nb)) continue;
        pending.add(nb);
        const ei = eMap.get(`${oi},${nb}`);
        if (ei === undefined) continue;
        const e  = edges[ei];
        const dx = nodes[e.i].x - nodes[e.j].x;
        const dy = nodes[e.i].y - nodes[e.j].y;
        signals.push({ from: oi, to: nb, ei, t: 0, speed: 250 / Math.sqrt(dx * dx + dy * dy) });
      }
    }

    function resize() {
      const W = cv.offsetWidth, H = cv.offsetHeight;
      if (!W || !H) return;
      cv.width = W; cv.height = H;
      build();
      fi = (fi - 1 + FLAGS.length) % FLAGS.length;
      wave();
    }

    // ── Main animation frame ──────────────────────────────────────────────────
    function frame(ts: number) {
      const dt = Math.min((ts - prev) / 1000, 0.05);
      prev = ts;
      const W = cv.width, H = cv.height;

      // ── Advance signals ───────────────────────────────────────────────
      const next: Signal[] = [];
      for (const s of signals) {
        s.t = Math.min(s.t + s.speed * dt, 1);
        eAlpha[s.ei] = Math.max(eAlpha[s.ei], 0.92);

        if (s.t < 1) {
          next.push(s);
        } else if (!activated.has(s.to)) {
          activated.add(s.to);
          const dn = nodes[s.to];
          const [r, g, b] = sample(dn.x, dn.y);
          bursts.push({ x: dn.x, y: dn.y, age: 0, r, g, b });

          for (const nb of nodes[s.to].adj) {
            if (pending.has(nb)) continue;
            pending.add(nb);
            const nei = eMap.get(`${s.to},${nb}`);
            if (nei === undefined) continue;
            const ne  = edges[nei];
            const dx  = nodes[ne.i].x - nodes[ne.j].x;
            const dy  = nodes[ne.i].y - nodes[ne.j].y;
            next.push({ from: s.to, to: nb, ei: nei, t: 0, speed: 250 / Math.sqrt(dx * dx + dy * dy) });
          }
        }
      }
      signals = next;

      // Glow fades: slow while wave is live so flag colours build up visibly
      const decay = waveDone ? 0.14 : 0.05;
      for (let i = 0; i < eAlpha.length; i++) eAlpha[i] = Math.max(0, eAlpha[i] - dt * decay);

      for (const b of bursts) b.age += dt;
      bursts = bursts.filter(b => b.age < 0.65);

      // Label fade in/out
      if (!labelFading) labelAlpha = Math.min(1, labelAlpha + dt * 3.5);
      else              labelAlpha = Math.max(0, labelAlpha - dt * 1.0);

      if (signals.length === 0 && !waveDone) { waveDone = true; waveTimer = 0; labelFading = true; }
      if (waveDone) { waveTimer += dt; if (waveTimer >= 2.5) wave(); }

      // ── Draw ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // 1. Static background (pre-rendered: stubs + dim edges + dim nodes) — 1 call
      ctx.drawImage(bgCv, 0, 0);

      // 2. Flag watermark
      ctx.globalAlpha = 0.055;
      ctx.drawImage(flagCv, 0, 0, W, H);
      ctx.globalAlpha = 1;

      // 3. Glowing traversed edges — flag colour lingers, painting the flag shape
      ctx.lineCap = "round";
      for (let ei = 0; ei < edges.length; ei++) {
        if (eAlpha[ei] < 0.01) continue;
        const e  = edges[ei];
        const a  = eAlpha[ei];
        const [r, g, b] = sample(e.mx, e.my); // precomputed midpoint — no qb() here

        // Wide soft outer glow
        ctx.strokeStyle = `rgba(${r},${g},${b},${(a * 0.48).toFixed(2)})`;
        ctx.lineWidth   = 7;
        ctx.beginPath();
        ctx.moveTo(nodes[e.i].x, nodes[e.i].y);
        ctx.quadraticCurveTo(e.cpx, e.cpy, nodes[e.j].x, nodes[e.j].y);
        ctx.stroke();

        // Thin bright core
        ctx.strokeStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
        ctx.lineWidth   = 1.6;
        ctx.beginPath();
        ctx.moveTo(nodes[e.i].x, nodes[e.i].y);
        ctx.quadraticCurveTo(e.cpx, e.cpy, nodes[e.j].x, nodes[e.j].y);
        ctx.stroke();
      }

      // 4. Activated node dots (on top of bg)
      for (const i of activated) {
        const n        = nodes[i];
        const [r, g, b] = sample(n.x, n.y);
        ctx.fillStyle  = `rgba(${r},${g},${b},0.65)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2); ctx.fill();
      }

      // 5. Active signal trails — linear gradient comet + white core streak + head bloom
      ctx.lineCap  = "round";
      ctx.lineJoin = "round";

      for (const s of signals) {
        const e   = edges[s.ei];
        const x0  = s.from === e.i ? nodes[e.i].x : nodes[e.j].x;
        const y0  = s.from === e.i ? nodes[e.i].y : nodes[e.j].y;
        const x1  = s.from === e.i ? nodes[e.j].x : nodes[e.i].x;
        const y1  = s.from === e.i ? nodes[e.j].y : nodes[e.i].y;
        const cpx = s.from === e.i ? e.cpx : nodes[e.i].x + nodes[e.j].x - e.cpx;
        const cpy = s.from === e.i ? e.cpy : nodes[e.i].y + nodes[e.j].y - e.cpy;

        // Head position
        const hx = qb(s.t, x0, cpx, x1);
        const hy = qb(s.t, y0, cpy, y1);
        const [hr, hg, hb] = sample(hx, hy);

        // Tail: last 40% of the axon behind the head
        const tailT = Math.max(0, s.t - 0.4);
        const STEPS = 10;
        const pts: [number, number][] = [];
        for (let k = 0; k <= STEPS; k++) {
          const t = tailT + (s.t - tailT) * (k / STEPS);
          pts.push([qb(t, x0, cpx, x1), qb(t, y0, cpy, y1)]);
        }

        // Gradient from transparent tail → full colour at head
        const grd = ctx.createLinearGradient(pts[0][0], pts[0][1], hx, hy);
        grd.addColorStop(0,    `rgba(${hr},${hg},${hb},0)`);
        grd.addColorStop(0.55, `rgba(${hr},${hg},${hb},0.45)`);
        grd.addColorStop(1,    `rgba(${hr},${hg},${hb},1)`);

        // Wide glow pass
        ctx.beginPath();
        pts.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.strokeStyle = grd;
        ctx.lineWidth   = 6;
        ctx.stroke();

        // Thin white core (last 50% of trail only)
        ctx.beginPath();
        const halfPts = pts.slice(Math.floor(STEPS * 0.5));
        halfPts.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Head bloom
        const bloom = ctx.createRadialGradient(hx, hy, 0, hx, hy, 13);
        bloom.addColorStop(0,    "rgba(255,255,255,1)");
        bloom.addColorStop(0.22, `rgba(${hr},${hg},${hb},0.88)`);
        bloom.addColorStop(0.6,  `rgba(${hr},${hg},${hb},0.28)`);
        bloom.addColorStop(1,    `rgba(${hr},${hg},${hb},0)`);
        ctx.fillStyle = bloom;
        ctx.beginPath(); ctx.arc(hx, hy, 13, 0, Math.PI * 2); ctx.fill();
      }

      // 6. Node arrival bursts
      for (const b of bursts) {
        const p   = b.age / 0.65;
        const rad = 3 + p * 18;
        const al  = (1 - p) * 0.72;
        const g   = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, rad);
        g.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${al.toFixed(2)})`);
        g.addColorStop(1, `rgba(${b.r},${b.g},${b.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, rad, 0, Math.PI * 2); ctx.fill();
      }

      // 7. Centred country label
      if (labelAlpha > 0.01 && fi >= 0) {
        const flag = FLAGS[fi];
        const cx   = W / 2;
        const cy   = H / 2 + 10;
        const [lr, lg, lb] = sample(cx, cy);

        ctx.save();
        ctx.globalAlpha    = labelAlpha;
        ctx.textAlign      = "center";
        ctx.textBaseline   = "middle";

        // Flag emoji
        ctx.font = "38px system-ui, sans-serif";
        ctx.fillText(flag.emoji, cx, cy - 26);

        // Country name with colour-matched glow
        ctx.font        = "bold 20px 'Space Grotesk', system-ui, sans-serif";
        ctx.shadowColor = `rgba(${lr},${lg},${lb},0.95)`;
        ctx.shadowBlur  = 16;
        ctx.fillStyle   = "#ffffff";
        ctx.fillText(flag.name.toUpperCase(), cx, cy + 18);

        // Accent underline
        const tw = ctx.measureText(flag.name.toUpperCase()).width;
        ctx.shadowBlur   = 0;
        ctx.strokeStyle  = `rgba(${lr},${lg},${lb},0.55)`;
        ctx.lineWidth    = 1;
        ctx.beginPath();
        ctx.moveTo(cx - tw / 2, cy + 32); ctx.lineTo(cx + tw / 2, cy + 32);
        ctx.stroke();

        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    raf = requestAnimationFrame(t => { prev = t; frame(t); });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="w-full" style={{ background: "#060B1A" }}>
      {/* ── Section title ── */}
      <p
        className="text-center font-mono text-xs tracking-widest uppercase pt-6 pb-1"
        style={{ color: "rgba(0,229,255,0.4)", letterSpacing: "0.22em" }}
      >
        Countries currently circulating in our nerve tissue
      </p>

      {/* ── Canvas ── */}
      <div className="relative w-full" style={{ height: "300px" }}>
        {/* Gradient bridge from light sections */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{ height: "0px" }}
        />
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </div>
  );
}
