/**
 * Generates the placeholder artwork in /public/images.
 *
 * Every picture is a line-drawn jewellery motif on a velvet-tray gradient with
 * a faint jali lattice. They exist so the mockup looks finished before the
 * client's photography arrives. Replace any file with a real photograph of
 * the same name (or change the path in content/*.json). See
 * public/images/README.md.
 *
 * Run:  npm run images
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const products = read("content/products.json");
const collections = read("content/collections.json");
const gallery = read("content/gallery.json");

const r1 = (n) => Math.round(n * 10) / 10;

/* ---------- palettes ---------- */
const TONES = {
  maroon: { c: ["#8A2A40", "#541020", "#26050D"], ink: "#F3E2B2" },
  ink: { c: ["#4A4440", "#26221F", "#0E0C0B"], ink: "#E9DDBF" },
  gold: { c: ["#9C7430", "#5E4115", "#251804"], ink: "#F3E2B2" },
  green: { c: ["#2A5E4A", "#123628", "#06170F"], ink: "#EBDDB0" },
  slate: { c: ["#586579", "#2B3441", "#10141B"], ink: "#E7E9EE" },
  rose: { c: ["#C98A8F", "#8A4650", "#43202A"], ink: "#FBEAD7" },
  ivory: { c: ["#FBF7EE", "#EFE5D0", "#D8C7A3"], ink: "#7A5C1A", light: true },
};
const METALS = {
  gold: ["#FFF3C8", "#E6C97E", "#B58B3A", "#7A5A1C"],
  silver: ["#FFFFFF", "#E1E6ED", "#A5AFBB", "#6C7886"],
};

const S = { metal: "gold", sketch: false };
const SK = "#7A5C1A";

/* ---------- drawing helpers ---------- */
const stroke = () => (S.sketch ? SK : "url(#metal)");
const dash = () => (S.sketch ? ' stroke-dasharray="9 8"' : "");
const line = (d, w = 4, extra = "") =>
  `<path d="${d}" fill="none" stroke="${stroke()}" stroke-width="${w}" stroke-linecap="round"${dash()} ${extra}/>`;
const dark = (d, w = 2, o = 0.5) =>
  S.sketch ? "" : `<path d="${d}" fill="none" stroke="#3A2506" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
const solid = (d) =>
  S.sketch
    ? `<path d="${d}" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
    : `<path d="${d}" fill="url(#metalFill)" stroke="#4A3208" stroke-width="2" stroke-opacity=".55"/>`;
const rad = (a) => (a * Math.PI) / 180;
const pt = (cx, cy, rx, ry, a) => ({ x: cx + rx * Math.cos(rad(a)), y: cy + ry * Math.sin(rad(a)), a });
const arcPts = (cx, cy, rx, ry, a0, a1, n) =>
  Array.from({ length: n }, (_, i) => pt(cx, cy, rx, ry, a0 + ((a1 - a0) * i) / (n - 1)));
const arcD = (cx, cy, rx, ry, a0, a1) => {
  const p0 = pt(cx, cy, rx, ry, a0);
  const p1 = pt(cx, cy, rx, ry, a1);
  return `M${r1(p0.x)} ${r1(p0.y)}A${rx} ${ry} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${r1(p1.x)} ${r1(p1.y)}`;
};

