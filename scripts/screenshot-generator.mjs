#!/usr/bin/env node

/**
 * XCARBON DApp Screenshot Generator
 * 
 * Automatically captures screenshots of all application screens
 * in both light and dark modes.
 * 
 * Usage: yarn run screenshots
 */

import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  baseURL: 'http://localhost:5173',
  screenshotDir: path.join(__dirname, '../screenshots'),
  viewport: {
    width: 1920,
    height: 1080
  },
  mobileViewport: {
    width: 375,
    height: 812
  },
  // Test credentials (update with your test account)
  testCredentials: {
    email: 'demo@example.com',
    password: 'Demo@123'
  }
};

// Define all screens to capture
const SCREENS = [
  // Public screens (no auth required)
  {
    name: 'login',
    path: '/login',
    requiresAuth: false,
    waitFor: 'input[type="email"]',
    description: 'Login Screen'
  },
  {
    name: 'signup',
    path: '/signup',
    requiresAuth: false,
    waitFor: 'input[type="email"]',
    description: 'Sign Up Screen'
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    requiresAuth: false,
    waitFor: 'input[type="email"]',
    description: 'Forgot Password Screen'
  },
  
  // Protected screens (require auth)
  {
    name: 'dashboard',
    path: '/',
    requiresAuth: true,
    waitFor: '[class*="typography-hero-number"]',
    description: 'Dashboard Home'
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    requiresAuth: true,
    waitFor: 'table',
    description: 'Portfolio Overview'
  },
  {
    name: 'wallet',
    path: '/wallet',
    requiresAuth: true,
    waitFor: '[class*="typography-hero-number"]',
    description: 'Wallet Overview'
  },
  {
    name: 'wallet-deposit',
    path: '/wallet/deposit',
    requiresAuth: true,
    waitFor: 'form',
    description: 'Deposit Screen'
  },
  {
    name: 'membership',
    path: '/membership',
    requiresAuth: true,
    waitFor: 'table',
    description: 'Membership Tiers'
  },
  {
    name: 'settings',
    path: '/settings',
    requiresAuth: true,
    waitFor: 'img[alt="user"]',
    description: 'Settings Screen'
  },
  {
    name: 'tokenization',
    path: '/carbon-credit-tokenization',
    requiresAuth: true,
    waitFor: 'form',
    description: 'Carbon Credit Tokenization'
  },
  {
    name: 'list-assets',
    path: '/list-tokenized-assets',
    requiresAuth: true,
    waitFor: 'form',
    description: 'List Tokenized Assets'
  },
  {
    name: 'notifications',
    path: '/notifications',
    requiresAuth: true,
    waitFor: 'h1, h2, h3, h4',
    description: 'Notifications Page'
  },
  {
    name: 'help',
    path: '/help',
    requiresAuth: true,
    waitFor: 'h1, h2, h3, h4',
    description: 'Help & Support'
  },
  {
    name: 'marketplace',
    path: '/marketplace',
    requiresAuth: true,
    waitFor: 'div',
    description: 'Marketplace Assets'
  },
  {
    name: 'assets',
    path: '/assets',
    requiresAuth: true,
    waitFor: 'div',
    description: 'Registry Assets'
  }
];

/**
 * Ensure screenshot directory exists
 */
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Login to the application
 */
async function login(page) {
  console.log('🔐 Logging in...');
  
  await page.goto(`${CONFIG.baseURL}/login`);
  await page.waitForLoadState('networkidle');
  
  // Fill in credentials
  await page.fill('input[type="email"]', CONFIG.testCredentials.email);
  await page.fill('input[type="password"]', CONFIG.testCredentials.password);
  
  // Click login button
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL('**/');
  await page.waitForLoadState('networkidle');
  
  console.log('✅ Logged in successfully');
}

/**
 * Toggle theme (light/dark mode)
 */
async function setTheme(page, theme) {
  const isDark = theme === 'dark';
  
  // Check current theme
  const html = await page.locator('html').first();
  const currentClass = await html.getAttribute('class') || '';
  const isCurrentlyDark = currentClass.includes('dark');
  
  // Toggle if needed
  if (isDark !== isCurrentlyDark) {
    // Try to find theme toggle button
    const themeToggle = page.locator('[class*="themeSwitcher"], [aria-label*="theme"], button:has-text("Dark"), button:has-text("Light")').first();
    
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
    } else {
      // Manually set theme via localStorage and reload
      await page.evaluate((darkMode) => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', darkMode);
      }, isDark);
      await page.waitForTimeout(500);
    }
  }
  
  console.log(`🎨 Theme set to: ${theme}`);
}

/**
 * Capture screenshot of a screen
 */
