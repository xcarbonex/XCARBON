# 02_IA_RATIONALIZATION_PLAN.md

## Purpose

This document provides the simplified Information Architecture (IA) for XCARBON DApp, with clear before/after navigation maps, modalization decisions, flow rewrites, and KPI de-duplication policy.

---

## Executive Summary

**Current State**: 23 routes, fragmented user flows, duplicate KPIs across multiple screens  
**Target State**: 12-15 core routes, modal/drawer-based secondary flows, single source of truth for metrics  
**Reduction**: ~35-40% fewer routes, improved user focus and task completion

**Key Changes**:
- Merge Marketplace + Registry Assets into unified Marketplace with tabs
- Convert 8+ focused tasks (Deposit, Withdraw, List Assets, etc.) to modals/drawers
- Remove notification detail, forgot password, logout as standalone routes
- Eliminate duplicate portfolio metrics from Portfolio page
- Integrate asset lookup as advanced search panel

---

## Before → After Navigation Map

### Before (Current - 23 Routes)

```
PUBLIC ROUTES (5)
├─ /login
├─ /signup
├─ /forgot-password
├─ /reset-password
└─ /2fa

AUTHENTICATED ROUTES (15+)
├─ / (Dashboard)
├─ /marketplace
├─ /project-detail/:id
├─ /portfolio
├─ /wallet
│  ├─ /wallet/deposit
│  └─ /wallet/withdraw-tokenized-carbon-credit
├─ /assets
│  ├─ /assets (Progress view)
│  └─ /assets/look-up
├─ /carbon-credit-tokenization
├─ /MintCarbonCreditsSummary
├─ /list-tokenized-assets
├─ /membership
├─ /settings
├─ /notifications
├─ /notifications/:id
├─ /help
└─ /logout

UTILITY ROUTES (3)
├─ /test-error (dev only)
└─ /404
```

### After (Target - 12-15 Routes)

```
PUBLIC ROUTES (3)
├─ /login
│  └─ Triggers: Forgot Password Modal, 2FA inline flow
├─ /signup
└─ [Reset Password handled via email token, inline on /login]

AUTHENTICATED ROUTES (9-10)
├─ / (Dashboard)
│  └─ Modals: Stake Credits, Buy Credits, Claim Rewards
│
├─ /marketplace (MERGED with /assets)
│  ├─ Tabs: All | Marketplace | Registry | Favorites
│  ├─ Advanced Search Panel (replaces /assets/look-up)
│  └─ Drawer: Project Detail (from list item click)
│     └─ Modal: Quick Buy, Add to Favorites
│
├─ /portfolio
│  ├─ Tabs: Open Positions | Historical Trades | Pending Contracts | Active Agreements
│  └─ Modals: Filter trades, Export data
│
├─ /wallet
│  ├─ Asset Cards with inline actions
│  ├─ Drawer: Deposit (from "Deposit" button)
│  ├─ Drawer: Withdraw (from "Withdraw" button)
│  ├─ Modal: Send (from asset card or "Send" button)
│  ├─ Modal: Receive (from "Receive" button)
│  ├─ Modal: Swap (from asset card "Swap" button)
│  ├─ Modal: List Asset (from asset card → "List for Sale")
│  ├─ Modal: Tokenize Credits (from "Tokenize" action)
│  └─ Drawer: Transaction Detail (from activity list item)
│
├─ /membership
│  └─ Modals: Stake XCB, Unstake XCB, Tier Calculator, Upgrade Tier
│
├─ /settings
│  └─ Modals: Edit Profile, Change Password, MFA Setup, API Keys, Delete Account
│
├─ /notifications
│  └─ Drawer: Notification Detail (from list item click)
│
├─ /help
│  └─ Modal: Contact Support
│
└─ [Logout is action with confirmation modal, not route]

UTILITY ROUTES (2)
├─ /test-error (dev only, feature flag)
└─ /404
```

---

## Final Routes with Purpose Statements

### Public Routes

| Route | Purpose | Notes |
|-------|---------|-------|
| `/login` | Secure authentication gateway | Inline 2FA during flow; triggers Forgot Password modal |
| `/signup` | New user registration | Complex form, KYC triggers, account type selection |
| `/404` | Handle invalid routes gracefully | Show helpful navigation and search |

**Removed Routes**:
- ❌ `/forgot-password` → Modal from `/login`
- ❌ `/reset-password` → Inline form on `/login` with token validation
- ❌ `/2fa` → Inline step during login flow, not standalone

---

### Core Authenticated Routes

| Route | Purpose | Tab/Segment Structure | Modal/Drawer Triggers |
|-------|---------|----------------------|----------------------|
| `/` | Central hub with global KPIs and quick actions | None (single view) | Stake Credits, Buy Credits, Claim Rewards modals |
| `/marketplace` | **Unified** asset browsing (marketplace + registry) | **Tabs**: All \| Marketplace \| Registry \| Favorites<br>**Advanced Search Panel** (replaces lookup) | **Drawer**: Project Detail<br>**Modal**: Quick Buy, Add to Favorites |
| `/portfolio` | Holdings, trades, agreements, analysis | **Tabs**: Open Positions \| Historical Trades \| Pending Contracts \| Active Agreements | Filter, Export modals |
| `/wallet` | Digital asset management, transactions | Asset Cards, Recent Activity | **Drawers**: Deposit, Withdraw, Transaction Detail<br>**Modals**: Send, Receive, Swap, List Asset, Tokenize |
| `/membership` | Staking tiers, benefits, transaction history | None (single view with cards) | Stake, Unstake, Calculator, Upgrade modals |
| `/settings` | Account preferences, security, profile | Cards for Profile, Security, Preferences, Sessions | Edit Profile, Change Password, MFA, API Keys, Delete Account modals |
| `/notifications` | Alerts and messages feed | Filter tabs: All \| Unread \| Read | **Drawer**: Notification Detail |
| `/help` | Self-service support, FAQ, resources | FAQ Accordion, Resources sections | Contact Support modal |

