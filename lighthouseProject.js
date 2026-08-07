// ─── DONNÉES DU PROJET : Lighthouse Agents (bilingue FR / EN) ───────────────
// Passé à <ProjectCard data={...} /> dans App.jsx. Même schéma que l'objet
// `project` par défaut de ProjectCard.jsx — on ne touche pas au composant.
// Chiffres MESURÉS le 2026-07-24 (129 tests, 52 % de couverture, 38 endpoints).
// Captures dans public/screenshots/ (préfixe lighthouse-).

export const lighthouseProject = {
  fr: {
    name: "Lighthouse Agents",
    eyebrow: "Projet personnel · Assistant de développement dans VS Code",
    tagline:
      "Un assistant de développement qui répartit le travail entre plusieurs IA locales et vous montre chaque modification avant de l'appliquer.",
    why:
      "Un agent de code sur un seul gros modèle coûte cher sur les tâches simples, ne voit pas les images, et écrit directement dans les fichiers. Ici, un agent exécutif décompose la tâche et délègue à des agents spécialisés — code, vérification, relecture ; les requêtes texte vont à un Qwen3 35B, les images sont routées automatiquement vers un modèle de vision. Chaque tâche s'exécute sur une branche git dédiée : on relit le diff, on garde ou on jette. C'est le pari inverse d'Agent Dev Crew, plus haut : ici c'est un modèle qui décide de la suite, ce qui permet de s'adapter à une tâche imprévue mais rend deux exécutions difficilement comparables.",
    stack: ["Python 3.11", "Flask", "Socket.IO", "SQLite", "JWT", "pytest", "llama.cpp / vLLM", "Qwen3-35B · Qwen3-VL", "VS Code Extension API", "Git"],
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
  },

  en: {
    name: "Lighthouse Agents",
    eyebrow: "Personal project · Development assistant inside VS Code",
    tagline:
      "A development assistant that splits the work across several local AIs and shows you every change before applying it.",
    why:
      "A coding agent on a single large model is expensive on trivial tasks, can't see images, and writes straight to files. Here an executive agent breaks the task down and delegates to specialized agents — code, verification, review; text requests go to a Qwen3 35B, images are automatically routed to a vision model. Each task runs on a dedicated git branch: you review the diff, keep it or drop it. This is the opposite bet from Agent Dev Crew, further up: here a model decides what comes next, which lets it adapt to an unforeseen task but makes two executions hard to compare.",
    stack: ["Python 3.11", "Flask", "Socket.IO", "SQLite", "JWT", "pytest", "llama.cpp / vLLM", "Qwen3-35B · Qwen3-VL", "VS Code Extension API", "Git"],
    metrics: [
      { value: "129", label: "passing tests", detail: "52% coverage (agent · api · plugins · core)" },
      { value: "38", label: "REST endpoints", detail: "v1 API: agents, tasks, workflows, memory, stewardship" },
      { value: "4", label: "orchestrated agents", detail: "executive · code · verification · review" },
    ],
    screenshots: [
      { file: "lighthouse-assistant.png", caption: "Assistant: chat, task launching and quick actions" },
      { file: "lighthouse-sante.png", caption: "Health report: score, technical debt, security issues" },
      { file: "lighthouse-propositions.png", caption: "Autonomous fixes proposed, applicable one by one" },
      { file: "lighthouse-integrations.png", caption: "VS Code bridge and linking a local project to the agent" },
    ],
    repoUrl: "https://github.com/baDrsh531/lighthouse-agents",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
