# 03_UI_PATTERNS_AND_COMPONENTS.md

## Purpose

This document defines the standardized UI kit, modal/drawer decision rules, design tokens, and component specifications for the rationalized XCARBON DApp. It ensures consistency, accessibility, and professional fintech aesthetics.

---

## Design Tokens

### Color Palette

#### Brand Colors (Eco-Fintech Theme)

| Token Name | Hex Value | Usage | WCAG AA Contrast | Notes |
|------------|-----------|-------|------------------|-------|
| `--brand-primary-700` | `#2D5016` | Primary buttons, key CTAs | ✅ White text: 10.2:1 | Deep forest green |
| `--brand-primary-600` | `#4C6663` | Secondary actions, borders | ✅ White text: 6.8:1 | Current primary |
| `--brand-primary-500` | `#5B7D5A` | Hover states, accents | ⚠️ Check per usage | Mid-tone green |
| `--brand-primary-400` | `#7D9B7C` | Disabled states | ⚠️ Needs dark text | Light green |
| `--brand-primary-100` | `#E8F3E8` | Backgrounds, subtle highlights | ✅ Dark text: 12.1:1 | Very light green |

#### Accent Colors (Financial Trust)

| Token Name | Hex Value | Usage | WCAG AA Contrast | Notes |
|------------|-----------|-------|------------------|-------|
| `--accent-blue-700` | `#1E3A5F` | Financial elements, wallet | ✅ White text: 11.5:1 | Deep blue |
| `--accent-blue-600` | `#2E5C8A` | Hover states | ✅ White text: 7.2:1 | Mid blue |
| `--accent-blue-500` | `#5B9BD5` | Icons, links | ✅ Dark bg: 4.6:1 | Lighter blue |
| `--accent-blue-100` | `#E6F2FF` | Backgrounds | ✅ Dark text: 13.5:1 | Very light blue |

#### Semantic Colors

| Token Name | Hex Value | Usage | WCAG AA Contrast | Notes |
|------------|-----------|-------|------------------|-------|
| `--success-700` | `#1E5F1E` | Success states, gains | ✅ White text: 8.9:1 | Dark green |
| `--success-600` | `#2D7A2D` | Buttons, badges | ✅ White text: 6.5:1 | Success green |
| `--success-100` | `#E8F8E8` | Backgrounds | ✅ Dark text: 14.2:1 | Light success |
| `--error-700` | `#8B1E1E` | Critical errors | ✅ White text: 9.8:1 | Dark red |
| `--error-600` | `#C62828` | Error states, losses | ✅ White text: 5.9:1 | Error red |
| `--error-100` | `#FFEBEE` | Error backgrounds | ✅ Dark text: 13.8:1 | Light error |
| `--warning-700` | `#8B5E00` | Warnings, alerts | ✅ White text: 7.2:1 | Dark orange |
| `--warning-600` | `#F57C00` | Warning badges | ✅ Dark text: 4.8:1 | Warning orange |
| `--warning-100` | `#FFF3E0` | Warning backgrounds | ✅ Dark text: 15.1:1 | Light warning |
| `--info-600` | `#0277BD` | Informational | ✅ White text: 6.1:1 | Info blue |
| `--info-100` | `#E1F5FE` | Info backgrounds | ✅ Dark text: 14.5:1 | Light info |

#### Neutral Colors (Light Mode)

| Token Name | Hex Value | Usage | WCAG AA Contrast | Notes |
|------------|-----------|-------|------------------|-------|
| `--neutral-900` | `#0F1419` | Headings, primary text | ✅ White bg: 18.2:1 | Near black |
| `--neutral-800` | `#1F2937` | Body text | ✅ White bg: 14.3:1 | Dark gray |
| `--neutral-700` | `#374151` | Secondary text | ✅ White bg: 10.5:1 | Charcoal |
| `--neutral-600` | `#4B5563` | Tertiary text, icons | ✅ White bg: 7.8:1 | Mid gray |
| `--neutral-500` | `#6B7280` | Disabled text | ⚠️ 4.6:1 (AA Large only) | Gray |
| `--neutral-400` | `#9CA3AF` | Borders, dividers | N/A | Light gray |
| `--neutral-300` | `#D1D5DB` | Subtle borders | N/A | Very light gray |
| `--neutral-200` | `#E5E7EB` | Backgrounds, hover | N/A | Off-white |
| `--neutral-100` | `#F3F4F6` | Card backgrounds | N/A | Almost white |
| `--neutral-50` | `#F9FAFB` | Page background | N/A | Barely gray |
| `--white` | `#FFFFFF` | Pure white | ✅ Black text: 21:1 | White |

#### Neutral Colors (Dark Mode)

