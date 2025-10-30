# DISCOVERY_REPORT.md

## Executive Summary

**Project:** XCARBON (Quantum xCarbon)  
**Type:** Carbon Credit Tokenization & Management Platform  
**Current Stack:** React 19 + Vite + Tailwind CSS + Zustand  
**Domain:** Blockchain-based sustainability (carbon credit trading, tokenization, registry integration)  
**Date:** October 30, 2025

---

## 1. Repository Structure & Organization

### Root Structure

```
XCARBON/
├── src/
│   ├── components/     # Reusable UI components (17+ component families)
│   ├── pages/         # Route-level pages (20+ pages)
│   ├── services/      # API client layer (12+ services)
│   ├── store/         # Zustand state management (12+ stores)
│   ├── utils/         # Helper functions
│   ├── assets/        # Static images, SVGs, logos
│   ├── context/       # React Context providers
│   └── appData/       # Static/mock data
├── public/           # PWA assets, manifest, offline page
├── .storybook/       # Component documentation
└── [config files]    # Vite, Tailwind, ESLint, etc.
```

**Strengths:**

- Well-organized feature-based structure
- Clear separation of concerns (services/stores/components)
- Modern tooling (Vite, ESLint flat config, Storybook)
- PWA-ready infrastructure

**Issues:**

- No TypeScript adoption (despite having `typescript` as dependency)
- Missing CI/CD configuration (no `.github/workflows/`)
- No comprehensive README documenting the carbon credit domain
- Limited documentation on environmental claims compliance

---

## 2. Technology Stack Snapshot

### Frontend

| Technology    | Version | Status    | Notes              |
| ------------- | ------- | --------- | ------------------ |
| React         | 19.1.0  | ✅ Modern | Latest stable      |
| Vite          | 6.3.5   | ✅ Modern | Fast build tool    |
| Tailwind CSS  | 3.4.17  | ✅ Modern | Utility-first CSS  |
| React Router  | 7.6.1   | ✅ Modern | Latest routing     |
| Zustand       | 5.0.6   | ✅ Modern | Lightweight state  |
| Formik + Yup  | Latest  | ✅ Modern | Form handling      |
| Chart.js      | 4.4.9   | ✅ Modern | Data visualization |
| Framer Motion | 12.23.6 | ✅ Modern | Animations         |
| Axios         | 1.10.0  | ✅ Modern | HTTP client        |

### UI Libraries

- **@heroui/react** (2.8.1) - Component library
- **react-icons** (5.5.0) - Icon system
- **react-toastify** (11.0.5) - Notifications
- **react-datepicker** (8.4.0) - Date inputs

### Developer Experience

| Tool              | Status                    | Notes                       |
| ----------------- | ------------------------- | --------------------------- |
| ESLint            | ✅ Configured             | Flat config format          |
| Storybook         | ✅ v9.0.16                | Component docs + a11y addon |
| Vitest            | ✅ Configured             | Testing framework           |
| Knip              | ✅ Configured             | Unused code detection       |
| TypeScript        | ⚠️ Installed but not used | `.jsx` not `.tsx`           |
| Prettier          | ❌ Not configured         | Missing code formatter      |
| Husky/Lint-staged | ❌ Not configured         | No pre-commit hooks         |

### Build & Deployment

- **Bundler:** Vite with React plugin
- **PWA:** `vite-plugin-pwa` with Workbox (configured)
- **Package Manager:** Yarn 1.22.22
- **CI/CD:** ❌ Not configured

---

## 3. Brand & Visual Identity Analysis

### Current Color Palette (from `index.css` & `tailwind.config.js`)

#### Light Mode

```css
--bg-color: #4c6663 /* Muted teal-green */ --bg-main: #ffffff /* White */ --bg-secondary: #fdfdfb
  /* Off-white */ --bg-tertiary: #a6b3b1 /* Light sage */ --bg-btn: #c2a57b /* Gold/tan */
  --primary-color: #3b82f6 /* Blue (default Tailwind) */ --accent: #ef4444 /* Red accent */;
```

