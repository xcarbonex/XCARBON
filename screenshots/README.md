# 📸 XCARBON Screenshot Generator

Automated screenshot generation tool for capturing all DApp screens in both light and dark themes, plus mobile views.

## 🚀 Quick Start

### Prerequisites

1. **Install dependencies** (if not already done):

   ```bash
   yarn install
   ```

2. **Start the development server**:

   ```bash
   yarn dev
   ```

3. **In a new terminal, run the screenshot generator**:
   ```bash
   yarn screenshots
   ```

## 📋 What Gets Captured

The tool automatically captures screenshots of:

### Public Screens (No Auth Required)

- ✅ Login page
- ✅ Sign Up page
- ✅ Forgot Password page

### Authenticated Screens (Requires Login)

- ✅ Dashboard Home
- ✅ Portfolio Overview
- ✅ Wallet Overview
- ✅ Wallet Deposit
- ✅ Membership Tiers
- ✅ Settings
- ✅ Carbon Credit Tokenization
- ✅ List Tokenized Assets
- ✅ Notifications
- ✅ Help & Support
- ✅ Marketplace Assets
- ✅ Registry Assets

### Variations

- **Themes**: Light mode + Dark mode for each screen
- **Viewports**: Desktop (1920x1080) + Mobile (375x812) for key screens
- **Total Screenshots**: ~40+ images

## ⚙️ Configuration

### Test Credentials

Update the test account credentials in `scripts/screenshot-generator.mjs`:

```javascript
const CONFIG = {
  testCredentials: {
    email: "your-test-account@example.com",
    password: "YourTestPassword123!",
  },
};
```

### Custom Configuration

You can modify the configuration in the script:

```javascript
const CONFIG = {
  baseURL: "http://localhost:5173", // Dev server URL
  screenshotDir: "./screenshots", // Output directory
  viewport: {
    width: 1920,
    height: 1080,
  },
  mobileViewport: {
    width: 375,
    height: 812,
  },
};
```

### Adding More Screens

To capture additional screens, add them to the `SCREENS` array:

```javascript
{
  name: 'new-screen',                   // Filename prefix
  path: '/new-screen',                  // URL path
  requiresAuth: true,                   // Requires login?
  waitFor: 'h1',                        // CSS selector to wait for
  description: 'New Screen Name'        // Display name
}
```

## 📂 Output

Screenshots are saved to `./screenshots/` with the naming pattern:

```
{screen-name}-{theme}-{viewport}.png
```

Examples:

- `dashboard-light-desktop.png`
- `dashboard-dark-desktop.png`
- `dashboard-light-mobile.png`
- `wallet-light-desktop.png`
- `login-dark-desktop.png`

## 🖼️ Viewing Screenshots

After generation, open the auto-generated viewer:

```bash
open screenshots/index.html
```

The viewer provides:

- ✅ Grid layout of all screenshots
- ✅ Light/Dark theme tabs per screen
- ✅ Mobile view tabs for key screens
- ✅ Filter buttons (All, Public, Auth, Desktop, Mobile)
- ✅ Click to zoom/expand
- ✅ Responsive design

## 🔧 Troubleshooting

### "Connection refused" error

**Problem**: Dev server not running  
**Solution**: Start dev server first with `yarn dev`

### Login fails

**Problem**: Invalid test credentials  
**Solution**:

1. Create a test account manually
2. Update credentials in `scripts/screenshot-generator.mjs`
3. Or mock the auth in your dev environment

### Screenshots are blank/white

**Problem**: Page not fully loaded  
**Solution**: Increase wait times in the script:

```javascript
await page.waitForTimeout(2000); // Increase from 1000
```

### Theme toggle not working

**Problem**: Theme switcher selector not found  
**Solution**: The script will fallback to localStorage method automatically

### Missing screenshots

**Problem**: Navigation or element not found  
**Solution**: Check console output for errors and adjust `waitFor` selectors

## 🎨 Customization

### Change Screenshot Quality

Modify the device scale factor for higher/lower quality:

```javascript
const context = await browser.newContext({
  viewport: CONFIG.viewport,
  deviceScaleFactor: 2, // 1 = normal, 2 = retina/high-DPI
});
```

