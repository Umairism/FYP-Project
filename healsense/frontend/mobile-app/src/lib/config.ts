// API Configuration for React Native
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
const WS_URL = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:5000/ws';
const POLLING_INTERVAL = parseInt(process.env.EXPO_PUBLIC_POLLING_INTERVAL || '5000');
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

// Debug: Log configuration on load
console.log('📡 API Configuration:');
console.log('  Base URL:', API_BASE_URL);
console.log('  WS URL:', WS_URL);
console.log('  Polling Interval:', POLLING_INTERVAL);
console.log('  Use Mock Data:', USE_MOCK_DATA);

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  wsUrl: WS_URL,
  pollingInterval: POLLING_INTERVAL,
  useMockData: USE_MOCK_DATA,
};

// API Endpoints
export const API_ENDPOINTS = {
  patient: (id: string) => `/patients/${id}`,
  patientProfile: (id: string) => `/patients/${id}/profile`,
  vitals: (patientId: string) => `/patients/${patientId}/vitals`,
  latestVital: (patientId: string) => `/patients/${patientId}/vitals/latest`,
  vitalHistory: (patientId: string, minutes: number) => 
    `/patients/${patientId}/vitals/history?minutes=${minutes}`,
  alerts: (patientId: string) => `/patients/${patientId}/alerts`,
  acknowledgeAlert: (alertId: string) => `/alerts/${alertId}/acknowledge`,
  dismissAlert: (alertId: string) => `/alerts/${alertId}/dismiss`,
  emergency: (patientId: string) => `/patients/${patientId}/emergency`,
  deviceStatus: (deviceId: string) => `/devices/${deviceId}/status`,
  deviceConnect: (deviceId: string) => `/devices/${deviceId}/connect`,
};

// WebSocket Topics
export const WS_TOPICS = {
  vitals: (patientId: string) => `vitals/${patientId}`,
  alerts: (patientId: string) => `alerts/${patientId}`,
  device: (deviceId: string) => `device/${deviceId}`,
};
