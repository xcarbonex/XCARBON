# Phase 5: Component & Styling Refactor Plan

**Status**: In Progress  
**Objective**: Replace all hardcoded colors with brand tokens (Evergreen + Sky palette)  
**Scope**: 25+ component files with extensive color hardcoding

---

## Component Audit Summary

### 🔴 Critical Components (High Color Usage)

#### 1. **Button Component** (`src/components/Button/index.tsx`)

**Current Issues**:

- 15+ hardcoded hex colors in variant definitions
- Legacy color names: `bg-btn`, `btn-500`, `#4C6663`, `#C2A57B`
- Multiple dark mode color overrides

**Hardcoded Colors to Replace**:

```
Primary:
  - bg-btn → bg-brand-700
  - hover:bg-btn-500 → hover:bg-brand-600
  - dark:border-[#363638] → dark:border-neutral-800

Secondary:
  - bg-[#4C6663] → bg-neutral-700
  - text-[#4C6663] → text-neutral-700

Gold (Legacy):
  - bg-[#C2A57B] → bg-accent-500 (or custom secondary accent)
  - dark:bg-[#3B3B3B] → dark:bg-neutral-800

Outline:
  - border-black → border-brand-900
  - dark:border-[#363638] → dark:border-neutral-800
```

**Variants to Update**:

- ✅ `primary`: Use `brand-700` (primary CTA)
- ✅ `secondary`: Use `neutral-700` (secondary interactions)
- ✅ `gold`: Use accent colors or custom
- ✅ `dark`: Use `neutral-900` with dark mode support
- ✅ `tonal-primary`: `brand-700/10` and `brand-700/20`
- ✅ `tonal-secondary`: `neutral-700/10` and `neutral-700/20`
- ✅ `flat-primary`: `brand-700/5`
- ✅ `border-primary`: `border-brand-700`
- ✅ `outline`: `border-neutral-300` (light mode), `border-neutral-700` (dark mode)

---

#### 2. **Card Component** (`src/components/Card/index.tsx`)

**Current Issues**:

- Hardcoded gray colors: `gray-200`, `gray-300`, `gray-600`, `gray-700`
- Dark mode colors: `dark:bg-dark-secondary`, `dark:border-gray-700`
- No use of neutral token palette

**Hardcoded Colors to Replace**:

```
Borders & Text:
  - border-gray-200 → border-neutral-200
  - border-gray-700 → border-neutral-700
  - dark:border-gray-700 → dark:border-neutral-700

Backgrounds:
  - bg-gray-300 (loading state) → bg-neutral-300
  - dark:bg-gray-600 (loading state) → dark:bg-neutral-600

Dark Mode:
  - dark:bg-dark-secondary → dark:bg-neutral-800
```

**Classes to Update**:

- `baseClasses`: Keep `bg-white`, add `dark:bg-neutral-900`
- `borderClasses`: Use `border-neutral-200` / `dark:border-neutral-700`
- Loading skeleton: Use `bg-neutral-300` / `dark:bg-neutral-600`
- Actions/Footer borders: Use `border-neutral-200`

---

#### 3. **Modal Component** (`src/components/Model/index.tsx`)

**Scope**: 8 modal files in `src/components/Modals/`

- `APIKeyModal.tsx`
- `AppearanceModal.tsx`
- `BuyCarbonCreditModal.tsx`
- `ChangePasswordModal.tsx`
- `CurrencyModal.tsx`
- `EditProfileModal.tsx`
- `MFAModal.tsx`
- `UserOverviewModal.tsx`

**Typical Hardcoded Colors**:

```
Likely patterns (need to verify in each):
  - Header backgrounds: gray/black colors → brand-700 or neutral-900
  - Borders: gray colors → neutral-200/300
  - Close button: hardcoded hex → brand-700 hover
  - Action buttons: mixed colors → primary (brand-700), secondary (neutral-100)
```

**Header Pattern**:

- Current: Likely `bg-gray-100` or `bg-neutral-50`
- New: `bg-brand-700 text-white` or `bg-neutral-900 text-white`

---

#### 4. **Input Component** (`src/components/Input/index.tsx`)

**Likely Issues**:

- Focus ring colors: `focus:ring-blue-500` → `focus:ring-brand-700`
- Border colors: `border-gray-300` → `border-neutral-300`
- Placeholder text: `placeholder-gray-500` → `placeholder-neutral-500`
- Disabled state: `disabled:bg-gray-100` → `disabled:bg-neutral-100`

**Pattern**:

```
- border-neutral-300 (default)
- border-brand-700 (focus)
- ring-brand-700 (focus ring)
- placeholder-neutral-500
- disabled:bg-neutral-100 disabled:text-neutral-500
```

---

#### 5. **Select Component** (`src/components/Select/index.tsx`)

**Similar to Input**:

- Border colors
- Focus states
- Placeholder text
- Dropdown background
- Hover states for options

---

#### 6. **Table Component** (`src/components/Table/index.tsx`)

**Likely Issues**:

- Row backgrounds: White/gray alternating → Use neutral-50/white
- Hover states: `hover:bg-gray-50` → `hover:bg-brand-50`
- Header background: `bg-gray-100` → `bg-neutral-100` or `bg-brand-50`
- Borders: `border-gray-200` → `border-neutral-200`
- Text colors: `text-gray-700` → `text-neutral-700`

**Pattern**:

```
- Header: bg-neutral-100 / dark:bg-neutral-800
- Rows: bg-white / dark:bg-neutral-900
- Hover: bg-brand-50 / dark:bg-neutral-800
- Borders: border-neutral-200 / dark:border-neutral-700
```

---

#### 7. **Form Component** (`src/components/Form/index.tsx`)

**Likely Issues**:

- Label colors
- Error text: `text-red-500` → Brand color
- Helper text: `text-gray-500` → `text-neutral-500`
- Error border: `border-red-500` → Brand accent

---

#### 8. **Chart Component** (`src/components/Chart/index.tsx`)

**Likely Issues**:

- Chart colors/gradients: Use brand and accent colors
- Legend background: `bg-white` / `bg-neutral-900`
- Border: `border-gray-200` → `border-neutral-200`
- Tooltip: Colors should match palette

---

#### 9. **DateRangePicker** (`src/components/DateRangePicker/`)

**Likely Issues**:

- Calendar background
- Selected date: Should use `brand-700`
- Hover states: `brand-50`
- Today indicator: Accent color
- Border/text colors: Use neutral palette

---

#### 10. **Dropdown, Tabs, Breadcrumb**

**Similar Patterns**:

- Borders: `gray-*` → `neutral-*`
- Backgrounds: Align with brand/neutral
- Text: Use neutral-900 (light), neutral-100 (dark)
- Active states: `brand-*` colors
- Hover: `brand-50` or `brand-100`

---

## Refactoring Strategy

### Phase 5a: Audit (IN PROGRESS)

- [x] Identify all hardcoded colors
- [x] Map legacy colors to new tokens
- [x] Create this plan document

### Phase 5b: Button Component

- [ ] Update all 13 variants
- [ ] Test in Storybook
- [ ] Commit

### Phase 5c: Card Component

- [ ] Replace gray-_ with neutral-_
- [ ] Update dark mode colors
- [ ] Test loading state
- [ ] Commit

### Phase 5d: Modal Components (8 files)

- [ ] Check each Modal for hardcoded colors
- [ ] Update headers/footers/borders
- [ ] Ensure dark mode compatibility
- [ ] Commit

### Phase 5e: Form Components (Input, Select, DateRangePicker, Form)

- [ ] Input: borders, focus, placeholder, disabled
- [ ] Select: dropdown styling, options
- [ ] DateRangePicker: calendar colors, selections
- [ ] Form: labels, error states, helper text
- [ ] Commit

### Phase 5f: Table & Chart

- [ ] Table: headers, rows, hover, borders
- [ ] Chart: colors, legend, tooltip
- [ ] Commit

### Phase 5g: Other Components (Dropdown, Tabs, Breadcrumb, Loader, etc.)

- [ ] Update remaining components
- [ ] Commit

### Phase 5h: Validation

- [ ] `yarn type-check` → 0 errors
- [ ] `yarn lint` → All files passing
- [ ] `yarn build` → Success
- [ ] Storybook stories updated
- [ ] Final commit with summary

---

## Color Mapping Reference

### From → To Mapping

