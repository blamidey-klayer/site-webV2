// Textes du site. Source : Doc « Klayer · Messaging du deck », onglet Récit FR (relu le 2026-11-03).
// Aucun chiffre, client nommé ni logo n'est introduit sans source.

export const nav = [
  { label: "Offres", href: "#piliers" },
  { label: "Méthode", href: "#methode" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Pourquoi Klayer", href: "#pourquoi" },
];

export const hero = {
  eyebrow: "Pour les entreprises",
  title: "Claude au travail, Claude dans le code.",
  lead: "Klayer déploie Claude au sein des fonctions métier et développe, avec Claude Code, les applications et services des DSI et des directions produit. Une boutique française 100\u00a0% dédiée à l'écosystème Anthropic.",
  primary: { label: "Choisir notre premier pas", href: "#premier-pas" },
  secondary: { label: "Découvrir nos offres", href: "#piliers" },
  facts: [
    "Fondée en 2026",
    "Admise dans le Partner Network d'Anthropic (octobre 2026)",
    "De la stratégie à la production",
  ],
};

export const probleme = {
  eyebrow: "Le constat",
  title: "L'IA reste isolée, vos projets attendent",
  items: [
    {
      tag: "AI for Work",
      title: "Le temps gagné reste individuel",
      body: "Vos équipes utilisent déjà l'IA, chacune dans son coin et souvent sans cadre. Les usages individuels ne deviennent pas encore une capacité de l'organisation.",
    },
    {
      tag: "AI for Code",
      title: "La maintenance absorbe le budget",
      body: "L'essentiel du budget de vos équipes techniques part dans la maintenance de l'existant, et les projets qui feraient avancer l'entreprise attendent leur tour.",
    },
  ],
};

export const conviction = {
  eyebrow: "Notre conviction",
  title: "Repenser le travail, pas ajouter un outil",
  lead: "La valeur ne vient pas d'un outil de plus, mais de la redistribution des tâches entre les personnes et les agents, processus par processus, en production gouvernée.",
  shifts: [
    { from: "Des assistants qui répondent", to: "des agents qui exécutent" },
    { from: "Des usages individuels", to: "des processus repensés" },
    { from: "Des expérimentations isolées", to: "des usages ancrés dans le quotidien" },
  ],
};

export const piliers = {
  eyebrow: "Deux piliers",
  title: "AI for Work, AI for Code",
  lead: "Claude transforme deux choses dans l'entreprise : la façon dont les équipes travaillent, et la façon dont le logiciel se conçoit. Nous accompagnons les deux.",
  items: [
    {
      tag: "AI for Work",
      title: "Claude dans vos fonctions",
      audience: "ETI de 200 à 2 000 salariés",
      body: "L'IA change la façon dont les équipes travaillent au quotidien. Avec Claude, nous redéfinissons le travail de vos fonctions processus par processus, du déploiement sur le poste de chacun à la mesure de la capacité libérée.",
      points: [
        "Déploiement et activation de Claude dans une fonction",
        "Refonte des processus, cas d'usage priorisés",
        "Agents Claude en RH, en conformité et auprès des équipes Sales",
      ],
    },
    {
      tag: "AI for Code",
      title: "Le logiciel conçu autrement",
      audience: "DSI et directions produit d'ETI, éditeurs, scale-ups",
      body: "Le développement assisté par l'IA change la façon de concevoir, de développer et de maintenir le logiciel. Avec Claude Code, nous construisons vos applications et services sur ce nouveau modèle, du premier MVP à la maintenance en production.",
      points: [
        "Concevoir : des agents aident à écrire la spécification et le plan, relus avant la première ligne de code",
        "Développer : des agents écrivent, testent et documentent le code",
        "Maintenir : chaque évolution repasse par les mêmes vérifications",
      ],
    },
  ],
};

export const methode = {
  eyebrow: "Méthode",
  title: "Une même méthode, du cadrage au transfert",
  lead: "Une seule exigence, quel que soit le pilier : comprendre votre métier avant de l'outiller, concevoir avec vos équipes, livrer en production, puis leur transmettre la maîtrise de ce qui a été construit.",
  steps: [
    { name: "Préparer", body: "Cadrer le périmètre, les fonctions et les objectifs du programme." },
    { name: "Comprendre", body: "Décrire le travail réel, processus par processus, et prioriser les cas d'usage." },
    { name: "Concevoir", body: "Dessiner avec vos équipes la nouvelle répartition entre personnes et agents." },
    { name: "Construire", body: "Livrer en production gouvernée, avec les vérifications à chaque étape." },
    { name: "Transférer", body: "Transmettre à vos équipes la maîtrise de ce qui a été construit." },
  ],
  engagements: "Modes d'engagement : régie plafonnée, forfait à tranches, fiches de mission sous contrat-cadre.",
};

export const accelerateurs = {
  eyebrow: "Accélérateurs",
  title: "Des actifs que nous utilisons chaque jour",
  lead: "Chaque mission s'appuie sur des actifs que nous avons conçus : vos projets démarrent plus vite, et vos outils restent solides après notre départ.",
  items: [
    {
      tag: "AI for Work",
      status: "En service chez Klayer",
      title: "L'espace de travail Klayer",
      body: "Chaque collaborateur dispose d'une mémoire de travail qui garde le contexte de l'entreprise, ses décisions et ses dossiers d'une session à l'autre.",
    },
    {
      tag: "AI for Work",
      status: "Offre proposée",
      title: "Klayer Always On",
      body: "Après le déploiement, vos équipes posent leurs questions dans un canal Slack dédié. Claude y répond à toute heure et ouvre les tickets ; l'équipe Klayer livre correctifs, évolutions, formations et revues, en abonnement mensuel.",
    },
    {
      tag: "AI for Code",
      status: "Appliquée à nos dépôts",
      title: "Développement assisté par l'IA",
      body: "Nous outillons l'environnement des agents et concevons la boucle de chaque évolution : cadrer, planifier, construire, vérifier, déployer, maintenir. Aucun agent ne valide son propre travail.",
    },
  ],
};

export const customerZero = {
  eyebrow: "Customer Zero",
  title: "Nos agents tournent chez nous d'abord",
  lead: "Klayer est une entreprise IA native : nous l'avons construite autour de Claude, au lieu d'ajouter de l'IA à des processus existants. Nos opérations, notre delivery et notre prospection tournent sur Claude, et nos agents sont en production chez nous avant de l'être chez vous.",
  kpi: { value: "184", unit: "pull requests", caption: "fusionnées en quatorze jours sur le Klayer BO, notre back-office de pilotage, par deux contributeurs. Mesure au 14 septembre 2026, playbook AI-Native SDLC." },
  points: ["Claude comme tour de contrôle de nos systèmes", "Klayer BO et son serveur MCP"],
};

export const realisations = {
  eyebrow: "Réalisations",
  title: "Déjà livré : six réalisations chez nos clients",
  lead: "Des agents Claude travaillent déjà en production chez nos clients, en RH, en conformité et auprès des équipes commerciales, et une application métier a été livrée avec Claude Code.",
  note: "Clients anonymisés tant que leur accord de citation n'est pas acquis. Gains non mesurés à date.",
  items: [
    { tag: "AI for Work", title: "Veille RH et SSCT", body: "Un agent Claude qui suit la veille réglementaire RH et santé, sécurité et conditions de travail." },
    { tag: "AI for Work", title: "Déclarations REP", body: "Un agent Claude qui prépare les déclarations REP." },
    { tag: "AI for Work", title: "Indicateurs RH et sociaux", body: "Un agent Claude qui produit les indicateurs RH et sociaux." },
    { tag: "AI for Work", title: "Agents Sales inbound et outbound", body: "Des agents Claude pour une équipe Sales, sur son CRM, en brouillon validé." },
    { tag: "AI for Work", title: "Cadrage d'une fonction", body: "Cadrage de plusieurs dizaines de processus, cas d'usage priorisés." },
    { tag: "AI for Code", title: "Application métier et ses API", body: "Développée avec Claude Code et livrée au forfait." },
  ],
};

export const pourquoi = {
  eyebrow: "Pourquoi Klayer",
  title: "Une boutique française 100\u00a0% Anthropic",
  items: [
    { title: "Expertise produit native", body: "Cowork, Claude Code, API Claude, MCP : nous travaillons sur l'écosystème Anthropic, et seulement lui." },
    { title: "Partner Network d'Anthropic", body: "Klayer est admise dans le Partner Network d'Anthropic depuis octobre 2026." },
    { title: "Neutralité par conviction", body: "Aucune commission d'éditeur ni d'intégrateur. Nous recommandons ce qui sert le client, et rien d'autre." },
    { title: "Un modèle boutique", body: "Une équipe resserrée de consultants et d'ingénieurs, renforcée par le Klayer Network." },
  ],
};

export const valeurs = {
  eyebrow: "Nos valeurs",
  title: "Une équipe engagée sur quatre valeurs",
  items: [
    { name: "Obsession Client", body: "Nous partons des enjeux métier de nos clients et mesurons avec eux ce que nous leur apportons. Un problème remonté a un responsable nommé le jour même." },
    { name: "Confiance", body: "Nous tenons parole, disons ce que nous savons comme ce que nous ne savons pas, et protégeons ce qui nous est confié. Un risque se signale dès qu'il est connu." },
    { name: "Excellence", body: "L'exigence porte sur ce que nous livrons et sur le service que nous rendons. Un livrable ne part qu'après relecture." },
    { name: "Plaisir", body: "Une livraison réussie laisse au client l'envie d'aller plus loin avec Claude." },
  ],
};

export const premierPas = {
  eyebrow: "Premier pas",
  title: "Choisissons ensemble votre premier pas",
  lead: "Commençons là où la valeur se verra le plus vite. Le reste se construit sur ce premier résultat.",
  options: [
    { tag: "AI for Work", title: "Une première fonction", body: "Le déploiement de Claude dans une fonction où il change déjà le quotidien des équipes, ouvert si besoin par un cadrage." },
    { tag: "AI for Code", title: "Une première application", body: "Un MVP au forfait, sur fiche de mission, livré en quelques semaines." },
  ],
  email: "contact@klayer.ai",
};
