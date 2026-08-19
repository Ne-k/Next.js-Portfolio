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

## How the pieces fit

- **Projects** are fetched from the GitHub API in `getStaticProps` and revalidated hourly, so the
  grid ships in the initial HTML instead of loading in the browser. Pin extra repos or hide
  existing ones with `FEATURED_REPOS` / `HIDDEN_REPOS` in [`lib/github.ts`](lib/github.ts).
- **Now playing** hits `/api/now-playing`, which is cached for 60 seconds and always returns 200
  so a Spotify outage cannot break the page.
- **Site details** (email, socials, nav) live in [`lib/site.ts`](lib/site.ts).
- **Resume and references** are authored as HTML in `public/` and rendered to PDF with Puppeteer.
  Edit the HTML, then run `npm run render:pdfs`.

[Live site](https://nguyen.ink)
