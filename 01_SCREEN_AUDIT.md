# 01_SCREEN_AUDIT.md

## Purpose

This document provides an evidence-based audit of all XCARBON DApp screens captured in the screenshots folder. It identifies redundancy, fragmentation, and opportunities for consolidation through modalization and simplified information architecture.

---

## Inventory Table

| File | Inferred Route | H1/Title | Primary Action | Key Components | Unique Data | Repeated Data | Modalizable? | Notes |
|------|---------------|----------|----------------|----------------|-------------|---------------|--------------|-------|
| `login-*-desktop.png` | `/login` | Login | Sign In | Email, Password, Remember Me, 2FA link, Forgot Password | None | None | No | Keep as page - primary entry point |
| `signup-*-desktop.png` | `/signup` | Sign Up | Create Account | Account type, Name, Email, Password, T&C | None | None | No | Keep as page - complex registration |
| `forgot-password-*-desktop.png` | `/forgot-password` | Forgot Password | Send Reset Link | Email input | None | None | **Yes** | Simple single-field form - modal from login |
| `dashboard-*-desktop.png` | `/` | Dashboard | Stake Credits | Portfolio hero metrics, Quick actions, Metric grid (3 cards), Impact section, Coming Soon | Total Portfolio Value, YTD/24H Change, ATH, Total Returns, Staked, Monthly Earnings, Available Balance | Portfolio metrics | No | Keep as primary page |
| `portfolio-*-desktop.png` | `/portfolio` | Portfolio | (Various) | Hero metrics, 3-column metric grid, Tabs (Open Positions, History, Pending), Active Agreements table | Open Positions value, Historical Value, Pending Contracts | **Portfolio Value, YTD Change** (same as Dashboard) | No | Keep but remove duplicate hero metrics |
| `wallet-*-desktop.png` | `/wallet` | Wallet | Send | Hero balance, Quick actions, Metric grid (3 cards), Asset cards (XCC, USDC, ETH), Recent Activity | Wallet balance, Address, Assets by token | Total balance metric | No | Keep as primary page |
| `wallet-deposit-*-desktop.png` | `/wallet/deposit` | Deposit | Continue to Payment | Fiat form (currency, amount, method), Crypto form (asset, network, address), Deposit history table | Deposit-specific forms | None | **Yes** | Complex but candidate for modal/drawer from Wallet |
| `marketplace-*-desktop.png` | `/marketplace` | Marketplace | Buy Now (per asset) | Asset grid, Filter panel, Sort options | Marketplace assets | None | No | Keep - primary discovery page |
| `assets-*-desktop.png` | `/assets` | Carbon Credit Assets | (Various) | Registry view, Progress indicators, Project cards | Registry-specific projects | Asset browsing (similar to Marketplace) | **Merge** | Merge with Marketplace as tabs/filters |
| `list-assets-*-desktop.png` | `/list-tokenized-assets` | List Assets | Confirm Listing | Asset selector, Project info card, Listing form (quantity, method, price, duration) | Listing flow | None | **Yes** | Modal/drawer from Wallet or Portfolio - single task |
| `tokenization-*-desktop.png` | `/carbon-credit-tokenization` | Tokenization | Submit for Tokenization | Multi-step form (Registry, Project ID, Amount, Vintage, Documents), Process info panel | Tokenization workflow | None | **Yes** | Multi-step wizard modal - focused task |
| `membership-*-desktop.png` | `/membership` | Membership | Choose Plan | Current balance, Current plan card, 4 tier cards (Bronze/Silver/Gold/Platinum), Benefits cards, Transaction history | Tier system, Staking info | None | No | Keep page; stake/unstake actions as modals |
| `settings-*-desktop.png` | `/settings` | Settings | (Multiple) | Profile card, Security card (Password, MFA, API), Preferences (Language, Theme), Delete Account | User preferences | None | No | Keep page; forms (password, MFA, API) as modals |
| `notifications-*-desktop.png` | `/notifications` | Notifications | (Various) | Notification list, Filter (All/Unread/Read), Type indicators | Notification feed | None | No | Keep page; detail view as modal/drawer |
| `help-*-desktop.png` | `/help` | Help & Support | Contact Us | Search bar, FAQ accordion, Contact form | Support resources | None | No | Keep page; Contact form as modal |

### Missing Screenshots (Referenced in Routes)

