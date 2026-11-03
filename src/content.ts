// Textes du site. Sources : deck « Klayer · Présentation 2026 · V2 » (artifact Xun5gczeGDDaX19jykMUu7)
// et Doc « Klayer · Messaging du deck », Récit FR. Aucun chiffre, client nommé ni logo client sans source.

export const nav = [
  { label: "Offres", href: "#piliers" },
  { label: "Méthode", href: "#methode" },
  { label: "IA native", href: "#ia-native" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Pourquoi Klayer", href: "#pourquoi" },
];

export const hero = {
  eyebrow: "Boutique française 100 % Anthropic",
  title: ["Claude au travail,", "Claude dans le code."],
  lead: "Klayer déploie Claude au sein des fonctions métier et développe, avec Claude Code, les applications et services des DSI et des directions produit. De la stratégie à la production.",
  primary: { label: "Choisir votre premier pas", href: "#premier-pas" },
  secondary: { label: "Découvrir nos offres", href: "#piliers" },
  facts: ["Fondée en 2026", "Partner Network d'Anthropic depuis octobre 2026"],
};

export const probleme = {
  eyebrow: "Le constat",
  items: [
    { tag: "AI for Work", title: "Vos équipes utilisent déjà l'IA, chacune dans son coin.", body: "Souvent sans cadre, et le temps gagné reste individuel." },
    { tag: "AI for Code", title: "Votre budget technique entretient l'existant.", body: "Les projets qui feraient avancer l'entreprise attendent leur tour." },
  ],
};

export const bascules = {
  eyebrow: "Notre conviction",
  title: "Repenser le travail, pas ajouter un outil",
  rows: [
    { hier: "Des assistants qui répondent", demain: "Des agents qui exécutent" },
    { hier: "Des usages individuels", demain: "Des processus repensés" },
    { hier: "Des expérimentations isolées", demain: "Des usages ancrés dans le quotidien" },
  ],
  footer: "Processus par processus, en production gouvernée.",
};

export const piliers = {
  eyebrow: "Deux piliers",
  title: "Claude transforme deux choses dans l'entreprise : la façon dont les équipes travaillent, et la façon dont le logiciel se conçoit.",
  items: [
    { tag: "AI for Work", title: "Claude au sein de vos fonctions métier", audience: "ETI de 200 à 2 000 salariés", href: "#ai-work" },
    { tag: "AI for Code", title: "Vos applications et services, conçus avec Claude Code", audience: "DSI et directions produit, éditeurs, scale-ups", href: "#ai-code" },
  ],
};

export const aiWork = {
  eyebrow: "AI for Work",
  title: "Claude dans vos fonctions",
  lead: "L'IA change la façon dont les équipes travaillent au quotidien. Avec Claude, nous redéfinissons le travail de vos fonctions processus par processus.",
  footer: "Du déploiement sur le poste de chacun à la mesure de la capacité libérée.",
  points: ["Déploiement et activation", "Refonte des processus", "Agents en RH, conformité et Sales"],
  screens: [
    { src: "/ecrans/sheets-budget.png", alt: "Suivi budgétaire fictif dans Google Sheets, avec un graphique budget et réalisé", w: 1568, h: 740 },
    { src: "/ecrans/finder-dossier.png", alt: "Dossier Direction financière dans le Finder", w: 715, h: 436 },
    { src: "/ecrans/cowork-skill.png", alt: "Cowork invoque une Skill, lit le fichier local et crée la synthèse, un document et une présentation", w: 2880, h: 1800 },
  ],
  caption: "Écrans illustratifs, données fictives.",
};

export const aiCode = {
  eyebrow: "AI for Code",
  title: "Le logiciel, conçu autrement",
  lead: "Le développement assisté par l'IA change la façon de concevoir, de développer et de maintenir le logiciel. Avec Claude Code, nous construisons vos applications et services sur ce nouveau modèle.",
  cta: { label: "Premier pas : un MVP au forfait", href: "#premier-pas" },
  steps: [
    { name: "Concevoir", body: "Des agents aident à écrire la spécification et le plan, relus avant la première ligne de code." },
    { name: "Développer", body: "Des agents écrivent, testent et documentent le code." },
    { name: "Maintenir", body: "Chaque évolution repasse par les mêmes vérifications." },
  ],
  screens: [
    { src: "/ecrans/klayer-bo.webp", alt: "Klayer BO, rapport de staffing aux données fictives", w: 3024, h: 1652 },
    { src: "/ecrans/claude-code-terminal.png", alt: "Claude Code dans le terminal : modification de code et tests", w: 2880, h: 1800 },
  ],
  caption: "Écrans illustratifs, données fictives.",
};

export const methode = {
  eyebrow: "Notre méthode",
  title: "Une seule exigence, quel que soit le pilier",
  lead: "Comprendre votre métier avant de l'outiller, concevoir avec vos équipes, livrer en production, puis vous transmettre la maîtrise.",
  // Résultats par étape : à valider par les fondateurs (note du deck, slide 7).
  steps: [
    { name: "Préparer", result: "Le cadre est posé", detail: "Ambition, périmètre, équipe" },
    { name: "Comprendre", result: "Votre métier est cartographié", detail: "Processus et irritants réels" },
    { name: "Concevoir", result: "Les cas d'usage sont choisis", detail: "Conçus avec vos équipes" },
    { name: "Construire", result: "Les agents sont en production", detail: "Testés sur vos données" },
    { name: "Transférer", result: "La maîtrise est à vous", detail: "Vos équipes sont autonomes" },
  ],
  engagements: "Modes d'engagement : régie plafonnée, forfait à tranches, fiches de mission sous contrat-cadre.",
};

export const accelerateurs = {
  eyebrow: "Nos accélérateurs",
  title: "Des actifs conçus chez nous, utilisés chaque jour",
  lead: "Vos projets démarrent plus vite, et vos outils restent solides après notre départ.",
  // À valider par les fondateurs (note du deck, slide 8).
  memoire: ["Mémoire de l'entreprise", "Décisions", "Projets en cours", "Ressources"],
  boucle: ["cadrer", "planifier", "construire", "vérifier", "déployer", "maintenir"],
  items: [
    { tag: "AI for Work", title: "Espace de travail Klayer : une mémoire partagée par vos agents" },
    { tag: "AI for Work · nouvelle offre", title: "Klayer Always On : Claude répond, notre équipe livre" },
    { tag: "AI for Code", title: "Le harness et la boucle de nos agents" },
  ],
};

export const iaNative = {
  eyebrow: "IA native",
  title: "Nous avons construit Klayer autour de Claude",
  lead: "Au lieu d'ajouter de l'IA à des processus existants. Nos opérations, notre delivery et notre prospection tournent sur Claude.",
  strong: "Nos agents sont en production chez nous avant de l'être chez vous.",
  outils: [
    { name: "HubSpot", icon: "/outils/hubspot.svg" },
    { name: "Gmail", icon: "/outils/gmail.svg" },
    { name: "Agenda", icon: "/outils/agenda.svg" },
    { name: "Drive", icon: "/outils/drive.svg" },
    { name: "Slack", icon: "/outils/slack.svg" },
    { name: "Linear", icon: "/outils/linear.svg" },
    { name: "GitHub", icon: "/outils/github.svg" },
    { name: "Pennylane", icon: "/outils/pennylane.png" },
    { name: "Granola", icon: "/outils/granola.png" },
  ],
  kpi: { value: "184", unit: "pull requests", caption: "fusionnées en quatorze jours sur le Klayer BO, par deux contributeurs. Mesure au 14 septembre 2026, playbook AI-Native SDLC." },
};

export const realisations = {
  eyebrow: "Déjà livré",
  title: "Nos deux piliers ne sont pas des promesses",
  items: [
    { tag: "AI for Work", title: "Veille RH et SSCT", body: "Agent de veille réglementaire" },
    { tag: "AI for Work", title: "Déclarations REP", body: "Préparation des déclarations" },
    { tag: "AI for Work", title: "Indicateurs RH et sociaux", body: "Préparés et commentés par un agent" },
    { tag: "AI for Work", title: "Agents commerciaux", body: "Inbound et outbound, sur le CRM" },
    { tag: "AI for Work", title: "Cadrage d'une fonction", body: "Plusieurs dizaines de processus priorisés" },
    { tag: "AI for Code", title: "Application métier et ses API", body: "Développée avec Claude Code, au forfait" },
  ],
  note: "Clients anonymisés tant que leur accord de citation n'est pas acquis. Gains non mesurés à date.",
};

export const boutique = {
  eyebrow: "Pourquoi Klayer",
  title: "Une boutique française 100 % Anthropic",
  items: [
    { icon: "star", title: "Expertise produit native", body: "Cowork, Claude Code, l'API Claude et le MCP, et rien d'autre." },
    { icon: "scale", title: "Neutralité par conviction", body: "Aucune commission d'éditeur ni d'intégrateur. Nous recommandons ce qui sert le client, et rien d'autre." },
    { icon: "bolt", title: "Claude au cœur de nos opérations", body: "Ce que nous déployons chez vous fait déjà tourner Klayer." },
    { icon: "check", title: "Partner Network d'Anthropic", body: "Admise en octobre 2026. Une équipe resserrée, renforcée par le Klayer Network." },
  ],
};

export const valeurs = {
  eyebrow: "Notre équipe",
  title: "Quatre valeurs que nos clients retrouvent dans notre façon de travailler",
  items: [
    { name: "Obsession Client", body: "Nous partons de vos enjeux métier et mesurons avec vous ce que nous apportons." },
    { name: "Confiance", body: "Nous tenons parole, et disons ce que nous savons comme ce que nous ne savons pas." },
    { name: "Excellence", body: "L'exigence porte sur ce que nous livrons. Rien ne part sans relecture." },
    { name: "Plaisir", body: "Une livraison réussie donne envie d'aller plus loin avec Claude." },
  ],
};

export const premierPas = {
  eyebrow: "Votre premier pas",
  title: "Commençons là où la valeur se verra le plus vite",
  lead: "Le reste se construit sur ce premier résultat.",
  options: [
    { tag: "AI for Work", title: "Une première fonction", body: "Claude y change déjà le quotidien des équipes. Ouverte si besoin par un cadrage." },
    { tag: "AI for Code", title: "Une première application", body: "Un MVP au forfait, livré en quelques semaines." },
  ],
  email: "contact@klayer.ai",
};
