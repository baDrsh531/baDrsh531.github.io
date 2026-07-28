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
    architecture: {
      title: "Architecture",
      diagram: `CV  PDF · DOCX
  │
  ▼
Extraction            texte + position de chaque mot
  │                   PyMuPDF · python-docx
  ▼
Diagnostic            scanné ?  multi-colonnes ?
  │
  ├── texte natif ───────▶  Qwen3.6-35B
  └── scanné / colonnes ─▶  Qwen3-VL-8B
                │
                ▼
      Sortie JSON contrainte par schéma
                │
                ▼
      Ancrage des preuves      page + coordonnées
                │
                ▼
        Profil structuré
                │
                ▼
  ┌─── MOTEUR DE SCORE ────┐   déterministe
  │ ontologie dirigée      │   aucun appel modèle
  │ poids par offre        │   ~100 ms
  │ facteur de recevabilité│
  └───────────┬────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
Classement          Qwen3.6-35B
+ écarts            analyse rédigée
                    commente le score,
                    ne le produit pas`,
      note:
        "Le modèle de langage n'intervient qu'aux deux extrémités : lire le document, puis commenter un chiffre déjà calculé. Il ne voit jamais le CV brut au moment de l'analyse, et n'attribue aucune note.",
    },

    challenges: {
      title: "Défis techniques",
      items: [
        { label: "Ancrer chaque donnée dans le document", detail: "Le texte d'une page est reconstruit depuis la liste des mots plutôt que lu d'un bloc : c'est la seule façon qu'un décalage de caractère corresponde à un mot dont on connaît les coordonnées." },
        { label: "CV scannés et mises en page multi-colonnes", detail: "Un couloir vide détecté par projection horizontale des mots aiguille vers le modèle vision. À 150 dpi il n'y lisait que les titres de sections ; il en faut 220." },
        { label: "Un modèle qui réfléchit avant de répondre", detail: "Qwen3.6 dépense 390 tokens de raisonnement pour 25 tokens de réponse. Désactivé sur les extractions structurées : seize fois moins de tokens, résultat identique." },
        { label: "Rapprochement sémantique mesuré, puis débranché", detail: "Le modèle d'embeddings notait « Kubernetes / Boulangerie » au-dessus de « Symfony / Laravel ». Couche désactivée par défaut, mesure laissée reproductible." },
        { label: "Un score qu'on puisse défendre", detail: "Ontologie à relations dirigées — Django implique Python, jamais l'inverse — poids renormalisés sur les seuls critères exprimés par l'offre." },
      ],
    },

    impact: {
      title: "Ce que ça change",
      items: [
        { label: "Score en 100 ms, reproductible", detail: "Calculé sans aucun appel modèle : deux exécutions donnent le même chiffre, et chaque composante est inspectable." },
        { label: "CV analysé en une dizaine de secondes", detail: "Extraction, aiguillage vers le bon modèle, structuration et ancrage des preuves compris." },
        { label: "13 citations sur 13 retrouvées dans le document", detail: "Sur les CV de test : chaque donnée du profil renvoie au passage qui la justifie, page et coordonnées." },
        { label: "Six questions d'entretien en neuf secondes", detail: "Chacune ancrée dans une affirmation précise du profil, avec ce qu'une bonne réponse contient." },
        { label: "Biais de localisation neutralisé", detail: "Ratio d'impact ramené de 0,809 à 1,000 par le screening à l'aveugle, mesuré avant et après." },
      ],
      note:
        "Chiffres relevés sur les jeux de test du dépôt, reproductibles par les commandes du README. Le gain de temps de présélection en conditions réelles n'a pas été mesuré : il n'est donc pas revendiqué.",
    },

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
    architecture: {
      title: "Architecture",
      diagram: `CV  PDF · DOCX
  │
  ▼
Extraction            text + position of every word
  │                   PyMuPDF · python-docx
  ▼
Layout check          scanned ?  multi-column ?
  │
  ├── native text ───────▶  Qwen3.6-35B
  └── scanned / columns ─▶  Qwen3-VL-8B
                │
                ▼
      Schema-constrained JSON output
                │
                ▼
      Evidence anchoring       page + coordinates
                │
                ▼
        Structured profile
                │
                ▼
  ┌─── SCORING ENGINE ─────┐   deterministic
  │ directed ontology      │   no model call
  │ per-role weights       │   ~100 ms
  │ admissibility factor   │
  └───────────┬────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
Shortlist           Qwen3.6-35B
+ skill gaps        written analysis
                    comments the score,
                    never produces it`,
      note:
        "The language model only steps in at the two ends: reading the document, then commenting on an already computed figure. It never sees the raw CV at analysis time, and never assigns a score.",
    },

    challenges: {
      title: "Technical challenges",
      items: [
        { label: "Anchoring every field in the document", detail: "A page's text is rebuilt from the word list rather than read as a block: that is the only way a character offset maps to a word whose coordinates are known." },
        { label: "Scanned CVs and multi-column layouts", detail: "An empty gutter, found by projecting words horizontally, routes to the vision model. At 150 dpi it only read section headings; 220 dpi is required." },
        { label: "A model that thinks before answering", detail: "Qwen3.6 spends 390 reasoning tokens for a 25-token answer. Disabled on structured extraction: sixteen times fewer tokens, identical result." },
        { label: "Semantic matching measured, then switched off", detail: "The embedding model scored « Kubernetes / Bakery » above « Symfony / Laravel ». The layer is off by default, the measurement left reproducible." },
        { label: "A score you can defend", detail: "Directed ontology — Django implies Python, never the reverse — and weights renormalised over the criteria the role actually states." },
      ],
    },

    impact: {
      title: "What it changes",
      items: [
        { label: "Score in 100 ms, reproducible", detail: "Computed with no model call: two runs give the same figure, and every component is inspectable." },
        { label: "A CV analysed in about ten seconds", detail: "Extraction, routing to the right model, structuring and evidence anchoring included." },
        { label: "13 of 13 quotes found in the document", detail: "On the test CVs: every field in the profile points back to the passage backing it, page and coordinates." },
        { label: "Six interview questions in nine seconds", detail: "Each anchored in a specific claim from the profile, with what a good answer contains." },
        { label: "Location bias neutralised", detail: "Impact ratio brought from 0.809 to 1.000 by blind screening, measured before and after." },
      ],
      note:
        "Figures taken from the repository's test datasets, reproducible with the README commands. Real-world shortlisting time savings were not measured, so they are not claimed.",
    },

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
