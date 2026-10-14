# Site web Klayer, V2

Page d'accueil de klayer.ai. Le langage visuel reprend celui de neon.com : noir pur, gris froids,
filets de 1px, angles droits, boutons en pilule, numéros de section géants, sections claires en
contrepoint. Le propos et les logos sont ceux de Klayer. Le code est écrit pour Klayer : aucun
fichier, aucun composant ni aucune police de Neon n'est repris (leur dépôt n'a pas de licence).

## Lancer

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, framer-motion. Polices : Inter (Google Fonts
via `next/font`) et Geist Mono (paquet `geist`, licence OFL).

## Où est quoi

| Fichier | Rôle |
|---|---|
| `src/app/globals.css` | tokens de design (couleurs, typo, animations) |
| `src/lib/menus.ts` | contenu du méga-menu |
| `src/components/shared/` | header, méga-menu, menu mobile, bandeau, footer, boutons |
| `src/components/home/` | une section de l'accueil par fichier |
| `public/brand/` | glyphes officiels Klayer |

## À valider avant mise en ligne

- Les textes de la page, par un fondateur : ils reprennent le positionnement canonique de Klayer.
- Les pages juridiques (mentions légales, confidentialité, cookies) : liens en attente.
- L'adresse de la page LinkedIn de Klayer, en attente dans le footer.
- Les boutons « Prendre rendez-vous » mènent au bloc de contact ; un lien d'agenda pourra les remplacer.