#### Dark Mode

```css
--bg-color: #191919 /* Near black */ --bg-main: #141517 /* Darker black */ --bg-secondary: #191919
  /* Near black */ --bg-tertiary: #353535 /* Dark gray */ --bg-btn: #000000 /* Pure black */;
```

### Brand Assets

**Logos Found:**

- `xNeon.svg` - Light mode logo
- `logodark.png` - Dark mode logo
- `logoX.svg` - X branding
- `logoBlack.svg`, `logoLight.svg` - Variants
- `XCBcarbonNew21.png` - Token branding

**Membership Tiers:** Bronze, Silver, Gold, Platinum (badge assets present)

### Visual Identity Issues

❌ **Inconsistent Green Strategy**

- Current palette uses muted teal (`#4c6663`) NOT a vibrant sustainability green
- Gold (`#c2a57b`) competes with green as primary action color
- Default Tailwind blue (`#3b82f6`) still present as `--primary-color`
- No systematic green scale (100/500/700/900)

❌ **Dark Mode Problems**

- Pure black backgrounds (`#000000`, `#141517`) lack warmth
- Button color switches from gold to black (confusing)
- No dark-mode green strategy

❌ **Accessibility Concerns**

- No documented contrast ratios
- Gold text on white may fail WCAG AA
- Muted colors may not convey trust/action

❌ **Brand Clarity**

- Multiple logo variants without clear usage rules
- "Quantum xCarbon" vs "XCARBON" naming inconsistency
- No brand guidelines document

---

## 4. Content & Domain Analysis

### Application Features (20+ Pages)

#### Core Workflows

1. **Authentication** (Login, SignUp, 2FA, Password Reset)
2. **Dashboard** - Marketplace for carbon credit assets
3. **Portfolio** - User's tokenized carbon credit holdings
4. **Wallet** - Deposit/Withdraw tokenized credits
5. **Carbon Credit Tokenization** - Convert registry credits to XCB tokens
6. **Registry Asset Search** - Look up credits from Verra, Gold Standard, etc.
7. **List Tokenized Assets** - Marketplace listing management
8. **Mint Carbon Credits** - Create new tokenized assets
9. **Membership** - Tiered access (Bronze/Silver/Gold/Platinum)
10. **Settings** - User preferences
11. **Notifications** - System alerts
12. **Help** - Documentation

#### Supported Registries (from code)

- ✅ Verra Registry
- ✅ Gold Standard
- ✅ American Carbon Registry
- ✅ Climate Action Reserve

### Environmental Claims Assessment

#### Current Claims (from UI copy)

- "Carbon Credit Management Platform"
- "Convert registry carbon credits into XCB tokens"
- "Tokenized Carbon Credits"
- "Retire or Transfer" carbon credits
- References to "verification documents", "verification body", "registry documentation"

#### Compliance Status

✅ **Strengths:**

- References real registries (Verra, Gold Standard)
- Mentions verification bodies
- Includes serial numbers & vintage tracking
- Links to "registry documentation URL"
- Tracks issuance dates & quantities

⚠️ **Gaps (Legal Risk):**

- **No disclaimers** on double-counting prevention
- **No methodology** docs for how retirement/transfer works
- **No lifecycle assessment** data visible to users
- **No certification badges** (ISO 14021, registry logos)
- **Generic "sustainability" language** without specifics
- **No Impact Hub** showing real emissions avoided
- **No transparency** on gas fees vs. environmental benefit

❌ **Greenwashing Risks:**

- Terms like "eco-friendly" not used, but **no positive proof** of net environmental benefit
- **No data** on blockchain energy consumption (Polygon mentioned in code)
- **No third-party audit** references
- **No clear additionality** claims

---

## 5. Architecture & Code Health