**Removed Routes**:
- ❌ `/assets` → Merged into `/marketplace` as "Registry" tab
- ❌ `/assets/look-up` → Advanced Search panel in `/marketplace`
- ❌ `/wallet/deposit` → Drawer from `/wallet`
- ❌ `/wallet/withdraw-tokenized-carbon-credit` → Drawer from `/wallet`
- ❌ `/list-tokenized-assets` → Modal from `/wallet` or `/portfolio`
- ❌ `/carbon-credit-tokenization` → Modal wizard from `/wallet`
- ❌ `/MintCarbonCreditsSummary` → Modal wizard (or keep as page if truly complex - TBD)
- ❌ `/notifications/:id` → Drawer from notification list
- ❌ `/logout` → Action with confirmation modal

---

## Tab/Segment Plans

### 1. Marketplace Tabs (New - Merged View)

**Purpose**: Consolidate asset browsing into single unified experience

**Tab Structure**:

```
┌─────────────────────────────────────────────────────────┐
│  Marketplace                                    [Search] │
├─────────────────────────────────────────────────────────┤
│  [All] [Marketplace] [Registry] [Favorites]             │
│  [Advanced Search ▼]                            [Filter]│
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│  │ Asset 1 │  │ Asset 2 │  │ Asset 3 │               │
│  └─────────┘  └─────────┘  └─────────┘               │
└─────────────────────────────────────────────────────────┘
```

**Tab Definitions**:

- **All**: Shows both marketplace and registry assets (default view)
- **Marketplace**: User-listed tokenized assets for sale (peer-to-peer)
- **Registry**: Official registry-verified projects available for tokenization
- **Favorites**: User-saved assets (requires favorite functionality)

**Advanced Search Panel** (Collapsible):
- Replaces `/assets/look-up` route
- Expands below tabs when toggled
- Fields: Project ID, Registry type, Developer, Location, Methodology, Verification body, Vintage range
- Submit triggers filtered view
- Saves recent searches

**Filtering**:
- Project Type (REDD+, Renewable, etc.)
- Vintage year
- Location/Region
- Price range
- Verification status
- Availability

**Sorting**:
- Price (low to high, high to low)
- Vintage (newest, oldest)
- Popularity
- Rating
- Recently listed

**Benefits**:
- Single mental model for "finding carbon assets"
- Reduced navigation complexity
- Registry vs Marketplace is filtering dimension, not destination
- Advanced search elevated from buried subroute

**Migration Notes**:
- Redirect `/assets` → `/marketplace?tab=registry`
- Redirect `/assets/look-up` → `/marketplace` with search panel auto-expanded
- Preserve query params for filters/sort

---

### 2. Portfolio Tabs (Enhanced)

**Current Tabs** (Keep):
- **Open Positions**: Active holdings, staked assets
- **Historical Trades**: Completed buy/sell transactions
- **Pending Contracts**: Awaiting settlement

**New Tab** (Move from Dashboard):
- **Active Agreements**: Recurring deliveries, forward contracts (currently separate table)

**Rationale**:
- All position/trade/agreement data in one place
- Dashboard "Coming Soon" for Active Positions → implement as Portfolio tab
- Reduces Dashboard clutter

---

### 3. Wallet Activity Tabs (Keep as is)

**Current Filter Tabs** (Keep):
- All
- Sent
- Received
- Staking
- Claims

**Works well** - no changes needed

---

### 4. Notifications Filter Tabs (Keep as is)

**Current Tabs** (Keep):
- All
- Unread
- Read

**Possible Enhancement**:
- Add "Type" filters: Transactions, Staking, System, Security
- Keep as inline filter chips rather than tabs

---

## Modalization List

### High Priority Conversions

| Screen | From Route | To Container | Launch From | Reason |
|--------|-----------|--------------|-------------|--------|
| **Forgot Password** | `/forgot-password` | Modal | Login page → "Forgot Password?" link | Single field (email), quick task, return to login |
| **Notification Detail** | `/notifications/:id` | Drawer (Right) | Notification list item click | Readable detail, keep list context, allow quick navigation |
| **List Asset for Sale** | `/list-tokenized-assets` | Modal | Wallet asset card → "List" action<br>Portfolio position → "List" action | Focused 5-6 field form, single task, quick flow |
| **Logout Confirmation** | `/logout` | Modal | Sidebar "Logout" click | Simple confirmation, no page needed |

---

### Medium Priority Conversions

| Screen | From Route | To Container | Launch From | Reason |
|--------|-----------|--------------|-------------|--------|
| **Deposit** | `/wallet/deposit` | Drawer (Right) | Wallet → "Deposit" button | Complex forms but self-contained; drawer keeps Wallet visible for context |
| **Withdraw** | `/wallet/withdraw-tokenized-carbon-credit` | Drawer (Right) | Wallet → "Withdraw" button | Mirrors Deposit pattern; drawer allows seeing balance while filling form |
| **Project Detail** | `/project-detail/:id` | Drawer (Right) | Marketplace/Registry item click | Detail from list; drawer unless content requires full page (galleries, calculators) |
| **Transaction Detail** | (Currently inline/none) | Drawer (Right) | Wallet activity item click | Show full tx details, block explorer link, status |
| **Asset Lookup** | `/assets/look-up` | Search Panel | Marketplace → "Advanced Search" toggle | Inline search refinement, not a destination |

