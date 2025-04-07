
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
  }
};

export default config;
