// ─── DONNÉES DU PROJET : Agent Dev Crew (bilingue FR / EN) ──────────────────
// Passé à <ProjectCard data={...} /> dans App.jsx. Même schéma que l'objet
// `project` par défaut de ProjectCard.jsx — on ne touche pas au composant.
// Chiffres MESURÉS le 2026-08-07 : 279 tests, 87 % de couverture sur backend/app,
// 7 artefacts typés, 4 tâches de benchmark à tests cachés.
// Captures dans public/screenshots/ (préfixe crew-), prises sur 48 runs réels.

export const crewProject = {
  fr: {
    name: "Agent Dev Crew",
    eyebrow: "Projet personnel · Équipe logicielle simulée, mesurée",
    tagline:
      "Cinq agents se transmettent des documents typés sous un orchestrateur qui n'est pas une IA — et un banc d'essai à tests cachés dit si le résultat tient.",
    why:
      "Un agent de code qui discute avec lui-même produit une trace qu'on ne peut ni vérifier ni rejouer. Ici chaque relais est un document typé, validé par JSON Schema : le cadrage produit une spécification, l'architecte un plan, le développeur un jeu de modifications, la QA un verdict. L'orchestrateur qui enchaîne ces phases est une machine à états écrite en Python — aucun modèle ne décide de la suite, donc le déroulement est reproductible. Tout est écrit dans un journal d'événements SQLite avant d'être exécuté : on peut donc rembobiner un run seconde par seconde et voir l'état exact à l'instant où il a dérapé. Chaque run travaille dans son propre worktree git, ce qui permet de les faire tourner en parallèle et de tout jeter d'un clic. Et parce qu'une équipe qui écrit ses propres tests peut les écrire faibles, un banc d'essai copie des tests d'acceptation cachés après coup : l'équipe ne les voit jamais et ne peut pas s'y ajuster. C'est le pari inverse de Lighthouse Agents, plus bas dans cette page : là, un agent exécutif décompose la tâche et s'adapte à ce qu'il trouve ; ici, c'est du code qui enchaîne les phases. On perd en souplesse, on gagne un déroulement qui se répète — et qu'on peut donc mesurer.",
    stack: [
      "Python 3.11", "FastAPI", "SSE", "SQLite (event store)", "Pydantic",
      "pytest", "React 19", "TypeScript", "Vite",
      "llama.cpp", "Qwen3.6-35B-A3B", "Git worktrees",
    ],
    metrics: [
      { value: "279", label: "tests au vert", detail: "87 % de couverture sur backend/app" },
      { value: "7", label: "artefacts typés", detail: "chaque relais validé par JSON Schema avant d'être transmis" },
      { value: "48", label: "runs mesurés", detail: "sur 4 tâches dont les tests d'acceptation sont copiés après coup" },
    ],
    architecture: {
      title: "Architecture",
      diagram: `Demande en langage courant
  │
  ▼
┌── ORCHESTRATEUR ────────┐   machine à états en Python
│ INTAKE → ANALYZE →      │   aucun modèle ne choisit la phase suivante
│ DESIGN → IMPLEMENT →    │   plafonds fermes : tokens, horloge,
│ REVIEW ⇄ FIX → DOCUMENT │   appels d'outils, reprises QA
└───────────┬─────────────┘
            │  artefacts typés (JSON Schema)
            ▼
  Cadrage ─▶ Analyste ─▶ Architecte ─▶ Développeur ─▶ QA ─▶ Doc
            spec         plan          changeset      verdict
            │
            ▼
  Outils par rôle          l'analyste ne peut pas écrire ;
  (liste, pas consigne)    seul le développeur touche aux fichiers
            │
            ▼
  Worktree git par run     un checkout, une branche, annuler = supprimer
            │
            ▼
  Journal d'événements ──▶ SSE ──▶ Interface React
  SQLite, numéroté                 rejouable seconde par seconde`,
      note:
        "L'interface n'a pas d'état à elle : elle projette le journal d'événements. Le rejeu n'est donc pas une seconde implémentation — c'est la même projection sur une liste tronquée, et il ne peut rien montrer que la vue directe ne montrerait pas.",
    },
    challenges: {
      title: "Défis techniques",
      items: [
        {
          label: "Une optimisation plausible, livrée éteinte faute de preuve",
          detail:
            "Injecter une carte statique du dépôt dans chaque prompt devait épargner des appels d'exploration. Le total sur les quatre tâches est ressorti moins bon — mais sur un seul run par tâche, et la règle du banc d'essai est qu'un écart n'est réel que si les plages observées ne se recouvrent pas. Sans répétition il n'y a pas de plage, et le comparateur le dit lui-même : « indistinguable ». La conclusion n'est donc pas « la carte coûte plus cher » mais « rien ne montre qu'elle aide » — ce qui suffit à livrer l'option éteinte.",
        },
        {
          label: "La variance venait de moi, pas du modèle",
          detail:
            "Trois requêtes identiques renvoyaient trois plans différents : le décodage n'avait jamais été épinglé et le serveur appliquait ses propres réglages. À temperature=0 les sorties sont devenues identiques au bit près. Les mesures se font en glouton, la production garde l'échantillonnage recommandé.",
        },
        {
          label: "Deux serveurs censés être interchangeables ne l'étaient pas",
          detail:
            "Le contrôle écrit pour vérifier qu'un pool sert bien le même modèle a répondu non : un 35B d'un côté, un 8B de vision de l'autre. Répartir les runs entre les deux aurait fait passer les tours d'un même run d'un modèle à l'autre et invalidé toute comparaison.",
        },
        {
          label: "Ce qui n'était qu'en mémoire disparaissait au redémarrage",
          detail:
            "Le diff, puis les compteurs de budget, venaient du moteur vivant : après un redémarrage, un run de 400 000 tokens s'affichait à zéro et son diff renvoyait 404. Trouvé en regardant une capture d'écran où deux colonnes affichaient « — ». Tout est maintenant relu du journal et de git, qui survivent au processus.",
        },
        {
          label: "Un fichier créé n'apparaissait dans aucun diff",
          detail:
            "`git diff` ignore les fichiers non suivis : un run dont toute la contribution était de créer des fichiers montrait un diff vide. Reproduit en écrivant un fichier dans le checkout d'un run, puis corrigé sans toucher à l'index — muter l'index d'un run en cours depuis une requête de lecture aurait été pire que le bug.",
        },
      ],
    },
    impact: {
      title: "Ce que ça change",
      items: [
        {
          label: "Un échec devient une action",
          detail:
            "Quand un plafond mord, l'interface dit lequel, à quelle phase, ce qui avait déjà été produit, et propose de relancer avec la marge qui manquait. Une escalade est le mécanisme de sécurité qui fonctionne, pas une panne — elle est colorée en conséquence.",
        },
        {
          label: "Rien n'est approuvé à l'aveugle",
          detail:
            "Chaque action difficile à défaire s'arrête sur un panneau qui montre sa charge utile complète, jamais un résumé. Et un refus exige un motif : c'est la seule chose qui permet à l'agent de proposer autre chose plutôt que de réessayer à l'identique.",
        },
        {
          label: "Les chiffres portent leur échantillon",
          detail:
            "Le tableau de bord affiche « 72 % — 33 sur 46 runs jugés », et sous cinq runs il écrit lui-même que l'échantillon est trop petit pour conclure. Les comparaisons ne déclarent un écart réel que si les plages observées ne se recouvrent pas.",
        },
      ],
    },
    screenshots: [
      { file: "crew-accueil.png", caption: "48 runs réels : 72 % de réussite (33 sur 46 jugés), 308k tokens médians soit 77 % du plafond, et la phase où s'arrêtent ceux qui échouent" },
      { file: "crew-run-escalade.png", caption: "Run escaladé à 418k tokens sur un plafond de 400k, après 2 reprises de la QA — avec le bouton qui relance en élargissant le budget" },
      { file: "crew-couts.png", caption: "Consommation par agent : le développeur pèse 315 575 des 417 512 tokens, et le total correspond exactement au plafond annoncé" },
      { file: "crew-comparer.png", caption: "Deux runs de la même tâche comparés : −26 appels d'outils (−38 %) pour +4,6k tokens — l'écart est coloré selon le sens qui compte pour chaque mesure" },
    ],
    repoUrl: "https://github.com/baDrsh531/agent-dev-crew",
    demo: { status: "pending", label: "Démo : code prêt, déploiement en attente" },
  },

  en: {
    name: "Agent Dev Crew",
    eyebrow: "Personal project · A simulated software team, measured",
    tagline:
      "Five agents hand typed documents to one another under an orchestrator that is not an AI — and a hidden-test benchmark says whether the result holds up.",
    why:
      "A coding agent that talks to itself produces a trace you can neither check nor replay. Here every hand-off is a typed document validated by JSON Schema: intake produces a specification, the architect a plan, the developer a change set, QA a verdict. The orchestrator chaining those phases is a state machine written in Python — no model decides what comes next, so the sequence is reproducible. Everything is appended to a SQLite event log before it is acted on, so a run can be rewound second by second to the exact state it was in when it went wrong. Each run works in its own git worktree, which is what lets runs overlap and what makes discarding one a delete. And because a team that writes its own tests can write weak ones, a benchmark copies hidden acceptance tests in afterwards: the crew never sees them and cannot tune to them. This is the opposite bet from Lighthouse Agents, further down this page: there an executive agent breaks the task down and adapts to what it finds; here code drives the phases. You lose flexibility and gain a sequence that repeats — and can therefore be measured.",
    stack: [
      "Python 3.11", "FastAPI", "SSE", "SQLite (event store)", "Pydantic",
      "pytest", "React 19", "TypeScript", "Vite",
      "llama.cpp", "Qwen3.6-35B-A3B", "Git worktrees",
    ],
    metrics: [
      { value: "279", label: "passing tests", detail: "87% coverage over backend/app" },
      { value: "7", label: "typed artifacts", detail: "every hand-off schema-validated before it is passed on" },
      { value: "48", label: "measured runs", detail: "across 4 tasks whose acceptance tests are copied in afterwards" },
    ],
    architecture: {
      title: "Architecture",
      diagram: `Plain-language request
  │
  ▼
┌── ORCHESTRATOR ─────────┐   a state machine in Python
│ INTAKE → ANALYZE →      │   no model picks the next phase
│ DESIGN → IMPLEMENT →    │   hard ceilings: tokens, wall clock,
│ REVIEW ⇄ FIX → DOCUMENT │   tool calls, QA repair loops
└───────────┬─────────────┘
            │  typed artifacts (JSON Schema)
            ▼
  Intake ─▶ Analyst ─▶ Architect ─▶ Developer ─▶ QA ─▶ Docs
            spec       plan         changeset    verdict
            │
            ▼
  Per-role tools          the analyst cannot write;
  (a list, not a prompt)  only the developer touches files
            │
            ▼
  A git worktree per run  one checkout, one branch, undo = delete
            │
            ▼
  Event log ────────────▶ SSE ──▶ React interface
  SQLite, sequenced               replayable second by second`,
      note:
        "The interface holds no state of its own: it projects the event log. Replay is therefore not a second implementation — it is the same projection over a truncated list, and it cannot show anything the live view could not.",
    },
    challenges: {
      title: "Technical challenges",
      items: [
        {
          label: "A plausible optimisation, shipped switched off for want of evidence",
          detail:
            "Injecting a static map of the repository into every prompt was meant to save exploration calls. Summed over the four tasks it came out worse — but on one run per task, and the harness's rule is that a difference is real only when the observed ranges do not overlap. With no repetitions there are no ranges, and the comparator says so itself: indistinguishable. So the finding is not \"the map costs more\" but \"nothing shows it helps\" — which is reason enough to ship it switched off.",
        },
        {
          label: "The variance was mine, not the model's",
          detail:
            "Three identical requests returned three different plans: decoding had never been pinned and the server applied its own defaults. At temperature=0 the outputs became byte-identical. Measurements now run greedy; production keeps the model's recommended sampling.",
        },
        {
          label: "Two servers meant to be interchangeable were not",
          detail:
            "The check written to verify that a pool serves one model answered no: a 35B on one side, an 8B vision model on the other. Balancing runs across them would have moved a single run's turns between models and invalidated every comparison.",
        },
        {
          label: "Anything held only in memory vanished on restart",
          detail:
            "The diff, then the budget counters, came from the live engine: after a restart a 400,000-token run read as zero and its diff returned 404. Found by looking at a screenshot where two columns showed a dash. Both are now read back from the event log and from git, which outlive the process.",
        },
        {
          label: "A newly created file appeared in no diff at all",
          detail:
            "`git diff` ignores untracked files, so a run whose whole contribution was creating files showed an empty diff. Reproduced by writing a file into a run's checkout, then fixed without touching the index — mutating a live run's index from a read request would have been worse than the bug.",
        },
      ],
    },
    impact: {
      title: "What it changes",
      items: [
        {
          label: "A failure becomes the next action",
          detail:
            "When a ceiling bites, the interface says which one, at which phase, what had already been produced, and offers to relaunch with the room that was missing. An escalation is the safety mechanism working, not a crash — and it is coloured accordingly.",
        },
        {
          label: "Nothing is approved blind",
          detail:
            "Every hard-to-reverse action stops at a panel showing its full payload, never a summary. And a refusal requires a reason: it is the only thing that lets the agent try something different instead of retrying the same thing.",
        },
        {
          label: "Figures carry their sample",
          detail:
            "The dashboard reads \"72% — 33 of 46 judged runs\", and below five runs it says itself that the sample is too small to conclude from. Comparisons only call a difference real when the observed ranges do not overlap.",
        },
      ],
    },
    screenshots: [
      { file: "crew-accueil.png", caption: "48 real runs: 72% success (33 of 46 judged), 308k median tokens — 77% of the ceiling — and the phase where the failures stop" },
      { file: "crew-run-escalade.png", caption: "A run escalated at 418k tokens against a 400k ceiling, after 2 QA repair loops — with the button that relaunches it with more room" },
      { file: "crew-couts.png", caption: "Consumption per agent: the developer accounts for 315,575 of 417,512 tokens, and the total matches the ceiling message exactly" },
      { file: "crew-comparer.png", caption: "Two runs of the same task compared: −26 tool calls (−38%) for +4.6k tokens — each delta coloured by the direction that matters for that metric" },
    ],
    repoUrl: "https://github.com/baDrsh531/agent-dev-crew",
    demo: { status: "pending", label: "Demo: code ready, deployment pending" },
  },
};