---

### Lower Priority / Conditional

| Screen | From Route | To Container | Launch From | Reason / Condition |
|--------|-----------|--------------|-------------|-------------------|
| **Tokenize Credits** | `/carbon-credit-tokenization` | Modal (Wizard) | Wallet → "Tokenize" action button<br>Asset card → "Tokenize" | 4-step wizard; test if modal feels cramped with file uploads |
| **Mint Credits** | `/MintCarbonCreditsSummary` | Modal (Wizard) **OR** Keep as Page | TBD based on complexity | If similar to Tokenization, modal; if deeply complex with MRV data, keep as page |
| **Send Asset** | (Assumed from button) | Modal | Wallet → "Send" button<br>Asset card → "Send" | Quick form: recipient, amount, confirm |
| **Receive Asset** | (Assumed from button) | Modal | Wallet → "Receive" button | Show QR code, address, copy button |
| **Swap Tokens** | (Assumed from button) | Modal | Wallet → "Swap" button<br>Asset card → "Swap" | Token exchange form: from/to asset, amount, rate preview |
| **Stake XCB** | (Assumed from button) | Modal | Membership tier card → "Stake" or Dashboard → "Stake Credits" | Amount input, tier preview, lock period, confirm |
| **Unstake XCB** | (Assumed from button) | Modal | Membership → "Unstake" button | Amount, cooldown warning, confirm |
| **Change Password** | (From Settings) | Modal | Settings Security card → "Change Password" | 3 fields: current, new, confirm |
| **MFA Setup** | (From Settings) | Modal | Settings Security card → "Edit" MFA | QR code, backup codes, verify |
| **API Keys** | (From Settings) | Modal | Settings Security card → "Manage" | List keys, create new, revoke, copy |
| **Delete Account** | (From Settings) | Modal | Settings Sessions → "Delete Account" | Strong warning, password confirm, irreversible action |
| **Contact Support** | (From Help) | Modal | Help page → "Contact Us" button | Simple form: name, email, subject, message |

---

## Flow Rewrites

### 1. Authentication Flow

#### Current Flow (Before)
```
User visits /login
  ├─ Clicks "Forgot Password?" → Navigates to /forgot-password (new page)
  │  └─ Submits email → Receives email → Clicks link → Navigates to /reset-password (new page)
  │     └─ Enters new password → Success → Navigates back to /login
  ├─ Enters credentials → Clicks Sign In
     ├─ If 2FA enabled → Navigates to /2fa (new page)
     │  └─ Enters code → Success → Navigates to /
     └─ If no 2FA → Success → Navigates to /
```

**Issues**:
- 3 separate page navigations for password reset
- 2FA as separate route breaks login flow continuity
- Reset password link takes user away from login context

#### New Flow (After)
```
User visits /login
  ├─ Clicks "Forgot Password?" → Opens Forgot Password Modal (on /login)
  │  └─ Submits email → Success message in modal → Modal closes
  │     └─ User receives email → Clicks link with token → /login?token=xyz
  │        └─ Login page detects token → Shows inline Reset Password form
  │           └─ Enters new password → Success → Form becomes login form
  │
  ├─ Enters credentials → Clicks Sign In
     ├─ If 2FA enabled → Login form becomes 2FA input (inline transition)
     │  └─ Enters code → Success → Navigates to /
     └─ If no 2FA → Success → Navigates to /
```

**Benefits**:
- User never leaves /login page for password recovery
- 2FA feels like step 2 of login, not separate destination
- Reduced cognitive load, faster task completion
- Fewer route changes = better perceived performance

---

### 2. Wallet Flow (Deposit/Withdraw/Transactions)

#### Current Flow (Before)
```
User at /wallet (overview)
  ├─ Clicks "Deposit" → Navigates to /wallet/deposit (new page)
  │  └─ Fills Fiat or Crypto form → Submits → Success → Navigates back to /wallet
  │
  ├─ Clicks "Withdraw" → Navigates to /wallet/withdraw-tokenized-carbon-credit (new page)
  │  └─ Fills form → Submits → Success → Navigates back to /wallet
  │
  └─ Views Recent Activity → Clicks transaction → (No detail view currently?)
```

**Issues**:
- User loses context of wallet balance/assets when on deposit/withdraw pages
- Need to navigate back to see updated balance after action
- No transaction detail view

