// ===== Images (themed, hotlinked from Picsum — stable, no API key needed) =====
// Each card gets a real photo tinted with its category color via CSS overlay.
// Swap any seed URL below for your own photo/screenshot whenever you like.
const heroImage = "https://picsum.photos/seed/paterne-hero/1600/900";

// ===== Project data =====
const webProjects = [
  {
    name: "Suivi de dépenses",
    description: "Suivi de dépenses personnelles avec formatage en FCFA et une jauge SVG personnalisée.",
    tone: "web",
    icon: "ti-wallet",
    tech: ["javascript", "css"],
    github: "https://github.com/Paterne10/Expense-Tracker",
    live: "https://expense-tracker-two-sepia-70.vercel.app/"
  },
  {
    name: "QCM",
    description: "Quiz à choix multiples avec correction en temps réel et retour instantané.",
    tone: "web",
    icon: "ti-list-check",
    tech: ["javascript", "html/css"],
    github: "#",
    live: "#"
  },
  {
    name: "Générateur de mot de passe",
    description: "Génère des mots de passe robustes et personnalisables selon plusieurs critères.",
    tone: "web",
    icon: "ti-key",
    tech: ["javascript"],
    github: "#",
    live: "#"
  },
  {
    name: "Liste de tâches",
    description: "Liste de tâches simple et claire pour s'organiser au quotidien.",
    tone: "web",
    icon: "ti-checklist",
    tech: ["javascript", "css"],
    github: "#",
    live: "#"
  },
  {
    name: "Cartes tarifaires",
    description: "Section tarifaire responsive avec plusieurs formules mises en avant.",
    tone: "web",
    icon: "ti-tag",
    tech: ["html", "css"],
    github: "#",
    live: "#"
  }
];

const clientProjects = [
  {
    name: "Site d'avocat",
    description: "Site professionnel conçu pour un avocat d'affaires basé à Libreville.",
    tone: "client",
    icon: "ti-scale",
    tech: ["html", "css", "javascript"],
    github: "#",
    live: "#"
  },
  {
    name: "Alaina Faith Foundation",
    description: "Site conçu et développé de bout en bout pour la fondation.",
    tone: "client",
    icon: "ti-heart-handshake",
    tech: ["html", "css", "javascript"],
    github: "#",
    live: "#"
  }
];

const securityProjects = [
  {
    name: "Guide de tri du phishing",
    description: "Procédure de réponse aux incidents de type SOC pour identifier et contenir les signalements de phishing.",
    tone: "security",
    icon: "ti-mail-exclamation",
    tech: ["soc", "réponse à incident"],
    github: "#",
    live: "#"
  },
  {
    name: "Analyseur de logs",
    description: "Analyse des journaux de type SIEM pour détecter les tentatives de connexion suspectes.",
    tone: "security",
    icon: "ti-file-analytics",
    tech: ["python", "siem"],
    github: "#",
    live: "#"
  },
  {
    name: "Cartographie du contrôle d'accès",
    description: "Schéma illustré comparant les modèles MAC, DAC, RBAC, RuBAC et ABAC.",
    tone: "security",
    icon: "ti-lock-access",
    tech: ["iam"],
    github: "#",
    live: "#"
  }
];

const FEATURED_COUNT = 4;

