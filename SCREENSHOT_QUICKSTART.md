# 🎬 Quick Start: Screenshot Generator

## One-Time Setup

1. **Install Playwright Browsers** (if not already installed):

   ```bash
   npx playwright install chromium --with-deps
   ```

   **⚠️ Important Notes:**
   - This downloads ~170MB and installs system dependencies
   - Takes 5-10 minutes - **do not interrupt!**
   - Requires sudo password
   - If interrupted, run the command again to resume

   **Alternative** (if above fails):
   ```bash
   npx playwright install chromium
   ```

2. **Create Test Account**:
   - Open app: http://localhost:5173
   - Sign up with test credentials
   - Remember the email/password

3. **Update Script Config**:
   Open `scripts/screenshot-generator.mjs` and update:
   ```javascript
   testCredentials: {
     email: 'your-test-email@example.com',
     password: 'YourPassword123!'
   }
   ```

## Running Screenshots

### WSL Users (Important!)

If you're on Windows Subsystem for Linux:

```bash
# Set display environment (if not set)
export DISPLAY=:0

# Or use the optimized settings (script detects WSL automatically)
yarn screenshots
```

The script automatically detects WSL and applies optimized browser settings.

### Step 1: Start Dev Server

```bash
yarn dev
```

### Step 2: Generate Screenshots (in new terminal)

```bash
yarn screenshots
```

### Step 3: View Results

```bash
open screenshots/index.html
# or
xdg-open screenshots/index.html  # Linux
# or
start screenshots/index.html      # Windows
```

## What You Get

- ✅ ~40+ screenshots
- ✅ Light & Dark themes
- ✅ Desktop & Mobile views
- ✅ Beautiful HTML viewer
- ✅ Organized by screen

## Quick Commands

```bash
# Generate all screenshots
yarn screenshots

# Debug mode (see browser)
# Edit script: set headless: false

# Clean screenshots folder
rm screenshots/*.png

# View in browser
open screenshots/index.html
```

## Troubleshooting

**Server not running?**

```bash
yarn dev
```

**Login fails?**

- Check test credentials in script
- Ensure test account exists
- Try manual login first

**Slow/timeout?**

- Increase wait times in script
- Check network connection
- Verify all pages load manually

## Tips

1. Run after major UI changes
2. Compare before/after updates
3. Share with team using index.html
4. Keep README.md and index.html in git
5. Screenshots are gitignored by default

## Need Help?

See full documentation: `screenshots/README.md`

---

**That's it! You're ready to generate screenshots! 📸**
