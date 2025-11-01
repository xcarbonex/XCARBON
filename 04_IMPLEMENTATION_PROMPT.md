# 04_IMPLEMENTATION_PROMPT.md

## Mission

Refactor the XCARBON DApp by implementing the simplified Information Architecture from `02_IA_RATIONALIZATION_PLAN.md` and the standardized UI component library from `03_UI_PATTERNS_AND_COMPONENTS.md`. This is a task-ready implementation guide.

---

## Deliverables

1. **Updated Routes** - Reduced from 23 to 12-15 routes
2. **Modal/Drawer Flows** - 8+ focused tasks converted from full pages
3. **Unified KPIs** - Single source of truth for portfolio metrics
4. **Standardized Components** - Consistent design system across all screens
5. **Accessibility Fixes** - WCAG AA compliance, keyboard navigation
6. **Redirect Mapping** - All old routes redirect properly
7. **Empty/Loading/Error States** - Comprehensive state handling

---

## Pre-Implementation Checklist

- [ ] Read `01_SCREEN_AUDIT.md` for context on current state and identified issues
- [ ] Review `02_IA_RATIONALIZATION_PLAN.md` for detailed before/after navigation and flow rewrites
- [ ] Study `03_UI_PATTERNS_AND_COMPONENTS.md` for component specs and design tokens
- [ ] Backup current codebase (git branch or tag)
- [ ] Set up feature branch: `git checkout -b feature/screen-rationalization`
- [ ] Inform stakeholders of upcoming changes (especially URL changes)
- [ ] Prepare analytics instrumentation for tracking migration success

---

## Implementation Phases

### Phase 1: Foundation (Sprint 1-2)

#### 1.1 Design Tokens Setup

**Goal**: Establish CSS variables for colors, typography, spacing, shadows

**Tasks**:
- [ ] Create or update `src/styles/tokens.css` with all design tokens from `03_UI_PATTERNS_AND_COMPONENTS.md`
- [ ] Define light mode color palette (brand, accent, semantic, neutral)
- [ ] Define dark mode color palette (dark-bg, dark-text variants)
- [ ] Verify WCAG AA contrast ratios (use contrast checker tool)
- [ ] Define typography scale (hero, display, h2-h4, body, caption)
- [ ] Define spacing scale (8px base: space-1 through space-16)
- [ ] Define border radius tokens (sm, md, lg, xl, full)
- [ ] Define shadow tokens (sm, md, lg, xl, 2xl) for light and dark modes
- [ ] Test tokens in both light and dark themes

**Acceptance Criteria**:
- ✅ All color tokens defined and WCAG AA compliant
- ✅ Typography scale covers all use cases (hero numbers, headings, body, captions)
- ✅ Tokens work in both light and dark modes
- ✅ No hard-coded colors, sizes, or shadows in components (all use tokens)

**Files to Create/Update**:
- `src/styles/tokens.css` or `src/styles/design-tokens.ts`
- `tailwind.config.js` (extend with custom tokens if using Tailwind)

---

#### 1.2 Base Component Library

**Goal**: Build or refactor core components (Button, Input, Card, MetricCard, Table)

**Tasks**:

**Button Component**:
- [ ] Create `src/components/Button/Button.tsx`
- [ ] Implement variants: primary, secondary, tonal, outline, ghost, destructive
- [ ] Implement sizes: sm, md, lg
- [ ] Implement states: default, hover, active, focus, disabled, loading
- [ ] Add icon support (left/right position)
- [ ] Full keyboard accessibility (native `<button>`)
- [ ] Write Storybook stories or tests

**Input / FormField Component**:
- [ ] Create `src/components/Input/Input.tsx`
- [ ] Support types: text, email, password, number, textarea, date
- [ ] Add label, required indicator (*), helper text, error message
- [ ] Icon support (prefix/suffix)
- [ ] Validation states (error, success)
- [ ] Keyboard accessible (associated label, aria attributes)
- [ ] Password show/hide toggle
- [ ] Write Storybook stories

**Card Component**:
- [ ] Create `src/components/Card/Card.tsx`
- [ ] Variants: default, elevated, outlined, hero
- [ ] Padding options: sm, md, lg
- [ ] Interactive hover effect (optional, if clickable)
- [ ] Support for gradient backgrounds (hero variant)
- [ ] Semantic HTML (`<article>` or `<section>`)
- [ ] Write Storybook stories

**MetricCard Component**:
- [ ] Create or refactor `src/components/MetricCard/MetricCard.tsx`
- [ ] Display: icon, label, value (large number), change (percentage + trend arrow)
- [ ] Optional: trend sparkline (small chart)
- [ ] Tooltip support for info icon
- [ ] Loading state (skeleton shimmer)
- [ ] Consistent styling using design tokens
- [ ] Accessibility: `role="article"`, `aria-label`
- [ ] Write Storybook stories

**Table Component**:
- [ ] Create or refactor `src/components/Table/Table.tsx`
- [ ] Column sorting (click header)
- [ ] Search/filter support
- [ ] Pagination (rows per page, page navigation)
- [ ] Empty state component
- [ ] Loading state (skeleton rows)
- [ ] Row selection (checkboxes, optional)
- [ ] Responsive: horizontal scroll or card view on mobile
- [ ] Accessibility: semantic `<table>`, `aria-sort`, keyboard navigation
- [ ] Write Storybook stories

**Acceptance Criteria**:
- ✅ All base components implemented with full variant/state support
- ✅ Components use design tokens (no hard-coded values)
- ✅ Keyboard accessible (Tab, Enter, Space, Escape where applicable)
- ✅ Documented in Storybook or similar (all variants shown)
- ✅ Unit tests or integration tests passing

**Files to Create/Update**:
- `src/components/Button/`
- `src/components/Input/`
- `src/components/Card/`
- `src/components/MetricCard/`
- `src/components/Table/`
- Update `src/components/index.ts` exports

---

#### 1.3 Empty, Loading, Error States

**Goal**: Implement comprehensive state handling across all screens

**Tasks**:

**Empty States**:
- [ ] Create `src/components/EmptyState/EmptyState.tsx`
- [ ] Props: icon, title, description, primaryAction, secondaryAction
- [ ] Implement empty states for:
  - [ ] Dashboard (no portfolio data)
  - [ ] Portfolio tabs (no positions, no trades, no pending, no agreements)
  - [ ] Wallet (no assets, no activity)
  - [ ] Marketplace (no results, no favorites)
  - [ ] Notifications (no notifications)
  - [ ] Membership transaction history (no transactions)
- [ ] Use encouraging, action-oriented messaging
- [ ] Accessibility: semantic HTML, clear action buttons

**Loading States**:
- [ ] Create skeleton loader components:
  - [ ] `SkeletonCard.tsx` (for metric cards)
  - [ ] `SkeletonTable.tsx` (for table rows)
  - [ ] `SkeletonText.tsx` (for text content)
