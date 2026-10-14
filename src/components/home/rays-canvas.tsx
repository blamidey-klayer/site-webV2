"use client";

import { useEffect, useRef } from "react";

/*
 * Fond animé du hero et du CTA : des rayons qui convergent vers un point focal, comme les
 * branches du glyphe Klayer, parcourus par des impulsions lumineuses teal. Dessiné en canvas 2D,
 * mis en pause hors écran et figé si l'utilisateur réduit les animations.
 */

type Ray = { angle: number; length: number; width: number; alpha: number };
type Pulse = { ray: number; t: number; speed: number; size: number };

const TEAL = [52, 211, 216];

export function RaysCanvas({
  className,
  focus = { x: 0.72, y: 1.02 },
  density = 64,
}: {
  className?: string;
  focus?: { x: number; y: number };
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;

    // Rayons répartis sur un demi-cercle supérieur, avec des axes francs (vertical, diagonales,
    // horizontales) plus marqués, en écho au glyphe.
    const rays: Ray[] = [];
    const axes = [Math.PI, (5 * Math.PI) / 4, (11 * Math.PI) / 8, (3 * Math.PI) / 2, (13 * Math.PI) / 8, (7 * Math.PI) / 4, 2 * Math.PI];
    for (let i = 0; i < density; i++) {
      const angle = Math.PI + (Math.PI * i) / (density - 1);
      const isAxis = axes.some((a) => Math.abs(a - angle) < Math.PI / density);
      rays.push({
        angle,
        length: 0.55 + Math.random() * 0.6,
        width: isAxis ? 1.2 : 0.6,
        alpha: isAxis ? 0.42 : 0.08 + Math.random() * 0.14,
      });
    }
    const pulses: Pulse[] = Array.from({ length: Math.round(density / 3) }, () => ({
      ray: Math.floor(Math.random() * rays.length),
      t: Math.random(),
      speed: 0.0018 + Math.random() * 0.004,
      size: 0.06 + Math.random() * 0.1,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const fx = focus.x * w;
      const fy = focus.y * h;
      const reach = Math.hypot(w, h) * 0.75;

      // Halo au point focal
      const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, reach * 0.45);
      glow.addColorStop(0, `rgba(${TEAL.join(",")},0.22)`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      for (const r of rays) {
        const ex = fx + Math.cos(r.angle) * reach * r.length;
        const ey = fy + Math.sin(r.angle) * reach * r.length;
        const g = ctx.createLinearGradient(fx, fy, ex, ey);
        g.addColorStop(0, `rgba(${TEAL.join(",")},${r.alpha})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      // Impulsions : elles remontent le rayon vers le point focal
      for (const p of pulses) {
        const r = rays[p.ray];
        const len = reach * r.length;
        const head = (1 - p.t) * len;
        const tail = Math.min(len, head + p.size * len);
        const hx = fx + Math.cos(r.angle) * head;
        const hy = fy + Math.sin(r.angle) * head;
        const tx = fx + Math.cos(r.angle) * tail;
        const ty = fy + Math.sin(r.angle) * tail;
        const g = ctx.createLinearGradient(hx, hy, tx, ty);
        const fade = Math.sin(p.t * Math.PI);
        g.addColorStop(0, `rgba(160,245,247,${0.9 * fade})`);
        g.addColorStop(1, "rgba(52,211,216,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        if (!reduced) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.ray = Math.floor(Math.random() * rays.length);
            p.speed = 0.0018 + Math.random() * 0.004;
          }
        }
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px" });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [focus.x, focus.y, density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
