# HealSense Mobile App

A real-time health monitoring mobile application built with React Native and Expo. This app allows patients to track their vital signs, receive critical health alerts, and quickly contact emergency contacts when needed.

## Features

### 📊 Real-Time Vital Monitoring
- Continuous tracking of key health metrics:
  - Heart Rate (bpm)
  - Blood Oxygen Level (SpO₂)
  - Body Temperature
  - Blood Pressure (Systolic/Diastolic)
  - Respiratory Rate
- Color-coded status indicators (Normal, Warning, Critical)
- Live connection status

### 🚨 Smart Alert System
- Automatic alerts when vitals go outside safe ranges
- Acknowledgeable notifications
- Clear all alerts with one tap
- Alert history tracking

### 👤 User Authentication
- Secure login and signup
- Profile data stored locally (AsyncStorage)
- Session persistence across app restarts
- Demo account available for testing

### 📝 Profile Management
- Edit personal information (name, age, blood type)
- Medical conditions tracking
- Current medications list
- Emergency contact management (Doctor & Family)
- Dark mode support

### 🆘 Emergency Features
- One-tap emergency button on dashboard
- Quick access to emergency contacts
- Integrated call and WhatsApp functionality
- Auto-generated emergency messages with current vital signs

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo 54
- **Language**: TypeScript 5.3.3
- **Navigation**: React Navigation 6.x
- **State Management**: React Query, Context API
- **Storage**: AsyncStorage
- **UI**: React Native Components, Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js v24.12.0 or higher
- npm or yarn package manager
- Expo CLI
- Expo Go app (for testing on physical device)

### Testing the App

Use the demo account to test the app:
- **Email**: umair@healsense.com
- **Password**: password123

This account comes pre-configured with:
- Patient: Umair Hakeem, 24 years old, Blood Type O+
- Emergency Contacts: Dr. Ahmed Khan (Doctor) and Awais (Brother)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AlertBanner.tsx
│   ├── EmergencyDialog.tsx
│   ├── PatientHeader.tsx
│   └── VitalCard.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── DarkModeContext.tsx
├── hooks/             # Custom React hooks
│   ├── usePatient.ts
│   ├── useVitals.ts
│   └── useWebSocket.ts
├── screens/           # Main app screens
│   ├── DashboardScreen.tsx
│   ├── AlertsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── EditProfileScreen.tsx
├── types/             # TypeScript type definitions
│   └── vitals.ts
└── App.tsx            # Root component
```

## Key Features Explained

### Dashboard
The main screen displays all current vital signs in an easy-to-read grid layout. Each vital sign card shows:
- Current value
- Unit of measurement
- Status indicator (green/yellow/red)
- Icon representation

Active alerts appear at the top of the dashboard with options to acknowledge or dismiss them.

### Profile Editing
Users can update their information by tapping the edit icon on the Profile screen. The edit form includes:
- Personal details (name, age, blood type)
- Medical conditions (comma-separated list)
- Current medications (comma-separated list)
- Doctor emergency contact (name, phone, relation)
- Family emergency contact (name, phone, relation)

All changes are saved locally and persist across sessions.

### Emergency System
When the emergency button is pressed, a dialog appears showing:
- Patient information
- Medical conditions (if any)
- Two emergency contact rows:
  - **Doctor row**: Call or WhatsApp the doctor
  - **Family row**: Call or WhatsApp family member

WhatsApp messages are automatically formatted with:
- Patient details (name, age, blood type)
- Current vital signs with values
- Timestamp of readings
- Emergency alert notification

## Development Notes

### Mock Data
The app currently uses mock data for vitals and patient information. This is controlled by the `VITE_USE_MOCK_DATA` environment variable. When connected to a backend, set this to `false`.

### Authentication
User authentication is currently implemented with local storage (AsyncStorage). In production, this should be replaced with a proper backend authentication system with secure token management.

### Vital Signs Polling
The app polls for new vital sign readings every 5 seconds. This can be adjusted in the `useVitals` hook.

## Future Enhancements

- [ ] Backend API integration
- [ ] Real IoT device connectivity
- [ ] Push notifications for critical alerts
- [ ] Historical data charts and trends
- [ ] Multiple patient support
- [ ] Biometric authentication
- [ ] Offline mode with data sync
- [ ] Export health reports (PDF)

## Contributing

I'm currently developing this as part of my Final Year Project. Suggestions and feedback are welcome!

## License

This project is part of an academic Final Year Project.

## Contact

For any questions or issues, please reach out through the repository's issue tracker.

---