| Route | Screen | Status | Notes |
|-------|--------|--------|-------|
| `/wallet/withdraw-tokenized-carbon-credit` | Withdraw | Not captured | <!-- TODO: need screenshot --> - Likely candidate for modal |
| `/project-detail/:assets-id` | Project Detail | Not captured | <!-- TODO: need screenshot --> - Likely candidate for drawer from marketplace list |
| `/assets/look-up` | Asset Lookup | Not captured | <!-- TODO: need screenshot --> - Likely merge into Marketplace advanced search |
| `/MintCarbonCreditsSummary` | Mint Credits | Not captured | <!-- TODO: need screenshot --> - Similar to Tokenization, modal candidate |
| `/notifications/:id` | Notification Detail | Not captured | <!-- TODO: need screenshot --> - Definitely modal/drawer |
| `/2fa` | Two Factor Auth | Not captured | Should be part of login flow, not standalone route |
| `/reset-password` | Reset Password | Not captured | Modal/inline flow from email link |
| `/logout` | Logout | Not captured | Should be action with confirmation modal, not page |
| `/test-error` | Test Error | Not captured | Dev-only, hide behind flag |

---

## Feature Domain Clusters

### 1. Authentication (Public Screens)
- **Keep as Pages**: Login, Sign Up
- **Convert to Modals**: Forgot Password (from login), Reset Password (inline from email link)
- **Integrate into Flow**: 2FA (part of login, not standalone)
- **Remove as Route**: Logout (action with confirmation modal)

**Findings**:
- Forgot Password is simple enough for modal treatment
- 2FA should appear inline during login, not as separate route
- Logout should not be a page - just an action

### 2. Dashboard & Overview
- **Current**: Single dashboard page with hero metrics, quick actions, metrics grid, impact section
- **Redundancy**: Portfolio Value metrics repeated in Portfolio page
- **Recommendation**: Keep Dashboard as primary KPI view; reduce Portfolio hero prominence

### 3. Portfolio Management
- **Current**: Portfolio page with hero metrics, 3-column grid, tabbed tables (Open Positions, History, Pending)
- **Redundancy**: Duplicate hero metrics from Dashboard (Total Portfolio Value, YTD Change)
- **Recommendation**: 
  - Remove or downsize hero metrics to compact header
  - Move "Active Positions (Coming Soon)" from Dashboard into Portfolio → Open Positions tab
  - Keep table-heavy analysis interface

### 4. Wallet & Transactions
- **Current Routes**: `/wallet`, `/wallet/deposit`, `/wallet/withdraw-tokenized-carbon-credit`
- **Primary Page**: Wallet overview with balance, assets, recent activity
- **Modal Candidates**:
  - Deposit (complex but self-contained)
  - Withdraw (similar structure to Deposit)
  - Send/Receive (currently just buttons, likely trigger modals)
  - Transaction detail (from activity list)
  
**Findings**:
- Deposit page has two distinct forms (Fiat & Crypto) + history table - could be drawer
- Withdraw likely mirrors Deposit structure - drawer candidate
- Send/Receive should be lightweight modals from Wallet main view

### 5. Marketplace & Registry
- **Current Routes**: `/marketplace`, `/assets`, `/assets/look-up`, `/project-detail/:assets-id`
- **Redundancy**: Marketplace and Registry Assets show similar browse/filter patterns
- **Recommendation**:
  - **Merge** `/marketplace` and `/assets` into single Marketplace with tabs: "All", "Marketplace", "Registry", "Favorites"
  - Convert `/assets/look-up` into **Advanced Search/Filter panel** inside unified Marketplace
  - Keep `/project-detail/:assets-id` but consider **drawer/side sheet** from list view for shallow content
  - Only escalate to full page if detail contains complex sub-flows (gallery, calculators, deep updates)

**Fragmentation Score**: HIGH - two separate browse experiences for similar content

### 6. Tokenization & Minting
- **Current Routes**: `/carbon-credit-tokenization`, `/MintCarbonCreditsSummary`, `/list-tokenized-assets`
- **Similarity**: All are focused task flows with forms
- **Recommendation**:
  - Convert Tokenization to **multi-step modal wizard** (Submit → Verify → Convert → Transfer) - launched from Wallet or Portfolio
  - Convert Mint to **modal wizard** (similar pattern, unless deeply complex)
  - Convert List Assets to **modal/drawer** from Wallet/Portfolio asset cards - single task

**Fragmentation Score**: MEDIUM - three separate pages for related asset management tasks

