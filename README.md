# Remix Landing Page

Marketing site for [Remix](https://remix.live) — the Ethereum smart
contract IDE. Built with Next.js (App Router) and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in the analytics IDs before deploying.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project structure

- `src/app/` — routes: `/`, `/pricing`, `/features`, `/plugins`, `/desktop`,
  `/mobile`, `/learn`, `/releases`, `/organization`, `/partnership`,
  `/prototype`, `/impact`, `/donate`, `/contact`, `/refundpolicy`,
  `/termsandconditions`
- `src/components/` — `sections/`, `content/`, `layout/`, `ui/`
- `src/content/` — page copy as JSON, one file per route (e.g. `home.json`);
  `shared/` holds copy for cross-page pieces (navbar, hero, footer, etc.)
- `src/lib/urls.ts` — single source of truth for every Remix-owned URL and
  email; content JSON references these via `{{TOKEN}}` placeholders (e.g.
  `{{APP_URL}}`) resolved at runtime — never hardcode a Remix domain in JSON
- `middleware.ts` — rewrites requests on the `mobile.remix.live` host to
  `/mobile`

## Editing content

Most copy changes don't touch components at all — edit the relevant file in
`src/content/`. Each file's top-level keys map to the sections rendered on
that page. Use `{{TOKEN}}` placeholders for links (see `src/lib/urls.ts`
for the full list) instead of hardcoded URLs.

## Related

- App: [app.remix.live](https://app.remix.live)
- IDE docs: [remix-ide.readthedocs.io](https://remix-ide.readthedocs.io)
