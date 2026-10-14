import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Lockup } from "@/components/shared/glyph";

const COLUMNS = [
  {
    title: "Offres",
    links: [
      { label: "Cadrer", href: "#offres" },
      { label: "Déployer", href: "#offres" },
      { label: "Construire", href: "#offres" },
      { label: "Faire adopter", href: "#offres" },
      { label: "Jumpstart pour PME", href: "#pour-qui" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#credibilite" },
      { label: "Méthode", href: "#methode" },
      { label: "Klayer Network", href: "#credibilite" },
      { label: "Carrières", href: "#credibilite" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Nous suivre",
    links: [
      // [À CONFIRMER] adresse de la page LinkedIn Klayer
      { label: "LinkedIn", href: "#" },
      { label: "contact@klayer.ai", href: "mailto:contact@klayer.ai" },
    ],
  },
];

const COMMITMENTS = [
  "Validation humaine de chaque écriture",
  "Sécurité, RGPD et AI Act documentés",
  "Aucune commission éditeur ni intégrateur",
  "Connaissance produite laissée au client",
];

export function Footer() {
  return (
    <footer className="relative border-t border-gray-15 bg-black-pure">
      <Container size="1920" className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:py-20">
        <div className="flex flex-col">
          <Lockup />
          <p className="mt-6 max-w-64 text-[15px] tracking-extra-tight text-gray-60">
            Boutique de conseil française, 100 % dédiée à l&apos;écosystème Anthropic.
          </p>
          <p className="mt-auto pt-10 text-[13px] text-gray-50">© Klayer 2026. Tous droits réservés.</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">{col.title}</p>
            <ul className="mt-5 flex flex-col gap-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[15px] tracking-extra-tight text-gray-70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white">Engagements</p>
          <ul className="mt-5 flex flex-col gap-y-3">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex gap-2 text-[15px] tracking-extra-tight text-gray-70">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-teal-400" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-gray-15">
        <Container
          size="1920"
          className="flex flex-col gap-4 py-6 text-[13px] text-gray-50 md:flex-row md:items-center md:justify-between"
        >
          <span className="inline-flex items-center gap-2">
            <span className="size-2 animate-pulse-soft rounded-full bg-teal-400" aria-hidden />
            Nos agents tournent en production chez Klayer
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* [À VALIDER PAR UN FONDATEUR] pages juridiques à rédiger */}
            <Link href="#" className="hover:text-white">Mentions légales</Link>
            <Link href="#" className="hover:text-white">Politique de confidentialité</Link>
            <Link href="#" className="hover:text-white">Gestion des cookies</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
