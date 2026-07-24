// ─── TRADUCTIONS DU SHELL (FR / EN) ─────────────────────────────────────────
// Les libellés de catégories de compétences restent en anglais dans les deux
// langues (termes standards du métier). Les données des projets sont dans
// matchiqProject.js et lighthouseProject.js (également bilingues).

export const STRINGS = {
  fr: {
    metaTitle: "Badr Sahraoui — AI Software Engineer",
    nav: { projects: "Projets", skills: "Compétences", about: "À propos", contact: "Contact" },
    hero: {
      role: "AI Software Engineer",
      headline: "Je construis des applications IA qui résolvent de vrais problèmes métier.",
      keywords: ["Python", "Django", "LLMs", "AI Agents", "Backend"],
      intro:
        "De l'orchestration multi-agents au déploiement de LLM en local (OpenAI-compatible via vLLM / llama.cpp), j'assemble le backend Python — API, persistance, tests — qui rend l'IA fiable en production.",
      ctaProjects: "Voir les projets",
      ctaContact: "Me contacter",
    },
    projects: {
      kicker: "01 — Projets IA",
      title: "Ce que je construis",
      sub: "Ma spécialité : des applications où le LLM fait le travail. Deux systèmes complets, du backend au modèle — chiffres mesurés, code public.",
    },
    skills: {
      kicker: "02 — Stack",
      title: "Compétences",
      sub: "De l'IA au déploiement — l'intelligence artificielle en premier.",
    },
    about: {
      kicker: "03 — Profil",
      title: "À propos",
      paragraphs: [
        "Je construis des applications où l'IA fait un vrai travail, pas de la démo. Concrètement : brancher des LLM sur des problèmes métier, orchestrer plusieurs agents spécialisés, et servir des modèles en local (OpenAI-compatible via vLLM / llama.cpp).",
        "Le reste, c'est de l'ingénierie backend Python qui tient la charge : API REST, persistance, authentification, suites de tests. Je travaille de bout en bout — du pipeline de données à l'interface — avec des garde-fous (validation git de chaque changement, tests automatisés), parce qu'un système d'IA ne vaut que si on peut lui faire confiance.",
      ],
    },
    contact: {
      kicker: "04 — Contact",
      title: "Travaillons ensemble",
      sub: "Ouvert aux postes d'AI Software Engineer, LLM Engineer et Backend Python.",
      linkedinMeta: "Profil",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
    },
    footer: "Construit avec React & Vite",
  },

  en: {
    metaTitle: "Badr Sahraoui — AI Software Engineer",
    nav: { projects: "Projects", skills: "Skills", about: "About", contact: "Contact" },
    hero: {
      role: "AI Software Engineer",
      headline: "I build AI applications that solve real business problems.",
      keywords: ["Python", "Django", "LLMs", "AI Agents", "Backend"],
      intro:
        "From multi-agent orchestration to running LLMs locally (OpenAI-compatible via vLLM / llama.cpp), I build the Python backend — APIs, persistence, tests — that makes AI reliable in production.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
    },
    projects: {
      kicker: "01 — AI Projects",
      title: "What I build",
      sub: "My specialty: applications where the LLM does the work. Two complete systems, from backend to model — measured numbers, public code.",
    },
    skills: {
      kicker: "02 — Stack",
      title: "Skills",
      sub: "From AI to deployment — artificial intelligence first.",
    },
    about: {
      kicker: "03 — Profile",
      title: "About",
      paragraphs: [
        "I build applications where AI does real work, not demos. Concretely: connecting LLMs to business problems, orchestrating several specialized agents, and serving models locally (OpenAI-compatible via vLLM / llama.cpp).",
        "The rest is Python backend engineering that holds up under load: REST APIs, persistence, authentication, test suites. I work end to end — from the data pipeline to the interface — with guardrails (git review of every change, automated tests), because an AI system is only worth as much as the trust you can place in it.",
      ],
    },
    contact: {
      kicker: "04 — Contact",
      title: "Let's work together",
      sub: "Open to AI Software Engineer, LLM Engineer and Backend Python roles.",
      linkedinMeta: "Profile",
      emailLabel: "Email",
      phoneLabel: "Phone",
    },
    footer: "Built with React & Vite",
  },
};

// ─── COMPÉTENCES (bilingues) ────────────────────────────────────────────────
// Seuls quelques libellés diffèrent (ex. « Déploiement local de LLM »).
export const SKILLS = {
  fr: [
    { group: "Artificial Intelligence", items: ["LLMs", "AI Agents", "Prompt Engineering", "RAG & tool-calling", "Transformers", "Hugging Face", "Ollama", "vLLM · llama.cpp", "Déploiement local de LLM"] },
    { group: "Backend", items: ["Python", "Django", "FastAPI", "Flask", "REST API", "JWT", "Socket.IO · SSE"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite"] },
    { group: "Data", items: ["Pandas", "NumPy"] },
    { group: "DevOps", items: ["Docker", "Git · GitHub", "Linux", "GitHub Actions (CI/CD)"] },
    { group: "Frontend", items: ["React", "JavaScript", "HTML · CSS", "Vite"] },
  ],
  en: [
    { group: "Artificial Intelligence", items: ["LLMs", "AI Agents", "Prompt Engineering", "RAG & tool-calling", "Transformers", "Hugging Face", "Ollama", "vLLM · llama.cpp", "Local LLM deployment"] },
    { group: "Backend", items: ["Python", "Django", "FastAPI", "Flask", "REST API", "JWT", "Socket.IO · SSE"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite"] },
    { group: "Data", items: ["Pandas", "NumPy"] },
    { group: "DevOps", items: ["Docker", "Git · GitHub", "Linux", "GitHub Actions (CI/CD)"] },
    { group: "Frontend", items: ["React", "JavaScript", "HTML · CSS", "Vite"] },
  ],
};
