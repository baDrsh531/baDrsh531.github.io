/**
 * ProjectCard — carte de projet réutilisable pour le portfolio.
 *
 * Composant autonome : aucune dépendance hors React. Les styles sont injectés
 * via un <style> scopé sous la classe `.pc` — déplace ce bloc dans ta CSS
 * globale si tu affiches plusieurs cartes sur la même page (évite la
 * duplication du <style>).
 *
 * ┌─ POUR UN NOUVEAU PROJET (ATMView, orchestrateur d'agents, …) ────────────┐
 * │  Ne touche pas au composant : copie ce fichier, puis remplace UNIQUEMENT  │
 * │  l'objet `project` ci-dessous. Toute la présentation s'adapte au contenu. │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Thème : la carte est neutre par défaut. Pour l'accorder à ton thème global,
 * surcharge les variables CSS `--pc-*` définies en tête du bloc <style>
 * (couleur d'accent, fond, bordures…) depuis ta feuille de styles.
 */

// Images servies localement par le site (dossier public/screenshots). Pour
// réutiliser le composant hors de ce site, remplace par une URL absolue.
const RAW = "/screenshots";

// ─── DONNÉES DU PROJET ──────────────────────────────────────────────────────
// C'est le SEUL bloc à modifier d'un projet à l'autre.
const project = {
  name: "MatchIQ",
  eyebrow: "Projet personnel · Full-stack ML + LLM", // petite étiquette au-dessus du titre

  // Une phrase, orientée problème résolu (pas de jargon technique).
  tagline:
    "Transformer les statistiques brutes d'un match de football en un rapport clair, où chaque joueur reçoit une note expliquée.",

  // 2–3 phrases de contexte : le problème, puis l'approche (ML + LLM).
  why:
    "Les données d'un match de foot sont abondantes mais muettes : elles disent ce qui s'est passé, jamais pourquoi ça a compté. MatchIQ combine un moteur de scoring composite — qui pondère chaque statistique selon le poste du joueur — et une interprétation par LLM qui traduit ces notes en un rapport lisible : homme du match justifié, lecture tactique, forces et faiblesses. Un rapport qu'un supporter peut lire, appuyé sur des chiffres qu'un analyste accepterait.",

  // Badges de stack, dans l'ordre d'affichage.
  stack: ["Python", "FastAPI", "React", "SQLite", "Gemini API"],

  // Chiffres clés mis en avant (3 tuiles). value = grand chiffre, label = ligne
  // principale, detail = précision secondaire.
  metrics: [
    { value: "85", label: "tests automatisés", detail: "84 % de couverture" },
    { value: "−59 %", label: "taille du bundle initial", detail: "852 → 352 kB" },
    { value: "3 / 3", label: "checks CI au vert", detail: "backend · frontend · secrets" },
  ],

  // Galerie. Les URLs pointent sur les images brutes du dépôt GitHub (vérifiées
  // HTTP 200). Remplace `RAW` + les fichiers pour un autre projet.
  screenshots: [
    { file: "report.png", caption: "Rapport de match : homme du match calculé et formations" },
    { file: "ai_report.png", caption: "Interprétation rédigée par le LLM, ancrée dans les chiffres" },
    { file: "player.png", caption: "Score composite par joueur, détaillé en radar chart" },
    { file: "compare_teams.png", caption: "Comparateur d'équipes : bilan et meilleur joueur" },
    { file: "compare.png", caption: "Comparateur de joueurs : profils superposés" },
    { file: "dashboard.png", caption: "Accueil : historique des matchs analysés" },
  ],

  repoUrl: "https://github.com/baDrsh531/matchiq",

  // Démo live. Tant que le déploiement n'est pas fait, garde status: "pending"
  // → un badge « à venir » s'affiche au lieu d'un lien mort.
  // Une fois déployée : { status: "live", url: "https://…" }
  demo: { status: "pending", label: "Démo : code prêt, déploiement en attente" },
};

