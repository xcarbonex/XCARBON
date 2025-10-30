# MODERNIZATION_STRATEGY.md

## Executive Summary

**Objective:** Transform XCARBON into a **credible, modern, investor-ready** carbon credit tokenization platform with:

1. **Refreshed ecology-first branding** (systematic green palette, trust signals)
2. **Production-grade code quality** (TypeScript, testing, CI/CD)
3. **WCAG AA accessibility** (contrast, keyboard nav, screen reader support)
4. **Compliance-first content** (CMA Green Claims Code, ISO 14021, proof points)
5. **Lighthouse ≥90** (performance, best practices, SEO, accessibility)

**Timeline:** 8 weeks (4 phases)  
**Impact:** Reduced greenwashing risk, improved user trust, faster development velocity, audit-ready platform

---

## 1. Strategic Diagnosis

### 1.1 Architecture & Code Health

| Area                    | Current State       | Target State                       | Gap Severity |
| ----------------------- | ------------------- | ---------------------------------- | ------------ |
| **Type Safety**         | JavaScript (`.jsx`) | TypeScript (`.tsx`)                | 🔴 High      |
| **Testing**             | 0% coverage         | 70%+ unit/integration              | 🔴 High      |
| **CI/CD**               | None                | GitHub Actions pipeline            | 🔴 High      |
| **Code Formatting**     | ESLint only         | ESLint + Prettier + Husky          | 🟡 Medium    |
| **Bundle Optimization** | Manual              | Vite + lazy loading + size budgets | 🟡 Medium    |
| **Error Handling**      | Basic try/catch     | Sentry/structured logging          | 🟢 Low       |

**Priority Fix:** TypeScript migration + CI/CD setup (prevents regressions during modernization)

---

### 1.2 Frontend UX/UI

| Area                  | Current State               | Target State                             | Gap Severity |
| --------------------- | --------------------------- | ---------------------------------------- | ------------ |
| **Brand Colors**      | Muted teal + gold mix       | Systematic green scale (100/500/700/900) | 🔴 High      |
| **Contrast Ratios**   | Unvalidated                 | WCAG AA (4.5:1 text, 3:1 UI)             | 🔴 High      |
| **Keyboard Nav**      | Partial                     | Full support + visible focus             | 🟡 Medium    |
| **Responsive Design** | Good (Tailwind)             | Maintain + test on real devices          | 🟢 Low       |
| **Dark Mode**         | Functional                  | Improved with green palette              | 🟡 Medium    |
| **Component Tokens**  | Mixed (CSS vars + Tailwind) | 100% Tailwind design tokens              | 🟡 Medium    |

**Priority Fix:** Brand color refresh (unblocks all UI work) + contrast audit (legal risk)

---

### 1.3 Content & Claims

| Area                  | Current State    | Target State                        | Gap Severity |
| --------------------- | ---------------- | ----------------------------------- | ------------ |
| **Mission Statement** | Missing          | Prominent on homepage               | 🔴 High      |
| **Proof Points**      | Vague references | Certification badges, LCA links     | 🔴 High      |
| **Methodology Docs**  | None             | Detailed retirement/offset process  | 🔴 High      |
| **Impact Metrics**    | None             | Live dashboard (tons CO₂, projects) | 🟡 Medium    |
| **Compliance Page**   | Missing          | ISO 14021, CMA compliance statement | 🔴 High      |
| **FAQ**               | Placeholder      | 20+ Q&A on compliance/blockchain    | 🟡 Medium    |

**Priority Fix:** Compliance page + disclaimers (greenwashing liability) + certification badges (trust)

---

### 1.4 Performance & Accessibility

| Metric                     | Current | Target             | Gap       |
| -------------------------- | ------- | ------------------ | --------- |
| **Lighthouse Perf**        | Unknown | ≥90                | 🟡 Medium |
| **Lighthouse A11y**        | Unknown | ≥90 (WCAG AA)      | 🔴 High   |
| **First Contentful Paint** | Unknown | <1.5s              | 🟡 Medium |
| **Time to Interactive**    | Unknown | <3.5s              | 🟡 Medium |
| **Bundle Size (JS)**       | Unknown | <300KB gzipped     | 🟡 Medium |
| **Screen Reader Testing**  | None    | Manual + automated | 🟡 Medium |

