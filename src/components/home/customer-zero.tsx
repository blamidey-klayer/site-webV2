"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionIntro } from "@/components/home/section-intro";
import { cn } from "@/lib/cn";

const BENEFITS = [
  {
    title: "Agents en production",
    text: "Delivery, prospection et opérations : Klayer se pilote depuis Claude, connecté à ses outils.",
  },
  {
    title: "Validation humaine",
    text: "Toute écriture d'un agent vers un tiers passe par un brouillon qu'une personne valide.",
  },
  {
    title: "Éprouvé avant d'être livré",
    text: "Une Skill ou un Plugin sert chez nous, avec ses évaluations, avant de servir chez vous.",
  },
];

const PROMPT = "Prépare le mail de suivi du COPIL de jeudi.";
const STEPS = [
  "Lecture de l'agenda : COPIL, jeudi 10 h",
  "Lecture de la note de réunion",
  "Lecture du projet dans le back-office",
];

// Chorégraphie : saisie, réflexion, appels d'outils, brouillon, attente de validation.
const TIMELINE = { typed: 1400, thinking: 2600, steps: 4600, draft: 6000, validated: 8800, reset: 11000 };

function Thinking() {
  const text = "Réflexion…";
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          animate={{ color: ["#61646b", "#c6e4e7", "#61646b"] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function Chat() {
  const [t, setT] = useState(0);
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
    if (!inView) return;
    const step = 100;
    const id = setInterval(() => setT((v) => (v + step >= TIMELINE.reset ? 0 : v + step)), step);
    return () => clearInterval(id);
  }, [inView]);

  const typed = PROMPT.slice(0, Math.floor((Math.min(t, TIMELINE.typed) / TIMELINE.typed) * PROMPT.length));
  const sent = t >= TIMELINE.typed;
  const stepCount = t < TIMELINE.thinking ? 0 : Math.min(STEPS.length, Math.floor((t - TIMELINE.thinking) / 650) + 1);
  const showDraft = t >= TIMELINE.draft;
  const validated = t >= TIMELINE.validated;

  return (
    <div ref={ref} className="flex h-[30rem] flex-col border border-gray-15 bg-gray-8 md:h-[34rem]">
      <div className="flex h-10 items-center gap-2 border-b border-gray-15 px-4">
        <span className="size-2 rounded-full bg-gray-30" />
        <span className="size-2 rounded-full bg-gray-30" />
        <span className="size-2 rounded-full bg-gray-30" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-gray-50">
          Claude · espace Klayer
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5 md:p-6">
        <AnimatePresence>
          {sent && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ml-auto max-w-[85%] bg-gray-15 px-4 py-2.5 text-[15px] tracking-extra-tight"
            >
              {PROMPT}
            </motion.div>
          )}
          {sent && stepCount === 0 && (
            <motion.p key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px]">
              <Thinking />
            </motion.p>
          )}
        </AnimatePresence>

        <ul className="flex flex-col gap-2">
          {STEPS.slice(0, stepCount).map((s) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 font-mono text-xs text-gray-60"
            >
              <span className="text-teal-400">✓</span>
              {s}
            </motion.li>
          ))}
        </ul>

        <AnimatePresence>
          {showDraft && (
            <motion.div
              key="draft"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-gray-20 bg-black-pure"
            >
              <div className="flex items-center justify-between border-b border-gray-15 px-4 py-2.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-50">Brouillon Gmail</span>
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-wider transition-colors",
                    validated ? "text-teal-400" : "text-gray-60",
                  )}
                >
                  {validated ? "Validé" : "En attente de validation"}
                </span>
              </div>
              <div className="space-y-2 px-4 py-4 text-sm leading-relaxed text-gray-70">
                <p className="text-white">Objet : Suivi du COPIL, décisions et prochaines étapes</p>
                <p>Merci pour vos retours de jeudi. Voici ce que nous avons retenu…</p>
                <div className="space-y-1.5 pt-1">
                  <span className="block h-1.5 w-11/12 bg-gray-20" />
                  <span className="block h-1.5 w-3/4 bg-gray-20" />
                </div>
              </div>
              <div className="flex gap-2 border-t border-gray-15 px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    validated ? "bg-teal-400 text-black" : "bg-white text-black",
                  )}
                >
                  Valider
                </span>
                <span className="rounded-full border border-gray-30 px-3.5 py-1.5 text-xs text-gray-70">Modifier</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="m-4 mt-0 flex h-11 items-center border border-gray-20 px-4 text-[15px] text-gray-50">
        {!sent ? (
          <span className="text-white">
            {typed}
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-blink bg-white" />
          </span>
        ) : (
          "Demander une modification…"
        )}
      </div>
    </div>
  );
}

export function CustomerZero() {
  return (
    <section id="customer-zero" className="relative scroll-mt-20 py-24 md:py-32 xl:py-40">
      <Container>
        <SectionIntro
          label="Customer Zero"
          index="02"
          title="Nos agents tournent chez nous avant de tourner chez vous."
          subtitle="Klayer pilote ses missions, sa prospection et ses opérations depuis Claude, sa tour de contrôle agentique."
        />
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-0">
          <ul className="flex flex-col gap-8 lg:pr-12">
            {BENEFITS.map((b) => (
              <li key={b.title} className="border-l border-gray-30 pl-5">
                <h3 className="text-lg tracking-extra-tight text-white">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed tracking-extra-tight text-gray-60">{b.text}</p>
              </li>
            ))}
          </ul>
          <Chat />
        </div>
      </Container>
    </section>
  );
}
