# MODERNIZATION_PROMPT.md

## Purpose

This is an executable prompt for an implementation agent to modernize the XCARBON repository and perform a full brand refresh for an ecology/sustainability context. The agent must run the steps end-to-end, implement TypeScript across the codebase, apply the chosen Evergreen + Sky palette, harden accessibility and compliance, and produce the deliverables listed below.

This prompt is self-contained: follow it in order, mark `<!-- TODO -->` where required input or secrets are missing, and report progress after each major phase.

---

## Project Snapshot (auto-detect before starting)

- Repo path: ./ (root of workspace)
- Name: Quantum / XCARBON
- Current stack: React 19 (JSX), Vite, Tailwind CSS, Zustand, Storybook, Vitest
- PWA ready: yes (vite-plugin-pwa)
- Chosen refreshed palette: Evergreen + Sky (palette A)

Palette HEXs (copy these into `tailwind.config.js`):

- brand-900: #0B3B2E
- brand-700: #166534
- brand-600: #15803D
- brand-500: #22C55E
- brand-100: #DCFCE7
- accent-500: #0EA5E9
- neutral-900: #0F172A
- neutral-500: #64748B
- neutral-50: #F8FAFC

Usage: Primary CTA = white text on `brand-700` or `brand-900`.

---

## Agent Contract (inputs / outputs / success criteria)

- Inputs: the repository codebase (local files), stakeholder approvals (if provided), node/yarn environment.
- Outputs: updated codebase (TypeScript migration, Tailwind tokens, components updated), new/updated docs (`README.md`, `CONTRIBUTING.md`, `.env.example`), CI pipeline with `tsc` check and tests, Storybook token pages, and a final verification report.
- Success: All TypeScript compilation checks pass (`tsc --noEmit`), CI workflow runs including lint/test/build, UI uses the new brand tokens, WCAG AA contrast checks pass for key pages, Lighthouse scores (Perf/A11y/Best/SEO) >= 90 on home and impact pages.

Acceptance tests listed in the step-by-step plan must be green before the agent finishes.

---

## High-level Steps (run in order)

1. Discovery & Baseline (automated checks)
2. Tooling & Config (TypeScript, ESLint, Prettier, Husky)
3. Tokenize Brand (Tailwind tokens + CSS var fallbacks)
4. Typescript Migration (services → stores → components → pages); enforce `.ts/.tsx` file types
5. Component & Styling Refactor (Button, Card, Typography, Modal, Table, Chart)
6. Accessibility & Contrast Fixes (axe, Lighthouse)
7. Performance (code-splitting, image optim, bundle budgets)
8. Content & Compliance Pages (Mission, How, Compliance, Impact)
9. CI/CD & Tests (GitHub Actions with tsc, lint, test, build)
10. Final QA & Report (Lighthouse, a11y, type-check)

At each phase, create a progress file in `/tmp/xcarbon-progress.json` with status and artifacts produced.

---

## 1) Discover & Baseline (automated)

What to run first (collect metrics and baseline):

- Lint
- Run `node` and `yarn` environment checks
- Run `vite build` (collect warnings)
- Run a Lighthouse snapshot of `/` and `/impact` (if available locally)
- Run `knip` to find unused files

Commands (run in repo root):

```bash
# Install deps if not present (agent-runner environment must permit running installers)
yarn install --frozen-lockfile || yarn install

# Lint
yarn lint || npm run lint

# Build (production) to catch TypeScript later; this may fail before TS migration
yarn build || npm run build

# Run knip to detect unused files
yarn knip || npm run knip
```

Collect results into `/tmp/xcarbon-baseline.json` and attach to the final report.

---

## 2) Tooling & Config (must complete before code migration)

Create/update these files and enforce them with pre-commit hooks and CI checks.

Files to add or update:

