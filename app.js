// Renders window.BUILDERS (from builders.js). You shouldn't need to edit this file.
(function () {
  const builders = (window.BUILDERS || [])
    .filter((b) => b && b.name)
    // Featured first, then alphabetical.
    .sort((a, b) => (!!b.featured - !!a.featured) || a.name.localeCompare(b.name));

  const $ = (id) => document.getElementById(id);
  const listEl = $("list");
  const filtersEl = $("filters");
  const searchEl = $("search");
  const countEl = $("count");
  const clearEl = $("clear");
  const emptyEl = $("empty");
  const root = document.documentElement;

  $("pill-text").textContent = `Ecosystem directory · ${builders.length} builders`;

  // ── Theme toggle (initial theme is set by the inline script in index.html) ──
  $("theme-toggle").addEventListener("click", () => {
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

  // ── Filters (built from the data, so new platforms appear automatically) ──
  let activePlatform = "All";
  const platformCounts = new Map();
  for (const b of builders) {
    for (const p of b.platforms || []) platformCounts.set(p, (platformCounts.get(p) || 0) + 1);
  }
  // Most-used platforms first.
  const platforms = [["All", builders.length], ...[...platformCounts].sort((a, b) => b[1] - a[1])];

  for (const [p, n] of platforms) {
    const btn = document.createElement("button");
    btn.className = "filter";
    btn.type = "button";
    btn.dataset.platform = p;
    btn.append(p, el("span", "filter-count", String(n)));
    btn.addEventListener("click", () => setPlatform(p));
    filtersEl.appendChild(btn);
  }

  function setPlatform(p) {
    activePlatform = p;
    for (const b of filtersEl.children) b.setAttribute("aria-pressed", String(b.dataset.platform === p));
    render();
  }

  function clearAll() {
    searchEl.value = "";
    setPlatform("All");
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
  const X_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z"/></svg>';

  // Accepts "@handle", "handle" or a full x.com / twitter.com URL.
  function xHandle(x) {
    return String(x).trim().replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, "").replace(/^@/, "").split(/[/?#]/)[0];
  }

  // The card is an <article>, not one big <a>, because it can contain a second
  // link (X). The name link stretches over the whole card via .card-link::after,
  // and the X link sits above it (z-index), so both stay clickable.
  function card(b) {
    const a = el("article", b.website ? "card clickable" : "card");

    const logo = el("div", "logo");
    if (b.logo) {
      const img = document.createElement("img");
      img.src = b.logo;
      img.alt = "";
      img.loading = "lazy";
      logo.appendChild(img);
    } else {
      logo.classList.add("initial");
      logo.style.setProperty("--h", hashHue(b.name));
      logo.textContent = b.name.trim()[0].toUpperCase();
    }

    const heading = el("div", "heading");
    const name = el("h2", "name");
    if (b.website) {
      const link = el("a", "card-link", b.name);
      link.href = b.website;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      name.appendChild(link);
    } else {
      name.appendChild(document.createTextNode(b.name));
    }
    if (b.featured) name.appendChild(el("span", "badge", "Featured"));
    heading.append(name, el("p", "host", b.website ? hostOf(b.website) : "No public website"));

    const top = el("div", "card-top");
    top.append(logo, heading);
    if (b.website) {
      const arrow = el("span", "arrow");
      arrow.innerHTML = ARROW_SVG; // static constant, not user data
      top.appendChild(arrow);
    }
    a.appendChild(top);

    if (b.tagline) a.appendChild(el("p", "tagline", b.tagline));

    const bottom = el("div", "card-bottom");
    const tags = el("div", "tags");
    for (const p of b.platforms || []) {
      const t = el("span", "tag", p);
      t.style.setProperty("--h", platformHue(p));
      tags.appendChild(t);
    }
    bottom.appendChild(tags);
    if (b.x) {
      const handle = xHandle(b.x);
      const xl = el("a", "x-link");
      xl.href = "https://x.com/" + encodeURIComponent(handle);
      xl.target = "_blank";
      xl.rel = "noopener noreferrer";
      xl.setAttribute("aria-label", `${b.name} on X`);
      xl.innerHTML = X_SVG; // static constant
      xl.appendChild(el("span", null, "@" + handle));
      bottom.appendChild(xl);
    }
    a.appendChild(bottom);

    const li = document.createElement("li");
    li.appendChild(a);
    return li;
  }

  function render() {
    const q = searchEl.value.trim().toLowerCase();
    const shown = builders.filter((b) => {
      if (activePlatform !== "All" && !(b.platforms || []).includes(activePlatform)) return false;
      if (!q) return true;
      return [b.name, b.tagline, b.website, b.x, ...(b.platforms || [])]
        .some((f) => f && f.toLowerCase().includes(q));
    });

    const filtered = q !== "" || activePlatform !== "All";
    listEl.replaceChildren(...shown.map(card));
    countEl.textContent = filtered
      ? `Showing ${shown.length} of ${builders.length}`
      : `${builders.length} ${builders.length === 1 ? "builder" : "builders"}`;
    clearEl.hidden = !filtered;
    emptyEl.hidden = shown.length > 0;
  }

  searchEl.addEventListener("input", render);
  clearEl.addEventListener("click", clearAll);
  $("empty-clear").addEventListener("click", () => { clearAll(); searchEl.focus(); });

  // "/" jumps to search (unless already typing somewhere); Esc clears it.
  document.addEventListener("keydown", (e) => {
    const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
    if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      searchEl.focus();
    }
  });
  searchEl.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (searchEl.value) { searchEl.value = ""; render(); } else searchEl.blur();
  });

  setPlatform("All"); // sets aria-pressed and does the first render
})();