function bead(x, y, r) {
  if (S.sketch) return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="none" stroke="${SK}" stroke-width="2"/>`;
  const hi = r >= 7 ? `<circle cx="${r1(x - r * 0.3)}" cy="${r1(y - r * 0.32)}" r="${r1(r * 0.27)}" fill="#fff" opacity=".6"/>` : "";
  return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="url(#bead)"/>${hi}`;
}
function gem(x, y, r, kind = "ruby") {
  if (S.sketch) return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="none" stroke="${SK}" stroke-width="2"/>`;
  return (
    `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r + 3}" fill="url(#metal)"/>` +
    `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="url(#g-${kind})"/>` +
    `<circle cx="${r1(x - r * 0.32)}" cy="${r1(y - r * 0.34)}" r="${r1(r * 0.26)}" fill="#fff" opacity=".7"/>`
  );
}
function diamondStone(x, y, r) {
  const o = Array.from({ length: 8 }, (_, i) => pt(x, y, r, r, i * 45 + 22.5));
  const n = Array.from({ length: 8 }, (_, i) => pt(x, y, r * 0.52, r * 0.52, i * 45 + 22.5));
  const poly = (ps) => ps.map((p) => `${r1(p.x)},${r1(p.y)}`).join(" ");
  if (S.sketch) return `<polygon points="${poly(o)}" fill="none" stroke="${SK}" stroke-width="2"/>`;
  const facets = o.map((p, i) => `M${r1(n[i].x)} ${r1(n[i].y)}L${r1(p.x)} ${r1(p.y)}`).join("");
  return (
    `<polygon points="${poly(o)}" fill="url(#g-diamond)" stroke="#fff" stroke-opacity=".9" stroke-width="1.5"/>` +
    `<polygon points="${poly(n)}" fill="#fff" fill-opacity=".35" stroke="#8D9AB0" stroke-opacity=".7" stroke-width="1"/>` +
    `<path d="${facets}" stroke="#8D9AB0" stroke-opacity=".6" stroke-width="1"/>`
  );
}
function drop(x, y, len, w, kind = "ruby") {
  const d = `M${x} ${y}C${x + w} ${y + len * 0.3} ${x + w * 0.75} ${y + len} ${x} ${y + len}C${x - w * 0.75} ${y + len} ${x - w} ${y + len * 0.3} ${x} ${y}Z`;
  if (S.sketch) return `<path d="${d}" fill="none" stroke="${SK}" stroke-width="2"/>`;
  return (
    `<path d="${d}" fill="url(#g-${kind})" stroke="url(#metal)" stroke-width="4"/>` +
    `<circle cx="${r1(x - w * 0.25)}" cy="${r1(y + len * 0.62)}" r="${r1(w * 0.18)}" fill="#fff" opacity=".6"/>`
  );
}
function medallion(x, y, R, kind = "ruby") {
  let s = "";
  for (let i = 0; i < 8; i++) {
    const p = pt(x, y, R * 0.66, R * 0.66, i * 45);
    s += S.sketch
      ? `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(R * 0.36)}" fill="none" stroke="${SK}" stroke-width="2"/>`
      : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(R * 0.36)}" fill="url(#metalFill)" stroke="#4A3208" stroke-opacity=".5" stroke-width="2"/>`;
  }
  s += S.sketch
    ? `<circle cx="${x}" cy="${y}" r="${r1(R * 0.62)}" fill="none" stroke="${SK}" stroke-width="2"/>`
    : `<circle cx="${x}" cy="${y}" r="${r1(R * 0.62)}" fill="url(#metalFill)" stroke="#4A3208" stroke-opacity=".5" stroke-width="2"/>`;
  s += gem(x, y, R * 0.42, kind);
  return s;
}
const beadsOn = (pts, r, every = 0, gemKinds) =>
  pts
    .map((p, i) =>
      gemKinds && i % every === 0
        ? gem(p.x, p.y, r * 1.1, gemKinds[(i / every) % gemKinds.length])
        : bead(p.x, p.y, r),
    )
    .join("");
const sparkle = (x, y, s) =>
  S.sketch
    ? ""
    : `<path d="M${x} ${y - s}L${x + s * 0.14} ${y - s * 0.14}L${x + s} ${y}L${x + s * 0.14} ${y + s * 0.14}L${x} ${y + s}L${x - s * 0.14} ${y + s * 0.14}L${x - s} ${y}L${x - s * 0.14} ${y - s * 0.14}Z" fill="#fff" opacity=".85"/>`;

