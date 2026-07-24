import ProjectCard from "./ProjectCard.jsx";
import { lighthouseProject } from "./lighthouseProject.js";

/**
 * Coque du portfolio : nav + hero + projets + compétences + à propos + contact.
 *
 * ┌─ POUR AJOUTER UN PROJET ─────────────────────────────────────────────────┐
 * │  ProjectCard accepte une prop `data`. Crée un objet projet (voir          │
 * │  lighthouseProject.js) et rends <ProjectCard data={monProjet} /> dans la  │
 * │  section #projets. Ne modifie pas le composant lui-même.                  │
 * └───────────────────────────────────────────────────────────────────────────┘
 */

// ─── IDENTITÉ & LIENS ───────────────────────────────────────────────────────
// Remplis linkedin / email / cv quand tu as les valeurs : les boutons
// correspondants apparaissent automatiquement (rien de cassé s'ils sont vides).
const OWNER = {
  name: "Badr Sahraoui",
  role: "AI Software Engineer",
  // Positionnement lu en < 5 s. Une phrase, orientée « ce que je construis ».
  headline: "Je conçois et déploie des applications pilotées par des LLM — du modèle jusqu'au produit.",
  keywords: ["Python", "Django", "LLMs", "AI Agents", "Backend"],
  intro:
    "J'assemble des systèmes où l'IA fait un vrai travail : orchestration de plusieurs agents, modèles servis en local (OpenAI-compatible via vLLM / llama.cpp) et l'ingénierie backend Python qui les rend fiables — API, persistance, tests.",
  links: {
    github: "https://github.com/baDrsh531",
    linkedin: "", // ← ajoute l'URL de ton profil LinkedIn
    email: "",    // ← ajoute ton email pro (ex: "prenom.nom@domaine.com")
    cv: "/cv-badr-sahraoui.pdf", // ← dépose ce PDF dans public/ pour activer le bouton
  },
};

// ─── COMPÉTENCES (catégorisées) ─────────────────────────────────────────────
// Regroupées par domaine plutôt qu'en liste à plat. À jour de ce que couvrent
// réellement les projets + le socle Python/IA.
const SKILLS = [
  { group: "IA & LLM", items: ["LLM Engineering", "AI Agents", "Transformers", "Hugging Face", "vLLM · llama.cpp", "Ollama", "RAG & tool-calling", "Déploiement local de LLM"] },
  { group: "Backend", items: ["Python", "Django", "FastAPI", "Flask", "REST API", "Socket.IO · SSE", "JWT"] },
  { group: "Frontend", items: ["React", "Vite", "JavaScript", "HTML · CSS"] },
  { group: "Data & Bases de données", items: ["SQL", "SQLite", "Pandas", "NumPy"] },
  { group: "Cloud & Déploiement", items: ["Git · GitHub", "GitHub Actions (CI/CD)", "GitHub Pages", "Serveurs LLM OpenAI-compatible"] },
  { group: "Outils & Qualité", items: ["pytest", "VS Code Extension API", "Gemini API"] },
];