**Priority Fix:** Run Lighthouse audit (baseline) + contrast fixes (quick win)

---

## 2. Modernization Targets & Rationale

### 2.1 Tech Stack Evolution

#### Frontend (No Breaking Changes)

| Current         | Target                         | Rationale                                             |
| --------------- | ------------------------------ | ----------------------------------------------------- |
| React 19 (JSX)  | React 19 (TSX)                 | Type safety, IntelliSense, fewer runtime errors       |
| Vite 6.3.5      | Vite 6.3.5 + config tweaks     | Already modern; add bundle analyzer, size limits      |
| Tailwind 3.4.17 | Tailwind 3.4.17 + green tokens | Refactor CSS vars → Tailwind design tokens            |
| Zustand 5.0.6   | Zustand 5.0.6                  | Keep (modern, lightweight); consolidate Context usage |
| Axios 1.10.0    | Axios 1.10.0 + interceptors    | Add request/response logging, error standardization   |

**Why No Framework Change?**

- React 19 + Vite is already best-in-class (2025)
- Rewrite risk > modernization benefit
- Focus energy on TypeScript + testing instead

#### Developer Experience (New Additions)

| Tool                         | Purpose                         | Impact                                         |
| ---------------------------- | ------------------------------- | ---------------------------------------------- |
| **TypeScript 5.8.3**         | Type safety (already installed) | Prevent prop errors, API contract enforcement  |
| **Prettier 3.x**             | Code formatting                 | Eliminate style debates, consistent commits    |
| **Husky 9.x**                | Git hooks                       | Block unformatted/failing code from commits    |
| **Vitest + Testing Library** | Unit/integration tests          | Confidence in refactors, regression prevention |
| **GitHub Actions**           | CI/CD                           | Automated lint/test/build/deploy               |
| **Vite Bundle Analyzer**     | Bundle size tracking            | Identify bloat, enforce budgets                |

---

### 2.2 Brand Refresh Strategy

#### Chosen Palette: **A) Evergreen + Sky** (Clean Fintech Vibe)

**Why This Palette?**

- **Evergreen** signals trust, growth, sustainability (expected for carbon platform)
- **Sky blue accent** adds clarity, tech-forward feel (differentiates from NGO brown/earth tones)
- **High contrast** ratios built-in (dark greens on white pass WCAG AA)
- **Fintech credibility** (appeals to corporate buyers, investors)

#### Color System (Tailwind Tokens)

```js
// tailwind.config.js additions
colors: {
  brand: {
    100: '#DCFCE7',  // Light emerald (backgrounds, hovers)
    500: '#22C55E',  // Emerald 500 (success states, secondary CTAs)
    600: '#15803D',  // Green 600 (primary CTAs, links)
    700: '#166534',  // Green 700 (primary buttons, headers)
    900: '#0B3B2E',  // Deep evergreen (dark mode primary, footer)
  },
  accent: {
    500: '#0EA5E9',  // Sky 500 (info, links, data highlights)
  },
  neutral: {
    900: '#0F172A',  // Charcoal (dark mode text)
    500: '#64748B',  // Slate (secondary text)
    50: '#F8FAFC',   // Off-white (light mode bg)
  }
}
```

#### Usage Rules

| Element                  | Color                                                  | Rationale                        |
| ------------------------ | ------------------------------------------------------ | -------------------------------- |
| **Primary CTA**          | `bg-brand-700 text-white`                              | High contrast, trustworthy green |
| **Secondary CTA**        | `border-brand-600 text-brand-600`                      | Outline style, less aggressive   |
| **Headings (H1-H3)**     | `text-brand-700` on light, `text-brand-100` on dark    | Strong hierarchy                 |
| **Body Text**            | `text-neutral-900` on light, `text-neutral-50` on dark | Max readability                  |
| **Links**                | `text-accent-500 underline-offset-4`                   | Distinct from body, accessible   |
| **Success States**       | `bg-brand-100 text-brand-700`                          | Soft green tint + dark text      |
| **Info/Stats**           | `text-accent-500`                                      | Sky blue for data points, charts |
| **Certification Badges** | `bg-brand-50 border-brand-600`                         | Subtle green frame               |