function coinShape(cx, cy, R) {
  let s = solid(`M${cx - R} ${cy}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0Z`);
  s += dark(`M${cx - R * 0.82} ${cy}a${R * 0.82} ${R * 0.82} 0 1 0 ${R * 1.64} 0a${R * 0.82} ${R * 0.82} 0 1 0 ${-R * 1.64} 0Z`, 2.5, 0.55);
  arcPts(cx, cy, R * 0.91, R * 0.91, 0, 360, 44).forEach((p) => (s += S.sketch ? "" : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(R * 0.018 + 1)}" fill="#3A2506" opacity=".5"/>`));
  for (let i = 0; i < 10; i++) {
    const p = pt(cx, cy, R * 0.36, R * 0.36, i * 36);
    s += S.sketch
      ? ""
      : `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="${r1(R * 0.1)}" ry="${r1(R * 0.26)}" transform="rotate(${i * 36 + 90} ${r1(p.x)} ${r1(p.y)})" fill="none" stroke="#3A2506" stroke-opacity=".5" stroke-width="2.5"/>`;
  }
  s += S.sketch ? "" : `<circle cx="${cx}" cy="${cy}" r="${r1(R * 0.12)}" fill="url(#bead)" stroke="#3A2506" stroke-opacity=".5" stroke-width="2"/>`;
  return s;
}

/* ---------- motifs: drawn in a 1000x1000 box ---------- */
const MOTIFS = {
  haar() {
    let s = "";
    const cx = 500, cy = 150;
    const layers = [
      { rx: 190, ry: 290, n: 34, r: 8 },
      { rx: 265, ry: 430, n: 48, r: 9 },
      { rx: 340, ry: 590, n: 62, r: 10 },
    ];
    // Cords: every strand rises from its end to one clasp at the neck, so nothing floats
    [-1, 1].forEach((d) => {
      layers.forEach((L) => {
        const e = pt(cx, cy, L.rx, L.ry, d > 0 ? 12 : 168);
        s += line(`M${r1(e.x)} ${r1(e.y)}Q${r1(e.x + d * -30)} ${r1(e.y - 70)} ${cx + d * 46} 24`, 3);
      });
      s += bead(cx + d * 46, 24, 13);
    });
    s += `<path d="M${cx - 46} 24Q${cx} 6 ${cx + 46} 24" fill="none" stroke="${stroke()}" stroke-width="4" stroke-linecap="round"/>`;
    layers.forEach((L) => {
      s += line(arcD(cx, cy, L.rx, L.ry, 12, 168), 3);
      s += beadsOn(arcPts(cx, cy, L.rx, L.ry, 12, 168, L.n), L.r, 6, ["ruby", "emerald", "pearl"]);
    });
    const m1 = [500, cy + 430], m2 = [500, cy + 590];
    [[-48, 70, "ruby"], [0, 96, "emerald"], [48, 70, "ruby"]].forEach(([dx, len, k]) => {
      s += line(`M${m1[0] + dx} ${m1[1] + 40}v22`, 3) + drop(m1[0] + dx, m1[1] + 60, len * 0.55, 22, k);
      s += line(`M${m2[0] + dx * 1.2} ${m2[1] + 56}v26`, 3) + drop(m2[0] + dx * 1.2, m2[1] + 80, len * 0.9, 28, k);
    });
    s += medallion(m1[0], m1[1], 46, "ruby");
    s += medallion(m2[0], m2[1], 62, "emerald");
    return s + sparkle(760, 250, 34) + sparkle(250, 330, 22);
  },
  choker() {
    let s = "";
    const cx = 500, cy = 230;
    for (let k = 0; k < 3; k++) {
      s += line(arcD(cx, cy, 330, 300 + k * 34, 20, 160), 3);
      s += beadsOn(arcPts(cx, cy, 330, 300 + k * 34, 20, 160, 58), 9, 5, k === 1 ? ["emerald", "pearl", "ruby"] : undefined);
    }
    const fringe = arcPts(cx, cy, 330, 368, 42, 138, 11);
    const kinds = ["ruby", "pearl", "emerald"];
    fringe.forEach((p, i) => {
      const len = 50 - Math.abs(i - 5) * 3;
      s += line(`M${r1(p.x)} ${r1(p.y)}v24`, 3) + drop(r1(p.x), r1(p.y) + 24, len, 16, kinds[i % 3]);
    });
    s += medallion(500, 600, 70, "ruby");
    s += drop(500, 676, 90, 26, "emerald");
    return s + sparkle(790, 300, 30) + sparkle(230, 420, 20);
  },
  jhumka() {
    const one = (x, y, sc) => {
      let s = `<g transform="translate(${x} ${y}) scale(${sc})">`;
      s += bead(0, -190, 26) + line("M0 -165V-105", 4);
      s += solid("M-78 -40Q-78 -108 0 -108Q78 -108 78 -40Z");
      s += solid("M-78 -40C-160 -5-172 120-140 172L140 172C172 120 160 -5 78 -40Z");
      s += dark("M-48 -30C-110 20-120 110-96 164", 2.5, 0.55) + dark("M48 -30C110 20 120 110 96 164", 2.5, 0.55) + dark("M0 -30V164", 2.5, 0.4);
      s += dark("M-96 30Q0 62 96 30", 2.5, 0.5) + dark("M-118 100Q0 136 118 100", 2.5, 0.5);
      for (let i = 0; i < 7; i++) s += S.sketch ? "" : `<circle cx="${-90 + i * 30}" cy="${38 + Math.sin((i / 6) * Math.PI) * 14}" r="5" fill="#3A2506" opacity=".4"/>`;
      for (let i = 0; i < 9; i++) s += bead(-120 + i * 30, 172, 13);
      [-105, -52, 0, 52, 105].forEach((dx, i) => {
        const len = i === 2 ? 46 : 32;
        s += line(`M${dx} 186v${len - 10}`, 2.5);
        s += gem(dx, 186 + len + 8, i === 2 ? 17 : 13, "pearl");
      });
      return s + "</g>";
    };
    return one(290, 550, 1.15) + one(710, 550, 1.15) + sparkle(500, 200, 30);
  },
  tikka() {
    let s = line("M40 190Q500 20 960 190", 3);
    s += beadsOn(
      Array.from({ length: 36 }, (_, i) => {
        const t = i / 35;
        return { x: 40 + 920 * t, y: 190 - (1 - Math.pow(2 * t - 1, 2)) * 85 };
      }),
      5,
    );
    const base = { x: 500, y: 250 };
    for (let i = 0; i < 11; i++) {
      const p = pt(base.x, base.y, 150, 130, 180 + i * 18);
      s += S.sketch
        ? `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="30" fill="none" stroke="${SK}" stroke-width="2"/>`
        : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="30" fill="url(#metalFill)" stroke="#4A3208" stroke-opacity=".5" stroke-width="2"/>`;
    }
    s += solid("M345 250Q500 318 655 250Q500 160 345 250Z");
    s += gem(500, 250, 36, "ruby");
    [-1, 1].forEach((d) => (s += gem(500 + d * 98, 250, 18, "emerald") + gem(500 + d * 150, 248, 12, "pearl")));
    s += line("M500 300V470", 4) + beadsOn(Array.from({ length: 6 }, (_, i) => ({ x: 500, y: 330 + i * 28 })), 7);
    s += gem(500, 530, 52, "pearl");
    return s + sparkle(700, 420, 30);
  },
  bangles() {
    let s = "";
    for (let i = 0; i < 4; i++) {
      const y = 290 + i * 118;
      s += S.sketch
        ? `<ellipse cx="500" cy="${y}" rx="300" ry="86" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/><ellipse cx="500" cy="${y}" rx="270" ry="70" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
        : `<ellipse cx="500" cy="${y}" rx="288" ry="84" fill="none" stroke="url(#metal)" stroke-width="34"/><ellipse cx="500" cy="${y - 9}" rx="288" ry="84" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="4" stroke-dasharray="560 2000" stroke-dashoffset="-1200"/>`;
    }
    return s + sparkle(790, 240, 30);
  },
  kada(o = {}) {
    let s = "";
    [400, 640].forEach((y, k) => {
      const cx = 500 + (k ? 28 : -28);
      s += S.sketch
        ? `<ellipse cx="${cx}" cy="${y}" rx="300" ry="100" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/><ellipse cx="${cx}" cy="${y}" rx="250" ry="76" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
        : `<ellipse cx="${cx}" cy="${y}" rx="288" ry="96" fill="none" stroke="url(#metal)" stroke-width="64"/>` +
          `<ellipse cx="${cx}" cy="${y}" rx="288" ry="96" fill="none" stroke="#3A2506" stroke-opacity=".45" stroke-width="2"/>`;
      const pts = arcPts(cx, y, 288, 96, 0, 360, 28);
      pts.forEach((p, i) => {
        if (S.sketch) return;
        s += o.gems && i % 3 === 0 ? gem(p.x, p.y, 13, ["ruby", "emerald", "pearl"][(i / 3) % 3]) : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="5" fill="#3A2506" opacity=".5"/>`;
      });
    });
    return s + sparkle(800, 250, 30);
  },
  "ring-solitaire"() {
    let s = S.sketch
      ? `<circle cx="500" cy="650" r="190" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/><circle cx="500" cy="650" r="160" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
      : `<circle cx="500" cy="650" r="175" fill="none" stroke="url(#metal)" stroke-width="36"/><circle cx="500" cy="650" r="175" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-dasharray="330 1400" stroke-dashoffset="-380"/>`;
    s += solid("M440 470L560 470L540 508L460 508Z");
    s += diamondStone(500, 400, 98);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => (s += bead(500 + a * 84, 400 + b * 76 + 14, 9)));
    return s + sparkle(660, 270, 44) + sparkle(350, 300, 24) + sparkle(640, 330, 14);
  },
  band(o = {}) {
    let s = S.sketch
      ? `<circle cx="500" cy="540" r="215" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/><circle cx="500" cy="540" r="165" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
      : `<circle cx="500" cy="540" r="190" fill="none" stroke="url(#metal)" stroke-width="58"/><circle cx="500" cy="540" r="190" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-dasharray="400 1400" stroke-dashoffset="-500"/>`;
    if (o.diamonds) arcPts(500, 540, 190, 190, 215, 325, 9).forEach((p) => (s += diamondStone(p.x, p.y, 16)));
    else if (!S.sketch) arcPts(500, 540, 190, 190, 0, 360, 48).forEach((p, i) => (s += `<circle cx="${r1(p.x + (i % 3) * 3 - 3)}" cy="${r1(p.y + (i % 2) * 4 - 2)}" r="${5 + (i % 3)}" fill="#3A2506" opacity=".28"/>`));
    return s + sparkle(700, 250, 30);
  },
  signet() {
    let s = S.sketch
      ? `<circle cx="500" cy="700" r="190" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
      : `<circle cx="500" cy="700" r="170" fill="none" stroke="url(#metal)" stroke-width="48"/>`;
    s += solid("M360 270Q360 250 380 250L620 250Q640 250 640 270L640 510Q640 530 620 530L380 530Q360 530 360 510Z");
    s += S.sketch
      ? `<rect x="400" y="290" width="200" height="200" rx="14" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
      : `<rect x="400" y="290" width="200" height="200" rx="14" fill="url(#g-onyx)" stroke="#4A3208" stroke-opacity=".6" stroke-width="3"/><path d="M420 470L580 310" stroke="#fff" stroke-opacity=".16" stroke-width="30"/>`;
    return s + sparkle(690, 250, 24);
  },
  "bracelet-tennis"() {
    let s = S.sketch
      ? `<ellipse cx="500" cy="540" rx="340" ry="200" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
      : `<ellipse cx="500" cy="540" rx="340" ry="200" fill="none" stroke="url(#metal)" stroke-width="40"/>`;
    arcPts(500, 540, 340, 200, 0, 360, 29).slice(0, 28).forEach((p) => (s += diamondStone(p.x, p.y, 22)));
    return s + sparkle(790, 330, 36) + sparkle(250, 700, 22);
  },
  studs() {
    let s = "";
    [[315, 540], [685, 540]].forEach(([x, y]) => {
      s += S.sketch
        ? `<circle cx="${x}" cy="${y}" r="135" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
        : `<circle cx="${x}" cy="${y}" r="135" fill="url(#metalFill)" stroke="#4A3208" stroke-opacity=".5" stroke-width="2"/>`;
      arcPts(x, y, 100, 100, 0, 360, 15).slice(0, 14).forEach((p) => (s += diamondStone(p.x, p.y, 17)));
      s += diamondStone(x, y, 52);
    });
    return s + sparkle(520, 330, 30);
  },
  pendant() {
    let s = line("M130 90Q300 420 500 570", 3) + line("M870 90Q700 420 500 570", 3);
    s += beadsOn(Array.from({ length: 22 }, (_, i) => { const t = i / 21; return { x: 130 + 370 * t - 0, y: 90 + 480 * (t * t * 0.4 + t * 0.6) }; }), 4);
    s += beadsOn(Array.from({ length: 22 }, (_, i) => { const t = i / 21; return { x: 870 - 370 * t, y: 90 + 480 * (t * t * 0.4 + t * 0.6) }; }), 4);
    s += `<circle cx="500" cy="585" r="14" fill="none" stroke="${stroke()}" stroke-width="5"/>`;
    for (let i = 0; i < 6; i++) {
      const p = pt(500, 700, 82, 82, i * 60 - 90);
      s += S.sketch
        ? `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="58" fill="none" stroke="${SK}" stroke-width="2"/>`
        : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="58" fill="url(#metalFill)" stroke="#4A3208" stroke-opacity=".5" stroke-width="2"/>`;
      s += diamondStone(p.x, p.y, 22);
    }
    s += S.sketch ? "" : `<circle cx="500" cy="700" r="44" fill="url(#metalFill)"/>`;
    s += diamondStone(500, 700, 40);
    return s + sparkle(660, 600, 28);
  },
  "coin-pendant"() {
    let s = line("M130 90Q300 400 500 560", 3) + line("M870 90Q700 400 500 560", 3);
    s += `<circle cx="500" cy="585" r="22" fill="none" stroke="${stroke()}" stroke-width="7"/>`;
    s += coinShape(500, 740, 160);
    return s + sparkle(690, 600, 28);
  },
  coin() {
    return coinShape(500, 520, 270) + sparkle(780, 290, 34);
  },
  chain() {
    let s = "";
    const cx = 500, cy = 100, rx = 340, ry = 660;
    arcPts(cx, cy, rx, ry, 6, 174, 86).forEach((p, i) => {
      const ang = (Math.atan2(ry * Math.cos(rad(p.a)), -rx * Math.sin(rad(p.a))) * 180) / Math.PI;
      const flat = i % 2 === 0;
      s += S.sketch
        ? `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="24" ry="${flat ? 12 : 5}" transform="rotate(${r1(ang)} ${r1(p.x)} ${r1(p.y)})" fill="none" stroke="${SK}" stroke-width="2"/>`
        : `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="${flat ? 25 : 22}" ry="${flat ? 13 : 6}" transform="rotate(${r1(ang)} ${r1(p.x)} ${r1(p.y)})" fill="none" stroke="url(#metal)" stroke-width="${flat ? 7 : 8}"/>`;
    });
    return s + sparkle(790, 330, 30);
  },
  mangalsutra() {
    let s = "";
    const cx = 500, cy = 100;
    [{ rx: 250, ry: 520, n: 52 }, { rx: 295, ry: 440, n: 48 }].forEach((L) => {
      s += line(arcD(cx, cy, L.rx, L.ry, 14, 166), 2);
      arcPts(cx, cy, L.rx, L.ry, 14, 166, L.n).forEach((p, i) => (s += i % 8 === 4 ? bead(p.x, p.y, 10) : S.sketch ? bead(p.x, p.y, 8) : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="9" fill="url(#g-onyx)"/><circle cx="${r1(p.x - 3)}" cy="${r1(p.y - 3)}" r="2.5" fill="#fff" opacity=".6"/>`));
    });
    s += `<circle cx="500" cy="640" r="12" fill="none" stroke="${stroke()}" stroke-width="5"/>`;
    s += medallion(500, 710, 70, "pearl");
    s += diamondStone(500, 710, 30);
    s += line("M500 780v16", 3) + drop(500, 796, 60, 22, "ruby");
    return s + sparkle(740, 650, 28);
  },
  payal() {
    let s = "";
    [[500, 360, 1], [500, 660, 0.9]].forEach(([cx, cy, sc]) => {
      const rx = 320 * sc, ry = 150 * sc;
      arcPts(cx, cy, rx, ry, 0, 360, 72).slice(0, 71).forEach((p, i) => {
        s += S.sketch
          ? `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="18" ry="${i % 2 ? 4 : 9}" fill="none" stroke="${SK}" stroke-width="2"/>`
          : `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="${i % 2 ? 14 : 19}" ry="${i % 2 ? 5 : 9}" fill="none" stroke="url(#metal)" stroke-width="5"/>`;
      });
      arcPts(cx, cy, rx, ry, 20, 160, 9).forEach((p) => {
        s += line(`M${r1(p.x)} ${r1(p.y)}v26`, 2.5);
        s += S.sketch
          ? `<circle cx="${r1(p.x)}" cy="${r1(p.y) + 46}" r="22" fill="none" stroke="${SK}" stroke-width="2"/>`
          : `<circle cx="${r1(p.x)}" cy="${r1(p.y) + 46}" r="22" fill="url(#bead)" stroke="#3A2506" stroke-opacity=".45" stroke-width="2"/><path d="M${r1(p.x - 8)} ${r1(p.y) + 56}h16" stroke="#3A2506" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>`;
      });
    });
    return s + sparkle(830, 330, 30);
  },
  "bracelet-charm"() {
    let s = line(arcD(500, 470, 320, 160, 0, 360), 2);
    s += beadsOn(arcPts(500, 470, 320, 160, 0, 360, 60).slice(0, 59), 8);
    s += `<circle cx="500" cy="640" r="14" fill="none" stroke="${stroke()}" stroke-width="5"/>` + line("M500 654v30", 3);
    s += S.sketch ? bead(500, 730, 44) : `<circle cx="500" cy="730" r="44" fill="url(#g-onyx)" stroke="url(#metal)" stroke-width="6"/><circle cx="486" cy="716" r="10" fill="#fff" opacity=".5"/>`;
    return s + sparkle(790, 330, 28);
  },
  "baby-bangles"() {
    let s = "";
    [[420, 420], [580, 620]].forEach(([cx, cy]) => {
      s += S.sketch
        ? `<ellipse cx="${cx}" cy="${cy}" rx="240" ry="96" fill="none" stroke="${SK}" stroke-width="2.5" stroke-dasharray="9 8"/>`
        : `<ellipse cx="${cx}" cy="${cy}" rx="240" ry="96" fill="none" stroke="url(#metal)" stroke-width="30"/><ellipse cx="${cx}" cy="${cy - 8}" rx="240" ry="96" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="3" stroke-dasharray="380 1600" stroke-dashoffset="-900"/>`;
      arcPts(cx, cy, 240, 96, 0, 360, 24).forEach((p) => (s += S.sketch ? "" : `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="3.5" fill="#3A2506" opacity=".45"/>`));
      s += bead(cx + 240, cy, 15);
    });
    return s + sparkle(790, 300, 28);
  },
};