### Frontend Architecture

**Pattern:** Feature-sliced pages + shared components + Zustand stores

**Strengths:**

- ✅ Consistent service/store pattern
- ✅ Zustand DevTools integration (`withDevtools.js`)
- ✅ Error boundaries implemented
- ✅ Protected routes for auth
- ✅ Form validation (Formik + Yup)
- ✅ API abstraction (`apiClient.js` supports REST + GraphQL toggle)

**Issues:**

- ⚠️ No TypeScript (type safety missing)
- ⚠️ No test coverage (Vitest configured but no tests found)
- ⚠️ Mixed state management (Zustand + Context for theme/sidebar)
- ⚠️ Hard-coded colors in components (not using Tailwind tokens consistently)
- ⚠️ Button component has 14 variants (over-engineered)
- ⚠️ No code-splitting strategy (no `lazy` imports detected)

### Component Library

**17 component families identified:**

- Accordion, AppLayout, Auth, Breadcrumb, Button, Card, Chart
- DateRangePicker, Dropdown, ErrorBoundary, Form, Input, List
- Loader, Modals, Model, NotificationPopup, PWA, ScrollBarWrapper
- Select, Sidebar, Table, Tabs, ThemeProvider, Toggler, Typography

**Storybook Coverage:** ✅ Many components have `.stories.jsx` files

**Accessibility:**

- ✅ Storybook a11y addon installed
- ⚠️ No documented a11y testing results
- ⚠️ No keyboard nav testing mentioned
- ⚠️ Ripple effect in Button may not be perceivable by screen readers

### Data Layer

**Services:** 12 service files for API communication

- `authService`, `dashboardService`, `depositService`, `listAssetsService`
- `mintingCarbonAssetsService`, `notificationService`, `portfolioService`
- `registryAssetsService`, `settingsService`, `walletService`
- `withdrawTokenizedCarbonCreditService`

**API Client:** Supports REST & GraphQL (toggle via config)

**State Management:**

- Zustand stores mirror services (1:1 mapping)
- DevTools enabled for debugging

---

## 6. Developer Experience & Infrastructure

### Build System

- ✅ Vite with HMR
- ✅ PWA plugin configured (auto-update, offline support)
- ✅ Path aliases (`@/` → `src/`)
- ✅ Vitest + Storybook integration

### Code Quality

| Tool          | Status        | Notes                   |
| ------------- | ------------- | ----------------------- |
| ESLint        | ✅ Configured | React + Storybook rules |
| Prettier      | ❌ Missing    | No `.prettierrc`        |
| Husky         | ❌ Missing    | No git hooks            |
| Commitlint    | ❌ Missing    | No conventional commits |
| Type Checking | ❌ Missing    | No `tsc` script         |

### Scripts Available

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "knip": "knip",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

**Missing Scripts:**

- `test` (Vitest not wired to npm script)
- `type-check` (TypeScript installed but not used)
- `format` (Prettier)
- `pre-commit` (Lint-staged)

### CI/CD

❌ **No CI/CD detected**

- No `.github/workflows/` directory
- No `Dockerfile` or `docker-compose.yml`
- No deployment config (Vercel/Netlify/AWS)
- No environment variable documentation (no `.env.example`)

---

## 7. Performance & Web Vitals

### Current Optimizations

✅ **In Place:**

- PWA with aggressive caching (Google Fonts cached for 365 days)
- Vite's automatic code-splitting for routes
- Tailwind CSS purging (via default config)
- Image assets in SVG format (optimized)

⚠️ **Missing:**

- No `next/image` equivalent (using plain `<img>` tags)
- No lazy loading for heavy components (Chart.js, Table)
- No bundle size analysis script
- No Lighthouse CI integration
- No performance budgets defined

### Bundle Size Concerns