| Token Name | Hex Value | Usage | WCAG AA Contrast | Notes |
|------------|-----------|-------|------------------|-------|
| `--dark-bg-900` | `#0A0E12` | Page background | ✅ White text: 19.5:1 | Near black |
| `--dark-bg-800` | `#121820` | Card backgrounds | ✅ White text: 16.2:1 | Dark bg |
| `--dark-bg-700` | `#1F2937` | Elevated cards | ✅ White text: 14.3:1 | Charcoal |
| `--dark-bg-600` | `#2F2F2F` | Highlighted sections | ✅ White text: 12.1:1 | Mid-dark |
| `--dark-text-100` | `#F9FAFB` | Headings | ✅ Dark bg: 17.8:1 | Almost white |
| `--dark-text-200` | `#E5E7EB` | Body text | ✅ Dark bg: 14.5:1 | Light gray |
| `--dark-text-300` | `#D1D5DB` | Secondary text | ✅ Dark bg: 11.2:1 | Gray |
| `--dark-text-400` | `#9CA3AF` | Tertiary text | ✅ Dark bg: 7.1:1 | Mid gray |

#### Gradient Backgrounds (Use Sparingly)

| Token Name | Gradient | Usage | Notes |
|------------|----------|-------|-------|
| `--gradient-hero-brand` | `linear-gradient(135deg, #4C6663 0%, #2D5016 100%)` | Dashboard/Portfolio/Wallet heroes | Subtle, professional |
| `--gradient-hero-blue` | `linear-gradient(135deg, #2E5C8A 0%, #1E3A5F 100%)` | Wallet-specific hero | Financial trust |
| `--gradient-card-subtle` | `linear-gradient(180deg, rgba(76,102,99,0.03) 0%, rgba(76,102,99,0.08) 100%)` | Metric cards, subtle depth | Very subtle |
| `--gradient-success` | `linear-gradient(135deg, #2D7A2D 0%, #1E5F1E 100%)` | Positive badges | Gains, success |
| `--gradient-error` | `linear-gradient(135deg, #C62828 0%, #8B1E1E 100%)` | Negative badges | Losses, errors |

**Gradient Usage Rules**:
- Maximum 2 gradients per screen
- Hero sections only
- Avoid on interactive elements (buttons use solid colors)
- Ensure text contrast on gradient backgrounds

---

### Typography

#### Font Families

```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Type Scale

| Token Name | Size | Line Height | Weight | Usage |
|------------|------|-------------|--------|-------|
| `--text-hero` | 48px / 3rem | 1.1 | 700 Bold | Dashboard hero numbers |
| `--text-display` | 36px / 2.25rem | 1.2 | 600 Semibold | Page headings (H1) |
| `--text-h2` | 30px / 1.875rem | 1.3 | 600 Semibold | Section headings |
| `--text-h3` | 24px / 1.5rem | 1.4 | 600 Semibold | Subsection headings |
| `--text-h4` | 20px / 1.25rem | 1.5 | 600 Semibold | Card headings |
| `--text-body-lg` | 18px / 1.125rem | 1.6 | 400 Regular | Large body text |
| `--text-body` | 16px / 1rem | 1.6 | 400 Regular | Default body text |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | 400 Regular | Small body text |
| `--text-caption` | 12px / 0.75rem | 1.4 | 400 Regular | Captions, labels |
| `--text-label` | 12px / 0.75rem | 1.4 | 600 Semibold | Form labels, badges |

#### Number Typography

```css
.typography-hero-number {
  font-family: var(--font-mono);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: 1.1;
  font-feature-settings: 'tnum' 1; /* Tabular numerals */
  letter-spacing: -0.02em;
}

.typography-metric-medium {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  font-feature-settings: 'tnum' 1;
}

.typography-body-number {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 500;
  font-feature-settings: 'tnum' 1;
}

.typography-percentage {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  font-feature-settings: 'tnum' 1;
}
```

---

### Spacing

#### Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Icon padding, tight spacing |
| `--space-2` | 8px | Small gaps, inline spacing |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Default spacing (most common) |
| `--space-5` | 20px | Medium spacing |
| `--space-6` | 24px | Large spacing |
| `--space-8` | 32px | Section spacing |
| `--space-10` | 40px | Large section spacing |
| `--space-12` | 48px | Extra large spacing |
| `--space-16` | 64px | Page section spacing |

#### Component Spacing Rules

```css
/* Card padding */
--card-padding: var(--space-6); /* 24px */

/* Section gaps */
--section-gap: var(--space-8); /* 32px */

/* Grid gaps */
--grid-gap: var(--space-6); /* 24px */

