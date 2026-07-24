// ─── DONNÉES DU PROJET : Lighthouse Agents ──────────────────────────────────
// Passé à <ProjectCard data={lighthouseProject} /> dans App.jsx.
// Même schéma que l'objet `project` par défaut de ProjectCard.jsx — on ne
// touche pas au composant, on ne fait que lui fournir d'autres données.
// Chiffres MESURÉS le 2026-07-24 sur le dépôt (129 tests, 52 % de couverture,
// 38 endpoints). Captures dans public/screenshots/ (préfixe lighthouse-).

export const lighthouseProject = {
  name: "Lighthouse Agents",
  eyebrow: "Projet personnel · Orchestration multi-agents IA",

  tagline:
    "Un assistant de développement qui répartit le travail entre plusieurs IA locales et vous montre chaque modification avant de l'appliquer.",

  why:
    "Un agent de code sur un seul gros modèle coûte cher sur les tâches simples, ne voit pas les images, et écrit directement dans les fichiers. Ici, un agent exécutif décompose la tâche et délègue à des agents spécialisés — code, vérification, relecture ; les requêtes texte vont à un Qwen3 35B, les images sont routées automatiquement vers un modèle de vision. Chaque tâche s'exécute sur une branche git dédiée : on relit le diff, on garde ou on jette.",

  stack: [
    "Python 3.11",
    "Flask",
    "Socket.IO",
    "SQLite",
    "JWT",
    "pytest",
    "llama.cpp / vLLM",
    "Qwen3-35B · Qwen3-VL",
    "VS Code Extension API",
    "Git",
  ],

  metrics: [
    { value: "129", label: "tests au vert", detail: "52 % de couverture (agent · api · plugins · core)" },
    { value: "38", label: "endpoints REST", detail: "API v1 : agents, tâches, workflows, mémoire, gérance" },
    { value: "4", label: "agents orchestrés", detail: "exécutif · code · vérification · relecture" },
  ],

  screenshots: [
    { file: "lighthouse-assistant.png", caption: "Assistant : chat, lancement de tâches et actions rapides" },
    { file: "lighthouse-sante.png", caption: "Rapport de santé : score, dette technique, problèmes de sécurité" },
    { file: "lighthouse-propositions.png", caption: "Corrections autonomes proposées, applicables une par une" },
    { file: "lighthouse-integrations.png", caption: "Bridge VS Code et liaison d'un projet local à l'agent" },
  ],

  repoUrl: "https://github.com/baDrsh531/lighthouse-agents",

  demo: { status: "pending", label: "Démo : code prêt, déploiement en attente" },
};
