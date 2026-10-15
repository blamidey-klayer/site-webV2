# Accueil du site Klayer, façon neon.com

Date : 2026-10-14. Demandeur : Baptiste.

## Intention

Reproduire la page d'accueil de neon.com (structure, langage visuel, interactions) avec le propos
et les logos de Klayer. La direction artistique est celle de Neon, pas la charte Klayer.

## Décisions

| Sujet | Décision | Par |
|---|---|---|
| Fidélité | Langage visuel reproduit au plus près, code écrit pour Klayer, aucun fichier Neon | Baptiste, après alerte juridique (dépôt Neon sans licence) |
| Accent | Teinte du teal Klayer, éclaircie (`#34D3D8`) pour rester lisible sur noir ; `#10323B` pour les aplats | Baptiste (teal), éclaircissement : Claude |
| Périmètre | Accueil, header avec méga-menu, menu mobile, footer | Baptiste |
| Source d'analyse | Code source public de neon.com (`neondatabase/website`) : le site était bloqué par le réseau de l'environnement | Claude |
| Animations | Vidéos et fichiers Rive de Neon remplacés par du canvas, du SVG et framer-motion | Claude |
| Logos clients | Aucun : le défilé montre l'écosystème Anthropic, faute d'accord de référence signé | Règle Klayer |

## Correspondance des sections

| Neon | Klayer |
|---|---|
| Hero vidéo et logos clients | Hero à rayons animés (forme du glyphe), défilé de l'écosystème Claude |
| 01 Build your backend, 5 cartes vidéo | 01 Nos offres, 4 Plays avec visuels animés qui défilent |
| 02 Operate with agents, faux chat | 02 Customer Zero, un agent prépare un brouillon soumis à validation |
| 03 Scale your app, 3 blocs | 03 Pour qui : PME (console Jumpstart), directions de fonction (cartes déplaçables), ETI (orbites) |
| Architecture, Autoscaling, Built by, avec sommaire collant | Méthode (5 phases), Gouvernance (onglets), Qui nous sommes (3 piliers) |
| Pricing sur fond menthe | Modes d'engagement, sans aucun prix |
| CTA vidéo | CTA à rayons, copie de contact@klayer.ai |

## Garde-fous de contenu

Tout texte vient de `company.md` (positionnement, Plays, différenciateurs, réalisations
anonymisées). Aucun chiffre, cas client, logo ni témoignage inventé.

## Itération du 2026-10-15 : les deux livres

Demande de Baptiste : un livre ouvert stylisé en fond d'accueil, et un livre fantôme aux pages
qui tournent au défilement pour « Ils nous ont fait confiance », inspirés de la sphère de neon.com.

| Sujet | Décision | Par |
|---|---|---|
| Inspiration | Rendu de la sphère Neon (fil de fer fin, bandes de hachures serrées, mots en creux), observé en exécutant son module sous licence MIT ; aucun code repris | Claude |
| Livre du hero | Canvas 2D, deux pages courbes en perspective, mots des quatre Plays en creux, mouvement lent | Baptiste (fond du hero) |
| Effet | Évanescent : livre en opacité réduite, filtre bleu, flou léger et halo | Baptiste |
| Couleur | Teal Klayer bleuté (`#7ECEE6` et voisins) | Baptiste |
| Contenu du livre | Les six réalisations anonymes de `company.md`, une par page ; un champ `client` accueillera un nom une fois l'accord de référence signé | Baptiste |
| Place de la section | Après « Pour qui », avant la méthode | Claude |

## Itération du 2026-10-15 (2) : un vrai livre

Demande de Baptiste : que les livres ressemblent vraiment à des livres, avec la D.A. de la sphère.

- Un moteur commun (`src/components/home/book-engine.ts`) modélise le livre en 3D : couvertures
  avec épaisseur, blocs de pages dont la tranche montre les feuilles empilées, gouttière, dos,
  signet teal, feuille qui se courbe en tournant. Les faces sont peintes du fond vers l'avant et
  remplies de noir, ce qui cache les traits invisibles, comme sur la sphère.
- Les pages reprennent la sphère : bandes de hachures très serrées couvrant la page, mots gravés
  en creux, quadrillage fin en pied de page.
- Hero : traits blancs (la sphère est blanche), le livre se feuillette seul toutes les 7 secondes.
- Réalisations : traits bleus, canevas à 45 % d'opacité, flou et halo ; le bloc de gauche
  s'épaissit à mesure qu'on avance ; la description lisible de chaque page s'affiche sous le livre.