#### Dark Mode Adjustments

```js
// Dark mode overrides (in Tailwind)
dark: {
  '--bg-color': '#0F172A',        // Charcoal (not pure black)
  '--bg-main': '#1E293B',         // Slate 800
  '--bg-secondary': '#0F172A',    // Charcoal
  '--text-color': '#F8FAFC',      // Off-white
  '--brand-primary': '#22C55E',   // Brighter green for dark bg
}
```

---

### 2.3 Content Strategy (Compliance-First)

#### New Pages (Must-Have)

1. **Mission & Impact** (`/mission`)
   - Hero: "Transparent Carbon Markets, Powered by Blockchain"
   - Key metrics: X tons CO₂ offset, Y projects verified, Z registries integrated
   - Team/About section (builds trust)
2. **How It Works** (`/how-it-works`)
   - Step-by-step diagrams (tokenization process)
   - Explainer videos (3-5 min, hosted on YouTube/Vimeo)
   - Registry integration flowchart
3. **Certifications & Compliance** (`/compliance`)
   - ISO 14021 compliance statement
   - CMA Green Claims Code adherence
   - Registry partnership badges (Verra, Gold Standard)
   - Audit reports (third-party verification)
   - Methodology documents (PDF downloads)
4. **Impact Dashboard** (`/impact`)
   - Live charts: tons CO₂ offset, projects funded, countries
   - Individual user impact (personalized after login)
   - Comparison metrics ("Equivalent to X trees planted")
5. **FAQ** (`/faq`)
   - Compliance Q&A (double-counting, additionality)
   - Blockchain Q&A (energy consumption, gas fees)
   - Registry Q&A (retirement process, serial numbers)

#### Content Rewrites (All Pages)

**Before (Current):**

> "Convert your registry carbon credits into XCB tokens"

**After (Proposed):**

> "Turn verified carbon credits into tradable digital assets — backed by Gold Standard and Verra registries."

**Before:**

> "Submit for Tokenization"

**After:**

> "Tokenize Credits — View full methodology"

**Before:**

> "Tokenized Carbon Credits"

**After:**

> "Your Carbon Portfolio — Verified, Transparent, Tradable"

#### Compliance Checklist (Every Page Footer)

- ✅ "Verified by [Registry Logo]"
- ✅ "ISO 14021 Compliant"
- ✅ "View Methodology" (link to `/compliance`)
- ✅ Disclaimer: "Blockchain transactions incur gas fees; see energy impact FAQ"

---

## 3. Implementation Phases (8 Weeks)

### Phase 1: Foundation & Brand (Weeks 1-2)

#### Week 1: Brand + Tooling Setup

**Goals:**

- Install Prettier, Husky, lint-staged
- Update Tailwind config with new green palette
- Create design token reference page (Storybook)
- Run initial Lighthouse audit (baseline)

**Deliverables:**

- `tailwind.config.js` with `brand` and `accent` tokens
- `.prettierrc` and `.husky/pre-commit` hook
- Storybook "Design Tokens" page showing all colors
- Lighthouse report (JSON) in `/docs/lighthouse/`

**Success Criteria:**

- [ ] All commits auto-formatted
- [ ] No ESLint errors on pre-commit
- [ ] Design tokens documented in Storybook
- [ ] Lighthouse baseline: Perf ??, A11y ??, Best Practices ??

---

#### Week 2: Brand Application + Contrast Audit

**Goals:**

- Replace all `--bg-btn`, `--primary-color`, `#4C6663` with Tailwind tokens
- Update Button component to use `brand-*` classes
- Audit contrast ratios (automated + manual)
- Fix critical contrast failures (WCAG AA)

**Deliverables:**

- Refactored `Button/index.jsx` (12 variants → 6, using tokens)
- Contrast audit report (`docs/a11y/contrast-report.md`)
- Fixed critical issues (e.g., gold-on-white → brand-700-on-white)
- Updated Storybook stories for Button, Card, Typography

**Success Criteria:**

- [ ] All primary CTAs use `bg-brand-700 text-white` (4.5:1 contrast)
- [ ] All links use `text-accent-500` (4.5:1 on white, 7:1 on dark)
- [ ] Automated contrast checks pass in Storybook
- [ ] Visual regression tests (Chromatic) pass

