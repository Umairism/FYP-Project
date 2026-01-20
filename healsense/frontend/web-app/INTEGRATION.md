# HealSense WebApp - Backend Integration Guide

## Overview
The webapp has been refactored to support both **mock data** (for development) and **real backend API** integration. All mock data has been isolated and can be toggled via environment variables.

## Quick Start

### Development Mode (Mock Data)
```bash
# Copy environment file
cp .env.example .env

# Edit .env and set:
VITE_USE_MOCK_DATA=true

# Run the app
npm run dev
```

### Production Mode (Real Backend)
```bash
# Edit .env and set:
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://your-backend-url:5000/api/v1
VITE_WS_URL=ws://your-backend-url:5000/ws

# Run the app
npm run dev
```

## Architecture Changes

### 1. Configuration
- **File**: `src/lib/config.ts`
- Centralized API endpoints and WebSocket topics
- Environment-based configuration
- Easy to switch between mock and real data

### 2. API Service Layer
- **File**: `src/lib/api.ts`
- RESTful API client with error handling
- Typed request/response interfaces
- Modular API services:
  - `patientApi` - Patient profile management
  - `vitalsApi` - Vital signs data
  - `alertsApi` - Alert management
  - `emergencyApi` - Emergency triggers
  - `deviceApi` - IoT device status

### 3. Type Definitions
- **File**: `src/types/api.ts`
- API request/response types
- Error handling types
- Pagination support

### 4. React Hooks

#### `usePatient(patientId, useMockData)`
- Fetches patient profile data
- Uses React Query for caching
- Falls back to mock data when needed

#### `useVitals({ patientId, useMockData })`
- Manages vital signs data
- Supports both polling and WebSocket
- Mock data generation for development
- Automatic alert detection

#### `useWebSocket(options)`
- Generic WebSocket hook
- Auto-reconnection
- Specific hooks for vitals, alerts, and devices

### 5. Updated Components
- **Dashboard**: Now uses `usePatient` and updated `useVitals`
- All components work with both mock and real data

## Backend API Requirements

Your backend should implement these endpoints:

### Patient Endpoints
```
GET  /api/v1/patients/{id}/profile
```

### Vitals Endpoints
```
GET  /api/v1/patients/{id}/vitals/latest
GET  /api/v1/patients/{id}/vitals/history?minutes=60
POST /api/v1/patients/{id}/vitals
```

### Alerts Endpoints
```
GET    /api/v1/patients/{id}/alerts
POST   /api/v1/alerts/{alertId}/acknowledge
DELETE /api/v1/alerts/{alertId}/dismiss
```

### Emergency Endpoint
```
POST /api/v1/patients/{id}/emergency
```

### Device Endpoints
```
GET  /api/v1/devices/{deviceId}/status
POST /api/v1/devices/{deviceId}/connect
```

### WebSocket Topics
```
ws://backend-url/ws/vitals/{patientId}
ws://backend-url/ws/alerts/{patientId}
ws://backend-url/ws/device/{deviceId}
```

## API Response Format

All API responses should follow this structure:

```typescript
{
  "success": true,
  "data": { /* your data */ },
  "message": "Optional message",
  "timestamp": "2026-01-20T10:00:00Z"
}
```

Error responses:
```typescript
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable error message",
  "statusCode": 400,
  "timestamp": "2026-01-20T10:00:00Z"
}
```

## Data Models

### VitalReading
```typescript
{
  id: string;
  timestamp: Date;
  heartRate: number;        // bpm
  spo2: number;            // %
  temperature: number;      // °C
  systolic: number;        // mmHg
  diastolic: number;       // mmHg
  respiratoryRate: number; // /min
}
```

### PatientProfile
```typescript
{
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  avatar?: string;
  conditions: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}
```

### Alert
```typescript
{
  id: string;
  type: 'warning' | 'critical';
  vitalType: string;
  value: number;
  threshold: string;
  timestamp: Date;
  acknowledged: boolean;
}
```

## Real-Time Updates

The webapp supports two methods for real-time updates:

### 1. Polling (Default)
- Fetches latest vitals every 5 seconds (configurable)
- Works without WebSocket support
- Uses `VITE_POLLING_INTERVAL` environment variable

### 2. WebSocket (Recommended)
- Real-time push updates
- Lower latency
- More efficient
- Auto-reconnection on disconnect
- To enable: Implement WebSocket endpoints in backend and set `VITE_USE_MOCK_DATA=false`

## IoT Device Integration

### Expected Flow:
1. **Device Connection**: IoT device connects to backend via MQTT/WebSocket
2. **Data Transmission**: Device sends vital signs to backend
3. **Backend Processing**: Backend validates, stores, and broadcasts data
4. **WebApp Updates**: WebApp receives updates via WebSocket or polling
5. **Alert Generation**: Backend detects anomalies and creates alerts
6. **Emergency Trigger**: WebApp can trigger emergency alerts

### Device Data Format:
```json
{
  "deviceId": "device-12345",
  "patientId": "patient-1",
  "timestamp": "2026-01-20T10:00:00Z",
  "vitals": {
    "heartRate": 75,
    "spo2": 98,
    "temperature": 36.5,
    "systolic": 120,
    "diastolic": 80,
    "respiratoryRate": 16
  }
}
```

## Testing

### Test with Mock Data
1. Set `VITE_USE_MOCK_DATA=true` in `.env`
2. Run `npm run dev`
3. Dashboard will show simulated real-time data

### Test with Backend
1. Ensure backend is running
2. Set `VITE_USE_MOCK_DATA=false` in `.env`
3. Update `VITE_API_BASE_URL` and `VITE_WS_URL`
4. Run `npm run dev`
5. Check browser console for API calls

## Deployment

### Build for Production
```bash
# Set production environment variables
echo "VITE_USE_MOCK_DATA=false" > .env
echo "VITE_API_BASE_URL=https://api.healsense.com/api/v1" >> .env
echo "VITE_WS_URL=wss://api.healsense.com/ws" >> .env

# Build
npm run build

# Preview
npm run preview
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` | Yes |
| `VITE_WS_URL` | WebSocket URL | `ws://localhost:5000/ws` | No |
| `VITE_POLLING_INTERVAL` | Polling interval (ms) | `5000` | No |
| `VITE_USE_MOCK_DATA` | Use mock data | `true` | Yes |

## Troubleshooting

### WebApp can't connect to backend
- Check if backend is running
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for CORS errors
- Ensure backend allows CORS from webapp origin

### WebSocket not connecting
- Verify `VITE_WS_URL` is correct
- Check if backend has WebSocket support
- Look for connection errors in browser console
- Ensure firewall allows WebSocket connections

### Mock data not updating
- Check if `VITE_USE_MOCK_DATA=true`
- Verify no errors in browser console
- Check if React Query is properly configured

## Next Steps

1. **Implement Backend API**: Follow the API requirements above
2. **Setup IoT Device**: Configure device to send data to backend
3. **Test Integration**: Use Postman/curl to test API endpoints
4. **Enable WebSocket**: Implement WebSocket for real-time updates
5. **Add Authentication**: Implement JWT/OAuth for secure access
6. **Deploy**: Deploy both frontend and backend

## Support

For issues or questions:
- Check browser console for errors
- Review backend logs
- Verify environment variables
- Test API endpoints directly