/* focal point for the close-up view (art box coordinates) */
const FOCUS = {
  haar: [500, 700], choker: [500, 560], jhumka: [325, 560], tikka: [500, 360], bangles: [500, 440],
  kada: [500, 520], "ring-solitaire": [500, 420], band: [500, 400], signet: [500, 390],
  "bracelet-tennis": [500, 400], studs: [315, 540], pendant: [500, 700], "coin-pendant": [500, 740],
  coin: [500, 520], chain: [500, 640], mangalsutra: [500, 700], payal: [500, 500],
  "bracelet-charm": [500, 700], "baby-bangles": [500, 520],
};

/* ---------- scene composition ---------- */
function defs({ tone, w, h, metal, light }) {
  const m = METALS[metal] ?? METALS.gold;
  const t = TONES[tone];
  const ink = light ? "#B08D3C" : "#D9BE80";
  return `<defs>
<radialGradient id="bg" cx="50%" cy="42%" r="78%"><stop offset="0" stop-color="${t.c[0]}"/><stop offset=".62" stop-color="${t.c[1]}"/><stop offset="1" stop-color="${t.c[2]}"/></radialGradient>
<linearGradient id="metal" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="${w}"><stop offset="0" stop-color="${m[1]}"/><stop offset=".22" stop-color="${m[0]}"/><stop offset=".48" stop-color="${m[2]}"/><stop offset=".74" stop-color="${m[1]}"/><stop offset="1" stop-color="${m[3]}"/></linearGradient>
<linearGradient id="metalFill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="${w}"><stop offset="0" stop-color="${m[1]}"/><stop offset=".3" stop-color="${m[0]}"/><stop offset=".6" stop-color="${m[2]}"/><stop offset="1" stop-color="${m[1]}"/></linearGradient>
<radialGradient id="bead" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${m[0]}"/><stop offset=".5" stop-color="${m[2]}"/><stop offset="1" stop-color="${m[3]}"/></radialGradient>
<radialGradient id="g-ruby" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#F0657F"/><stop offset=".55" stop-color="#B0142F"/><stop offset="1" stop-color="#5C0617"/></radialGradient>
<radialGradient id="g-emerald" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#6FD9A8"/><stop offset=".55" stop-color="#15885C"/><stop offset="1" stop-color="#07402B"/></radialGradient>
<radialGradient id="g-pearl" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F0E6D2"/><stop offset="1" stop-color="#B9AA92"/></radialGradient>
<radialGradient id="g-onyx" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#5A5551"/><stop offset=".6" stop-color="#1B1917"/><stop offset="1" stop-color="#050505"/></radialGradient>
<linearGradient id="g-diamond" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#DCE6F5"/><stop offset="1" stop-color="#B4C1DB"/></linearGradient>
<pattern id="jali" width="80" height="80" patternUnits="userSpaceOnUse"><g fill="none" stroke="${ink}" stroke-width="1.3"><circle cx="0" cy="0" r="40"/><circle cx="80" cy="0" r="40"/><circle cx="0" cy="80" r="40"/><circle cx="80" cy="80" r="40"/><circle cx="40" cy="40" r="40"/></g></pattern>
<radialGradient id="spot" cx="50%" cy="46%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity="${light ? 0.7 : 0.16}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx="50%" cy="50%" r="72%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${light ? 0.14 : 0.45}"/></radialGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="${light ? 16 : 22}" stdDeviation="${light ? 14 : 18}" flood-color="#000" flood-opacity="${light ? 0.22 : 0.5}"/></filter>
</defs>`;
}