#### New Flow (After)
```
User at /wallet (overview)
  ├─ Clicks "Deposit" → Opens Deposit Drawer (right side, /wallet visible on left)
  │  ├─ Tabs: Fiat | Crypto | History
  │  ├─ Fills form in active tab
  │  ├─ Can see wallet balance on left side while filling form
  │  └─ Submits → Success toast → Drawer closes → Wallet balance updates
  │
  ├─ Clicks "Withdraw" → Opens Withdraw Drawer (right side, /wallet visible on left)
  │  ├─ Tabs: To Bank | To Registry | History
  │  ├─ Can see available balance on left side
  │  └─ Submits → Success toast → Drawer closes → Wallet balance updates
  │
  ├─ Clicks "Send" → Opens Send Modal (center, wallet dimmed)
  │  └─ Form: Asset, Recipient, Amount → Preview → Confirm → Success toast → Modal closes
  │
  ├─ Clicks "Receive" → Opens Receive Modal (center)
  │  └─ Shows: QR code, address, copy button → Done → Modal closes
  │
  ├─ Clicks asset card "Swap" → Opens Swap Modal
  │  └─ Form: From asset, To asset, Amount → Rate preview → Confirm → Success toast → Modal closes
  │
  ├─ Clicks asset card "List" → Opens List Asset Modal
  │  └─ Form: Quantity, Price, Duration, Method → Preview → Confirm → Success → Modal closes
  │
  └─ Clicks transaction in Recent Activity → Opens Transaction Detail Drawer (right side)
     └─ Shows: Full details, status, block explorer link, actions → Close drawer
```

**Benefits**:
- User maintains context of wallet state during all actions
- Real-time balance visibility while depositing/withdrawing
- Faster task completion (no full page loads)
- All wallet-related actions accessible from single page
- Consistent drawer pattern for complex forms (Deposit/Withdraw/Tx Detail)
- Consistent modal pattern for quick actions (Send/Receive/Swap/List)

---

### 3. Marketplace Flow (Merged with Registry)

#### Current Flow (Before)
```
User wants to find carbon assets:
  ├─ Goes to /marketplace → Browses user-listed assets
  ├─ Goes to /assets → Browses registry projects (separate page)
  │  └─ Goes to /assets/look-up → Advanced search form (separate page)
  └─ Clicks asset → Navigates to /project-detail/:id (full page)
     └─ Clicks "Buy Now" → (Unclear - modal? navigation?)
```

**Issues**:
- Mental model split: "Is this a marketplace asset or registry asset?"
- Look-up buried in subroute
- Two separate browse experiences for similar content
- Project detail as full page adds navigation depth

#### New Flow (After)
```
User wants to find carbon assets:
  └─ Goes to /marketplace → Sees unified view
     ├─ Tabs: [All] [Marketplace] [Registry] [Favorites]
     ├─ Clicks "Advanced Search" toggle → Expands search panel below tabs
     │  └─ Fills criteria → Submit → Results filtered in current tab
     ├─ Uses standard filters/sort in sidebar
     ├─ Clicks asset card → Opens Project Detail Drawer (right side, list visible on left)
     │  ├─ Shows: Description, map, verification, impact metrics, pricing
     │  ├─ Actions: "Buy Now" (opens Buy Modal), "Add to Favorites" (inline action)
     │  ├─ If shallow content: Drawer sufficient
     │  └─ If deep content (gallery, calculator, updates): Drawer has "View Full Details" → /marketplace/project/:id
     └─ From drawer or full page → "Buy Now" → Opens Buy Modal
        └─ Form: Quantity, Payment method → Review → Confirm → Success toast → Modal closes → Portfolio updated
```

**Benefits**:
- Single mental model: "Marketplace is where I find carbon assets"
- Registry vs Marketplace is just a filter, not a destination
- Advanced search elevated and discoverable
- Drawer keeps browse context visible (can scroll list while reading detail)
- Option to escalate to full page if truly needed
- Favorites centralized in one tab

---

### 4. Tokenization & Minting Flow

#### Current Flow (Before)
```
User wants to tokenize registry credits:
  └─ Navigates to /carbon-credit-tokenization (full page)
     ├─ Fills form: Registry, Project ID, Amount, Vintage, Documents
     └─ Submits → Processing → (Status tracking unclear)

User wants to mint new credits:
  └─ Navigates to /MintCarbonCreditsSummary (full page)
     └─ (Flow unclear from docs)

User wants to list tokenized asset:
  └─ Navigates to /list-tokenized-assets (full page)
     └─ Fills form → Submits → Listed on marketplace
```

**Issues**:
- Three separate full pages for related asset management tasks
- No clear entry point (where do users discover these?)
- Fragmented user journey

#### New Flow (After)
```
User wants to tokenize registry credits:
  └─ From /wallet or /portfolio → Clicks "Tokenize Credits" action
     └─ Opens Tokenization Modal (multi-step wizard)
        ├─ Step 1: Submit Details (Registry, Project ID, Amount, Vintage, Documents)
        ├─ Step 2: Verification (shows status, 2-3 business days)
        ├─ Step 3: Token Conversion (smart contract execution)
        └─ Step 4: Complete (tokens in wallet) → Modal closes → Wallet updated

User wants to mint new credits:
  └─ From /wallet or /dashboard → Clicks "Mint Credits" action
     └─ Opens Mint Modal (wizard) OR navigates to /mint page if complex
        └─ (Depends on actual complexity - TBD)

User wants to list tokenized asset:
  └─ From /wallet asset card → Clicks "List for Sale" action
     └─ Opens List Asset Modal
        ├─ Asset auto-selected, project info auto-populated
        ├─ Form: Quantity, Price, Duration, Method, Restrictions
        └─ Confirm → Success → Modal closes → Asset listed in /marketplace
```

**Benefits**:
- Clear entry points from logical locations (Wallet, Portfolio)
- Wizard modals guide user through multi-step processes
- Related actions grouped conceptually
- Faster task completion
- Reduced navigation complexity

---

### 5. Notifications Flow

#### Current Flow (Before)
```
User at /notifications (list)
  └─ Clicks notification → Navigates to /notifications/:id (full page)
     └─ Reads detail → Clicks back or uses browser back
```

