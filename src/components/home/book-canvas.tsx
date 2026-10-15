"use client";

import { useEffect, useRef } from "react";

/*
 * Livre ouvert stylisé, dessiné en canvas 2D dans l'esprit de la sphère de neon.com :
 * un fil de fer très fin, et des bandes de hachures serrées où des mots apparaissent en creux.
 * Les deux pages sont des surfaces courbes projetées en perspective ; le livre respire et
 * oscille lentement. Pause hors écran, image fixe si l'utilisateur réduit les animations.
 */

const COLOR = "126, 206, 230"; // teal Klayer bleuté

// Bandes hachurées : [début, fin] le long de la hauteur de page, et le mot gravé en creux.
const BANDS: { v0: number; v1: number; word: string; page: 0 | 1 }[] = [
  { v0: 0.12, v1: 0.24, word: "Cadrer", page: 0 },
  { v0: 0.3, v1: 0.46, word: "Déployer", page: 0 },
  { v0: 0.52, v1: 0.6, word: "", page: 0 },
  { v0: 0.14, v1: 0.3, word: "Construire", page: 1 },
  { v0: 0.36, v1: 0.44, word: "", page: 1 },
  { v0: 0.5, v1: 0.66, word: "Faire adopter", page: 1 },
];

type Vec3 = [number, number, number];

function buildMasks() {
  // Un masque texte par bande, en coordonnées de page (u, v locales à la bande).
  const W = 400;
  const H = 80;
  return BANDS.map((b) => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    if (b.word) {
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(H * 0.62)}px Inter, system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = b.page === 0 ? "right" : "left";
      ctx.fillText(b.word, b.page === 0 ? W * 0.9 : W * 0.1, H * 0.54);
    }
    const data = ctx.getImageData(0, 0, W, H).data;
    return (u: number, v: number) => {
      const x = Math.min(W - 1, Math.max(0, Math.floor(u * W)));
      const y = Math.min(H - 1, Math.max(0, Math.floor(v * H)));
      return data[(y * W + x) * 4 + 3] > 100;
    };
  });
}

export function BookCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let masks = buildMasks();
    // Inter peut arriver après le premier rendu : on régénère les masques une fois chargée.
    document.fonts?.ready.then(() => (masks = buildMasks()));

    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w * 0.42, h * 0.7);
      const cx = w * 0.58;
      const cy = h * 0.5;
      const yaw = reduced ? -0.18 : -0.18 + Math.sin(t * 0.18) * 0.12;
      const tilt = 1.02 + (reduced ? 0 : Math.sin(t * 0.23) * 0.04);
      const lift = 0.34 + (reduced ? 0 : Math.sin(t * 0.5) * 0.025);
      const camera = 3.4;

      // Point d'une page : u de la reliure (0) au bord (1), v du bas (0) au haut (1).
      const surface = (page: 0 | 1, u: number, v: number): Vec3 => {
        const side = page === 0 ? -1 : 1;
        const flutter = reduced ? 0 : Math.sin(t * 0.9 + v * 2 + page) * 0.012 * u;
        const x = side * u * 0.98;
        const z = -lift * Math.sin(Math.min(1, u * 1.15) * Math.PI * 0.62) * (1 - u * 0.35) + flutter;
        const y = (v - 0.5) * 1.3;
        return [x, y, z];
      };

      const project = ([x, y, z]: Vec3): [number, number, number] => {
        // Lacet, puis inclinaison vers le spectateur, puis perspective.
        const x1 = x * Math.cos(yaw) - z * Math.sin(yaw) * 0.3;
        const z1 = x * Math.sin(yaw) * 0.3 + z * Math.cos(yaw);
        const y2 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
        const z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
        const p = camera / (camera - z2);
        return [cx + x1 * p * scale, cy - y2 * p * scale, z2];
      };

      ctx.lineCap = "round";

      for (const page of [0, 1] as const) {
        // Contour de la page
        ctx.strokeStyle = `rgba(${COLOR},0.75)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const outline: [number, number][] = [];
        for (let i = 0; i <= 40; i++) outline.push([i / 40, 0]);
        for (let i = 0; i <= 40; i++) outline.push([1, i / 40]);
        for (let i = 40; i >= 0; i--) outline.push([i / 40, 1]);
        outline.forEach(([u, v], i) => {
          const [px, py] = project(surface(page, u, v));
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Fil de fer : lignes de colonne (u constant) et réglure (v constant)
        ctx.strokeStyle = `rgba(${COLOR},0.32)`;
        ctx.lineWidth = 0.8;
        for (let k = 1; k < 8; k++) {
          const u = k / 8;
          ctx.beginPath();
          for (let i = 0; i <= 30; i++) {
            const [px, py] = project(surface(page, u, i / 30));
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        for (let k = 1; k < 10; k++) {
          const v = k / 10;
          ctx.beginPath();
          for (let i = 0; i <= 40; i++) {
            const [px, py] = project(surface(page, i / 40, v));
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // Bandes hachurées, mots en creux
        BANDS.forEach((band, bi) => {
          if (band.page !== page) return;
          const mask = masks[bi];
          const rows = Math.round((band.v1 - band.v0) * 260);
          ctx.strokeStyle = `rgba(${COLOR},0.62)`;
          ctx.lineWidth = 0.7;
          for (let r = 0; r <= rows; r++) {
            const lv = r / rows;
            const v = band.v0 + lv * (band.v1 - band.v0);
            ctx.beginPath();
            let drawing = false;
            const steps = 90;
            for (let i = 0; i <= steps; i++) {
              const u = 0.04 + (i / steps) * 0.92;
              const local = page === 0 ? 1 - u : u;
              const hole = mask(local, 1 - lv);
              const [px, py] = project(surface(page, u, v));
              if (hole) {
                drawing = false;
                continue;
              }
              if (!drawing) {
                ctx.moveTo(px, py);
                drawing = true;
              } else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
        });
      }

      // Reliure
      ctx.strokeStyle = `rgba(${COLOR},0.9)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i <= 30; i++) {
        const [px, py] = project(surface(0, 0, i / 30));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };

    const loop = (time: number) => {
      // ~30 images par seconde suffisent pour un mouvement aussi lent
      if (visible && time - last > 33) {
        draw(time);
        last = time;
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
