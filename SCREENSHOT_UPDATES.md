# 📸 Screenshot Generator Updates

## Overview

The screenshot generator script has been updated to capture all screens from the new consolidated UX design, including the Assets Hub with its interactive modal and drawer states.

## What Changed

### 1. **Screen List Updated** (`SCREENS` array)

#### Added New Screens:
- `two-factor-auth` - Two-factor authentication page
- `reset-password` - Password reset page
- `marketplace-project-detail` - Individual project detail view

#### Consolidated Asset Screens:
**Old Structure** (removed):
- `/portfolio` - Standalone portfolio page
- `/carbon-credit-tokenization` - Standalone tokenization page
- `/list-tokenized-assets` - Standalone listing page
- `/assets` - Generic registry assets

**New Structure** (added):
- `/assets?tab=portfolio` - Portfolio tab in Assets Hub
- `/assets?tab=registry` - Registry lookup tab in Assets Hub
- `/assets?action=tokenize` - Tokenization modal (4-step wizard)
- `/assets?action=mint` - Minting modal (4-step wizard)
- `/assets?action=list` - List asset drawer (side panel)

### 2. **Enhanced Modal/Drawer Support**

Added `additionalWait` property to screen definitions:
```javascript
{
  name: 'assets-tokenize-modal',
  path: '/assets?action=tokenize',
  requiresAuth: true,
  waitFor: '[role="dialog"]',
  description: 'Assets Hub - Tokenization Modal',
  additionalWait: 1500  // Extra time for modal animations
}
```

This ensures modals and drawers are fully rendered before screenshot capture.

### 3. **Mobile Screen Updates**

Updated mobile screenshot list to include:
- `dashboard` - Dashboard home
- `assets-portfolio` - Portfolio tab (new)
- `marketplace` - Marketplace browse
- `wallet` - Wallet overview
- `login` - Login screen
- `assets-tokenize-modal` - Tokenization modal (new)

### 4. **HTML Gallery Updates**

Updated the auto-generated `index.html` viewer to:
- Support new screen names in tab/filter logic
- Display correct mobile view availability
- Update total screenshot count calculation

## Updated Screenshot Coverage

### By Category

**Public Screens**: 5 screens × 2 themes = **10 screenshots**
- Login, Sign Up, Forgot Password, Reset Password, 2FA

**Core Navigation**: 5 screens × 2 themes = **10 screenshots**
- Dashboard, Marketplace (2 views), Wallet (2 views)

**Assets Hub**: 5 states × 2 themes = **10 screenshots**
- Portfolio tab, Registry tab, Tokenize modal, Mint modal, List drawer

**Account/Settings**: 4 screens × 2 themes = **8 screenshots**
- Membership, Settings, Notifications, Help

**Mobile Views**: 6 screens × 2 themes = **12 screenshots**
- Key screens captured in mobile viewport

**Total Desktop**: ~48 screenshots (24 screens × 2 themes)  
**Total Mobile**: ~12 screenshots (6 screens × 2 themes)  
**Grand Total**: **~60 screenshots**

## How It Works

### URL-Based State Capture

The script leverages URL parameters to capture different states of the Assets Hub:

1. **Tab States**: Uses `?tab=portfolio` and `?tab=registry` to capture different tabs
2. **Modal States**: Uses `?action=tokenize` and `?action=mint` to trigger modals
3. **Drawer State**: Uses `?action=list` to open the list drawer

This matches the app's deep-linking implementation where URL state controls UI.

### Wait Strategy

For modals and drawers:
1. Navigate to URL with action/tab parameter
2. Wait for specific element (`[role="dialog"]` or `aside`)
3. Additional wait for animations (1500ms)
4. Wait for network idle
5. Capture full-page screenshot

## Running the Updated Script

```bash
# Make sure dev server is running
yarn dev

# In a new terminal, run the generator
yarn screenshots

# Open the gallery
open screenshots/index.html
```

## Expected Output