### 7. Membership & Staking
- **Current**: Single `/membership` page with tier cards, benefits, transaction history
- **Recommendation**:
  - Keep as page (complex enough)
  - Open Stake/Unstake actions as **modals**
  - Calculator, Tier change as **modals**
  - Collapse informational cards into accordions/sections

### 8. Settings
- **Current**: Single `/settings` page with cards for Profile, Security, Preferences, Sessions
- **Recommendation**:
  - Keep as page
  - Open Change Password, MFA Setup, API Keys as **modals**
  - Keep Delete Account as modal with strong confirmation
  - Remove separate routes for forms - they should be modals from Settings cards

### 9. Notifications
- **Current Routes**: `/notifications`, `/notifications/:id`
- **Recommendation**:
  - Keep `/notifications` list page
  - **Remove** `/notifications/:id` route
  - Open detail in **modal/drawer** from list item click
  - Add bulk actions (mark all read, delete) inline

### 10. Help & Support
- **Current**: Single `/help` page
- **Recommendation**:
  - Keep as page with search, FAQ accordion
  - Contact form opens as **modal** (simple form)
  - Avoid separate routes for FAQ categories

---

## Duplication Heatmap

### Critical Duplications (Same Content, Multiple Locations)

1. **Portfolio Value Metrics** 🔴 HIGH IMPACT
   - **Dashboard Hero**: Total Portfolio Value, YTD Change, 24H Change, ATH, Total Returns
   - **Portfolio Hero**: Total Portfolio Value, YTD Change, Total Credits, Active Positions, Average Cost Basis
   - **Overlap**: Portfolio Value and YTD Change shown prominently in both
   - **Impact**: User confusion about single source of truth
   - **Fix**: Show prominently on Dashboard only; compact header on Portfolio

2. **Asset Browsing** 🟠 MEDIUM IMPACT
   - **Marketplace**: Browse and filter carbon credit assets
   - **Registry Assets**: Browse registry-specific projects
   - **Overlap**: Both show filterable asset grids with similar patterns
   - **Impact**: Split attention, unclear which to use
   - **Fix**: Merge into single Marketplace with Registry tab/filter

3. **Quick Actions** 🟡 LOW-MEDIUM IMPACT
   - **Dashboard**: "Stake Credits", "Buy Credits", "Claim Rewards"
   - **Wallet**: "Send", "Receive", "Swap"
   - **No direct overlap**, but could benefit from unified action bar pattern

4. **Transaction History** 🟡 LOW IMPACT
   - **Wallet**: Recent Activity with filter tabs
   - **Portfolio**: Historical Trades tab
   - **Membership**: Transaction history table
   - **Overlap**: All show transaction lists with similar patterns
   - **Impact**: Multiple places to find transaction data
   - **Fix**: Establish primary location per transaction type; link between views

### Visual Pattern Redundancy

1. **MetricCard Component** ✅ GOOD
   - Used consistently across Dashboard, Portfolio, Wallet
   - **No issue** - this is intentional design system usage

2. **Hero Sections** 🟠 NEEDS STANDARDIZATION
   - Dashboard: Gradient background, hero number, 5 metrics
   - Portfolio: Gradient background, hero number, 5 metrics (different)
   - Wallet: Gradient background, hero balance, 3 quick stats
   - **Recommendation**: Standardize hero pattern; use variation for emphasis hierarchy

3. **Table Components** ✅ GOOD
   - Consistent styling across Portfolio, Membership, Wallet
   - Search, filter, pagination patterns match

---

## Top 10 Redundancies

1. **Portfolio Value shown in both Dashboard and Portfolio heroes** - Remove from Portfolio or downsize
2. **Marketplace vs Registry Assets as separate browse experiences** - Merge into tabs
3. **Deposit as full route when it's a focused task** - Convert to drawer/modal from Wallet
4. **Withdraw as full route (assumed)** - Convert to drawer/modal from Wallet
5. **List Assets as standalone page** - Convert to modal from Wallet/Portfolio
6. **Notification detail as separate route** - Convert to modal/drawer
7. **Forgot Password as page** - Convert to modal from Login
8. **Logout as route** - Convert to action with confirmation modal
9. **Asset Lookup as separate subroute** - Integrate as advanced search/filter in Marketplace
10. **Tokenization as full page** - Convert to multi-step modal (if content allows)

---

## Top 10 Complexity Contributors