- **Chart.js** (4.4.9) - Large library (~200KB)
- **Framer Motion** (12.23.6) - Animation library (~100KB)
- **@heroui/react** - Full UI library import (potential tree-shaking issue)
- **react-window** - Good choice for large lists ✅

---

## 8. Accessibility (a11y)

### Positive Signals

- ✅ Storybook a11y addon installed
- ✅ Semantic HTML in components (Typography, Breadcrumb)
- ✅ ARIA labels in some components
- ✅ Focus management in modals (likely from @heroui)

### Gaps

- ⚠️ No documented WCAG level target (AA or AAA)
- ⚠️ No keyboard navigation testing
- ⚠️ No screen reader testing notes
- ⚠️ Color contrast not validated (gold on white likely fails)
- ⚠️ Ripple effect (Button) is visual-only feedback
- ⚠️ Charts may not have text alternatives

---

## 9. Security & Compliance

### Authentication

- ✅ Protected routes implemented (`ProtectedRoute.jsx`)
- ✅ 2FA support (`TwoFactorAuth.jsx`)
- ✅ JWT likely (common pattern in `authService.js`)

### Data Handling

- ⚠️ No input sanitization visible in code
- ⚠️ No CSRF protection mentioned
- ⚠️ No rate limiting on API calls
- ⚠️ GraphQL queries not parameterized (SQL injection analog)

### Environmental Compliance

- ❌ **No CMA Green Claims Code** compliance checks
- ❌ **No ISO 14021** references
- ❌ **No legal disclaimers** on carbon accounting
- ❌ **No data methodology** documentation
- ❌ **No audit trail** for retirement claims

---

## 10. Content & Copywriting Quality

### Tone & Voice

**Current:** Technical, blockchain-focused ("tokenize", "mint", "burn", "blockchain")  
**Missing:** Emotional connection to climate impact, storytelling, proof of real-world benefit

### UX Copy Examples

```
"Convert your registry carbon credits into XCB tokens"
→ Clear, but lacks "why" (user benefit)

"Tokenized Carbon Credits"
→ Jargon-heavy for non-crypto users

"Submit for Tokenization"
→ Process-oriented, not outcome-oriented
```

### Recommended Copy Direction

- Lead with **impact** ("Offset 10 tons of CO₂" not "Mint 10 tokens")
- Add **proof** ("Verified by Gold Standard" + badge)
- Simplify **jargon** ("Digital carbon credits" not "Tokenized assets")
- Show **transparency** ("View full methodology" link)

---

## 11. Content Gaps (Critical for Ecology Projects)

### Missing Pages/Sections

1. **Mission & Impact** - No "About" or "Our Mission" page
2. **Proof Hub** - No dedicated page for certifications, LCAs, audits
3. **How It Works** - No step-by-step explainer for non-experts
4. **Impact Dashboard** - No live KPIs (tons offset, trees planted equiv.)
5. **Roadmap** - No transparency on future decarbonization steps
6. **Compliance & Governance** - No legal/regulatory compliance page
7. **FAQ** - No page despite "Help" route existing (may be placeholder)
8. **Partner Logos** - No trust signals (registry logos, NGO partnerships)

### Content Structure Issues

- **No hero section** with clear value prop
- **No social proof** (testimonials, case studies)
- **No educational content** (blog, guides)
- **No calls-to-action** beyond transactional buttons

---

## 12. Key Findings Summary

### ✅ Strengths

1. **Modern tech stack** (React 19, Vite, Tailwind, Zustand)
2. **Well-organized codebase** (services/stores/components separation)
3. **PWA-ready** (offline support, install prompts)
4. **Real registry integration** (Verra, Gold Standard)
5. **Storybook + a11y tooling** (foundation for quality)
6. **Comprehensive features** (tokenization, portfolio, marketplace)

### ❌ Critical Issues

