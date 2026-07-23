# Portfolio — Badr Sahraoui

Site portfolio construit avec React + Vite, déployé automatiquement sur GitHub
Pages à chaque push sur `main`.

**En ligne :** https://baDrsh531.github.io

## Développement local

```bash
npm install
npm run dev      # http://localhost:5174
```

## Build

```bash
npm run build    # génère dist/
npm run preview  # sert dist/ localement
```

## Ajouter un projet

1. Copie `ProjectCard.jsx` (ex. `ProjectCardATMView.jsx`) et adapte l'objet
   `project` en tête du fichier.
2. Place ses captures dans `public/screenshots/`.
3. Importe la nouvelle carte dans `App.jsx` et ajoute-la dans `<main>`.

Le composant `ProjectCard` est autonome et réutilisable : seul son objet
`project` change d'un projet à l'autre. Palette et thème (clair/sombre) se
pilotent via les variables CSS `--pc-*` documentées dans le fichier.

## Déploiement

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
construit le site et le publie sur GitHub Pages. Aucune action manuelle après le
push : l'URL se met à jour toute seule.
