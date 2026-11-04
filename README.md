# Herwin Portfolio

Personal portfolio, editorial-brutalist style. Next.js 16, React 19, Tailwind CSS 4, GSAP.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the build
```

## Config

- `API_URL` (optional): when set, `/api/*` is proxied to that backend (e.g. `API_URL=http://localhost:4000`).

## Structure

- `src/components/sections/` - Hero, Expertise, Work, Contact
- `src/app/hooks/` - GSAP/scroll behaviour (hero motion, scroll reveal, header theme, section scrolling)
- `src/app/globals.css` - all section styles, one prefixed block per section (`hx-`, `ex-`, `wk-`, `ct-`)
