// ─── DONNÉES DU PROJET : Recrutement.IA (bilingue FR / EN) ──────────────────
// Passé à <ProjectCard data={...} /> dans App.jsx. Même schéma que l'objet
// `project` par défaut de ProjectCard.jsx — on ne touche pas au composant.
// Chiffres MESURÉS le 2026-07-31 : suite de tests exécutée (667 tests, 84 % de
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
      "Trier des CV avec un modèle de langage est facile ; obtenir un résultat qu'on puisse défendre l'est beaucoup moins — la note change d'une exécution à l'autre, et rien ne dit d'où elle vient. Ici le score est calculé par un moteur déterministe à partir de poids explicites, le modèle se contente de le commenter, et aucune donnée extraite d'un CV n'est retenue sans une citation retrouvée mot pour mot dans le document. La qualité du classement et l'effet des attributs identitaires sont mesurés sur des jeux annotés puis verrouillés en intégration continue : le tri de candidatures étant un système d'IA à haut risque au sens de l'AI Act, la supervision humaine n'est pas une intention mais un comportement — écarter un candidat demande un motif écrit, un compte non habilité se voit refuser l'action et le refus est journalisé, et chaque dossier porte une échéance de conservation qu'une purge quotidienne fait respecter.",
    stack: ["Python 3.11", "Django 5", "DRF", "Celery", "PyMuPDF", "python-docx", "pytest", "llama.cpp", "Qwen3.6-35B · Qwen3-VL", "SVG sans dépendance", "GitHub Actions"],
    metrics: [
      { value: "667", label: "tests automatisés", detail: "84 % de couverture, exécutés en intégration continue" },
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
        { label: "Un assistant incapable d'inventer un candidat", detail: "Le modèle traduit la question en critères, le code filtre la base, et le modèle ne rédige qu'à partir des lignes trouvées. La même question renvoie toujours la même liste." },
        { label: "Une purge qui aurait épargné les dossiers existants", detail: "L'échéance n'était posée qu'à l'écriture ; les dossiers déjà en base gardaient un champ vide, et un filtre sur une date ne sélectionne jamais un NULL. Ils auraient été conservés indéfiniment par la fonctionnalité censée l'empêcher — une migration leur donne une échéance calculée depuis leur date de création réelle." },
        { label: "Un tableau dont les lignes ne s'additionnaient pas", detail: "Le chemin vers le seuil affichait l'apport de chaque levier pris seul : 74 % puis « +21 points » donnait 83 %. Le facteur de recevabilité étant multiplicatif, deux écarts comblés ensemble rapportent moins que la somme de leurs effets. Le chemin porte désormais l'apport marginal, l'apport isolé restant dans une colonne à part." },
        { label: "Un seuil parfait qu'il ne faut pas croire", detail: "Le balayage donne 100 % de précision et de rappel à 85 % — mais sur une marge d'un seul point. Une séparation parfaite sur une marge aussi étroite en dit autant sur la facilité du jeu annoté que sur le moteur. La marge est donc publiée à côté du seuil, et le seuil retenu est le milieu de l'intervalle optimal, pas une de ses bornes." },
        { label: "Un rappel qui ne peut pas atteindre 1", detail: "Une requête comptant sept profils pertinents pour cinq places plafonne à 0,71 : sans cette borne publiée à côté de la mesure, un sans-faute se lirait comme un manque. Le plafond atteignable figure donc dans le rapport, et il vaut exactement le rappel obtenu." },
        { label: "Un compteur faux depuis toujours", detail: "L'en-tête de la liste des candidats affichait « 0 candidat(s) » dès qu'il y en avait. Le gabarit appliquait le filtre Django « length » à un entier, qui renvoie 0 : le nombre n'était juste que sur une base vide. C'est la recherche plein texte qui l'a rendu visible, en produisant une page où les deux chiffres se contredisaient à l'écran." },
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
        { label: "Recherche en français, résultat vérifiable", detail: "« Qui connaît Django mais pas React ? » répond en quatre secondes, avec les critères appliqués affichés et un critère discriminatoire écarté s'il y en avait un." },
        { label: "Aucune candidature écartée sans un motif écrit", detail: "Le moteur classe, il ne rejette personne : sortir un candidat du processus demande un motif, est imputé à son auteur, et reste refusé aux comptes non habilités — refus compris, le journal garde tout." },
        { label: "Un score devenu actionnable", detail: "« 61 % » ne dit rien. Le contrefactuel dit ce qui manque et de combien, en rejouant le moteur sur une copie du profil : chaque chiffre affiché est mesuré, jamais estimé. La localisation n'est jamais proposée comme levier." },
        { label: "Un seuil de coupe mesuré, pas choisi rond", detail: "Balayage des 101 seuils sur le jeu annoté, avec la marge du seuil retenu affichée à côté. La colonne qui compte est celle des bons profils écartés à tort — un chiffre qu'aucun processus réel ne peut observer." },
        { label: "Une personne comptée une fois", detail: "Un candidat qui repostule six mois plus tard créait deux dossiers, deux scores, et pouvait être écarté sur l'un sans qu'on sache que l'autre existait." },
        { label: "Chercher ce qu'aucun filtre n'exprime", detail: "« Qui a travaillé sur des systèmes de paiement ? » n'est ni une compétence, ni une langue, ni un seuil. BM25 sur le profil extrait répond, sans appel modèle : rappel@5 de 0,959 sur un jeu annoté, soit exactement le maximum atteignable." },
        { label: "Un rapport transmissible", detail: "Qualité du classement, biais mesurés, seuil et sa marge dans un PDF daté et versionné, généré sans dépendance supplémentaire — PyMuPDF était déjà là pour lire les CV. L'export est journalisé : un document qui sort du système est une donnée qui circule." },
        { label: "Personne n'est écarté sans qu'on ait regardé ailleurs", detail: "Un candidat sous le seuil sur une offre mais au-dessus sur une autre est signalé au lieu de disparaître. C'est un signalement, pas un transfert : postuler ailleurs appartient au candidat. La page distingue « aucune autre offre ne conviendrait » de « on n'a pas regardé »." },
        { label: "Un CV arabe devient lisible", detail: "Un PDF arabe stocke des formes de présentation, pas les lettres de base : « سارة » écrit dans le CV ressort en « ﺱﺍﺭﺓ ». Sans normalisation, 2 champs sur 8 sont retrouvés ; avec, 7 sur 8." },
        { label: "Le coût d'une pondération est visible avant de l'appliquer", detail: "Baisser le poids des compétences de 0,45 à 0,20 fait tomber le ratio d'impact de 0,809 à 0,714 — sous le seuil légal — sans toucher au poids de la localisation. Aucun recruteur ne devinerait cela en déplaçant un curseur." },
      ],
      note:
        "Chiffres relevés sur les jeux de test du dépôt, reproductibles par les commandes du README. Le gain de temps de présélection en conditions réelles n'a pas été mesuré : il n'est donc pas revendiqué.",
    },

    screenshots: [
      { file: "recruitment-ranking.png", caption: "Classement d'une offre, avec le seuil de coupe mesuré — la ligne marque, elle n'écarte pas" },
      { file: "recruitment-weights.png", caption: "Baisser le poids des compétences fait franchir le seuil légal — sans toucher à la localisation" },
      { file: "recruitment-threshold.png", caption: "Où couper : chaque seuil, ce qu'il retient et surtout ce qu'il écarte à tort" },
      { file: "recruitment-redirect.png", caption: "Sous le seuil ici, au-dessus ailleurs : l'offre est signalée, jamais la candidature transférée" },
      { file: "recruitment-agreement.png", caption: "Accord brut 0,67, kappa 0,25 : le pourcentage aurait fait croire à un consensus" },
      { file: "recruitment-arabic.png", caption: "CV arabe généré pour mesurer l'extraction : 2 champs sur 8 sans normalisation, 7 avec" },
      { file: "recruitment-counterfactual.png", caption: "Ce qui manque pour atteindre le seuil, mesuré en rejouant le moteur" },
      { file: "recruitment-duplicates.png", caption: "Deux dossiers pour la même personne — proposés au rapprochement, jamais fusionnés d'office" },
      { file: "recruitment-search.png", caption: "Recherche BM25 dans le texte des profils : aucun appel modèle, résultat reproductible" },
      { file: "recruitment-pdf.png", caption: "Rapport d'évaluation en PDF, daté et versionné — généré sans dépendance ajoutée" },
      { file: "recruitment-api.png", caption: "L'API applique le screening à l'aveugle : le nom est masqué, les identifiants directs retirés" },
      { file: "recruitment-application.png", caption: "Score détaillé par critère, poids appliqués et méthode de rapprochement" },
      { file: "recruitment-comparison.png", caption: "Comparaison : ce qui différencie vraiment quatre candidats, compétence par compétence" },
      { file: "recruitment-assistant.png", caption: "Assistant : la question devient des critères, le code filtre, le modèle rédige" },
      { file: "recruitment-assistant-bias.png", caption: "Un critère d'âge glissé dans la question est écarté, signalé et journalisé" },
      { file: "recruitment-candidate.png", caption: "Profil extrait du CV : chaque donnée cite le passage qui la justifie" },
      { file: "recruitment-bias.png", caption: "Audit de biais par contrefactuels : effet mesuré de chaque attribut identitaire" },
      { file: "recruitment-questions.png", caption: "Questions d'entretien ancrées dans une affirmation précise du profil" },
      { file: "recruitment-decision.png", caption: "Écarter un candidat exige un motif écrit ; le journal conserve toutes les décisions" },
      { file: "recruitment-roles.png", caption: "Un compte en lecture seule est refusé sur toute action, et le refus est journalisé" },
      { file: "recruitment-retention.png", caption: "Conservation RGPD : échéance par dossier, purge quotidienne en cascade" },
      { file: "recruitment-dashboard.png", caption: "Tableau de bord : trois jauges en tête, puis compétences, ancienneté et distribution des scores" },
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
      "Ranking CVs with a language model is easy; getting a result you can defend is much harder — the score shifts between runs, and nothing says where it came from. Here the score is computed by a deterministic engine from explicit weights, the model only comments on it, and no data extracted from a CV is kept without a quote found verbatim in the document. Ranking quality and the effect of identity attributes are measured on annotated datasets and locked in continuous integration: since CV screening is a high-risk AI system under the EU AI Act, human oversight is a behaviour rather than an intention — rejecting a candidate requires a written reason, an account without the right is refused the action and the refusal is logged, and every file carries a retention deadline that a daily purge enforces.",
    stack: ["Python 3.11", "Django 5", "DRF", "Celery", "PyMuPDF", "python-docx", "pytest", "llama.cpp", "Qwen3.6-35B · Qwen3-VL", "Dependency-free SVG", "GitHub Actions"],
    metrics: [
      { value: "667", label: "automated tests", detail: "84% coverage, run in continuous integration" },
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
        { label: "An assistant that cannot invent a candidate", detail: "The model turns the question into criteria, code filters the database, and the model only writes from the rows it was handed. The same question always returns the same list." },
        { label: "A purge that would have spared the existing files", detail: "The deadline was only set on write; files already in the database kept an empty field, and a date filter never selects a NULL. They would have been kept forever by the very feature meant to prevent it — a migration gives them a deadline computed from their real creation date." },
        { label: "A table whose rows did not add up", detail: "The path to the threshold showed each lever's gain taken alone: 74 % then « +21 points » landed on 83 %. The admissibility factor being multiplicative, two gaps closed together yield less than the sum of their separate effects. The path now carries the marginal gain, with the standalone figure kept in its own column." },
        { label: "A perfect threshold not to be believed", detail: "The sweep gives 100 % precision and recall at 85 % — but over a margin of a single point. A perfect split on so narrow a margin says as much about how easy the annotated set is as about the engine. The margin is therefore published next to the threshold, and the chosen value is the middle of the optimal interval, not one of its edges." },
        { label: "A recall that cannot reach 1", detail: "A query with seven relevant profiles for five slots caps at 0.71: without that ceiling published beside the measure, a flawless result would read as a miss. The reachable ceiling is therefore in the report, and it equals the recall obtained." },
        { label: "A counter that had always been wrong", detail: "The candidate list header showed « 0 candidate(s) » whenever there were any. The template applied Django's « length » filter to an integer, which returns 0: the number was only right on an empty database. Full-text search is what made it visible, by producing a page where the two figures contradicted each other on screen." },
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
        { label: "Plain-language search, verifiable result", detail: "« Who knows Django but not React ? » answers in four seconds, showing the criteria that were applied — and any discriminatory one that was dropped." },
        { label: "No application dropped without a written reason", detail: "The engine ranks, it rejects no one: taking a candidate out of the process requires a reason, is attributed to its author, and stays barred to accounts without the right — refusals included, the log keeps everything." },
        { label: "A score you can act on", detail: "« 61 % » says nothing. The counterfactual says what is missing and by how much, replaying the engine on a copy of the profile: every figure shown is measured, never estimated. Location is never offered as a lever." },
        { label: "A cut-off that is measured, not rounded", detail: "A sweep of all 101 thresholds over the annotated set, with the margin of the chosen one shown beside it. The column that matters is wrongly dropped good profiles — a number no real process can ever observe." },
        { label: "One person counted once", detail: "A candidate re-applying six months later created two records, two scores, and could be dropped on one without anyone knowing the other existed." },
        { label: "Searching what no filter can express", detail: "« Who has worked on payment systems? » is neither a skill, nor a language, nor a threshold. BM25 over the extracted profile answers it with no model call: recall@5 of 0.959 on an annotated set — exactly the reachable maximum." },
        { label: "A report you can hand over", detail: "Ranking quality, measured bias, threshold and its margin in a dated, versioned PDF, generated with no extra dependency — PyMuPDF was already there to read CVs. The export is logged: a document leaving the system is data in circulation." },
        { label: "Nobody is dropped before looking elsewhere", detail: "A candidate below the bar on one role but above it on another is flagged instead of vanishing. It is a flag, not a transfer: applying elsewhere belongs to the candidate. The page distinguishes « no other role would fit » from « nobody looked »." },
        { label: "An Arabic CV becomes readable", detail: "An Arabic PDF stores presentation forms, not base letters: « سارة » written in the CV comes back as « ﺱﺍﺭﺓ ». Without normalisation, 2 fields of 8 are recovered; with it, 7 of 8." },
        { label: "The price of a weighting is visible before applying it", detail: "Lowering the weight of skills from 0.45 to 0.20 drops the impact ratio from 0.809 to 0.714 — below the legal threshold — without touching the weight of location. No recruiter would guess that by moving a slider." },
      ],
      note:
        "Figures taken from the repository's test datasets, reproducible with the README commands. Real-world shortlisting time savings were not measured, so they are not claimed.",
    },

    screenshots: [
      { file: "recruitment-ranking.png", caption: "Shortlist for a role, with the measured cut-off — the line marks, it does not reject" },
      { file: "recruitment-weights.png", caption: "Lowering the weight of skills crosses the legal threshold — without touching location" },
      { file: "recruitment-threshold.png", caption: "Where to cut: every threshold, what it keeps and above all what it wrongly drops" },
      { file: "recruitment-redirect.png", caption: "Below the bar here, above it elsewhere: the role is flagged, the application never moved" },
      { file: "recruitment-agreement.png", caption: "Raw agreement 0.67, kappa 0.25: the percentage would have suggested a consensus" },
      { file: "recruitment-arabic.png", caption: "Arabic CV generated to measure extraction: 2 fields of 8 without normalisation, 7 with" },
      { file: "recruitment-counterfactual.png", caption: "What is missing to reach the threshold, measured by replaying the engine" },
      { file: "recruitment-duplicates.png", caption: "Two records for one person — proposed for merging, never merged automatically" },
      { file: "recruitment-search.png", caption: "BM25 search across profile text: no model call, reproducible result" },
      { file: "recruitment-pdf.png", caption: "Evaluation report as PDF, dated and versioned — generated with no added dependency" },
      { file: "recruitment-api.png", caption: "The API enforces blind screening: the name is masked, direct identifiers removed" },
      { file: "recruitment-application.png", caption: "Score broken down per criterion, applied weights and matching method" },
      { file: "recruitment-comparison.png", caption: "Comparison: what actually separates four candidates, skill by skill" },
      { file: "recruitment-assistant.png", caption: "Assistant: the question becomes criteria, code filters, the model writes" },
      { file: "recruitment-assistant-bias.png", caption: "An age criterion slipped into the question is dropped, flagged and logged" },
      { file: "recruitment-candidate.png", caption: "Profile extracted from the CV: every field cites the passage backing it" },
      { file: "recruitment-bias.png", caption: "Counterfactual bias audit: measured effect of each identity attribute" },
      { file: "recruitment-questions.png", caption: "Interview questions anchored in a specific claim from the profile" },
      { file: "recruitment-decision.png", caption: "Rejecting a candidate requires a written reason; the log keeps every decision" },
      { file: "recruitment-roles.png", caption: "A read-only account is refused any action, and the refusal is logged" },
      { file: "recruitment-retention.png", caption: "GDPR retention: a deadline per file, daily cascading purge" },
      { file: "recruitment-dashboard.png", caption: "Dashboard: three gauges up top, then skills, seniority and score distribution" },
    ],
    repoUrl: "https://github.com/baDrsh531/ai-recruitment-assistant",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
