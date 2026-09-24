const projects = [
  {
    name: "Christian Ash Portfolio",
    summary: "A responsive portfolio that combines clean code with a gaming-inspired visual identity.",
    problem: "I needed a professional place to present my development and design work.",
    solution: "I created a responsive, accessible portfolio with a distinctive interactive interface.",
    challenges: "Balancing motion, personality, accessibility, and readable content across screen sizes.",
    learned: "I strengthened my skills in interface planning, reusable JavaScript, and responsive CSS.",
    role: "Front-End Developer & Designer",
    year: "2026",
    status: "Prototype",
    outcome: "A focused portfolio experience that presents my work through an accessible gaming-inspired interface.",
    tools: ["HTML", "CSS", "JavaScript"],
    screenshots: [
      { src: "", label: "Home page" },
      { src: "", label: "Projects page" },
      { src: "", label: "About page" }
    ],
    demo: "",
    github: "https://github.com/christianA105"
  },
  {
    name: "Project Two",
    summary: "Your second finished project will appear here.",
    problem: "Project problem coming soon.",
    solution: "Project solution coming soon.",
    challenges: "Add the main challenge you solved while building this project.",
    learned: "Add the most important lesson or new skill from this project.",
    role: "Developer",
    year: "2026",
    status: "Coming Soon",
    outcome: "Add a measurable result or the main improvement this project created.",
    tools: ["HTML", "CSS"],
    screenshots: [
      { src: "", label: "Main screen" },
      { src: "", label: "Feature screen" }
    ],
    demo: "",
    github: ""
  },
  {
    name: "Project Three",
    summary: "Your third finished project will appear here.",
    problem: "Project problem coming soon.",
    solution: "Project solution coming soon.",
    challenges: "Add the main challenge you solved while building this project.",
    learned: "Add the most important lesson or new skill from this project.",
    role: "Developer",
    year: "2026",
    status: "Coming Soon",
    outcome: "Add a measurable result or the main improvement this project created.",
    tools: ["JavaScript"],
    screenshots: [{ src: "", label: "Main screen" }],
    demo: "",
    github: ""
  }
];

const fields = {
  deck: document.querySelector(".dualdeck"),
  number: document.querySelector("#project-number"), name: document.querySelector("#project-name"), summary: document.querySelector("#project-summary"),
  problem: document.querySelector("#project-problem"), solution: document.querySelector("#project-solution"), challenges: document.querySelector("#project-challenges"), learned: document.querySelector("#project-learned"), outcome: document.querySelector("#project-outcome"),
  role: document.querySelector("#project-role"), year: document.querySelector("#project-year"), statusText: document.querySelector("#project-status"), status: document.querySelector("#deck-status"),
  tools: document.querySelector("#project-tools"), image: document.querySelector("#project-image"), deckLogo: document.querySelector("#deck-logo"), screenshotLabel: document.querySelector("#screenshot-label"), screenshotDots: document.querySelector("#screenshot-dots"),
  detailNumber: document.querySelector("#detail-project-number"), detailName: document.querySelector("#detail-project-name"), detailSummary: document.querySelector("#detail-project-summary"),
  details: document.querySelector("#project-details"), homeMessage: document.querySelector("#deck-home-message"), cartridgePanel: document.querySelector(".cartridge-panel"),
  previousProject: document.querySelector("#previous-project"), nextProject: document.querySelector("#next-project"), previousScreenshot: document.querySelector("#previous-screenshot"), nextScreenshot: document.querySelector("#next-screenshot"),
  a: document.querySelector("#a-button"), b: document.querySelector("#b-button"), x: document.querySelector("#x-button"), y: document.querySelector("#y-button"), start: document.querySelector("#start-button"), select: document.querySelector("#select-button"),
  modal: document.querySelector("#screenshot-modal"), modalTitle: document.querySelector("#screenshot-modal-title"), fullscreenImage: document.querySelector("#fullscreen-image"), closeModal: document.querySelector("#close-screenshot")
};

