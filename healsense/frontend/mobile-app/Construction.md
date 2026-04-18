# HealSense Flutter Reconstruction Plan

This document outlines the detailed architecture and implementation steps to migrate the **HealSense** mobile application from React Native (Expo) to **Flutter** with **Kotlin** for native Android integration.

## 1. Project Overview
HealSense is a real-time health monitoring app that tracks vital signs (Heart Rate, SpO2, Temperature, BP, Respiratory Rate), manages alerts, and provides emergency response features.

---

## 2. Technical Stack

- **Framework**: Flutter 3.x
- **Language**: Dart (UI & Logic), Kotlin (Native Android)
- **State Management**: Provider (Simpler migration from React Context/Zustand)
- **Networking**: Dio (Advanced HTTP client)
- **Local Storage**: `shared_preferences` & `flutter_secure_storage`
- **Navigation**: `go_router`
- **Native Integration**: Flutter Method Channels (Kotlin) for health sensor data.

---

## 3. Directory Structure (Lib)

```
lib/
├── core/
│   ├── constants/       # API endpoints, theme colors, strings
│   ├── network/         # Dio client, interceptors
│   ├── utils/           # Formatters, validators
│   └── theme/           # AppTheme (Light/Dark)
├── models/              # Data models (JSON serialization)
│   ├── vital_reading.dart
│   ├── patient_profile.dart
│   └── alert_model.dart
├── providers/           # Business logic & state management
│   ├── auth_provider.dart
│   ├── vitals_provider.dart
│   └── theme_provider.dart
├── services/            # API & Native services
│   ├── api_service.dart
│   └── sensor_service.dart
├── views/               # UI Screens
│   ├── auth/            # Login & Signup
│   ├── dashboard/       # Main vital monitoring
│   ├── profile/         # Patient details
│   └── alerts/          # Alert history
└── widgets/             # Reusable UI components
    ├── vital_card.dart
    ├── alert_banner.dart
    └── custom_button.dart
```

---

## 4. Implementation Phases

### Phase 1: Foundation (Current)
- [x] Create `pubspec.yaml` with required dependencies.
- [ ] Initialize Android project with Kotlin support.
- [ ] Set up `AppTheme` with HealSense branding (Teal/Emerald).

### Phase 2: Models & Networking
- Implement `VitalReading` model with `fromJson` and `toJson`.
- Configure `Dio` with a base URL: `http://10.10.86.33:5000/api/v1`.
- Create `ApiService` to handle:
    - `fetchLatestVitals(patientId)`
    - `fetchVitalHistory(patientId)`
    - `triggerEmergency(patientId)`

### Phase 3: State Management (Providers)
- **VitalsProvider**: 
    - Handles polling logic (5s interval).
    - Threshold checking (Normal vs Warning vs Critical).
    - Local alert state management.
- **AuthProvider**:
    - Manages JWT and user profile state.

### Phase 4: UI Reconstruction
- **Dashboard**: Use `GridView.count` for Vital Cards.
- **Real-time Charting**: Use `fl_chart` package to visualize heart rate trends (replacing React Native charts).
- **Emergency Action**: Floating Action Button with a confirmation dialog.

### Phase 5: Kotlin Native Integration
- Implement `MethodChannel` in `MainActivity.kt`.
- Access Android `SensorManager` via Kotlin for background data collection.
- Request permissions for `BODY_SENSORS` and `ACTIVITY_RECOGNITION`.

---

## 5. Mapping React Native Logic to Flutter

| RN Component/Hook | Flutter Replacement |
| :--- | :--- |
| `useVitals.ts` | `VitalsProvider.dart` |
| `useAuth.tsx` | `AuthProvider.dart` |
| `VitalCard.tsx` | `VitalCard` (StatelessWidget) |
| `DashboardScreen.tsx` | `DashboardView` (StatefulWidget) |
| `vitalsApi.submit` | `ApiService.postVitalReading` |

---

## 6. Vital Thresholds (Logic to Port)
Maintain consistency with `DEFAULT_THRESHOLDS` from the original project:
- **Heart Rate**: 60-100 bpm (Normal)
- **SpO2**: > 95% (Normal), < 90% (Critical)
- **Temperature**: 36.1-37.2°C (Normal)
- **BP**: 120/80 mmHg (Normal)

---

## 7. Next Immediate Actions
1. Run `flutter create` to generate the clean `android/` folder with Kotlin.
2. Build the `VitalReading` model class.
3. Implement the `VitalCard` widget for the UI foundation.