**Issues**:
- Navigation depth for simple content view
- Loses list context
- Slower return to list

#### New Flow (After)
```
User at /notifications (list)
  └─ Clicks notification → Opens Notification Detail Drawer (right side, list visible on left)
     ├─ Shows: Full content, timestamp, related actions
     ├─ Actions: "Mark as Read", "Delete", "Go to Related Page"
     ├─ Navigation arrows: "← Previous | Next →" (navigate through notifications in drawer)
     └─ Click outside or close → Drawer closes, returns to list
```

**Benefits**:
- Keep list context visible
- Faster navigation between notifications (in-drawer arrows)
- Reduced perceived navigation complexity
- Standard drawer pattern

---

### 6. Settings Flow

#### Current Flow (Before)
```
User at /settings (main page)
  ├─ Security card → "Change Password" → (Modal? Inline? Unclear)
  ├─ Security card → "Edit MFA" → (Modal? Inline? Unclear)
  └─ Security card → "Manage API Keys" → (Modal? Inline? Unclear)
```

**Current Implementation** (Likely):
- Some actions trigger modals (good!)

#### Confirmed Flow (After - Keep as is, ensure consistency)
```
User at /settings (main page)
  ├─ Profile card → "Overview" → Opens Edit Profile Modal
  ├─ Security card → "Change Password" → Opens Change Password Modal
  ├─ Security card → "Edit MFA" → Opens MFA Setup Modal (QR code, backup codes)
  ├─ Security card → "Manage API Keys" → Opens API Keys Modal (list, create, revoke)
  └─ Sessions card → "Delete Account" → Opens Delete Account Modal (strong warning, confirm)
```

**No route changes needed** - ensure all forms are modals, not inline or new routes

---

### 7. Help & Support Flow

#### Current Flow (Before)
```
User at /help (main page)
  ├─ Searches FAQ → Results inline
  ├─ Expands FAQ accordion → Reads answer
  └─ Clicks "Contact Us" → (Modal? Form? Unclear)
```

#### Confirmed Flow (After)
```
User at /help (main page)
  ├─ Searches → Results inline with highlighting
  ├─ FAQ Accordion → Expand/collapse inline
  └─ Clicks "Contact Support" → Opens Contact Modal
     └─ Form: Name, Email, Subject, Message, Attachments → Submit → Success toast → Modal closes
```

**No route changes needed** - ensure Contact form is modal

---

## KPI De-duplication Policy

### Problem Statement
Multiple screens show the same hero metrics, creating confusion about single source of truth and visual fatigue.

### Single Source of Truth Rules

| KPI | Primary Location | Secondary Display (If Needed) | Format in Secondary |
|-----|------------------|-------------------------------|---------------------|
| **Total Portfolio Value** | Dashboard Hero | Portfolio compact header | Small, single-line, non-hero |
| **YTD Change** | Dashboard Hero | Portfolio compact header | Small, percentage only |
| **24H Change** | Dashboard Hero | None (omit from Portfolio) | N/A |
| **All-Time High** | Dashboard Hero | None | N/A |
| **Total Returns** | Dashboard Hero | Portfolio Historical Trades tab (different context) | Tab-specific metric |
| **Total Staked** | Dashboard Metrics Grid | Membership Current Plan card | Contextual to staking |
| **Monthly Earnings** | Dashboard Metrics Grid | Wallet Metrics Grid (if wallet-specific) | Only if wallet-scoped |
| **Available Balance** | Dashboard Metrics Grid | Wallet Hero | Primary for Wallet, secondary for Dashboard |
| **Wallet Balance** | Wallet Hero | None | N/A |
| **Open Positions** | Portfolio Metrics Grid | Dashboard (Coming Soon → remove) | Remove from Dashboard |
| **Historical Value** | Portfolio Metrics Grid | None | N/A |
| **Pending Contracts** | Portfolio Metrics Grid | None | N/A |

### Implementation Rules

1. **Hero Section = Primary Display**
   - Only one hero section per KPI across entire app
   - Hero = large number, gradient background, multiple sub-metrics
   - Dashboard gets priority for global financial KPIs

2. **Compact Header = Contextual Reminder**
   - Small, single-line display
   - Format: "Portfolio Value: $48,250 (+4.2%)"
   - No gradient, no hero styling
   - Only if truly needed for user orientation

3. **Metric Grid = Domain-Specific**
   - Dashboard metrics = global (Total Staked, Monthly Earnings, Available Balance)
   - Portfolio metrics = portfolio-specific (Open Positions, Historical, Pending)
   - Wallet metrics = wallet-specific (Liquid, Staked from wallet, Total Assets)

4. **Remove Unnecessary Display**
   - If metric is not actionable or informative in secondary location, remove it
   - Example: "All-Time High" only matters in global overview (Dashboard), not Portfolio

### Specific Changes Required

#### Dashboard (Keep as is)
```
Hero: Total Portfolio Value, YTD, 24H, ATH, Total Returns
Metrics Grid: Total Staked, Monthly Earnings, Available Balance
Impact Section: Carbon Retired, Tree Equivalent, Community Score, Tier Progress
Quick Actions: Stake, Buy, Claim
```

#### Portfolio (Reduce Hero)
**Before**:
```
Hero: Total Portfolio Value, YTD, Total Credits, Active Positions, Avg Cost Basis
Metrics Grid: Open Positions, Historical Value, Pending Contracts
```

