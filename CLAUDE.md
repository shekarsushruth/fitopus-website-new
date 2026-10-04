# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server on port 3000 (0.0.0.0)
npm run build     # TypeScript check + Vite production build
npm run lint      # TypeScript type-check only (no ESLint configured)
npm run clean     # Remove dist/
npm run preview   # Serve the production build locally
```

There are no automated tests in this project.

## Architecture

This is a single-page React + TypeScript app bootstrapped with Vite and styled with Tailwind CSS v4. There is no router — navigation is managed by a single `step` string in top-level state inside `App.tsx`.

### State & navigation flow

`App.tsx` owns all state via `useState<AppState>`. The `step` field drives which screen renders:

```
landing → builder → auth → success
              ↓
            menu (accessible from landing or builder)
```

`updateSubscription` merges partials into the subscription and **recalculates `totalInvestment`** (`₹250 × mealsPerDay.length × durationDays`) on every change. Never set `totalInvestment` directly; let `updateSubscription` handle it.

### Screens (`src/components/`)

| File | Rendered when |
|---|---|
| `LandingScreen.tsx` | `step === 'landing'` — marketing page |
| `BuilderScreen.tsx` | `step === 'builder'` — 4-step plan configurator |
| `AuthScreen.tsx` | `step === 'auth'` — lead capture form, writes to Firestore |
| `SuccessScreen.tsx` | `step === 'success'` — post-submission confirmation |
| `MenuScreen.tsx` | `step === 'menu'` — browse meal items |

### Static data (`src/constants.ts`)

`PRIMARY_GOALS` and `PLAN_DURATIONS` are the only data arrays. Goal images currently point to Google Cloud URLs (old) and `/weight-loss.jpg` / `/muscle-gain.jpg` (local, in `public/`). Duration days mapping is in `App.tsx` as `DURATION_DAYS`.

### Firebase / backend

`src/lib/firebase.ts` initialises Firebase from `firebase-applet-config.json` (not committed — do not create or overwrite this file). On auth form submit, `AuthScreen` writes a single document to the `leads` Firestore collection containing the full `UserProfile` + `Subscription`.

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin — no `tailwind.config.js`, config is in `src/index.css`.
- Design tokens (`bg-primary-container`, `text-on-surface`, etc.) follow Material Design 3 naming and are defined as CSS variables in `src/index.css`.
- Fonts: `Poppins` for headlines/display (`font-headline`, `font-display`), `Inter` for body (`font-body`).
- Animations use `motion/react` (Framer Motion v12).
- Icons use `material-symbols-outlined` loaded via Google Fonts CDN (render as text strings inside `<span>` — not React components).

### Preview server

`.claude/launch.json` configures the Claude Code preview panel to run `npm run dev` on port 3000. Use `mcp__Claude_Preview__preview_start` with name `"Fitopus"` to start it.