const selectors = [...document.querySelectorAll("[data-project]")];
const savedState = readSavedState();
let activeProject = savedState.activeProject;
let activeScreenshot = savedState.activeScreenshot;
let deckMode = savedState.deckMode;
let lastDetailsScroll = savedState.detailsScroll;
let detailView = savedState.detailView;
let statusTimer;

function readSavedState() {
  const fallback = { activeProject: 0, activeScreenshot: 0, deckMode: "home", detailsScroll: 0, detailView: "overview" };
  try {
    const saved = JSON.parse(sessionStorage.getItem("caDeckState"));
    if (!saved) return fallback;
    return {
      activeProject: Number.isInteger(saved.activeProject) ? saved.activeProject : 0,
      activeScreenshot: Number.isInteger(saved.activeScreenshot) ? saved.activeScreenshot : 0,
      deckMode: ["home", "project"].includes(saved.deckMode) ? saved.deckMode : "home",
      detailsScroll: Number(saved.detailsScroll) || 0,
      detailView: ["overview", "case-study"].includes(saved.detailView) ? saved.detailView : "overview"
    };
  } catch { return fallback; }
}

function saveState() {
  sessionStorage.setItem("caDeckState", JSON.stringify({ activeProject, activeScreenshot, deckMode, detailsScroll: fields.details.scrollTop, detailView }));
}

function showDeckStatus(message) {
  clearTimeout(statusTimer);
  fields.status.textContent = message;
  fields.status.hidden = false;
  statusTimer = window.setTimeout(() => { fields.status.hidden = true; }, 1800);
}

