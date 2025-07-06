# Progressive Web App (PWA) Setup

This document outlines the PWA implementation for the Quantum xCarbon application.

## Features Implemented

### 1. Web App Manifest

- **File**: `public/manifest.json`
- **Features**:
  - App name and short name
  - Theme colors and background color
  - Display mode set to "standalone"
  - App icons in multiple sizes (192x192, 512x512)
  - App categories and language settings

### 2. Service Worker

- **Implementation**: Vite PWA plugin with Workbox
- **Features**:
  - Automatic caching of app assets
  - Runtime caching for Google Fonts
  - Offline functionality
  - Automatic updates with user notification

### 3. PWA Components

#### PWA Install Prompt (`src/components/PWA/PWAInstallPrompt.jsx`)

- Detects when the app can be installed
- Shows a custom install prompt
- Handles the installation process
- Dismissible by user

#### PWA Update Prompt (`src/components/PWA/PWAUpdatePrompt.jsx`)

- Detects when app updates are available
- Shows update notification to users
- Handles service worker updates
- Shows offline ready notification

### 4. App Icons

- **192x192**: `public/icon-192x192.png`
- **512x512**: `public/icon-512x512.png`
- **Fallback**: `public/logodark.png`

### 5. Offline Page

- **File**: `public/offline.html`
- Custom offline experience when network is unavailable

## Configuration Files

### Vite Configuration (`vite.config.js`)

```javascript
VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    // Manifest configuration
  },
  workbox: {
    // Service worker configuration
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    runtimeCaching: [
      // Google Fonts caching strategy
    ],
  },
});
```

### HTML Meta Tags (`index.html`)

- Theme color meta tag
- Apple touch icon
- iOS Safari PWA meta tags
- Windows tile configuration
- Manifest link

## How to Test PWA Features

### 1. Install Prompt

1. Open the app in a supported browser (Chrome, Edge, Firefox)
2. The install prompt should appear automatically
3. Click "Install" to add the app to your device

### 2. Offline Functionality

1. Open the app and navigate around
2. Disconnect from the internet
3. Try to navigate - cached pages should still work
4. Visit a new page to see the offline page

### 3. Update Notifications

1. Make changes to the app and rebuild
2. Deploy the new version
3. Users with the old version will see an update prompt

### 4. Service Worker

1. Open Developer Tools
2. Go to Application tab
3. Check Service Workers section
4. Verify the service worker is registered and active

## Browser Support

### Desktop

- Chrome 67+
- Firefox 58+
- Safari 11.1+
- Edge 79+

### Mobile

- Chrome Mobile 67+
- Firefox Mobile 58+
- Safari iOS 11.3+
- Samsung Internet 7.2+

## Deployment Considerations

1. **HTTPS Required**: PWAs require HTTPS in production
2. **Service Worker Scope**: Ensure service worker is served from root
3. **Cache Strategy**: Configure appropriate cache strategies for your API calls
4. **Icon Sizes**: Ensure icons are properly sized and optimized
5. **Manifest Validation**: Test manifest with browser dev tools

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Install Prompt Not Showing

- Check if app meets PWA criteria
- Verify manifest.json is valid
- Ensure HTTPS is enabled
- Check browser console for errors

### Service Worker Not Registering

- Verify service worker file is accessible
- Check for JavaScript errors
- Ensure proper HTTPS setup
- Clear browser cache and try again

### Icons Not Displaying

- Verify icon files exist in public directory
- Check manifest.json icon paths
- Ensure icons are proper PNG format
- Test with different icon sizes

## Future Enhancements

1. **Push Notifications**: Implement web push notifications
2. **Background Sync**: Add background synchronization
3. **Advanced Caching**: Implement more sophisticated caching strategies
4. **Offline Forms**: Handle form submissions when offline
5. **App Shortcuts**: Add app shortcuts to manifest
