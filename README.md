> **Archived.** This project is no longer in use and no longer maintained.

<p align="center">
    <img src="https://raw.githubusercontent.com/overshard/isaacbythewood.com-nextjs/master/public/static/images/favicon.png"
         width="200"
         height="200"
         alt="isaacbythewood.com Favicon" />
</p>

# Isaac Bythewood

The personal website of Isaac Bythewood, a Senior Solutions Architect located in
Elkin, NC.

https://isaacbythewood.com/

It is a visually rich, animation-heavy portfolio. The site leans into motion: a
custom cursor, a page transition loader, a background grid overlay, and four
full-canvas background animations (constellations, synthwave, retrostars,
slimemold). Pages cover an intro, about, code, art, and contact.

## Tech stack

- Next.js 16 and React 19 (Pages Router), plain JavaScript.
- Bun as both the runtime and the package manager.
- CSS Modules for styling, with shared theme tokens (colors, breakpoints,
  animation timings) centralized in `site.config.js`.
- react-transition-group for page transitions, sharp for image processing.
- The resume is generated from Markdown using marked and gray-matter.

## Clone

For any possible way of running this website yourself you'll need a copy of the
repo:

    git clone https://github.com/overshard/isaacbythewood.com-nextjs.git

After you get the repo it's up to you how you want to use it.

## Development

You will need to have [bun](https://bun.sh/) installed. After that you can run:

    bun install
    bun start

This will spin up isaacbythewood.com to run on port 8000 which you can access
via a browser at `http://localhost:8000`.

## Resume

The resume lives in `resume/`: `content.md` holds the copy and `template.html`
the layout. After editing the content, regenerate it with:

    bun run resume

## Production

The project includes a `Dockerfile` and `docker-compose.yml` for production
deployment. To build and run with Docker:

    docker compose up -d
