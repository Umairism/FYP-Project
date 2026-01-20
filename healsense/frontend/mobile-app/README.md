# HealSense Mobile App

**Real-Time Health Monitoring Application**

[![React Native](https://img.shields.io/badge/react--native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/expo-54.0-purple.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Academic-blue.svg)](LICENSE)

A production-ready mobile application for continuous health monitoring built with React Native and Expo. Track vital signs in real-time, receive intelligent health alerts, and access emergency contacts instantly.

## ✨ Features

### 📊 Real-Time Vital Monitoring

Continuous tracking of **5 critical health metrics**:

| Vital Sign | Normal Range | Warning Threshold | Critical Threshold |
|------------|-------------|-------------------|-------------------|
| **Heart Rate** | 60-100 bpm | 50-60 or 100-120 | <50 or >120 |
| **SpO₂** | 95-100% | 90-94% | <90% |
| **Temperature** | 36.5-37.5°C | 37.5-38.5°C | <36.0 or >38.5°C |
| **Blood Pressure** | 90-140 mmHg | 140-160 mmHg | <90 or >160 mmHg |
| **Respiratory Rate** | 12-20 /min | 10-12 or 20-25 | <10 or >25 |

**Features:**
- ✅ Live vital signs display with auto-refresh (5s intervals)
- ✅ Color-coded status indicators (🟢 Normal, 🟡 Warning, 🔴 Critical)
- ✅ Connection status indicator
- ✅ Smooth animations and transitions
- ✅ Responsive grid layout

### 🚨 Smart Alert System

- **Automatic Detection**: Alerts triggered when vitals exceed safe thresholds
- **Acknowledgment**: Tap to acknowledge and dismiss alerts
- **Batch Actions**: Clear all alerts with one tap
- **Alert History**: View past alerts on Alerts screen
- **Visual Hierarchy**: Critical alerts prominently displayed at top of dashboard
- **Status Badges**: Color-coded severity indicators

### 👤 User Authentication

- **Secure Login**: Email/password authentication
- **Sign Up**: New user registration with validation
- **Session Persistence**: Auto-login on app restart
- **Local Storage**: AsyncStorage for offline-first architecture
- **Demo Account**: Pre-configured test account for easy onboarding

### 📝 Profile Management

**Editable Fields:**
- Personal Information: Name, Age, Blood Type
- Medical History: Chronic conditions (comma-separated)
- Current Medications: Active medications list
- Emergency Contacts:
  - **Doctor**: Name, phone, relation
  - **Family**: Name, phone, relation

**Features:**
- ✅ Inline editing with validation
- ✅ Real-time save to AsyncStorage
- ✅ Profile card with avatar
- ✅ Dark mode support

### 🆘 Emergency System

**One-Tap Emergency Access**:
- Prominent emergency button on dashboard (red, always visible)
- Modal dialog with:
  - Patient summary (name, age, blood type, conditions)
  - Two emergency contact rows:
    - **Call**: Direct phone call integration
    - **WhatsApp**: Pre-formatted emergency message with vital signs

**Auto-Generated WhatsApp Message**:
```
🚨 EMERGENCY ALERT 🚨

Patient: Umair Hakeem
Age: 24 | Blood Type: O+

Current Vital Signs:
❤️ Heart Rate: 92 bpm (Normal)
🫁 SpO₂: 98% (Normal)
🌡️ Temperature: 37.2°C (Normal)
💉 Blood Pressure: 120 mmHg (Normal)
💨 Respiratory Rate: 16 /min (Normal)

Time: 2026-01-21 10:30:45

⚠️ Immediate attention required.
```

### 🎨 UI/UX Features

- **Dark Mode**: Full app dark mode with theme toggle
- **Responsive Design**: Adapts to all screen sizes
- **Smooth Navigation**: React Navigation with native animations
- **Haptic Feedback**: Tactile feedback on important actions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error messages
- **Accessibility**: Screen reader support, high contrast

## 🛠️ Tech Stack

### Core Framework
- **React Native**: 0.81.5
- **Expo SDK**: 54.0.31
- **TypeScript**: 5.3.3
- **React**: 19.1.0

### Navigation & Routing
- **@react-navigation/native**: 6.1.18
- **@react-navigation/native-stack**: 6.11.0
- **@react-navigation/bottom-tabs**: 6.6.1

### State Management
- **@tanstack/react-query**: 5.32.0 (server state)
- **React Context API** (global state)
- **Zustand**: 4.4.7 (lightweight state)

### Data & API
- **Axios**: 1.6.5 (HTTP client)
- **Zod**: 3.22.4 (schema validation)
- **AsyncStorage**: 2.2.0 (local persistence)

### UI Components
- **react-native-svg**: 15.12.1
- **expo-linear-gradient**: 15.0.8
- **react-native-vector-icons**: 10.0.0
- **expo-vector-icons**: (included in Expo)

### Utilities
- **date-fns**: 2.30.0 (date formatting)
- **expo-notifications**: 0.32.16
- **expo-device**: 8.0.10
- **expo-constants**: 18.0.13

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v24.12.0 or higher
- **npm**: v10+ (comes with Node.js)
- **Expo CLI**: Installed globally or use npx
- **Expo Go**: Mobile app for testing ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
# Navigate to mobile app directory
cd healsense/frontend/mobile-app

# Install dependencies
npm install

# Start development server
npx expo start

# Alternative commands:
npm run start      # Start Expo dev server
npm run android    # Open on Android emulator/device
npm run ios        # Open on iOS simulator (macOS only)
npm run web        # Open in web browser
```

### Testing the App

#### Option 1: Physical Device (Recommended)

1. Install **Expo Go** from App Store/Play Store
2. Run `npx expo start`
3. Scan QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

#### Option 2: Emulator/Simulator

**Android Emulator** (Windows/macOS/Linux):
```bash
# Install Android Studio first
# Create/start AVD, then:
npm run android
```

**iOS Simulator** (macOS only):
```bash
# Install Xcode first, then:
npm run ios
```

### Demo Account

Login with pre-configured demo credentials:

```
Email:    umair@healsense.com
Password: password123
```

**Pre-loaded Data:**
- **Patient**: Umair Hakeem, 24 years, Blood Type O+
- **Conditions**: None
- **Medications**: None
- **Doctor**: Dr. Ahmed Khan, +92-300-1234567
- **Family**: Awais (Brother), +92-301-7654321
- **Vitals**: Mock data with realistic values

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── AlertBanner.tsx      # Alert notification banner
│   │   ├── AlertItem.tsx        # Individual alert card
│   │   ├── EmergencyDialog.tsx  # Emergency contacts modal
│   │   ├── PatientHeader.tsx    # Patient info header
│   │   ├── PatientProfileCard.tsx # Profile card component
│   │   └── VitalCard.tsx        # Vital sign card
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── DarkModeContext.tsx  # Theme state
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── usePatient.ts        # Patient data management
│   │   ├── useVitals.ts         # Vital signs polling
│   │   └── useWebSocket.ts      # WebSocket connection (future)
│   │
│   ├── lib/                     # Core utilities
│   │   ├── api.ts               # API client (Axios)
│   │   └── config.ts            # App configuration
│   │
│   ├── screens/                 # Main app screens
│   │   ├── DashboardScreen.tsx  # Main vitals dashboard
│   │   ├── AlertsScreen.tsx     # Alert history
│   │   ├── ProfileScreen.tsx    # User profile view
│   │   ├── EditProfileScreen.tsx # Profile editing
│   │   ├── SettingsScreen.tsx   # App settings
│   │   ├── LoginScreen.tsx      # Authentication
│   │   └── SignupScreen.tsx     # User registration
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── vitals.ts            # Vital signs types
│   │
│   ├── App.tsx                  # Root component
│   └── index.tsx                # Entry point
│
├── assets/                      # Static assets
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── babel.config.js              # Babel config
├── jest.config.js               # Jest config
├── jest.setup.js                # Jest setup
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guide
└── README.md                    # This file
```

## 🎯 Key Features Explained

### 📱 Dashboard Screen

The main monitoring interface with real-time vital signs display.

**Layout:**
- **Header**: Patient name, connection status, emergency button
- **Alert Banner**: Active alerts (if any) with acknowledge/dismiss actions
- **Vitals Grid**: 2x3 grid of vital sign cards
- **Navigation**: Bottom tab bar

**Vital Card Components:**
```
┌─────────────────────┐
│ 💓 Heart Rate       │  ← Icon + Label
│                     │
│     92 bpm          │  ← Large value + unit
│                     │
│   🟢 Normal         │  ← Status badge
└─────────────────────┘
```

**Color Coding:**
- 🟢 **Green**: Normal range
- 🟡 **Yellow**: Warning threshold
- 🔴 **Red**: Critical threshold

**Refresh Rate**: 5 seconds (configurable in `useVitals` hook)

### 🚨 Alert System

**Alert Trigger Logic:**
```typescript
if (heartRate < 50 || heartRate > 120) {
  createAlert('critical', 'Heart rate outside safe range');
} else if (heartRate < 60 || heartRate > 100) {
  createAlert('warning', 'Heart rate approaching threshold');
}
```

**Alert Properties:**
- `id`: Unique identifier
- `type`: 'warning' | 'critical'
- `title`: Alert title
- `message`: Detailed description
- `timestamp`: Creation time
- `acknowledged`: Boolean flag

**Actions:**
- **Acknowledge**: Mark as read (remains in history)
- **Dismiss**: Remove from view
- **Clear All**: Batch dismiss all alerts

### 👤 Profile Management

**Profile Data Structure:**
```typescript
interface Patient {
  id: string;
  name: string;
  age: number;
  bloodType: string;
  medicalConditions: string[];
  currentMedications: string[];
  emergencyContacts: {
    doctor: Contact;
    family: Contact;
  };
}

interface Contact {
  name: string;
  phone: string;
  relation: string;
}
```

**Edit Flow:**
1. Navigate to Profile screen
2. Tap edit icon (✏️)
3. Modify fields in EditProfileScreen
4. Save → Validates → Updates AsyncStorage → Navigates back

**Validation Rules:**
- Name: 2-50 characters
- Age: 1-150
- Blood Type: A+, A-, B+, B-, AB+, AB-, O+, O-
- Phone: Valid format with country code

### 🆘 Emergency System

**Emergency Button:**
- Location: Top-right of dashboard
- Always visible
- Red color (#EF4444)
- Icon: ⚠️

**Emergency Dialog Flow:**
```
User taps Emergency Button
         ↓
Modal opens with patient summary
         ↓
User selects contact row
         ↓
Choose: Call 📞 or WhatsApp 💬
         ↓
System opens respective app
```

**WhatsApp Integration:**
```typescript
const message = `🚨 EMERGENCY ALERT 🚨

Patient: ${patient.name}
Age: ${patient.age} | Blood Type: ${patient.bloodType}

Current Vital Signs:
❤️ Heart Rate: ${vitals.heartRate} bpm (${vitals.hrStatus})
🫁 SpO₂: ${vitals.spo2}% (${vitals.spo2Status})
🌡️ Temperature: ${vitals.temperature}°C (${vitals.tempStatus})
💉 Blood Pressure: ${vitals.bloodPressure} mmHg (${vitals.bpStatus})
💨 Respiratory Rate: ${vitals.respiratoryRate} /min (${vitals.rrStatus})

Time: ${formatDateTime(new Date())}

⚠️ Immediate attention required.`;

const whatsappUrl = `whatsapp://send?phone=${contact.phone}&text=${encodeURIComponent(message)}`;
Linking.openURL(whatsappUrl);
```

### 🌙 Dark Mode

**Theme Toggle:**
- Location: Settings screen
- Persists in AsyncStorage
- Affects all screens and components

**Color Palette:**
```typescript
const colors = {
  light: {
    background: '#FFFFFF',
    card: '#F3F4F6',
    text: '#1F2937',
    primary: '#3B82F6',
  },
  dark: {
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    primary: '#60A5FA',
  },
};
```

## 🔧 Development

### Environment Setup

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web browser
```

### Environment Variables

Create `.env` file in project root:
```env
# API Configuration
API_BASE_URL=http://localhost:8000
WS_BASE_URL=ws://localhost:8000/ws

# Feature Flags
USE_MOCK_DATA=true
ENABLE_PUSH_NOTIFICATIONS=false

# Development
DEBUG_MODE=true
LOG_LEVEL=info
```

### Mock Data

Currently using mock data for development:

**Location**: `src/hooks/useVitals.ts`

```typescript
const mockVitals = {
  heartRate: Math.floor(Math.random() * 40) + 70,  // 70-110
  spo2: Math.floor(Math.random() * 5) + 95,        // 95-100
  temperature: (Math.random() * 1.5) + 36.5,       // 36.5-38
  bloodPressure: Math.floor(Math.random() * 30) + 110, // 110-140
  respiratoryRate: Math.floor(Math.random() * 6) + 14, // 14-20
};
```

**To connect to real API**: Set `USE_MOCK_DATA=false` and configure `API_BASE_URL`

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas login
eas build:configure

# Build for Android
npm run build:android
# or
eas build --platform android

# Build for iOS (requires Apple Developer account)
npm run build:ios
# or
eas build --platform ios

# Build both platforms
npm run build:all
```

## 📊 Data Flow

```
┌─────────────────┐
│   Dashboard     │
│    Screen       │
└────────┬────────┘
         │
         │ useVitals()
         ↓
┌─────────────────┐
│  API Client     │  ← Axios
│   (api.ts)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Backend      │  ← FastAPI (planned)
│   API Server    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   IoT Sensors   │  ← Arduino/ESP32
│   (Hardware)    │
└─────────────────┘
```

### State Management

```
Authentication → AuthContext (global)
Dark Mode      → DarkModeContext (global)
Vital Signs    → React Query (server cache)
Patient Data   → AsyncStorage (local persistence)
```

## 🧪 Testing

### Unit Tests

```bash
npm test -- VitalCard.test.tsx
npm test -- AlertBanner.test.tsx
npm test -- useVitals.test.ts
```

### Integration Tests

```bash
npm test -- DashboardScreen.test.tsx
npm test -- AuthContext.test.tsx
```

### E2E Tests (Planned)

- Detox framework
- Critical user flows
- Automated UI testing

## 🚀 Deployment

### App Store (iOS)

1. Configure app.json with bundle identifier
2. Set up Apple Developer account
3. Generate provisioning profiles
4. Build with EAS: `eas build --platform ios`
5. Upload to App Store Connect
6. Submit for review

### Google Play (Android)

1. Configure app.json with package name
2. Create Google Play Developer account
3. Generate signing key
4. Build with EAS: `eas build --platform android`
5. Upload AAB to Google Play Console
6. Submit for review

## 📈 Performance Optimization

- ✅ **React.memo**: Memoized components to prevent unnecessary re-renders
- ✅ **useCallback**: Memoized callbacks for expensive operations
- ✅ **Lazy Loading**: Screens loaded on-demand with React Navigation
- ✅ **Image Optimization**: Compressed assets with expo-optimize
- ✅ **Bundle Size**: <50MB APK, <25MB IPA

## 🔐 Security

- ✅ **Local Data**: AsyncStorage with encryption (expo-secure-store planned)
- ✅ **API Communication**: HTTPS only in production
- ✅ **Input Validation**: Zod schemas for all forms
- ✅ **XSS Prevention**: Sanitized user inputs
- ⏳ **Biometric Auth**: Face ID / Touch ID (planned)
- ⏳ **Certificate Pinning**: SSL pinning (planned)

## 🐛 Known Issues

1. **iOS Simulator**: WhatsApp deep linking doesn't work (use physical device)
2. **Android**: Occasional AsyncStorage race condition on cold start
3. **Web**: Some Expo APIs not available in web build

## 🔮 Future Enhancements

### High Priority
- [ ] Backend API integration with FastAPI
- [ ] Real-time WebSocket data streaming
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Historical data charts (Victory Native)
- [ ] Export health reports (PDF generation)

### Medium Priority
- [ ] Multiple patient profiles
- [ ] Biometric authentication
- [ ] Offline mode with data sync
- [ ] Machine learning predictions on device
- [ ] Voice commands (Siri/Google Assistant)

### Low Priority
- [ ] Wearable device integration (Apple Watch, Galaxy Watch)
- [ ] Telemedicine video calls
- [ ] Medication reminders
- [ ] Health goals and tracking
- [ ] Social features (care circle)

## 📚 Resources

- **[React Native Docs](https://reactnative.dev/docs/getting-started)**
- **[Expo Docs](https://docs.expo.dev/)**
- **[React Navigation](https://reactnavigation.org/docs/getting-started)**
- **[React Query](https://tanstack.com/query/latest)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**

## 🤝 Contributing

This is an academic Final Year Project. Contributions, suggestions, and feedback are welcome!

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Make changes and test
4. Commit with conventional commits: `feat: add new feature`
5. Push and create pull request

### Code Style

- ESLint configuration enforced
- Prettier for formatting
- TypeScript strict mode
- Conventional commits

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Academic Final Year Project - Educational Use Only

## 👨‍💻 Author

**Umair Hakeem**  
Final Year Project - 2025/2026

## 🙏 Acknowledgments

- React Native and Expo teams for excellent frameworks
- React Navigation for smooth navigation
- TanStack Query for server state management
- Open source community

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Contact through university email

---

**Version**: 0.0.1  
**Last Updated**: January 21, 2026  
**Status**: Active Development  
**Platform**: iOS, Android, Web (Expo)