- [ ] Implement loading states in:
  - [ ] Dashboard metrics grid
  - [ ] Portfolio tables
  - [ ] Wallet asset cards
  - [ ] Marketplace grid
  - [ ] Notifications list
- [ ] Use subtle pulse animation (respect `prefers-reduced-motion`)
- [ ] Accessibility: `aria-busy="true"`, `aria-live="polite"` announcement

**Error States**:
- [ ] Ensure ErrorBoundary component exists and is properly configured
- [ ] Implement inline error messages in forms (already likely present)
- [ ] Create network error banner component (offline indicator)
- [ ] Test 404 page styling and navigation (already exists at `/404`)
- [ ] Implement API error toasts with retry option
- [ ] Accessibility: `role="alert"`, `aria-live="assertive"` for critical errors

**Acceptance Criteria**:
- ✅ Empty state component implemented and used in all applicable locations
- ✅ Skeleton loaders implemented for tables, cards, and text
- ✅ Error boundary catches and displays errors gracefully
- ✅ Network errors show banner with retry option
- ✅ All states accessible (screen reader announcements, keyboard actions)

**Files to Create/Update**:
- `src/components/EmptyState/`
- `src/components/Skeleton/`
- `src/components/ErrorBoundary/` (likely exists, enhance if needed)
- Update all page components to use EmptyState and Skeleton loaders

---

### Phase 2: Overlay Components (Sprint 3-4)

#### 2.1 Modal Component

**Goal**: Build reusable, accessible Modal component

**Tasks**:
- [ ] Create `src/components/Modal/Modal.tsx`
- [ ] Sizes: sm (400px), md (600px), lg (800px), xl (1000px)
- [ ] Anatomy: Close button, Title (H2), Description (optional), Content area, Action buttons
- [ ] Backdrop (dim parent, click to close unless disabled)
- [ ] ESC key to close (unless disabled)
- [ ] Focus trap (Tab cycles within modal, focus first element on open)
- [ ] Return focus to trigger element on close
- [ ] Enter/exit animations (scale + fade, 200-250ms)
- [ ] Respect `prefers-reduced-motion`
- [ ] Accessibility:
  - [ ] `role="dialog"`
  - [ ] `aria-modal="true"`
  - [ ] `aria-labelledby` (title ID)
  - [ ] `aria-describedby` (description ID)
  - [ ] Focus management (trap and restore)
- [ ] Portal rendering (render at document body level)
- [ ] Storybook stories for all sizes

**Acceptance Criteria**:
- ✅ Modal component fully functional with all features
- ✅ Keyboard accessible (Tab, ESC, focus trap)
- ✅ Animations smooth and respectful of reduced motion preferences
- ✅ Works in both light and dark modes
- ✅ Screen reader tested (announces title/description, focus management)

**Files to Create**:
- `src/components/Modal/Modal.tsx`
- `src/components/Modal/Modal.test.tsx` (unit tests)
- Update `src/components/index.ts`

---

#### 2.2 Drawer Component

**Goal**: Build reusable, accessible Drawer (side sheet) component

**Tasks**:
- [ ] Create `src/components/Drawer/Drawer.tsx`
- [ ] Sizes: sm (320px), md (480px), lg (600px), xl (800px)
- [ ] Anchor: left or right (default right)
- [ ] Anatomy: Close button, Title (H2), Scrollable content area, Optional actions
- [ ] Backdrop (dim parent, click to close)
- [ ] ESC key to close
- [ ] Focus trap while open
- [ ] Optional navigation arrows (Previous/Next) for list item navigation
- [ ] URL state management (update query param on open: `?detail=123`)
- [ ] Deep linking support (auto-open drawer if URL has detail param)
- [ ] Enter/exit animations (slide from right, 250ms)
- [ ] Respect `prefers-reduced-motion`
- [ ] Mobile adaptation:
  - [ ] < 768px: Convert to BottomSheet or full-screen modal
- [ ] Accessibility:
  - [ ] `role="dialog"`
  - [ ] `aria-modal="true"`
  - [ ] `aria-labelledby`
  - [ ] Focus trap and restore
  - [ ] Navigation arrows keyboard accessible
- [ ] Portal rendering
- [ ] Storybook stories

**Acceptance Criteria**:
- ✅ Drawer component fully functional with all features
- ✅ URL state updates on open/close (for deep linking)
- ✅ Deep links auto-open drawer
- ✅ Keyboard accessible (Tab, ESC, arrow navigation if applicable)
- ✅ Mobile responsive (BottomSheet or full-screen on small screens)
- ✅ Screen reader tested

**Files to Create**:
- `src/components/Drawer/Drawer.tsx`
- `src/components/Drawer/Drawer.test.tsx`
- Update `src/components/index.ts`

---

#### 2.3 BottomSheet Component (Mobile)

**Goal**: Mobile-optimized overlay for quick actions

**Tasks**:
- [ ] Create `src/components/BottomSheet/BottomSheet.tsx`
- [ ] Drag handle at top (32px × 4px)
- [ ] Swipe down to close
- [ ] Tap backdrop to close
- [ ] Snap points: 50%, 90%, 100% (configurable)
- [ ] Rounded top corners (--radius-xl)
- [ ] Smooth drag animation
- [ ] Respect `prefers-reduced-motion`
- [ ] Accessibility: Same as Modal/Drawer
- [ ] Storybook story

**Acceptance Criteria**:
- ✅ BottomSheet works on mobile viewports (< 768px)
- ✅ Swipe gesture smooth and responsive
- ✅ Snap points work correctly
- ✅ Accessible (focus trap, keyboard close with ESC)

**Files to Create**:
- `src/components/BottomSheet/BottomSheet.tsx`
- Update `src/components/index.ts`

---

#### 2.4 Toast Notification System

**Goal**: Temporary feedback for user actions

**Tasks**:
- [ ] Create `src/components/Toast/Toast.tsx`
- [ ] Variants: info, success, warning, error (icons + colors)
- [ ] Position: Top-right corner (configurable)
- [ ] Auto-dismiss after 3-5 seconds (configurable)
- [ ] Hover pauses auto-dismiss
- [ ] Stack multiple toasts vertically
- [ ] Dismiss button (X icon)
- [ ] Swipe to dismiss on mobile
- [ ] Enter animation (slide from right + fade in)
- [ ] Exit animation (slide out + fade out)
- [ ] Respect `prefers-reduced-motion`
- [ ] Accessibility:
  - [ ] `role="status"` (info/success) or `role="alert"` (warning/error)
  - [ ] `aria-live="polite"` or `"assertive"`
  - [ ] Screen reader announcements
- [ ] Global toast manager/provider (use context or state management)
- [ ] Storybook story

**Acceptance Criteria**:
- ✅ Toast system working globally across app
- ✅ All variants styled correctly
- ✅ Auto-dismiss and stacking work
- ✅ Accessible (announced to screen readers)

**Files to Create**:
- `src/components/Toast/Toast.tsx`
- `src/components/Toast/ToastProvider.tsx` (context/manager)
- `src/hooks/useToast.ts` (hook to trigger toasts)
- Update `src/components/index.ts`

