import { CapacitorConfig } from '@capacitor/cli'

// IMPORTANT
// - For development, set `server.url` to your dev machine IP (same Wi‑Fi) running `next dev`
// - For production, host your Next.js app (e.g., Vercel) and set `server.url` to that HTTPS URL
//   OR serve a prebuilt static bundle inside the app using a native web server (advanced)

const config: CapacitorConfig = {
  appId: 'com.healsense.app',
  appName: 'HealSense',
  webDir: 'out', // if you use `next export` with `output: "export"` in next.config
  bundledWebRuntime: false,
  server: {
    // Replace with your dev server URL (use your LAN IP)
    // Example: url: 'http://192.168.1.50:3000', cleartext: true
    // In production, use your hosted HTTPS URL (no cleartext)
    // url: 'https://healsense.yourdomain.com'
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'always'
  }
}

export default config
