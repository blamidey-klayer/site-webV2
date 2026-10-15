"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { drawBook, resetMasks, type PageContent } from "@/components/home/book-engine";

/*
 * « Ils nous ont fait confiance » : un livre fantôme, filtré en bleu, à peine visible, dont les
 * pages tournent au rythme du défilement. Chaque page porte une réalisation livrée, gravée en
 * creux dans les hachures. Aucun nom de client : aucun accord de référence n'est signé à date
 * (company.md). Pour afficher un nom plus tard, renseigner `client` dans DELIVERIES.
 */

type Delivery = { kind: string; title: string[]; text: string; client?: string };

const DELIVERIES: Delivery[] = [
  {
    kind: "Ressources humaines",
    title: ["Veille RH", "et SSCT"],
    text: "Un agent Claude analyse les évolutions réglementaires et conventionnelles et met à jour le book RH et SSCT.",
  },
  {
    kind: "Conformité",
    title: ["Déclarations", "REP"],
    text: "Un agent Claude analyse ventes et données produits pour préparer les déclarations de responsabilité élargie du producteur.",
  },
  {
    kind: "Ressources humaines",
    title: ["Indicateurs", "RH et sociaux"],
    text: "Un agent Claude calcule les indicateurs et produit les présentations, dans un artefact Claude.",
  },
  {
    kind: "Ventes",
    title: ["Agents", "inbound", "outbound"],
    text: "Qualification des demandes en brouillon et actions de prospection, conçues avec l'équipe Sales sur son CRM.",
  },
  {
    kind: "Construire",
    title: ["Application", "métier et API"],
    text: "Une application et ses API développées avec Claude Code, livrées au forfait.",
  },
  {
    kind: "Cadrer",
    title: ["Cadrage", "par fonction"],
    text: "Plusieurs dizaines de processus cartographiés par fonction, avec leurs cas d'usage priorisés.",
  },
];

// Page de garde, six réalisations, page de fin : quatre doubles pages, trois feuilles à tourner.
const PAGES: PageContent[] = [
  { lines: ["Klayer"] },
  ...DELIVERIES.map((d) => ({ lines: d.title })),
  { lines: ["Votre", "projet ?"] },
];
const TURNS = PAGES.length / 2 - 1;

type Caption = { kind: string; text: string; client?: string };

function captionAt(i: number): Caption {
  if (i === 0) return { kind: "Registre des réalisations", text: "Ce que nous avons livré, en production." };
  if (i === PAGES.length - 1) return { kind: "Page suivante", text: "La vôtre ? Parlons de votre projet." };
  const d = DELIVERIES[i - 1];
  return { kind: d.kind, text: d.text, client: d.client };
}

// Chaque feuille tourne au milieu de sa tranche de défilement ; le reste du temps, la double
// page reste ouverte pour être lue.
function toState(p: number) {
  const x = Math.min(0.9999, Math.max(0, p)) * TURNS;
  const spread = Math.floor(x);
  const turn = Math.min(1, Math.max(0, (x - spread - 0.3) / 0.45));
  // Feuille tournée : on montre directement la double page suivante.
  return turn >= 1 ? { spread: spread + 1, turn: 0 } : { spread, turn };
}

function CaptionBlock({ index, align }: { index: number; align: "left" | "right" }) {
  const c = captionAt(index);
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={align === "left" ? "md:text-right" : "md:text-left"}
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-[#8fd3ea]/80">
        {c.kind}
        {c.client ? ` · ${c.client}` : ""}
      </p>
      <p className="mt-2 text-[15px] leading-snug tracking-extra-tight text-gray-60">{c.text}</p>
    </motion.div>
  );
}

export function TrustBook() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const [spread, setSpread] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progress.current = p;
    const s = toState(p);
    setSpread(s.turn > 0.5 ? s.spread + 1 : s.spread);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.fonts?.ready.then(resetMasks);

    let raf = 0;
    let visible = false;
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
    const render = (ms: number) => {
      const { spread: s, turn } = toState(progress.current);
      ctx.clearRect(0, 0, w, h);
      drawBook(
        ctx,
        w,
        h,
        { pages: PAGES, spread: s, turn, read: Math.min(1, progress.current), time: ms / 1000 },
        {
          ink: "150, 214, 240",
          ribbon: "52, 211, 216",
          paper: "#000",
          center: { x: 0.5, y: 0.62 },
          size: 0.9,
          reduced,
        },
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
    raf = requestAnimationFrame(loop);
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

  return (
    <section ref={ref} id="confiance" className="relative h-[400vh] scroll-mt-14">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-14">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[55%] h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(60,140,190,0.2),transparent)]"
        />
        <Container className="relative z-10 text-center">
          <SectionLabel className="justify-center">Réalisations</SectionLabel>
          <h2 className="mx-auto mt-4 max-w-[44rem] text-[2.25rem] font-normal leading-dense tracking-tighter md:text-5xl xl:text-[3.5rem]">
            Ils nous ont fait confiance.
          </h2>
          <p className="mx-auto mt-3 max-w-[34rem] text-[15px] leading-snug tracking-extra-tight text-gray-60">
            Ce que nous avons livré, page après page. Les noms restent chez nos clients tant qu&apos;un accord de
            référence n&apos;est pas signé.
          </p>
        </Container>

        {/* Effet fantôme : opacité, flou et halo bleu sur le canevas entier */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="relative z-10 mx-auto h-[38vh] w-full max-w-[72rem] opacity-45 mix-blend-screen [filter:blur(0.5px)_drop-shadow(0_0_18px_rgba(80,170,220,0.45))] md:h-[56vh]"
        />

        <Container className="relative z-10">
          <div className="mx-auto grid max-w-[52rem] gap-4 md:grid-cols-2 md:gap-16">
            <AnimatePresence mode="wait">
              <CaptionBlock key={`l-${spread}`} index={spread * 2} align="left" />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <CaptionBlock key={`r-${spread}`} index={spread * 2 + 1} align="right" />
            </AnimatePresence>
          </div>
        </Container>

        <ul className="sr-only">
          {DELIVERIES.map((d) => (
            <li key={d.text}>
              {d.title.join(" ")} : {d.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