1. **Brand identity crisis** - Inconsistent greens, no systematic palette
2. **No TypeScript** - Missing type safety despite dependency
3. **No CI/CD** - No automated testing/deployment
4. **Greenwashing risk** - Vague claims without proof/methodology
5. **Accessibility gaps** - No testing, contrast issues likely
6. **Missing docs** - No README explaining domain, no `.env.example`
7. **No testing** - Vitest configured but no tests written
8. **Performance unknowns** - No Lighthouse reports, no budgets

### ⚠️ Medium Priority

1. **Code consistency** - Mix of JSX/TypeScript, inline styles vs Tailwind
2. **Component bloat** - Button has 14 variants (over-engineered)
3. **State management** - Zustand + Context mix (pick one pattern)
4. **Bundle size** - Large dependencies (Chart.js, Framer Motion)
5. **Security** - No visible input sanitization, CSRF protection

---

## 13. Recommendations for Modernization

### Phase 1: Brand & Trust (Weeks 1-2)

1. **Refresh color palette** with systematic green scale (see MODERNIZATION_STRATEGY)
2. **Create Mission/Impact page** with proof points
3. **Add certification badges** to all pages (Verra, Gold Standard logos)
4. **Write compliance disclaimers** (double-counting, methodology links)

### Phase 2: Code Quality (Weeks 3-4)

1. **Migrate to TypeScript** (rename `.jsx` → `.tsx`, add types)
2. **Add Prettier + Husky** (pre-commit formatting)
3. **Write unit tests** (aim for 70%+ coverage on services/stores)
4. **Set up CI/CD** (GitHub Actions: lint, test, build, deploy)

### Phase 3: UX & Accessibility (Weeks 5-6)

1. **Audit color contrast** (fix gold-on-white, ensure WCAG AA)
2. **Add keyboard nav** testing + focus indicators
3. **Implement code-splitting** (lazy load Chart.js, Table)
4. **Run Lighthouse CI** (set perf budget: ≥90 on all metrics)

### Phase 4: Content & Compliance (Weeks 7-8)

1. **Create Impact Dashboard** (live emissions avoided, charts)
2. **Write How It Works** page (with diagrams)
3. **Add Methodology docs** (LCA, retirement process)
4. **Launch FAQ** with compliance answers (CMA Green Claims Code)

---

## 14. Unknowns & Assumptions

### ❓ Unknowns (Requires Stakeholder Input)

1. **Target Java version** - Blockchain network? (Polygon/Ethereum?)
2. **Backend tech stack** - Not visible in this repo (separate microservices?)
3. **API authentication** - JWT? OAuth? API keys?
4. **Deployment target** - AWS? Vercel? Self-hosted?
5. **User personas** - B2B (corporations) or B2C (individuals)?
6. **Revenue model** - Transaction fees? Subscription (membership tiers)?
7. **Legal jurisdiction** - Which country's regulations apply?
8. **Audit status** - Have carbon accounting claims been third-party verified?

### 🎯 Assumptions Made

1. **GraphQL API exists** - `apiClient.js` supports it but no schema found
2. **Polygon blockchain** - Mentioned in `TokenizationPreview.jsx` ("MATIC")
3. **REST API fallback** - Dual support implies legacy migration
4. **B2B focus** - Complexity suggests corporate users, not consumers
5. **Pre-revenue** - v0.0.0 suggests early stage
6. **US/UK compliance target** - CMA Green Claims Code (UK) relevant

---

## 15. Next Steps

1. **Review this discovery report** with stakeholders
2. **Clarify unknowns** (especially legal/compliance requirements)
3. **Proceed to MODERNIZATION_STRATEGY.md** (targets, phases, impact)
4. **Select brand palette** (A/B/C from research brief)
5. **Generate MODERNIZATION_PROMPT.md** (executable by implementation agent)

---

**Document Version:** 1.0  
**Generated By:** Meta-Agent (ProtoPrompt Generator)  
**Date:** October 30, 2025  
**Project:** XCARBON Carbon Credit Tokenization Platform
