"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionIntro } from "@/components/home/section-intro";
import { cn } from "@/lib/cn";

function FeatureHeading({ lines }: { lines: [string, string] }) {
  return (
    <h3 className="flex flex-col items-start gap-1 font-mono text-[1.625rem] uppercase leading-none tracking-tight text-teal-100 md:text-[2.25rem] xl:text-[2.75rem]">
      {lines.map((l) => (
        <span key={l} className="bg-teal-deep px-2 py-1">
          {l}
        </span>
      ))}
    </h3>
  );
}

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- PME : console Jumpstart ---------- */

const CONSOLE_LINES = [
  "Ouverture de l'espace Claude de l'équipe…",
  "Connecteurs branchés : messagerie, agenda, Drive",
  "Premières Skills installées",
  "Atelier de prise en main planifié",
  "Équipe prête",
];

function Console() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s >= CONSOLE_LINES.length + 3 ? 0 : s + 1)), 700);
    return () => clearInterval(id);
  }, [inView]);
  const shown = Math.min(step, CONSOLE_LINES.length);
  const blocks = 24;
  const filled = Math.round((shown / CONSOLE_LINES.length) * blocks);
  return (
    <div ref={ref} className="border border-gray-15 bg-gray-8 p-5 font-mono text-[13px] md:p-6">
      <p className="text-gray-50">$ klayer jumpstart --equipe=direction</p>
      <ul className="mt-4 min-h-36 space-y-2">
        {CONSOLE_LINES.slice(0, shown).map((l, i) => (
          <motion.li key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <span className={i === CONSOLE_LINES.length - 1 ? "text-teal-400" : "text-gray-40"}>
              {i === CONSOLE_LINES.length - 1 ? "●" : "✓"}
            </span>
            <span className={i === CONSOLE_LINES.length - 1 ? "text-white" : "text-gray-70"}>{l}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-5 flex gap-1" aria-hidden>
        {Array.from({ length: blocks }, (_, i) => (
          <span
            key={i}
            className={cn("h-3 flex-1 transition-colors duration-300", i < filled ? "bg-teal-400" : "bg-gray-15")}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Directions de fonction : cartes déplaçables ---------- */

const FUNCTIONS = [
  { name: "Ressources humaines", x: 4, y: 14, r: -4 },
  { name: "Finance", x: 36, y: 10, r: 3 },
  { name: "Ventes", x: 64, y: 18, r: -2 },
  { name: "Secrétariat général", x: 6, y: 46, r: 2 },
  { name: "Juridique", x: 40, y: 42, r: -3 },
  { name: "Achats", x: 68, y: 52, r: 4 },
  { name: "Marketing", x: 16, y: 74, r: -1 },
  { name: "Support client", x: 50, y: 76, r: 2 },
];

function FunctionCards() {
  const area = useRef<HTMLDivElement>(null);
  return (
    <>
    <ul className="flex flex-wrap gap-2 md:hidden">
      {FUNCTIONS.map((f) => (
        <li key={f.name} className="border border-gray-20 bg-gray-10 px-3 py-2.5">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-teal-400">Agents Claude</span>
          <span className="mt-1 block text-[15px] tracking-extra-tight text-white">{f.name}</span>
        </li>
      ))}
    </ul>
    <div ref={area} className="relative hidden h-[26rem] overflow-hidden border border-gray-15 bg-gray-8 md:block">
      <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider text-gray-50">
        Déplacez les cartes
      </span>
      {FUNCTIONS.map((f) => (
        <motion.div
          key={f.name}
          drag
          dragConstraints={area}
          dragElastic={0.15}
          whileHover={{ y: -4 }}
          whileDrag={{ scale: 1.06, zIndex: 20, cursor: "grabbing" }}
          className="absolute cursor-grab select-none border border-gray-20 bg-gray-10 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          style={{ left: `${f.x}%`, top: `${f.y}%`, rotate: f.r }}
        >
          <span className="block font-mono text-[10px] uppercase tracking-wider text-teal-400">Agents Claude</span>
          <span className="mt-1 block whitespace-nowrap text-[15px] tracking-extra-tight text-white">{f.name}</span>
        </motion.div>
      ))}
    </div>
    </>
  );
}

/* ---------- ETI : orbites ---------- */

function Orbits() {
  const rings = [
    { r: 18, n: 3, d: 18 },
    { r: 30, n: 6, d: 28 },
    { r: 42, n: 10, d: 40 },
  ];
  return (
    <div className="relative aspect-square w-full max-w-[34rem] overflow-hidden rounded-full border border-gray-15 bg-[radial-gradient(circle,#0a2127_0%,#000_70%)]">
      {rings.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute inset-0"
          animate={{ rotate: ri % 2 ? -360 : 360 }}
          transition={{ duration: ring.d, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute rounded-full border border-dashed border-teal-500/30"
            style={{ inset: `${50 - ring.r}%` }}
          />
          {Array.from({ length: ring.n }, (_, i) => {
            const a = (i / ring.n) * Math.PI * 2;
            return (
              <span
                key={i}
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
                style={{ left: `${50 + Math.cos(a) * ring.r}%`, top: `${50 + Math.sin(a) * ring.r}%`, opacity: 0.4 + ri * 0.2 }}
              />
            );
          })}
        </motion.div>
      ))}
      <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_0_30px_8px_rgba(52,211,216,0.6)]" />
    </div>
  );
}

export function Audiences() {
  return (
    <section id="pour-qui" className="relative scroll-mt-20 py-24 md:py-32 xl:py-40">
      <Container>
        <SectionIntro
          label="Pour qui"
          index="03"
          title="De la première équipe à toute l'entreprise."
          subtitle="Une PME qui démarre et une ETI qui passe à l'échelle s'appuient sur la même méthode et les mêmes agents."
        />

        <div className="mt-20 flex flex-col gap-24 lg:mt-28 lg:gap-36">
          {/* PME */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <FeatureHeading lines={["Pour les PME", "qui démarrent"]} />
              <p className="mt-8 max-w-[30rem] text-lg leading-snug tracking-extra-tight text-gray-60">
                <span className="text-white">Jumpstart pour PME.</span> Un accompagnement court pour équiper une petite
                structure, installer les bons usages et rendre l&apos;équipe autonome sur Claude.
              </p>
            </div>
            <Console />
          </div>

          {/* Directions de fonction */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <FeatureHeading lines={["Pour les directions", "de fonction"]} />
              <p className="mt-8 max-w-[30rem] text-lg leading-snug tracking-extra-tight text-gray-60">
                <span className="text-white">Le Play Déployer est notre porte d&apos;entrée.</span> RH, ventes, finance,
                secrétariat général : nous déployons Claude sur le poste des équipes, avec leurs Skills et leurs
                Plugins.
              </p>
              <figure className="mt-8 max-w-[30rem] border border-gray-15 bg-gray-8">
                <figcaption className="border-b border-gray-15 bg-gray-15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-gray-70">
                  Livré chez une cliente
                </figcaption>
                <p className="px-4 py-4 text-[15px] leading-relaxed tracking-extra-tight text-gray-70">
                  Un agent Claude de veille RH et SSCT, qui analyse les évolutions réglementaires et conventionnelles et
                  met à jour le book RH de la cliente, au sein d&apos;un artefact Claude publié dans son organisation.
                </p>
              </figure>
            </div>
            <div className="lg:order-1">
              <FunctionCards />
            </div>
          </div>

          {/* ETI */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <FeatureHeading lines={["Pour les ETI", "à l'échelle"]} />
              <p className="mt-8 max-w-[30rem] text-lg leading-snug tracking-extra-tight text-gray-60">
                <span className="text-white">Des usages individuels à une capacité d&apos;organisation.</span> Cadrage,
                architecture cible, gouvernance, puis déploiement fonction par fonction.
              </p>
              <div className="mt-8 max-w-[22rem] border border-gray-15 bg-gray-8">
                <div className="bg-gray-20 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-gray-80">
                  Notre cœur de cible
                </div>
                <div className="px-4 py-5">
                  <p className="text-5xl tracking-tighter text-white">200 à 2 000</p>
                  <p className="mt-2 text-[15px] tracking-extra-tight text-gray-60">
                    salariés : les ETI françaises que nous accompagnons.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Orbits />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