// ─── ICÔNES (SVG inline, aucune dépendance) ─────────────────────────────────
function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 12.5l8.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
      <path d="M14 3v5h5M12 12v5M9.5 14.5 12 17l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const { links } = OWNER;
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#projets">Aller au contenu</a>

      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            {OWNER.name}<span className="nav-brand-dot">.</span>
          </a>
          <nav className="nav-links" aria-label="Navigation principale">
            <a href="#projets">Projets</a>
            <a href="#competences">Compétences</a>
            <a href="#apropos">À propos</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="site" id="top">
        {/* ── HERO ── */}
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero-role">{OWNER.role}</p>
          <h1 className="hero-title" id="hero-title">{OWNER.headline}</h1>
          <p className="hero-keywords">
            {OWNER.keywords.map((k, i) => (
              <span key={k}>
                {i > 0 && <span className="dot" aria-hidden="true"> • </span>}
                {k}
              </span>
            ))}
          </p>
          <p className="hero-intro">{OWNER.intro}</p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projets">
              Voir les projets <ArrowIcon />
            </a>
            {links.cv && (
              <a className="btn btn-ghost" href={links.cv} download>
                <DocIcon /> Télécharger le CV
              </a>
            )}
          </div>

          <nav className="hero-social" aria-label="Réseaux">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /> GitHub</a>
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /> LinkedIn</a>
            )}
            {links.email && (
              <a href={`mailto:${links.email}`} aria-label="Email"><MailIcon /> Email</a>
            )}
          </nav>
        </section>

        {/* ── PROJETS ── */}
        <section className="section" id="projets" aria-labelledby="projets-h">
          <div className="section-head">
            <p className="section-kicker">01 — Sélection</p>
            <h2 className="section-title" id="projets-h">Projets</h2>
            <p className="section-sub">Deux systèmes complets, du backend au LLM — chiffres mesurés, code public.</p>
          </div>
          <div className="projects">
            <ProjectCard />
            <ProjectCard data={lighthouseProject} />
          </div>
        </section>

        {/* ── COMPÉTENCES ── */}
        <section className="section" id="competences" aria-labelledby="competences-h">
          <div className="section-head">
            <p className="section-kicker">02 — Stack</p>
            <h2 className="section-title" id="competences-h">Compétences</h2>
            <p className="section-sub">Organisées par domaine, de l'IA au déploiement.</p>
          </div>
          <div className="skills">
            {SKILLS.map((cat) => (
              <div className="skill-card" key={cat.group}>
                <h3 className="skill-group">{cat.group}</h3>
                <ul className="skill-list">
                  {cat.items.map((s) => (
                    <li key={s} className="skill-chip">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── À PROPOS ── */}
        <section className="section" id="apropos" aria-labelledby="apropos-h">
          <div className="section-head">
            <p className="section-kicker">03 — Profil</p>
            <h2 className="section-title" id="apropos-h">À propos</h2>
          </div>
          <div className="about">
            <p>
              Je construis des applications où l'IA fait un vrai travail, pas de la démo.
              Mon terrain : brancher des LLM sur des problèmes concrets — orchestrer
              plusieurs agents spécialisés, servir des modèles en local
              (OpenAI-compatible via vLLM / llama.cpp) et écrire le backend Python qui
              tient l'ensemble : API REST, persistance, suites de tests.
            </p>
            <p>
              Je travaille de bout en bout, du pipeline de données jusqu'à l'interface,
              avec des garde-fous — validation git de chaque changement, tests
              automatisés — parce qu'un système d'IA n'a de valeur que si on peut lui
              faire confiance. Les deux projets ci-dessus l'illustrent : un orchestrateur
              multi-agents qui délègue le code à des modèles locaux et le fait relire
              avant d'écrire, et un moteur d'analyse qui transforme des statistiques
              brutes en rapport lisible via un LLM.
            </p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section" id="contact" aria-labelledby="contact-h">
          <div className="section-head">
            <p className="section-kicker">04 — Contact</p>
            <h2 className="section-title" id="contact-h">Travaillons ensemble</h2>
            <p className="section-sub">Ouvert aux postes d'AI Software Engineer, LLM Engineer et Backend Python.</p>
          </div>
          <div className="contact-links">
            <a className="contact-card" href={links.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> <span>GitHub</span><span className="contact-meta">@baDrsh531</span>
            </a>
            {links.linkedin && (
              <a className="contact-card" href={links.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon /> <span>LinkedIn</span><span className="contact-meta">Profil</span>
              </a>
            )}
            {links.email && (
              <a className="contact-card" href={`mailto:${links.email}`}>
                <MailIcon /> <span>Email</span><span className="contact-meta">{links.email}</span>
              </a>
            )}
            {links.cv && (
              <a className="contact-card" href={links.cv} download>
                <DocIcon /> <span>CV</span><span className="contact-meta">PDF</span>
              </a>
            )}
          </div>
        </section>

        <footer className="site-foot">
          <span>© {year} {OWNER.name}</span>
          <span>Construit avec React &amp; Vite</span>
        </footer>
      </main>
    </>
  );
}
