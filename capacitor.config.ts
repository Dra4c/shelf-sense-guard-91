
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.74cb7a54c5b446ce9b48205e69bf4b0d',
  appName: 'shelf-sense-guard',
  webDir: 'dist',
  server: {
    url: 'https://74cb7a54-c5b4-46ce-9b48-205e69bf4b0d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  // Add styles for the barcode scanner
  appendUserAgent: 'ShelfSenseGuard',
  style: {
    '.scanner-active': {
      'background': 'transparent !important',
      'background-color': 'transparent !important',
    },
    '.scanner-ui .scan-region': {
      'border': '2px solid #4C8CF5',
      'border-radius': '10px',
      'padding': '20px',
      'margin-bottom': '20px',
      'position': 'relative',
      'width': '80%',
      'max-width': '300px',
      'aspect-ratio': '1',
    }
  }
};

export default config;
