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
      "Les données d'un match de foot sont abondantes mais muettes : elles disent ce qui s'est passé, jamais pourquoi ça a compté. MatchIQ combine un moteur de scoring composite — qui pondère chaque statistique selon le poste du joueur — et une interprétation par LLM qui traduit ces notes en un rapport lisible : homme du match justifié, lecture tactique, forces et faiblesses. Un rapport qu'un supporter peut lire, appuyé sur des chiffres qu'un analyste accepterait.",
    stack: ["Python", "FastAPI", "React", "SQLite", "Gemini API"],
    metrics: [
      { value: "85", label: "tests automatisés", detail: "84 % de couverture" },
      { value: "−59 %", label: "taille du bundle initial", detail: "852 → 352 kB" },
      { value: "3 / 3", label: "checks CI au vert", detail: "backend · frontend · secrets" },
    ],
    screenshots: [
      { file: "report.png", caption: "Rapport de match : homme du match calculé et formations" },
      { file: "ai_report.png", caption: "Interprétation rédigée par le LLM, ancrée dans les chiffres" },
      { file: "player.png", caption: "Score composite par joueur, détaillé en radar chart" },
      { file: "compare_teams.png", caption: "Comparateur d'équipes : bilan et meilleur joueur" },
      { file: "compare.png", caption: "Comparateur de joueurs : profils superposés" },
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
      "A football match produces plenty of data but says nothing: it tells you what happened, never why it mattered. MatchIQ combines a composite scoring engine — weighting each stat by the player's position — with an LLM interpretation that turns those ratings into a readable report: justified man of the match, tactical read, strengths and weaknesses. A report a fan can read, backed by numbers an analyst would accept.",
    stack: ["Python", "FastAPI", "React", "SQLite", "Gemini API"],
    metrics: [
      { value: "85", label: "automated tests", detail: "84% coverage" },
      { value: "−59%", label: "initial bundle size", detail: "852 → 352 kB" },
      { value: "3 / 3", label: "CI checks green", detail: "backend · frontend · secrets" },
    ],
    screenshots: [
      { file: "report.png", caption: "Match report: computed man of the match and line-ups" },
      { file: "ai_report.png", caption: "LLM-written interpretation, grounded in the numbers" },
      { file: "player.png", caption: "Composite score per player, detailed in a radar chart" },
      { file: "compare_teams.png", caption: "Team comparator: overview and best player" },
      { file: "compare.png", caption: "Player comparator: overlaid profiles" },
      { file: "dashboard.png", caption: "Home: history of analyzed matches" },
    ],
    repoUrl: "https://github.com/baDrsh531/matchiq",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
