import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import { Marquee } from "@/components/shared/marquee";
import { SectionLabel } from "@/components/shared/section-label";
import { BookCanvas } from "@/components/home/book-canvas";

// Pas de logos clients tant qu'aucun accord de référence n'est signé : le défilé montre
// l'écosystème sur lequel nous travaillons.
const ECOSYSTEM = [
  "Claude Cowork",
  "Claude Code",
  "API Claude",
  "Model Context Protocol",
  "Agent Skills",
  "Plugins",
  "Claude Agent SDK",
  "Artifacts",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10">
        <span className="absolute inset-0 bg-[radial-gradient(60%_55%_at_72%_45%,rgba(46,120,150,0.18),transparent_70%)]" />
        <BookCanvas className="absolute -right-[18%] top-10 h-[92%] w-[95%] opacity-50 md:-right-[6%] md:top-0 md:w-[78%] md:opacity-65" />
      </div>
      <div className="pointer-events-none absolute bottom-0 z-20 h-40 w-full bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)]" />

      <Container className="relative z-30 pb-2 pt-52 md:pt-64 xl:pt-80">
        <Link href="#credibilite" className="inline-block">
          <SectionLabel>100 % dédiés à l&apos;écosystème Anthropic</SectionLabel>
        </Link>

        <h1 className="mt-5 max-w-[60rem] text-balance text-[2.375rem] font-normal leading-dense tracking-tighter sm:text-[2.875rem] lg:text-[3.5rem] 2xl:text-[4rem]">
          Transformer le travail grâce à l&apos;IA, de la stratégie à l&apos;exécution avec{" "}
          <Link href="#ecosysteme" className="group relative inline-block text-inherit">
            Claude
            <span
              aria-hidden
              className="absolute bottom-0.5 left-0 h-0.5 w-full bg-teal-400 opacity-50 transition-opacity duration-150 group-hover:opacity-100"
            />
          </Link>
          .
        </h1>

        <div className="mt-8 flex flex-wrap gap-4 md:gap-5">
          <Button href="#contact">Prendre rendez-vous</Button>
          <Button href="#offres" theme="outlined">
            Découvrir nos offres
          </Button>
        </div>

        <div id="ecosysteme" className="relative mt-11 scroll-mt-24 border-t border-gray-20 pt-10">
          <Marquee items={ECOSYSTEM} />
        </div>
      </Container>
    </section>
  );
}
