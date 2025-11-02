# Package HealSense (Next.js) as Android/iOS with Capacitor

This folder contains a Next.js app (web). To install it as a native Android/iOS app, wrap it with Capacitor.

## What you get
- A real Android/iOS package (APK/IPA) that loads your Next.js UI inside a WebView
- Access to native APIs via Capacitor plugins (Push, BLE, Filesystem, etc.)
- Publishable to Play Store / App Store (after signing requirements)

## What you need
- Node.js + package manager (pnpm/yarn/npm)
- For Android builds: Android Studio + SDK + platform tools
- For iOS builds: Xcode (on a Mac) + Apple Developer account

## 1) Install Capacitor dependencies

```bash
# from this folder: healsense/frontend/mobile/android/code
pnpm add @capacitor/core
pnpm add -D @capacitor/cli
# add platforms you need (can be done later)
pnpm add @capacitor/android @capacitor/ios
```

## 2) Initialize Capacitor

```bash
pnpm exec cap init HealSense com.healsense.app -y
```

This will create/confirm `capacitor.config.ts`. We already added a starter file.

- In development: set `server.url` to your dev machine IP:
  ```ts
  server: { url: 'http://192.168.1.50:3000', cleartext: true }
  ```
- In production: set to your hosted HTTPS URL (e.g., Vercel):
  ```ts
  server: { url: 'https://healsense.example.com' }
  ```
- Advanced: if you want to ship files inside the app bundle, use `next export` with `output: 'export'` and set `webDir: 'out'`. Note: some Next.js features don’t export statically.

## 3) Build your web app

```bash
# dev (runs on your laptop/desktop)
pnpm dev

# production static export (optional)
# add to next.config.mjs: export default { output: 'export' }
pnpm build && pnpm next export -o out
```

## 4) Add Android / iOS platforms and sync

```bash
pnpm exec cap add android
pnpm exec cap add ios

# copy web assets (if using static export) or just sync configs
pnpm exec cap copy
pnpm exec cap sync
```

## 5) Open in native IDEs

```bash
# Android Studio
pnpm exec cap open android

# Xcode (Mac only)
pnpm exec cap open ios
```

Build and run on device/emulator from the IDE.

---

## BLE and Notifications (important)

Your current app uses web tech. For full native behavior you have two options:

### Option A — Keep Web APIs where possible (fastest)
- Android (Chrome WebView): Web Bluetooth generally works on Android 8+ if the WebView supports it and your content is served over HTTPS or trusted origin. In practice, you’ll hit limitations, especially in background.
- iOS: Web Bluetooth is not supported in iOS Safari/WebView. You will NOT get BLE on iOS with plain web APIs.
- Push: Web Push works on Android/Chrome with Service Workers; on iOS/Safari it’s limited. In a Capacitor WebView, use native Push plugin instead of Service Workers for reliability.

### Option B — Use Capacitor native plugins (recommended)
- BLE: Use `@capacitor-community/bluetooth-le` or a Cordova BLE plugin via Capacitor. Create an abstraction layer that uses native plugin on mobile and Web Bluetooth in browser.
- Push Notifications: Use `@capacitor/push-notifications` and configure FCM (Android) + APNS (iOS). Don’t rely on Service Worker push when inside a native WebView.

Example adapter shape (pseudo-code):

```ts
// lib/ble/index.ts
export interface BleApi {
  scan(): Promise<Device[]>;
  connect(id: string): Promise<void>;
  read(service: string, characteristic: string): Promise<DataView>;
  subscribe(service: string, characteristic: string, cb: (data: DataView) => void): Promise<void>;
}

export const ble: BleApi = isNative
  ? await import('./native').then(m => m.nativeBle)
  : await import('./web').then(m => m.webBle);
```

- Native BLE: `lib/ble/native.ts` uses Capacitor plugin APIs
- Web BLE: `lib/ble/web.ts` uses `navigator.bluetooth`

---

## Permissions (Android/iOS)

- AndroidManifest.xml (generated in `android/`): add location/ble permissions for Android 12+
  - `BLUETOOTH`, `BLUETOOTH_ADMIN`, `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN`, optional `ACCESS_FINE_LOCATION`
- iOS: add `NSBluetoothAlwaysUsageDescription` in Info.plist
- Push: FCM config for Android; APNS certificates/keys for iOS

---

## PWA vs Native: What’s feasible right now?

- PWA “Add to Home Screen”: Works immediately on Android and iOS, but:
  - iOS: no Web Bluetooth; push is limited
  - Android: better, but background BLE and reliability still limited
- Capacitor Native: Real APK/IPA with full native plugins → recommended if you need BLE + reliable notifications on both platforms.

---

## Summary Choices

1) Quick demo today: Run as PWA, install to Android home screen. Accept limitations (iOS BLE won’t work).
2) Wrap with Capacitor now: You’ll need to install Android Studio/Xcode to build. Use native plugins for BLE/Push.
3) Full native Flutter app: Start a proper Flutter project (recommended for long-term) and port your UI/logic. Best BLE/Push support across both platforms.

If you want, we can wire the BLE adapter skeleton and push-notification setup next.
