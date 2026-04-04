# isaacbythewood.com

## What is this project?

Personal portfolio website for Isaac Bythewood, a Senior Solutions Architect.
A visually rich, animation-heavy single-page-style site built with Next.js.

The site lives at https://isaacbythewood.com/.

## Technical notes

- Next.js 16 with React 19, file-based routing under `pages/`.
- Styling uses CSS Modules (`styles/components/` and `styles/pages/`).
  Global CSS variables are defined in `styles/globals.css`.
- Path alias: `@styles/*` maps to `styles/*` (see `jsconfig.json`).
- Site-wide theme config (colors, breakpoints, animation timing) lives in
  `site.config.js`.
- Package manager is yarn. Use `yarn install` with frozen lockfile.
- `yarn start` runs the dev server on port 8000.
- `yarn next:build` builds for production.
- Docker deployment via Alpine-based image. See `Dockerfile` and
  `docker-compose.yml`. Port is bound to localhost only.
- No test framework is configured.
- No ESLint or Prettier configuration.

## Development tools

- Playwright MCP is available for browser testing. Use it to take
  screenshots and verify visual changes after modifying styles,
  templates, or content. Start the dev server first with `yarn start`.
- Always clean up screenshot files (*.png) after reviewing them. Delete
  them once you have confirmed the result to avoid clutter in the project
  directory.

## Project structure

- `pages/` - Next.js pages: index, about, code, art, contact
- `components/` - React components (menu, sidebar, loader, mouse cursor,
  canvas animations like constellations, synthwave, particleflow, retrostars)
- `styles/` - CSS Modules organized by components and pages
- `public/` - Static assets (images, PDFs, manifest, sitemap)
- `site.config.js` - Theme configuration (colors, breakpoints, timing)

## Design philosophy

- Dark aesthetic with primary color #20232e, blue #0e3ff4, purple #842bff.
- Heavy use of CSS animations and transitions (250ms transitions, 1500ms
  animations with ease-in-out).
- Custom cursor, page transition loader, background grid overlay.
- Responsive with mobile and tablet breakpoints.