/* Form field gap */
--form-gap: var(--space-4); /* 16px */
```

---

### Radius (Border Radius)

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, pills |
| `--radius-md` | 8px | Buttons, inputs, small cards |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Hero cards, large containers |
| `--radius-full` | 9999px | Avatar, circular buttons |

---

### Shadows (Elevation)

```css
/* Light mode */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Dark mode */
--shadow-sm-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-md-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
--shadow-xl-dark: 0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6);
```

**Usage**:
- `sm`: Subtle hover effects
- `md`: Cards, default elevation
- `lg`: Elevated cards, dropdowns
- `xl`: Modals, drawers
- `2xl`: High-priority overlays (rare)

**Reduce Glassmorphism**: Use solid backgrounds with subtle shadows instead of heavy blur/opacity effects for professional fintech aesthetic.

---

## Component Specifications

### 1. MetricCard

**Purpose**: Display key performance indicators consistently across Dashboard, Portfolio, Wallet

**Props**:
```typescript
interface MetricCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  change?: {
    value: number;
    period: '24h' | '7d' | '30d' | 'ytd';
    isPositive: boolean;
  };
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
  tooltip?: string;
  onClick?: () => void;
}
```

**Visual Spec**:
```
┌─────────────────────────────────┐
│  [Icon]  Label           [Info] │
│                                 │
│  $48,250                        │
│  +$1,234 (2.6%) ↑               │
│                                 │
│  [Trend sparkline - optional]   │
└─────────────────────────────────┘
```

**Styling**:
- Background: `--neutral-100` (light) / `--dark-bg-700` (dark)
- Padding: `--space-6` (24px)
- Border radius: `--radius-lg` (12px)
- Shadow: `--shadow-md`
- Hover: Lift effect (`transform: translateY(-2px)`, increase shadow)

**States**:
- Default
- Hover (if clickable)
- Loading (skeleton shimmer)

**Accessibility**:
- `role="article"`
- `aria-label="{label}: {value}"`
- Icon decorative (`aria-hidden="true"`)
- Tooltip trigger via keyboard (Enter/Space)

---

### 2. Button

**Purpose**: Primary interactive element for actions

**Variants**:

| Variant | Background | Text Color | Border | Usage |
|---------|-----------|------------|--------|-------|
| `primary` | `--brand-primary-700` | `--white` | None | Main CTAs (Stake, Buy, Confirm) |
| `secondary` | `--neutral-200` / `--dark-bg-600` | `--neutral-900` / `--dark-text-100` | None | Alternative actions |
| `tonal` | `--brand-primary-100` / rgba | `--brand-primary-700` | None | Subtle emphasis |
| `outline` | Transparent | `--brand-primary-700` | `1px solid --brand-primary-600` | Secondary actions, Cancel |
| `ghost` | Transparent | `--brand-primary-700` | None | Tertiary actions, inline links |
| `destructive` | `--error-600` | `--white` | None | Delete, Remove (rare) |

**Sizes**:

| Size | Height | Padding (horizontal) | Font Size | Usage |
|------|--------|---------------------|-----------|-------|
| `sm` | 32px | 12px | 14px | Compact spaces, inline actions |
| `md` | 40px | 16px | 16px | Default (most common) |
| `lg` | 48px | 24px | 18px | Hero CTAs, high emphasis |

**States**:
- Default
- Hover (darken 10%)
- Active (darken 20%)
- Focus (2px outline, `--brand-primary-500`, offset 2px)
- Disabled (opacity 0.5, cursor not-allowed)
- Loading (spinner, disabled interaction)

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tonal' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Accessibility**:
- Native `<button>` element (keyboard accessible)
- Loading state: `aria-busy="true"`, `aria-live="polite"`
- Icon-only buttons: `aria-label` required
- Disabled: `aria-disabled="true"`

---

### 3. Card

**Purpose**: Base container component for content grouping

**Props**:
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'hero';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean; // Adds hover effect
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Variants**:

| Variant | Background | Border | Shadow | Usage |
|---------|-----------|--------|--------|-------|
| `default` | `--neutral-100` / `--dark-bg-700` | None | `--shadow-sm` | Standard cards |
| `elevated` | `--white` / `--dark-bg-800` | None | `--shadow-md` | Important content |
| `outlined` | `--white` / `--dark-bg-800` | `1px solid --neutral-300` | None | Subtle cards |
| `hero` | Gradient | None | `--shadow-lg` | Dashboard/Portfolio/Wallet heroes |

**Interactive Hover** (if `interactive` prop):
```css
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
}
```

**Accessibility**:
- If clickable: `role="button"`, `tabindex="0"`, keyboard handlers (Enter/Space)
- Non-interactive: `role="article"` or semantic HTML (`<article>`, `<section>`)

---

### 4. Modal

**Purpose**: Focused, blocking overlay for simple tasks and confirmations

**When to Use**:
- Simple forms (≤ 6 fields)
- Confirmations
- Alerts
- Quick info display
- Multi-step wizards (with stepper)

**Anatomy**:
```
┌─────────────────────────────────────────────────┐
│  [X Close]                                      │
│                                                 │
│  Modal Title (H2)                               │
│  Optional description text                      │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │                                           │ │
│  │  Modal Content                            │ │
│  │  (Form fields, text, etc.)                │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  [Cancel]              [Primary Action]   │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Sizing**:

| Size | Width | Usage |
|------|-------|-------|
| `sm` | 400px | Confirmations, simple forms |
| `md` | 600px | Default, standard forms |
| `lg` | 800px | Complex forms, wizards |
| `xl` | 1000px | Rich content (rare) |

**Styling**:
- Background: `--white` / `--dark-bg-800`
- Border radius: `--radius-xl` (16px)
- Shadow: `--shadow-2xl`
- Backdrop: `rgba(0, 0, 0, 0.5)` (light) / `rgba(0, 0, 0, 0.7)` (dark)
- Padding: `--space-8` (32px)

**Animation**:
```css
/* Enter */
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Exit */
@keyframes modalExit {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}
```

**Behavior**:
- Backdrop click → Close (unless `disableBackdropClick`)
- ESC key → Close (unless `disableEscapeKey`)
- Focus trap: Tab cycles through modal elements only
- Auto-focus first focusable element on open
- Return focus to trigger element on close

**Props**:
```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disableBackdropClick?: boolean;
  disableEscapeKey?: boolean;
  actions?: React.ReactNode; // Custom action buttons
  children: React.ReactNode;
}
```

**Accessibility**:
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="{titleId}"`
- `aria-describedby="{descriptionId}"`
- Focus trap with Tab/Shift+Tab
- ESC to close (announce to screen reader)
- Close button: `aria-label="Close dialog"`

**Examples**:
- Forgot Password: Small modal, 1 field
- Send Asset: Medium modal, 3 fields
- Tokenization Wizard: Large modal, multi-step

---

### 5. Drawer (Side Sheet)

**Purpose**: Display detail or forms while keeping parent context visible

**When to Use**:
- Detail view from list (Project Detail, Notification Detail, Transaction Detail)
- Complex forms that benefit from context (Deposit, Withdraw)
- Secondary navigation or filters

**Anatomy**:
```
┌──────────────────────┬────────────────────────────┐
│                      │  [X Close]                 │
│  Parent Page         │                            │
│  (e.g., Marketplace  │  Drawer Title (H2)         │
│   asset list)        │  ─────────────────────── │
│                      │                            │
│  Visible on left     │  Drawer Content            │
│  while drawer is     │  (scrollable if needed)    │
│  open on right       │                            │
│                      │                            │
│                      │                            │
│                      │  ┌──────────────────────┐ │
│                      │  │  Actions (if needed) │ │
│                      │  └──────────────────────┘ │
└──────────────────────┴────────────────────────────┘
```

**Sizing**:

| Size | Width | Usage |
|------|-------|-------|
| `sm` | 320px | Narrow content (filters, notifications) |
| `md` | 480px | Default (project detail, transaction detail) |
| `lg` | 600px | Complex forms (deposit, withdraw) |
| `xl` | 800px | Rich content (rare) |

**Mobile Adaptation**:
- < 768px: Drawer becomes bottom sheet or full-screen modal
- Swipe down to close

**Styling**:
- Background: `--white` / `--dark-bg-800`
- Shadow: `--shadow-xl` (left edge shadow)
- Backdrop: `rgba(0, 0, 0, 0.3)` (light) / `rgba(0, 0, 0, 0.5)` (dark)
- Padding: `--space-6` (24px)

**Animation**:
```css
/* Enter from right */
@keyframes drawerEnter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Exit to right */
@keyframes drawerExit {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
```

**Behavior**:
- Backdrop click → Close
- ESC key → Close
- Focus trap while open
- URL state update: `?detail=123` (for deep linking)
- Navigation arrows (optional): Previous/Next through list items

**Props**:
```typescript
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  anchor?: 'left' | 'right'; // Default: right
  showNavigation?: boolean; // Previous/Next arrows
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  children: React.ReactNode;
}
```

**Accessibility**:
- Same as Modal: `role="dialog"`, `aria-modal="true"`, focus trap
- Navigation arrows: `aria-label="Previous notification"`, keyboard accessible

**Examples**:
- Project Detail: Medium drawer from marketplace list
- Deposit: Large drawer from Wallet
- Notification Detail: Small drawer from notifications list
- Transaction Detail: Medium drawer from activity list

---

### 6. BottomSheet (Mobile)

**Purpose**: Mobile-optimized transient actions and detail views

**When to Use**:
- Mobile viewports (< 768px)
- Quick actions (Send, Receive, Swap)
- Detail views on mobile

**Anatomy**:
```
┌─────────────────────────────────────┐
│  Parent Page (dimmed)               │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  [Drag handle]                  ││
│  │                                 ││
│  │  Sheet Title                    ││
│  │  ─────────────────────────────  ││
│  │                                 ││
│  │  Sheet Content                  ││
│  │  (scrollable)                   ││
│  │                                 ││
│  │  [Action Buttons]               ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

**Behavior**:
- Swipe down to close
- Tap backdrop to close
- Snap points: 50%, 90%, 100% (configurable)