**After**:
```
Compact Header: "Portfolio: $48,250 (+4.2% YTD)" (single line, small)
Metrics Grid: Open Positions, Historical Value, Pending Contracts, Active Agreements
[Remove: Total Portfolio Value hero, YTD hero, Total Credits, ATH - redundant with Dashboard]
[Add: Active Agreements as 4th metric or new tab]
```

#### Wallet (Keep Hero, Adjust Metrics)
**Before**:
```
Hero: Total Wallet Balance, Address, Network, 24H Change
Metrics Grid: Liquid Assets, Staked Assets, Total Assets
```

**After** (Minor adjustment):
```
Hero: Total Wallet Balance, Address, Network
Metrics Grid: Liquid Assets, Staked Assets, Total Assets
[Remove: 24H Change from hero - redundant with Dashboard; not as critical for wallet view]
[Or keep if user feedback indicates it's valuable in wallet context]
```

---

## Empty/Loading/Error State Guidelines

### Empty States

#### Pattern
```
┌─────────────────────────────────────┐
│         [Relevant Icon]             │
│                                     │
│      No {items} Yet                 │
│                                     │
│  Brief explanation of why empty     │
│  and what user can do next          │
│                                     │
│     [Primary Action Button]         │
│                                     │
│     [Secondary Link/Action]         │
└─────────────────────────────────────┘
```

#### Specific Empty States Needed

| Location | Empty State | Icon | Message | Primary Action | Secondary Action |
|----------|-------------|------|---------|----------------|------------------|
| **Dashboard** | No portfolio data | 📊 | "Start Building Your Portfolio" | "Buy Carbon Credits" | "Learn About Credits" |
| **Portfolio → Open Positions** | No positions | 📂 | "No Open Positions Yet" | "Browse Marketplace" | "Learn About Trading" |
| **Portfolio → Historical Trades** | No trades | 📜 | "No Trade History" | "Make Your First Trade" | - |
| **Portfolio → Pending Contracts** | No pending | ⏳ | "No Pending Contracts" | - | - |
| **Portfolio → Active Agreements** | No agreements | 🤝 | "No Active Agreements" | "Set Up Recurring Delivery" | - |
| **Wallet** | No assets | 👛 | "Your Wallet is Empty" | "Deposit Funds" | "Learn About Wallets" |
| **Wallet → Recent Activity** | No transactions | 📋 | "No Recent Activity" | "Make Your First Transaction" | - |
| **Marketplace** | No results from filters | 🔍 | "No Assets Match Your Filters" | "Clear Filters" | "Try Different Search" |
| **Marketplace → Favorites** | No favorites | ⭐ | "No Favorites Yet" | "Browse Marketplace" | - |
| **Notifications** | No notifications | 🔔 | "You're All Caught Up" | - | "Notification Settings" |
| **Membership → Transaction History** | No transactions | 📊 | "No Staking Transactions Yet" | "Stake XCB Tokens" | - |

### Loading States

#### Skeleton Loaders (Preferred)
- Use for tables, cards, metrics during initial load
- Match layout of actual content
- Subtle pulse animation
- Gray placeholder blocks

**Locations**:
- Dashboard metrics grid
- Portfolio tables
- Wallet asset cards
- Marketplace asset grid
- Notifications list

#### Spinner (Use Sparingly)
- Use for actions/submissions (button loading state)
- Use for full-page transitions if unavoidable

**Locations**:
- Button loading state after click
- Drawer/modal initial load if data fetch required

### Error States

#### Inline Errors (Form Validation)
- Red text below field
- Icon (⚠️) next to message
- Clear, actionable message
- Example: "Email is required" or "Password must be at least 8 characters"

#### Error Boundaries (Page-Level)
- Friendly message
- Contact support option
- Reload page button
- "Something went wrong" default message

#### API Errors (Action Failures)
- Toast notification (error style)
- Red/orange color
- Error icon
- Clear message: "Failed to deposit. Please try again."
- Retry button if applicable

#### Network Errors
- Banner at top of page
- "You're offline" message
- Auto-hide when online
- Option to retry actions

#### 404 Errors
- Friendly "Page Not Found" design
- Search functionality
- Links to common pages (Dashboard, Marketplace, Help)
- "Go Back" button

---

## Migration Risks & Mitigations

### High Risk Changes

#### 1. Merging Marketplace + Registry Assets

**Risk**: Users may have established mental models for where to find each type  
**Impact**: Confusion, task completion failure  
**Likelihood**: Medium

**Mitigations**:
- Clear tab labels ("Marketplace" vs "Registry")
- Default to "All" tab (combined view) to reduce fragmentation
- Add tooltip/info icon explaining difference
- User testing before launch
- Analytics tracking on tab usage
- Provide feedback mechanism
- If usage data shows confusion, add "Registry" as separate sidebar link redirecting to tab

**Rollback Plan**: Keep `/assets` route, add link in Marketplace "View Registry Assets"

---

#### 2. Converting Deposit/Withdraw to Drawers

**Risk**: Forms may feel cramped, especially with history tables  
**Impact**: User frustration, form abandonment  
**Likelihood**: Medium

**Mitigations**:
- Make drawers wide (50-60% of viewport on desktop)
- Use tabs in drawer: "Fiat | Crypto | History" for Deposit
- Test on multiple screen sizes
- Provide "Open in Full Screen" option if needed
- Use progressive disclosure (collapse history by default)
- Mobile: Use full-screen modal instead of drawer

