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
      { value: "892", label: "tests automatisés", detail: "84 % de couverture, exécutés en intégration continue" },
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
        { label: "Un agent qui ne peut pas decider", detail: "L'agent prepare un dossier, redige l'analyse et propose une suite ; il ne fait avancer aucune candidature. La limite n'est pas une consigne dans un prompt mais une propriete du compte : son role est absent de la liste des comptes habilites, et un appel direct a la fonction de decision serait refuse puis journalise. Le compte est cree inactif, sans mot de passe utilisable." },
        { label: "Trente-cinq decisions avant qu'une alerte veuille dire quelque chose", detail: "Mesurer la part des propositions qu'un recruteur contredit demande de savoir quand se taire. L'alerte se declenche sur la borne haute de l'intervalle de Wilson, jamais sur le taux : sans aucune contradiction cette borne vaut z²/(n+z²), donc il faut trente-cinq decisions pour qu'elle passe sous 10 %. Le premier seuil essaye en demandait soixante-seize, soit une alerte qui ne tombe jamais." },
        { label: "Un retrait de consentement qui pouvait ne pas prendre effet", detail: "Deux enregistrements poses dans le meme tic d'horloge — environ 15 ms sous Windows — ne se departageaient pas, la cle primaire etant un UUID. Un retrait pose juste apres un accord pouvait donc rester sans effet, et le systeme aurait ecrit a quelqu'un qui venait de demander le contraire. A date egale, le refus l'emporte desormais. Un tirage de la suite en ordre aleatoire l'a revele, pas une relecture." },
        { label: "« Bonjour EL, »", detail: "La formule d'appel prenait le premier mot du nom, et « EL AMRANI Sara » recevait un courrier adresse a « EL ». Le probleme est general : rien dans la chaine ne dit si le nom de famille precede le prenom. Trois signaux permettent de conclure — casse mixte, mot unique, absence de particule — et hors de ces cas le module renonce et ecrit « Bonjour, ». Se tromper de prenom est pire que de ne pas en mettre." },
        { label: "Un objet de courriel precede d'une espace", detail: "Un objet contenant un seul caractere hors ASCII est encode selon la RFC 2047, et s'il est un peu long il est replie sur deux lignes : l'en-tete reste vide et certains clients affichent l'espace. Mesure : un objet ASCII de 84 caracteres ne se replie pas, un objet non-ASCII de 61 caracteres se replie. Un tiret cadratin coutait une espace parasite dans la boite de reception." },
        { label: "Un filtre qui rendait l'inverse de ce qu'il annoncait", detail: "Le journal d'audit se filtre par origine, machine ou humain. `exclude(metadata__agent=True)` ne rend pas les entrees humaines : sur une entree ou la cle est absente, la comparaison vaut NULL, sa negation vaut NULL, et la ligne disparait. Le filtre « humain seul » ne renvoyait rien." },
        { label: "Les echelles de mesure ne se retournent pas", detail: "Passer l'interface en arabe retourne la mise en page — vingt-six declarations directionnelles converties en proprietes logiques. Mais une jauge, un intervalle, un axe portent une grandeur de 0 a 100 % ecrite en chiffres occidentaux : les retourner ferait voir les memes donnees en miroir a deux lecteurs de la meme page. Le texte suit la langue, la geometrie qui porte un nombre reste stable." },
        { label: "Un ecran masque, un nom de fichier bavard", detail: "Le screening a l'aveugle masquait l'identite du candidat, et la page affichait « Prenom Nom.pdf » juste en dessous. La liste des depots faisait pire : nom et fichier, sans aucune gestion du mode aveugle. L'attenuation du biais etait annulee par une page en apparence anodine." },
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
        { label: "Un agent qui prepare, et qui ne decide pas", detail: "Score, analyse redigee, proposition de suite et questions d'entretien, sans qu'un humain clique sur chaque bouton. Verifie sur donnees reelles : deux recommandations produites, zero candidature avancee, zero decision en son nom. L'ordre des etapes porte une decision de cout — la recommandation passe avant les questions, pour ne pas preparer l'entretien d'un candidat qu'on propose d'ecarter : 2 287 tokens au lieu de 5 050." },
        { label: "La supervision mesuree, pas supposee", detail: "Qu'un agent ne puisse pas decider se demontre en lisant le code ; que la supervision soit effective se mesure. Le taux de contradiction : 27 % au total, mais 38 % sur les rejets proposes contre 15 % sur les mises en entretien. C'est la ventilation qui porte le resultat — la supervision se relache la ou elle engage le moins." },
        { label: "Le silence compte, lui aussi", detail: "La plainte la plus repandue sur le recrutement n'est pas le refus, c'est l'absence de reponse. Deux silences distincts : un dossier ecarte dont le motif est ecrit et jamais parti, et un dossier ouvert depuis plus de trois semaines sans un seul message. Un appel telephonique consigne compte comme une reponse ; un accuse de reception envoye avant la decision ne compte pas." },
        { label: "La reproductibilite verifiee, plus seulement affirmee", detail: "Les decisions reellement tranchees sont recalculees avec le moteur d'aujourd'hui. Le vrai sujet n'est pas de recalculer mais d'attribuer l'ecart : un score qui bouge peut venir du moteur ou des donnees, et les dossiers modifies depuis sont comptes a part. Une divergence a version egale est un defaut, entre deux versions une evolution." },
        { label: "Le modele ne touche jamais le score", detail: "Trois analyses du meme dossier : score 0,8535 sur les trois, 60 % du vocabulaire qui change, 97 mots d'amplitude. Tous les pourcentages du texte sont confrontes au detail calcule — un chiffre invente serait la seule faute grave possible ici. Resultat honnete : sur ces tirages le modele n'en cite aucun, donc le controle passe sans avoir ete eprouve." },
        { label: "Un journal enfin consultable", detail: "Le journal d'audit existait depuis l'origine, immuable et complet, et aucune page ne l'affichait. Filtrable par action, auteur, objet, et par origine : machine ou humain. Cliquer sur un objet ramene tout ce qui lui est arrive — c'est ce qu'un auditeur reclame en premier, et ce qu'un candidat demande au titre de son droit d'acces." },
        { label: "Une interface qui se lit de droite a gauche", detail: "L'application lisait deja les CV en arabe ; son interface le parle maintenant. Les catalogues se compilent sans gettext — le format .mo est ecrit en Python pur, une trentaine de lignes — pour ne pas imposer une chaine d'outils C a qui clone le depot." },
        { label: "Des CV distincts au contenu commun", detail: "Different des doublons, qui cherchent une meme personne. Empreintes de huit mots, retrait de celles presentes dans plus de 30 % du corpus : sans ce filtre, deux CV sans rapport se rejoignent sur « experience professionnelle » et « permis B ». Le module signale, il n'accuse pas." },
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
      { file: "recruitment-application.png", caption: "Score détaillé par critère, poids appliqués et méthode de rapprochement" },
      { file: "recruitment-comparison.png", caption: "Comparaison : ce qui différencie vraiment quatre candidats, compétence par compétence" },
      { file: "recruitment-assistant-bias.png", caption: "Un critère d'âge glissé dans la question est écarté, signalé et journalisé" },
      { file: "recruitment-candidate.png", caption: "Profil extrait du CV : chaque donnée cite le passage qui la justifie" },
      { file: "recruitment-bias.png", caption: "Audit de biais par contrefactuels : effet mesuré de chaque attribut identitaire" },
      { file: "recruitment-decision.png", caption: "Écarter un candidat exige un motif écrit ; le journal conserve toutes les décisions" },
      { file: "recruitment-roles.png", caption: "Un compte en lecture seule est refusé sur toute action, et le refus est journalisé" },
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
      { value: "892", label: "automated tests", detail: "84% coverage, run in continuous integration" },
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
        { label: "An agent that cannot decide", detail: "The agent prepares a file, writes the analysis and proposes a next step; it moves no application forward. The limit is not an instruction in a prompt but a property of the account: its role is absent from the list of accounts allowed to decide, and a direct call to the decision function would be refused and logged. The account is created inactive, with an unusable password." },
        { label: "Thirty-five decisions before an alert means anything", detail: "Measuring how often a recruiter contradicts a proposal requires knowing when to stay silent. The alert fires on the upper bound of the Wilson interval, never on the rate: with no contradiction that bound equals z²/(n+z²), so thirty-five decisions are needed for it to drop below 10 %. The first threshold tried needed seventy-six — an alert that never fires." },
        { label: "A withdrawn consent that could fail to take effect", detail: "Two records written within the same clock tick — about 15 ms on Windows — could not be ordered, the primary key being a UUID. A withdrawal filed just after an agreement could therefore stay ineffective, and the system would have written to someone who had just asked for the opposite. On a tie, refusal now wins. A random-order run of the test suite revealed it, not a code review." },
        { label: "« Hello EL, »", detail: "The greeting took the first word of the name, and « EL AMRANI Sara » received a letter addressed to « EL ». The problem is general: nothing in the string says whether the family name comes first. Three signals allow a conclusion — mixed case, single word, no particle — and outside those the module gives up and writes « Hello, ». Getting a first name wrong is worse than omitting it." },
        { label: "An email subject preceded by a space", detail: "A subject holding a single non-ASCII character is encoded per RFC 2047, and if slightly long it folds onto two lines: the header stays empty and some clients show the space. Measured: an 84-character ASCII subject does not fold, a 61-character non-ASCII one does. An em dash cost a stray space in the inbox." },
        { label: "A filter returning the opposite of what it claimed", detail: "The audit trail filters by origin, machine or human. `exclude(metadata__agent=True)` does not return human entries: where the key is absent the comparison is NULL, its negation is NULL, and the row vanishes. The « human only » filter returned nothing." },
        { label: "Measurement scales do not flip", detail: "Switching the interface to Arabic flips the layout — twenty-six directional declarations converted to logical properties. But a gauge, an interval, an axis carry a quantity from 0 to 100 % written in Western digits: flipping them would show the same data mirrored to two readers of the same page. Text follows the language; geometry carrying a number stays put." },
        { label: "A masked screen, a talkative filename", detail: "Blind screening masked the candidate's identity, and the page displayed « First Last.pdf » right below it. The uploads list was worse: name and filename, with no handling of blind mode at all. Bias mitigation was undone by a seemingly harmless page." },
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
        { label: "An agent that prepares, and does not decide", detail: "Score, written analysis, proposed next step and interview questions, without a human clicking every button. Verified on real data: two recommendations produced, zero applications advanced, zero decisions in its name. The order of steps carries a cost decision — the recommendation comes before the questions, so as not to prepare an interview for a candidate it proposes to reject: 2,287 tokens instead of 5,050." },
        { label: "Supervision measured, not assumed", detail: "That an agent cannot decide is shown by reading the code; that supervision is effective is measured. The contradiction rate: 27 % overall, but 38 % on proposed rejections against 15 % on proposed interviews. The breakdown carries the result — supervision loosens exactly where it commits least." },
        { label: "Silence counts too", detail: "The most common complaint about recruitment is not rejection, it is silence. Two distinct kinds: a rejected file whose reason is written and never sent, and a file open for over three weeks without a single message. A logged phone call counts as an answer; an acknowledgement sent before the decision does not." },
        { label: "Reproducibility verified, not merely claimed", detail: "Decisions actually taken are recomputed with today's engine. The real subject is not recomputing but attributing the gap: a score that moves may come from the engine or from the data, and files changed since are counted apart. A divergence at equal engine version is a defect; between two versions it is an evolution." },
        { label: "The model never touches the score", detail: "Three analyses of the same file: score 0.8535 on all three, 60 % of the vocabulary changing, 97 words of amplitude. Every percentage in the text is checked against the computed detail — an invented figure would be the only serious fault possible here. Honest result: across these runs the model quotes none, so the check passes without having been exercised." },
        { label: "An audit trail you can finally read", detail: "The audit log existed from the start, immutable and complete, and no page displayed it. Filterable by action, author, object, and by origin: machine or human. Clicking an object returns everything that happened to it — the first thing an auditor asks for, and what a candidate requests under their right of access." },
        { label: "An interface that reads right to left", detail: "The application already read Arabic CVs; its interface now speaks it. Catalogues compile without gettext — the .mo format is written in pure Python, about thirty lines — so as not to impose a C toolchain on anyone cloning the repository." },
        { label: "Distinct CVs with shared content", detail: "Different from duplicates, which look for the same person. Eight-word fingerprints, with those present in more than 30 % of the corpus removed: without that filter, two unrelated CVs meet on « professional experience » and « driving licence ». The module flags, it does not accuse." },
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
      { file: "recruitment-application.png", caption: "Score broken down per criterion, applied weights and matching method" },
      { file: "recruitment-comparison.png", caption: "Comparison: what actually separates four candidates, skill by skill" },
      { file: "recruitment-assistant-bias.png", caption: "An age criterion slipped into the question is dropped, flagged and logged" },
      { file: "recruitment-candidate.png", caption: "Profile extracted from the CV: every field cites the passage backing it" },
      { file: "recruitment-bias.png", caption: "Counterfactual bias audit: measured effect of each identity attribute" },
      { file: "recruitment-decision.png", caption: "Rejecting a candidate requires a written reason; the log keeps every decision" },
      { file: "recruitment-roles.png", caption: "A read-only account is refused any action, and the refusal is logged" },
      { file: "recruitment-dashboard.png", caption: "Dashboard: three gauges up top, then skills, seniority and score distribution" },
    ],
    repoUrl: "https://github.com/baDrsh531/ai-recruitment-assistant",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