function mandala(cx, cy, R, ink, op) {
  let s = `<g fill="none" stroke="${ink}" stroke-opacity="${op}" stroke-width="1.6"><circle cx="${cx}" cy="${cy}" r="${R}"/><circle cx="${cx}" cy="${cy}" r="${r1(R * 0.88)}"/><circle cx="${cx}" cy="${cy}" r="${r1(R * 0.46)}"/>`;
  for (let i = 0; i < 24; i++) {
    const p = pt(cx, cy, R * 0.67, R * 0.67, i * 15);
    s += `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="${r1(R * 0.06)}" ry="${r1(R * 0.19)}" transform="rotate(${i * 15 + 90} ${r1(p.x)} ${r1(p.y)})"/>`;
  }
  return s + "</g>";
}

function scene({ w, h, tone, motif, metal = "gold", view = 1, label = "", opts = {}, sketch = false }) {
  const light = !!TONES[tone].light;
  S.metal = metal;
  S.sketch = sketch;
  const art = MOTIFS[motif](opts);
  const ink = light ? "#B08D3C" : "#D9BE80";
  // art box is 1000x1000; fit it into the canvas
  const base = Math.min(w, h) / 1000;
  let sc = base * (view === 3 ? 0.86 : 1);
  let tx = (w - 1000 * sc) / 2;
  let ty = (h - 1000 * sc) / 2;
  if (view === 2) {
    const [fx, fy] = FOCUS[motif] ?? [500, 520];
    sc = base * 1.75;
    tx = w / 2 - fx * sc;
    ty = h / 2 - fy * sc;
  }
  const mand = mandala(w / 2, h / 2, Math.min(w, h) * 0.46, ink, light ? 0.22 : 0.16);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder image">
${defs({ tone, w: w, h, metal, light })}
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#jali)" opacity="${light ? 0.2 : 0.075}"/>
${mand}
<rect width="${w}" height="${h}" fill="url(#spot)"/>
<g ${light && !sketch ? 'filter="url(#sh)"' : ""} transform="translate(${r1(tx)} ${r1(ty)}) scale(${r1(sc * 1000) / 1000})">${art}</g>
<rect width="${w}" height="${h}" fill="url(#vig)"/>
${label ? `<text x="${w / 2}" y="${h - 34}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 52)}" letter-spacing="${Math.round(w / 240)}" fill="${light ? "#7A5C1A" : TONES[tone].ink}" opacity=".55">${label}</text>` : ""}
</svg>`;
}

/* ---------- output ---------- */
const out = (rel, svg) => {
  const file = join(PUB, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg);
};
const LABEL = "PLACEHOLDER IMAGE · REPLACE WITH PHOTOGRAPH";

let count = 0;

/* products: 3 views */
for (const p of products) {
  const metal = p.metal === "gold" ? "gold" : "silver";
  const opts = { diamonds: /diamond/i.test(p.stones) && p.metal !== "silver", gems: ["maroon", "green"].includes(p.tone) };
  const views = [
    { view: 1, tone: p.tone },
    { view: 2, tone: p.tone === "gold" ? "maroon" : p.tone },
    { view: 3, tone: "ivory" },
  ];
  views.forEach((v, i) => {
    out(`images/products/${p.slug}-${i + 1}.svg`, scene({ w: 1000, h: 1250, tone: v.tone, motif: p.motif, metal, view: v.view, label: LABEL, opts }));
    count++;
  });
}

/* collections */
const COLLECTION_MOTIF = {
  bridal: ["haar", "gold"], diamond: ["ring-solitaire", "gold"], gold: ["bangles", "gold"],
  "polki-kundan": ["choker", "gold"], silver: ["payal", "silver"], mens: ["chain", "gold"], kids: ["baby-bangles", "gold"],
};
for (const c of collections) {
  const [motif, metal] = COLLECTION_MOTIF[c.slug];
  out(`images/collections/${c.slug}.svg`, scene({ w: 1000, h: 1250, tone: c.tone, motif, metal, label: LABEL, opts: { gems: ["maroon", "green"].includes(c.tone) } }));
  count++;
}

/* gallery */
gallery.forEach((g, i) => {
  out(`images/gallery/g${i + 1}.svg`, scene({ w: 1000, h: 1000, tone: g.tone, motif: g.motif, view: i % 2 ? 2 : 1, label: LABEL, opts: { gems: true } }));
  count++;
});

/* bridal process + story + store */
const STEPS = [
  ["consult", "maroon", "jhumka"], ["sketch", "ivory", "haar"], ["craft", "green", "choker"], ["deliver", "ink", "ring-solitaire"],
];
STEPS.forEach(([name, tone, motif]) => {
  out(`images/bridal/step-${name}.svg`, scene({ w: 1200, h: 900, tone, motif, view: name === "craft" ? 2 : 1, sketch: name === "sketch", label: LABEL, opts: { gems: true } }));
  count++;
});
out("images/bridal/hero.svg", scene({ w: 1600, h: 1000, tone: "maroon", motif: "haar", label: LABEL, opts: { gems: true } }));
out("images/story/heritage.svg", scene({ w: 1000, h: 1250, tone: "gold", motif: "haar", view: 2, label: LABEL, opts: {} }));
out("images/story/craft.svg", scene({ w: 1000, h: 1250, tone: "green", motif: "kada", label: LABEL, opts: { gems: true } }));
out("images/story/family.svg", scene({ w: 1200, h: 900, tone: "maroon", motif: "coin", label: "FAMILY PHOTOGRAPH GOES HERE", opts: {} }));
out("images/story/store.svg", scene({ w: 1200, h: 900, tone: "ink", motif: "bangles", label: "STORE PHOTOGRAPH GOES HERE", opts: {} }));
count += 5;

/* home hero: wide, subject on the right so copy can sit on the left */
{
  const w = 2000, h = 1250;
  S.metal = "gold";
  S.sketch = false;
  const haar = MOTIFS.haar();
  const jh = MOTIFS.jhumka();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder hero image">
${defs({ tone: "maroon", w: 1000, h, metal: "gold", light: false })}
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#jali)" opacity=".07"/>
${mandala(1380, 600, 560, "#D9BE80", 0.15)}
<ellipse cx="1380" cy="560" rx="760" ry="620" fill="url(#spot)"/>
<g>
<g transform="translate(850 70) scale(1.1)">${haar}</g>
</g>
<rect width="${w}" height="${h}" fill="url(#vig)"/>
</svg>`;
  out("images/hero.svg", svg);
  count++;
  try {
    const sharp = (await import("sharp")).default;
    // The hero is the largest-contentful-paint element, so ship it pre-rasterised
    // (like a real photograph would be) instead of making the phone draw a complex SVG.
    await sharp(Buffer.from(svg)).resize(1600, 1000).webp({ quality: 70, effort: 5 }).toFile(join(PUB, "images", "hero.webp"));
    count++;
  } catch (e) {
    console.warn("Hero WebP skipped:", e.message);
  }
  // Open Graph image (PNG) for social sharing
  try {
    const sharp = (await import("sharp")).default;
    const text = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#2a0a12" opacity=".35"/><text x="70" y="330" font-family="Georgia, serif" font-size="84" fill="#F3E2B2">Pushpam Jewellers</text><rect x="72" y="362" width="150" height="3" fill="#D9BE80"/><text x="72" y="425" font-family="Georgia, serif" font-size="34" fill="#FAF6EF" opacity=".9">Gold · Diamond · Bridal · Ahmedabad</text></svg>`,
    );
    await sharp(Buffer.from(svg)).resize(1200, 630, { fit: "cover", position: "right" }).composite([{ input: text }]).png().toFile(join(PUB, "og.png"));
    count++;
  } catch (e) {
    console.warn("OG image skipped:", e.message);
  }
}

console.log(`Generated ${count} images in public/`);