// ─── ICÔNES (SVG inline, aucune dépendance) ─────────────────────────────────
function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── COMPOSANT ──────────────────────────────────────────────────────────────
export default function ProjectCard({ data = project }) {
  return (
    <article className="pc">
      <style>{CSS}</style>

      <header className="pc-head">
        {data.eyebrow && <p className="pc-eyebrow">{data.eyebrow}</p>}
        <h2 className="pc-title">{data.name}</h2>
        <p className="pc-tagline">{data.tagline}</p>
      </header>

      <p className="pc-why">{data.why}</p>

      <ul className="pc-stack" aria-label="Technologies">
        {data.stack.map((tech) => (
          <li key={tech} className="pc-badge">{tech}</li>
        ))}
      </ul>

      <div className="pc-metrics">
        {data.metrics.map((m) => (
          <div key={m.label} className="pc-tile">
            <span className="pc-tile-value">{m.value}</span>
            <span className="pc-tile-label">{m.label}</span>
            <span className="pc-tile-detail">{m.detail}</span>
          </div>
        ))}
      </div>

      <div className="pc-gallery">
        {data.screenshots.map((s) => (
          <figure key={s.file} className="pc-shot">
            <img
              src={`${RAW}/${s.file}`}
              alt={s.caption}
              loading="lazy"
              width="1440"
              height="900"
            />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      <footer className="pc-actions">
        <a className="pc-btn pc-btn-primary" href={data.repoUrl} target="_blank" rel="noreferrer">
          <GitHubIcon />
          Code source
        </a>

        {data.demo.status === "live" ? (
          <a className="pc-btn pc-btn-ghost" href={data.demo.url} target="_blank" rel="noreferrer">
            Démo live
          </a>
        ) : (
          // Volontairement un <span>, pas un <a> : rien à cliquer tant que la démo n'existe pas.
          <span className="pc-demo-pending">
            <ClockIcon />
            {data.demo.label}
          </span>
        )}
      </footer>
    </article>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
// Palette professionnelle « Slate & Indigo ». Pour l'accorder à ton thème,
// surcharge les variables `--pc-*` depuis ta CSS globale. Les jetons d'accent
// sont DÉDOUBLÉS — `--pc-accent` pour le TEXTE (chiffres, étiquette), `--pc-btn*`
// pour le bouton PLEIN : un indigo lisible en texte serait illisible en fond de
// bouton, et le contraste s'inverse entre thème clair et sombre. Pour reteinter
// toute la carte, ne touche qu'à ces 3 lignes d'accent (et leurs équivalents
// dans le bloc sombre plus bas).
const CSS = `
.pc {
  --pc-bg: #ffffff;
  --pc-border: #e3e6eb;
  --pc-text: #171a1f;
  --pc-dim: #566173;
  --pc-faint: #8994a3;
  --pc-tile-bg: #f6f7f9;
  --pc-accent: #4338ca;          /* texte d'accent (contraste ~8:1 sur le fond) */
  --pc-btn-bg: #4338ca;          /* fond du bouton plein */
  --pc-on-accent: #ffffff;       /* texte sur le bouton plein */
  --pc-radius: 16px;
  --pc-shadow: 0 1px 2px rgba(16,18,23,.05), 0 10px 30px rgba(16,18,23,.07);

  box-sizing: border-box;
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 36px);
  background: var(--pc-bg);
  border: 1px solid var(--pc-border);
  border-radius: var(--pc-radius);
  box-shadow: var(--pc-shadow);
  color: var(--pc-text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.55;
}
.pc *, .pc *::before, .pc *::after { box-sizing: border-box; }

.pc-eyebrow {
  margin: 0 0 8px;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--pc-accent);
}
.pc-title {
  margin: 0;
  font-size: clamp(1.7rem, 3.5vw, 2.3rem);
  font-weight: 700;
  letter-spacing: -.02em;
}
.pc-tagline {
  margin: 8px 0 0;
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--pc-dim);
  max-width: 62ch;
}
.pc-why {
  margin: 22px 0 0;
  max-width: 68ch;
  color: var(--pc-text);
}

.pc-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}
.pc-badge {
  padding: 5px 12px;
  font-size: .82rem;
  font-weight: 500;
  color: var(--pc-dim);
  background: var(--pc-tile-bg);
  border: 1px solid var(--pc-border);
  border-radius: 999px;
}

.pc-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 26px 0 0;
}
.pc-tile {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 18px;
  background: var(--pc-tile-bg);
  border: 1px solid var(--pc-border);
  border-radius: 12px;
}
.pc-tile-value {
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -.02em;
  color: var(--pc-accent);
  font-variant-numeric: tabular-nums;
}
.pc-tile-label { font-size: .92rem; font-weight: 600; }
.pc-tile-detail { font-size: .82rem; color: var(--pc-faint); }

.pc-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 26px 0 0;
}
.pc-shot {
  margin: 0;
  border: 1px solid var(--pc-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--pc-tile-bg);
  transition: transform .18s ease, box-shadow .18s ease;
}
.pc-shot:hover { transform: translateY(-3px); box-shadow: var(--pc-shadow); }
.pc-shot img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
  border-bottom: 1px solid var(--pc-border);
}
.pc-shot figcaption {
  padding: 10px 12px;
  font-size: .8rem;
  color: var(--pc-dim);
}

.pc-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: 28px 0 0;
}
.pc-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: .92rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, opacity .15s ease;
}
.pc-btn-primary { background: var(--pc-btn-bg); color: var(--pc-on-accent); }
.pc-btn-primary:hover { opacity: .9; }
.pc-btn-ghost { background: transparent; color: var(--pc-text); border-color: var(--pc-border); }
.pc-btn-ghost:hover { border-color: var(--pc-accent); color: var(--pc-accent); }

.pc-demo-pending {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  font-size: .85rem;
  color: var(--pc-faint);
  border: 1px dashed var(--pc-border);   /* pointillés = état transitoire, pas cliquable */
  border-radius: 10px;
}

@media (max-width: 720px) {
  .pc-metrics { grid-template-columns: 1fr; }
  .pc-gallery { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 460px) {
  .pc-gallery { grid-template-columns: 1fr; }
}

/* Variante sombre automatique — évite une carte blanche sur un site sombre.
   Supprime ce bloc si tu pilotes le thème toi-même via les variables --pc-*. */
@media (prefers-color-scheme: dark) {
  .pc {
    --pc-bg: #0f1116;
    --pc-border: #272b34;
    --pc-text: #e9ebef;
    --pc-dim: #a3abb8;
    --pc-faint: #767f8d;
    --pc-tile-bg: #171a20;
    --pc-accent: #a5b4fc;        /* indigo clair : lisible sur fond sombre */
    --pc-btn-bg: #6366f1;        /* bouton plein saturé, texte blanc reste lisible */
    --pc-on-accent: #ffffff;
    --pc-shadow: 0 1px 2px rgba(0,0,0,.3), 0 10px 30px rgba(0,0,0,.4);
  }
}
`;
