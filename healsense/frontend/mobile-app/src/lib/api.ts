import axios, { AxiosInstance } from 'axios';
import { API_CONFIG, API_ENDPOINTS } from './config';
import { VitalReading, PatientProfile, Alert } from '@/types/vitals';
import { ApiResponse, VitalReadingRequest, EmergencyRequest } from '@/types/api';

// API Client
class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.get<ApiResponse<T>>(endpoint);
      return response.data.data;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this.client.post<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await this.client.put<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(endpoint);
      return response.data.data;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
}

const apiClient = new ApiClient(API_CONFIG.baseUrl);

// Patient API
export const patientApi = {
  getProfile: async (patientId: string): Promise<PatientProfile> => {
    return apiClient.get<PatientProfile>(API_ENDPOINTS.patientProfile(patientId));
  },
};

// Vitals API
export const vitalsApi = {
  getLatest: async (patientId: string): Promise<VitalReading> => {
    return apiClient.get<VitalReading>(API_ENDPOINTS.latestVital(patientId));
  },

  getHistory: async (patientId: string, minutes: number = 60): Promise<VitalReading[]> => {
    return apiClient.get<VitalReading[]>(API_ENDPOINTS.vitalHistory(patientId, minutes));
  },

  submit: async (reading: VitalReadingRequest): Promise<VitalReading> => {
    return apiClient.post<VitalReading>(
      API_ENDPOINTS.vitals(reading.patientId),
      reading
    );
  },
};

// Alerts API
export const alertsApi = {
  getAll: async (patientId: string): Promise<Alert[]> => {
    return apiClient.get<Alert[]>(API_ENDPOINTS.alerts(patientId));
  },

  acknowledge: async (alertId: string): Promise<Alert> => {
    return apiClient.post<Alert>(API_ENDPOINTS.acknowledgeAlert(alertId), {});
  },

  dismiss: async (alertId: string): Promise<void> => {
    return apiClient.delete<void>(API_ENDPOINTS.dismissAlert(alertId));
  },
};

// Emergency API
export const emergencyApi = {
  trigger: async (request: EmergencyRequest): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.emergency(request.patientId), request);
  },
};

// Device API
export const deviceApi = {
  getStatus: async (deviceId: string): Promise<{ connected: boolean; lastSeen: Date }> => {
    return apiClient.get<{ connected: boolean; lastSeen: Date }>(
      API_ENDPOINTS.deviceStatus(deviceId)
    );
  },

  connect: async (deviceId: string): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.deviceConnect(deviceId), {});
  },
};