function updateSelectorHighlight() {
  selectors.forEach((button, index) => {
    const selected = index === activeProject;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setScreenImage(screenshot, projectName, showLogo = false) {
  const hasImage = Boolean(screenshot?.src);
  fields.image.classList.toggle("has-image", hasImage);
  fields.image.style.backgroundImage = hasImage ? `url("${screenshot.src}")` : "";
  fields.deckLogo.hidden = !showLogo;
  fields.image.setAttribute("aria-label", hasImage ? `${projectName}: ${screenshot.label}` : "Project screenshot placement ready");
  return hasImage;
}

function renderScreenshotDots(screenshots) {
  fields.screenshotDots.hidden = false;
  fields.screenshotDots.replaceChildren(...screenshots.map((screenshot, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "screenshot-dot";
    dot.classList.toggle("active", index === activeScreenshot);
    dot.setAttribute("aria-label", `Show ${screenshot.label}`);
    dot.setAttribute("aria-current", index === activeScreenshot ? "true" : "false");
    dot.addEventListener("click", () => {
      activeScreenshot = index;
      renderProject();
    });
    return dot;
  }));
}

function renderHome() {
  fields.deck.dataset.deckMode = "home";
  fields.number.textContent = "CA DeckOS // Project Library";
  fields.name.textContent = "Select a project";
  fields.summary.textContent = "Use ↑ and ↓ to highlight a cartridge, then press A to open it.";
  fields.screenshotLabel.textContent = `Project ${String(activeProject + 1).padStart(2, "0")} selected`;
  setScreenImage(null, "", true);
  fields.screenshotDots.hidden = true;
  fields.homeMessage.innerHTML = `<strong>${projects[activeProject].name}</strong><span>Press A to open this project.</span>`;
  fields.homeMessage.hidden = false; fields.details.hidden = true;
  fields.status.hidden = true;
  fields.cartridgePanel.classList.remove("is-locked");
  selectors.forEach((button) => { button.disabled = false; });
  updateSelectorHighlight();
  saveState();
}

function renderProject() {
  const project = projects[activeProject];
  const screenshots = project.screenshots;
  activeScreenshot = Math.min(activeScreenshot, screenshots.length - 1);
  const screenshot = screenshots[activeScreenshot];
  const hasImage = setScreenImage(screenshot, project.name, false);
  fields.deck.dataset.deckMode = "project";
  fields.number.textContent = ""; fields.name.textContent = ""; fields.summary.textContent = "";
  fields.detailNumber.textContent = `Project ${String(activeProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  fields.detailName.textContent = project.name; fields.detailSummary.textContent = project.summary;
  fields.screenshotLabel.textContent = `${screenshot.label} · ${String(activeScreenshot + 1).padStart(2, "0")} / ${String(screenshots.length).padStart(2, "0")}`;
  renderScreenshotDots(screenshots);
  fields.problem.textContent = project.problem; fields.solution.textContent = project.solution;
  fields.challenges.textContent = project.challenges; fields.learned.textContent = project.learned;
  fields.role.textContent = project.role; fields.year.textContent = project.year; fields.statusText.textContent = project.status; fields.outcome.textContent = project.outcome;
  fields.tools.replaceChildren(...project.tools.map((tool) => { const tag = document.createElement("span"); tag.textContent = tool; return tag; }));
  fields.homeMessage.hidden = true; fields.details.hidden = false; fields.details.scrollTop = lastDetailsScroll;
  document.querySelectorAll("[data-details-panel]").forEach((panel) => { panel.hidden = panel.dataset.detailsPanel !== detailView; });
  fields.y.dataset.label = detailView === "overview" ? "Case Study" : "Overview";
  fields.y.setAttribute("aria-label", detailView === "overview" ? "Show case study details" : "Show project overview");
  fields.cartridgePanel.classList.remove("is-locked"); selectors.forEach((button) => { button.disabled = false; }); updateSelectorHighlight();
  saveState();
}

function renderDeck() { if (deckMode === "home") renderHome(); else renderProject(); }
function openProject(index = activeProject) { activeProject = (index + projects.length) % projects.length; activeScreenshot = 0; lastDetailsScroll = 0; detailView = "overview"; deckMode = "project"; renderProject(); fields.deck.classList.remove("is-loading"); requestAnimationFrame(() => fields.deck.classList.add("is-loading")); window.setTimeout(() => fields.deck.classList.remove("is-loading"), 480); }
function changeProject(direction) { activeProject = (activeProject + direction + projects.length) % projects.length; activeScreenshot = 0; lastDetailsScroll = 0; detailView = "overview"; if (deckMode === "project") renderProject(); else renderHome(); }
function changeScreenshot(direction) { if (deckMode !== "project") { showDeckStatus("Open a project first"); return; } const screenshots = projects[activeProject].screenshots; if (screenshots.length < 2) { showDeckStatus("Only one screenshot installed"); return; } activeScreenshot = (activeScreenshot + direction + screenshots.length) % screenshots.length; renderProject(); }
function goBackToHome() { if (deckMode !== "project") { showDeckStatus("Project menu already open"); return; } lastDetailsScroll = fields.details.scrollTop; deckMode = "home"; renderHome(); }
function toggleDetails() { if (deckMode !== "project") { showDeckStatus("Open a project first"); return; } detailView = detailView === "overview" ? "case-study" : "overview"; lastDetailsScroll = 0; renderProject(); fields.details.focus(); }

function openScreenshot() {
  const screenshot = projects[activeProject].screenshots[activeScreenshot];
  if (deckMode !== "project") { showDeckStatus("Open a project first"); return; }
  if (!screenshot.src) { showDeckStatus("Screenshot not installed yet"); return; }
  fields.modalTitle.textContent = `${projects[activeProject].name} — ${screenshot.label}`;
  fields.fullscreenImage.style.backgroundImage = `url("${screenshot.src}")`;
  fields.fullscreenImage.setAttribute("aria-label", fields.modalTitle.textContent);
  fields.modal.hidden = false; fields.closeModal.focus();
}
function closeScreenshot() { fields.modal.hidden = true; fields.fullscreenImage.style.backgroundImage = ""; fields.x.focus(); }
function openProjectLink(type) {
  if (deckMode !== "project") { showDeckStatus("Open a project first"); return; }
  const url = projects[activeProject][type];
  if (!url || url === "#") { showDeckStatus(type === "demo" ? "Live demo not installed" : "GitHub code not installed"); return; }
  window.open(url, "_blank", "noopener,noreferrer");
}

selectors.forEach((button) => button.addEventListener("click", () => openProject(Number(button.dataset.project))));
fields.previousProject.addEventListener("click", () => changeProject(-1)); fields.nextProject.addEventListener("click", () => changeProject(1));
fields.previousScreenshot.addEventListener("click", () => changeScreenshot(-1)); fields.nextScreenshot.addEventListener("click", () => changeScreenshot(1));
fields.a.addEventListener("click", () => deckMode === "home" ? openProject() : showDeckStatus("Project already loaded")); fields.b.addEventListener("click", goBackToHome);
fields.x.addEventListener("click", openScreenshot);
fields.y.addEventListener("click", toggleDetails);
fields.start.addEventListener("click", () => openProjectLink("demo"));
fields.select.addEventListener("click", () => openProjectLink("github"));
fields.details.addEventListener("scroll", () => { lastDetailsScroll = fields.details.scrollTop; saveState(); });
fields.closeModal.addEventListener("click", closeScreenshot); fields.modal.addEventListener("click", (event) => { if (event.target === fields.modal) closeScreenshot(); });

// Keyboard input is intentionally scoped to the DualDeck. This prevents normal
// typing elsewhere on the site from activating game-style controls.
fields.deck.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  // Preserve familiar scrolling while the bottom details screen has focus.
  if (event.target === fields.details) {
    if (event.key === "Escape") {
      event.preventDefault();
      goBackToHome();
    }
    return;
  }

  const actions = {
    ArrowUp: () => changeProject(-1),
    ArrowDown: () => changeProject(1),
    ArrowLeft: () => changeScreenshot(-1),
    ArrowRight: () => changeScreenshot(1)
  };

  if (actions[event.key]) {
    event.preventDefault();
    actions[event.key]();
    return;
  }

  if (event.key === "Enter" && event.target === fields.deck) {
    event.preventDefault();
    if (deckMode === "home") openProject();
  } else if (event.key === "Escape") {
    event.preventDefault();
    goBackToHome();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !fields.modal.hidden) {
    event.preventDefault();
    closeScreenshot();
  }
});

fields.deck.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth <= 760) return;
  const bounds = fields.deck.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - 0.5; const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  fields.deck.style.transform = `rotateX(${1 - y * 3}deg) rotateY(${3 + x * 4}deg)`;
});
fields.deck.addEventListener("pointerleave", () => { fields.deck.style.transform = ""; });

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

document.querySelectorAll("[data-contact-placeholder]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const notice = document.querySelector("#contact-notice");
    notice.textContent = link.dataset.contactPlaceholder;
  });
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#contact-notice").textContent = "Add your professional email to activate message delivery.";
  });
}

const sceneLinks = document.querySelectorAll("[data-scene-link]");
const scenes = document.querySelectorAll("[data-scene]");
const sceneNumber = document.querySelector("#scene-number");
function openScene(sceneName, updateHistory = true) {
  const targetScene = document.querySelector(`[data-scene="${sceneName}"]`); if (!targetScene) return;
  scenes.forEach((scene, index) => { const active = scene === targetScene; scene.classList.toggle("active", active); scene.setAttribute("aria-hidden", String(!active)); scene.inert = !active; if (active) sceneNumber.textContent = String(index + 1).padStart(2, "0"); });
  sceneLinks.forEach((link) => { const active = link.dataset.sceneLink === sceneName; link.classList.toggle("active", active); if (link.closest("nav")) { if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current"); } });
  if (sceneName === "projects" && deckMode === "project") renderProject();
  if (updateHistory) history.pushState({ sceneName }, "", `#${sceneName}`);
}
sceneLinks.forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); openScene(link.dataset.sceneLink); }));
window.addEventListener("popstate", () => openScene(location.hash.slice(1) || "home", false));

renderDeck(); openScene(location.hash.slice(1) || "home", false);
