"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { cn } from "@/lib/cn";

/*
 * « Ils nous ont fait confiance » : un livre fantôme, filtré en bleu, à peine visible, dont les
 * pages tournent au rythme du défilement. Chaque page porte une réalisation livrée, sans nom de
 * client : aucun accord de référence n'est signé à date (company.md). Pour afficher un logo plus
 * tard, il suffit de renseigner `client` dans DELIVERIES.
 */

type Delivery = { kind: string; title: string; text: string; client?: string };

const DELIVERIES: Delivery[] = [
  {
    kind: "Ressources humaines",
    title: "Veille RH et SSCT",
    text: "Un agent Claude analyse les évolutions réglementaires et conventionnelles et met à jour le book RH et SSCT.",
  },
  {
    kind: "Conformité",
    title: "Déclarations REP",
    text: "Un agent Claude analyse ventes et données produits pour préparer les déclarations de responsabilité élargie du producteur.",
  },
  {
    kind: "Ressources humaines",
    title: "Indicateurs RH et sociaux",
    text: "Un agent Claude calcule les indicateurs et produit les présentations, dans un artefact Claude.",
  },
  {
    kind: "Ventes",
    title: "Agents inbound et outbound",
    text: "Qualification des demandes en brouillon et actions de prospection, conçues avec l'équipe Sales sur son CRM.",
  },
  {
    kind: "Construire",
    title: "Application métier et API",
    text: "Une application et ses API développées avec Claude Code, livrées au forfait.",
  },
  {
    kind: "Cadrer",
    title: "Cadrage par fonction",
    text: "Plusieurs dizaines de processus cartographiés par fonction, avec leurs cas d'usage priorisés.",
  },
];

// Trois feuilles : recto = réalisation impaire, verso = réalisation paire.
const LEAVES = [0, 1, 2].map((i) => ({ front: DELIVERIES[i * 2], back: DELIVERIES[i * 2 + 1] }));

function PageFace({ delivery, index, side }: { delivery: Delivery; index: number; side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "ghost-page absolute inset-0 flex flex-col justify-between p-[7%] [backface-visibility:hidden]",
        side === "left" ? "border-r-0" : "border-l-0",
      )}
    >
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#8fd3ea]/70 md:text-[11px]">
        <span>{delivery.kind}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div>
        <span className="block font-mono text-[9px] uppercase tracking-wider text-[#8fd3ea]/60 md:text-[11px]">
          {delivery.client ?? "Livré chez un client"}
        </span>
        <p className="mt-2 text-base leading-tight tracking-tighter text-[#d6f1fa] md:mt-3 md:text-[1.75rem]">
          {delivery.title}
        </p>
        <p className="mt-2 text-[11px] leading-snug tracking-extra-tight text-[#a9dcec]/75 md:mt-3 md:text-[15px]">
          {delivery.text}
        </p>
      </div>
    </div>
  );
}

function Leaf({
  progress,
  index,
  front,
  back,
}: {
  progress: MotionValue<number>;
  index: number;
  front: Delivery;
  back: Delivery;
}) {
  const start = 0.12 + index * 0.25;
  const end = start + 0.22;
  // Rotation puis léger décalage en profondeur : à droite, la première feuille est au-dessus ;
  // une fois tournée, le décalage s'inverse et la dernière feuille tournée passe au-dessus à gauche.
  const depth = (LEAVES.length - index) * 0.6;
  const transform = useTransform(progress, (p) => {
    const k = Math.min(1, Math.max(0, (p - start) / (end - start)));
    const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    return `rotateY(${-180 * eased}deg) translateZ(${depth}px)`;
  });
  const sheen = useTransform(progress, [start, (start + end) / 2, end], [0, 0.35, 0]);

  return (
    <motion.div
      className="absolute inset-y-0 left-1/2 w-1/2 origin-left [transform-style:preserve-3d]"
      style={{ transform }}
    >
      <PageFace delivery={front} index={index * 2} side="right" />
      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <PageFace delivery={back} index={index * 2 + 1} side="left" />
      </div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(143,211,234,0.35),transparent_60%)]"
        style={{ opacity: sheen }}
      />
    </motion.div>
  );
}

export function TrustBook() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bookOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.2, 0.5, 0.5, 0.2]);
  const tilt = useTransform(scrollYProgress, [0, 1], [24, 14]);

  return (
    <section ref={ref} id="confiance" className="relative h-[420vh] scroll-mt-14">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Halo bleu derrière le livre */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[58%] h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(60,140,190,0.22),transparent)]"
        />
        <Container className="relative z-10 text-center">
          <SectionLabel className="justify-center">Réalisations</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-[44rem] text-[2.25rem] font-normal leading-dense tracking-tighter md:text-5xl xl:text-[3.5rem]">
            Ils nous ont fait confiance.
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15px] leading-snug tracking-extra-tight text-gray-60">
            Ce que nous avons livré, page après page. Les noms restent chez nos clients tant qu&apos;un accord de
            référence n&apos;est pas signé.
          </p>
        </Container>

        {/* Opacité et filtre sur l'enveloppe : posés sur l'élément 3D, ils aplatiraient la scène. */}
        <motion.div className="ghost-book relative z-10 mx-auto mt-10 w-[92vw] max-w-[60rem] md:mt-14" style={{ opacity: bookOpacity }}>
          <div className="[perspective:1800px]">
          <motion.div
            className="relative aspect-[2/1.2] w-full [transform-style:preserve-3d]"
            style={{ rotateX: tilt }}
          >
            {/* Page de garde, à gauche */}
            <div className="ghost-page absolute inset-y-0 left-0 flex w-1/2 [transform:translateZ(-3px)] flex-col items-center justify-center gap-3 p-[7%] text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8fd3ea]/70 md:text-[11px]">
                Klayer · Registre des réalisations
              </span>
              <span className="text-lg tracking-tighter text-[#d6f1fa] md:text-3xl">Livré, en production</span>
            </div>
            {/* Dernière page, à droite, sous les feuilles */}
            <div className="ghost-page absolute inset-y-0 right-0 flex w-1/2 [transform:translateZ(-3px)] flex-col items-center justify-center gap-3 p-[7%] text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8fd3ea]/70 md:text-[11px]">
                Page suivante
              </span>
              <span className="text-lg tracking-tighter text-[#d6f1fa] md:text-3xl">Votre projet ?</span>
            </div>
            {LEAVES.map((leaf, i) => (
              <Leaf key={i} progress={scrollYProgress} index={i} front={leaf.front} back={leaf.back} />
            ))}
            {/* Reliure */}
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-[#8fd3ea]/60 [transform:translateZ(4px)]" />
          </motion.div>
          </div>
        </motion.div>

        {/* Liste lisible pour les lecteurs d'écran */}
        <ul className="sr-only">
          {DELIVERIES.map((d) => (
            <li key={d.title}>
              {d.title} : {d.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
