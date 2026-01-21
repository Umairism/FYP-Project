# HealSense Mobile App

Real-time health monitoring with phone sensors and IoT devices.

## Quick Start

```bash
npm install
npx expo start
```

## Features

- Real-time vital signs (HR, SpO2, Temp, BP, RR)
- Phone sensor integration (Google Fit)
- Smart alert system
- Emergency contacts
- Dark mode

## Structure

```
src/
├── components/   # UI components
├── contexts/     # Auth, Theme
├── hooks/        # useVitals, usePatient
├── lib/          # API client
├── screens/      # App screens
├── services/     # Phone sensors
└── types/        # TypeScript types
```

## Config

`.env`:
```env
EXPO_PUBLIC_API_BASE_URL=http://10.10.86.33:5000/api/v1
```

## Phone Sensors

**Native build** (real data): `npx expo run:android`
**Expo Go** (simulated): `npx expo start`

## Tech

React Native • Expo • TypeScript • Google Fit
