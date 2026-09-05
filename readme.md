# nguyen.ink

Personal site and portfolio, built with Next.js 16 (Pages Router), React 19, TypeScript, and
Tailwind CSS v4.

One app serves three hosts. `proxy.ts` rewrites the root path based on the incoming host:

| Host                  | Route      |
| --------------------- | ---------- |
| `nguyen.ink`          | `/landing` |
| `cardin.nguyen.ink`   | `/cardin`  |
| `dylan.nguyen.ink`    | `/dylan`   |

## Setup

```bash
git clone https://github.com/Ne-k/Next.js-Portfolio
cd Next.js-Portfolio
npm install
cp .env.example .env.local
npm run dev
```

Every variable in `.env.example` is optional. Without them the Spotify widget shows nothing,
analytics never loads, and GitHub is fetched anonymously at 60 requests/hour.

To preview a subdomain locally, visit `http://cardin.localhost:3000` or
`http://dylan.localhost:3000`.

## Scripts

| Command               | What it does                                                |
| --------------------- | ----------------------------------------------------------- |
| `npm run dev`         | Dev server on port 3000                                      |
| `npm run build`       | Production build (prerenders `/cardin` with its GitHub data) |
| `npm start`           | Serve the production build                                   |
| `npm run lint`        | ESLint                                                       |
| `npm run render:pdfs` | Re-render `CN_Resume.pdf` and `CN_References.pdf`            |
| `npm run render:og`   | Re-render the Open Graph cards and the favicon PNGs          |

## Design

The site, the resume, and the reference sheet are one system: IBM Plex Sans for prose, IBM Plex
Mono for every label and readout, graphite ink on warm paper, and a single oxide accent
(`#b4331d`) used only for emphasis. Structure comes from hairline rules rather than cards, so
there are no rounded corners, shadows, or gradients anywhere. Tokens live in the `@theme` block
of [`styles/globals.css`](styles/globals.css) and are mirrored in [`public/doc.css`](public/doc.css).

Motion is two gestures, not a reveal on every block. Hairline rules draw themselves left to right,
because rules are what the layout is built from; section rules are driven by a CSS scroll timeline
(`animation-timeline: view()`), so they need no observer and work on the landing page's zero-JS
build. The hero plays one staggered entrance on load. Text never animates on scroll, so nothing is
hidden waiting for a frame, and `prefers-reduced-motion` drops straight to the finished state.

Dark mode is site-wide, with a three-state toggle (auto / light / dark) in the masthead and in the
Cardin header. Auto follows `prefers-color-scheme`; an explicit choice is stored in a `theme`
cookie scoped to `.nguyen.ink`, so it carries across all three subdomains, which cannot share
localStorage.

The toggle holds no state. An inline script in [`_document`](pages/_document.tsx) applies the
stored choice before the first paint and writes it to `<html>`: `data-theme` drives the palette
(absent for auto, which hands the decision back to the media query) and `data-theme-pref` records
what was picked. CSS derives the pressed state from that, so `ThemeToggle` never re-renders and
works on the landing page, which ships no React at all — it sets `unstable_runtimeJS: false`,
since every link on it points at a different host and nothing holds state.

## How the pieces fit

- **Projects** are fetched from the GitHub API in `getStaticProps` and revalidated hourly, so the
  grid ships in the initial HTML instead of loading in the browser. Pin extra repos or hide
  existing ones with `FEATURED_REPOS` / `HIDDEN_REPOS` in [`lib/github.ts`](lib/github.ts).
- **Now playing** hits `/api/now-playing`, which is cached for 60 seconds and always returns 200
  so a Spotify outage cannot break the page.
- **Site details** (email, socials, nav) live in [`lib/site.ts`](lib/site.ts).
- **Resume and references** are authored as HTML in `public/` and rendered to PDF with Puppeteer.
  Both share [`public/doc.css`](public/doc.css), which carries the same type and colour system as
  the site and self-hosts its fonts from `public/fonts/` so the `file://` render resolves them.
  Edit the HTML, then run `npm run render:pdfs`.
- **Social cards and favicons** are generated, not hand-made. [`scripts/render-og.mjs`](scripts/render-og.mjs)
  screenshots two 1200x630 cards and draws one favicon per host: `cn` for Cardin, `dn` for Dylan,
  `n` for the landing page, each as `icon-<slug>-{16,32,180}.png`. The mark is the masthead's
  Plex Mono monogram, pastel pink ground and plum letters; the 16px slot drops to a single letter,
  because two glyphs cannot hold their counters at that size. Letters are centred on their trimmed
  ink bounding box, not on the line box, so side bearings cannot throw them off. Cardin's set also
  becomes `/favicon.ico`.
  Run `npm run render:og` after changing the palette, the fonts, or the avatar.

[Live site](https://nguyen.ink)