---

#### 2.5 Stepper Component (Multi-Step Wizard)

**Goal**: Guide users through multi-step processes

**Tasks**:
- [ ] Create `src/components/Stepper/Stepper.tsx`
- [ ] Horizontal step indicators (Step 1 → Step 2 → Step 3 → Step 4)
- [ ] States: completed (checkmark, green), active (filled, brand), upcoming (outlined, gray)
- [ ] Linear flow (can't skip steps)
- [ ] "Back" button: Returns to previous step (state preserved)
- [ ] "Next" button: Validates and proceeds to next step
- [ ] Final step: "Next" becomes "Complete" or "Submit"
- [ ] Step labels and descriptions
- [ ] Responsive: Stack vertically on mobile if needed
- [ ] Accessibility:
  - [ ] `role="navigation"`
  - [ ] `aria-label="Progress"`
  - [ ] `aria-current="step"` on active step
  - [ ] Dynamic `aria-label` per step (e.g., "Step 1 of 4: Submit Details, completed")
- [ ] Storybook story

**Acceptance Criteria**:
- ✅ Stepper component works with any number of steps
- ✅ Step validation prevents skipping
- ✅ State preserved when navigating back
- ✅ Accessible (keyboard navigation, screen reader announcements)

**Files to Create**:
- `src/components/Stepper/Stepper.tsx`
- `src/components/Stepper/Stepper.test.tsx`
- Update `src/components/index.ts`

---

### Phase 3: Route Consolidation (Sprint 5-6)

#### 3.1 Merge Marketplace and Registry Assets

**Goal**: Consolidate `/marketplace` and `/assets` into single unified Marketplace with tabs

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Keep `/marketplace` route
  - [ ] Remove `/assets` and `/assets/look-up` routes
  - [ ] Set up redirects (see 3.6)
- [ ] Update `src/pages/Marketplace/` (or create if needed):
  - [ ] Implement tab navigation: All | Marketplace | Registry | Favorites
  - [ ] Default tab: All
  - [ ] Tab state managed via URL query param: `/marketplace?tab=registry`
  - [ ] Implement Advanced Search panel (collapsible, replaces lookup)
    - [ ] Fields: Project ID, Registry type, Developer, Location, Methodology, Verification body, Vintage range
    - [ ] Toggle button: "Advanced Search"
    - [ ] Panel expands below tabs when toggled
    - [ ] Submit triggers filtered view
  - [ ] Existing filter panel (sidebar): Project type, Vintage, Location, Price, Verification
  - [ ] Asset grid view (reuse existing components)
  - [ ] Empty states for each tab (no results, no favorites)
- [ ] Update sidebar navigation:
  - [ ] Remove "Registry Assets" link
  - [ ] Keep "Marketplace" link
  - [ ] (Optional) Add "Registry" as secondary link that redirects to `/marketplace?tab=registry`
- [ ] Test:
  - [ ] Tab switching works
  - [ ] URL updates on tab change
  - [ ] Advanced search panel toggles and filters results
  - [ ] Filters work across all tabs
  - [ ] Empty states display correctly

**Acceptance Criteria**:
- ✅ Single Marketplace page with functional tabs
- ✅ Advanced Search panel replaces `/assets/look-up`
- ✅ URL state reflects active tab (`?tab=registry`)
- ✅ Filters and sort work across all tabs
- ✅ Empty states for each tab
- ✅ Redirects from old routes work (see Phase 3.6)

**Files to Create/Update**:
- `src/pages/Marketplace/index.tsx` (or create if needed)
- `src/pages/Marketplace/AdvancedSearch.tsx` (panel component)
- `src/routes.tsx` (remove old routes)
- `src/components/Sidebar/` (update navigation links)

---

#### 3.2 Convert Deposit and Withdraw to Drawers

**Goal**: Replace `/wallet/deposit` and `/wallet/withdraw-tokenized-carbon-credit` with drawers

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Remove `/wallet/deposit` route
  - [ ] Remove `/wallet/withdraw-tokenized-carbon-credit` route
  - [ ] Set up redirects (see 3.6)
- [ ] Update `src/pages/Wallet/WalletInfoScreen.tsx`:
  - [ ] Add state for drawer visibility: `openDeposit`, `openWithdraw`
  - [ ] "Deposit" button → Opens Deposit Drawer
  - [ ] "Withdraw" button → Opens Withdraw Drawer
  - [ ] URL state management: `?action=deposit` or `?action=withdraw`
  - [ ] Deep linking: Auto-open drawer if URL has action param
- [ ] Create `src/pages/Wallet/DepositDrawer.tsx`:
  - [ ] Size: lg (600px)
  - [ ] Content: Migrate form from current Deposit page
  - [ ] Tabs inside drawer: Fiat | Crypto | History
  - [ ] Fiat form: Currency, Amount, Payment method
  - [ ] Crypto form: Asset, Network, Address (QR code)
  - [ ] History table: Recent deposits (optional, or link to full history)
  - [ ] Success: Toast notification, drawer closes, wallet balance updates
- [ ] Create `src/pages/Wallet/WithdrawDrawer.tsx`:
  - [ ] Size: lg (600px)
  - [ ] Content: Migrate form from current Withdraw page
  - [ ] Tabs inside drawer: To Bank | To Registry | History
  - [ ] To Bank form: Amount, Bank account, Fee display
  - [ ] To Registry form: Amount, Registry account, Fee display
  - [ ] History table: Recent withdrawals (optional)
  - [ ] Success: Toast notification, drawer closes, wallet balance updates
- [ ] Test:
  - [ ] Buttons trigger drawers
  - [ ] URL updates on open (`?action=deposit`)
  - [ ] Deep links work (`/wallet?action=withdraw` auto-opens drawer)
  - [ ] Forms submit successfully
  - [ ] Wallet balance visible on left while drawer is open
  - [ ] ESC and backdrop click close drawer

**Acceptance Criteria**:
- ✅ Deposit and Withdraw are drawers, not full pages
- ✅ URL state management for deep linking
- ✅ Forms functional with validation and error handling
- ✅ Success feedback via toast notifications
- ✅ Wallet context visible while drawer is open
- ✅ Old routes redirect to `/wallet?action=X`

**Files to Create/Update**:
- `src/pages/Wallet/DepositDrawer.tsx` (new)
- `src/pages/Wallet/WithdrawDrawer.tsx` (new)
- `src/pages/Wallet/WalletInfoScreen.tsx` (update to integrate drawers)
- `src/routes.tsx` (remove old routes)

---

#### 3.3 Convert Forgot Password to Modal

**Goal**: Replace `/forgot-password` route with modal on Login page

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Remove `/forgot-password` route
  - [ ] Set up redirect (see 3.6)
- [ ] Update `src/pages/Login.tsx`:
  - [ ] Add "Forgot Password?" link
  - [ ] Add state: `openForgotPasswordModal`
  - [ ] Link click → Opens Forgot Password Modal
- [ ] Create `src/components/Auth/ForgotPasswordModal.tsx`:
  - [ ] Size: sm (400px)
  - [ ] Form: Email input field
  - [ ] Submit: Send reset link via API
  - [ ] Success: Toast notification, modal closes, "Check your email" message
  - [ ] Error: Inline error message below email field
- [ ] Test:
  - [ ] Link triggers modal
  - [ ] Form submission works
  - [ ] Success and error states display correctly
  - [ ] Modal closes on cancel or after success

**Acceptance Criteria**:
- ✅ Forgot Password is modal from Login page, not separate route
- ✅ Form functional with validation
- ✅ Success message and error handling
- ✅ Old route redirects to `/login`

**Files to Create/Update**:
- `src/components/Auth/ForgotPasswordModal.tsx` (new)
- `src/pages/Login.tsx` (update to integrate modal)
- `src/routes.tsx` (remove route)

---

#### 3.4 Convert Notification Detail to Drawer

**Goal**: Replace `/notifications/:id` route with drawer

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Remove `/notifications/:id` route
  - [ ] Set up redirect (see 3.6)
- [ ] Update `src/pages/Notifications/index.tsx`:
  - [ ] Add state: `openDetailDrawer`, `selectedNotificationId`
  - [ ] List item click → Opens Notification Detail Drawer
  - [ ] URL state: `?detail=123`
  - [ ] Deep linking: Auto-open drawer if URL has detail param
- [ ] Create `src/pages/Notifications/NotificationDetailDrawer.tsx`:
  - [ ] Size: sm-md (320-480px)
  - [ ] Content: Full notification text, timestamp, related actions
  - [ ] Actions: "Mark as Read", "Delete", "Go to Related Page" (if applicable)
  - [ ] Navigation arrows: Previous/Next notification (optional)
  - [ ] Close: ESC, backdrop click, close button
- [ ] Test:
  - [ ] List item click opens drawer
  - [ ] URL updates (`?detail=123`)
  - [ ] Deep link auto-opens drawer
  - [ ] Actions work (mark as read, delete)
  - [ ] Navigation arrows work (if implemented)

**Acceptance Criteria**:
- ✅ Notification detail is drawer, not separate route
- ✅ URL state management for deep linking
- ✅ Actions functional (mark as read, delete)
- ✅ List context visible while drawer is open
- ✅ Old route redirects to `/notifications?detail=:id`

**Files to Create/Update**:
- `src/pages/Notifications/NotificationDetailDrawer.tsx` (new)
- `src/pages/Notifications/index.tsx` (update to integrate drawer)
- `src/routes.tsx` (remove route)

---

#### 3.5 Convert List Assets to Modal

**Goal**: Replace `/list-tokenized-assets` route with modal

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Remove `/list-tokenized-assets` route
  - [ ] Set up redirect (see 3.6)
- [ ] Update `src/pages/Wallet/WalletInfoScreen.tsx` or `src/pages/Portfolio/index.tsx`:
  - [ ] Add "List for Sale" action on asset cards (Wallet) or position rows (Portfolio)
  - [ ] Action click → Opens List Asset Modal
  - [ ] URL state (optional): `?action=list&asset=XYZ`
- [ ] Create `src/components/Asset/ListAssetModal.tsx`:
  - [ ] Size: md (600px)
  - [ ] Form fields:
    - [ ] Asset selection (dropdown, auto-selected if launched from asset card)
    - [ ] Project info card (auto-populated after asset selection)
    - [ ] Quantity (number input, show max available)
    - [ ] Listing method (radio: SPOT, AUCTION [disabled/coming soon])
    - [ ] Price per unit (number input, show market reference price)
    - [ ] List duration (dropdown: 30, 60, 90 days, or custom date picker)
    - [ ] Transfer restrictions (toggle, expandable section)
  - [ ] Actions: Cancel, Confirm
  - [ ] Submit: Create listing via API
  - [ ] Success: Toast notification, modal closes, asset listed in marketplace
  - [ ] Error: Inline error messages
- [ ] Test:
  - [ ] Action triggers modal
  - [ ] Asset auto-selected if launched from asset card
  - [ ] Form validation works
  - [ ] Success and error handling
  - [ ] Modal closes on cancel or after success

**Acceptance Criteria**:
- ✅ List Asset is modal from Wallet or Portfolio, not separate route
- ✅ Form functional with all fields and validation
- ✅ Success feedback via toast
- ✅ Old route redirects to `/wallet?action=list` or `/portfolio?action=list`

**Files to Create/Update**:
- `src/components/Asset/ListAssetModal.tsx` (new)
- `src/pages/Wallet/WalletInfoScreen.tsx` (add action button)
- `src/pages/Portfolio/index.tsx` (add action button on positions)
- `src/routes.tsx` (remove route)

---

#### 3.6 Set Up Redirects

**Goal**: Ensure old URLs redirect to new locations

**Tasks**:
- [ ] Update `src/routes.tsx` to add redirects:
  ```tsx
  // Example redirect structure
  {
    path: '/forgot-password',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/reset-password',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/2fa',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/assets',
    element: <Navigate to="/marketplace?tab=registry" replace />
  },
  {
    path: '/assets/look-up',
    element: <Navigate to="/marketplace?search=open" replace />
  },
  {
    path: '/wallet/deposit',
    element: <Navigate to="/wallet?action=deposit" replace />
  },
  {
    path: '/wallet/withdraw-tokenized-carbon-credit',
    element: <Navigate to="/wallet?action=withdraw" replace />
  },
  {
    path: '/list-tokenized-assets',
    element: <Navigate to="/wallet?action=list" replace />
  },
  {
    path: '/notifications/:id',
    loader: ({ params }) => <Navigate to={`/notifications?detail=${params.id}`} replace />
  },
  {
    path: '/logout',
    element: <Navigate to="/" replace />
    // Note: Logout should be handled as action, not route
  }
  ```
- [ ] Test each redirect by manually navigating to old URLs
- [ ] Verify query params are preserved where applicable
- [ ] Verify redirects work for both authenticated and unauthenticated users

**Acceptance Criteria**:
- ✅ All old URLs redirect to correct new locations
- ✅ Query params preserved where needed
- ✅ No broken links in app
- ✅ Analytics tracks redirects (if instrumented)

**Files to Update**:
- `src/routes.tsx`

---

#### 3.7 Remove Logout Route, Implement as Action

**Goal**: Replace `/logout` route with logout action triggered from sidebar

**Tasks**:
- [ ] Update `src/routes.tsx`:
  - [ ] Remove `/logout` route
  - [ ] Add redirect to `/` (see 3.6)
- [ ] Update `src/components/Sidebar/` or wherever Logout link exists:
  - [ ] Change from `<Link to="/logout">` to `<button onClick={handleLogout}>`
  - [ ] Add state: `openLogoutConfirmation`
  - [ ] Button click → Opens Logout Confirmation Modal
- [ ] Create `src/components/Auth/LogoutConfirmationModal.tsx`:
  - [ ] Size: sm (400px)
  - [ ] Message: "Are you sure you want to log out?"
  - [ ] Actions: Cancel, Log Out
  - [ ] Log Out click → Call logout service, redirect to `/login`
- [ ] Test:
  - [ ] Logout button opens confirmation modal
  - [ ] Cancel closes modal without logging out
  - [ ] Log Out logs user out and redirects to login
  - [ ] Session cleared (JWT tokens, local storage)

**Acceptance Criteria**:
- ✅ Logout is action with confirmation modal, not route
- ✅ Confirmation modal functional
- ✅ Logout clears session and redirects correctly
- ✅ Old route redirects to `/` (but doesn't log out user)

**Files to Create/Update**:
- `src/components/Auth/LogoutConfirmationModal.tsx` (new)
- `src/components/Sidebar/` (update logout link to button)
- `src/routes.tsx` (remove route)

---

### Phase 4: KPI De-duplication (Sprint 7)

#### 4.1 Remove Duplicate Portfolio Metrics

**Goal**: Eliminate duplicate hero metrics from Portfolio page

**Tasks**:
- [ ] Update `src/pages/Portfolio/index.tsx`:
  - [ ] **Before**: Hero section with Total Portfolio Value, YTD, Total Credits, Active Positions, Avg Cost Basis
  - [ ] **After Option 1 (Compact Header)**: Replace hero with single-line compact header
    ```
    Portfolio: $48,250 (+4.2% YTD)
    ```
    - Small font size (--text-body-lg or --text-h4)
    - No gradient background
    - Single line, left-aligned
  - [ ] **After Option 2 (Remove Entirely)**: Remove hero section completely
    - Rely on Dashboard for Total Portfolio Value
    - Portfolio page starts with metrics grid (Open Positions, Historical, Pending)
  - [ ] Recommendation: Test both with users; if user testing unavailable, implement Compact Header (safer)
- [ ] Keep metrics grid: Open Positions, Historical Value, Pending Contracts
- [ ] Add 4th metric or new tab: Active Agreements (move from Dashboard "Coming Soon")
- [ ] Test:
  - [ ] No visual duplication between Dashboard and Portfolio
  - [ ] Portfolio page still feels complete (not missing critical info)
  - [ ] Users can orient themselves without hero (if removed)

**Acceptance Criteria**:
- ✅ Portfolio hero metrics reduced or removed
- ✅ Compact header implemented (if chosen approach)
- ✅ Metrics grid remains functional
- ✅ No duplicate KPIs across Dashboard and Portfolio
- ✅ User testing validates change (if possible)

**Files to Update**:
- `src/pages/Portfolio/index.tsx`

---

#### 4.2 Update Dashboard Hero (If Needed)

**Goal**: Ensure Dashboard remains single source of truth for global KPIs

**Tasks**:
- [ ] Verify Dashboard hero displays:
  - [ ] Total Portfolio Value (large, prominent)
  - [ ] YTD Change (dollar + percentage)
  - [ ] 24H Change
  - [ ] All-Time High
  - [ ] Total Returns
- [ ] Ensure metrics grid displays:
  - [ ] Total Staked
  - [ ] Monthly Earnings
  - [ ] Available Balance
- [ ] Remove "Active Positions (Coming Soon)" section
  - [ ] Move to Portfolio → Open Positions tab (or Active Agreements tab)
- [ ] Test:
  - [ ] Dashboard remains comprehensive overview
  - [ ] No missing KPIs after Portfolio hero removal
  - [ ] Visual hierarchy clear (hero → metrics grid → impact → actions)

**Acceptance Criteria**:
- ✅ Dashboard hero displays all global KPIs
- ✅ "Coming Soon" section removed or repurposed
- ✅ Dashboard remains single source of truth for portfolio value

**Files to Update**:
- `src/pages/Dashboard/DashboardHome.tsx` (or equivalent)

---

### Phase 5: Accessibility & Polish (Sprint 8-9)

#### 5.1 Keyboard Navigation Audit

**Goal**: Ensure all interactive elements are keyboard accessible

**Tasks**:
- [ ] Test Tab/Shift+Tab navigation through all pages
  - [ ] Focus order is logical (follows visual layout)
  - [ ] All interactive elements are focusable (buttons, links, inputs, modals, drawers)
  - [ ] No focus traps (except in modals/drawers, which are intentional)
- [ ] Test keyboard actions:
  - [ ] Enter/Space activates buttons and links
  - [ ] ESC closes modals, drawers, dropdowns
  - [ ] Arrow keys navigate through lists, tabs, select options
  - [ ] Enter submits forms (when focus is in input)
- [ ] Add "Skip to main content" link at top of page (hidden until focused)
- [ ] Test focus indicators:
  - [ ] All focusable elements have visible focus ring (2px outline, sufficient contrast)
  - [ ] Focus ring color uses design token (--brand-primary-500 or similar)
- [ ] Fix any issues found

**Acceptance Criteria**:
- ✅ All pages navigable via keyboard only
- ✅ Focus order logical
- ✅ All actions triggerable via keyboard
- ✅ Focus indicators visible and high-contrast
- ✅ Skip to main content link present and functional

**Tools**:
- Manual testing (Tab through entire app)
- Browser DevTools (Accessibility tab)
- Lighthouse Accessibility audit (target: 95+)

---

#### 5.2 Screen Reader Audit

**Goal**: Ensure app is usable with screen readers

**Tasks**:
- [ ] Test with screen readers:
  - [ ] NVDA (Windows)
  - [ ] VoiceOver (macOS/iOS)
  - [ ] JAWS (Windows, if available)
- [ ] Verify:
  - [ ] Page titles update on route change
  - [ ] All images have alt text (decorative images: `alt=""`)
  - [ ] All icon-only buttons have `aria-label`
  - [ ] Form fields have associated labels (not just placeholders)
  - [ ] Error messages announced (`role="alert"` or `aria-live`)
  - [ ] Loading states announced (`aria-busy`, `aria-live="polite"`)
  - [ ] Modal/drawer title and description announced on open
  - [ ] Focus moves to first element in modal/drawer on open
  - [ ] Focus returns to trigger element on close
- [ ] Fix any issues found

**Acceptance Criteria**:
- ✅ All content accessible via screen reader
- ✅ Announcements for dynamic content (errors, loading, success)
- ✅ Modal/drawer focus management works
- ✅ No unlabeled interactive elements

---

#### 5.3 Color Contrast Audit

**Goal**: Ensure WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text)

**Tasks**:
- [ ] Use contrast checker tool (WebAIM, Lighthouse, browser DevTools)
- [ ] Check all text on light backgrounds:
  - [ ] Body text: 4.5:1 minimum
  - [ ] Large text (18px+): 3:1 minimum
  - [ ] UI elements (buttons, borders): 3:1 minimum
- [ ] Check all text on dark backgrounds (dark mode)
- [ ] Check text on gradient backgrounds (Dashboard/Portfolio/Wallet heroes)
  - [ ] If contrast fails, adjust gradient colors or add text shadow/background
- [ ] Fix any issues by adjusting color tokens

**Acceptance Criteria**:
- ✅ All text meets WCAG AA contrast ratios
- ✅ All UI elements (buttons, borders) meet 3:1 contrast
- ✅ Dark mode contrast ratios meet standards
- ✅ Gradient backgrounds do not compromise text readability

**Tools**:
- WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)
- Lighthouse Accessibility audit
- Browser DevTools (Accessibility > Contrast)

