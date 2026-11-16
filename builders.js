/*
 * ─────────────────────────────────────────────────────────────
 *  RISEx Builders — THE ONLY FILE YOU NEED TO EDIT
 * ─────────────────────────────────────────────────────────────
 *
 *  Add a builder:    copy one { ... } block, paste it, change the values.
 *  Edit a builder:   change the values in its block.
 *  Remove a builder: delete its whole { ... }, block (including the comma).
 *
 *  Fields
 *    name       (required) Project name.
 *    website    (required) Full URL, starting with https://
 *    platforms  (required) List of platforms, e.g. ["Web", "iOS", "Android",
 *               "Telegram", "Desktop", "API"]. Any text works; the filter
 *               buttons at the top are built automatically from these.
 *    tagline    (optional) One short line about the product.
 *    logo       (optional) Image URL or a path like "logos/acme.png".
 *               Leave it out and a coloured initial is shown instead.
 *    featured   (optional) true pins the builder to the top with a badge.
 *
 *  The entries below are PLACEHOLDERS — replace them with real builders.
 */

window.BUILDERS = [
  {
    name: "Example Terminal",
    website: "https://example.com",
    platforms: ["Web", "Desktop"],
    tagline: "Pro trading terminal with RISEx perps built in.",
    featured: true,
  },
  {
    name: "Example Wallet",
    website: "https://example.com",
    platforms: ["iOS", "Android"],
    tagline: "Mobile wallet with one-tap perps trading.",
  },
  {
    name: "Example Bot",
    website: "https://example.com",
    platforms: ["Telegram"],
    tagline: "Trade RISEx markets straight from chat.",
  },
  {
    name: "Example Aggregator",
    website: "https://example.com",
    platforms: ["Web", "API"],
    tagline: "Routes orders across perp venues for best execution.",
  },
];
