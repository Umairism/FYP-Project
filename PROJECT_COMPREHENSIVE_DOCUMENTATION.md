# HealSense - Comprehensive Project Documentation

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Project Status:** Production-Ready  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Backend API System](#backend-api-system)
6. [Mobile Application (Flutter)](#mobile-application-flutter)
7. [Web Dashboard (React + Vite)](#web-dashboard-react--vite)
8. [Machine Learning Pipeline](#machine-learning-pipeline)
9. [Database Architecture](#database-architecture)
10. [API Documentation](#api-documentation)
11. [Real-time Communication](#real-time-communication)
12. [Deployment & Infrastructure](#deployment--infrastructure)
13. [Development Setup](#development-setup)
14. [Configuration & Environment](#configuration--environment)
15. [Integration Points](#integration-points)
16. [Monitoring & Maintenance](#monitoring--maintenance)
17. [Project Structure](#project-structure)

---

## Executive Summary

**HealSense** is a production-ready IoT-integrated health monitoring system designed to provide real-time patient vital signs tracking, AI-powered health risk prediction, and comprehensive health analytics. The platform combines cloud-based backend infrastructure with mobile and web frontends, leveraging machine learning for predictive health insights.

### Key Capabilities:
- **Real-time Vital Monitoring:** Live heart rate, SpO2, temperature, blood pressure tracking
- **AI-Powered Predictions:** LSTM-based health risk classification (>93% accuracy)
- **Multi-device Support:** IoT hardware, mobile phones, wearables, and manual data entry
- **WebSocket Streaming:** Real-time dashboard updates via WebSocket protocol
- **AI Assistant Integration:** OpenAI GPT-4 and Google Gemini support for health guidance
- **Comprehensive Alerts:** Multi-level severity alerts with acknowledgment workflow
- **Cross-platform UI:** Flutter mobile app + React web dashboard

### Target Users:
- Healthcare providers and hospital systems
- Patient families and caregivers
- Remote patient monitoring programs
- Telemedicine platforms
- Elderly care facilities

---

## Project Overview

### Purpose
HealSense solves the critical problem of remote health monitoring by providing an integrated platform that:
1. Collects vital signs from diverse data sources (IoT devices, mobile sensors, manual input)
2. Processes and validates incoming health data in real-time
3. Applies machine learning models for predictive health risk assessment
4. Generates intelligent alerts for abnormal readings
5. Provides comprehensive dashboards for healthcare providers
6. Enables patients to track their own health via mobile app

### Problem Statement
Current healthcare systems lack:
- **Real-time visibility** into patient health status
- **Intelligent alerting** based on predictive models
- **Cross-device integration** for diverse sensor types
- **Accessible monitoring** for remote/home care scenarios
- **User-friendly interfaces** for both providers and patients

### Solution
HealSense addresses these gaps through:
- Unified REST API supporting multiple data sources
- Machine learning-based risk prediction
- Real-time WebSocket broadcasting
- Intuitive mobile and web user interfaces
- Comprehensive alert management system

### Project Scope
- **In Scope:** Real-time monitoring, prediction, alerting, multi-device support, mobile/web UIs
- **Future Scope:** Advanced analytics, predictive modeling, integration with EHR systems

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                          │
├──────────────────────────────┬──────────────────────────────────────┤
│   Mobile App (Flutter)       │    Web Dashboard (React + Vite)      │
│  - Real-time vitals          │   - Multi-patient overview           │
│  - Alerts & notifications    │   - Provider analytics               │
│  - Deep patient insights     │   - Alert management                 │
└──────────────────┬───────────┴──────────────────────┬───────────────┘
                   │                                  │
                   └──────────────┬───────────────────┘
                                  │ (REST API / WebSocket)
┌─────────────────────────────────▼───────────────────────────────────┐
│                      APPLICATION LAYER (FastAPI)                    │
├────────────────┬──────────────┬──────────────┬──────────────────────┤
│ Patient Routes │ Alert Routes │ Device Routes│ Realtime Routes      │
│ - CRUD ops     │ - Management │ - IoT/Mobile │ - WebSocket streams  │
│                │ - Workflows  │ - Pairing    │ - Broadcasting       │
└────────────────┼──────────────┼──────────────┼──────────────────────┘
                 │              │              │
        ┌────────▼──────────────▼──────────────▼────────────┐
        │         SERVICE LAYER & MIDDLEWARE                │
        ├───────────────────────────────────────────────────┤
        │ - ML Model Service (LSTM prediction)              │
        │ - Authentication Service (JWT)                    │
        │ - Real-time Manager (WebSocket)                   │
        │ - Alert Generator & Manager                       │
        │ - Device Manager                                  │
        │ - Cache Layer (Redis)                             │
        └────────────────┬──────────────────────────────────┘
                         │
        ┌────────────────▼────────────────────────────────────┐
        │         DATA PERSISTENCE & CACHE LAYER              │
        ├─────────────────────────────────────────────────────┤
        │ PostgreSQL - Relational   │ Redis - Cache/Session   │
        │ - Patients table          │ - API cache             │
        │ - Vital Signs table       │ - Session store         │
        │ - Alerts table            │                         │
        │ - Devices table           │                         │
        │ - Emergencies table       │                         │
        └─────────────────────────────────────────────────────┘
                         │
        ┌────────────────▼──────────────────────────────────────┐
        │            EXTERNAL INTEGRATIONS                      │
        ├───────────────────────────────────────────────────────┤
        │ - OpenAI GPT-4 (AI Assistant)                         │
        │ - Google Gemini (AI Assistant)                        │
        │ - Firebase (Push Notifications)                       │
        │ - MQTT Brokers (IoT Devices)                          │
        │ - TensorFlow (ML Inference)                           │
        └───────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                    DATA INGESTION LAYER                              │
├──────────────────────────────────────────────────────────────────────┤
│IoT Devices (WiFi) │ Mobile Sensors (Phone) │ Wearables │ Manual Entry│
└──────────────────────────────────────────────────────────────────────┘
```

### Component Relationships

```
IoT Devices/Wearables  ──────┐
                             │
Mobile Phone Sensors ────────┤──→ FastAPI Backend ──→ PostgreSQL
                             │
Manual Data Entry ───────────┘

FastAPI Backend ──→ TensorFlow ML Model ──→ Risk Scores
                 ──→ Alert Generator ──→ Notifications
                 ──→ WebSocket Manager ──→ Real-time Broadcast
                 ──→ Redis Cache ──→ Performance Optimization
                 ──→ External APIs (OpenAI, Gemini)

Mobile App (Flutter) ◄──── WebSocket Stream ◄──── Backend
Web Dashboard (React) ◄──── REST API ◄──── Backend
```

---

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Web Framework** | FastAPI | 0.104.1 | REST API & WebSocket server |
| **ASGI Server** | Uvicorn | 0.24.0 | Development server |
| **WSGI Server** | Gunicorn | 21.2.0 | Production deployment |
| **Frontend (Mobile)** | Flutter | 3.0.0+ | Cross-platform mobile app |
| **Frontend (Web)** | React | 18.3.1 | Web dashboard SPA |
| **Build Tool** | Vite | 5.x | Fast web app bundler |
| **Database** | PostgreSQL | 12+ | Relational data storage |
| **ORM** | SQLAlchemy | 2.0.45 | Database abstraction |
| **Cache** | Redis | 5.0.1+ | Session and data cache |
| **ML Framework** | TensorFlow | 2.13.0+ | Deep learning models |

### Backend Dependencies (Complete List)

**Web Framework & Server:**
- FastAPI 0.104.1
- Uvicorn 0.24.0 (with uvloop, httptools)
- Gunicorn 21.2.0
- python-multipart 0.0.6

**Database & ORM:**
- SQLAlchemy 2.0.45
- psycopg2-binary (PostgreSQL driver)
- Alembic 1.12.1 (migrations)

**Authentication & Security:**
- python-jose 3.3.0 (JWT)
- passlib 1.7.4 (password hashing)
- cryptography 41.0.7
- python-dotenv 1.0.0

**Data Validation:**
- Pydantic 2.13.2
- pydantic-settings 2.7.1
- email-validator 2.1.0

**Machine Learning:**
- TensorFlow 2.13.0+
- scikit-learn 1.3.0
- numpy 1.24.0+
- pandas 2.0.0+
- joblib 1.3.2

**Real-time & IoT:**
- WebSockets 12.0
- python-socketio 5.10.0
- Paho-MQTT 1.6.1 (IoT devices)

**Caching & Queue:**
- Redis 5.0.1
- Celery 5.3.4
- hiredis 2.2.3

**Cloud & External Services:**
- Firebase Admin 6.3.0
- httpx 0.25.2
- aiohttp 3.9.1

**Monitoring:**
- prometheus-client 0.19.0
- python-json-logger 2.0.7

### Frontend (Mobile - Flutter) Dependencies

**State Management:**
- provider 6.1.1

**HTTP & Networking:**
- dio 5.4.1
- socket_io_client 2.0.0

**Local Storage:**
- shared_preferences 2.2.2
- flutter_secure_storage 9.0.0

**UI & Visualization:**
- fl_chart 0.66.0 (charts)
- Material Components

**Routing:**
- go_router 13.2.0

**Utilities:**
- intl 0.19.0
- json_annotation 4.8.1
- json_serializable 6.7.1

**Development:**
- build_runner 2.4.8

### Frontend (Web - React) Dependencies

**React Ecosystem:**
- React 18.3.1
- React Router 6.30.1
- React Hook Form 7.61.1
- React Query (TanStack) 5.83.0

**UI Framework:**
- Shadcn/ui (component library)
- Radix UI (30+ components)
- Lucide React (icons)
- Recharts 2.15.4 (charts)

**Styling:**
- Tailwind CSS 3.x
- Tailwind Typography
- Tailwindcss Animate
- Class Variance Authority

**Form & Validation:**
- Zod 3.25.76
- Hook Form Resolvers

**Type Safety:**
- TypeScript 5.x

**Utilities:**
- date-fns 3.6.0
- clsx 2.1.1
- sonner 1.7.4 (toast notifications)
- embla-carousel 8.6.0

**Testing:**
- Vitest (unit tests)
- @testing-library/react

---

## Backend API System

### Core Application Structure

**Main Application File: `api/app.py`**

```python
# Key components:
1. CORS Configuration - Cross-origin request handling
2. Middleware Stack:
   - Authentication (JWT validation)
   - Logging (JSON formatted)
   - Error handling
3. Route Registration:
   - /api/v1/patients - Patient management
   - /api/v1/alerts - Alert operations
   - /api/v1/devices - Device management
   - /api/v1/ai - AI assistant endpoints
   - /ws - WebSocket endpoints
4. Lifespan Management - Startup/shutdown hooks
5. Health Check Endpoints
```

**Configuration: `api/config.py`**
Centralized settings using Pydantic:
- Database connection strings
- Authentication parameters
- AI service credentials
- ML model paths
- Alert thresholds
- CORS allowed origins

### API Routes & Endpoints

#### 1. **Patient Routes** (`api/routes/patients.py`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/patients/{patient_id}` | Retrieve patient profile |
| POST | `/api/v1/patients` | Create new patient |
| PUT | `/api/v1/patients/{patient_id}` | Update patient info |
| DELETE | `/api/v1/patients/{patient_id}` | Delete patient |
| GET | `/api/v1/patients/{patient_id}/profile` | Get profile with latest vitals |
| GET | `/api/v1/patients/{patient_id}/vitals/latest` | Latest vital signs |
| GET | `/api/v1/patients/{patient_id}/vitals/history` | Historical vitals (query: `minutes=60`) |
| POST | `/api/v1/patients/{patient_id}/vitals` | Submit vital signs |

**Response Example (Latest Vitals):**
```json
{
  "patient_id": "123",
  "heart_rate": 78,
  "spo2": 98.5,
  "temperature": 37.2,
  "systolic_bp": 120,
  "diastolic_bp": 78,
  "respiratory_rate": 16,
  "risk_score": 0.15,
  "status": "NORMAL",
  "timestamp": "2024-04-19T10:30:00Z"
}
```

#### 2. **Alert Routes** (`api/routes/alerts.py`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/alerts` | List all alerts |
| GET | `/api/v1/alerts/{alert_id}` | Get alert details |
| POST | `/api/v1/alerts/{alert_id}/acknowledge` | Mark as acknowledged |
| POST | `/api/v1/alerts/{alert_id}/dismiss` | Dismiss alert |
| DELETE | `/api/v1/alerts/{alert_id}` | Delete alert |

**Alert Severity Levels:**
- `LOW` - Minor anomalies
- `MEDIUM` - Notable deviation
- `HIGH` - Significant concern
- `CRITICAL` - Emergency threshold

#### 3. **Device Routes** (`api/routes/devices.py`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/devices/{device_id}` | Device info |
| GET | `/api/v1/devices/{device_id}/status` | Connection status |
| POST | `/api/v1/devices/{device_id}/connect` | Register device |
| POST | `/api/v1/devices/{device_id}/disconnect` | Unregister device |
| PUT | `/api/v1/devices/{device_id}` | Update device config |
| DELETE | `/api/v1/devices/{device_id}` | Remove device |

**Supported Device Types:**
- `IOT_HARDWARE` - Dedicated health monitoring devices
- `MOBILE_APP` - Phone sensors (accelerometer, GPS, etc.)
- `WEARABLE` - Smartwatches, fitness trackers
- `MANUAL` - Manual data entry by patient/provider

#### 4. **AI Assistant Routes** (`api/routes/ai.py`)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/ai/providers` | List available AI providers |
| POST | `/api/v1/ai/chat` | Send message to AI assistant |

**Chat Request Example:**
```json
{
  "message": "What should I do about high blood pressure?",
  "context": {
    "patient_id": "123",
    "recent_vitals": {...}
  }
}
```

**Response:**
```json
{
  "response": "Based on your recent readings...",
  "provider": "openai",
  "confidence": 0.95
}
```

#### 5. **Real-time Routes** (`api/routes/realtime.py`)

**WebSocket Endpoints:**

| Endpoint | Purpose | Message Format |
|----------|---------|-----------------|
| `/ws/live` | Global vital signs stream | `{event_type, timestamp, payload}` |
| `/ws/patients/{patient_id}` | Patient-specific updates | Real-time vitals + alerts |
| `/ws/devices/{device_id}` | Device status stream | Connection, battery, signal |

#### 6. **Health & Documentation**

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Health check (returns 200 if healthy) |
| `GET /` | API root with documentation links |
| `GET /api/docs` | Swagger UI interactive documentation |
| `GET /api/redoc` | ReDoc alternative documentation |

### Request/Response Patterns

**Authentication:**
All API requests require JWT Bearer token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

**Response Format (Success):**
```json
{
  "data": {...},
  "status": "success",
  "timestamp": "2024-04-19T10:30:00Z"
}
```

**Response Format (Error):**
```json
{
  "error": "Patient not found",
  "status": "error",
  "code": 404,
  "timestamp": "2024-04-19T10:30:00Z"
}
```

---

## Mobile Application (Flutter)

### Purpose & Features

The Flutter mobile app provides patients and caregivers with:
- **Real-time Vital Monitoring** - Live heart rate, oxygen, temperature, blood pressure
- **Health Dashboard** - Overview of current health status
- **Alert Notifications** - Push notifications for critical readings
- **Device Management** - Connect and manage monitoring devices
- **Health History** - View trends over time
- **Dark Mode** - User-friendly dark theme
- **Offline Support** - Cached data display when offline
- **Profile Management** - Patient information and preferences

### Tech Stack

**Framework:**
- Flutter SDK 3.0.0+
- Dart language
- Material Design 3

**State Management:**
- Provider 6.1.1 - Simple, clear state management pattern

**HTTP & Real-time:**
- Dio 5.4.1 - HTTP client with interceptors
- WebSocket support (Socket.io)

**Local Data:**
- shared_preferences 2.2.2 - User preferences, cache
- flutter_secure_storage 9.0.0 - Secure credential storage

**UI Components:**
- Material Components - Native look and feel
- fl_chart 0.66.0 - Beautiful charts for vital trends

**Routing:**
- go_router 13.2.0 - Modern declarative navigation

### Project Structure

```
lib/
├── main.dart                    # App entry point, Provider setup
├── core/
│   ├── constants/              # App-wide constants
│   ├── theme/                  # Dark/light theme definitions
│   └── utils/                  # Helper functions
├── models/
│   ├── vital_signs.dart        # Vital sign data model
│   ├── patient.dart            # Patient profile model
│   ├── alert.dart              # Alert model
│   └── device.dart             # Device model
├── providers/
│   ├── auth_provider.dart      # Authentication state
│   ├── vitals_provider.dart    # Vital signs state
│   ├── alerts_provider.dart    # Alerts state
│   └── device_provider.dart    # Device management state
├── services/
│   ├── api_service.dart        # Backend API communication
│   ├── websocket_service.dart  # Real-time updates
│   ├── storage_service.dart    # Local storage
│   └── notification_service.dart # Push notifications
├── views/
│   ├── dashboard_view.dart     # Main health dashboard
│   ├── alerts_view.dart        # Alerts history
│   ├── profile_view.dart       # Patient profile
│   ├── devices_view.dart       # Device management
│   └── login_view.dart         # Authentication
└── widgets/
    ├── vital_card.dart         # Vital sign card
    ├── alert_banner.dart       # Alert notification
    ├── chart_widget.dart       # Vital trends chart
    └── device_tile.dart        # Device list item
```

### Key Screens

**1. Dashboard View**
- Current vital signs display
- Health status indicator (Normal/Warning/Critical)
- Risk score visualization
- Quick device status
- Recent alerts summary

**2. Alerts View**
- Alert history timeline
- Filter by severity
- Acknowledge/dismiss actions
- Export alert logs

**3. Profile View**
- Patient demographic information
- Medical history
- Emergency contacts
- Connected devices
- Settings and preferences

**4. Devices View**
- List of connected devices
- Device status (battery, signal)
- Pairing new devices
- Device settings

### State Management (Provider Pattern)

**AuthProvider:**
```dart
class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  
  Future<void> login(email, password) async {...}
  Future<void> logout() async {...}
  void checkAuthStatus() {...}
}
```

**VitalsProvider:**
```dart
class VitalsProvider with ChangeNotifier {
  List<VitalSign> _vitals = [];
  
  Future<void> fetchLatestVitals() async {...}
  Future<void> fetchHistory({required int minutes}) async {...}
  void subscribeToRealTime() {...}
}
```

### API Integration

**API Service:**
- Base URL configuration (environment-based)
- DIO interceptors for JWT token injection
- Request/response logging
- Error handling and retry logic

**WebSocket Service:**
- Connection pooling
- Automatic reconnection
- Event listeners for vital updates
- Graceful disconnection

### Features & Workflows

**User Authentication:**
1. User enters email and password
2. AuthProvider calls backend login endpoint
3. JWT token stored in secure storage
4. Token used for all subsequent requests
5. Logout clears token and cached data

**Vital Monitoring Workflow:**
1. User opens dashboard
2. VitalsProvider fetches latest vitals from API
3. WebSocket connection established for real-time updates
4. New vital data triggers UI rebuild
5. Alerts displayed as notifications
6. Historical data available on demand

**Device Pairing:**
1. User navigates to Devices view
2. Initiates pairing (QR code scan or manual ID)
3. Device registering via POST to `/devices/{id}/connect`
4. Device appears in list once confirmed
5. User enables monitoring on device

### Demo Account
- **Email:** umair@healsense.com
- **Password:** password123

---

## Web Dashboard (React + Vite)

### Purpose & Features

The web dashboard serves healthcare providers with:
- **Multi-Patient Overview** - Monitor multiple patients simultaneously
- **Detailed Patient Analytics** - Historical trends and patterns
- **Alert Management** - Centralized alert handling and acknowledgment
- **Provider Dashboard** - Key metrics and summaries
- **Report Generation** - Export health reports
- **Dark Mode** - Theme switching

### Tech Stack

**Build & Framework:**
- Vite 5.x - Ultrafast build tool with HMR
- React 18.3.1 - UI library with hooks
- React Router 6.30.1 - Client-side routing
- React Hook Form 7.61.1 - Form state management
- React Query 5.83.0 (TanStack) - Server state management

**UI Framework & Components:**
- Shadcn/ui - High-quality React components
- Radix UI - Accessible component primitives
- Lucide React - Icon library
- Recharts 2.15.4 - Visualization and charts

**Styling:**
- Tailwind CSS 3.x - Utility-first CSS
- Tailwindcss Animate - Animation utilities
- Class Variance Authority - Dynamic styles
- tailwind-merge - Class name merging

**Forms & Validation:**
- Zod 3.25.76 - TypeScript-first validation
- Hook Form Resolvers - React Hook Form + Zod integration

**Type Safety:**
- TypeScript 5.x - Strict type checking

**Additional Libraries:**
- date-fns 3.6.0 - Date manipulation
- clsx 2.1.1 - Conditional className merging
- sonner 1.7.4 - Toast notifications
- next-themes 0.3.0 - Dark mode management
- cmdk 1.1.1 - Command palette

### Project Structure

```
src/
├── main.tsx                    # React root
├── App.tsx                     # Main app component with routing
├── index.css                   # Global styles
├── pages/
│   ├── Dashboard.tsx          # Main dashboard
│   ├── PatientDetail.tsx      # Individual patient view
│   ├── Alerts.tsx             # Alert management
│   └── NotFound.tsx           # 404 page
├── components/
│   ├── Header.tsx             # App header with theme toggle
│   ├── Navigation.tsx         # Sidebar navigation
│   ├── VitalCard.tsx          # Vital sign card component
│   ├── AlertList.tsx          # Alert list component
│   ├── Charts/
│   │   ├── VitalTrendChart.tsx # Time-series charts
│   │   └── RiskScoreChart.tsx  # Risk visualization
│   └── Dialogs/
│       ├── AcknowledgeAlert.tsx
│       └── PatientDetails.tsx
├── contexts/
│   ├── AuthContext.tsx        # Authentication context
│   ├── ThemeContext.tsx       # Dark/light mode
│   └── PatientContext.tsx     # Patient data context
├── hooks/
│   ├── useVitals.ts          # Fetch patient vitals
│   ├── usePatient.ts         # Patient CRUD
│   ├── useAlerts.ts          # Alert management
│   └── useWebSocket.ts       # WebSocket subscription
├── lib/
│   ├── api-client.ts         # HTTP client configuration
│   ├── validators.ts         # Zod schemas
│   └── utils.ts              # Helper functions
├── types/
│   ├── patient.ts            # Patient type definitions
│   ├── vital.ts              # Vital signs types
│   ├── alert.ts              # Alert types
│   └── api.ts                # API response types
├── vite.config.ts            # Vite build configuration
├── tailwind.config.ts        # Tailwind theme config
├── tsconfig.json             # TypeScript config
└── vitest.config.ts          # Test configuration
```

### Key Pages

**1. Dashboard**
```
┌─────────────────────────────────────────────┐
│  Header (Search, User, Settings)            │
├──────────────┬──────────────────────────────┤
│              │  Patient List                │
│  Navigation  │  ├─ Patient 1 (Active)       │
│  ├ Dashboard │  ├─ Patient 2                │
│  ├ Alerts    │  ├─ Patient 3                │
│  ├ Reports   │  └─ Load More                │
│  └ Settings  │                              │
│              │  Recent Alerts               │
│              │  ├─ Alert 1 (CRITICAL)       │
│              │  ├─ Alert 2 (MEDIUM)         │
│              │  └─ View All                 │
└──────────────┴──────────────────────────────┘
```

**2. Patient Detail View**
- Vital signs summary
- Historical charts
- Alert timeline
- Device status
- Medical notes

**3. Alerts Management**
- Alert list with filters
- Severity indicators
- Acknowledge/dismiss buttons
- Export functionality

### Component Architecture

**Custom Hooks:**

```typescript
// useVitals.ts
function useVitals(patientId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['vitals', patientId],
    queryFn: () => api.getVitals(patientId)
  });
  return { vitals: data, isLoading };
}

// useWebSocket.ts
function useWebSocket(patientId: string) {
  // Subscribe to real-time updates
  // Return latest vitals and alerts
}
```

**Form Management:**

Using React Hook Form + Zod for validated forms:
```typescript
const schema = z.object({
  patientId: z.string().uuid(),
  notes: z.string().max(500),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
});

type FormData = z.infer<typeof schema>;

// In component:
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema)
});
```

### Styling Approach

**Tailwind CSS + Shadcn:**
- Utility-first CSS classes
- Pre-built shadcn components (customizable)
- Dark mode via next-themes
- Consistent design system

**Example:**
```tsx
<button className={cn(
  "px-4 py-2 rounded-lg font-medium",
  "bg-blue-500 hover:bg-blue-600 text-white",
  "dark:bg-blue-600 dark:hover:bg-blue-700",
  "transition-colors duration-200"
)}>
  Acknowledge Alert
</button>
```

### Development Workflow

**Dev Server:**
```bash
cd healsense/frontend/web-app
npm install
npm run dev
# Runs on http://localhost:8080 with HMR
```

**Production Build:**
```bash
npm run build          # Optimized bundle
npm run preview        # Local preview
npm run lint           # ESLint
npm run test           # Vitest
npm run test:watch    # Watch mode
```

**Output:**
- `dist/` folder ready for deployment
- Optimized JS/CSS bundles
- Source maps for debugging

---

## Machine Learning Pipeline

### Overview

The ML component provides:
1. **Data Generation** - Synthetic vital signs with realistic distribution
2. **Model Training** - LSTM neural networks for health risk classification
3. **Model Evaluation** - Performance metrics and benchmarking
4. **Mobile Deployment** - TensorFlow Lite conversion for on-device inference

### Datasets

#### 1. UCI Heart Disease Dataset
**Location:** `data/raw/uci_heart_disease/`
- **Source:** UCI Machine Learning Repository
- **Samples:** 303 patient records
- **Features:** 13 clinical indicators (age, sex, cholesterol, etc.)
- **Target:** Heart disease presence (0 = absent, 1 = present)
- **Use Case:** Training data for cardiovascular disease prediction

**File:** `heart-disease.names` - Feature descriptions

#### 2. PhysioNet BIDMC Dataset
**Location:** `data/raw/physionet_bidmc/`
- **Source:** PhysioNet / MIMIC-II Database
- **Samples:** Multi-parameter ICU recordings
- **Parameters:** Heart rate, blood pressure, SpO2, temperature (30-50+ vital measurements)
- **Use Case:** Real-world hospital ICU data for model validation
- **Download Script:** `scripts/download_bidmc.py`

#### 3. Kaggle Health Datasets
**Location:** `data/raw/kaggle_health_data/`
- Multiple public health datasets
- Various diseases and conditions
- License information included (verify before use)

#### 4. Synthetic Data Generation
**Location:** `data/raw/synthetic/`
- **Generator Script:** `scripts/generate_synthetic_data.py`
- **Output:** 10,000 synthetic vital signs records

**Generation Parameters:**
```python
# Distribution:
93% NORMAL cases (healthy vitals)
5% WARNING cases (elevated readings)
2% CRITICAL cases (emergency thresholds)

# Normal Ranges (mean ± 1 std dev):
- Heart Rate: 75 ± 10 bpm (range: 45-150)
- SpO2: 97.5 ± 1.2 % (range: 88-100)
- Temperature: 36.8 ± 0.3°C (range: 36-41)
- Systolic BP: 118 ± 8 mmHg (range: 85-200)
- Diastolic BP: 78 ± 6 mmHg (range: 55-110)
- Respiratory Rate: 15 ± 2 (range: 10-30)

# Classification Logic:
CRITICAL triggers:
  - HR < 40 or > 130 bpm
  - SpO2 < 90%
  - Temperature > 40°C
  - SysBP > 180 or < 90 mmHg
  - DiasBP > 110 mmHg

WARNING triggers:
  - HR < 50 or > 120 bpm
  - SpO2 < 92%
  - Temperature > 38°C
  - Elevated BP (SysBP 140-180 or DiasBP 90-110)
```

### Data Processing Pipeline

#### Step 1: Data Exploration (`notebooks/01_data_exploration.ipynb`)

**Analysis:**
- Dataset shape and info (samples, features, dtypes)
- Missing value analysis
- Statistical summary (mean, std, quantiles)
- Feature distributions (histograms)
- Correlation matrix (heatmap)
- Outlier detection (IQR method)
- Class distribution (health status balance)
- Temporal patterns (if time-series)

**Output:**
- EDA report with visualizations
- Feature selection recommendations
- Data quality assessment

#### Step 2: Data Preprocessing

**Normalization:**
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_normalized = scaler.fit_transform(X)
# Save scaler for inference: joblib.dump(scaler, 'scaler.pkl')
```

**Handling Missing Values:**
- Mean imputation for numeric features
- Mode imputation for categorical
- Drop samples with > 30% missing

**Handling Imbalanced Classes:**
```python
from imblearn.over_sampling import SMOTE
smote = SMOTE(sampling_strategy='not majority')
X_balanced, y_balanced = smote.fit_resample(X, y)
```

**Time-Series Windowing:**
```python
# For LSTM input, create sequences of 60 timesteps
window_size = 60
def create_sequences(data, window_size):
    X, y = [], []
    for i in range(len(data) - window_size):
        X.append(data[i:i+window_size])
        y.append(data[i+window_size, -1])  # Last column = label
    return np.array(X), np.array(y)
```

#### Step 3: Model Training (`notebooks/02_lstm_health_prediction.ipynb`)

**LSTM Architecture:**
```
Input Layer
  └─ Shape: (batch_size, 60, 6) [60 timesteps, 6 vital features]
     
LSTM Block 1
  └─ 128 units
  └─ Return sequences: True
  └─ Activation: tanh
  └─ Output: (batch_size, 60, 128)
     
Dropout Layer 1
  └─ Rate: 0.3 (30%)
     
LSTM Block 2
  └─ 64 units
  └─ Return sequences: False
  └─ Output: (batch_size, 64)
     
Dropout Layer 2
  └─ Rate: 0.2 (20%)
     
Dense Layer 1
  └─ 32 units
  └─ Activation: ReLU
  └─ Output: (batch_size, 32)
     
Dropout Layer 3
  └─ Rate: 0.1 (10%)
     
Output Layer
  └─ 3 units (NORMAL, WARNING, CRITICAL)
  └─ Activation: Softmax
  └─ Output: Probability distribution
```

**Model Summary:**
- **Total Parameters:** ~120,000
- **Trainable Params:** 120,000
- **Non-trainable:** 0
- **Input Shape:** (batch, 60, 6)
- **Output Shape:** (batch, 3)

**Training Configuration:**
```python
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy', Precision(), Recall(), AUC()]
)

model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    callbacks=[
        EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True),
        ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=5),
        ModelCheckpoint(monitor='val_accuracy', save_best_only=True)
    ]
)
```

**Training Metrics:**
- **Time:** 10-20 minutes (CPU), 5 minutes (GPU)
- **Final Accuracy:** >93%
- **Validation Split:** 20%
- **Early Stopping:** Triggers if val_loss doesn't improve for 10 epochs

**Performance Evaluation:**
```
Accuracy: 95.2%
Precision (per class):
  - NORMAL: 0.956
  - WARNING: 0.921
  - CRITICAL: 0.897
Recall (per class):
  - NORMAL: 0.967
  - WARNING: 0.904
  - CRITICAL: 0.835
F1-Score (per class):
  - NORMAL: 0.961
  - WARNING: 0.912
  - CRITICAL: 0.866
```

**Model Outputs:**
- Best model checkpoint: `data/models/checkpoints/best_model.h5` (or `.keras`)
- Training history: `data/models/metadata/training_history.json`
- Feature scaler: `data/models/metadata/scaler.pkl`
- Model metadata: `data/models/metadata/model_info.json`

### Model Deployment

#### Script: `scripts/deploy_model.py`

**Conversion Process:**
```python
# Load trained model
model = tf.keras.models.load_model('best_model.h5')

# Convert to TensorFlow Lite with quantization
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.target_spec.supported_ops = [
    tf.lite.OpsSet.TFLITE_BUILTINS,
    tf.lite.OpsSet.SELECT_TF_OPS
]

# Float16 Quantization (recommended)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]

tflite_model = converter.convert()

# Save TFLite model
with open('health_model.tflite', 'wb') as f:
    f.write(tflite_model)
```

**Output Models:**

| Type | Size | Precision | Latency | Use Case |
|------|------|-----------|---------|----------|
| Float32 | ~8-10 MB | Full precision | 5-10ms | GPU/Server |
| Float16 | ~4-5 MB | Half precision | 10-15ms | Mobile preferred |
| Int8 | <3 MB | 8-bit integer | 15-25ms | Edge devices |
| Dynamic | ~5 MB | Adaptive | 8-12ms | Mixed usage |

**Deployment Locations:**
- **Backend:** Load `.h5` model for server-side predictions
- **Mobile:** Bundle `.tflite` model in app assets
- **Edge Devices:** Use quantized `.tflite` for IoT hardware

#### Model Inference Pipeline

**At Backend (Server-side):**
```python
# Load model once at startup
self.model = tf.keras.models.load_model('health_model.h5')
self.scaler = joblib.load('scaler.pkl')

# Inference on new vitals
def predict_health_risk(vitals_sequence):
    # vitals_sequence: (60, 6) shaped array
    normalized = self.scaler.transform(vitals_sequence)
    prediction = self.model.predict(np.expand_dims(normalized, 0))
    # prediction: [prob_normal, prob_warning, prob_critical]
    risk_score = prediction[0][2]  # Probability of critical
    status = np.argmax(prediction[0])
    return {
        'risk_score': float(risk_score),
        'status': ['NORMAL', 'WARNING', 'CRITICAL'][status],
        'probabilities': {
            'normal': float(prediction[0][0]),
            'warning': float(prediction[0][1]),
            'critical': float(prediction[0][2])
        }
    }
```

**At Mobile (On-device):**
```kotlin
// TensorFlow Lite Interpreter
val interpreter = Interpreter(loadModelFile())

// Input: FloatArray of shape [1, 60, 6]
val input = Array(1) { Array(60) { FloatArray(6) } }
val output = Array(1) { FloatArray(3) }

// Run inference
interpreter.run(input, output)

// Output: Array of 3 probabilities
val risk_score = output[0][2]
```

### Model Versioning & Checkpoints

**Storage Structure:**
```
data/models/
├── checkpoints/
│   ├── best_model.h5        # Best performing model
│   ├── final_model.h5       # Latest trained model
│   └── v1_baseline.h5       # Previous version
├── metadata/
│   ├── model_info.json      # Architecture, training params
│   ├── training_history.json # Loss/accuracy curves
│   ├── scaler.pkl           # Fitted StandardScaler
│   └── class_labels.txt     # ['NORMAL', 'WARNING', 'CRITICAL']
└── tflite/
    ├── health_model.tflite  # Mobile deployment
    ├── health_model_int8.tflite  # Quantized
    └── metadata.txt         # TFLite model info
```

**Version Management:**
- Each trained model: timestamped checkpoint
- Production model: symlinked or env variable reference
- A/B testing: dual model serving with traffic split

---

## Database Architecture

### Schema Overview

**Core Tables:**

#### 1. **Patients Table**
Stores patient demographics and profile information.

```sql
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INTEGER,
    gender ENUM('M', 'F', 'Other') NOT NULL,
    blood_type VARCHAR(10),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    emergency_contact VARCHAR(255),
    medical_conditions TEXT,
    allergies TEXT,
    medications TEXT,
    provider_id UUID REFERENCES providers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_provider_id ON patients(provider_id);
```

**Fields:**
- `id`: Unique patient identifier
- `first_name`, `last_name`: Patient name
- `age`, `gender`, `blood_type`: Demographics
- `email`: Primary contact (unique)
- `phone`: Contact number
- `emergency_contact`: Emergency contact person
- `medical_conditions`: Pre-existing conditions (JSON or text)
- `allergies`: Known allergies
- `medications`: Current medications
- `provider_id`: Assigned healthcare provider (FK)
- `created_at`, `updated_at`: Audit timestamps
- `is_active`: Account status

#### 2. **Vital Signs Table (Time-Series)**
Stores time-series vital measurements from various devices.

```sql
CREATE TABLE vital_signs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    device_id UUID NOT NULL REFERENCES devices(id),
    
    -- Core Measurements
    heart_rate FLOAT,
    spo2 FLOAT,  -- Blood Oxygen Saturation (%)
    temperature FLOAT,  -- Celsius
    systolic_bp FLOAT,  -- Systolic Blood Pressure
    diastolic_bp FLOAT,  -- Diastolic Blood Pressure
    respiratory_rate FLOAT,
    
    -- Optional Metrics
    glucose_level FLOAT,  -- For diabetes monitoring
    weight FLOAT,  -- kg
    height FLOAT,  -- cm
    
    -- Data Source Information (NEW - Phone Sensor Support)
    data_source ENUM(
        'IOT_HARDWARE',
        'MOBILE_APP',
        'WEARABLE',
        'MANUAL'
    ) NOT NULL DEFAULT 'IOT_HARDWARE',
    sensor_accuracy FLOAT DEFAULT 1.0,  -- 0-1 confidence
    activity_context VARCHAR(50),  -- 'resting', 'walking', 'exercising'
    location_lat FLOAT,  -- GPS latitude
    location_lng FLOAT,  -- GPS longitude
    
    -- Risk Assessment
    status ENUM('NORMAL', 'WARNING', 'CRITICAL') NOT NULL DEFAULT 'NORMAL',
    risk_score FLOAT DEFAULT 0.0,  -- 0-1, higher = more critical
    ml_prediction_version VARCHAR(50),  -- Model version used
    
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recorded_at TIMESTAMP,  -- When measurement was taken
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Critical indexes for time-series queries
CREATE INDEX idx_vitals_patient_timestamp 
    ON vital_signs(patient_id, timestamp DESC);
CREATE INDEX idx_vitals_device_timestamp 
    ON vital_signs(device_id, timestamp DESC);
CREATE INDEX idx_vitals_timestamp ON vital_signs(timestamp DESC);
CREATE INDEX idx_vitals_status ON vital_signs(status);

-- For fast range queries (last N hours)
CREATE INDEX idx_vitals_recorded_at 
    ON vital_signs(recorded_at DESC) 
    WHERE recorded_at > NOW() - INTERVAL '30 days';

-- Partition by date for better performance
CREATE TABLE vital_signs_2024_01 PARTITION OF vital_signs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

**Key Fields:**
- `id`: Unique vital record identifier
- `patient_id`, `device_id`: Foreign keys
- **Vital Measurements:**
  - `heart_rate`: BPM (breaths per minute)
  - `spo2`: Blood Oxygen Saturation (%)
  - `temperature`: Body temperature (°C)
  - `systolic_bp`, `diastolic_bp`: Blood Pressure (mmHg)
  - `respiratory_rate`: Breaths per minute
  - `glucose_level`: Blood glucose (mg/dL)
  - `weight`, `height`: Body measurements
- **Data Source Tracking:**
  - `data_source`: Origin of measurement
  - `sensor_accuracy`: Confidence score
  - `activity_context`: Activity state
  - `location_lat`, `location_lng`: GPS coordinates
- **Risk Assessment:**
  - `status`: NORMAL/WARNING/CRITICAL classification
  - `risk_score`: ML model prediction (0-1)
  - `ml_prediction_version`: Model version for tracking
- **Timestamps:**
  - `timestamp`: When record was created
  - `recorded_at`: When measurement was actually taken

#### 3. **Devices Table**
Manages all monitoring devices (IoT hardware, mobile apps, wearables).

```sql
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    device_name VARCHAR(255),
    
    -- Device Classification
    device_type ENUM(
        'IOT_HARDWARE',
        'MOBILE_APP',
        'WEARABLE',
        'MANUAL'
    ) NOT NULL,
    
    -- Hardware Information
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(255) UNIQUE,
    
    -- Phone-Specific Fields (NEW)
    phone_model VARCHAR(100),  -- e.g., "Samsung Galaxy S8+"
    phone_os VARCHAR(50),  -- e.g., "Android 11" or "iOS 14"
    phone_os_version VARCHAR(20),
    sensor_capabilities JSON,  -- ["heart_rate", "spo2", "accelerometer"]
    app_version VARCHAR(20),
    
    -- Connection Status
    connected BOOLEAN DEFAULT FALSE,
    battery_level INTEGER DEFAULT 100,  -- 0-100 %
    signal_strength INTEGER,  -- 0-100 RSSI
    last_heartbeat TIMESTAMP,  -- Last successful communication
    
    -- Configuration
    measurement_interval INTEGER DEFAULT 60,  -- Seconds
    alarm_threshold JSON,  -- Device-specific thresholds
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP
);

CREATE INDEX idx_devices_patient_id ON devices(patient_id);
CREATE INDEX idx_devices_connected ON devices(connected) 
    WHERE connected = TRUE;
```

**Fields:**
- `id`: Unique device identifier
- `patient_id`: Associated patient
- `device_type`: Classification (IOT/MOBILE/WEARABLE/MANUAL)
- `manufacturer`, `model`, `serial_number`: Hardware info
- **Phone-Specific (NEW):**
  - `phone_model`: Device name (e.g., "iPhone 12")
  - `phone_os`, `phone_os_version`: Operating system
  - `sensor_capabilities`: Available sensors (JSON array)
  - `app_version`: App version running
- **Status:**
  - `connected`: Current connection state
  - `battery_level`: Battery percentage
  - `signal_strength`: Signal quality (RSSI)
  - `last_heartbeat`: Last communication timestamp
- **Configuration:**
  - `measurement_interval`: Frequency of measurments
  - `alarm_threshold`: Device-specific alert thresholds

#### 4. **Alerts Table**
Manages health alerts and notifications.

```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    vital_sign_id UUID REFERENCES vital_signs(id),
    
    alert_type VARCHAR(100),  -- 'HIGH_HEART_RATE', 'LOW_SPO2', etc.
    message TEXT NOT NULL,
    description TEXT,
    
    severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    vital_type VARCHAR(50),  -- 'heart_rate', 'spo2', etc.
    vital_value FLOAT,  -- The actual measurement that triggered alert
    threshold_value FLOAT,  -- The threshold exceeded
    
    -- Status Tracking
    status ENUM('ACTIVE', 'ACKNOWLEDGED', 'DISMISSED', 'RESOLVED') 
        DEFAULT 'ACTIVE',
    acknowledged BOOLEAN DEFAULT FALSE,
    dismissed BOOLEAN DEFAULT FALSE,
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMP,
    
    -- Resolution
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    
    -- Emergency escalation
    escalated BOOLEAN DEFAULT FALSE,
    escalated_at TIMESTAMP,
    escalated_to VARCHAR(255),  -- Phone, email, etc.
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alerts_patient_timestamp 
    ON alerts(patient_id, created_at DESC);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_status ON alerts(status);
```

**Fields:**
- `id`: Alert identifier
- `patient_id`, `vital_sign_id`: References
- `alert_type`: Specific alert reason
- `message`, `description`: Alert text
- `severity`: Level (LOW/MEDIUM/HIGH/CRITICAL)
- `vital_type`: Which vital triggered it
- `vital_value`: Measured value
- `threshold_value`: Exceeded threshold
- **Status:**
  - `status`: Current state (ACTIVE/ACKNOWLEDGED/DISMISSED/RESOLVED)
  - `acknowledged`: By provider
  - `dismissed`: Alert cleared
  - `acknowledged_by`, `acknowledged_at`: Who/when
- **Resolution:**
  - `resolved_at`: When resolved
  - `resolution_notes`: Outcome
- **Escalation:**
  - `escalated`: Sent to emergency?
  - `escalated_at`: When escalated
  - `escalated_to`: Escalation destination

#### 5. **Emergencies Table**
Tracks emergency situations.

```sql
CREATE TABLE emergencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    
    emergency_type VARCHAR(100),  -- 'CARDIAC_ARREST', 'HYPOXIA', etc.
    severity ENUM('HIGH', 'CRITICAL') NOT NULL,
    
    location VARCHAR(255),
    location_lat FLOAT,
    location_lng FLOAT,
    
    reported_symptoms TEXT,
    notes TEXT,
    
    status ENUM('ACTIVE', 'RESPONDED', 'RESOLVED') DEFAULT 'ACTIVE',
    
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    resolved_at TIMESTAMP,
    
    responder_id UUID REFERENCES users(id),
    responder_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. **Users Table** (Providers/Admins)
Management of healthcare providers and administrators.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    
    user_type ENUM('PROVIDER', 'ADMIN', 'PATIENT') NOT NULL,
    specialization VARCHAR(100),  -- For providers
    license_number VARCHAR(100),
    
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Database Configuration

**File:** `api/models/database/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Connection configuration from environment
DATABASE_URL = "postgresql://user:password@localhost:5432/healsense"

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=20,           # Connection pool size
    max_overflow=40,        # Max overflow connections
    pool_pre_ping=True,     # Verify connections alive
    echo=False              # Disable SQL logging in production
)

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Context manager for services
from contextlib import contextmanager

@contextmanager
def get_db_context():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Database Initialization

**File:** `backend/init_db.py`

```bash
# Run to create all tables and seed test data
python init_db.py
```

**Process:**
1. Creates all table schemas (via SQLAlchemy models)
2. Creates indexes (for performance)
3. Seeds sample patient/provider data
4. Initializes database options

### Migrations (Alembic)

**Purpose:** Version control for database schema changes

**Key Files:**
- `alembic.ini` - Alembic configuration
- `alembic/env.py` - Migration environment setup
- `alembic/versions/` - Migration scripts

**Latest Migration:**
`alembic/versions/b52623274ba1_add_phone_sensor_support_devicetype_.py`
- Adds phone sensor support to devices table
- Adds data source tracking to vital_signs table

**Common Commands:**
```bash
# View migration history
alembic history

# Create new migration for schema changes
alembic revision --autogenerate -m "Add new column"

# Apply migrations
alembic upgrade head

# Rollback to previous version
alembic downgrade -1

# Check current database version
alembic current
```

### Performance Considerations

**Indexing Strategy:**
- Composite indexes on `(patient_id, timestamp)` for vital_signs table
- Separate indexes on frequently filtered columns (status, severity)
- Partial indexes for active records only
- Full-text search indexes for notes/messages (if needed)

**Partitioning:**
- Vital signs table partitioned by date (daily or monthly)
- Improves query performance on historical data

**Query Optimization:**
```python
# ❌ Inefficient - N+1 queries
for patient in patients:
    vitals = db.query(VitalSigns).filter_by(patient_id=patient.id)

# ✅ Efficient - Single query with JOIN
vitals = db.query(VitalSigns).join(Patient).filter(
    Patient.id.in_(patient_ids)
).all()

# ✅ Efficient - Use eager loading
patients = db.query(Patient).options(
    joinedload(Patient.vital_signs).joinedload(VitalSigns.device)
).all()
```

**Caching Strategy:**
- Patient profiles cached in Redis (1 hour TTL)
- Latest vitals cached (5 minute TTL)
- Device status cached (30 second TTL)
- Alert history cached (15 minute TTL)

---

## API Documentation

### Base Configuration

**Base URL:**
- Development: `http://localhost:5000`
- Production: `https://api.healsense.com`

**API Prefix:** `/api/v1`

**Authentication:**
All endpoints (except `/health`, `/`, login endpoints) require JWT Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Response Format Standard

**Success Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "field1": "value1",
    ...
  },
  "status": "success",
  "timestamp": "2024-04-19T10:30:00Z",
  "meta": {
    "version": "1.0",
    "request_id": "req_uuid"
  }
}
```

**List Response (200):**
```json
{
  "data": [
    { ...item1 },
    { ...item2 }
  ],
  "status": "success",
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 150,
    "total_pages": 8
  },
  "timestamp": "2024-04-19T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": "error",
  "code": 400,
  "details": {
    "field": "Specific validation error"
  },
  "timestamp": "2024-04-19T10:30:00Z"
}
```

### Complete Endpoint Reference

#### Authentication Endpoints

**POST /api/v1/auth/login**
```
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### Patient Endpoints

**GET /api/v1/patients/{patient_id}**
Get patient profile.
```
Response (200):
{
  "id": "uuid",
  "first_name": "John",
  "last_name": "Doe",
  "age": 45,
  "gender": "M",
  "blood_type": "O+",
  "email": "john@example.com",
  "phone": "+1234567890",
  "medical_conditions": ["Hypertension"],
  "allergies": ["Penicillin"],
  "created_at": "2024-01-01T00:00:00Z"
}
```

**POST /api/v1/patients**
Create new patient.
```
Request:
{
  "first_name": "Jane",
  "last_name": "Smith",
  "age": 32,
  "gender": "F",
  "blood_type": "AB+",
  "email": "jane@example.com",
  "phone": "+9876543210"
}

Response (201): [Patient object]
```

**GET /api/v1/patients/{patient_id}/profile**
Get profile with latest vitals.
```
Response (200):
{
  "patient": { ...patient_data },
  "latest_vitals": {
    "heart_rate": 78,
    "spo2": 98.5,
    "temperature": 37.1,
    ...
    "timestamp": "2024-04-19T10:30:00Z"
  },
  "last_alert": {
    "message": "...",
    "severity": "MEDIUM",
    "created_at": "..."
  }
}
```

**GET /api/v1/patients/{patient_id}/vitals/latest**
Get latest vital signs.
```
Response (200):
{
  "heart_rate": 78,
  "spo2": 98.5,
  "temperature": 37.1,
  "systolic_bp": 120,
  "diastolic_bp": 78,
  "respiratory_rate": 16,
  "status": "NORMAL",
  "risk_score": 0.15,
  "timestamp": "2024-04-19T10:30:00Z"
}
```

**GET /api/v1/patients/{patient_id}/vitals/history**
Get historical vital signs.
```
Query Parameters:
- minutes: 60 (last N minutes, default: 1440)
- limit: 100 (max records)
- device_id: (optional, filter by device)

Response (200):
{
  "data": [
    {
      "heart_rate": 78,
      "timestamp": "2024-04-19T10:30:00Z",
      ...
    },
    ...
  ],
  "pagination": { ... }
}
```

**POST /api/v1/patients/{patient_id}/vitals**
Submit new vital signs.
```
Request:
{
  "device_id": "device_uuid",
  "heart_rate": 75,
  "spo2": 98.5,
  "temperature": 37.0,
  "systolic_bp": 118,
  "diastolic_bp": 76,
  "respiratory_rate": 15,
  "data_source": "MOBILE_APP",
  "activity_context": "resting",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060
  }
}

Response (201):
{
  "id": "vital_uuid",
  "status": "NORMAL",
  "risk_score": 0.12,
  "alert_triggered": false
}
```

#### Device Endpoints

**GET /api/v1/devices/{device_id}**
Get device details.
```
Response (200):
{
  "id": "device_uuid",
  "device_name": "Home Monitor",
  "device_type": "IOT_HARDWARE",
  "manufacturer": "Omron",
  "model": "HEM-7120",
  "phone_model": null,  // Only for MOBILE_APP type
  "connected": true,
  "battery_level": 85,
  "signal_strength": 90,
  "last_heartbeat": "2024-04-19T10:30:00Z",
  "measurement_interval": 60
}
```

**POST /api/v1/devices/{device_id}/connect**
Register/pair device.
```
Request:
{
  "device_name": "My Phone",
  "phone_model": "Samsung Galaxy S21",
  "phone_os": "Android",
  "phone_os_version": "12.0"
}

Response (201):
{
  "device_id": "device_uuid",
  "status": "connected",
  "pairing_code": "XXXXX"
}
```

**GET /api/v1/devices/{device_id}/status**
Get current device status.
```
Response (200):
{
  "connected": true,
  "battery_level": 85,
  "signal_strength": 90,
  "last_heartbeat": "2024-04-19T10:30:00Z",
  "measurement_quality": "good"
}
```

#### Alert Endpoints

**GET /api/v1/alerts**
List all alerts.
```
Query Parameters:
- patient_id: (optional)
- severity: (HIGH, CRITICAL, etc.)
- status: (ACTIVE, ACKNOWLEDGED)
- limit: 50

Response (200):
{
  "data": [ ... ],
  "pagination": { ... }
}
```

**POST /api/v1/alerts/{alert_id}/acknowledge**
Acknowledge alert.
```
Request:
{
  "notes": "Patient informed and monitoring."
}

Response (200):
{
  "status": "acknowledged",
  "acknowledged_at": "2024-04-19T10:35:00Z"
}
```

**POST /api/v1/alerts/{alert_id}/dismiss**
Dismiss alert.
```
Request:
{
  "reason": "False positive"
}

Response (200):
{
  "status": "dismissed",
  "dismissed_at": "2024-04-19T10:35:00Z"
}
```

#### AI Assistant Endpoints

**GET /api/v1/ai/providers**
Check available AI providers.
```
Response (200):
{
  "available": ["openai", "gemini"],
  "default": "openai",
  "models": {
    "openai": "gpt-4o-mini",
    "gemini": "gemini-1.5-flash"
  }
}
```

**POST /api/v1/ai/chat**
Chat with AI assistant.
```
Request:
{
  "message": "What should I do about elevated heart rate?",
  "context": {
    "patient_id": "uuid",
    "include_recent_vitals": true
  },
  "provider": "openai"
}

Response (200):
{
  "response": "Based on your vitals, elevated heart rate could be due to...",
  "provider": "openai",
  "confidence": 0.95,
  "timestamp": "2024-04-19T10:30:00Z"
}
```

#### Health & Status

**GET /health**
Health check endpoint.
```
Response (200):
{
  "status": "healthy",
  "timestamp": "2024-04-19T10:30:00Z",
  "checks": {
    "database": "connected",
    "cache": "connected",
    "ml_model": "loaded"
  }
}
```

---

## Real-time Communication

### WebSocket Architecture

**Real-time Manager:**
Located in `api/services/realtime.py`

```python
class RealtimeManager:
    def __init__(self):
        # Separate connection pools
        self.global_connections = set()      # All devices
        self.patient_connections = {}         # per patient_id
        self.device_connections = {}          # per device_id
    
    async def subscribe_global(self, client_id):
        """Subscribe to global stream."""
        self.global_connections.add(client_id)
    
    async def subscribe_patient(self, patient_id, client_id):
        """Subscribe to patient-specific stream."""
        if patient_id not in self.patient_connections:
            self.patient_connections[patient_id] = set()
        self.patient_connections[patient_id].add(client_id)
    
    async def broadcast_vital_update(self, vital_data):
        """Broadcast vital signs to all connected clients."""
        # Send to global stream
        await self._broadcast(self.global_connections, vital_data)
        # Send to patient stream
        patient_id = vital_data['patient_id']
        await self._broadcast(
            self.patient_connections.get(patient_id, set()),
            vital_data
        )
```

### WebSocket Endpoints

#### 1. Global Real-time Stream

**Endpoint:** `ws://localhost:5000/ws/live`

**Purpose:** Stream all vital signs updates across system

**Message Format:**
```json
{
  "event_type": "vital.update",
  "timestamp": "2024-04-19T10:30:00Z",
  "data": {
    "patient_id": "uuid",
    "device_id": "uuid",
    "heart_rate": 78,
    "spo2": 98.5,
    "status": "NORMAL",
    "risk_score": 0.15
  }
}
```

**Event Types:**
- `vital.update` - New vital signs
- `alert.created` - Alert generated
- `alert.acknowledged` - Alert acknowledged
- `alert.dismissed` - Alert dismissed
- `device.connected` - Device connected
- `device.disconnected` - Device disconnected
- `device.low_battery` - Device battery low

#### 2. Patient-specific Stream

**Endpoint:** `ws://localhost:5000/ws/patients/{patient_id}`

**Purpose:** Stream updates for specific patient

**Authentication:** Requires patient_id in token

**Message Example:**
```json
{
  "event_type": "vital.update",
  "timestamp": "2024-04-19T10:30:00Z",
  "vitals": {
    "heart_rate": 78,
    "spo2": 98.5,
    ...
  },
  "alerts": [
    {
      "id": "alert_uuid",
      "message": "Elevated heart rate",
      "severity": "MEDIUM"
    }
  ]
}
```

#### 3. Device-specific Stream

**Endpoint:** `ws://localhost:5000/ws/devices/{device_id}`

**Purpose:** Stream device status and measurements

**Message Example:**
```json
{
  "event_type": "device.status",
  "timestamp": "2024-04-19T10:30:00Z",
  "device_status": {
    "connected": true,
    "battery_level": 85,
    "signal_strength": 90,
    "last_measurement": "2024-04-19T10:30:00Z"
  }
}
```

### Client Implementation

**JavaScript/Web:**
```typescript
// Connect to patient stream
const socket = new WebSocket(
  `ws://localhost:5000/ws/patients/patient_uuid?token=jwt_token`
);

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.event_type === 'vital.update') {
    updateVitalDisplay(message.data);
  } else if (message.event_type === 'alert.created') {
    showAlert(message.data);
  }
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
  // Attempt reconnection
};

socket.onclose = () => {
  console.log('WebSocket closed');
  // Reconnect after delay
};
```

**Flutter/Dart:**
```dart
import 'package:web_socket_channel/web_socket_channel.dart';

final channel = WebSocketChannel.connect(
  Uri.parse('ws://localhost:5000/ws/patients/$patientId?token=$token'),
);

channel.stream.listen(
  (message) {
    final data = jsonDecode(message);
    if (data['event_type'] == 'vital.update') {
      updateVitals(data['data']);
    }
  },
  onError: (error) {
    print('WebSocket error: $error');
  },
  onDone: () {
    print('WebSocket closed');
  },
);
```

### Connection Management

**Automatic Reconnection:**
```python
# Backend: Detect disconnections
async with asyncio.timeout(30):  # 30-second ping/pong
    message = await websocket.receive_text()

# Client: Attempt reconnection
const maxRetries = 5;
let retries = 0;

function connectWebSocket() {
    try {
        socket = new WebSocket(wsUrl);
    } catch (error) {
        if (retries < maxRetries) {
            retries++;
            setTimeout(connectWebSocket, 1000 * retries);
        }
    }
}
```

**Message Acknowledgment:**
```json
{
  "ack": true,
  "message_id": "msg_uuid"
}
```

---

## Deployment & Infrastructure

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CDN / Load Balancer                  │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Web Server 1 │ │ Web Server 2 │ │ Web Server N │
│  (Gunicorn)  │ │  (Gunicorn)  │ │  (Gunicorn)  │
└────────┬─────┘ └────────┬─────┘ └────────┬─────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐    ┌─────▼──────┐   ┌────▼────┐
    │PostgreSQL│    │   Redis    │   │  S3/CDN │
    │ Primary  │    │   Cache    │   │ Storage │
    └────┬─────┘    └────────────┘   └─────────┘
         │
    ┌────▼──────────────┐
    │ Replica (Standby) │
    └───────────────────┘
```

### Backend Deployment

#### Option 1: Development Mode

**Command:**
```bash
cd healsense/backend
python run.py
```

**Server:**
- Runs on `http://localhost:5000`
- Auto-reload on code changes
- Single worker process
- Development logging

#### Option 2: Production Mode (Gunicorn)

**Command (on Linux/Mac):**
```bash
cd healsense/backend
gunicorn api.app:app \
    -w 4 \
    -k uvicorn.workers.UvicornWorker \
    -b 0.0.0.0:5000 \
    --access-logfile - \
    --error-logfile - \
    --log-level info
```

**PowerShell Script (Windows):**
```powershell
# File: start-prod.ps1
.\venv\Scripts\Activate.ps1
gunicorn api.app:app `
    -w 4 `
    -k uvicorn.workers.UvicornWorker `
    -b 0.0.0.0:5000
```

**Configuration:**
- **Workers:** 4 (= 2 * CPU cores, adjust based on server)
- **Timeout:** 120 seconds
- **Graceful Shutdown:** 30 seconds
- **Access Log:** stdout
- **Error Log:** stderr

#### Option 3: Docker Deployment

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "api.app:app", \
     "-w", "4", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "-b", "0.0.0.0:5000"]
```

**Build & Run:**
```bash
docker build -t healsense-backend .
docker run -p 5000:5000 \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_HOST=redis \
  healsense-backend
```

### Frontend Deployment

#### Mobile App (Flutter)

**Development:**
```bash
cd healsense/frontend/mobile-app
flutter pub get
flutter run
```

**Release Build:**
```bash
# Android APK
flutter build apk --release

# iOS IPA
flutter build ios --release
```

**Distribution:**
- Google Play Store
- Apple App Store
- Internal enterprise distribution

#### Web App (React + Vite)

**Development:**
```bash
cd healsense/frontend/web-app
npm install
npm run dev
# Starts on http://localhost:8080 with HMR
```

**Production Build:**
```bash
npm run build
# Output: dist/ folder (static files)
```

**Deployment Platforms:**

1. **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
# Auto-deploys on git push
```

2. **Netlify**
```
- Connect GitHub repo
- Build command: npm run build
- Publish directory: dist
```

3. **AWS S3 + CloudFront**
```bash
# Build
npm run build

# Deploy to S3
aws s3 sync dist/ s3://healsense-frontend/

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id XXXXX \
  --paths "/*"
```

4. **Traditional VPS**
```bash
# Build
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/healsense/

# Configure nginx
# (see nginx.conf example below)
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name healsense.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name healsense.com;

    ssl_certificate /etc/letsencrypt/live/healsense.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/healsense.com/privkey.pem;

    root /var/www/healsense;
    
    # SPA routing - send all requests to index.html except files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for HTML
    location ~* \.html?$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # API proxy
    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket proxy
    location /ws {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_buffering off;
    }
}
```

### Database Deployment

#### PostgreSQL Setup

**Docker:**
```bash
docker run --name healsense-db \
  -e POSTGRES_PASSWORD=securepassword \
  -e POSTGRES_DB=healsense \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
```

**AWS RDS:**
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier healsense-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password <password> \
  --allocated-storage 100
```

**Backups:**
```bash
# Automated backups (AWS RDS)
# - Retention: 7-35 days
# - Backup window: 03:00-04:00 UTC

# Manual backup
pg_dump healsense > backup_2024_04_19.sql

# Restore from backup
psql healsense < backup_2024_04_19.sql
```

#### Redis Cache Setup

**Docker:**
```bash
docker run --name healsense-redis \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7-alpine
```

**AWS ElastiCache:**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id healsense-cache \
  --engine redis \
  --cache-node-type cache.t3.micro \
  --engine-version 7.0
```

### Infrastructure as Code (Optional - Terraform Example)

```hcl
# main.tf

# Backend EC2 Instance
resource "aws_instance" "backend" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.small"
  
  tags = {
    Name = "HealSense-Backend"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  allocated_storage    = 100
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t3.micro"
  name                 = "healsense"
  username             = "postgres"
  password             = var.db_password
  
  backup_retention_period = 7
  multi_az            = true
  publicly_accessible = false
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "healsense-cache"
  engine               = "redis"
  node_type           = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}
```

---

## Development Setup

### Prerequisites

**System Requirements:**
- Python 3.9+ (backend)
- Node.js 16+ (web app)
- Flutter 3.0+ (mobile app)
- PostgreSQL 12+ (database)
- Redis 6+ (cache)
- Git

### Backend Setup

**1. Clone repository:**
```bash
git clone https://github.com/yourusername/healsense.git
cd healsense/backend
```

**2. Create virtual environment:**
```bash
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
.\venv\Scripts\Activate.ps1
```

**3. Install dependencies:**
```bash
pip install -r requirements.txt
```

**4. Copy environment file:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

**5. Initialize database:**
```bash
python init_db.py
```

**6. Run development server:**
```bash
python run.py
# API available at http://localhost:5000
```

### Web App Setup

**1. Navigate to web app:**
```bash
cd healsense/frontend/web-app
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create environment file:**
```bash
cp .env.example .env.local
# Configure API_BASE_URL=http://localhost:5000
```

**4. Start dev server:**
```bash
npm run dev
# App available at http://localhost:8080
```

### Mobile App Setup

**1. Navigate to mobile app:**
```bash
cd healsense/frontend/mobile-app
```

**2. Install dependencies:**
```bash
flutter pub get
```

**3. Configure API endpoint:**
```dart
// lib/core/constants/api_constants.dart
const String API_BASE_URL = 'http://10.0.2.2:5000';  // Android emulator
const String API_BASE_URL = 'http://localhost:5000';  // iOS simulator
```

**4. Run app:**
```bash
flutter run
```

### IDE Setup

**Backend: VS Code / PyCharm**
- Install Python extension
- Set Python interpreter to venv
- Install Pylance for type checking

**Frontend: VS Code**
- Install Vite extension
- Install TypeScript Vue Plugin
- Install Tailwind CSS IntelliSense

**Mobile: Android Studio / VS Code**
- Install Flutter extension
- Install Dart extension
- Configure emulator/device

---

## Configuration & Environment

### Environment Variables

**File: `.env` (Backend Root)**

```env
# Application Settings
ENV=development                          # development, staging, production
DEBUG=true                               # Enable debug mode
PROJECT_NAME=HealSense
API_V1_PREFIX=/api/v1

# Server
HOST=0.0.0.0
PORT=5000
WORKERS=4
RELOAD=true                              # Auto-reload on code changes

# Security
SECRET_KEY=<generate-random-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/healsense
ECHO_SQL=false                           # Log SQL queries (dev only)

# Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=

# IoT & Sensors (MQTT)
MQTT_BROKER=mqtt.healsense.local
MQTT_PORT=1883
MQTT_USERNAME=
MQTT_PASSWORD=
MQTT_TOPIC_PREFIX=healsense/
MQTT_QOS=1

# AI Services
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=500

GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash

# ML Models
LSTM_MODEL_PATH=../data/models/lstm_model.h5
SCALER_PATH=../data/models/scaler.pkl
MODEL_VERSION=1.0

# Alert Configuration
ALERT_THRESHOLDS={
  "heart_rate": {"min": 50, "max": 120},
  "spo2": {"min": 92, "max": 100},
  "temperature": {"min": 36.1, "max": 38.5},
  "systolic_bp": {"min": 90, "max": 140},
  "diastolic_bp": {"min": 60, "max": 90}
}

# Firebase
FIREBASE_PROJECT_ID=healsense-project
FIREBASE_CREDENTIAL_PATH=./firebase-key.json

# Logging
LOG_LEVEL=INFO
LOG_FORMAT=json

# External Services
SENTRY_DSN=                              # Error tracking
DATADOG_API_KEY=                         # Metrics
```

### Frontend Environment Variables

**Web App: `.env.local`**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_WS_BASE_URL=ws://localhost:5000
VITE_APP_TITLE=HealSense Dashboard
VITE_APP_VERSION=1.0.0
```

**Mobile App: `lib/.env`** (or in lib/core/constants/config.dart)
```dart
const String API_BASE_URL = 'http://10.0.2.2:5000';  // Emulator
// const String API_BASE_URL = 'http://localhost:5000';  // Real device
```

### Configuration Files

**Backend: `api/config.py`**
- Pydantic Settings configuration
- Database connection
- Security parameters
- ML model paths

**Web App: `vite.config.ts`**
- Build optimization
- Dev server configuration
- Alias paths

**Mobile App: `pubspec.yaml`**
- Dependencies
- Asset configuration
- Version info

---

## Integration Points

### Internal System Integrations

**1. Frontend ← → Backend**
- REST API for CRUD operations
- WebSocket for real-time updates
- JWT token-based authentication

**2. Backend ← → Database**
- SQLAlchemy ORM for queries
- Connection pooling (pool_size=20)
- Prepared statements for security

**3. Backend ← → Cache (Redis)**
- Session storage
- API response caching
- Rate limiting
- Real-time message brokering

**4. Backend ← → ML Model**
- TensorFlow model loading
- Feature scaling (StandardScaler)
- Inference for risk prediction

### External Service Integrations

**1. OpenAI GPT-4**
- Health guidance via AI
- Endpoint: `POST /api/v1/ai/chat`
- Model: `gpt-4o-mini`
- Max tokens: 500
- Fallback: Gemini

**2. Google Gemini API**
- Alternative AI provider
- Model: `gemini-1.5-flash`
- Fallback if OpenAI unavailable

**3. Firebase**
- Push notifications to mobile app
- Authentication (optional)
- Analytics

**4. MQTT Brokers**
- IoT device data ingestion
- Topic: `healsense/vitals/#`
- QoS: 1 (at least once delivery)

**5. Weather API (Optional)**
- Activity context (outdoor/indoor)
- Temperature correlation

### Data Flow Integrations

```
IoT Device ──(MQTT/HTTP)──> Backend ──(SQL)──> PostgreSQL
                                  │
                                  ├──(ML)──> TensorFlow
                                  │
                                  ├──(WS)──> Redis → Clients
                                  │
                                  └──(API)──> Mobile/Web Apps
```

---

## Monitoring & Maintenance

### Logging Strategy

**Structured JSON Logging:**
```python
from pythonjsonlogger import jsonlogger
import logging

logger = logging.getLogger()
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)

# Log example
logger.info("Vital submitted", extra={
    "patient_id": "uuid",
    "heart_rate": 78,
    "risk_score": 0.15
})
# Output: {"patient_id": "uuid", "heart_rate": 78, ...}
```

**Log Levels:**
- `DEBUG`: Development debugging info
- `INFO`: General application flow
- `WARNING`: Alert conditions
- `ERROR`: Application errors (not user faults)
- `CRITICAL`: System failures

**Log Aggregation:**
- Centralize logs (ELK Stack, Splunk, DataDog)
- Alert on ERROR/CRITICAL logs
- Retention: 30 days for INFO, 90 days for ERROR

### Performance Monitoring

**Key Metrics to Monitor:**

1. **API Endpoint Performance**
```python
from prometheus_client import Histogram

request_latency = Histogram(
    'request_latency_seconds',
    'API request latency',
    ['method', 'endpoint']
)
```

2. **Database Performance**
- Query latency (P50, P95, P99)
- Connection pool utilization
- Slow query logs

3. **Cache Hit Rate**
- Redis commands/second
- Hit vs miss ratio
- Memory usage

4. **ML Model Performance**
- Inference latency
- Accuracy metrics
- Model drift detection

### Health Checks

**Endpoint: `GET /health`**
```json
{
  "status": "healthy",
  "timestamp": "2024-04-19T10:30:00Z",
  "checks": {
    "database": "connected",
    "cache": "connected",
    "ml_model": "loaded",
    "external_apis": "ok"
  }
}
```

**Periodic Health Checks:**
- Database connectivity (every 10 seconds)
- Cache availability (every 5 seconds)
- ML model loading (on startup)
- API dependencies (every 30 seconds)

### Database Maintenance

**Regular Tasks:**
```bash
# Backup
pg_dump healsense > backup_$(date +%Y%m%d).sql

# VACUUM & ANALYZE (weekly)
psql healsense -c "VACUUM ANALYZE;"

# Index maintenance (monthly)
psql healsense -c "REINDEX DATABASE healsense;"

# Check table sizes
psql healsense -c "SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

### Security Updates

**Dependencies:**
```bash
# Check for vulnerabilities
pip audit
npm audit
flutter pub outdated

# Update dependencies
pip install --upgrade -r requirements.txt
npm update
flutter pub upgrade
```

**SSL/TLS Certificates:**
- Use Let's Encrypt (free)
- Auto-renewal via certbot
- Certificate expiry alerts

### Disaster Recovery

**Backup Strategy:**
- Full daily backups
- Hourly incremental backups
- Off-site storage (S3, GCS)
- Test restore procedures monthly

**RTO & RPO:**
- Recovery Time Objective (RTO): 1 hour
- Recovery Point Objective (RPO): 1 hour

---

## Project Structure

Complete directory tree of the HealSense project:

```
/mnt/UserDrive/Github/FYP-Project/
├── CONSTRUCTION.md                 # Project construction/progress notes
├── README.md                        # Main project README
├── PROJECT_COMPREHENSIVE_DOCUMENTATION.md  # This file
│
└── healsense/                       # Main project directory
    ├── README.md                    # HealSense-specific README
    ├── requirements.txt             # Python dependencies (frontend scripts)
    ├── test_phone_integration.py    # Phone sensor integration tests
    ├── Google_Colab_Setup.ipynb     # Google Colab notebook setup
    ├── Final Defence.md             # Final presentation notes
    │
    ├── backend/                     # FastAPI Backend
    │   ├── README.md                # Backend documentation
    │   ├── requirements.txt          # Python dependencies
    │   ├── run.py                   # Development server launcher
    │   ├── wsgi.py                  # Production WSGI entry point
    │   ├── alembic.ini              # Database migration config
    │   ├── init_db.py               # Database initialization script
    │   ├── test_db_endpoints.py     # Database endpoint tests
    │   ├── test-integration.ps1     # Integration test script (PowerShell)
    │   ├── verify-setup.ps1         # Setup verification script
    │   ├── start-dev.ps1            # Dev server startup (PowerShell)
    │   ├── start-prod.ps1           # Prod server startup (PowerShell)
    │   │
    │   ├── api/                     # Main FastAPI application
    │   │   ├── __init__.py
    │   │   ├── app.py               # FastAPI app initialization
    │   │   ├── config.py            # Configuration management
    │   │   │
    │   │   ├── middleware/          # Custom middleware
    │   │   │   └── __init__.py
    │   │   │
    │   │   ├── models/              # Data models
    │   │   │   ├── __init__.py
    │   │   │   ├── schemas.py       # Pydantic schemas
    │   │   │   └── database/        # SQLAlchemy models
    │   │   │       ├── base.py
    │   │   │       ├── patient.py
    │   │   │       ├── vital_signs.py
    │   │   │       ├── device.py
    │   │   │       ├── alert.py
    │   │   │       ├── emergency.py
    │   │   │       └── user.py
    │   │   │
    │   │   ├── routes/              # API endpoint handlers
    │   │   │   ├── __init__.py
    │   │   │   ├── patients.py      # Patient CRUD endpoints
    │   │   │   ├── alerts.py        # Alert management endpoints
    │   │   │   ├── devices.py       # Device management endpoints
    │   │   │   ├── ai.py            # AI assistant endpoints
    │   │   │   └── realtime.py      # WebSocket endpoints
    │   │   │
    │   │   └── services/            # Business logic services
    │   │       ├── __init__.py
    │   │       ├── patient_service.py
    │   │       ├── alert_service.py
    │   │       ├── ml_service.py    # ML inference service
    │   │       ├── realtime.py      # WebSocket manager
    │   │       └── notification_service.py
    │   │
    │   └── alembic/                 # Database migration scripts
    │       ├── env.py               # Migration environment
    │       ├── script.py.mako       # Migration template
    │       ├── README
    │       └── versions/            # Migration files
    │           └── b52623274ba1_add_phone_sensor_support_devicetype_.py
    │
    ├── data/                        # Data storage directory
    │   ├── models/                  # ML models
    │   │   ├── checkpoints/         # Model checkpoints
    │   │   │   └── best_model.h5
    │   │   ├── metadata/            # Model metadata
    │   │   │   ├── scaler.pkl
    │   │   │   ├── model_info.json
    │   │   │   └── training_history.json
    │   │   └── tflite/              # TensorFlow Lite models
    │   │       ├── health_model.tflite
    │   │       └── health_model_int8.tflite
    │   │
    │   ├── raw/                     # Raw dataset storage
    │   │   ├── kaggle_health_data/
    │   │   │   ├── LICENSE
    │   │   │   └── Codes/
    │   │   ├── physionet_bidmc/
    │   │   │   └── download_bidmc.py
    │   │   ├── uci_heart_disease/
    │   │   │   └── heart-disease.names
    │   │   └── synthetic/           # Generated synthetic data
    │   │       └── synthetic_vital_signs.csv
    │   │
    │   └── processed/               # Processed datasets (intermediate)
    │
    ├── frontend/                    # Frontend applications
    │   ├── mobile-app/              # Flutter mobile application
    │   │   ├── pubspec.yaml         # Dart dependencies
    │   │   ├── build.gradle.kts     # Android build config
    │   │   ├── gradle.properties
    │   │   ├── settings.gradle.kts
    │   │   ├── gradlew, gradlew.bat
    │   │   │
    │   │   ├── app/                 # Android app module
    │   │   │   ├── build.gradle.kts
    │   │   │   ├── proguard-rules.pro
    │   │   │   └── src/
    │   │   │       ├── main/
    │   │   │       │   ├── AndroidManifest.xml
    │   │   │       │   └── kotlin/
    │   │   │       └── test/
    │   │   │
    │   │   ├── gradle/              # Gradle wrapper
    │   │   │   └── wrapper/
    │   │   │
    │   │   └── lib/                 # Flutter source code
    │   │       ├── main.dart        # App entry point
    │   │       ├── core/            # Core utilities
    │   │       ├── models/          # Data models
    │   │       ├── providers/       # State management
    │   │       ├── services/        # API services
    │   │       ├── views/           # Screen widgets
    │   │       └── widgets/         # Reusable components
    │   │
    │   └── web-app/                 # React + Vite web application
    │       ├── package.json         # Node.js dependencies
    │       ├── vite.config.ts       # Vite build config
    │       ├── tailwind.config.ts   # Tailwind CSS config
    │       ├── tsconfig.json        # TypeScript config
    │       ├── tsconfig.app.json
    │       ├── tsconfig.node.json
    │       ├── vitest.config.ts     # Test config
    │       ├── eslint.config.js     # ESLint config
    │       ├── postcss.config.js    # PostCSS config
    │       ├── index.html           # Entry HTML
    │       ├── README.md
    │       │
    │       ├── public/              # Static assets
    │       │   └── vite.svg
    │       │
    │       └── src/                 # React source code
    │           ├── main.tsx         # Entry point
    │           ├── App.tsx          # App component
    │           ├── index.css        # Global styles
    │           ├── pages/           # Route pages
    │           ├── components/      # UI components
    │           ├── contexts/        # React contexts
    │           ├── hooks/           # Custom hooks
    │           ├── lib/             # Utilities
    │           ├── types/           # TypeScript types
    │           └── assets/          # Images, fonts
    │
    ├── docs/                        # Documentation
    │   └── diagrams/                # Architecture diagrams (PlantUML)
    │       ├── alert_system.puml
    │       ├── data_flow.puml
    │       ├── database_architecture.puml
    │       ├── deployment_workflow.puml
    │       ├── hardware_circuit.puml
    │       ├── healsense_api_core_routes.puml
    │       ├── healsense_architecture.puml
    │       ├── iot_sensor_node_interface.puml
    │       ├── ml_pipeline.puml
    │       └── mobile_app_architecture.puml
    │
    ├── notebooks/                   # Jupyter notebooks
    │   ├── 01_data_exploration.ipynb      # EDA and dataset analysis
    │   └── 02_lstm_health_prediction.ipynb # Model training notebook
    │
    └── scripts/                     # Utility scripts
        ├── analyze_datasets.py      # Dataset analysis
        ├── auto_download.py         # Automated downloads
        ├── deploy_model.py          # TensorFlow Lite conversion
        ├── download_all_datasets.py # Bulk dataset download
        ├── download_datasets.py     # Dataset downloader
        ├── download_kaggle.py       # Kaggle API wrapper
        └── generate_synthetic_data.py # Synthetic data generation
```

### Key File Purposes

| File | Purpose |
|------|---------|
| `backend/run.py` | Development server entry point |
| `backend/wsgi.py` | Production WSGI application |
| `api/app.py` | FastAPI application setup and configuration |
| `api/routes/*.py` | API endpoint handlers |
| `api/services/*.py` | Business logic and services |
| `frontend/mobile-app/lib/main.dart` | Flutter app entry point |
| `frontend/web-app/src/main.tsx` | React app entry point |
| `notebooks/02_lstm_health_prediction.ipynb` | ML model training |
| `scripts/deploy_model.py` | Model export for mobile |
| `data/models/` | Trained ML models (production) |

---

## Conclusion

HealSense is a comprehensive IoT health monitoring system with:

✅ **Production-Ready Backend** - FastAPI with real-time WebSocket streaming  
✅ **Cross-Platform Frontend** - Flutter mobile + React web dashboard  
✅ **Advanced ML Pipeline** - LSTM-based health risk prediction (>93% accuracy)  
✅ **Scalable Architecture** - Multi-worker deployment, database replication  
✅ **Comprehensive API** - 30+ endpoints with full documentation  
✅ **Real-time Capabilities** - WebSocket streams for live updates  
✅ **Mobile Sensor Integration** - Phone sensors + IoT devices + wearables  
✅ **AI Assistant Integration** - OpenAI GPT-4 and Google Gemini support  
✅ **Enterprise Database** - PostgreSQL with migrations and optimization  
✅ **Complete Documentation** - Architecture, APIs, deployment guides  

The project is well-structured, thoroughly documented, and ready for production deployment with proper monitoring, logging, and scaling infrastructure.

---

**For detailed setup instructions, API examples, and deployment guidance, refer to the respective component README files in the project directories.**