**Rollback Plan**: Keep routes as fallback; drawer has "Expand" button → `/wallet/deposit`

---

#### 3. Removing Portfolio Hero Metrics

**Risk**: Users expect to see portfolio value prominently on Portfolio page  
**Impact**: Disorientation, perception of missing features  
**Likelihood**: Low-Medium

**Mitigations**:
- User testing with compact header design
- A/B test: Hero vs Compact Header
- Add "Pin Portfolio Value" user preference
- Analytics: Track how often users view Portfolio immediately after Dashboard
- If usage shows high reliance, keep smaller hero (50% size reduction instead of removal)

**Rollback Plan**: Add back as "collapsed hero" (smaller, toggle to expand)

---

### Medium Risk Changes

#### 4. Project Detail as Drawer vs Full Page

**Risk**: Complex project detail (galleries, calculators, updates) may not fit drawer  
**Impact**: Poor UX for deep content  
**Likelihood**: Medium

**Mitigations**:
- Content audit: Identify which projects have deep content
- Hybrid approach:
  - Drawer for basic detail (80% of cases)
  - Drawer has "View Full Details" button → `/marketplace/project/:id` for deep content
  - Full page reserved for projects with galleries, calculators, multi-tab content
- Use drawer tabs for organization
- Lazy load content sections

**Rollback Plan**: All project details → full page; drawer shows preview only

---

#### 5. Notification Detail as Drawer

**Risk**: Users may want to share direct links to notifications  
**Impact**: Loss of deep-linking capability  
**Likelihood**: Low

**Mitigations**:
- Update URL when drawer opens: `/notifications?detail=123`
- Support deep links: `/notifications?detail=123` auto-opens drawer
- "Copy Link" button in drawer
- Notification emails include deep link
- SEO/sharing: Generate Open Graph meta for notification links

**Rollback Plan**: Keep `/notifications/:id` route, drawer uses route for deep linking

---

### Low Risk Changes

#### 6. Forgot Password as Modal

**Risk**: Very low - standard pattern  
**Mitigation**: None needed  
**Rollback**: Easy - restore route if issues arise

#### 7. Logout as Action

**Risk**: Very low - standard pattern  
**Mitigation**: Clear confirmation modal  
**Rollback**: Easy - restore route

#### 8. List Assets as Modal

**Risk**: Low - simple focused form  
**Mitigation**: Form validation, clear field labels  
**Rollback**: Restore route if form feels cramped

---

## Analytics & Success Metrics

### Track for Validation

| Metric | Before | Target After | Success Criteria |
|--------|--------|--------------|------------------|
| **Avg. routes per session** | ~8 | ~5-6 | 25% reduction |
| **Deposit task completion rate** | Baseline | +10-15% | Drawer improves completion |
| **Time to complete tokenization** | Baseline | -20-30% | Modal wizard faster |
| **Marketplace browse → purchase conversion** | Baseline | +5-10% | Unified view reduces friction |
| **Notification engagement rate** | Baseline | +15-20% | Drawer increases engagement |
| **Portfolio view frequency** | Baseline | Maintain or increase | Metric removal doesn't reduce visits |
| **User satisfaction (CSAT)** | Baseline | +10 points | Simplified IA improves satisfaction |

### Track for Risk Detection

- **Bounce rate on Marketplace**: If increases, merged view may confuse
- **Search usage**: If increases significantly, may indicate difficulty finding assets
- **Support tickets about "where is X"**: Indicates migration issues
- **Feature discovery rate**: Ensure modalized features don't become hidden

---

## Redirect Map (URL Migration)

| Old Route | New Route | Redirect Type | Query Params Preserved? |
|-----------|-----------|---------------|-------------------------|
| `/forgot-password` | `/login` | 302 Temporary | No (triggers modal state) |
| `/reset-password?token=xyz` | `/login?token=xyz` | 302 Temporary | Yes |
| `/2fa` | `/login` | 302 Temporary | Yes (state param) |
| `/assets` | `/marketplace?tab=registry` | 301 Permanent | Yes (filters/sort) |
| `/assets/look-up` | `/marketplace?search=open` | 301 Permanent | Yes (search params) |
| `/wallet/deposit` | `/wallet?action=deposit` | 302 Temporary | No (triggers drawer) |
| `/wallet/withdraw-tokenized-carbon-credit` | `/wallet?action=withdraw` | 302 Temporary | No (triggers drawer) |
| `/list-tokenized-assets` | `/wallet?action=list` or `/portfolio?action=list` | 302 Temporary | No (triggers modal) |
| `/carbon-credit-tokenization` | `/wallet?action=tokenize` | 302 Temporary | No (triggers modal) |
| `/notifications/:id` | `/notifications?detail=:id` | 302 Temporary | No (opens drawer) |
| `/logout` | `/` | 302 Temporary | No (triggers logout action) |

**Notes**:
- 301 (Permanent) for true route consolidations (Marketplace merge)
- 302 (Temporary) for modalization (preserve old routes as fallback)
- Query params trigger drawer/modal state on destination
- Preserve filters, sort, search params when redirecting

---

## QA Test Scenarios

### Critical Paths to Test

1. **Authentication Flow**
   - [ ] Login → Forgot Password modal → Email sent → Reset via email link → Login success
   - [ ] Login → 2FA inline → Code entry → Dashboard
   - [ ] Sign up → Email verification → First login

