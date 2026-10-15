"use client";

import { useEffect, useRef } from "react";
import { drawBook, resetMasks, type BookStyle, type PageContent } from "@/components/home/book-engine";

/*
 * Livre ouvert du hero : il se feuillette seul, lentement, dans le langage visuel de la sphère
 * de neon.com (voir book-engine.ts). Pause hors écran, livre immobile si l'utilisateur réduit
 * les animations.
 */

const PAGES: PageContent[] = [
  { lines: ["Cadrer"] },
  { lines: ["Déployer"] },
  { lines: ["Construire"] },
  { lines: ["Faire", "adopter"] },
  { lines: ["Customer", "Zero"] },
  { lines: ["Claude"] },
];

const REST_S = 4.5;
const TURN_S = 2.6;

export function BookCanvas({ className, style }: { className?: string; style?: Partial<BookStyle> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const styleRef = useRef(style);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.fonts?.ready.then(resetMasks);

    const bookStyle: BookStyle = {
      ink: "236, 246, 250",
      ribbon: "52, 211, 216",
      paper: "#000",
      center: { x: 0.5, y: 0.5 },
      size: 1,
      reduced,
      ...styleRef.current,
    };

    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let last = 0;
    const spreads = PAGES.length / 2;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (ms: number) => {
      const time = ms / 1000;
      const cycle = REST_S + TURN_S;
      const n = Math.floor(time / cycle);
      const phase = time - n * cycle;
      const spread = n % spreads;
      const turn = reduced || phase < REST_S ? 0 : (phase - REST_S) / TURN_S;
      ctx.clearRect(0, 0, w, h);
      drawBook(
        ctx,
        w,
        h,
        { pages: PAGES, spread, turn, read: (spread + turn) / spreads, time },
        bookStyle,
      );
    };

    const loop = (ms: number) => {
      if (visible && ms - last > 33) {
        render(ms);
        last = ms;
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    render(0);
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      render(performance.now());
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
