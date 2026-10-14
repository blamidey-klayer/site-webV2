"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionIntro } from "@/components/home/section-intro";
import { cn } from "@/lib/cn";

const CYCLE_MS = 4200;

/* ---------- Visuels animés, un par Play ---------- */

function CadrerVisual({ active }: { active: boolean }) {
  // Une matrice de processus ; les cas d'usage prioritaires s'allument puis remontent en tête.
  const cells = Array.from({ length: 24 }, (_, i) => i);
  const picked = [3, 8, 13, 17, 22];
  return (
    <div className="grid h-full grid-cols-6 content-end gap-1.5 p-5">
      {cells.map((i) => {
        const on = picked.includes(i);
        return (
          <motion.span
            key={i}
            className="aspect-square border border-gray-20"
            animate={{
              backgroundColor: active && on ? "rgba(52,211,216,0.85)" : "rgba(255,255,255,0.02)",
              borderColor: active && on ? "rgba(111,228,231,1)" : "rgba(48,50,54,1)",
            }}
            transition={{ duration: 0.4, delay: active && on ? 0.25 + picked.indexOf(i) * 0.2 : 0 }}
          />
        );
      })}
    </div>
  );
}

function DeployerVisual({ active }: { active: boolean }) {
  // Un agent central relié aux postes d'une fonction métier.
  const seats = [
    { x: 18, y: 22 },
    { x: 82, y: 22 },
    { x: 12, y: 62 },
    { x: 88, y: 62 },
    { x: 50, y: 90 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full p-4" aria-hidden>
      {seats.map((s, i) => (
        <motion.line
          key={i}
          x1={50}
          y1={50}
          x2={s.x}
          y2={s.y}
          stroke="#34d3d8"
          strokeWidth={0.5}
          initial={false}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.8 : 0.15 }}
          transition={{ duration: 0.6, delay: active ? 0.2 + i * 0.15 : 0 }}
        />
      ))}
      {seats.map((s, i) => (
        <rect key={i} x={s.x - 4} y={s.y - 4} width={8} height={8} fill="#18191b" stroke="#494b50" strokeWidth={0.5} />
      ))}
      <motion.rect
        x={42}
        y={42}
        width={16}
        height={16}
        fill="#10323b"
        stroke="#34d3d8"
        strokeWidth={0.6}
        animate={{ scale: active ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <text x={50} y={52.5} textAnchor="middle" fontSize={6} fill="#c6e4e7" fontFamily="monospace">
        AI
      </text>
    </svg>
  );
}

function ConstruireVisual({ active }: { active: boolean }) {
  const lines = [
    { w: "62%", c: "bg-teal-400/70" },
    { w: "40%", c: "bg-gray-30" },
    { w: "78%", c: "bg-gray-30" },
    { w: "55%", c: "bg-teal-100/50" },
    { w: "30%", c: "bg-gray-30" },
    { w: "68%", c: "bg-gray-30" },
  ];
  return (
    <div className="flex h-full flex-col justify-end gap-2.5 p-5">
      <span className="mb-1 font-mono text-[10px] uppercase tracking-wider text-gray-50">mcp-server.ts</span>
      {lines.map((l, i) => (
        <motion.span
          key={i}
          className={cn("h-1.5 origin-left", l.c)}
          style={{ width: l.w, marginLeft: i % 3 === 1 ? "12%" : 0 }}
          initial={false}
          animate={{ scaleX: active ? 1 : 0.5, opacity: active ? 1 : 0.5 }}
          transition={{ duration: 0.5, delay: active ? i * 0.18 : 0 }}
        />
      ))}
    </div>
  );
}

function AdopterVisual({ active }: { active: boolean }) {
  // Une équipe qui devient autonome : les points s'allument de proche en proche.
  const dots = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="grid h-full grid-cols-6 content-end gap-3 p-5">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="mx-auto size-2.5 rounded-full"
          initial={false}
          animate={{ backgroundColor: active ? "#34d3d8" : "#303236", opacity: active ? 1 : 0.6 }}
          transition={{ duration: 0.3, delay: active ? 0.15 + ((i * 7) % 30) * 0.05 : 0 }}
        />
      ))}
    </div>
  );
}

const PLAYS = [
  {
    name: "Cadrer",
    text: "un portefeuille de cas d'usage chiffré en capacité et une vague 1 prête à lancer.",
    Visual: CadrerVisual,
    aspect: "aspect-[4/5]",
  },
  {
    name: "Déployer",
    text: "des Agents Claude spécialisés en production dans une fonction, sur les tâches réelles.",
    Visual: DeployerVisual,
    aspect: "aspect-square",
  },
  {
    name: "Construire",
    text: "un agent, des Skills, des Plugins ou un serveur MCP intégrés à votre SI, testés et documentés.",
    Visual: ConstruireVisual,
    aspect: "aspect-[4/5]",
  },
  {
    name: "Faire adopter",
    text: "des équipes autonomes sur Claude, avec une adoption qui tient après notre départ.",
    Visual: AdopterVisual,
    aspect: "aspect-[5/6]",
  },
];

export function Offers() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hovered !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PLAYS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [inView, hovered]);

  const current = hovered ?? active;

  return (
    <section id="offres" className="relative scroll-mt-20 py-24 md:py-32 xl:py-40">
      <Container>
        <SectionIntro
          label="Nos offres"
          index="01"
          title="Pas seulement de l'IA."
          subtitle="Klayer couvre tout le chemin : cadrer, déployer, construire et faire adopter Claude dans vos équipes."
        />

        <div
          ref={ref}
          className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:items-end md:overflow-visible md:px-0 lg:mt-24 xl:grid-cols-4 xl:gap-6"
        >
          {PLAYS.map((play, i) => {
            const isActive = current === i;
            return (
              <article
                key={play.name}
                className="w-[78vw] shrink-0 snap-start md:w-auto"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => {
                  setHovered(null);
                  setActive(i);
                }}
              >
                <p
                  className={cn(
                    "max-w-80 text-lg leading-snug tracking-extra-tight transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-70",
                  )}
                >
                  <span className="text-white">{play.name}</span>{" "}
                  <span className="text-gray-60">: {play.text}</span>
                </p>
                <div
                  className={cn(
                    "relative mt-5 overflow-hidden bg-card ring-1 transition-all duration-300",
                    play.aspect,
                    isActive ? "ring-teal-400/40" : "opacity-80 ring-white/5",
                  )}
                >
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider text-gray-50">
                    Play {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-px origin-left bg-teal-400",
                      isActive && hovered === null && inView ? "animate-[grow_4.2s_linear]" : "scale-x-0",
                    )}
                    key={`${current}-${i}`}
                  />
                  <play.Visual active={isActive} />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
      <style>{`@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