2. **Marketplace (Merged)**
   - [ ] Browse All tab → Switch to Marketplace tab → Filter → Asset detail drawer → Buy modal
   - [ ] Switch to Registry tab → Advanced search → Results → Project detail drawer
   - [ ] Add to Favorites → View Favorites tab → Remove favorite

3. **Wallet Flows**
   - [ ] Deposit drawer (Fiat) → Submit → Success → Balance updates
   - [ ] Deposit drawer (Crypto) → Copy address → Close drawer
   - [ ] Withdraw drawer → Submit → Success → Balance updates
   - [ ] Send modal → Enter recipient → Confirm → Transaction in activity
   - [ ] Receive modal → QR code display → Copy address
   - [ ] Swap modal → Select assets → Confirm → Swap complete
   - [ ] List Asset modal → Fill form → Confirm → Listed in marketplace
   - [ ] Tokenize modal (wizard) → Step through → Complete → Tokens in wallet
   - [ ] Transaction detail drawer → View details → Block explorer link

4. **Portfolio**
   - [ ] View Open Positions tab → No duplicate hero metrics visible
   - [ ] Switch to Historical Trades → Filter → Export CSV
   - [ ] View Pending Contracts → Empty state if none
   - [ ] View Active Agreements → Table loads

5. **Notifications**
   - [ ] Click notification → Detail drawer opens → Mark as read → Drawer closes
   - [ ] Navigate with drawer arrows (Previous/Next)
   - [ ] Deep link `/notifications?detail=123` → Drawer auto-opens

6. **Settings**
   - [ ] Change Password modal → Submit → Success
   - [ ] MFA Setup modal → Scan QR → Verify → Enabled
   - [ ] API Keys modal → Create key → Copy → Revoke
   - [ ] Delete Account modal → Strong warning → Confirm → Account deleted

7. **Membership**
   - [ ] Stake modal → Enter amount → Tier preview → Confirm → Staked
   - [ ] Unstake modal → Cooldown warning → Confirm → Unstaking

8. **Help**
   - [ ] Search FAQ → Results highlight
   - [ ] Contact Support modal → Fill form → Submit → Success

9. **Old URL Redirects**
   - [ ] `/assets` → Redirects to `/marketplace?tab=registry`
   - [ ] `/wallet/deposit` → Redirects to `/wallet?action=deposit` → Drawer opens
   - [ ] `/notifications/123` → Redirects to `/notifications?detail=123` → Drawer opens

10. **Empty States**
    - [ ] New user → Empty portfolio, wallet, notifications → Appropriate empty states
    - [ ] Filter with no results → Empty state with "Clear Filters" action

---

## Implementation Phases

### Phase 1: Low-Risk Quick Wins (Sprint 1-2)
- ✅ Convert Forgot Password to modal
- ✅ Convert Logout to action with modal
- ✅ Remove Portfolio hero metrics (or downsize to compact header)
- ✅ Add empty states to all tables and lists
- ✅ Improve loading states (skeleton loaders)

**Validation**: User testing, analytics on task completion

---

### Phase 2: Marketplace Merge (Sprint 3-4)
- ✅ Merge `/marketplace` and `/assets` into unified Marketplace
- ✅ Implement tabs: All, Marketplace, Registry, Favorites
- ✅ Convert `/assets/look-up` to Advanced Search panel
- ✅ Set up redirects
- ✅ Analytics instrumentation

**Validation**: A/B test if possible, monitor bounce rate and conversion

---

### Phase 3: Wallet Modalization (Sprint 5-6)
- ✅ Convert Deposit to drawer
- ✅ Convert Withdraw to drawer
- ✅ Implement Send modal
- ✅ Implement Receive modal
- ✅ Implement Swap modal
- ✅ Implement Transaction Detail drawer

**Validation**: Task completion rates, user feedback surveys

---

### Phase 4: Notifications & Secondary Flows (Sprint 7-8)
- ✅ Convert Notification Detail to drawer
- ✅ Implement URL state management for deep linking
- ✅ Convert List Asset to modal
- ✅ Convert Tokenization to modal wizard (if validated)
- ✅ Implement Contact Support modal

**Validation**: Engagement metrics, support ticket volume

---

### Phase 5: Polish & Optimization (Sprint 9)
- ✅ Accessibility audit (keyboard nav, ARIA, contrast)
- ✅ Mobile responsive testing for all drawers/modals
- ✅ Performance optimization (lazy loading, code splitting)
- ✅ Analytics review and optimization
- ✅ Documentation updates

---

## Success Criteria (Definition of Done)

### Functional
- [ ] Route count reduced from 23 to 12-15
- [ ] All targeted screens converted to modals/drawers
- [ ] All redirects in place and tested
- [ ] URL state management for deep linking
- [ ] Empty/loading/error states implemented
- [ ] All QA test scenarios passing

### User Experience
- [ ] No duplicate hero metrics across Dashboard/Portfolio
- [ ] All modals/drawers have clear close mechanisms
- [ ] Keyboard navigation works for all modals/drawers
- [ ] Mobile: Modals/drawers adapt appropriately
- [ ] All actions provide clear feedback (toasts, inline messages)

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 90
- [ ] No layout shift when opening/closing drawers
- [ ] Smooth animations (60fps)

### Analytics & Monitoring
- [ ] All key user flows instrumented
- [ ] Dashboard set up for tracking success metrics
- [ ] Error tracking configured
- [ ] Redirect tracking in place

---

**Status**: ✅ Ready for UI Patterns & Components Specification  
**Next**: `03_UI_PATTERNS_AND_COMPONENTS.md`
