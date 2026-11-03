/* Shared by the isolated content script and the extension popup. No page globals. */
(() => {
  "use strict";
  const key = "ytlSettings";
  const defaults = Object.freeze({
    enabled: true,
    swap: false,
    playlist: "recommendations",
    hideHeader: true,
    hero: "channel",
    videoGap: 12,
    titleSpacing: 10,
    titleSize: 22
  });
  const ranges = Object.freeze({
    videoGap: Object.freeze({ min: 0, max: 64 }),
    titleSpacing: Object.freeze({ min: 0, max: 40 }),
    titleSize: Object.freeze({ min: 16, max: 40 })
  });
  function number(input, name) {
    const value = input[name];
    const { min, max } = ranges[name];
    return typeof value === "number" && Number.isFinite(value)
      ? Math.round(Math.min(max, Math.max(min, value))) : defaults[name];
  }
  function normalize(value) {
    const input = value && typeof value === "object" ? value : {};
    return {
      enabled: typeof input.enabled === "boolean" ? input.enabled : defaults.enabled,
      swap: typeof input.swap === "boolean" ? input.swap : defaults.swap,
      playlist: ["description", "horizontal"].includes(input.playlist) ? input.playlist : defaults.playlist,
      hideHeader: typeof input.hideHeader === "boolean" ? input.hideHeader : defaults.hideHeader,
      hero: input.hero === "title" ? "title" : defaults.hero,
      videoGap: number(input, "videoGap"),
      titleSpacing: number(input, "titleSpacing"),
      titleSize: number(input, "titleSize")
    };
  }
  globalThis.YTLayoutSettings = Object.freeze({ key, defaults, ranges, normalize });
})();