1. **Portfolio page** - Dense with 3 tabs, multiple tables, metrics grid, hero section
2. **Wallet page** - Many sections: hero, actions, metrics, asset cards, activity feed
3. **Deposit/Withdraw** - Full-page forms with history tables (could be simplified as drawers)
4. **Settings** - Multiple cards each with modals (good pattern, but could be streamlined)
5. **Membership** - Tier cards, benefits, transaction history (content-heavy but justified)
6. **Dashboard** - Many sections, but appropriate for overview page
7. **Marketplace** - Filter panel, sort, grid view (standard complexity)
8. **Tokenization** - Multi-step form with document upload (justified complexity)
9. **Notifications** - List with detail routes (detail route adds unnecessary complexity)
10. **Registry Assets** - Separate from Marketplace adds cognitive load

---

## Modal/Drawer Candidates (Prioritized)

### High Priority (Clear Wins)

| Screen | Current Route | Convert To | Launch From | Justification |
|--------|---------------|------------|-------------|---------------|
| Forgot Password | `/forgot-password` | Modal | Login page "Forgot?" link | Single field, quick task |
| Notification Detail | `/notifications/:id` | Drawer | Notifications list item | Readable detail, keep context |
| List Assets | `/list-tokenized-assets` | Modal | Wallet asset card → "List" button | Single-task form, 5-6 fields |
| Asset Lookup | `/assets/look-up` | Search Panel | Marketplace "Advanced Search" toggle | Search refinement, not destination |
| Logout | `/logout` | Modal | Sidebar "Logout" action | Confirmation only, no page needed |

### Medium Priority (Strong Candidates)

| Screen | Current Route | Convert To | Launch From | Justification |
|--------|---------------|------------|-------------|---------------|
| Deposit | `/wallet/deposit` | Drawer | Wallet "Deposit" button | Self-contained forms, keep Wallet context visible |
| Withdraw | `/wallet/withdraw-tokenized-carbon-credit` | Drawer | Wallet "Withdraw" button | Mirrors Deposit pattern |
| Tokenization | `/carbon-credit-tokenization` | Modal Wizard | Wallet/Portfolio → "Tokenize" action | 4-step focused flow, could work as modal |
| Project Detail | `/project-detail/:id` | Drawer | Marketplace/Registry item click | Detail view from list, unless complex sub-flows exist |
| Transaction Detail | (Currently inline) | Modal/Drawer | Activity list item click | Quick detail view |

### Low Priority (Consider Later)

| Screen | Current Route | Convert To | Launch From | Justification |
|--------|---------------|------------|-------------|---------------|
| Mint Credits | `/MintCarbonCreditsSummary` | Modal Wizard | Wallet/Dashboard action | Similar to Tokenization; depends on complexity |
| Stake/Unstake | (Assumed from buttons) | Modal | Membership tier cards | Simple confirmation flows |
| Settings Forms | (Password, MFA, API) | Modal | Settings card "Edit/Manage" buttons | Already planned in design |

---

## Missing States & Gaps

### Empty States
- **Dashboard**: Coming Soon for Active Positions - ✅ Present
- **Portfolio**: Need empty states for:
  - No Open Positions
  - No Historical Trades
  - No Pending Contracts
- **Wallet**: Need empty state for:
  - No Assets (new user)
  - No Recent Activity
- **Marketplace**: Need empty state for:
  - No results from filters
  - No favorites
- **Notifications**: Need empty state for:
  - No notifications

### Loading States
- Tables: Need skeleton loaders (check if implemented)
- Asset cards: Need loading shimmer
- Forms: Need button loading states (likely present)
- Metrics: Need loading state for hero numbers

### Error States
- Form validation errors: Likely present
- API errors: Need error boundaries and retry patterns
- Network errors: Need offline indicators
- 404 for invalid projects/assets

### Missing Confirmations
- Delete actions: Need confirmation modals
- Irreversible actions (retire credits, etc.): Need strong warnings
- Large transactions: Need review/confirm step
- Logout: Need confirmation modal

---

## Visual Audit Observations

### Strengths
- ✅ Consistent MetricCard pattern across domains
- ✅ Clear navigation hierarchy (sidebar)
- ✅ Good use of color-coded badges (status, type)
- ✅ Readable typography with good contrast
- ✅ Hero sections create visual hierarchy
- ✅ Table patterns are consistent
- ✅ Theme switching works across all screens
- ✅ Brand green palette is subtle and professional