---

### Phase 2: TypeScript + Testing (Weeks 3-4)

#### Week 3: TypeScript Migration (Services + Stores)

**Goals:**

- Add `tsconfig.json` with strict mode
- Migrate `/services/` to TypeScript (12 files)
- Migrate `/store/` to TypeScript (12 files)
- Add type definitions for API responses

**Deliverables:**

- `tsconfig.json` with strict: true, noImplicitAny: true
- All `.js` files in `/services/` → `.ts`
- All Zustand stores typed with proper interfaces
- `src/types/api.ts` with response/request types

**Success Criteria:**

- [ ] `tsc --noEmit` passes with zero errors
- [ ] IntelliSense works for API calls in VS Code
- [ ] No `any` types (exceptions documented in README)
- [ ] Zustand DevTools show typed state

---

#### Week 4: Component Migration + Unit Tests

**Goals:**

- Migrate `/components/` to TypeScript (17 component families)
- Write unit tests for Button, Input, Select, Typography (80% coverage)
- Write integration tests for Dashboard, Portfolio (50% coverage)
- Set up Vitest CI in GitHub Actions

**Deliverables:**

- All `.jsx` components → `.tsx`
- `vitest.config.ts` with coverage thresholds
- 50+ test files in `__tests__/` directories
- `.github/workflows/ci.yml` (lint, type-check, test, build)

**Success Criteria:**

- [ ] Component prop types enforced (no PropTypes needed)
- [ ] 80% coverage on UI components
- [ ] 50% coverage on pages
- [ ] CI pipeline passes on every PR

---

### Phase 3: UX Polish + Accessibility (Weeks 5-6)

#### Week 5: Keyboard Nav + Focus Management

**Goals:**

- Audit keyboard navigation (Tab, Enter, Esc, Arrow keys)
- Add visible focus indicators (brand-600 ring)
- Fix modal focus traps (lock focus inside)
- Test with screen readers (NVDA, JAWS, VoiceOver)

**Deliverables:**

- Updated global CSS with `:focus-visible` styles
- Focus trap utility for modals/dialogs
- Screen reader testing notes (`docs/a11y/screen-reader-test.md`)
- Axe DevTools audit report (zero critical issues)

**Success Criteria:**

- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible on all buttons/links
- [ ] Modals trap focus correctly (Esc closes)
- [ ] Screen reader announces page titles, form labels correctly

---

#### Week 6: Performance Optimization

**Goals:**

- Implement code-splitting (lazy load Chart.js, Table, Modals)
- Optimize images (convert PNGs to WebP, use `<picture>`)
- Add bundle size limits in Vite config
- Run Lighthouse CI (set budgets: Perf ≥90, A11y ≥90)

**Deliverables:**

- `React.lazy()` for heavy components (5+ added)
- `vite-plugin-imagemin` for image optimization
- `vite-plugin-compression` for Brotli compression
- Lighthouse CI config (`.lighthouserc.json`)

**Success Criteria:**

- [ ] Initial JS bundle <150KB gzipped
- [ ] Largest Contentful Paint <2.5s (Lighthouse)
- [ ] Cumulative Layout Shift <0.1
- [ ] Lighthouse scores: Perf 90+, A11y 95+, Best 100, SEO 100

---

### Phase 4: Content + Compliance (Weeks 7-8)

#### Week 7: New Pages + Content Migration

**Goals:**

- Build Mission & Impact page (hero, metrics, team)
- Build How It Works page (diagrams, videos)
- Build Compliance page (ISO 14021, methodology PDFs)
- Build Impact Dashboard page (Chart.js, live data)

**Deliverables:**

- 4 new pages in `/pages/` (fully responsive)
- Impact metrics API endpoint (mock or real)
- Methodology PDF (hosted in `/public/docs/`)
- Registry badge SVGs (Verra, Gold Standard, ACR, CAR)

**Success Criteria:**

- [ ] Mission page tells clear story (A/B tested with 5 users)
- [ ] How It Works has <3min explainer video
- [ ] Compliance page lists 5+ proof points (badges, audits)
- [ ] Impact Dashboard shows real-time data (or realistic mock)

---

