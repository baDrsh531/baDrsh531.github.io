// ─── DONNÉES DU PROJET : MatchIQ (bilingue FR / EN) ─────────────────────────
// Reprend l'objet `project` par défaut de ProjectCard.jsx pour permettre la
// bascule de langue. On passe ces données via <ProjectCard data={...} /> —
// le composant n'est pas modifié. Captures dans public/screenshots/.

export const matchiqProject = {
  fr: {
    name: "MatchIQ",
    eyebrow: "Projet personnel · Full-stack ML + LLM",
    tagline:
      "Transformer les statistiques brutes d'un match de football en un rapport clair, où chaque joueur reçoit une note expliquée.",
    why:
      "Les données d'un match de foot sont abondantes mais muettes : elles disent ce qui s'est passé, jamais pourquoi ça a compté. MatchIQ combine un moteur de scoring composite — qui pondère chaque statistique selon le poste du joueur — et une interprétation par LLM qui traduit ces notes en un rapport lisible : homme du match justifié, lecture tactique, forces et faiblesses. Autour de ce socle, une vraie boîte à outils ML, toujours déterministe : une prédiction pré-match par classement Elo (calibration mesurée au score de Brier, que le LLM commente ensuite face au résultat réel), la recherche de joueurs au style proche (similarité cosinus sur profils standardisés), le clustering des équipes par style de jeu (k-means), la détection d'écarts de performance (z-score vs baseline perso) et une fiche de scouting PDF. Côté ops, un tableau de bord FinOps suit coût, tokens et latence du LLM ; côté produit, chatbot multi-tours ancré sur les données, comparateur de matchs, palmarès, export PDF, backend LLM interchangeable (Gemini ou modèle local) et une revue de presse externe strictement séparée des chiffres calculés.",
    stack: ["Python", "FastAPI", "React", "SQLite", "NumPy", "LLM (Gemini / local)"],
    metrics: [
      { value: "214", label: "tests automatisés", detail: "85 % de couverture" },
      { value: "−59 %", label: "taille du bundle initial", detail: "852 → 352 kB" },
      { value: "3 / 3", label: "checks CI au vert", detail: "backend · frontend · secrets" },
    ],
    architecture: {
      title: "Architecture",
      diagram: `API-Football          fixtures · stats · compositions · events
  │
  ▼
Cache JSON             data/raw/ — chaque appel téléchargé une seule fois
  │
  ▼
┌─── MOTEUR DE SCORE ─────┐   déterministe
│ score composite         │   pondéré par poste
│ normalisation par stat  │   aucun appel modèle
└────────────┬────────────┘
             │
             ▼
Interprétation LLM        Gemini
  │                       homme du match · lecture tactique
  ▼
Cache rapports            data/processed/ — généré une seule fois
  │
  ▼
SQLite                    matchiq.db — historique, fiches joueur / équipe
  │
  ▼
API FastAPI ────────▶ Frontend React (Vite)`,
      note:
        "Chaque étage est mis en cache : une réponse API n'est téléchargée qu'une fois, un rapport LLM généré qu'une fois — l'app tourne sans épuiser le quota. Le LLM interprète des scores déjà calculés ; il ne les produit jamais.",
    },
    screenshots: [
      { file: "report.png", caption: "Rapport de match : homme du match calculé et formations" },
      { file: "predict.png", caption: "Prédiction pré-match : classement Elo, probabilités V/N/D et calibration (score de Brier)" },
      { file: "explain.png", caption: "Score expliqué : chaque note décomposée (vert = ajoute, rouge = retire)" },
      { file: "qa.png", caption: "Question en langage naturel, réponse ancrée sur les données — FR ou EN" },
      { file: "h2h.png", caption: "Comparateur de matchs : deux rencontres face à face, évolution des joueurs communs" },
      { file: "leaderboard.png", caption: "Palmarès : meilleures performances classées, filtrables par poste" },
      { file: "player.png", caption: "Score composite par joueur, détaillé en radar chart" },
      { file: "dashboard.png", caption: "Accueil : historique des matchs analysés" },
    ],
    repoUrl: "https://github.com/baDrsh531/matchiq",
    demo: { status: "pending", label: "Démo : code prêt, déploiement en attente" },
  },

  en: {
    name: "MatchIQ",
    eyebrow: "Personal project · Full-stack ML + LLM",
    tagline:
      "Turning a football match's raw stats into a clear report where every player gets an explained rating.",
    why:
      "A football match produces plenty of data but says nothing: it tells you what happened, never why it mattered. MatchIQ combines a composite scoring engine — weighting each stat by the player's position — with an LLM interpretation that turns those ratings into a readable report: justified man of the match, tactical read, strengths and weaknesses. Around that core sits a real ML toolkit, always deterministic: a pre-match prediction from an Elo rating (calibration measured with the Brier score, which the LLM then comments against the actual result), similar-player search (cosine similarity on standardized profiles), team play-style clustering (k-means), performance-outlier detection (z-score vs personal baseline) and a PDF scouting report. On the ops side, a FinOps dashboard tracks the LLM's cost, tokens and latency; on the product side, a multi-turn chatbot grounded in the data, a match comparator, a leaderboard, PDF export, a swappable LLM backend (Gemini or a local model) and an external press review kept strictly separate from the computed numbers.",
    stack: ["Python", "FastAPI", "React", "SQLite", "NumPy", "LLM (Gemini / local)"],
    metrics: [
      { value: "214", label: "automated tests", detail: "85% coverage" },
      { value: "−59%", label: "initial bundle size", detail: "852 → 352 kB" },
      { value: "3 / 3", label: "CI checks green", detail: "backend · frontend · secrets" },
    ],
    architecture: {
      title: "Architecture",
      diagram: `API-Football          fixtures · stats · line-ups · events
  │
  ▼
JSON cache             data/raw/ — each call downloaded only once
  │
  ▼
┌─── SCORING ENGINE ──────┐   deterministic
│ composite score         │   weighted by position
│ per-stat normalisation  │   no model call
└────────────┬────────────┘
             │
             ▼
LLM interpretation        Gemini
  │                       man of the match · tactical read
  ▼
Reports cache             data/processed/ — generated only once
  │
  ▼
SQLite                    matchiq.db — history, player / team pages
  │
  ▼
FastAPI ────────────▶ React frontend (Vite)`,
      note:
        "Every stage is cached: an API response is downloaded only once, an LLM report generated only once — the app runs without burning through the quota. The LLM interprets already-computed scores; it never produces them.",
    },
    screenshots: [
      { file: "report.png", caption: "Match report: computed man of the match and line-ups" },
      { file: "predict.png", caption: "Pre-match prediction: Elo ranking, W/D/L probabilities and calibration (Brier score)" },
      { file: "explain.png", caption: "Explained score: every rating broken down (green adds, red subtracts)" },
      { file: "qa.png", caption: "Plain-language question, answer grounded in the data — FR or EN" },
      { file: "h2h.png", caption: "Match comparator: two fixtures head-to-head, rating swings for shared players" },
      { file: "leaderboard.png", caption: "Leaderboard: best performances ranked, filterable by position" },
      { file: "player.png", caption: "Composite score per player, detailed in a radar chart" },
      { file: "dashboard.png", caption: "Home: history of analyzed matches" },
    ],
    repoUrl: "https://github.com/baDrsh531/matchiq",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
