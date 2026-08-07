import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { matchiqProject } from "./matchiqProject.js";
import { lighthouseProject } from "./lighthouseProject.js";
import { recruitmentProject } from "./recruitmentProject.js";
import { crewProject } from "./crewProject.js";
import { STRINGS, SKILLS } from "./i18n.js";

/**
 * Coque du portfolio, bilingue (FR / EN).
 * Le texte vient de i18n.js ; les projets de matchiqProject.js et
 * lighthouseProject.js (bilingues). ProjectCard.jsx n'est jamais modifié :
 * on lui passe les données via la prop `data`.
 */

// ─── IDENTITÉ & LIENS (indépendants de la langue) ───────────────────────────
const OWNER = {
  name: "Badr Sahraoui",
  links: {
    github: "https://github.com/baDrsh531",
    linkedin: "https://www.linkedin.com/in/badr-sahraoui-2b90a6239",
    email: "sahraoui.badr9@gmail.com",
    phone: "0700581336",
  },
};

// Langue initiale : préférence sauvegardée, sinon langue du navigateur, sinon FR.
function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch (_) { /* localStorage indisponible */ }
  if (typeof navigator !== "undefined" && navigator.language &&
      navigator.language.toLowerCase().startsWith("en")) {
    return "en";
  }
  return "fr";
}

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
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z" strokeLinejoin="round" />
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
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (_) { /* ignore */ }
    document.title = STRINGS[lang].metaTitle;
  }, [lang]);

  const t = STRINGS[lang];
  const skills = SKILLS[lang];
  const { links } = OWNER;
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip-link" href="#projets">{lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>

      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            {OWNER.name}<span className="nav-brand-dot">.</span>
          </a>
          <div className="nav-right">
            <nav className="nav-links" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
              <a href="#projets">{t.nav.projects}</a>
              <a href="#competences">{t.nav.skills}</a>
              <a href="#apropos">{t.nav.about}</a>
              <a href="#contact">{t.nav.contact}</a>
            </nav>
            <div className="lang-switch" role="group" aria-label={lang === "fr" ? "Choix de la langue" : "Language"}>
              <button type="button" className={lang === "fr" ? "active" : ""} aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
              <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
        </div>
      </header>

      <main className="site" id="top">
        {/* ── HERO ── */}
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero-role">{t.hero.role}</p>
          <h1 className="hero-title" id="hero-title">{t.hero.headline}</h1>
          <p className="hero-keywords">
            {t.hero.keywords.map((k, i) => (
              <span key={k}>
                {i > 0 && <span className="dot" aria-hidden="true"> • </span>}
                {k}
              </span>
            ))}
          </p>
          <p className="hero-intro">{t.hero.intro}</p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projets">
              {t.hero.ctaProjects} <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#contact">{t.hero.ctaContact}</a>
          </div>

          <nav className="hero-social" aria-label={lang === "fr" ? "Réseaux" : "Social"}>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /> LinkedIn</a>
            <a href={`mailto:${links.email}`} aria-label="Email"><MailIcon /> Email</a>
            <a href={`tel:${links.phone}`} aria-label={t.contact.phoneLabel}><PhoneIcon /> {t.contact.phoneLabel}</a>
          </nav>
        </section>

        {/* ── PROJETS IA ── */}
        <section className="section" id="projets" aria-labelledby="projets-h">
          <div className="section-head">
            <p className="section-kicker">{t.projects.kicker}</p>
            <h2 className="section-title" id="projets-h">{t.projects.title}</h2>
            <p className="section-sub">{t.projects.sub}</p>
          </div>
          <div className="projects">
            <ProjectCard data={recruitmentProject[lang]} />
            <ProjectCard data={matchiqProject[lang]} />
            <ProjectCard data={lighthouseProject[lang]} />
            <ProjectCard data={crewProject[lang]} />
          </div>
        </section>

        {/* ── COMPÉTENCES ── */}
        <section className="section" id="competences" aria-labelledby="competences-h">
          <div className="section-head">
            <p className="section-kicker">{t.skills.kicker}</p>
            <h2 className="section-title" id="competences-h">{t.skills.title}</h2>
            <p className="section-sub">{t.skills.sub}</p>
          </div>
          <div className="skills">
            {skills.map((cat) => (
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
            <p className="section-kicker">{t.about.kicker}</p>
            <h2 className="section-title" id="apropos-h">{t.about.title}</h2>
          </div>
          <div className="about">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section" id="contact" aria-labelledby="contact-h">
          <div className="section-head">
            <p className="section-kicker">{t.contact.kicker}</p>
            <h2 className="section-title" id="contact-h">{t.contact.title}</h2>
            <p className="section-sub">{t.contact.sub}</p>
          </div>
          <div className="contact-links">
            <a className="contact-card" href={links.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> <span>GitHub</span><span className="contact-meta">@baDrsh531</span>
            </a>
            <a className="contact-card" href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> <span>LinkedIn</span><span className="contact-meta">{t.contact.linkedinMeta}</span>
            </a>
            <a className="contact-card" href={`mailto:${links.email}`}>
              <MailIcon /> <span>{t.contact.emailLabel}</span><span className="contact-meta">{links.email}</span>
            </a>
            <a className="contact-card" href={`tel:${links.phone}`}>
              <PhoneIcon /> <span>{t.contact.phoneLabel}</span><span className="contact-meta">{links.phone}</span>
            </a>
          </div>
        </section>

        <footer className="site-foot">
          <span>© {year} {OWNER.name}</span>
          <span>{t.footer}</span>
        </footer>
      </main>
    </>
  );
}
