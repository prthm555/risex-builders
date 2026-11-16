// Renders window.BUILDERS (from builders.js). You shouldn't need to edit this file.
(function () {
  const builders = (window.BUILDERS || [])
    .filter((b) => b && b.name && b.website)
    // Featured first, then alphabetical.
    .sort((a, b) => (!!b.featured - !!a.featured) || a.name.localeCompare(b.name));

  const listEl = document.getElementById("list");
  const filtersEl = document.getElementById("filters");
  const searchEl = document.getElementById("search");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");
  const root = document.documentElement;

  // ── Theme toggle (initial theme is set by the inline script in index.html) ──
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: theme just won't persist */ }
  });

  // ── Colours ──
  // Common platforms get fixed hues so they're consistent and distinct;
  // anything else gets a stable hue derived from its name.
  const PLATFORM_HUES = {
    web: 250, ios: 210, android: 145, telegram: 195, desktop: 280,
    api: 30, discord: 235, extension: 330, mobile: 175,
  };

  function hashHue(s) {
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
  }

  function platformHue(p) {
    const k = p.toLowerCase();
    return k in PLATFORM_HUES ? PLATFORM_HUES[k] : hashHue(k);
  }

  function logoGradient(name) {
    const h = hashHue(name);
    return `linear-gradient(135deg, hsl(${h} 80% 60%), hsl(${(h + 50) % 360} 80% 50%))`;
  }

  // ── Filters (built from the data, so new platforms appear automatically) ──
  let activePlatform = "All";
  const platforms = ["All", ...new Set(builders.flatMap((b) => b.platforms || []))];
  for (const p of platforms) {
    const btn = document.createElement("button");
    btn.className = "filter";
    btn.type = "button";
    btn.textContent = p;
    btn.setAttribute("aria-pressed", String(p === activePlatform));
    btn.addEventListener("click", () => {
      activePlatform = p;
      for (const b of filtersEl.children) b.setAttribute("aria-pressed", String(b === btn));
      render();
    });
    filtersEl.appendChild(btn);
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text; // textContent: data is never parsed as HTML
    return n;
  }

  const ARROW_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function card(b) {
    const a = el("a", "card");
    a.href = b.website;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const logo = el("div", "logo");
    if (b.logo) {
      const img = document.createElement("img");
      img.src = b.logo;
      img.alt = "";
      img.loading = "lazy";
      logo.appendChild(img);
    } else {
      logo.style.background = logoGradient(b.name);
      logo.textContent = b.name.trim()[0].toUpperCase();
    }

    const heading = el("div", "heading");
    const name = el("h2", "name", b.name);
    if (b.featured) name.appendChild(el("span", "badge", "Featured"));
    heading.append(name, el("p", "host", hostOf(b.website)));

    const arrow = el("span", "arrow");
    arrow.innerHTML = ARROW_SVG; // static constant, not user data

    const top = el("div", "card-top");
    top.append(logo, heading, arrow);
    a.appendChild(top);

    if (b.tagline) a.appendChild(el("p", "tagline", b.tagline));

    const tags = el("div", "tags");
    for (const p of b.platforms || []) {
      const t = el("span", "tag", p);
      t.style.setProperty("--h", platformHue(p));
      tags.appendChild(t);
    }
    a.appendChild(tags);

    const li = document.createElement("li");
    li.appendChild(a);
    return li;
  }

  function render() {
    const q = searchEl.value.trim().toLowerCase();
    const shown = builders.filter((b) => {
      if (activePlatform !== "All" && !(b.platforms || []).includes(activePlatform)) return false;
      if (!q) return true;
      return [b.name, b.tagline, b.website, ...(b.platforms || [])]
        .some((f) => f && f.toLowerCase().includes(q));
    });

    listEl.replaceChildren(...shown.map(card));
    countEl.textContent = `${shown.length} ${shown.length === 1 ? "builder" : "builders"}`;
    emptyEl.hidden = shown.length > 0;
  }

  searchEl.addEventListener("input", render);
  render();
})();