#### Week 8: Content Audit + Launch Prep

**Goals:**

- Rewrite all UX copy (CMA Green Claims Code compliant)
- Add disclaimers to footer (gas fees, double-counting)
- Update README with domain knowledge, setup instructions
- Create CONTRIBUTING.md (PR guidelines, code style)
- Final Lighthouse + a11y audit

**Deliverables:**

- Updated copy in 20+ pages (tracked in `docs/copy-audit.md`)
- Footer component with compliance links
- README.md (3000+ words, domain context, screenshots)
- CONTRIBUTING.md (code review checklist)
- Final Lighthouse report (all ≥90)

**Success Criteria:**

- [ ] Zero vague claims ("eco-friendly", "green" without proof)
- [ ] Every impact stat has source ("Verified by Gold Standard, ID: XYZ")
- [ ] README explains carbon credit tokenization to new devs
- [ ] Lighthouse CI passes on all pages (Perf/A11y/Best/SEO ≥90)

---

## 4. Detailed Decision Rules

### 4.1 Frontend Architecture Decisions

#### TypeScript Migration Strategy

**Rule:** Bottom-up (services → stores → components → pages)  
**Rationale:** Services have clearest types (API contracts); components inherit from props  
**Exceptions:** Skip utility files initially (debounce, base64); add types in Week 5

#### Component Refactoring

**Rule:** If >10 variants or >200 lines, split into subcomponents  
**Example:** `Button` (14 variants) → `Button`, `IconButton`, `LinkButton`  
**Rationale:** Easier to test, clearer API, better tree-shaking

#### State Management Consolidation

**Rule:** Use Zustand for global state; Context only for theme/sidebar  
**Rationale:** Zustand has DevTools, better TypeScript support  
**Migration:** Move `SidebarContext` to Zustand store in Week 3

---

### 4.2 Brand Application Rules

#### When to Use Brand Green (700/900)

- ✅ Primary CTAs ("Tokenize Now", "List Asset", "Withdraw")
- ✅ Active sidebar item
- ✅ Page headers (H1, H2)
- ✅ Success states ("Transaction Complete")

#### When to Use Accent Blue (500)

- ✅ Links in body text
- ✅ Informational alerts ("Gas fee: 0.0045 MATIC")
- ✅ Data highlights in charts
- ✅ External link icons

#### When to Avoid Color

- ❌ Error states (use red: `#EF4444`)
- ❌ Warning states (use amber: `#F59E0B`)
- ❌ Neutral actions ("Cancel", "Back")

#### Dark Mode Exception

**Rule:** Use brighter green (`brand-500`) for dark backgrounds  
**Rationale:** `brand-700` lacks contrast on `#0F172A`  
**Implementation:** Tailwind `dark:bg-brand-500` class

---

### 4.3 Accessibility Standards

#### WCAG AA Compliance (Mandatory)

| Element                | Requirement              | Test Method              |
| ---------------------- | ------------------------ | ------------------------ |
| **Body Text**          | 4.5:1 contrast           | Automated (axe DevTools) |
| **Large Text (18pt+)** | 3:1 contrast             | Automated                |
| **UI Components**      | 3:1 contrast             | Manual + automated       |
| **Keyboard Nav**       | All interactive elements | Manual testing           |
| **Screen Reader**      | Proper labels, landmarks | Manual (NVDA, VoiceOver) |
| **Focus Indicators**   | 2px outline, visible     | Manual + Storybook       |

#### Testing Tools (Required)

- **Automated:** Axe DevTools, Lighthouse, pa11y-ci
- **Manual:** NVDA (Windows), VoiceOver (macOS), JAWS (enterprise)
- **CI:** Axe Playwright integration in GitHub Actions

---

### 4.4 Content Compliance Rules

#### CMA Green Claims Code (UK) Checklist

Every environmental claim must be:

1. **Truthful** - Backed by verifiable data
2. **Clear** - Avoid jargon, explain technical terms
3. **Considerate of full lifecycle** - Mention gas fees, blockchain energy
4. **Substantiated** - Link to methodology, registry docs
5. **Up-to-date** - Review quarterly, update stale stats

#### Approved Language

✅ **Good:**

