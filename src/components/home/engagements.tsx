import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";

const MODES = [
  {
    title: "Régie plafonnée",
    text: "Pour déployer Claude dans une fonction, avec un plafond connu dès le départ.",
    icon: "M4 18h16M4 12h10M4 6h6",
  },
  {
    title: "Forfait par fiche de mission",
    text: "Pour construire un agent ou une application, avec un livrable et un prix fermes.",
    icon: "M5 4h14v16H5zM9 9h6M9 13h6",
  },
  {
    title: "Pack ou abonnement",
    text: "Pour faire adopter Claude : formation, coaching et support des équipes.",
    icon: "M12 4v16M4 12h16",
  },
  {
    title: "Neutralité",
    text: "Aucune commission d'éditeur ni d'intégrateur, et la connaissance produite reste chez vous.",
    icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z",
  },
];

export function Engagements() {
  return (
    <section id="engagements" className="relative overflow-hidden bg-mint py-24 text-black md:py-32 xl:py-40">
      <span aria-hidden className="noise absolute inset-y-0 right-0 w-1/2 opacity-30 [mask-image:linear-gradient(270deg,#000,transparent)]" />
      <Container className="relative">
        <SectionLabel tone="light">Modes d&apos;engagement</SectionLabel>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[54rem] text-[2.25rem] font-normal leading-dense tracking-tighter md:text-[3rem] xl:text-[4.5rem]">
            Des engagements lisibles, sans sur-staffing.
          </h2>
          <Button href="#contact" theme="black" className="self-start lg:self-auto">
            Parler de votre projet
          </Button>
        </div>
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 xl:mt-20 xl:grid-cols-4">
          {MODES.map((m) => (
            <li key={m.title} className="flex min-h-64 flex-col justify-between bg-mint-card p-6">
              <svg viewBox="0 0 24 24" className="size-7 text-teal-brand" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path d={m.icon} />
              </svg>
              <div>
                <h3 className="text-2xl tracking-tighter">{m.title}</h3>
                <p className="mt-2 min-h-[4.2em] text-[15px] leading-snug tracking-extra-tight text-black/60">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