- `tsconfig.json` (strict mode; root `compilerOptions` + path alias `@/*`)
- `jsconfig.json` or update existing to include TS paths (if present)
- `.eslintrc.cjs` or update `eslint.config.js` to include TypeScript rules
- `.prettierrc` (recommended defaults)
- `package.json` scripts additions:
  - "type-check": "tsc --noEmit"
  - "migrate:jsx-to-tsx": script helper for renames (see below)
  - "test": "vitest"
  - "format": "prettier --write ."
- Husky pre-commit hook: run `yarn type-check && yarn lint && yarn test` (configurable)

Mandatory `tsconfig.json` (agent must write exact file):

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "lib": ["DOM", "ES2021"],
    "jsx": "react-jsx",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] },
    "noEmit": true
  },
  "include": ["src/**/*", "vite.config.*", "*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

ESLint: extend config to include `@typescript-eslint` parser & plugin. Example `eslint` additions:

- Add devDeps: `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
- Extend recommended TypeScript rules and integrate into existing flat config.

Prettier: create minimal `.prettierrc`.

Husky: install and configure pre-commit to run `yarn format` and `yarn lint`.

After creating the configs, commit them on a dedicated branch `modernization/tooling-setup`.

---

## 3) Tokenize Brand (Tailwind + CSS vars)

1. Update `tailwind.config.js` to extend `colors.brand` and `colors.accent` using the chosen HEXs above. Also add a `design-tokens` Storybook story that visualizes each token with usage guidance.
2. Add `src/styles/tokens.css` (or update `src/index.css`) to include CSS var fallbacks for backwards compatibility. Example:

```css
:root {
  --brand-900: #0b3b2e;
  --brand-700: #166534;
  --brand-600: #15803d;
  --brand-500: #22c55e;
  --brand-100: #dcfce7;
  --accent-500: #0ea5e9;
}
```

3. Replace global CSS variables used today (`--bg-btn`, `--primary-color`, `#4c6663`, `#C2A57B`) with design tokens and verify visually via Storybook and a small test page.

Acceptance: Storybook shows a "Design Tokens" page and screenshots for brand tokens are added under `docs/branding/`.

---

## 4) Enforce TypeScript Migration (strict order and rules)

This section is mandatory and non-skippable. The agent must convert the repository from JSX/JS to TSX/TS using the bottom-up strategy to keep compile surface minimal.

Overall rules:

- Files under `src/services/` and `src/store/` must be migrated first (they define API shapes).
- Then migrate `src/components/` core primitives (Button, Input, Typography, Modal, Card, Table, Chart wrapper).
- Finally migrate pages in `src/pages/` and root app files (`App.jsx`, `main.jsx`, `index.html` references).
- All source files must end in `.ts` or `.tsx` by end of the migration (no `.jsx` or `.js` aside from build configs and scripts outside `src/`).
- Add `// @ts-ignore` only as a last resort and add a TODO with owner and reason.
- Every commit should pass `yarn type-check` locally. CI must run `yarn type-check` and block merge when it fails.

Automation helpers (agent must create):

1. A safe rename script (node script `scripts/rename-jsx-to-tsx.js`) the agent should create to batch-rename files and update imports. The script should:
   - Find files in `src/` with `.jsx` extension and rename to `.tsx`.
   - Find `.js` files that are modules and rename to `.ts` if they export non-JSX code (services, utils, stores).
   - Update import paths for changed extensions where they are explicitly referenced (rare).
   - Emit a dry-run mode first; then run real mode when `--apply` flag provided.

2. A migration checklist file `MIGRATION_TS.md` describing the per-file steps: add types, replace PropTypes with typed interfaces, add `React.FC<Props>` or typed function components.

3. Use `ts-migrate` or `jscodeshift` where useful but do not depend on network-only tools; the agent should prefer local codemods and scripted replacements and validate with `tsc` after each batch.

Suggested file rename command (agent may run):

```bash
node scripts/rename-jsx-to-tsx.js --dry
# review diffs
node scripts/rename-jsx-to-tsx.js --apply
```

Recommended migration order (batch sizes as small commits):

- Batch 1: `src/services/*` -> convert to `.ts` with typed request/response interfaces
- Batch 2: `src/store/*` -> convert Zustand stores to TypeScript, export typed hooks
- Batch 3: Core `src/components/*` primitives (Button, Input, Typography, Card)
- Batch 4: Larger components (Table, Chart wrapper, Modals)
- Batch 5: Pages `src/pages/*` and `App.jsx` -> `App.tsx` and entry `main.jsx` -> `main.tsx`

For each batch:

- Run `yarn type-check` and fix errors before continuing.
- Run unit tests and Storybook to catch runtime issues.
- If third-party libs lack types, add `@types/*` or create minimal declaration files in `src/types/vendors.d.ts`.

Enforcement in CI:

- Create `.github/workflows/ci.yml` with steps:
  - install
  - yarn lint
  - yarn type-check
  - yarn test --coverage
  - yarn build

The PR gating rule: any PR that introduces `.jsx` or `.js` files under `src/` will be rejected by the CI job (use a simple script to scan PR files and fail if non-TS files exist).

Example script to fail CI on non-TS files (agent must add `scripts/check-no-js-in-src.sh`):

```bash
#!/usr/bin/env bash
set -e
files=$(git diff --name-only $GITHUB_SHA $GITHUB_BASE_REF || git ls-files)
nonTs=$(echo "$files" | grep "^src/" | egrep "\.(js|jsx)$" || true)
if [ -n "$nonTs" ]; then
  echo "Found non-TypeScript files in src/:"; echo "$nonTs"; exit 1
fi
```

Add this script as a CI step before building.

---

## 5) Component & Styling Refactor (must use Tailwind tokens)

The agent must update components to use Tailwind color tokens (not raw HEXs) and produce a small theme wrapper exposing `brand` tokens.

Key components to update first:

- `src/components/Button/index.jsx` → `src/components/Button/index.tsx` (reduce variants and use `brand-*` classes)
- `src/components/Card` → use `bg-white dark:bg-slate-900` with `border` and `brand-100` accents
- `src/components/Modal` → ensure focus trap and `:focus-visible` outlines
- `src/components/Chart` wrappers → lazy-load Chart.js and use accent colors
- `src/components/Table` → use `react-window` for virtualization if large datasets

Also add `src/components/Theme` typed module exposing theme interface.

Testing: update or create Storybook stories for each component showing both light & dark with tokens.

---

## 6) Accessibility & Contrast Fixes

Run automated accessibility scans (axe) and fix issues prioritized by severity. Required checks:

- Ensure text contrast >= 4.5:1
- Ensure interactive elements have focus styles (outline or ring)
- Images and charts have alt text or accessible descriptions
- All form inputs have associated labels

Add automated axe checks into Storybook tests and GitHub Actions (playwright + axe).

---

## 7) Performance

- Lazy-load heavy libs: Chart.js, Framer Motion, large third-party UI
- Use `vite-plugin-imagemin` and `vite-plugin-compression`
- Add `rollup`/Vite bundle analyzer and enforce budget (max 300KB gzipped for initial payload)

---

## 8) Content & Compliance

Add pages & documentation with the following required content for compliance:

- `/compliance` page describing methodology, ISO references, registry IDs and dataset links
- Footer snippets linking to methodology, LCA PDFs in `/public/docs/`
- Badges (Verra, Gold Standard) with links to registry pages and Project IDs where possible

Copy rules: do not use vague claims. Every quantified claim must have a citation and link.

---

## 9) CI/CD & Tests

Create GitHub Actions workflow `ci.yml` with these jobs:

- lint
- type-check (tsc)
- test (vitest)
- build (vite)
- storybook build
- lighthouse snapshot (optional: run only on main branch)

Add badge entries to `README.md` for CI passing and Lighthouse scores.

---

## 10) Acceptance Criteria (DoD)

1. `yarn type-check` passes with zero errors.
2. No `.js`/`.jsx` files under `src/` in the default branch after merge.
3. Storybook shows Design Tokens page, and Button/Card/Modal stories updated.
4. Footer and Compliance page added with methodology and badges.
5. Automated Axe and Lighthouse checks passing on key pages (scores >=90).
6. CI pipeline exists and fails PRs that reintroduce `.js/.jsx` files under `src/`.
7. Documentation updated (`README.md`, `CONTRIBUTING.md`, `MIGRATION_TS.md`).

---

## 11) Deliverables (files & artifacts the agent must commit)

- `tsconfig.json`, updated `eslint.config.js`, `.prettierrc`, Husky config
- `tailwind.config.js` updated tokens + `src/styles/tokens.css`
- `scripts/rename-jsx-to-tsx.js` and `scripts/check-no-js-in-src.sh`
- All `src/*.tsx` and `src/*.ts` files (no `.jsx`/`.js` in `src/`)
- `MIGRATION_TS.md` with per-file migration notes
- `docs/branding/` screenshots and `docs/lighthouse/` reports
- `pages` added: `/mission`, `/how-it-works`, `/compliance`, `/impact`
- `.github/workflows/ci.yml` (lint, type-check, test, build)

---

## 12) Reporting & Handoff

At the end of the run, the agent must produce:

- `/tmp/xcarbon-progress.json` with phase statuses and artifact paths
- `MODERNIZATION_REPORT.md` summarizing the work, diffs, outstanding TODOs and a verification checklist showing how acceptance criteria were validated (include `tsc` output, Lighthouse JSON summary, and Axe report)

---

## 13) Risks & Escalations (short)

- If `tsc` errors are caused by third-party libraries without types, add `src/types/vendors.d.ts` with minimal declarations and open a follow-up TODO.
- If backend API schemas are unknown, use `any` temporarily only in services with `<!-- TODO: type with API schema -->` and document a follow-up to replace `any`.

---

## 14) Operator Notes (for human reviewer)

- The agent may need an allowance to install dev dependencies. Approve if sandboxed.
- Pause the run after `tooling-setup` and ask reviewer to validate token choices and any legal content before proceeding to content pages.

---

## 15) Start Now (explicit commands agent should run)

1. Create a branch: `modernization/typescript-and-brand`.

```bash
git checkout -b modernization/typescript-and-brand
```

2. Run tooling setup tasks (create `tsconfig.json`, install devDeps, add scripts):

```bash
# install required dev deps
yarn add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier husky lint-staged @types/node @types/react @types/react-dom

# create tsconfig.json (as above) and run quick type check
node -e "console.log('writing tsconfig')" && yarn type-check || true
```

3. Create `scripts/rename-jsx-to-tsx.js` (dry run) and produce a short report.

4. Execute migration batches. After each batch run `yarn type-check`, `yarn lint`, and `yarn test`.

5. When all batches pass, push and open a PR targeting `main` with the title: `chore: migrate to TypeScript + brand refresh (Evergreen + Sky)`.

---

## 16) TODO / Requirements where human input is needed

- Legal content: review `/public/docs/methodology.pdf` draft and confirm compliance language. <!-- TODO: Owner: Legal -->
- Brand approval: confirm chosen palette (Evergreen + Sky) or select alternative B/C. <!-- TODO: Owner: Design -->
- Registry links: provide API keys or confirmation for real-time Impact Dashboard if needed. <!-- TODO: Owner: Backend/Product -->

---

## 17) Final note

This prompt is prescriptive and enforces TypeScript migration. Do not skip the `type-check` gate. Document every `// @ts-ignore` with a follow-up issue and owner. When complete, produce `MODERNIZATION_REPORT.md` and attach all verification artifacts.

---

End of MODERNIZATION_PROMPT.md
