"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { cn } from "@/lib/cn";

const TOC = [
  { id: "methode", label: "Méthode", theme: "light" as const },
  { id: "gouvernance", label: "Gouvernance", theme: "dark" as const },
  { id: "credibilite", label: "Qui nous sommes", theme: "dark" as const },
];

/* ---------- Méthode ---------- */

const PHASES = [
  { name: "Préparer", text: "Le périmètre, les sponsors, les accès." },
  { name: "Comprendre", text: "Le travail réel, entretien par entretien." },
  { name: "Concevoir", text: "Les cas d'usage, l'architecture, la vague 1." },
  { name: "Construire", text: "Les agents, Skills et Plugins, testés." },
  { name: "Transférer", text: "Des équipes autonomes, une adoption qui tient." },
];

function Phases() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PHASES.length), 1800);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="mt-16 lg:mt-20">
      <div className="relative h-px bg-black/15">
        <motion.span
          className="absolute inset-y-0 left-0 bg-teal-brand"
          animate={{ width: `${((active + 1) / PHASES.length) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <ol className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-5">
        {PHASES.map((p, i) => (
          <li
            key={p.name}
            className={cn(
              "flex min-h-32 flex-col justify-between p-5 lg:min-h-44 transition-colors duration-500",
              i <= active ? "bg-mint-card" : "bg-mint",
            )}
          >
            <span className="font-mono text-xs text-black/50">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-xl tracking-extra-tight text-black">{p.name}</p>
              <p className="mt-1.5 min-h-[4.2em] text-[15px] leading-snug tracking-extra-tight text-black/60">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Methode() {
  return (
    <section id="methode" data-toc className="scroll-mt-14 bg-mint py-24 text-black md:py-32 xl:py-40">
      <Container className="lg:pl-[calc(22rem+2rem)]">
        <SectionLabel tone="light">Méthode</SectionLabel>
        <h2 className="mt-6 max-w-[62rem] text-[2rem] font-normal leading-dense tracking-tighter md:text-[2.75rem] xl:text-[3.5rem]">
          Les outils changent, les fondamentaux restent : <span className="marker">comprendre le travail réel</span>,
          concevoir avec les équipes et <span className="marker">livrer ce qui tient</span>.
        </h2>
        <Phases />
        <p className="mt-8 max-w-[36rem] text-[15px] leading-relaxed tracking-extra-tight text-black/60">
          La méthode est la même pour tous les Plays. Chacun la pondère autrement : Cadrer s&apos;arrête à Concevoir,
          Faire adopter vit dans Transférer.
        </p>
      </Container>
    </section>
  );
}

/* ---------- Gouvernance ---------- */

const FLOW = ["Agent Claude", "Brouillon", "Validation", "Envoi"];
const DOSSIER = [
  "Données traitées et finalités",
  "Hébergement et sous-traitants",
  "Analyse d'impact RGPD",
  "Classification AI Act",
  "Journalisation des actions",
];

function ValidationFlow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 900);
    return () => clearInterval(id);
  }, []);
  const pos = Math.min(step, FLOW.length - 1);
  return (
    <div className="grid grid-cols-2 gap-px bg-gray-20 md:grid-cols-4">
      {FLOW.map((f, i) => (
        <div
          key={f}
          className={cn(
            "relative flex h-40 flex-col justify-between gap-2 p-4 transition-colors duration-300",
            i === pos ? "bg-teal-deep" : "bg-gray-10",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-50">Étape {i + 1}</span>
          <span className={cn("text-lg tracking-extra-tight", i <= pos ? "text-white" : "text-gray-50")}>{f}</span>
          <span
            className={cn("h-4 font-mono text-[11px] uppercase", pos >= 2 ? "text-teal-400" : "text-gray-40")}
            aria-hidden={i !== 2}
          >
            {i === 2 ? "Une personne décide" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function DossierChecklist() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v > DOSSIER.length + 1 ? 0 : v + 1)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <ul className="divide-y divide-gray-20 border border-gray-20 bg-gray-10">
      {DOSSIER.map((d, i) => (
        <li key={d} className="flex h-12 items-center justify-between px-4">
          <span className={cn("text-[15px] tracking-extra-tight", i < n ? "text-white" : "text-gray-50")}>{d}</span>
          <span className={cn("font-mono text-[11px] uppercase", i < n ? "text-teal-400" : "text-gray-40")}>
            {i < n ? "Documenté" : "À instruire"}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Gouvernance() {
  const [tab, setTab] = useState<"validation" | "dossier">("validation");
  return (
    <section id="gouvernance" data-toc className="scroll-mt-14 bg-gray-10 py-24 md:py-32 xl:py-40">
      <Container className="lg:pl-[calc(22rem+2rem)]">
        <SectionLabel>Gouvernance</SectionLabel>
        <h2 className="mt-6 max-w-[60rem] text-[2rem] font-normal leading-dense tracking-tighter md:text-[2.5rem] xl:text-5xl">
          La confiance se construit par la transparence.{" "}
          <span className="text-gray-50">
            Sécurité, RGPD et AI Act sont instruits dès le cadrage, et chaque écriture d&apos;un agent passe par une
            personne.
          </span>
        </h2>

        <div className="mt-12 inline-flex border border-gray-30" role="tablist">
          {(
            [
              ["validation", "Validation humaine"],
              ["dossier", "Dossier sécurité"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "h-11 px-5 text-[15px] tracking-extra-tight transition-colors",
                tab === key ? "bg-white text-black" : "text-gray-70 hover:text-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "validation" ? <ValidationFlow /> : <DossierChecklist />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-gray-20 pt-5 font-mono text-xs uppercase text-gray-60">
          <span className="flex items-center gap-2">
            <span className="size-2 bg-teal-400" />
            Brouillon validé avant tout envoi
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 bg-gray-40" />
            Kit Dossiers sécurité Klayer
          </span>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Crédibilité ---------- */

const PILLARS = [
  { value: "100 %", label: "dédiés à l'écosystème Anthropic : Cowork, Claude Code, API Claude et MCP." },
  { value: "4", label: "Plays, de la stratégie à l'adoption, sous une même méthode." },
  { value: "0", label: "commission d'éditeur ou d'intégrateur : notre recommandation ne dépend que de votre résultat." },
];

function Credibilite() {
  return (
    <section id="credibilite" data-toc className="scroll-mt-14 bg-black-pure py-24 md:py-32 xl:py-40">
      <Container className="lg:pl-[calc(22rem+2rem)]">
        <SectionLabel>Qui nous sommes</SectionLabel>
        <h2 className="mt-6 max-w-[60rem] text-[2rem] font-normal leading-dense tracking-tighter md:text-[2.5rem] xl:text-5xl">
          Une boutique 100 % Claude.{" "}
          <span className="text-gray-50">
            Fondée en 2026 par Nicolas Lemonnier et Michael Zouzou, Klayer réunit conseil stratégique, transformation
            opérationnelle et implémentation technique.
          </span>
        </h2>
        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {PILLARS.map((p) => (
            <li key={p.value} className="border-l border-gray-30 pl-6 md:pr-8">
              <p className="text-6xl tracking-tighter text-white xl:text-7xl">{p.value}</p>
              <p className="mt-4 max-w-72 text-[15px] leading-relaxed tracking-extra-tight text-gray-60">{p.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-16 max-w-[40rem] text-lg leading-snug tracking-extra-tight text-gray-60">
          <span className="text-white">Klayer Network.</span> Une équipe interne et un réseau de freelances experts de
          Claude, triés sur le volet : une capacité de pointe sans sur-staffing.
        </p>
      </Container>
    </section>
  );
}

/* ---------- Sommaire collant ---------- */

export function TocSections() {
  const [active, setActive] = useState(TOC[0].id);

  useEffect(() => {
    const els = TOC.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const theme = TOC.find((t) => t.id === active)?.theme ?? "dark";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <Container className="h-full">
          <nav aria-label="Sommaire" className="pointer-events-auto sticky top-40 w-56 pt-24 md:pt-32 xl:pt-40">
            <ul className="flex flex-col gap-3">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className={cn(
                      "flex items-center gap-3 text-[15px] tracking-extra-tight transition-colors",
                      active === t.id
                        ? theme === "light"
                          ? "text-black"
                          : "text-white"
                        : theme === "light"
                          ? "text-black/40 hover:text-black"
                          : "text-gray-50 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 transition-all",
                        active === t.id ? (theme === "light" ? "bg-teal-brand" : "bg-teal-400") : "bg-transparent",
                      )}
                    />
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
      <Methode />
      <Gouvernance />
      <Credibilite />
    </div>
  );
}
