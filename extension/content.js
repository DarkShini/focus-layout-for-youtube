(() => {
  "use strict";
  const { key, normalize } = globalThis.YTLayoutSettings;
  let revision = 0;
  let latest;

  function apply(value) {
    latest = normalize(value);
    const root = document.documentElement;
    if (!root) return;
    root.setAttribute("data-ytl-enabled", String(latest.enabled));
    root.setAttribute("data-ytl-swap", String(latest.swap));
    root.setAttribute("data-ytl-playlist", latest.playlist);
    root.setAttribute("data-ytl-header", latest.hideHeader ? "hidden" : "visible");
    root.setAttribute("data-ytl-hero", latest.hero);
    root.style.setProperty("--ytl-setting-video-gap", `${latest.videoGap}px`);
    root.style.setProperty("--ytl-setting-title-spacing", `${latest.titleSpacing}px`);
    root.style.setProperty("--ytl-setting-title-size", `${latest.titleSize}px`);
    globalThis.YTLayoutViewport?.update(latest.enabled, latest.playlist === "horizontal");
  }

  // Subscribe before the asynchronous read. A newer change must win a startup race.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !Object.hasOwn(changes, key)) return;
    revision++;
    apply(changes[key].newValue);
  });
  const initialRevision = revision;
  chrome.storage.local.get(key).then(result => {
    if (revision === initialRevision) apply(result[key]);
  }).catch(() => {
    // If settings cannot be read, leave the original YouTube layout active.
  });

  // Normally <html> already exists at document_start. No observer or polling needed.
  if (!document.documentElement) {
    document.addEventListener("DOMContentLoaded", () => {
      if (latest) apply(latest);
    }, { once: true });
  }
})();
