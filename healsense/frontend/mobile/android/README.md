# HealSense - Health Monitoring PWA

A mobile-first Progressive Web App for real-time vital signs monitoring with alerting, WhatsApp notifications, and offline-first capabilities.

## Features

- **Real-time Vital Monitoring**: Heart rate, SpO₂, temperature, blood pressure, respiratory rate
- **Intelligent Alerting**: Critical and warning thresholds with WhatsApp SOS integration
- **Live Charting**: Real-time visualization of vital trends over 15-minute windows
- **Offline Support**: Full IndexedDB caching with background sync
- **PWA Install**: Installable on mobile devices with home screen integration
- **Emergency SOS**: One-tap WhatsApp notifications to emergency contacts
- **Web Bluetooth**: Scan and connect to medical devices (fallback to mock)
- **Health History**: Filterable historical data with CSV export
- **Dark Mode**: Optimized healthcare-focused dark theme

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: Dexie (IndexedDB), React Query patterns
- **Charting**: Recharts
- **Forms**: react-hook-form + zod
- **State**: Custom hooks (useVitals, useAlerts)
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Storage**: IndexedDB + localStorage

## Getting Started

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com/realtime
NEXT_PUBLIC_FCM_VAPID_KEY=your_vapid_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

Without these env vars, the app runs in **Mock Mode** with generated vital signs and IndexedDB storage.

## File Structure

\`\`\`
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── monitor/page.tsx
│   ├── devices/page.tsx
│   ├── alerts/page.tsx
│   ├── history/page.tsx
│   ├── settings/page.tsx
│   └── page.tsx (dashboard)
├── components/
│   ├── layout/bottom-nav.tsx
│   ├── vitals/
│   ├── monitor/
│   ├── devices/
│   ├── history/
│   └── settings/
├── lib/
│   ├── db/ (Dexie setup)
│   ├── api/ (API client)
│   ├── hooks/ (useVitals, useAlerts)
│   ├── mock-data.ts
│   ├── thresholds.ts
│   └── whatsapp.ts
├── types/
├── public/manifest.json
└── app/globals.css
\`\`\`

## Usage

### Dashboard (/)
View latest vitals, status overview, and quick actions including emergency SOS.

### Monitor (/monitor)
Real-time session monitoring with 5 live charts, session timer, and critical alerts panel.

### Devices (/devices)
Connect to health monitoring devices via Web Bluetooth or use mock device in development.

### Alerts (/alerts)
Browse all alerts with severity filtering, share functionality, and acknowledgment tracking.

### History (/history)
Analyze trends with filterable charts, statistics, and CSV data export.

### Settings (/settings)
Configure thresholds, emergency contacts, units, language, and notification preferences.

## Mock Mode

When env variables are missing, the app:
- Generates realistic vital signs every minute
- Stores data in IndexedDB (persists across sessions)
- Simulates alerts based on threshold violations
- Displays "Mock Mode" indicator in header

Run: `npm run dev` - no env setup needed to explore the full UX.

## Offline Support

- All vital readings cached in IndexedDB
- Browse history and view charts without internet
- Settings synchronized to local storage
- Background sync queue ready for real API

## PWA Features

- Add to home screen on mobile
- Works offline (with cached data)
- Responsive design for all screen sizes
- Status bar theme integrated

To install: Open the app on mobile → Share → Add to Home Screen

## Accessibility

- WCAG AA compliant
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Dark mode optimized for reduced eye strain

## Testing

\`\`\`bash
# Unit tests (placeholder structure ready)
npm run test

# E2E tests with Playwright
npm run test:e2e
\`\`\`

## Performance

- Optimized for mobile first (touch-friendly)
- Minimal main thread work with React hooks
- Efficient re-renders with proper memoization
- Chart rendering optimized for mobile viewports
- Service worker ready for offline support

## Future Enhancements

- Real WebSocket integration for multi-device sync
- Firebase Cloud Messaging push notifications
- Web Bluetooth pairing flow
- Advanced health analytics and insights
- Multi-patient support
- Caregiver role and notifications

## Deployment

Deploy to Vercel:

\`\`\`bash
vercel
\`\`\`

Set environment variables in Vercel project settings.

## Support

For issues or questions, open an issue in the repository.

## License

MIT
\`\`\`

```env.example file=".env.example"
# API Configuration (leave empty to use mock mode)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com/realtime

# Firebase Cloud Messaging (for push notifications)
NEXT_PUBLIC_FCM_VAPIR_KEY=your_vapid_public_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Development redirect for Supabase auth (optional)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