### Capture Specific Screens Only

Filter the screens array before running:

```javascript
// Only capture dashboard and wallet
const selectedScreens = SCREENS.filter((s) => ["dashboard", "wallet"].includes(s.name));
```

### Full Page vs Viewport Screenshots

Change screenshot mode in `captureScreen` function:

```javascript
await page.screenshot({
  path: filepath,
  fullPage: true, // false = viewport only, true = entire page
});
```

### Add Delays for Animations

Add delays before capturing:

```javascript
await page.waitForTimeout(2000); // Wait 2 seconds
```

## 🚀 Advanced Usage

### Debug Mode (see browser)

Modify the script to run in headed mode:

```javascript
const browser = await chromium.launch({
  headless: false, // Will show browser window
});
```

### Capture Specific Interaction States

Add custom interactions before screenshot:

```javascript
// Example: Open a modal before capturing
await page.click('button[aria-label="Open settings"]');
await page.waitForSelector(".modal");
await page.screenshot({ path: "settings-modal.png" });
```

### Capture Hover States

Use page.hover() before capturing:

```javascript
await page.hover(".card");
await page.screenshot({ path: "card-hover.png" });
```

### Capture with Specific Data

Seed test data before capturing:

```javascript
// Mock API responses or seed database
await page.route("**/api/portfolio", (route) => {
  route.fulfill({
    status: 200,
    body: JSON.stringify(mockPortfolioData),
  });
});
```

## 📊 CI/CD Integration

### GitHub Actions Example

```yaml
name: Generate Screenshots

on:
  push:
    branches: [main, develop]

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: yarn install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Start dev server
        run: yarn dev &

      - name: Wait for server
        run: npx wait-on http://localhost:5173

      - name: Generate screenshots
        run: yarn screenshots

      - name: Upload screenshots
        uses: actions/upload-artifact@v3
        with:
          name: screenshots
          path: screenshots/
```

## 🔒 Security Notes

- **Never commit real credentials** to the script
- Use environment variables for sensitive data
- Create dedicated test accounts with limited permissions
- Don't capture screens with real user data in CI/CD

### Using Environment Variables

```javascript
const CONFIG = {
  testCredentials: {
    email: process.env.TEST_EMAIL || "test@example.com",
    password: process.env.TEST_PASSWORD || "default-password",
  },
};
```

Then run:

```bash
TEST_EMAIL=user@example.com TEST_PASSWORD=pass123 yarn screenshots
```

## 📝 Script Maintenance

### Update Screen List

When adding new pages to the app:

1. Add to `SCREENS` array in `screenshot-generator.mjs`
2. Set appropriate `waitFor` selector
3. Mark `requiresAuth` correctly
4. Test the capture

### Update Theme Toggle Logic

If theme toggle implementation changes:

1. Update the selector in `setTheme()` function
2. Test theme switching works
3. Verify screenshots capture correctly

## 💡 Tips

1. **Run after major UI changes** to document visual updates
2. **Compare screenshots** before/after design changes
3. **Share with stakeholders** using the generated index.html
4. **Version control key screenshots** for regression testing
5. **Schedule regular captures** to maintain documentation

## 🐛 Known Issues

- **Animations**: Fast animations may not complete before screenshot
  - Solution: Increase `waitForTimeout` values
- **Lazy loading**: Images may not load if viewport is too fast
  - Solution: Add `await page.waitForLoadState('networkidle')`

- **Modals/Overlays**: May require specific triggers
  - Solution: Add custom interaction logic per screen

## 🤝 Contributing

To improve the screenshot generator:

1. Add new screens to capture
2. Improve error handling
3. Add more viewport sizes
4. Enhance the HTML viewer
5. Add comparison features

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Screenshot Best Practices](https://playwright.dev/docs/screenshots)
- [Visual Testing Guide](https://playwright.dev/docs/test-snapshots)

## 📧 Support

For issues or questions:

- Check console output for detailed errors
- Review Playwright logs
- Verify dev server is running
- Check test credentials are valid

---

**Last Updated**: November 1, 2025  
**Maintained by**: XCARBON Development Team