- "Verified by Gold Standard (Project ID: GS12345)"
- "10.5 tons CO₂ offset — equivalent to driving 25,000 miles"
- "Powered by Polygon blockchain (0.00079 kWh per transaction)"

❌ **Bad:**

- "Eco-friendly tokenization" (vague)
- "Green blockchain" (greenwashing)
- "Carbon neutral platform" (unsubstantiated)

#### Required Disclaimers (Footer)

- "Carbon credits retired on registry to prevent double-counting"
- "Blockchain transactions consume energy; see our methodology"
- "Not financial advice; consult tax/legal advisor"

---

## 5. Risk Assessment & Mitigations

### High-Risk Areas

#### Risk 1: TypeScript Migration Breaks Production

**Likelihood:** Medium  
**Impact:** High (site downtime)  
**Mitigation:**

- Use feature flags (`FF_USE_TS_SERVICES`) to toggle new code
- Deploy TypeScript services to staging first (1 week soak test)
- Keep `.js` files in parallel until 100% confidence

#### Risk 2: Brand Refresh Alienates Existing Users

**Likelihood:** Low  
**Impact:** Medium (user confusion)  
**Mitigation:**

- A/B test new palette on 10% traffic (Week 2)
- Add "New Look" announcement banner (dismissible)
- Keep old logos in `/assets/legacy/` for 1 month

#### Risk 3: Compliance Claims Trigger Legal Review

**Likelihood:** Medium  
**Impact:** High (regulatory fines)  
**Mitigation:**

- Hire compliance consultant (ISO 14021 expert) to review content
- Add legal disclaimer: "For informational purposes only"
- Avoid absolute claims ("100% green") without audit proof

#### Risk 4: Performance Regressions from Heavy Features

**Likelihood:** High  
**Impact:** Medium (slower load times)  
**Mitigation:**

- Add Lighthouse CI with strict budgets (block PRs if fail)
- Lazy-load Chart.js, Framer Motion (defer until needed)
- Use `react-window` for all lists >100 items

---

### Medium-Risk Areas

#### Risk 5: CI/CD Pipeline Delays Deployments

**Likelihood:** Medium  
**Impact:** Medium (dev frustration)  
**Mitigation:**

- Cache `node_modules` in GitHub Actions (3x speedup)
- Run tests in parallel (Vitest sharding)
- Skip build on docs-only changes (`[skip ci]` in commit)

#### Risk 6: Screen Reader Testing Reveals Major Issues

**Likelihood:** Medium  
**Impact:** Medium (delay launch)  
**Mitigation:**

- Test early (Week 5, not Week 8)
- Prioritize fixes: Critical (blocker) > Major > Minor
- Document known issues in `docs/a11y/known-issues.md`

---

## 6. Success Metrics & KPIs

### Technical Metrics (CI/CD Dashboard)

| Metric                | Baseline (Week 0) | Target (Week 8) | Measurement    |
| --------------------- | ----------------- | --------------- | -------------- |
| **Type Coverage**     | 0%                | 90%             | `tsc --noEmit` |
| **Test Coverage**     | 0%                | 70%             | Vitest report  |
| **Lighthouse Perf**   | ???               | ≥90             | Lighthouse CI  |
| **Lighthouse A11y**   | ???               | ≥95             | Lighthouse CI  |
| **Bundle Size (JS)**  | ???               | <300KB gzip     | Vite stats     |
| **Build Time**        | ???               | <2min           | GitHub Actions |
| **Contrast Failures** | ???               | 0 critical      | Axe DevTools   |

---

### Business Metrics (Post-Launch)

| Metric                         | Baseline | 3-Month Target | Measurement     |
| ------------------------------ | -------- | -------------- | --------------- |
| **User Trust Score**           | ???      | +25%           | Survey (1-10)   |
| **Compliance Inquiries**       | ???      | -50%           | Support tickets |
| **Avg. Session Duration**      | ???      | +15%           | Analytics       |
| **Conversion Rate (Tokenize)** | ???      | +10%           | Funnel analysis |
| **Bounce Rate (Homepage)**     | ???      | <40%           | Analytics       |

---

## 7. Deliverables Checklist (All Phases)

### Code Artifacts