async function captureScreen(page, screen, theme, viewport = 'desktop') {
  const themeSuffix = theme === 'dark' ? 'dark' : 'light';
  const viewportSuffix = viewport === 'mobile' ? 'mobile' : 'desktop';
  const filename = `${screen.name}-${themeSuffix}-${viewportSuffix}.png`;
  const filepath = path.join(CONFIG.screenshotDir, filename);
  
  console.log(`📸 Capturing: ${screen.description} (${theme} mode, ${viewport})`);
  
  try {
    // Navigate to the screen
    await page.goto(`${CONFIG.baseURL}${screen.path}`, {
      waitUntil: 'networkidle'
    });
    
    // Wait for specific element if defined
    if (screen.waitFor) {
      try {
        await page.waitForSelector(screen.waitFor, { timeout: 10000 });
      } catch (e) {
        console.warn(`⚠️  Warning: waitFor selector "${screen.waitFor}" not found, continuing anyway`);
      }
    }
    
    // Additional wait for animations/transitions
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({
      path: filepath,
      fullPage: true
    });
    
    console.log(`✅ Saved: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error capturing ${filename}:`, error.message);
    return false;
  }
}

/**
 * Main screenshot generation function
 */
async function generateScreenshots() {
  console.log('🚀 Starting XCARBON Screenshot Generator\n');
  
  // Ensure screenshot directory exists
  await ensureDirectoryExists(CONFIG.screenshotDir);
  
  // Launch browser
  console.log('🌐 Launching browser...');
  
  // WSL-specific configuration
  const isWSL = process.platform === 'linux' && 
                (process.env.WSL_DISTRO_NAME || 
                 process.env.WSLENV || 
                 await fs.readFile('/proc/version', 'utf8').catch(() => '').then(v => v.includes('microsoft')));
  
  if (isWSL) {
    console.log('🐧 WSL environment detected - using optimized settings');
  }
  
  const browser = await chromium.launch({
    headless: true, // Set to false for debugging
    // WSL-specific flags
    args: isWSL ? [
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--single-process'
    ] : []
  });
  
  try {
    // Create context and page
    const context = await browser.newContext({
      viewport: CONFIG.viewport,
      deviceScaleFactor: 2 // For high-DPI screenshots
    });
    const page = await context.newPage();
    
    // Login once for authenticated screens
    const authenticatedScreens = SCREENS.filter(s => s.requiresAuth);
    const publicScreens = SCREENS.filter(s => !s.requiresAuth);
    
    let successCount = 0;
    let failureCount = 0;
    
    // Capture public screens (no auth needed)
    if (publicScreens.length > 0) {
      console.log('\n📋 Capturing public screens...\n');
      
      for (const theme of ['light', 'dark']) {
        await setTheme(page, theme);
        
        for (const screen of publicScreens) {
          const success = await captureScreen(page, screen, theme);
          if (success) successCount++;
          else failureCount++;
        }
      }
    }
    
    // Capture authenticated screens
    if (authenticatedScreens.length > 0) {
      console.log('\n🔒 Capturing authenticated screens...\n');
      
      // Login first
      try {
        await login(page);
        
        for (const theme of ['light', 'dark']) {
          await setTheme(page, theme);
          
          for (const screen of authenticatedScreens) {
            const success = await captureScreen(page, screen, theme);
            if (success) successCount++;
            else failureCount++;
          }
        }
      } catch (error) {
        console.error('❌ Login failed:', error.message);
        console.log('⚠️  Skipping authenticated screens');
        failureCount += authenticatedScreens.length * 2; // 2 themes
      }
    }
    
    // Optional: Capture mobile screenshots
    console.log('\n📱 Capturing mobile screenshots...\n');
    await context.setViewportSize(CONFIG.mobileViewport);
    
    // Capture a few key screens in mobile view
    const mobileScreens = SCREENS.filter(s => 
      ['dashboard', 'portfolio', 'wallet', 'login'].includes(s.name)
    );
    
    for (const theme of ['light', 'dark']) {
      await setTheme(page, theme);
      
      for (const screen of mobileScreens) {
        if (screen.requiresAuth) {
          // Ensure still logged in
          try {
            await page.goto(`${CONFIG.baseURL}/`, { waitUntil: 'networkidle' });
          } catch (e) {
            await login(page);
          }
        }
        const success = await captureScreen(page, screen, theme, 'mobile');
        if (success) successCount++;
        else failureCount++;
      }
    }
    
    // Generate summary report
    console.log('\n' + '='.repeat(60));
    console.log('📊 SCREENSHOT GENERATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    console.log(`📁 Output directory: ${CONFIG.screenshotDir}`);
    console.log('='.repeat(60) + '\n');
    
    // Generate index.html for easy viewing
    await generateIndexHTML(SCREENS);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

/**
 * Generate an HTML index file to view all screenshots
 */
async function generateIndexHTML(screens) {
  console.log('📝 Generating index.html...');
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XCARBON Screenshots</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #f5f5f5;
            color: #333;
            padding: 2rem;
        }
        
        header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        h1 {
            font-size: 2.5rem;
            color: #4C6663;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        
        .filters {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 0.5rem 1.5rem;
            border: 2px solid #4C6663;
            background: white;
            color: #4C6663;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #4C6663;
            color: white;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .screen-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .screen-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .screen-header {
            padding: 1rem;
            background: #4C6663;
            color: white;
        }
        
        .screen-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .screen-path {
            font-size: 0.9rem;
            opacity: 0.8;
            font-family: monospace;
        }
        
        .screenshot-tabs {
            display: flex;
            border-bottom: 2px solid #eee;
        }
        
        .tab {
            flex: 1;
            padding: 0.75rem;
            text-align: center;
            background: #f9f9f9;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s;
        }
        
        .tab:hover {
            background: #f0f0f0;
        }
        
        .tab.active {
            background: white;
            font-weight: 600;
            color: #4C6663;
        }
        
        .screenshot-container {
            position: relative;
            padding: 1rem;
            min-height: 200px;
        }
        
        .screenshot-container img {
            width: 100%;
            height: auto;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .screenshot-view {
            display: none;
        }
        
        .screenshot-view.active {
            display: block;
        }
        
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #5B9BD5;
            color: white;
            border-radius: 12px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            background: rgba(0,0,0,0.5);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }
        
        .timestamp {
            text-align: center;
            color: #999;
            margin-top: 3rem;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>🖼️ XCARBON DApp Screenshots</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleString()}</p>
    </header>
    
    <div class="filters">
        <button class="filter-btn active" data-filter="all">All Screens</button>
        <button class="filter-btn" data-filter="public">Public Only</button>
        <button class="filter-btn" data-filter="auth">Authenticated Only</button>
        <button class="filter-btn" data-filter="desktop">Desktop Only</button>
        <button class="filter-btn" data-filter="mobile">Mobile Only</button>
    </div>
    
    <div class="grid" id="screenshotGrid">
        ${screens.map(screen => `
            <div class="screen-card" data-auth="${screen.requiresAuth}" data-name="${screen.name}">
                <div class="screen-header">
                    <div class="screen-title">
                        ${screen.description}
                        ${screen.requiresAuth ? '<span class="badge">🔒 Auth Required</span>' : '<span class="badge">🌐 Public</span>'}
                    </div>
                    <div class="screen-path">${screen.path}</div>
                </div>
                
                <div class="screenshot-tabs">
                    <button class="tab active" data-target="light-desktop">☀️ Light</button>
                    <button class="tab" data-target="dark-desktop">🌙 Dark</button>
                    ${['dashboard', 'portfolio', 'wallet', 'login'].includes(screen.name) ? 
                      '<button class="tab" data-target="mobile">📱 Mobile</button>' : ''}
                </div>
                
                <div class="screenshot-container">
                    <div class="screenshot-view active" data-view="light-desktop">
                        <img src="${screen.name}-light-desktop.png" 
                             alt="${screen.description} - Light Mode"
                             onclick="openModal(this.src)">
                    </div>
                    <div class="screenshot-view" data-view="dark-desktop">
                        <img src="${screen.name}-dark-desktop.png" 
                             alt="${screen.description} - Dark Mode"
                             onclick="openModal(this.src)">
                    </div>
                    ${['dashboard', 'portfolio', 'wallet', 'login'].includes(screen.name) ? `
                    <div class="screenshot-view" data-view="mobile">
                        <img src="${screen.name}-light-mobile.png" 
                             alt="${screen.description} - Mobile"
                             onclick="openModal(this.src)">
                    </div>` : ''}
                </div>
            </div>
        `).join('')}
    </div>
    
    <div class="modal" id="modal">
        <button class="close-modal" onclick="closeModal()">✕</button>
        <img id="modalImage" src="" alt="Full size screenshot">
    </div>
    
    <div class="timestamp">
        <p>Total Screenshots: ${screens.length * 2} desktop + ${screens.filter(s => ['dashboard', 'portfolio', 'wallet', 'login'].includes(s.name)).length * 2} mobile</p>
    </div>
    
    <script>
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const card = this.closest('.screen-card');
                const target = this.dataset.target;
                
                // Update active tab
                card.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active view
                card.querySelectorAll('.screenshot-view').forEach(v => v.classList.remove('active'));
                card.querySelector(\`[data-view="\${target}"]\`).classList.add('active');
            });
        });
        
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active filter
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const cards = document.querySelectorAll('.screen-card');
                
                cards.forEach(card => {
                    let show = true;
                    
                    if (filter === 'public') {
                        show = card.dataset.auth === 'false';
                    } else if (filter === 'auth') {
                        show = card.dataset.auth === 'true';
                    } else if (filter === 'desktop') {
                        show = true; // All cards have desktop
                    } else if (filter === 'mobile') {
                        show = ['dashboard', 'portfolio', 'wallet', 'login'].includes(card.dataset.name);
                    }
                    
                    card.style.display = show ? 'block' : 'none';
                });
            });
        });
        
        // Modal functions
        function openModal(src) {
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modalImage');
            modalImage.src = src;
            modal.classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }
        
        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Close modal on background click
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>
  `;
  
  const indexPath = path.join(CONFIG.screenshotDir, 'index.html');
  await fs.writeFile(indexPath, html.trim());
  
  console.log(`✅ Index generated: ${indexPath}`);
}

// Run the script
generateScreenshots().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
