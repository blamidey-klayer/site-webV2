// Données de navigation. Les ancres pointent vers les sections de l'accueil ; les pages
// dédiées viendront dans un second temps.

export type MenuItem = { title: string; description?: string; href: string };
export type MenuSection = { title: string; items: MenuItem[] };
export type MenuEntry = {
  label: string;
  href?: string;
  sections?: MenuSection[];
  banner?: { title: string; description: string; href: string };
};

export const MAIN_MENU: MenuEntry[] = [
  {
    label: "Offres",
    sections: [
      {
        title: "Nos quatre Plays",
        items: [
          {
            title: "Cadrer",
            description: "Portefeuille de cas d'usage, architecture cible, vague 1",
            href: "#offres",
          },
          {
            title: "Déployer",
            description: "Des Agents Claude spécialisés dans une fonction métier",
            href: "#offres",
          },
          {
            title: "Construire",
            description: "Agents, Skills, Plugins et serveurs MCP intégrés au SI",
            href: "#offres",
          },
          {
            title: "Faire adopter",
            description: "Des équipes autonomes sur Claude, après notre départ",
            href: "#offres",
          },
        ],
      },
      {
        title: "Services",
        items: [
          { title: "Déploiement & activation", href: "#offres" },
          { title: "Refonte des processus", href: "#offres" },
          { title: "Connecteurs, plug-ins et intégrations API", href: "#offres" },
          { title: "Développement de plateforme agentique", href: "#offres" },
          { title: "Jumpstart pour PME", href: "#pour-qui" },
        ],
      },
    ],
    banner: {
      title: "Qu'est-ce que Klayer ?",
      description: "Une boutique de conseil 100 % dédiée à l'écosystème Anthropic.",
      href: "#credibilite",
    },
  },
  {
    label: "Méthode",
    sections: [
      {
        title: "Comment nous travaillons",
        items: [
          {
            title: "Préparer, Comprendre, Concevoir",
            description: "Partir du travail réel des équipes",
            href: "#methode",
          },
          {
            title: "Construire, Transférer",
            description: "Livrer ce qui tient après notre départ",
            href: "#methode",
          },
          {
            title: "Gouvernance",
            description: "Sécurité, RGPD et AI Act d'un déploiement Claude",
            href: "#gouvernance",
          },
        ],
      },
      {
        title: "Nos principes",
        items: [
          { title: "Customer Zero", href: "#customer-zero" },
          { title: "Validation humaine", href: "#gouvernance" },
          { title: "Neutralité", href: "#engagements" },
        ],
      },
    ],
  },
  { label: "Pour qui", href: "#pour-qui" },
  {
    label: "Entreprise",
    sections: [
      {
        title: "Klayer",
        items: [
          { title: "À propos", description: "Qui nous sommes", href: "#credibilite" },
          {
            title: "Klayer Network",
            description: "Notre réseau de freelances experts de Claude",
            href: "#credibilite",
          },
          {
            title: "Carrières",
            description: "Applied AI Consultant, Applied AI Engineer",
            href: "#credibilite",
          },
        ],
      },
      {
        title: "Contact",
        items: [
          { title: "Prendre rendez-vous", href: "#contact" },
          { title: "contact@klayer.ai", href: "mailto:contact@klayer.ai" },
        ],
      },
    ],
  },
];
