// ===== Project data =====
// Add or edit projects here. The first 4 are shown on the home page;
// "view --all-projects" is meant to link through to a full projects page.
const projects = [
  {
    name: "Auth vault",
    description: "Session-based login system with Google OAuth, password hashing and SQLite storage.",
    type: "web",
    tech: ["node.js", "express", "passport.js"],
    github: "#",
    live: "#"
  },

  {
    name: "Credentials authenication",
    description: "Session-based login system with credentials, password hashing and SQLite storage.",
    type: "web",
    tech: ["javascript","node.js","express"],
    github: "https://github.com/Paterne10/Login-authentication",
    live: "#"
  },
  {
    name: "Suggest acitivies",
    description: "Suggests activities to do based on type and group size, built collaboratively front to back.",
    type: "web",
    tech: ["javascript", "html/css"],
    github: "#",
    live: "#"
  },
  {
    name: "Phishing triage playbook",
    description: "SOC-style incident response runbook for identifying and containing phishing reports.",
    type: "security",
    tech: ["soc", "incident response"],
    github: "#",
    live: "#"
  },
  {
    name: "Log analyzer",
    description: "Parses SIEM-style logs to flag suspicious auth attempts and traffic patterns.",
    type: "security",
    tech: ["python", "siem"],
    github: "#",
    live: "#"
  }
];

const FEATURED_COUNT = 4;

// ===== Render project cards =====
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return; // page has no project grid (e.g. About page)

  const countTag = document.getElementById("countTag");
  const featured = projects.slice(0, FEATURED_COUNT);

  grid.innerHTML = featured.map(buildCardHTML).join("");
  if (countTag) {
    countTag.textContent = `showing ${String(featured.length).padStart(2, "0")} of ${String(projects.length).padStart(2, "0")}`;
  }
}

function buildCardHTML(project) {
  const isWeb = project.type === "web";
  const tagClass = isWeb ? "tag-web" : "tag-sec";
  const tagLabel = isWeb ? "WEB" : "SEC";
  const typeIcon = isWeb ? "ti-code" : "ti-shield-lock";
  const liveClass = isWeb ? "live-web" : "live-sec";

  const techHTML = project.tech
    .map((t) => `<span class="tech-pill">${escapeHTML(t)}</span>`)
    .join("");

  return `
    <div class="project-card">
      <div class="card-top">
        <span class="tag ${tagClass}">${tagLabel}</span>
        <i class="ti ${typeIcon}" aria-hidden="true"></i>
      </div>
      <h3>${escapeHTML(project.name)}</h3>
      <p class="desc">${escapeHTML(project.description)}</p>
      <div class="tech-list">${techHTML}</div>
      <div class="card-actions">
        <a class="card-btn" href="${project.github}" target="_blank" rel="noopener">
          <i class="ti ti-brand-github" aria-hidden="true"></i>Code
        </a>
        <a class="card-btn ${liveClass}" href="${project.live}" target="_blank" rel="noopener">
          <i class="ti ti-external-link" aria-hidden="true"></i>Live
        </a>
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
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
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ===== "View all projects" button =====
function initShowAllButton() {
  const btn = document.getElementById("showAllBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    // Point this at your full projects page once it exists,
    // e.g. window.location.href = "projects.html";
    window.location.href = "projects.html";
  });
}

// ===== Terminal typing animation =====
function initTerminalAnimation() {
  const lines = [
    { prompt: "whoami", output: "paterne — full-stack developer & SOC analyst (L1)" },
    { prompt: "cat mission.txt", output: "building secure, modern web apps while training to defend them" }
  ];

  const body = document.getElementById("terminalBody");
  if (!body) return; // page has no hero terminal (e.g. About page)

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lineIndex = 0;

  if (reducedMotion) {
    body.innerHTML = lines
      .map((l) => `<div class="prompt">$ ${l.prompt}</div><div class="output">${l.output}</div>`)
      .join("");
    return;
  }

  function typeLine() {
    const entry = lines[lineIndex % lines.length];

    const promptEl = document.createElement("div");
    promptEl.className = "prompt";
    promptEl.textContent = `$ ${entry.prompt}`;

    const outputEl = document.createElement("div");
    outputEl.className = "output";

    const cursorEl = document.createElement("span");
    cursorEl.className = "type-cursor";
    cursorEl.textContent = "_";

    body.innerHTML = "";
    body.appendChild(promptEl);
    body.appendChild(outputEl);

    let charIndex = 0;
    (function step() {
      if (charIndex <= entry.output.length) {
        outputEl.textContent = entry.output.slice(0, charIndex);
        outputEl.appendChild(cursorEl);
        charIndex++;
        setTimeout(step, 22);
      } else {
        setTimeout(() => {
          lineIndex++;
          typeLine();
        }, 2200);
      }
    })();
  }

  typeLine();
}

// ===== Skills data (About page) =====
// Edit categories/items here — the directory-style path is just a label.
const skillCategories = [
  { path: "~/languages/frontend", icon: "ti-folder", iconClass: "icon-accent", items: ["JavaScript", "TypeScript"] },
  { path: "~/languages/backend", icon: "ti-folder", iconClass: "icon-accent", items: ["Python"] },
  { path: "~/frameworks/frontend", icon: "ti-folder", iconClass: "icon-accent", items: ["React", "Tailwind CSS", "Bootstrap"] },
  { path: "~/frameworks/backend", icon: "ti-folder", iconClass: "icon-accent", items: ["Django", "Flask", "Express"] },
  { path: "~/environment", icon: "ti-folder", iconClass: "icon-secure", items: ["Linux", "Windows", "Node"] }
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
    <div class="skill-card">
      <div class="skill-card-head">
        <i class="ti ${category.icon} ${category.iconClass}" aria-hidden="true"></i>
        <span class="skill-path">${escapeHTML(category.path)}</span>
      </div>
      <div class="skill-pills">${pillsHTML}</div>
    </div>
  `;
}

// ===== Experience data (About page) =====
// Add "add dates" placeholders with real dates once you have them.
const experience = [
  {
    period: "add dates · Unisysteme",
    role: "Web developer &amp; UX design intern",
    description: "Contributed to front-end and back-end features while shaping the UX for internal tools, working across the full product cycle from wireframe to shipped screen.",
    tags: ["web dev", "ux design"]
  },
  {
    period: "add dates · BIS",
    role: "UX designer &amp; Word/Excel trainer",
    description: "Designed interfaces for internal tools and ran training sessions on Word and Excel, translating technical workflows into material non-technical staff could pick up quickly.",
    tags: ["ux design", "training"]
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

  return `
    <div class="tl-item">
      <span class="tl-dot"></span>
      <div class="tl-meta">${escapeHTML(entry.period)}</div>
      <h3>${entry.role}</h3>
      <p class="tl-desc">${entry.description}</p>
      <div class="tl-tags">${tagsHTML}</div>
    </div>
  `;
}

// ===== Footer year =====
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  renderExperience();
  initMobileNav();
  initDropdown();
  initShowAllButton();
  initTerminalAnimation();
  setFooterYear();
});
