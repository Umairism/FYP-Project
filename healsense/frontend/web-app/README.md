# HealSense Web Dashboard

**Real-Time Health Monitoring Web Application**

A modern, responsive web dashboard for continuous health monitoring built with React, Vite, TypeScript, and Shadcn UI.

## ✨ New Features (January 2026)

### 🔐 Authentication System
- **Login & Signup**: Secure authentication with localStorage persistence
- **Session Management**: Auto-login on app restart
- **Protected Routes**: Dashboard and profile accessible only when authenticated
- **Demo Account**: Pre-configured test account

### 👤 Profile Management
- **Personal Information**: Edit name, age, gender, blood type
- **Medical History**: Track medical conditions and medications
- **Emergency Contacts**: Manage doctor and family emergency contacts
- **Real-time Updates**: Changes saved instantly to localStorage

### 📊 Dashboard
- **Real-Time Vitals**: Live monitoring of 5 critical health metrics
- **Smart Alerts**: Automatic notifications for abnormal vitals
- **Connection Status**: Visual indicator for device connectivity
- **Navigation Bar**: Quick access to profile and logout

## 🚀 Quick Start

### Prerequisites
- Node.js 24+ 
- npm or yarn

### Installation

```bash
cd healsense/frontend/web-app
npm install
```

### Development

```bash
npm run dev
# Open http://localhost:5173
```

### Demo Account

```
Email:    umair@healsense.com
Password: password123
```

**Pre-loaded Data:**
- Patient: Umair Hakeem, 24 years, Blood Type O+
- Emergency Contacts: Dr. Ahmed Khan (Doctor) & Awais (Brother)
- Mock vital signs with realistic values

## 📁 Project Structure

```
web-app/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx         # ✨ NEW: Authentication context
│   ├── pages/
│   │   ├── Index.tsx              # ✨ UPDATED: Landing page
│   │   ├── Login.tsx              # ✨ NEW: Login screen
│   │   ├── Signup.tsx             # ✨ NEW: Signup screen
│   │   ├── Profile.tsx            # ✨ NEW: Profile editor
│   │   ├── Dashboard.tsx          # ✨ UPDATED: Main dashboard
│   │   └── NotFound.tsx
│   ├── hooks/
│   │   ├── usePatient.ts          # ✨ UPDATED: Mock data from mobile app
│   │   └── useVitals.ts           # Mock vitals generation
│   ├── types/
│   │   └── vitals.ts              # ✨ UPDATED: Emergency contacts type
│   ├── lib/
│   │   ├── config.ts              # ✨ UPDATED: Mock data enabled by default
│   │   └── api.ts
│   ├── components/
│   │   └── ui/                    # Shadcn UI components
│   └── App.tsx                    # ✨ UPDATED: Auth & routing
├── .env                            # Environment variables
└── package.json
```

## 🎯 Features

### Authentication
- ✅ Email/password login
- ✅ User registration
- ✅ Session persistence
- ✅ Protected routes
- ✅ Auto-redirect logic
- ✅ Logout functionality

### Profile Management
- ✅ View profile information
- ✅ Edit personal details (name, age, gender, blood type)
- ✅ Manage medical conditions
- ✅ Manage current medications
- ✅ Emergency contacts (doctor & family)
- ✅ Real-time save to localStorage

### Dashboard
- ✅ Live vital signs monitoring
- ✅ Color-coded health status
- ✅ Alert notifications
- ✅ Connection indicator
- ✅ Navigation bar with user info
- ✅ Quick access to profile

## 🔧 Mock Data

The app uses the same mock data structure as the mobile app:

### Mock Patient
```typescript
{
  id: '1',
  name: 'Umair Hakeem',
  age: 24,
  gender: 'Male',
  bloodType: 'O+',
  medicalConditions: [],
  currentMedications: [],
  emergencyContacts: [
    {
      name: 'Dr. Ahmed Khan',
      phone: '+92 300 1234567',
      relation: 'Primary Care Physician',
      type: 'doctor',
    },
    {
      name: 'Awais',
      phone: '03145647685',
      relation: 'Brother',
      type: 'family',
    },
  ],
}
```

### Mock Vitals
- Auto-generated realistic values
- Updates every 5 seconds
- Slight variations for realism
- Matches mobile app behavior

## 🛠️ Tech Stack

### Core
- **React**: 19
- **Vite**: Fast build tool
- **TypeScript**: 5.6+
- **React Router**: v6 (routing)

### UI Framework
- **Shadcn UI**: Component library
- **Radix UI**: Headless UI primitives
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Icons

### State Management
- **React Query**: Server state
- **React Context**: Auth state
- **localStorage**: Persistence

## 🔐 Authentication Flow

```
Landing Page (/)
      ↓
   Not authenticated? → Login (/login)
      ↓
   Authenticate → Save to localStorage
      ↓
   Redirect to Dashboard (/dashboard)
      ↓
   Already authenticated? → Dashboard
```

## 📝 Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_WS_URL=ws://localhost:5000/ws

# Feature Flags
VITE_USE_MOCK_DATA=true           # Enable mock data
VITE_POLLING_INTERVAL=5000        # Polling interval (ms)

# Development
VITE_DEBUG_MODE=true
```

## 🧪 Development

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

### Type Check
```bash
npm run type-check  # If available
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
# Output: dist/
```

### Deploy to Vercel
```bash
vercel
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time WebSocket data streaming
- [ ] Push notifications
- [ ] Multi-user support
- [ ] Dark mode toggle in UI
- [ ] Historical charts
- [ ] Export reports (PDF)
- [ ] Biometric authentication
- [ ] PWA capabilities
- [ ] Mobile responsive improvements

## 🤝 Contributing

This is a Final Year Project. See main project README for contribution guidelines.

## 📄 License

Academic Final Year Project

## 👨‍💻 Author

**Umair Hakeem**

---

**Version**: 0.1.0  
**Last Updated**: January 21, 2026  
**Status**: Active Development
