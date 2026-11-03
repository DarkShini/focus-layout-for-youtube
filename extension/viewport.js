/* Targeted size observations; no polling, timers or DOM mutation observers. */
(() => {
  "use strict";
  let enabled = false;
  let horizontal = false;
  let lastPlaylistItem;
  let frame;
  let observer;
  let resizeFrame;
  let watchRoot;
  let lastPlayerSize;
  let observed = [];
  const previous = new Map();

  function playerIsActive() {
    return enabled && watchRoot?.hasAttribute("theater") && !watchRoot.hasAttribute("hidden") &&
      !watchRoot.hasAttribute("fullscreen") && !document.fullscreenElement;
  }
  function alignPlaylist(watch) {
    if (!horizontal || !watch?.hasAttribute("theater") || watch.hasAttribute("hidden") ||
      watch.hasAttribute("fullscreen") || document.fullscreenElement) {
      lastPlaylistItem = undefined;
      return;
    }
    const list = watch.querySelector('ytd-playlist-panel-renderer#playlist:not([hidden]):not([collapsed]) > #container > #items');
    const item = list?.querySelector('ytd-playlist-panel-video-renderer[selected]');
    if (!item || !list.clientWidth) { lastPlaylistItem = undefined; return; }
    if (item === lastPlaylistItem) return;
    const frame = list.getBoundingClientRect();
    const card = item.getBoundingClientRect();
    // Scroll only the native strip, never the document or the video above it.
    if (card.left < frame.left) list.scrollLeft += card.left - frame.left - 12;
    else if (card.right > frame.right) list.scrollLeft += card.right - frame.right + 12;
    lastPlaylistItem = item;
  }
  function notifyPlayer() {
    if (resizeFrame !== undefined) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = undefined;
      // Let YouTube recompute pixel sizes of the media and its controls using the new canvas height.
      if (playerIsActive()) {
        window.dispatchEvent(new Event("resize"));
        alignPlaylist(watchRoot);
      }
    });
  }

  function disconnect() {
    observer?.disconnect();
    observer = undefined;
    observed = [];
    watchRoot = undefined;
    lastPlayerSize = undefined;
    lastPlaylistItem = undefined;
    previous.clear();
    if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame);
    resizeFrame = undefined;
    for (const name of ["title", "channel", "header"]) {
      document.documentElement?.style.removeProperty(`--ytl-${name}-height`);
    }
  }

  function connect() {
    const watch = document.querySelector('ytd-watch-flexy:not([hidden])');
    if (!watch) { disconnect(); return; }
    alignPlaylist(watch);
    const title = watch?.querySelector('ytd-watch-metadata #title-row');
    const channel = watch?.querySelector('ytd-watch-metadata #top-row');
    const header = document.querySelector('ytd-app #masthead-container');
    const player = watch?.querySelector(':scope > #full-bleed-container');
    if (!title || !channel || (observed[0] === title && observed[1] === channel && observed[2] === header && observed[3] === player)) return;
    observer?.disconnect();
    watchRoot = watch;
    lastPlayerSize = undefined;
    observed = [title, channel, header, player];
    previous.clear();
    const activeObserver = new ResizeObserver(entries => {
      if (!enabled || observer !== activeObserver) return;
      for (const entry of entries) {
        const index = observed.indexOf(entry.target);
        if (index < 0) continue;
        const height = entry.borderBoxSize?.[0]?.blockSize;
        if (index === 3) {
          const width = entry.borderBoxSize?.[0]?.inlineSize;
          if (!playerIsActive() || !(width > 0) || !(height > 0)) { lastPlayerSize = undefined; lastPlaylistItem = undefined; continue; }
          if (lastPlayerSize && Math.abs(lastPlayerSize.width - width) < 0.25 && Math.abs(lastPlayerSize.height - height) < 0.25) continue;
          lastPlayerSize = { width, height };
          notifyPlayer();
          continue;
        }
        // Keep the last visible masthead height while hidden, so restoring it reserves space immediately.
        if (index === 2 && height === 0) continue;
        if (!Number.isFinite(height) || height < 0 || Math.abs((previous.get(index) ?? -1) - height) < 0.1) continue;
        previous.set(index, height);
        document.documentElement.style.setProperty(["--ytl-title-height", "--ytl-channel-height", "--ytl-header-height"][index], `${height}px`);
      }
    });
    observer = activeObserver;
    for (const target of observed) if (target) observer.observe(target, { box: "border-box" });
  }
  function schedule() {
    if (!enabled || frame !== undefined) return;
    frame = requestAnimationFrame(() => { frame = undefined; connect(); });
  }
  // YouTube emits these on initial render and SPA navigation. Rebind after render.
  for (const event of ["yt-navigate-finish", "yt-page-data-updated", "yt-player-updated", "DOMContentLoaded"]) {
    document.addEventListener(event, schedule);
  }
  document.addEventListener("click", event => {
    if (enabled && horizontal && event.target?.closest?.('ytd-playlist-panel-renderer#playlist')) schedule();
  }, { passive: true });
  // Bypass the site's vertical-list wheel handler. Keep the browser default:
  // horizontal gestures scroll the strip; vertical gestures scroll the page.
  document.addEventListener("wheel", event => {
    if (!enabled || !horizontal || event.ctrlKey || event.metaKey || event.altKey || document.fullscreenElement) return;
    const panel = event.target?.closest?.('ytd-playlist-panel-renderer#playlist:not([hidden])');
    if (panel?.closest('ytd-watch-flexy[theater]:not([hidden]):not([fullscreen])')) event.stopPropagation();
  }, { capture: true, passive: true });
  globalThis.YTLayoutViewport = Object.freeze({
    update(value, horizontalPlaylist = false) {
      const wasEnabled = enabled;
      enabled = value === true;
      const nextHorizontal = horizontalPlaylist === true;
      if (horizontal !== nextHorizontal) lastPlaylistItem = undefined;
      horizontal = nextHorizontal;
      if (enabled) schedule();
      else {
        disconnect();
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = undefined;
        if (wasEnabled) window.dispatchEvent(new Event("resize"));
      }
    }
  });
})();