```
screenshots/
├── index.html                                    # Interactive gallery
├── login-light-desktop.png
├── login-dark-desktop.png
├── login-light-mobile.png
├── dashboard-light-desktop.png
├── dashboard-dark-desktop.png
├── dashboard-light-mobile.png
├── marketplace-light-desktop.png
├── marketplace-dark-desktop.png
├── marketplace-light-mobile.png
├── assets-portfolio-light-desktop.png
├── assets-portfolio-dark-desktop.png
├── assets-portfolio-light-mobile.png
├── assets-registry-light-desktop.png
├── assets-registry-dark-desktop.png
├── assets-tokenize-modal-light-desktop.png
├── assets-tokenize-modal-dark-desktop.png
├── assets-tokenize-modal-light-mobile.png
├── assets-mint-modal-light-desktop.png
├── assets-mint-modal-dark-desktop.png
├── assets-list-drawer-light-desktop.png
├── assets-list-drawer-dark-desktop.png
├── wallet-light-desktop.png
├── wallet-dark-desktop.png
├── wallet-light-mobile.png
├── ... (and more)
```

## Key Improvements

### ✅ Comprehensive Coverage
- Captures all new consolidated UX screens
- Includes interactive states (modals, drawers, tabs)
- Both themes for all screens

### ✅ Better Modal Support
- Dedicated wait times for animations
- Proper selector targeting (`[role="dialog"]`, `aside`)
- URL-based state triggering

### ✅ Enhanced Documentation
- Updated README with new screen list
- Clear categorization of screen types
- Examples of all captured states

### ✅ Improved Gallery
- Updated filters and navigation
- Correct mobile view indicators
- Accurate screenshot counts

## Testing Recommendations

Before running the full screenshot generation:

1. **Verify test credentials** are valid in `scripts/screenshot-generator.mjs`
2. **Test modal triggers** manually:
   - Visit `/assets?action=tokenize` - should open modal
   - Visit `/assets?action=mint` - should open modal
   - Visit `/assets?action=list` - should open drawer
3. **Check theme toggle** is working properly
4. **Ensure dev server** is running on `http://localhost:5173`

## Troubleshooting

### Modal/Drawer Not Captured

**Problem**: Screenshot shows base page without modal/drawer

**Solution**: 
1. Check that URL state management is working in the app
2. Increase `additionalWait` time in script (try 2000-3000ms)
3. Verify selector in `waitFor` matches modal/drawer element

### Wrong Tab Captured

**Problem**: Shows wrong tab in Assets Hub

**Solution**: 
1. Ensure URL parameter (`?tab=portfolio` or `?tab=registry`) is working
2. Check that tab state initializes from URL in the component
3. Add additional wait time after navigation

### Missing Screenshots

**Problem**: Some screens don't generate

**Solution**:
1. Check console output for specific errors
2. Verify routes exist in the app
3. Ensure auth is working (check login step)
4. Try running in headed mode (`headless: false`) to debug

## Future Enhancements

Potential improvements for the screenshot generator:

- [ ] Capture step progression in multi-step modals (each step of wizard)
- [ ] Add comparison mode (before/after screenshots)
- [ ] Integration with visual regression testing
- [ ] Capture hover/focus states for interactive elements
- [ ] Add annotations/labels to screenshots
- [ ] Generate PDF documentation from screenshots
- [ ] Parallel execution for faster generation
- [ ] Custom viewport sizes for different devices

## Related Files

- `scripts/screenshot-generator.mjs` - Main generator script
- `screenshots/README.md` - Documentation for screenshot system
- `package.json` - Contains `screenshots` script command
- `src/routes.tsx` - Route definitions captured by script
- `src/pages/Assets/index.tsx` - Assets Hub with URL state management

---

**Updated**: November 1, 2025  
**Version**: 2.0 (Consolidated UX)  
**Total Screens**: 24 (5 public + 19 authenticated)  
**Total Screenshots**: ~60 (with themes and mobile views)
