# RISKS_AND_TODOS.md

## Summary

This file lists the key risks, mitigations, and remaining TODOs for the XCARBON modernization work. Use this as a living checklist during the migration.

---

## High-Priority Risks

1. TypeScript Migration Breakage

- Risk: Compilation errors and runtime regressions during `.jsx`→`.tsx` rename.
- Mitigation: Bottom-up migration order (services → stores → components → pages), `yarn type-check` gating, small batch commits, dry-run rename script.
- Owner: Engineering Lead
- Status: TODO

2. Compliance / Greenwashing

- Risk: Marketing content may make vague/unsubstantiated environmental claims.
- Mitigation: Add Compliance page, cite registry project IDs, reference ISO 14021, include methodology PDFs and legal sign-off before publish.
- Owner: Legal/Product
- Status: TODO

3. Performance Regressions

- Risk: Heavy libraries increase bundle size and slow TTI.
- Mitigation: Lazy-load heavy components, add bundle analyzer, enforce budget in CI.
- Owner: Frontend Engineer
- Status: TODO

4. Accessibility Failures

- Risk: Color contrast or missing keyboard support.
- Mitigation: Run Axe + Lighthouse, fix focus management, Storybook a11y checks.
- Owner: Accessibility Engineer/Designer
- Status: TODO

---

## Medium-Priority Risks

5. Third-party Types Missing

- Risk: npm packages lacking types cause `tsc` errors.
- Mitigation: Add `@types/` where available or create minimal declarations in `src/types/vendors.d.ts`.
- Owner: Engineer assigned to migration
- Status: TODO

6. Backend API Schema Gaps

- Risk: Unknown API shapes cause incorrect TypeScript interfaces.
- Mitigation: Create `src/types/api.ts` with tentative types and mark TODOs for backend owners to confirm.
- Owner: Backend/Product
- Status: TODO

---

## Immediate TODOs (Actionable)

1. Add `tsconfig.json` (strict) at repo root. Owner: Agent (automated). Priority: High. Status: TODO
2. Create `scripts/rename-jsx-to-tsx.js` that supports `--dry` and `--apply` modes. Owner: Agent. Priority: High. Status: TODO
3. Update `tailwind.config.js` with `brand` and `accent` tokens and add `src/styles/tokens.css`. Owner: Agent. Priority: High. Status: TODO
4. Add `.prettierrc`, install Prettier and Husky, set up pre-commit hooks for format/lint. Owner: Agent. Priority: High. Status: TODO
5. Create `MIGRATION_TS.md` with per-file migration notes. Owner: Agent. Priority: High. Status: TODO
6. Update `Button` component to use `brand-*` classes and migrate to `index.tsx`. Owner: Agent. Priority: High. Status: TODO
7. Add `ci.yml` for GitHub Actions to run type-check, lint, test, build. Owner: Agent. Priority: High. Status: TODO
8. Add a Compliance stub page `/compliance` and drop `public/docs/methodology-draft.pdf` for legal review. Owner: Product/Legal. Priority: High. Status: TODO

---

## Longer-term TODOs

1. Hire third-party accessibility auditor and perform a VPAT. Owner: Product. Priority: Medium.
2. Implement Impact Dashboard using real-time registry APIs or a regularly-updated ETL. Owner: Backend/Product. Priority: Medium.
3. Add Storybook visual regression tests (Chromatic) and link to PRs. Owner: Frontend. Priority: Medium.
4. Add Sentry (or equivalent) for production error monitoring. Owner: DevOps. Priority: Medium.

---

## Known Unknowns (Require clarification)

- Which registry Project IDs will be surfaced publicly? <!-- TODO: Product -->
- Is there a backend repo with API schema (OpenAPI/GraphQL SDL)? <!-- TODO: Backend -->
- Preferred deployment target (Vercel, Netlify, self-hosted)? <!-- TODO: DevOps -->

---

## Quick Owner Map

- Engineering Lead: @engineer-owner <!-- TODO: replace with real handle -->
- Product Manager: @product-owner <!-- TODO: replace -->
- Design Lead: @design-owner <!-- TODO: replace -->
- Legal / Compliance: @legal-owner <!-- TODO: replace -->
- Accessibility Lead: @a11y-owner <!-- TODO: replace -->

---

Update this file as the project progresses. Each TODO should be replaced with a PR link or issue ticket once work begins.
