import ProjectCard from "./ProjectCard.jsx";
import { lighthouseProject } from "./lighthouseProject.js";

/**
 * Coque du portfolio : en-tête (identité + liens) puis la liste des projets.
 *
 * ┌─ POUR AJOUTER UN PROJET ─────────────────────────────────────────────────┐
 * │  1. Copie ProjectCard.jsx → ProjectCardATMView.jsx, adapte son objet      │
 * │     `project`.                                                             │
 * │  2. Importe-le ici et ajoute <ProjectCardATMView /> dans <main>.          │
 * └───────────────────────────────────────────────────────────────────────────┘
 */

// ─── IDENTITÉ ─── (édite librement ; ajoute LinkedIn quand tu veux le rendre public)
const OWNER = {
  name: "Badr Sahraoui",
  intro: "Je conçois des applications full-stack qui mêlent machine learning et LLM, du pipeline de données jusqu'à l'interface.",
  links: [
    { label: "GitHub", url: "https://github.com/baDrsh531" },
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/…" }, // ← décommente et complète
    // { label: "Email", url: "mailto:…" },
  ],
};

export default function App() {
  return (
    <div className="site">
      <header className="site-head">
        <p className="site-kicker">Portfolio</p>
        <h1 className="site-name">{OWNER.name}</h1>
        <p className="site-intro">{OWNER.intro}</p>
        <nav className="site-links" aria-label="Liens">
          {OWNER.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </nav>
      </header>

      <main className="site-projects">
        <ProjectCard />
        <ProjectCard data={lighthouseProject} />
        {/* Prochaines cartes de projet ici — une par projet. */}
      </main>

      <footer className="site-foot">
        © {new Date().getFullYear()} {OWNER.name} · Construit avec React &amp; Vite
      </footer>
    </div>
  );
}