| Old Color                | New Token             | Usage                                        |
| ------------------------ | --------------------- | -------------------------------------------- |
| `bg-btn`                 | `bg-brand-700`        | Primary button background                    |
| `text-btn`               | `text-brand-700`      | Primary button text                          |
| `bg-btn/10`              | `bg-brand-700/10`     | Tonal primary background                     |
| `bg-btn/5`               | `bg-brand-700/5`      | Flat primary background                      |
| `#4C6663`                | `neutral-700`         | Secondary color                              |
| `#C2A57B`                | `accent-500`          | Gold/accent color                            |
| `#363638`                | `neutral-800`         | Dark border                                  |
| `#3B3B3B`                | `neutral-800`         | Dark background                              |
| `gray-50`                | `neutral-50`          | Lightest background                          |
| `gray-100`               | `neutral-100`         | Light background                             |
| `gray-200`               | `neutral-200`         | Light border                                 |
| `gray-300`               | `neutral-300`         | Border                                       |
| `gray-500`               | `neutral-500`         | Medium text/placeholder                      |
| `gray-600`               | `neutral-600`         | Medium-dark text                             |
| `gray-700`               | `neutral-700`         | Dark text                                    |
| `gray-800`               | `neutral-800`         | Darker background                            |
| `gray-900`               | `neutral-900`         | Darkest text                                 |
| `dark:bg-dark-secondary` | `dark:bg-neutral-800` | Dark mode background                         |
| `blue-500` (focus)       | `brand-700`           | Focus ring color                             |
| `red-500` (error)        | `brand-600`           | Error state (alt: use dedicated error token) |

---

## Implementation Notes

### 1. **Tailwind vs CSS Variables**

- Use Tailwind classes: `bg-brand-700`, `text-neutral-500`
- Fallback to CSS variables in custom styles: `var(--brand-700)`
- Both are defined in `tailwind.config.js` and `src/styles/tokens.css`

### 2. **Dark Mode Support**

```tsx
// Old
className = "bg-white dark:bg-dark-secondary";

// New
className = "bg-white dark:bg-neutral-900";
```

### 3. **Hover & Active States**

```tsx
// Old
className = "hover:bg-btn/5";

// New
className = "hover:bg-brand-700/5";
```

### 4. **Opacity & Transparency**

```tsx
// Keep opacity syntax the same
className = "bg-brand-700/10"; // 10% opacity
className = "hover:bg-brand-700/20"; // 20% opacity on hover
```

### 5. **Focus Rings**

```tsx
// Old
className = "focus:ring-2 focus:ring-blue-500";

// New
className = "focus:ring-2 focus:ring-brand-700";
```

---

## Files to Update (Priority Order)

### Priority 1 (Core Components - 3 files)

1. ✅ Button (`src/components/Button/index.tsx`)
2. ✅ Card (`src/components/Card/index.tsx`)
3. ✅ Model/Modal base (`src/components/Model/index.tsx`)

### Priority 2 (Modals - 8 files)

4. `src/components/Modals/APIKeyModal.tsx`
5. `src/components/Modals/AppearanceModal.tsx`
6. `src/components/Modals/BuyCarbonCreditModal.tsx`
7. `src/components/Modals/ChangePasswordModal.tsx`
8. `src/components/Modals/CurrencyModal.tsx`
9. `src/components/Modals/EditProfileModal.tsx`
10. `src/components/Modals/MFAModal.tsx`
11. `src/components/Modals/UserOverviewModal.tsx`

### Priority 3 (Form Components - 5 files)

12. `src/components/Input/index.tsx`
13. `src/components/Select/index.tsx`
14. `src/components/Form/index.tsx`
15. `src/components/DateRangePicker/index.tsx`
16. `src/components/Dropdown/index.tsx`

### Priority 4 (Data Display - 2 files)

17. `src/components/Table/index.tsx`
18. `src/components/Chart/index.tsx`

### Priority 5 (Other Components - 5+ files)

19. `src/components/Tabs/index.tsx`
20. `src/components/Breadcrumb/index.tsx`
21. `src/components/Loader/index.tsx`
22. `src/components/Toggler/index.tsx`
23. `src/components/Accordion/index.tsx`
24. `src/components/List/index.tsx`
25. `src/components/Modals/NotificationPopup.tsx` (if exists)

---

## Validation Checklist

- [ ] All Button variants working in Storybook
- [ ] Card component with different sizes and states
- [ ] All Modal dialogs showing correctly
- [ ] Form inputs with focus/error states
- [ ] Table with hover states
- [ ] Chart colors properly rendered
- [ ] Dark mode working across all components
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
- [ ] No console warnings/errors
- [ ] Accessibility not regressed

---

## Timeline Estimate

- Phase 5b (Button): 30 mins
- Phase 5c (Card): 20 mins
- Phase 5d (Modals): 1 hour
- Phase 5e (Form): 1 hour
- Phase 5f (Table/Chart): 45 mins
- Phase 5g (Others): 45 mins
- Phase 5h (Validation): 30 mins

**Total: ~5 hours for complete Phase 5**

---

**Next Steps**: Begin Phase 5b by refactoring Button component variants
