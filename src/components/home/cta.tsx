"use client";

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import { RaysCanvas } from "@/components/home/rays-canvas";

const EMAIL = "contact@klayer.ai";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          window.location.href = `mailto:${EMAIL}`;
        }
      }}
      className="inline-flex h-11 items-center gap-3 rounded-full bg-teal-400 px-6 font-mono text-[15px] text-black transition-colors hover:bg-teal-300"
    >
      {copied ? "Adresse copiée" : EMAIL}
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <rect x="5" y="5" width="8" height="8" />
        <path d="M3 11V3h8" />
      </svg>
    </button>
  );
}

export function Cta() {
  return (
    <section id="contact" className="relative scroll-mt-14 overflow-hidden bg-[#0b0c0d]">
      <RaysCanvas className="absolute inset-0 h-full w-full opacity-80" focus={{ x: 0.5, y: 1.1 }} density={90} />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#0b0c0d,transparent)]" aria-hidden />
      <Container size="1920" className="relative flex min-h-[38rem] flex-col items-center justify-center py-32 text-center md:min-h-[44rem]">
        <h2 className="max-w-[60rem] text-balance text-[2.5rem] font-normal leading-dense tracking-tighter md:text-[3.5rem] xl:text-[5rem]">
          Votre partenaire pour réussir avec Claude.
        </h2>
        <p className="mt-6 max-w-[42rem] text-lg leading-snug tracking-extra-tight text-gray-60 md:text-2xl xl:text-[2rem]">
          Parlons de vos équipes, de vos processus et du temps que Claude peut leur rendre.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={`mailto:${EMAIL}?subject=Prise%20de%20rendez-vous`}>Prendre rendez-vous</Button>
          <Button href="#offres" theme="outlined">
            Voir nos offres
          </Button>
          <CopyEmail />
        </div>
      </Container>
    </section>
  );
}
