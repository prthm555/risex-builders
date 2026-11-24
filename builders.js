/*
 * ─────────────────────────────────────────────────────────────
 *  RISEx Builders — THE ONLY FILE YOU NEED TO EDIT
 * ─────────────────────────────────────────────────────────────
 *
 *  Add a builder:    copy one { ... } block, paste it, change the values.
 *  Edit a builder:   change the values in its block.
 *  Remove a builder: delete its whole { ... }, block (including the comma).
 *  Hide a builder without deleting it: put // at the start of each of its lines.
 *
 *  Fields
 *    name       (required) Project name.
 *    website    (optional) Full URL, starting with https://
 *               Without it the card is shown but isn't clickable.
 *    platforms  (required) List of platforms, e.g. ["Web", "iOS", "Android",
 *               "Telegram", "Desktop", "API"]. Any text works; the filter
 *               buttons at the top are built automatically from these.
 *    x          (optional) X / Twitter handle, e.g. "@risechain".
 *    tagline    (optional) One short line about the product.
 *    logo       (optional) Image URL or a path like "logos/acme.png".
 *               Leave it out and a coloured initial is shown instead.
 *    featured   (optional) true pins the builder to the top with a badge.
 *
 *  Order doesn't matter: featured first, then alphabetical, automatically.
 */

window.BUILDERS = [
  {
    name: "Arbital",
    website: "https://arbital.xyz",
    platforms: ["Web"],
    x: "@arbital_xyz",
    tagline: "Memes, stocks and perps in one app.",
  },
  {
    name: "Arc Terminal",
    website: "https://arcterminal.ai",
    platforms: ["Web"],
    x: "@TheARCTERMINAL",
    tagline: "Trade crypto, US stocks, gold and forex from one account.",
  },
  {
    name: "Aspen",
    website: "https://rise.tryaspen.ai/feed",
    platforms: ["Web"],
    x: "@tryaspenai",
    tagline: "Follow or counter trading signals that auto-execute as orders.",
  },
  {
    name: "Cede Flow",
    website: "https://www.cedeflow.io",
    platforms: ["Web"],
    x: "@cedeflow",
    tagline: "Market-making and delta-neutral strategies for perp DEXs.",
  },
  {
    name: "ClashBot",
    website: "https://clashbot.fun",
    platforms: ["Web"],
    x: "@clashbotdotfun",
    tagline: "Copy traders, run bots and automate perp strategies.",
  },
  {
    name: "DeltaPulse",
    website: "https://deltapulse.io",
    platforms: ["Web", "Telegram"],
    x: "@deltapulse_io",
    tagline: "Live funding rates and cross-exchange funding arbitrage.",
  },
  {
    name: "HyprEarn",
    website: "https://hyprearn.com",
    platforms: ["Web"],
    x: "@HyprEarn",
    tagline: "AI trading desk for perps across every major DEX.",
  },
  {
    name: "Mimiq",
    platforms: ["Telegram"],
    tagline: "Invite-only Telegram trading bot.",
  },
  {
    name: "Orbit Screener",
    website: "https://orbitperpscreener.com",
    platforms: ["Web", "Telegram"],
    x: "@Orbit_screener",
    tagline: "Funding-rate arbitrage screener across 55 perp exchanges.",
  },
  {
    name: "PerpDexList",
    website: "https://perpdexlist.com",
    platforms: ["Web", "Telegram"],
    x: "@cryppimagic",
    tagline: "Funding rates, liquidity and execution costs across 47 perp venues.",
  },
  {
    name: "PerpsMania",
    website: "https://perpsmania.com",
    platforms: ["Web"],
    x: "@perpsmania",
    tagline: "Perp DEX rankings, points programs and airdrop research.",
  },
  {
    name: "Proliquid",
    website: "https://app.proliquid.xyz",
    platforms: ["Web"],
    x: "@proliquid_xyz",
    tagline: "All-in-one trading terminal for RISEx and other major venues.",
  },
  {
    name: "ptsGoblin",
    website: "https://ptsgoblin.xyz",
    platforms: ["Web"],
    x: "@PointsGoblin",
    tagline: "Points and airdrop calculators: see your real cost per point.",
  },
  {
    name: "RiseScreener",
    website: "https://risescreener.com",
    platforms: ["Web"],
    tagline: "RISEx analytics: markets, OI, funding, liquidations and flows.",
  },
  {
    name: "Scrub Money",
    website: "https://invest.scrub.money",
    platforms: ["Web"],
    x: "@ScrubMoneyDeFi",
    tagline: "Stablecoin yield and AI trading vaults.",
  },
  {
    name: "Split Markets",
    website: "https://split.markets",
    platforms: ["Web"],
    x: "@splitmarkets",
    tagline: "Up or down every 15 minutes: options and perps in one wallet.",
  },
  {
    name: "Vesper",
    website: "https://sypherscore.com",
    platforms: ["Web"],
    x: "@vesper_mm",
    tagline: "Non-custodial market-making bot and funding scanner.",
  },
  {
    name: "XYZD",
    website: "https://xyzd.live",
    platforms: ["Web"],
    x: "@tradeXYZD",
    tagline: "Automated liquidity infrastructure for decentralized markets.",
  },

  // ── Hidden until confirmed — remove the // to show ──
  // No website or X account found yet.
  // {
  //   name: "Shift",
  //   platforms: ["Web"],
  // },
];