**Styling**:
- Rounded top corners: `--radius-xl` on top only
- Shadow: `--shadow-2xl` on top edge
- Drag handle: 32px wide × 4px tall, centered, `--neutral-400`

**Props**:
```typescript
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  snapPoints?: number[]; // [0.5, 0.9, 1]
  children: React.ReactNode;
}
```

---

### 7. Stepper (Multi-Step Wizard)

**Purpose**: Guide users through multi-step processes (Tokenization, Mint)

**Anatomy**:
```
┌──────────────────────────────────────────────┐
│  Step 1: Submit → Step 2: Verify → Step 3: Convert → Step 4: Complete  │
│  ━━━━━━━━━━━━━━  ─────────────  ─────────────  ─────────────           │
│                                                                          │
│  Step 1: Submit Details                                                  │
│  ──────────────────────────────                                          │
│                                                                          │
│  [Step Content]                                                          │
│                                                                          │
│  ┌────────────────────────────────────────────┐                         │
│  │  [Back]                      [Next Step]   │                         │
│  └────────────────────────────────────────────┘                         │
└──────────────────────────────────────────────┘
```

**States**:
- **Completed**: Step is done (checkmark icon, green)
- **Active**: Current step (filled, brand color)
- **Upcoming**: Not yet reached (outlined, gray)
- **Error**: Step has validation error (red indicator)

**Behavior**:
- Linear flow: Can't skip steps
- "Back" button: Returns to previous step (state preserved)
- "Next" button: Validates current step before proceeding
- Final step: "Next" becomes "Complete" or "Submit"

**Props**:
```typescript
interface StepperProps {
  steps: {
    id: string;
    label: string;
    description?: string;
    component: React.ReactNode;
  }[];
  activeStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}
```

**Accessibility**:
- `role="navigation"` for stepper
- `aria-label="Progress"`
- Each step: `aria-current="step"` for active
- Step labels: `aria-label="Step 1 of 4: Submit Details, completed"` (dynamic)

---

### 8. Table

**Purpose**: Display tabular data with sorting, filtering, pagination

**Features**:
- Column sorting (click header)
- Search/filter
- Pagination (rows per page selector)
- Row selection (checkboxes)
- Expandable rows (optional)
- Empty state
- Loading state (skeleton)
- Responsive (horizontal scroll or card view on mobile)

**Styling**:
- Header: `--neutral-100` / `--dark-bg-700`, bold text
- Rows: Alternating (`--neutral-50` / transparent) or hover highlight
- Borders: Subtle (`--neutral-300`)
- Hover: Background change + shadow lift (if row is clickable)

**Props**:
```typescript
interface TableProps {
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  data: any[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  sortable?: boolean;
  selectable?: boolean;
  onRowClick?: (row: any) => void;
}
```

**Accessibility**:
- Semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- Sortable columns: `aria-sort="ascending"` or `"descending"` or `"none"`
- Row selection: `aria-selected="true"` on `<tr>`
- Loading: `aria-busy="true"`, `aria-live="polite"` announcement

**Mobile Responsive**:
- < 768px: Convert to card view (each row becomes a card)
- OR: Horizontal scroll with sticky first column

---

### 9. Input / FormField

**Purpose**: Text input with label, validation, helper text

**Anatomy**:
```
Label (required indicator *)
─────────────────────────────
┌───────────────────────────┐
│  [Icon]  Input text...    │
└───────────────────────────┘
Helper text or error message
```

**Variants**:

| Variant | Usage |
|---------|-------|
| `text` | Default text input |
| `email` | Email validation |
| `password` | Masked input with show/hide toggle |
| `number` | Number input with increment/decrement |
| `textarea` | Multi-line text |
| `select` | Dropdown selection |
| `date` | Date picker |

**States**:
- Default
- Focus (border: `--brand-primary-600`, outline)
- Error (border: `--error-600`, error message below)
- Disabled (opacity 0.5, cursor not-allowed)
- Success (optional: border: `--success-600`, checkmark icon)

