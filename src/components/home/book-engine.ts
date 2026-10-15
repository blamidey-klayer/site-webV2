/*
 * Moteur de dessin du livre ouvert, dans le langage visuel de la sphère de neon.com :
 * fil de fer fin, bandes de hachures très serrées et mots gravés en creux, sans aucun
 * ombrage. Le livre est modélisé en 3D (couvertures, blocs de pages, tranches, feuille qui
 * tourne, signet) puis projeté en perspective. Les faces sont peintes du fond vers l'avant
 * et remplies de noir, ce qui masque les traits cachés.
 */

export type PageContent = { lines: string[] };

export type BookState = {
  /** Pages du livre, lues deux par deux (gauche, droite). */
  pages: PageContent[];
  /** Double page affichée au repos (0, 1, 2…). */
  spread: number;
  /** Avancement de la feuille en train de tourner vers la double page suivante, de 0 à 1. */
  turn: number;
  /** Part des pages déjà lues, de 0 à 1 : fait grossir le bloc de gauche. */
  read: number;
  /** Temps en secondes, pour les mouvements lents. */
  time: number;
};

export type BookStyle = {
  /** Couleur des traits, en "r, g, b". */
  ink: string;
  /** Couleur du signet, en "r, g, b". */
  ribbon: string;
  /** Couleur de remplissage des faces (le fond). */
  paper: string;
  /** Position du centre du livre dans le canevas, en fraction de la largeur et de la hauteur. */
  center: { x: number; y: number };
  /** Taille du livre, en fraction du plus petit côté utile. */
  size: number;
  reduced: boolean;
};

type V3 = [number, number, number];
type P2 = [number, number];

const W = 1; // largeur d'une page
const H = 1.36; // hauteur d'une page
const MARGIN = 0.035; // débord des couvertures
const BOARD = 0.02; // épaisseur d'une couverture

/* ---------- Masques de texte, mis en cache ---------- */

const maskCache = new Map<string, (u: number, v: number) => boolean>();

function fontFamily() {
  if (typeof document === "undefined") return "sans-serif";
  return getComputedStyle(document.body).fontFamily || "sans-serif";
}

export function resetMasks() {
  maskCache.clear();
}

function textMask(text: string) {
  const key = text;
  const hit = maskCache.get(key);
  if (hit) return hit;
  const MW = 640;
  const MH = 120;
  const c = document.createElement("canvas");
  c.width = MW;
  c.height = MH;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  let size = MH * 0.78;
  ctx.font = `700 ${size}px ${fontFamily()}`;
  const width = ctx.measureText(text).width;
  if (width > MW * 0.86) {
    size *= (MW * 0.86) / width;
    ctx.font = `700 ${size}px ${fontFamily()}`;
  }
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(text, MW * 0.07, MH * 0.54);
  const data = ctx.getImageData(0, 0, MW, MH).data;
  const fn = (u: number, v: number) => {
    const x = Math.min(MW - 1, Math.max(0, Math.floor(u * MW)));
    const y = Math.min(MH - 1, Math.max(0, Math.floor(v * MH)));
    return data[(y * MW + x) * 4 + 3] > 110;
  };
  maskCache.set(key, fn);
  return fn;
}

/* ---------- Mise en page d'une page : bandes hachurées ---------- */

type Band = { v0: number; v1: number; text?: string };

function layout(content: PageContent | undefined): Band[] {
  // Comme les bandes de la sphère : la page est presque couverte de hachures, avec des
  // respirations noires entre les bandes et le quadrillage visible en pied de page.
  const bands: Band[] = [{ v0: 0.885, v1: 0.905 }];
  let top = 0.86;
  for (const text of (content?.lines ?? []).slice(0, 3)) {
    bands.push({ v0: top - 0.14, v1: top, text });
    top -= 0.165;
  }
  while (top - 0.1 > 0.22) {
    bands.push({ v0: top - 0.1, v1: top });
    top -= 0.13;
  }
  bands.push({ v0: 0.07, v1: 0.085 });
  return bands;
}

/* ---------- Rendu ---------- */

