"use client";

import { useEffect, useRef } from "react";

// Tracé du glyphe Klayer (Design system, assets/Logos/glyph-teal.svg), viewBox 797 × 512.
const GLYPH_PATH =
  "M3700 3468 l0 -1653 -1163 1163 -1162 1162 -205 -205 -204 -204 724 -728 c399 -400 804 -808 900 -906 l175 -177 -90 36 c-49 20 -452 186 -895 369 -1310 541 -1372 567 -1380 558 -8 -8 -192 -450 -204 -490 -5 -16 -2 -25 13 -32 22 -12 278 -119 1011 -421 551 -227 1049 -434 1195 -497 l90 -38 -1253 -3 -1252 -2 2 -288 3 -287 1310 -6 c1185 -5 1318 -7 1395 -23 337 -68 602 -180 836 -352 145 -106 246 -214 328 -352 21 -34 46 -67 56 -72 26 -14 93 -12 113 3 9 6 44 55 78 107 121 185 315 346 574 475 230 114 446 179 677 204 63 7 538 11 1348 11 l1250 0 0 290 0 290 -1252 0 c-689 0 -1248 4 -1242 9 9 8 148 65 1074 446 1151 473 1236 509 1233 521 -3 12 -204 508 -208 512 -2 2 -106 -39 -232 -91 -125 -52 -316 -131 -423 -175 -204 -84 -1202 -495 -1519 -626 -101 -42 -186 -75 -188 -72 -2 2 398 407 889 901 491 493 894 900 896 904 1 3 -88 96 -197 205 l-200 200 -173 -169 c-95 -93 -616 -614 -1157 -1157 -542 -544 -988 -988 -993 -988 -4 0 -8 743 -8 1650 l0 1650 -285 0 -285 0 0 -1652z";

type Particle = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; c: string; phase: number };

const LIGHT = ["#10323b", "#10323b", "#10323b", "#1e4b57", "#3e7280", "#ae4f2e"];
const DARK = ["#ffffff", "#ffffff", "#ffffff", "#cfdadd", "#3e7280", "#ae4f2e"];

export function ParticleGlyph({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = onDark ? DARK : LIGHT;
    const dustColor = onDark ? "rgba(255,255,255,0.35)" : "#3e7280";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rendu du glyphe dans un canevas hors écran pour en échantillonner les pixels.
      const off = document.createElement("canvas");
      off.width = Math.round(w);
      off.height = Math.round(h);
      const o = off.getContext("2d");
      if (!o) return;
      const scale = Math.min((w * 0.8) / 797, (h * 0.62) / 512);
      const gx = (w - 797 * scale) / 2;
      const gy = (h - 512 * scale) / 2;
      o.translate(gx, gy);
      o.scale(scale, scale);
      o.translate(0, 512);
      o.scale(0.1, -0.1);
      o.fill(new Path2D(GLYPH_PATH));

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = w < 640 ? 6 : 7;
      const next: Particle[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            const jitter = () => (Math.random() - 0.5) * step * 0.6;
            next.push({
              x: reduce ? x : Math.random() * w,
              y: reduce ? y : Math.random() * h,
              tx: x + jitter(),
              ty: y + jitter(),
              vx: 0,
              vy: 0,
              r: 1 + Math.random() * 1.4,
              c: COLORS[Math.floor(Math.random() * COLORS.length)],
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      // Poussière ambiante autour du glyphe.
      const dust = Math.round((w * h) / 9000);
      for (let i = 0; i < dust; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        next.push({ x, y, tx: x, ty: y, vx: 0, vy: 0, r: 0.8 + Math.random(), c: dustColor, phase: Math.random() * Math.PI * 2 });
      }
      particles = next;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const drift = reduce ? 0 : 1.6;
        const ox = Math.cos(t / 1400 + p.phase) * drift;
        const oy = Math.sin(t / 1700 + p.phase) * drift;
        if (!reduce) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const radius = 90;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / radius) * 2.4;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx += (p.tx + ox - p.x) * 0.018;
          p.vy += (p.ty + oy - p.y) * 0.018;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      build();
      raf = requestAnimationFrame(draw);
    });
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [onDark]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