- [ ] `tailwind.config.js` with `brand` and `accent` tokens
- [ ] `tsconfig.json` (strict mode, path aliases)
- [ ] `.prettierrc`, `.husky/pre-commit`
- [ ] `vitest.config.ts` (coverage thresholds)
- [ ] `.github/workflows/ci.yml` (lint, test, build, deploy)
- [ ] `.lighthouserc.json` (perf budgets)
- [ ] `vite.config.ts` (bundle analyzer, compression)

### Documentation

- [ ] `README.md` (3000+ words, domain context, screenshots)
- [ ] `CONTRIBUTING.md` (code review checklist)
- [ ] `.env.example` (all required vars documented)
- [ ] `docs/a11y/contrast-report.md`
- [ ] `docs/a11y/screen-reader-test.md`
- [ ] `docs/lighthouse/` (baseline + final reports)
- [ ] `docs/copy-audit.md` (before/after UX copy)

### New Pages

- [ ] `/mission` (Mission & Impact)
- [ ] `/how-it-works` (Process explainer)
- [ ] `/compliance` (ISO 14021, CMA, audits)
- [ ] `/impact` (Live dashboard)
- [ ] `/faq` (20+ Q&A)

### Component Updates

- [ ] `Button` (6 variants, TypeScript)
- [ ] `Typography` (semantic HTML, a11y)
- [ ] `Card` (green tints, contrast-safe)
- [ ] `Table` (virtualized, accessible)
- [ ] `Chart` (lazy-loaded, alt text)
- [ ] `Modal` (focus trap, Esc key)
- [ ] `Footer` (compliance links, badges)

---

## 8. Post-Launch Roadmap (Weeks 9-12)

### Week 9: Monitoring & Hotfixes

- Set up Sentry for error tracking
- Monitor Lighthouse CI scores (alert if drop below 90)
- Fix critical bugs from user feedback

### Week 10: Performance Tuning

- Analyze bundle with `vite-bundle-visualizer`
- Remove unused dependencies (Knip report)
- Optimize images (convert remaining PNGs to WebP)

### Week 11: A11y Certification

- Hire third-party a11y audit (Deque, Level Access)
- Fix all Major/Minor issues from audit
- Add VPAT (Voluntary Product Accessibility Template)

### Week 12: Developer Experience

- Add VS Code snippets for components
- Write Storybook docs for all components
- Record video tutorials (YouTube)

---

## 9. Assumptions & Unknowns

### ✅ Assumptions (Made by Meta-Agent)

1. **Polygon blockchain** - Gas fees in MATIC, low energy per tx
2. **B2B primary audience** - Corporate buyers, investors (not consumers)
3. **US/UK legal jurisdiction** - CMA Green Claims Code applies
4. **No backend changes** - API contracts stable during frontend work
5. **Stakeholder buy-in** - Design/compliance decisions can be made autonomously

### ❓ Unknowns (Requires Input)

1. **Legal review timeline** - How long to approve compliance page?
2. **Registry API limits** - Can we show real-time data on Impact Dashboard?
3. **Brand assets** - Do new logos need to be designed, or refactor existing?
4. **Budget** - Can we hire a11y consultant ($5K-$10K)?
5. **Launch date** - Is 8-week timeline firm, or flexible?

---

## 10. Conclusion & Next Steps

### What This Strategy Achieves

✅ **Credible branding** - Systematic green palette, trust signals  
✅ **Production-grade code** - TypeScript, 70% test coverage, CI/CD  
✅ **Legal compliance** - CMA Green Claims Code, ISO 14021 adherence  
✅ **WCAG AA accessibility** - Contrast, keyboard nav, screen readers  
✅ **Lighthouse ≥90** - Fast, best practices, SEO-optimized

### What's Still Needed (Stakeholder Input)

1. **Approve chosen palette** (Evergreen + Sky) or select alternative
2. **Legal review** of compliance content (hire consultant?)
3. **Confirm unknowns** (API limits, launch date, budget)
4. **Assign Phase owners** (who leads TypeScript migration?)

### Immediate Next Action

**→ Generate `MODERNIZATION_PROMPT.md`** (executable by implementation agent)

---

**Document Version:** 1.0  
**Last Updated:** October 30, 2025  
**Status:** Ready for Stakeholder Review  
**Next Step:** Generate implementation prompt
