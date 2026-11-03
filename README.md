# Focus Layout for YouTube

Browser extension that rearranges the desktop YouTube watch page in Theater mode. Version **0.6.4**. It centers the title, gives the video a configurable first-screen height, arranges comments and recommendations, and offers three playlist placements including a horizontal strip.

The extension runs only on https://www.youtube.com/* and uses the storage permission for local layout settings. It has no analytics, remote code, or developer-operated server. It is independent of YouTube and Google.

## Install from source

- Chromium / Opera: load the extension/ directory as an unpacked extension.
- Firefox 140+: run node tools/build-firefox.mjs, then temporarily load dist/firefox/manifest.json via about:debugging. Published Firefox versions require Mozilla signing.

Enable YouTube Theater mode with **T**, then open the extension popup to adjust the layout. The standard watch layout, Shorts, and mobile YouTube are outside this extension's scope.

## Reproducible CSS and Firefox package

Node.js is the only build dependency. Run node tools/build-css.mjs to regenerate extension/layout.css from the included source. Run node tools/build-firefox.mjs to copy the Chromium runtime and apply the Firefox manifest overlay. Package the contents of dist/firefox/ with manifest.json at the ZIP root for Mozilla Add-ons. The PNG icons are included as binary assets; their editable SVG source is icon-source.svg.

The Firefox package uses the same CSS and JavaScript as the Chromium package. The Gecko ID is stable for updates. Firefox behavior should be verified on a real YouTube watch page before publishing.

## Privacy and support

See [Privacy policy](PRIVACY.md). Report bugs through [GitHub Issues](https://github.com/DarkShini/focus-layout-for-youtube/issues).

Licensed under [MIT](LICENSE).