---

#### 5.4 ARIA Attribute Audit

**Goal**: Ensure ARIA attributes are used correctly and only when necessary

**Tasks**:
- [ ] Review all components for ARIA usage:
  - [ ] Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
  - [ ] Drawers: Same as modals
  - [ ] Alerts: `role="alert"` (errors) or `role="status"` (info), `aria-live`
  - [ ] Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
  - [ ] Tables: `aria-sort` on sortable columns, `aria-selected` on selected rows
  - [ ] Forms: `aria-required`, `aria-invalid`, `aria-describedby` for errors/helper text
  - [ ] Buttons: `aria-label` for icon-only buttons, `aria-expanded` for dropdowns
  - [ ] Loading states: `aria-busy="true"`
- [ ] Ensure ARIA is not overused:
  - [ ] Use semantic HTML first (`<button>`, `<nav>`, `<main>`, `<article>`)
  - [ ] Only add ARIA when semantic HTML is insufficient
- [ ] Validate ARIA usage with axe DevTools or similar

**Acceptance Criteria**:
- ✅ ARIA attributes used correctly per spec
- ✅ No redundant ARIA (prefer semantic HTML)
- ✅ No ARIA errors in axe DevTools or Lighthouse

**Tools**:
- axe DevTools browser extension
- Lighthouse Accessibility audit
- Manual review