// ===== Card rendering =====
function buildCardHTML(project) {
  const toneClass = "tag-" + project.tone;
  const toneLabel = project.tone === "web" ? "Dév web" : project.tone === "client" ? "Client" : "Sécurité";

  const techHTML = project.tech
    .map((t) => `<span class="tech-pill">${escapeHTML(t)}</span>`)
    .join("");

  return `
    <div class="project-card reveal">
      <div class="card-media" data-tone="${project.tone}">
        <i class="ti ${project.icon} card-media-icon" aria-hidden="true"></i>
      </div>
      <div class="card-body">
        <span class="tag ${toneClass}">${toneLabel}</span>
        <h3>${escapeHTML(project.name)}</h3>
        <p class="desc">${escapeHTML(project.description)}</p>
        <div class="tech-list">${techHTML}</div>
        <div class="card-actions">
          <a class="card-btn code-btn" href="${project.github}" target="_blank" rel="noopener">Code</a>
          <a class="card-btn live-btn" href="${project.live}" target="_blank" rel="noopener">Démo</a>
        </div>
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===== Home page: featured cards =====
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  const countTag = document.getElementById("countTag");
  const total = webProjects.length + clientProjects.length + securityProjects.length;
  const featured = [...webProjects.slice(0, 2), ...clientProjects.slice(0, 2)];

  grid.innerHTML = featured.map(buildCardHTML).join("");
  if (countTag) {
    countTag.textContent = `${featured.length} sur ${total} affichés`;
  }
}

// ===== Projects page: full sections =====
function renderProjectCategories() {
  const webGrid = document.getElementById("webGrid");
  const clientGrid = document.getElementById("clientGrid");
  const securityGrid = document.getElementById("securityGrid");
  if (!webGrid && !clientGrid && !securityGrid) return;

  if (webGrid) {
    webGrid.innerHTML = webProjects.map(buildCardHTML).join("");
    document.getElementById("webCount").textContent = String(webProjects.length).padStart(2, "0");
  }
  if (clientGrid) {
    clientGrid.innerHTML = clientProjects.map(buildCardHTML).join("");
    document.getElementById("clientCount").textContent = String(clientProjects.length).padStart(2, "0");
  }
  if (securityGrid) {
    securityGrid.innerHTML = securityProjects.map(buildCardHTML).join("");
    document.getElementById("securityCount").textContent = String(securityProjects.length).padStart(2, "0");
  }
}

// ===== Filter tabs (projects page) =====
function initFilterTabs() {
  const row = document.getElementById("filterRow");
  if (!row) return;

  const buttons = row.querySelectorAll(".filter-btn");
  const categories = document.querySelectorAll(".project-category");

  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    categories.forEach((section) => {
      const matches = filter === "all" || section.dataset.category === filter;
      section.classList.toggle("hidden", !matches);
    });
  });
}

// ===== Hero photo (home, about, contact) =====
function renderHeroPhoto() {
  document.querySelectorAll(".hero-photo-img").forEach((img) => {
    img.src = heroImage;
  });
}

// ===== Skills data (about page) =====
const skillCategories = [
  { path: "Langages frontend", icon: "ti-code", items: ["JavaScript", "TypeScript"] },
  { path: "Langages backend", icon: "ti-code", items: ["Python"] },
  { path: "Frameworks frontend", icon: "ti-stack-2", items: ["React", "Tailwind CSS", "Bootstrap"] },
  { path: "Frameworks backend", icon: "ti-stack-2", items: ["Django", "Flask", "Express"] },
  { path: "Environnement", icon: "ti-terminal-2", items: ["Linux", "Windows", "Node"] }
];

function renderSkills() {
  const grid = document.getElementById("skillGrid");
  if (!grid) return;
  grid.innerHTML = skillCategories.map(buildSkillCardHTML).join("");
}

function buildSkillCardHTML(category) {
  const pillsHTML = category.items
    .map((item) => `<span class="skill-pill">${escapeHTML(item)}</span>`)
    .join("");

  return `
    <div class="skill-card reveal">
      <div class="skill-card-head">
        <i class="ti ${category.icon}" aria-hidden="true" style="color: var(--accent);"></i>
        <span class="skill-path">${escapeHTML(category.path)}</span>
      </div>
      <div class="skill-pills">${pillsHTML}</div>
    </div>
  `;
}

// ===== Experience data (about page) =====
// Add real dates for the ones marked "à ajouter" once you have them.
const experience = [
  {
    period: "Juillet 2026 — aujourd'hui · Freelance",
    role: "Développeur freelance",
    description: "Conçoit et développe des sites et applications sur mesure pour des clients indépendants, de la maquette à la mise en ligne.",
    tags: ["freelance", "développement web"],
    current: true
  },
  {
    period: "Mai — juillet 2026 · BIS",
    role: "Designer UX &amp; formateur Word/Excel",
    description: "A conçu des interfaces pour des outils internes et animé des sessions de formation sur Word et Excel.",
    tags: ["design UX", "formation"],
    current: false
  },
  {
    period: "Décembre 2025 — mars 2026 · Unisystème",
    role: "Développeur web &amp; stagiaire design UX",
    description: "A contribué aux fonctionnalités front-end et back-end tout en façonnant l'UX des outils internes, du wireframe à l'écran livré.",
    tags: ["développement web", "design UX"],
    current: false
  }
];

function renderExperience() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  const line = `<div class="timeline-line"></div>`;
  const items = experience.map(buildTimelineItemHTML).join("");
  timeline.innerHTML = line + items;
}

function buildTimelineItemHTML(entry) {
  const tagsHTML = entry.tags
    .map((t) => `<span class="tl-tag">${escapeHTML(t)}</span>`)
    .join("");
  const currentBadge = entry.current ? `<span class="tl-current-badge">En cours</span>` : "";
  const itemClass = entry.current ? "tl-item current reveal" : "tl-item reveal";

  return `
    <div class="${itemClass}">
      <span class="tl-dot"></span>
      <div class="tl-meta">${escapeHTML(entry.period)}${currentBadge}</div>
      <h3>${entry.role}</h3>
      <p class="tl-desc">${entry.description}</p>
      <div class="tl-tags">${tagsHTML}</div>
    </div>
  `;
}

// ===== Mobile nav toggle =====
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ===== Projects dropdown =====
function initDropdown() {
  const trigger = document.getElementById("projectsTrigger");
  const menu = document.getElementById("projectsMenu");
  if (!trigger || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ===== "Voir tous les projets" button =====
function initShowAllButton() {
  const btn = document.getElementById("showAllBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.location.href = "projects.html";
  });
}

// ===== Contact form (static — no backend wired up yet) =====
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // No backend is connected yet. Wire this up to a service like Formspree,
    // or replace with a mailto: link, once you're ready to receive messages.
    const note = document.getElementById("formNote");
    if (note) note.textContent = "Le formulaire n'est pas encore connecté à un service d'envoi — branchez-le avant la mise en ligne.";
  });
}

// ===== Reveal-on-scroll =====
function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

// ===== Footer year =====
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderHeroPhoto();
  renderProjects();
  renderProjectCategories();
  renderSkills();
  renderExperience();
  initMobileNav();
  initDropdown();
  initShowAllButton();
  initFilterTabs();
  initContactForm();
  setFooterYear();
  initRevealAnimations();
});