### Areas for Improvement
- 🟠 Too many hero sections compete for attention
- 🟠 Some gradients may be too prominent (risk of "web3-ish" feel)
- 🟠 Need more white space in dense pages (Portfolio, Settings)
- 🟠 Ensure WCAG AA contrast on all gradient backgrounds
- 🟠 Modal/drawer patterns not yet visible (need implementation)
- 🟠 Reduce glassmorphism effects for more professional fintech look
- 🟠 Standardize card elevation (shadows)

### Accessibility Considerations
- Need to verify keyboard navigation for all interactions
- Need ARIA labels for icon-only buttons
- Need focus indicators on all interactive elements
- Color-coded status must have icon/text fallbacks (color-blind users)
- Need to test with screen readers

---

## Comparative Analysis

### Before State (Current)
- **Total Routes**: 23 (including all `/wallet/*`, `/assets/*`, `/notifications/:id`)
- **Full Pages**: 20+ screens
- **Modals/Drawers**: Minimal (some in Settings)
- **KPI Sources**: Multiple (Dashboard hero, Portfolio hero)

### After State (Target - from this audit)
- **Total Routes**: ~12-15 (reduced by 35-40%)
- **Full Pages**: 10-12 core screens
- **Modals/Drawers**: 8-10 focused tasks
- **KPI Sources**: Single source of truth (Dashboard), contextual displays elsewhere

---

## Risk Assessment

### High Risk Changes
1. **Merging Marketplace + Registry**: User workflows may differ; need user research
2. **Converting Deposit/Withdraw to drawers**: Complex forms may feel cramped
3. **Removing Portfolio hero metrics**: May disrupt user mental models

### Medium Risk Changes
1. **Notification detail as modal**: Users may want deep-link sharing
2. **Tokenization as modal**: Multi-step flows can be complex in modals
3. **Project detail as drawer**: May need full page for deep content

### Low Risk Changes
1. **Forgot Password as modal**: Standard pattern, low cognitive load
2. **Logout as action**: Standard pattern, removes unnecessary route
3. **List Assets as modal**: Simple focused task
4. **Asset Lookup as search panel**: Enhances rather than restricts

### Mitigation Strategies
- **A/B test** high-risk changes with user cohorts
- **Provide escape hatches**: Option to "Open in new tab" for modals/drawers
- **Maintain URL state**: Modals should update URL params for deep linking
- **Progressive rollout**: Phase changes over multiple releases
- **User feedback loops**: Gather input before finalizing

---

## Recommendations Summary

### Immediate Actions (High Impact, Low Risk)
1. ✅ Remove duplicate Portfolio Value metrics from Portfolio page hero
2. ✅ Convert Forgot Password to modal from Login
3. ✅ Convert Logout to action with confirmation modal
4. ✅ Convert Notification detail to drawer/modal
5. ✅ Remove `/assets/look-up` as separate route; integrate as advanced search

### Short-term Actions (High Impact, Medium Risk)
1. 🟠 Merge Marketplace and Registry Assets into unified view with tabs
2. 🟠 Convert Deposit and Withdraw to drawers from Wallet
3. 🟠 Convert List Assets to modal from Wallet/Portfolio
4. 🟠 Standardize hero section patterns and reduce visual competition

### Medium-term Actions (Medium Impact, Needs Validation)
1. 🔵 Convert Tokenization to multi-step modal wizard
2. 🔵 Evaluate Project Detail as drawer vs full page (content-dependent)
3. 🔵 Implement comprehensive empty/loading/error states
4. 🔵 Reduce glassmorphism effects for more professional fintech aesthetic

---

## Next Steps

This audit serves as the foundation for:
1. **`02_IA_RATIONALIZATION_PLAN.md`** - Detailed before/after navigation map and flow rewrites
2. **`03_UI_PATTERNS_AND_COMPONENTS.md`** - Standardized UI kit and modal/drawer specs
3. **`04_IMPLEMENTATION_PROMPT.md`** - Task-ready execution plan for implementation agent

**Audit Completed**: November 1, 2025  
**Total Screenshots Analyzed**: 16 desktop views (light + dark variants)  
**Missing Screenshots Identified**: 9 routes without captures  
**Modal/Drawer Candidates**: 13 screens flagged for conversion  
**Redundancies Identified**: 10 critical duplications  
**Complexity Contributors**: 10 screens requiring simplification attention

---

**Status**: ✅ Ready for IA Rationalization Planning