**Props**:
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date';
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}
```

**Validation Display**:
- Error state: Red border, error icon, error message below
- Inline validation: As user types (debounced)
- Submit validation: On form submit, focus first error field

**Accessibility**:
- `<label>` associated with input (`htmlFor` / `id`)
- Required: `aria-required="true"` + visual indicator (*)
- Error: `aria-invalid="true"`, `aria-describedby="{errorId}"`
- Helper text: `aria-describedby="{helperId}"`
- Disabled: `aria-disabled="true"`

---

### 10. Select / Dropdown

**Purpose**: Single or multi-select from list of options

**Features**:
- Searchable (type to filter)
- Clear button (if clearable)
- Grouped options (optional)
- Custom option rendering (icons, badges)
- Keyboard navigation (Arrow keys, Enter, ESC)

**Styling**:
- Trigger: Same as Input
- Dropdown: `--white` / `--dark-bg-800`, `--shadow-lg`, max-height 300px, scroll

**Props**:
```typescript
interface SelectProps {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  label: string;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
}
```

**Accessibility**:
- `role="combobox"` on trigger
- `aria-expanded` state
- `aria-controls="{listboxId}"`
- `role="listbox"` on dropdown
- `role="option"` on each item
- `aria-selected="true"` on selected options
- Keyboard: Arrow keys, Enter to select, ESC to close

---

### 11. InlineAlert / Banner

**Purpose**: Non-blocking messages for info, warnings, errors

**Variants**:

| Variant | Background | Icon | Usage |
|---------|-----------|------|-------|
| `info` | `--info-100` | ℹ️ | Informational messages |
| `success` | `--success-100` | ✓ | Success confirmations |
| `warning` | `--warning-100` | ⚠️ | Warnings, cautions |
| `error` | `--error-100` | ✕ | Error messages |

**Anatomy**:
```
┌─────────────────────────────────────┐
│  [Icon]  Title                  [X] │
│  Description text (optional)        │
│  [Action Link]                      │
└─────────────────────────────────────┘
```

**Behavior**:
- Dismissible (X button) or persistent
- Auto-dismiss after timeout (optional)

**Props**:
```typescript
interface InlineAlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  dismissible?: boolean;
  autoDismiss?: number; // ms
  action?: { label: string; onClick: () => void };
}
```

**Accessibility**:
- `role="alert"` for errors/warnings (live region)
- `role="status"` for info/success
- `aria-live="polite"` or `"assertive"` based on severity
- Close button: `aria-label="Dismiss alert"`

---

### 12. Toast / Notification

**Purpose**: Temporary feedback for actions (save, delete, error)

**Variants**: Same as InlineAlert (info, success, warning, error)

**Position**: Top-right corner (or configurable)

**Anatomy**:
```
┌────────────────────────────┐
│  [Icon]  Message       [X] │
└────────────────────────────┘
```

**Behavior**:
- Auto-dismiss after 3-5 seconds
- Stack multiple toasts vertically
- Hover pauses auto-dismiss
- Swipe to dismiss (mobile)

**Animation**:
```css
@keyframes toastEnter {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

**Props**:
```typescript
interface ToastProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number; // ms, default 4000
  action?: { label: string; onClick: () => void };
}
```

**Accessibility**:
- `role="status"` or `role="alert"`
- `aria-live="polite"` (info/success) or `"assertive"` (warning/error)
- Announcements for screen readers

---

### 13. ActionBar (Sticky Context Actions)

**Purpose**: Persistent action bar for contextual actions

**Use Cases**:
- Table bulk actions (after selecting rows)
- Form actions (Save, Cancel)
- Multi-step wizard actions (Back, Next)

**Position**: Bottom of viewport (sticky) or top of section

**Anatomy**:
```
┌────────────────────────────────────────────────┐
│  [Secondary Action]      [Primary Action]     │
└────────────────────────────────────────────────┘
```

**Styling**:
- Background: `--white` / `--dark-bg-800`
- Border top: `1px solid --neutral-300`
- Shadow: `--shadow-lg` (elevated)
- Padding: `--space-4`
- Z-index: 1000 (above content, below modals)

**Behavior**:
- Appears when actions are available
- Hides when not needed
- Sticky position (follows scroll)

**Accessibility**:
- `role="toolbar"`
- `aria-label="Actions"`
- Focus management (Tab into/out of toolbar)

---

## Modal / Drawer Decision Matrix

### Decision Tree

```
Is this a standalone page currently?
├─ Yes → Evaluate for conversion
│  ├─ Is the primary task simple (1 form, 1 action)?
│  │  ├─ Yes → Modal candidate
│  │  └─ No → Continue evaluation
│  ├─ Does it benefit from parent context visibility?
│  │  ├─ Yes → Drawer candidate (Deposit, Withdraw, Detail views)
│  │  └─ No → Continue evaluation
│  ├─ Is it a multi-step process (2-5 steps)?
│  │  ├─ Yes → Modal with Stepper
│  │  └─ No → Continue evaluation
│  ├─ Is it detail from a list?
│  │  ├─ Yes → Drawer
│  │  └─ No → Continue evaluation
│  ├─ Is the content deep/complex (galleries, calculators, sub-tabs)?
│  │  ├─ Yes → Keep as full page (or hybrid: drawer with "Expand" option)
│  │  └─ No → Modal or Drawer candidate
│  └─ Default → Keep as page if justified
└─ No → Use modal/drawer from the start
```

### Use This Table

| Use Case | Container | Size | Launch From | URL State? | Notes |
|----------|-----------|------|-------------|------------|-------|
| **Simple form** (≤6 fields) | Modal | sm-md | Button/Link | Optional | Quick tasks (Send, Forgot Password) |
| **Confirmation** (delete, logout) | Modal | sm | Button/Link | No | Destructive actions need strong confirmation |
| **Multi-step wizard** (2-5 steps) | Modal | md-lg | Button/Link | Yes (step param) | Tokenization, Mint, Onboarding |
| **Detail from list** (readable) | Drawer | md | List item click | Yes (detail ID) | Notification, Transaction, Project (shallow) |
| **Form with context** (see balance while filling) | Drawer | lg | Button/Link | Yes | Deposit, Withdraw (need to see wallet balance) |
| **Mobile transient action** | BottomSheet | Auto | Button/Link | No | Send, Receive, Quick actions on mobile |
| **Large/complex content** | Full Page | N/A | Navigation | Yes | Keep route if multiple sub-flows exist |
| **Search/Filter** | Panel (inline) | Auto | Toggle button | Yes (search params) | Advanced Search in Marketplace |

---

## Responsive Rules

### Breakpoints

```css
/* Mobile: 0-767px */
@media (max-width: 767px) {
  /* Drawers → Bottom sheets or full-screen modals */
  /* Tables → Card view */
  /* Grid → Single column */
  /* Hero sections → Compact */
}

/* Tablet: 768-1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2-column grids */
  /* Smaller drawers (400px) */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Full layout */
  /* Drawers at specified sizes */
  /* 3-column grids */
}
```

### Grid Responsiveness

```css
/* Metric Cards Grid */
.metrics-grid {
  display: grid;
  gap: var(--space-6);
}

@media (max-width: 767px) {
  .metrics-grid {
    grid-template-columns: 1fr; /* Single column */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
}

@media (min-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}
```

### Table Overflow

**Desktop**: Horizontal scroll with sticky first column (optional)

**Mobile**: Convert to card view

```jsx
// Mobile card view for table rows
<div className="table-card">
  <div className="card-row">
    <span className="label">Asset Name</span>
    <span className="value">{row.assetName}</span>
  </div>
  <div className="card-row">
    <span className="label">Amount</span>
    <span className="value">{row.amount}</span>
  </div>
  {/* ... */}
</div>
```

### Drawer → BottomSheet (Mobile)

```jsx
// Responsive drawer component
function ResponsiveDrawer({ open, onClose, children }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  return isMobile ? (
    <BottomSheet open={open} onClose={onClose}>
      {children}
    </BottomSheet>
  ) : (
    <Drawer open={open} onClose={onClose}>
      {children}
    </Drawer>
  );
}
```

---

## Content Style Guidelines

### Writing Principles

1. **Short and Scannable**
   - Use bullet points over paragraphs
   - Limit sentences to 15-20 words
   - Break dense text into sections

2. **Action-Oriented**
   - Start with verbs: "Enter your email", "Confirm transaction"
   - Avoid passive voice: "Submit" not "Can be submitted"

3. **No Duplicate Headers**
   - Hero section: "Total Portfolio Value"
   - Compact header (if needed): "Portfolio: $48,250"
   - Don't repeat "Total Portfolio Value" as H1 on Portfolio page

4. **Error Messages**
   - Be specific: "Email is required" not "Invalid input"
   - Explain how to fix: "Password must be at least 8 characters"
   - Use plain language: "Cannot connect to server" not "500 Error"

5. **Empty States**
   - Explain why empty: "No notifications yet"
   - Guide next action: "Browse the Marketplace to get started"
   - Use encouraging tone

6. **Microcopy**
   - Button labels: Specific ("Deposit Funds" not "Continue")
   - Links: Descriptive ("View transaction details" not "Click here")
   - Tooltips: Concise (<50 characters)

---

## Accessibility Checklist

### Color & Contrast
- [ ] All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- [ ] Color is not the only means of conveying information (use icons + text)
- [ ] Status uses both color and icon/text (success = green + checkmark)

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible (Tab/Shift+Tab)
- [ ] Focus indicators are visible (2px outline, sufficient contrast)
- [ ] Modal/Drawer focus trap works (Tab cycles within container)
- [ ] Skip to main content link available
- [ ] Logical tab order (follows visual flow)

### Screen Readers
- [ ] All images have alt text (decorative images: `alt=""`)
- [ ] Icon-only buttons have `aria-label`
- [ ] Form fields have associated labels
- [ ] Error messages are announced (`role="alert"` or `aria-live`)
- [ ] Loading states are announced (`aria-busy`, `aria-live="polite"`)
- [ ] Page title updates on route change

### Semantic HTML
- [ ] Use semantic elements (`<nav>`, `<main>`, `<article>`, `<aside>`, `<button>`, `<a>`)
- [ ] Heading hierarchy is logical (H1 → H2 → H3, no skipping)
- [ ] Lists use `<ul>`, `<ol>`, `<li>`
- [ ] Tables use `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`

### ARIA (When Needed)
- [ ] Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [ ] Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- [ ] Alerts: `role="alert"` (errors) or `role="status"` (info)
- [ ] Live regions: `aria-live="polite"` or `"assertive"`
- [ ] Expandable sections: `aria-expanded`, `aria-controls`

### Focus Management
- [ ] Focus visible on all interactive elements
- [ ] Focus returns to trigger after closing modal/drawer
- [ ] Focus moves to first focusable element when opening modal/drawer
- [ ] Focus does not get trapped outside modal/drawer when open

---

## Animation Guidelines

### Principles
- **Purposeful**: Animations guide attention, not distract
- **Fast**: Duration 150-300ms for most transitions
- **Smooth**: Use easing functions (`cubic-bezier(0.4, 0, 0.2, 1)`)
- **Respectful**: Honor `prefers-reduced-motion`

### Standard Durations

| Element | Duration | Easing |
|---------|----------|--------|
| Hover effects | 150ms | ease-out |
| Modal/Drawer open | 250ms | ease-out |
| Modal/Drawer close | 200ms | ease-in |
| Toast enter | 200ms | ease-out |
| Page transitions | 300ms | ease-in-out |
| Skeleton pulse | 2000ms (loop) | ease-in-out |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Usage Examples

### Example: Dashboard Hero with MetricCard

```jsx
<Card variant="hero" padding="lg">
  <h1 className="typography-h2">Total Portfolio Value</h1>
  <p className="typography-hero-number">$48,250</p>
  <div className="metrics-row">
    <MetricCard
      label="YTD Change"
      value="+$4,125"
      change={{ value: 9.3, period: 'ytd', isPositive: true }}
      trend="up"
    />
    <MetricCard
      label="24H Change"
      value="+$245"
      change={{ value: 0.5, period: '24h', isPositive: true }}
      trend="up"
    />
  </div>
</Card>
```

### Example: Modal with Form

```jsx
<Modal
  open={openForgotPassword}
  onClose={() => setOpenForgotPassword(false)}
  title="Forgot Password"
  description="Enter your email to receive a password reset link"
  size="sm"
>
  <form onSubmit={handleSubmit}>
    <Input
      type="email"
      label="Email Address"
      required
      value={email}
      onChange={setEmail}
      error={emailError}
    />
    <div className="modal-actions">
      <Button variant="outline" onClick={() => setOpenForgotPassword(false)}>
        Cancel
      </Button>
      <Button variant="primary" type="submit" loading={loading}>
        Send Reset Link
      </Button>
    </div>
  </form>
</Modal>
```

### Example: Drawer with Detail

```jsx
<Drawer
  open={openProjectDetail}
  onClose={() => setOpenProjectDetail(false)}
  title={project.name}
  size="md"
  showNavigation
  onNavigatePrevious={() => navigateProject('prev')}
  onNavigateNext={() => navigateProject('next')}
>
  <div className="project-detail">
    <Badge variant="success">Verified</Badge>
    <p>{project.description}</p>
    <MetricCard label="Available" value={`${project.available} tCO₂e`} />
    <MetricCard label="Price per unit" value={`$${project.price}`} />
    <Button variant="primary" onClick={() => openBuyModal()}>
      Buy Now
    </Button>
  </div>
</Drawer>
```

---

## Implementation Checklist

### Phase 1: Design Tokens
- [ ] Define all color tokens in CSS variables
- [ ] Verify WCAG AA contrast for all color combinations
- [ ] Define typography scale and number formatting
- [ ] Define spacing scale (8px base)
- [ ] Define border radius and shadow tokens
- [ ] Test tokens in light and dark modes

### Phase 2: Base Components
- [ ] Button (all variants, sizes, states)
- [ ] Input / FormField (all types, validation)
- [ ] Select / Dropdown (searchable, clearable)
- [ ] Card (all variants)
- [ ] MetricCard (with trend, tooltip)
- [ ] Table (sorting, pagination, empty/loading states)

### Phase 3: Overlay Components
- [ ] Modal (all sizes, animations, focus trap)
- [ ] Drawer (all sizes, animations, navigation arrows)
- [ ] BottomSheet (mobile)
- [ ] Toast notifications (stacking, auto-dismiss)
- [ ] InlineAlert / Banner

### Phase 4: Specialized Components
- [ ] Stepper (multi-step wizard)
- [ ] ActionBar (sticky context actions)
- [ ] Empty states (all locations)
- [ ] Loading states (skeleton loaders)
- [ ] Error states (boundaries, inline)

### Phase 5: Accessibility Audit
- [ ] Keyboard navigation for all components
- [ ] Screen reader testing (NVDA, VoiceOver, JAWS)
- [ ] ARIA attributes where needed
- [ ] Focus management (modals, drawers)
- [ ] Color contrast verification (automated + manual)

### Phase 6: Documentation & Storybook
- [ ] Component documentation (props, usage, examples)
- [ ] Storybook stories for all components
- [ ] Accessibility notes per component
- [ ] Design tokens documentation
- [ ] Usage guidelines and decision trees

---

**Status**: ✅ Ready for Implementation Prompt Generation  
**Next**: `04_IMPLEMENTATION_PROMPT.md`