export function drawBook(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: BookState,
  style: BookStyle,
) {
  const reduced = style.reduced;
  const t = reduced ? 0 : state.time;

  const scale = Math.min(w / 2.5, h / 1.9) * style.size;
  const cx = w * style.center.x;
  const cy = h * style.center.y;
  const yaw = -0.16 + Math.sin(t * 0.17) * 0.1;
  const elev = 0.98 + Math.sin(t * 0.21) * 0.035;
  const D = 4.2;
  const cyaw = Math.cos(yaw);
  const syaw = Math.sin(yaw);
  const ce = Math.cos(elev);
  const se = Math.sin(elev);

  // Monde : x vers la droite, y le long de la reliure (vers le fond), z vers le haut.
  const project = ([x, y, z]: V3): [number, number, number] => {
    const xr = x * cyaw - y * syaw;
    const yr = x * syaw + y * cyaw;
    const up = z * ce + yr * se;
    const depth = z * se - yr * ce;
    const p = D / (D - depth);
    return [cx + xr * p * scale, cy - up * p * scale, depth];
  };

  const ink = (a: number) => `rgba(${style.ink},${a})`;

  // Épaisseur des blocs de pages : la gauche grossit à mesure qu'on lit.
  const sL = 0.02 + 0.06 * state.read;
  const sR = 0.08 - 0.06 * state.read;

  const boardZ = (u: number) => Math.abs(u) * 0.09;
  const topZ = (u: number, s: number) => {
    const k = Math.min(1, u / 0.2);
    return boardZ(u) + s * (1 - (1 - k) * (1 - k)) + 0.075 * Math.sin(Math.PI * u) * (1 - 0.45 * u);
  };

  // Surfaces paramétrées (u de la reliure vers le bord, v de la queue vers la tête).
  const pageTop = (side: -1 | 1, s: number) => (u: number, v: number): V3 => {
    const flutter = reduced ? 0 : Math.sin(t * 0.8 + v * 3 + side) * 0.006 * u;
    return [side * u * W, (v - 0.5) * H, topZ(u, s) + flutter];
  };

  const path = (pts: P2[], close = false) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    if (close) ctx.closePath();
  };
  const proj2 = (p: V3): P2 => {
    const [x, y] = project(p);
    return [x, y];
  };

  const fillStroke = (pts: P2[], strokeAlpha: number, lineWidth = 1) => {
    path(pts, true);
    ctx.fillStyle = style.paper;
    ctx.fill();
    ctx.strokeStyle = ink(strokeAlpha);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const polyline = (pts: P2[], alpha: number, lineWidth = 0.8) => {
    path(pts);
    ctx.strokeStyle = ink(alpha);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  /* Surface de page : contour, quadrillage, bandes hachurées avec mots en creux. */
  const drawSurface = (
    f: (u: number, v: number) => V3,
    content: PageContent | undefined,
    mirror: boolean,
    alpha = 1,
  ) => {
    const N = 36;
    const outline: P2[] = [];
    for (let i = 0; i <= N; i++) outline.push(proj2(f(i / N, 0)));
    for (let i = 0; i <= N; i++) outline.push(proj2(f(1, i / N)));
    for (let i = N; i >= 0; i--) outline.push(proj2(f(i / N, 1)));
    for (let i = N; i >= 0; i--) outline.push(proj2(f(0, i / N)));
    fillStroke(outline, 0.85 * alpha, 1);

    // Quadrillage discret, comme l'hémisphère sud de la sphère
    for (let k = 1; k < 6; k++) {
      const pts: P2[] = [];
      for (let i = 0; i <= 24; i++) pts.push(proj2(f(k / 6, i / 24)));
      polyline(pts, 0.22 * alpha, 0.7);
    }
    for (let k = 1; k < 9; k++) {
      const pts: P2[] = [];
      for (let i = 0; i <= 24; i++) pts.push(proj2(f(i / 24, k / 9)));
      polyline(pts, 0.22 * alpha, 0.7);
    }

    for (const band of layout(content)) {
      const u0 = 0.06;
      const u1 = 0.94;
      // Fond noir de la bande, pour couper le quadrillage
      const poly: P2[] = [];
      for (let i = 0; i <= 20; i++) poly.push(proj2(f(u0 + (i / 20) * (u1 - u0), band.v0)));
      for (let i = 20; i >= 0; i--) poly.push(proj2(f(u0 + (i / 20) * (u1 - u0), band.v1)));
      path(poly, true);
      ctx.fillStyle = style.paper;
      ctx.fill();

      // Nombre de rangées : une tous les ~2,2 px à l'écran
      const a = project(f(0.5, band.v0));
      const b = project(f(0.5, band.v1));
      const rows = Math.max(3, Math.min(110, Math.round(Math.hypot(a[0] - b[0], a[1] - b[1]) / 1.7)));
      const mask = band.text ? textMask(band.text) : null;
      ctx.strokeStyle = ink(0.85 * alpha);
      ctx.lineWidth = 0.6;
      const steps = 120;
      for (let r = 0; r <= rows; r++) {
        const lv = r / rows;
        const v = band.v0 + lv * (band.v1 - band.v0);
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= steps; i++) {
          const u = u0 + (i / steps) * (u1 - u0);
          const lu = (u - u0) / (u1 - u0);
          const hole = mask ? mask(mirror ? 1 - lu : lu, 1 - lv) : false;
          if (hole) {
            pen = false;
            continue;
          }
          const [x, y] = proj2(f(u, v));
          if (!pen) {
            ctx.moveTo(x, y);
            pen = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  };

  /* Couverture d'un côté : plateau, épaisseur visible en queue et sur le bord extérieur. */
  const drawBoard = (side: -1 | 1) => {
    const y0 = -H / 2 - MARGIN;
    const y1 = H / 2 + MARGIN;
    const u1 = W + MARGIN;
    const z = (u: number) => boardZ(u) - 0.004;
    const top: P2[] = [
      proj2([0, y0, z(0)]),
      proj2([side * u1, y0, z(u1)]),
      proj2([side * u1, y1, z(u1)]),
      proj2([0, y1, z(0)]),
    ];
    fillStroke(top, 0.6, 1);
    // tranche de la couverture, côté queue
    fillStroke(
      [
        proj2([0, y0, z(0)]),
        proj2([side * u1, y0, z(u1)]),
        proj2([side * u1, y0, z(u1) - BOARD]),
        proj2([0, y0, z(0) - BOARD]),
      ],
      0.6,
      1,
    );
    // tranche extérieure
    fillStroke(
      [
        proj2([side * u1, y0, z(u1)]),
        proj2([side * u1, y1, z(u1)]),
        proj2([side * u1, y1, z(u1) - BOARD]),
        proj2([side * u1, y0, z(u1) - BOARD]),
      ],
      0.45,
      1,
    );
  };

  /* Bloc de pages : tranche de queue (les feuilles empilées) et gouttière extérieure. */
  const drawBlock = (side: -1 | 1, s: number) => {
    const y0 = -H / 2;
    const y1 = H / 2;
    const N = 40;
    // tranche de queue : entre le dessus des pages et la couverture
    const tail: P2[] = [];
    for (let i = 0; i <= N; i++) tail.push(proj2([side * (i / N) * W, y0, topZ(i / N, s)]));
    for (let i = N; i >= 0; i--) tail.push(proj2([side * (i / N) * W, y0, boardZ(i / N)]));
    fillStroke(tail, 0.75, 1);
    const sheets = Math.max(4, Math.round(s * 260));
    for (let k = 1; k < sheets; k++) {
      const f = k / sheets;
      const pts: P2[] = [];
      for (let i = 0; i <= N; i++) {
        const u = i / N;
        pts.push(proj2([side * u * W, y0, boardZ(u) + f * (topZ(u, s) - boardZ(u))]));
      }
      polyline(pts, 0.5, 0.6);
    }
    // gouttière extérieure (bord avant du bloc)
    const zt = topZ(1, s);
    const zb = boardZ(1);
    fillStroke(
      [proj2([side * W, y0, zb]), proj2([side * W, y1, zb]), proj2([side * W, y1, zt]), proj2([side * W, y0, zt])],
      0.6,
      1,
    );
    for (let k = 1; k < sheets; k++) {
      const z = zb + (k / sheets) * (zt - zb);
      polyline([proj2([side * W, y0, z]), proj2([side * W, y1, z])], 0.4, 0.6);
    }
  };

  /* Dos du livre, visible en queue sous la gouttière. */
  const drawSpine = () => {
    const pts: P2[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = Math.PI * (i / 16);
      pts.push(proj2([-Math.cos(a) * 0.05, -H / 2 - MARGIN, -0.004 - Math.sin(a) * 0.05]));
    }
    fillStroke(pts, 0.7, 1);
  };

  /* Signet : ruban qui sort de la tête du livre, passe sur la page et pend en queue. */
  const drawRibbon = () => {
    const sway = reduced ? 0 : Math.sin(t * 0.7) * 0.02;
    const pts: V3[] = [
      [0.012, -H / 2 - 0.0, 0.01],
      [0.03 + sway, -H / 2 - 0.12, -0.06],
      [0.05 + sway * 2, -H / 2 - 0.24, -0.16],
      [0.055 + sway * 3, -H / 2 - 0.33, -0.27],
    ];
    const wdt = 0.028;
    const left = pts.map(([x, y, z]) => proj2([x - wdt / 2, y, z]));
    const right = pts.map(([x, y, z]) => proj2([x + wdt / 2, y, z]));
    const end = pts[pts.length - 1];
    const notch = proj2([end[0], end[1] - 0.03, end[2] - 0.04]);
    path([...left, notch, ...right.reverse()], true);
    ctx.fillStyle = `rgba(${style.ribbon},0.9)`;
    ctx.fill();
  };

  /* Feuille qui tourne : profil courbé, charnière sur la reliure. */
  const turning = state.turn > 0.001 && state.turn < 0.999;
  const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const leafSurface = () => {
    const k = ease(state.turn);
    const theta = 0.14 + k * (Math.PI - 0.28);
    const bend = 0.95 * Math.sin(Math.PI * k);
    const n = 40;
    const prof: [number, number][] = [[0, 0.03]];
    for (let i = 1; i <= n; i++) {
      const u = i / n;
      const phi = theta - bend * u;
      const [px, pz] = prof[i - 1];
      prof.push([px + (Math.cos(phi) * W) / n, pz + (Math.sin(phi) * W) / n]);
    }
    const at = (u: number): [number, number] => {
      const f = u * n;
      const i = Math.min(n - 1, Math.floor(f));
      const r = f - i;
      return [prof[i][0] + (prof[i + 1][0] - prof[i][0]) * r, prof[i][1] + (prof[i + 1][1] - prof[i][1]) * r];
    };
    const surf = (u: number, v: number): V3 => {
      const [x, z] = at(u);
      return [x, (v - 0.5) * H, z];
    };
    const midPhi = theta - bend * 0.5;
    return { surf, frontUp: midPhi < Math.PI / 2, lift: Math.min(1, state.turn / 0.06, (1 - state.turn) / 0.06) };
  };

  const pages = state.pages;
  const page = (i: number) => pages[((i % pages.length) + pages.length) % pages.length];
  const L = page(state.spread * 2);
  const R = page(state.spread * 2 + 1);
  const nextL = page(state.spread * 2 + 2);
  const nextR = page(state.spread * 2 + 3);

  // Ordre de peinture : du fond vers l'avant.
  drawRibbonBehind();
  drawBoard(-1);
  drawBoard(1);
  drawSpine();
  drawBlock(-1, sL);
  drawBlock(1, sR);
  drawSurface(pageTop(-1, sL), L, true);
  drawSurface(pageTop(1, sR), turning ? nextR : R, false);
  if (turning) {
    const leaf = leafSurface();
    drawSurface(leaf.surf, leaf.frontUp ? R : nextL, !leaf.frontUp, leaf.lift);
  }
  // Reliure
  const spine: P2[] = [];
  for (let i = 0; i <= 20; i++) spine.push(proj2([0, (i / 20 - 0.5) * H, 0.002]));
  polyline(spine, 0.95, 1.2);
  drawRibbon();

  function drawRibbonBehind() {
    // La part du signet qui dépasse en tête, derrière le livre
    const p0 = proj2([0.012, H / 2 + 0.02, 0.01]);
    const p1 = proj2([0.012, H / 2 + 0.09, 0.0]);
    ctx.strokeStyle = `rgba(${style.ribbon},0.9)`;
    ctx.lineWidth = Math.max(2, scale * 0.024);
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.stroke();
  }
}