---

#### 5.5 Responsive Testing

**Goal**: Ensure all screens work on mobile, tablet, desktop

**Tasks**:
- [ ] Test on mobile (375px, 414px widths):
  - [ ] Drawers convert to BottomSheet or full-screen modal
  - [ ] Tables convert to card view or horizontal scroll
  - [ ] Grids stack to single column
  - [ ] Hero sections compact
  - [ ] Touch targets are at least 44x44px
  - [ ] Text is readable without zooming
- [ ] Test on tablet (768px, 1024px widths):
  - [ ] 2-column grids
  - [ ] Smaller drawers (400px)
  - [ ] Tables work (may need horizontal scroll for wide tables)
- [ ] Test on desktop (1280px, 1920px widths):
  - [ ] Full layout
  - [ ] 3-column grids
  - [ ] Drawers at specified sizes
- [ ] Test orientation changes (portrait ↔ landscape)
- [ ] Fix any layout issues

**Acceptance Criteria**:
- ✅ App functional on all viewport sizes
- ✅ No horizontal scroll (except intentional table overflow)
- ✅ Touch targets large enough on mobile
- ✅ Text readable without zooming

**Tools**:
- Browser DevTools responsive mode
- Real devices (iOS, Android)
- BrowserStack or similar for cross-device testing

