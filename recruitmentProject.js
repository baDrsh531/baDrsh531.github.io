// ─── DONNÉES DU PROJET : Recrutement.IA (bilingue FR / EN) ──────────────────
// Passé à <ProjectCard data={...} /> dans App.jsx. Même schéma que l'objet
// `project` par défaut de ProjectCard.jsx — on ne touche pas au composant.
// Chiffres MESURÉS le 2026-07-27 : suite de tests exécutée (235 tests, 76 % de
// couverture), harnais d'évaluation du classement (nDCG@5 0,997 sur 7 cas
// annotés) et audit de biais par contrefactuels (ratio d'impact 0,809 → 1,000).
// Captures dans public/screenshots/ (préfixe recruitment-).

export const recruitmentProject = {
  fr: {
    name: "Recrutement.IA",
    eyebrow: "Projet personnel · Django + modèles auto-hébergés",
    tagline:
      "Aider un recruteur à trier des candidatures sans jamais lui demander de croire une note qu'il ne peut pas vérifier.",
    why:
      "Trier des CV avec un modèle de langage est facile ; obtenir un résultat qu'on puisse défendre l'est beaucoup moins — la note change d'une exécution à l'autre, et rien ne dit d'où elle vient. Ici le score est calculé par un moteur déterministe à partir de poids explicites, le modèle se contente de le commenter, et aucune donnée extraite d'un CV n'est retenue sans une citation retrouvée mot pour mot dans le document. La qualité du classement et l'effet des attributs identitaires sont mesurés sur des jeux annotés puis verrouillés en intégration continue : le tri de candidatures étant un système d'IA à haut risque au sens de l'AI Act, le journal d'audit, la supervision humaine et le versionnage des prompts sont dans le modèle de données, pas en annexe.",
    stack: ["Python 3.11", "Django 5", "Celery", "PyMuPDF", "python-docx", "pytest", "llama.cpp", "Qwen3.6-35B · Qwen3-VL", "SVG sans dépendance", "GitHub Actions"],
    metrics: [
      { value: "235", label: "tests automatisés", detail: "76 % de couverture, exécutés en intégration continue" },
      { value: "0,997", label: "nDCG@5 du classement", detail: "sur 7 cas annotés à la main, non-régression verrouillée" },
      { value: "1,000", label: "ratio d'impact après atténuation", detail: "0,809 avant — règle dite des quatre cinquièmes" },
    ],
    screenshots: [
      { file: "recruitment-ranking.png", caption: "Classement d'une offre : score, écarts de compétences, étape" },
      { file: "recruitment-application.png", caption: "Score détaillé par critère, poids appliqués et méthode de rapprochement" },
      { file: "recruitment-candidate.png", caption: "Profil extrait du CV : chaque donnée cite le passage qui la justifie" },
      { file: "recruitment-bias.png", caption: "Audit de biais par contrefactuels : effet mesuré de chaque attribut identitaire" },
      { file: "recruitment-questions.png", caption: "Questions d'entretien ancrées dans une affirmation précise du profil" },
      { file: "recruitment-dashboard.png", caption: "Tableau de bord : compétences, ancienneté, distribution des scores" },
    ],
    repoUrl: "https://github.com/baDrsh531/ai-recruitment-assistant",
    demo: { status: "pending", label: "Démo : code prêt, déploiement en attente" },
  },

  en: {
    name: "Recrutement.IA",
    eyebrow: "Personal project · Django + self-hosted models",
    tagline:
      "Helping a recruiter shortlist applications without ever asking them to trust a score they cannot check.",
    why:
      "Ranking CVs with a language model is easy; getting a result you can defend is much harder — the score shifts between runs, and nothing says where it came from. Here the score is computed by a deterministic engine from explicit weights, the model only comments on it, and no data extracted from a CV is kept without a quote found verbatim in the document. Ranking quality and the effect of identity attributes are measured on annotated datasets and locked in continuous integration: since CV screening is a high-risk AI system under the EU AI Act, the audit log, human oversight and prompt versioning live in the data model, not in an appendix.",
    stack: ["Python 3.11", "Django 5", "Celery", "PyMuPDF", "python-docx", "pytest", "llama.cpp", "Qwen3.6-35B · Qwen3-VL", "Dependency-free SVG", "GitHub Actions"],
    metrics: [
      { value: "235", label: "automated tests", detail: "76% coverage, run in continuous integration" },
      { value: "0.997", label: "ranking nDCG@5", detail: "across 7 hand-annotated cases, regression-locked" },
      { value: "1.000", label: "impact ratio after mitigation", detail: "0.809 before — the four-fifths rule" },
    ],
    screenshots: [
      { file: "recruitment-ranking.png", caption: "Shortlist for a role: score, missing skills, pipeline stage" },
      { file: "recruitment-application.png", caption: "Score broken down per criterion, applied weights and matching method" },
      { file: "recruitment-candidate.png", caption: "Profile extracted from the CV: every field cites the passage backing it" },
      { file: "recruitment-bias.png", caption: "Counterfactual bias audit: measured effect of each identity attribute" },
      { file: "recruitment-questions.png", caption: "Interview questions anchored in a specific claim from the profile" },
      { file: "recruitment-dashboard.png", caption: "Dashboard: skills, seniority, score distribution" },
    ],
    repoUrl: "https://github.com/baDrsh531/ai-recruitment-assistant",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
