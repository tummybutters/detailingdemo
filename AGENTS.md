# Repository Guidelines

## Project Structure & Module Organization
- `client/`: React + Vite front-end. Main entry `client/src/main.tsx`, routes in `client/src/App.tsx`, shared UI in `client/src/components/`, styling in `client/src/index.css` and Tailwind config.
- `server/`: Express back-end entry at `server/index.ts`. Build output goes to `dist/` (both client and server bundles).
- `public/`: Static assets served by Vite. Additional assets live under `client/src/assets/` (aliased as `@assets`).
- Config: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`.

## Build, Test, and Development Commands
- `npm run dev`: Run the full stack in dev mode (Node 18 via tsx for server; Vite dev server for client).
- `npm run build`: Build client (Vite) and bundle server (esbuild) into `dist/`.
- `npm start`: Serve production build from `dist/`.
- `npm run check`: Type-check with `tsc`.
- `npm run db:push`: Apply Drizzle migrations.

## Coding Style & Naming Conventions
- Language: TypeScript/React. Prefer function components and hooks.
- Paths: Use absolute aliases (e.g., `@/components/...`, `@assets/...`) instead of relative chains.
- Styling: Tailwind utility-first plus occasional inline styles; keep new styles in CSS if reused.
- Formatting: Keep imports ordered, avoid default exports for shared utilities when possible, and keep JSX props on separate lines when they wrap.

## Testing Guidelines
- Current automated tests are minimal. At least run `npm run check` before commits.
- If adding tests, colocate with source (`*.test.ts[x]`) and document how to run them.

## Commit & Pull Request Guidelines
- Commits in this repo are short, imperative summaries (e.g., “Fix mobile hero dock placement”).
- Keep changes focused; group related edits into a single commit.
- PRs: include a brief summary, scope of changes, any env/setup notes, and screenshots/GIFs for UI-affecting work.

## Security & Configuration Tips
- Do not commit secrets. Check `.env` or service-account files are excluded.
- Server runs on Node 18; keep new dependencies minimal and prefer audited packages.

## Agent-Specific Instructions
- Avoid destructive git commands (`reset --hard`, `checkout -- .`). Do not revert user changes.
- Use `rg` for search. Favor `apply_patch` for file edits. Keep new files ASCII and concise.***