---

#### 5.6 Animation & Motion Audit

**Goal**: Ensure animations are smooth and respect user preferences

**Tasks**:
- [ ] Verify all animations use defined durations (150-300ms for most)
- [ ] Check easing functions (use `ease-out` or `cubic-bezier`)
- [ ] Test `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
  - [ ] Enable reduced motion in OS settings
  - [ ] Test app: Animations should be instant or very short
- [ ] Ensure no layout shift when modals/drawers open
- [ ] Test frame rate (animations should be 60fps)

**Acceptance Criteria**:
- ✅ All animations smooth (60fps)
- ✅ `prefers-reduced-motion` respected
- ✅ No layout shift during animations

---

### Phase 6: Analytics & Monitoring (Sprint 10)

#### 6.1 Analytics Instrumentation

**Goal**: Track success metrics from rationalization plan

**Tasks**:
- [ ] Instrument key events:
  - [ ] Route changes (track reduced route count)
  - [ ] Modal/drawer opens (track usage of new patterns)
  - [ ] Form submissions (Deposit, Withdraw, List Asset, Tokenization)
  - [ ] User flows (Dashboard → Marketplace → Purchase)
  - [ ] Error events (API failures, validation errors)
  - [ ] Redirects from old URLs (track migration issues)
- [ ] Set up dashboards to monitor:
  - [ ] Avg. routes per session (target: 25% reduction)
  - [ ] Task completion rates (Deposit, Tokenization, etc.)
  - [ ] Time to complete tasks
  - [ ] Marketplace browse → purchase conversion
  - [ ] Notification engagement rate
  - [ ] Portfolio view frequency
  - [ ] Support tickets related to "where is X" (should decrease)
- [ ] Compare metrics before and after rationalization

**Acceptance Criteria**:
- ✅ All key events instrumented
- ✅ Dashboards set up for monitoring
- ✅ Baseline metrics captured for comparison

**Tools**:
- Google Analytics, Mixpanel, or similar
- Custom event tracking (if needed)

---

#### 6.2 Error Monitoring

**Goal**: Catch and fix issues quickly after deployment

**Tasks**:
- [ ] Set up error tracking (Sentry, LogRocket, or similar)
- [ ] Monitor for:
  - [ ] JavaScript errors
  - [ ] API errors
  - [ ] Redirect errors (404s from old URLs)
  - [ ] Validation errors (frequent failures indicate UX issues)
- [ ] Set up alerts for critical errors
- [ ] Review errors daily for first week after deployment

**Acceptance Criteria**:
- ✅ Error tracking configured
- ✅ Alerts set up for critical errors
- ✅ Monitoring in place for first week post-launch

**Tools**:
- Sentry, LogRocket, or similar error tracking service

---

### Phase 7: Documentation & Handoff (Sprint 10)

#### 7.1 Update Documentation

**Goal**: Document all changes for future developers

**Tasks**:
- [ ] Update README.md:
  - [ ] Document new route structure
  - [ ] Document modal/drawer patterns
  - [ ] Document component library
- [ ] Update or create CONTRIBUTING.md:
  - [ ] Guidelines for adding new modals/drawers
  - [ ] Guidelines for using design tokens
  - [ ] Accessibility checklist for new features
- [ ] Update or create COMPONENTS.md:
  - [ ] Document all components (props, usage, examples)
  - [ ] Include design token usage
- [ ] Create MIGRATION.md:
  - [ ] Document old → new URL mappings
  - [ ] Document breaking changes (if any)
  - [ ] Document how to deep link to modals/drawers

**Acceptance Criteria**:
- ✅ README updated with new structure
- ✅ Component documentation complete
- ✅ Migration guide available for users and developers

**Files to Create/Update**:
- `README.md`
- `CONTRIBUTING.md` (new or update)
- `COMPONENTS.md` (new)
- `MIGRATION.md` (new)

---

#### 7.2 Create Storybook or Component Gallery

**Goal**: Provide visual reference for all components

**Tasks**:
- [ ] Set up Storybook (if not already set up)
- [ ] Create stories for all components:
  - [ ] Button (all variants, sizes, states)
  - [ ] Input, Select, FormField
  - [ ] Card, MetricCard
  - [ ] Table
  - [ ] Modal, Drawer, BottomSheet
  - [ ] Toast, InlineAlert
  - [ ] Stepper
  - [ ] EmptyState, Skeleton loaders
- [ ] Document props, usage, accessibility notes
- [ ] Deploy Storybook (Netlify, Vercel, or similar) for easy access

**Acceptance Criteria**:
- ✅ Storybook set up and deployed
- ✅ All components documented with stories
- ✅ Accessible to all developers and designers

**Tools**:
- Storybook (https://storybook.js.org/)

---

#### 7.3 QA Sign-Off

**Goal**: Final validation before production deployment

**Tasks**:
- [ ] Run full QA test suite (see "QA Test Scenarios" in `02_IA_RATIONALIZATION_PLAN.md`)
- [ ] Test all critical paths:
  - [ ] Authentication flow (login, forgot password, 2FA, logout)
  - [ ] Marketplace (tabs, filters, search, project detail drawer)
  - [ ] Wallet (deposit drawer, withdraw drawer, send/receive/swap modals, list asset modal)
  - [ ] Portfolio (tabs, no duplicate metrics)
  - [ ] Notifications (list, detail drawer)
  - [ ] Settings (modals for password, MFA, API keys)
  - [ ] Membership (stake/unstake modals)
- [ ] Test old URL redirects
- [ ] Test empty, loading, error states
- [ ] Test accessibility (keyboard, screen reader, contrast)
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Get sign-off from QA team or product owner

**Acceptance Criteria**:
- ✅ All QA test scenarios pass
- ✅ No critical bugs
- ✅ Sign-off obtained from stakeholders

---

## Domain-Specific Checklists

### Wallet Domain

- [ ] Deposit drawer implemented and functional
- [ ] Withdraw drawer implemented and functional
- [ ] Send modal implemented
- [ ] Receive modal implemented
- [ ] Swap modal implemented
- [ ] List Asset modal implemented (or from Portfolio)
- [ ] Tokenize Credits modal implemented
- [ ] Transaction Detail drawer implemented
- [ ] URL state management for all actions (`?action=deposit`, etc.)
- [ ] Deep linking works
- [ ] Success feedback via toast notifications
- [ ] Wallet balance updates after transactions
- [ ] Empty states for no assets, no activity
- [ ] Loading states for asset cards, activity list

---

### Marketplace Domain

- [ ] Marketplace + Registry Assets merged into single page
- [ ] Tabs implemented: All | Marketplace | Registry | Favorites
- [ ] Tab state managed via URL (`?tab=registry`)
- [ ] Advanced Search panel implemented (replaces `/assets/look-up`)
- [ ] Filters work across all tabs
- [ ] Sort options work
- [ ] Project Detail drawer implemented
- [ ] "Buy Now" modal from project detail
- [ ] Empty states for each tab (no results, no favorites)
- [ ] Loading states for asset grid
- [ ] Redirects from old routes (`/assets`, `/assets/look-up`)

---

### Portfolio Domain

- [ ] Duplicate hero metrics removed or reduced to compact header
- [ ] Metrics grid retained: Open Positions, Historical, Pending
- [ ] Active Agreements added as 4th metric or new tab
- [ ] Tabs functional: Open Positions | Historical Trades | Pending Contracts | Active Agreements
- [ ] Filter and export modals work
- [ ] Empty states for each tab
- [ ] Loading states for tables
- [ ] "List Asset" action available from positions (triggers modal)

---

### Notifications Domain

- [ ] Notification list page retained
- [ ] Notification Detail drawer implemented
- [ ] Detail drawer launched from list item click
- [ ] URL state management (`?detail=123`)
- [ ] Deep linking works
- [ ] Actions work: Mark as Read, Delete, Go to Related Page
- [ ] Navigation arrows work (Previous/Next)
- [ ] Empty state for no notifications
- [ ] Loading state for list
- [ ] Redirect from old route (`/notifications/:id`)

---

### Settings Domain

- [ ] Settings page retained with cards
- [ ] Edit Profile modal implemented
- [ ] Change Password modal implemented
- [ ] MFA Setup modal implemented
- [ ] API Keys modal implemented
- [ ] Delete Account modal implemented (with strong confirmation)
- [ ] All modals functional with validation
- [ ] Success feedback via toast notifications
- [ ] No separate routes for forms (all modals)

---

### Membership Domain

- [ ] Membership page retained
- [ ] Stake XCB modal implemented
- [ ] Unstake XCB modal implemented
- [ ] Tier Calculator modal implemented (optional)
- [ ] Upgrade Tier modal implemented (optional)
- [ ] Transaction history table functional
- [ ] Empty state for no transactions
- [ ] Loading state for table

---

### Help & Support Domain

- [ ] Help page retained
- [ ] Search bar functional
- [ ] FAQ accordion functional
- [ ] Contact Support modal implemented
- [ ] Modal submission works
- [ ] Success feedback via toast

---

### Authentication Domain

- [ ] Login page retained
- [ ] Forgot Password modal integrated on Login page
- [ ] Reset Password inline flow on Login page (with token from email)
- [ ] 2FA inline during login flow (not separate route)
- [ ] Sign Up page retained
- [ ] Logout action with confirmation modal (not route)
- [ ] Old routes redirect to `/login` or `/signup`

---

## Acceptance Criteria (Definition of Done)

### Functional Requirements
- [ ] Route count reduced from 23 to 12-15 ✅
- [ ] All targeted screens converted to modals/drawers ✅
- [ ] All redirects in place and tested ✅
- [ ] URL state management for deep linking ✅
- [ ] Empty/loading/error states implemented everywhere ✅
- [ ] All QA test scenarios passing ✅

### User Experience
- [ ] No duplicate hero metrics across Dashboard/Portfolio ✅
- [ ] All modals/drawers have clear close mechanisms (X, ESC, backdrop click) ✅
- [ ] Keyboard navigation works for all modals/drawers ✅
- [ ] Mobile: Modals/drawers adapt appropriately (BottomSheet or full-screen) ✅
- [ ] All actions provide clear feedback (toasts, inline messages) ✅
- [ ] Consistent design system (components use design tokens) ✅

### Performance
- [ ] Lighthouse Performance > 90 ✅
- [ ] Lighthouse Accessibility > 95 ✅
- [ ] Lighthouse Best Practices > 90 ✅
- [ ] No layout shift when opening/closing drawers ✅
- [ ] Smooth animations (60fps) ✅

### Accessibility
- [ ] All text meets WCAG AA contrast (4.5:1 body, 3:1 large) ✅
- [ ] Keyboard navigation for all interactive elements ✅
- [ ] Screen reader tested (NVDA, VoiceOver) ✅
- [ ] ARIA attributes used correctly ✅
- [ ] Focus management in modals/drawers ✅
- [ ] `prefers-reduced-motion` respected ✅

### Analytics & Monitoring
- [ ] All key user flows instrumented ✅
- [ ] Dashboard set up for tracking success metrics ✅
- [ ] Error tracking configured ✅
- [ ] Redirect tracking in place ✅

### Documentation
- [ ] README updated with new route structure ✅
- [ ] Component documentation complete (Storybook or COMPONENTS.md) ✅
- [ ] Migration guide available (MIGRATION.md) ✅
- [ ] CONTRIBUTING.md updated with accessibility checklist ✅

---

## Out of Scope (Do Not Implement)

The following are **explicitly out of scope** unless marked otherwise:

- ❌ New features not mentioned in the rationalization plan
- ❌ API changes or backend modifications (unless required for new flows)
- ❌ Complete redesign of existing pages (only rationalization and consolidation)
- ❌ Content changes (legal, compliance text remains unchanged)
- ❌ Renaming of core domain terms (Tokenization, Registry, etc.)
- ❌ Authentication method changes (keep JWT, OAuth, etc. as is)
- ❌ Payment gateway integrations (Deposit/Withdraw use existing integrations)
- ❌ Blockchain functionality changes (tokenization logic remains unchanged)

---

## Migration Notes

### For Users

**What's Changing**:
- Some URLs have changed (bookmarks may need updating)
- Old URLs will redirect automatically
- Deposit, Withdraw, Notifications, and other actions now open in drawers/modals instead of new pages
- Marketplace and Registry Assets are now combined in one place

**What's Not Changing**:
- Your account, assets, and data remain unchanged
- All features are still available (just in new locations)
- Login credentials and security settings remain the same

**If You Experience Issues**:
- Clear browser cache
- Update bookmarks to new URLs
- Contact support if old links don't redirect properly

### For Developers

**Breaking Changes**:
- Route structure changed (see `02_IA_RATIONALIZATION_PLAN.md` redirect map)
- Some page components removed (Deposit, Withdraw, Forgot Password, Notification Detail, List Assets)
- Functionality moved to modals/drawers

**Non-Breaking Changes**:
- Component API remains mostly the same
- Services (API calls) unchanged
- State management structure unchanged

**How to Handle**:
- Update internal links to use new routes
- Test deep linking for modals/drawers (URL state params)
- Update analytics event names if needed
- Review and update any hardcoded URLs in code or docs

---

## Rollback Plan

**If Critical Issues Arise Post-Deployment**:

1. **Immediate Rollback**:
   - Revert to previous deployment (git tag or branch)
   - Monitor error rates and user feedback

2. **Partial Rollback**:
   - Keep redirects in place
   - Re-enable old routes temporarily (remove redirects)
   - Fix issues in feature branch
   - Re-deploy when fixed

3. **Hybrid Approach**:
   - Keep some changes (design tokens, component library)
   - Revert problematic changes (e.g., Marketplace merge)
   - Iterate in smaller increments

---

## Success Metrics (Track Post-Launch)

### Quantitative Metrics

| Metric | Baseline (Before) | Target (After) | Actual | Date Measured |
|--------|-------------------|----------------|--------|---------------|
| Avg. routes per session | ~8 | ~5-6 (25% ↓) | ___ | ___ |
| Deposit task completion rate | __% | +10-15% | __% | ___ |
| Time to complete tokenization | __ min | -20-30% | __ min | ___ |
| Marketplace → purchase conversion | __% | +5-10% | __% | ___ |
| Notification engagement rate | __% | +15-20% | __% | ___ |
| Portfolio view frequency | __ views/day | Maintain or ↑ | ___ | ___ |
| Support tickets ("where is X") | __ tickets/week | ↓ 30-50% | ___ | ___ |
| Lighthouse Accessibility score | __ | 95+ | ___ | ___ |

### Qualitative Metrics

- User satisfaction (CSAT survey): Target +10 points
- User feedback on simplified navigation
- Support feedback on reduced confusion
- Developer feedback on maintainability

---

## Timeline Estimate

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1: Foundation | 2 sprints (4 weeks) | Design tokens, base components, empty/loading/error states |
| Phase 2: Overlay Components | 2 sprints (4 weeks) | Modal, Drawer, BottomSheet, Toast, Stepper |
| Phase 3: Route Consolidation | 2 sprints (4 weeks) | Marketplace merge, Wallet drawers, Notification drawer, List Asset modal, Forgot Password modal, Logout action, Redirects |
| Phase 4: KPI De-duplication | 1 sprint (2 weeks) | Portfolio hero reduction, Dashboard verification |
| Phase 5: Accessibility & Polish | 2 sprints (4 weeks) | Keyboard navigation, screen reader, contrast, ARIA, responsive, animation audits |
| Phase 6: Analytics & Monitoring | 1 sprint (2 weeks) | Analytics instrumentation, error monitoring |
| Phase 7: Documentation & Handoff | 1 sprint (2 weeks) | Docs, Storybook, QA sign-off |
| **Total** | **10 sprints (20 weeks / 5 months)** | **Fully rationalized DApp** |

**Note**: Adjust timeline based on team size, availability, and complexity discovered during implementation.

---

## Support During Implementation

### Questions?

- Refer back to `01_SCREEN_AUDIT.md` for detailed audit findings
- Refer to `02_IA_RATIONALIZATION_PLAN.md` for detailed flow rewrites and navigation map
- Refer to `03_UI_PATTERNS_AND_COMPONENTS.md` for component specs and design tokens

### Need Clarification?

- If a decision is ambiguous, document the question and make a best-effort assumption
- Mark with `<!-- TODO: Need clarification on X -->` in code comments
- Bring to next standup or planning meeting

### Discovered New Issues?

- Document in a separate ISSUES.md file
- Prioritize: Critical (blocks implementation), High (impacts UX), Medium (nice-to-have), Low (polish)
- Address critical issues immediately; defer others to backlog

---

## Final Checklist (Pre-Deployment)

- [ ] All phases completed and acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual QA completed
- [ ] Accessibility audit passed (Lighthouse, manual testing)
- [ ] Performance audit passed (Lighthouse)
- [ ] Analytics instrumented
- [ ] Error monitoring configured
- [ ] Documentation updated (README, COMPONENTS, MIGRATION)
- [ ] Stakeholder sign-off obtained
- [ ] Rollback plan documented and ready
- [ ] Team trained on new patterns (if applicable)
- [ ] Support team informed of changes
- [ ] Deployment plan finalized (staging → production)

---

**STATUS**: ✅ Ready for Implementation  
**Assigned To**: Implementation Agent / Development Team  
**Start Date**: TBD  
**Target Completion**: TBD (estimate: 5 months / 10 sprints)

**Good luck! 🚀**
