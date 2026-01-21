import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '@/lib/config';
import { vitalsApi, alertsApi } from '@/lib/api';
import { VitalReading, DEFAULT_THRESHOLDS, VitalStatus, Alert } from '@/types/vitals';

// Mock data generators
const generateVitalReading = (prevReading?: VitalReading): VitalReading => {
  const vary = (value: number, range: number) => {
    return Math.max(0, value + (Math.random() - 0.5) * range);
  };

  const base = prevReading || {
    heartRate: 72,
    spo2: 98,
    temperature: 36.6,
    systolic: 120,
    diastolic: 80,
    respiratoryRate: 16,
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    heartRate: Math.round(vary(base.heartRate, 8)),
    spo2: Math.min(100, Math.max(88, Math.round(vary(base.spo2, 2)))),
    temperature: Number(vary(base.temperature, 0.3).toFixed(1)),
    systolic: Math.round(vary(base.systolic, 10)),
    diastolic: Math.round(vary(base.diastolic, 6)),
    respiratoryRate: Math.round(vary(base.respiratoryRate, 3)),
  };
};

const generateHistoricalData = (minutes: number): VitalReading[] => {
  const data: VitalReading[] = [];
  let current: VitalReading | undefined;

  for (let i = minutes; i >= 0; i--) {
    current = generateVitalReading(current);
    current.timestamp = new Date(Date.now() - i * 60 * 1000);
    data.push(current);
  }

  return data;
};

export const getVitalStatus = (
  vital: keyof typeof DEFAULT_THRESHOLDS,
  value: number
): VitalStatus => {
  const thresholds = DEFAULT_THRESHOLDS[vital];

  if (vital === 'spo2') {
    const spo2Thresholds = thresholds as typeof DEFAULT_THRESHOLDS.spo2;
    if (value < spo2Thresholds.min) return 'critical';
    if (value < spo2Thresholds.warningMin) return 'warning';
    return 'normal';
  }

  const rangeThresholds = thresholds as typeof DEFAULT_THRESHOLDS.heartRate;
  if (value < rangeThresholds.min || value > rangeThresholds.max) return 'critical';
  if (value < rangeThresholds.warningMin || value > rangeThresholds.warningMax) return 'warning';
  return 'normal';
};

interface UseVitalsOptions {
  patientId: string;
  useMockData?: boolean;
}

export const useVitals = ({ patientId, useMockData = API_CONFIG.useMockData }: UseVitalsOptions) => {
  const [readings, setReadings] = useState<VitalReading[]>(() =>
    useMockData ? generateHistoricalData(60) : []
  );
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currentReading = readings[readings.length - 1];

  // Fetch historical vitals on mount
  useEffect(() => {
    if (useMockData) return;

    const fetchHistoricalData = async () => {
      try {
        setIsLoading(true);
        const data = await vitalsApi.getHistory(patientId, 60);
        setReadings(data);
      } catch (error) {
        console.error('Failed to fetch vitals history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [patientId, useMockData]);

  // Fetch alerts on mount
  useEffect(() => {
    if (useMockData) return;

    const fetchAlerts = async () => {
      try {
        const data = await alertsApi.getAll(patientId);
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    fetchAlerts();
  }, [patientId, useMockData]);

  const checkForAlerts = useCallback((reading: VitalReading) => {
    const vitalTypes: (keyof typeof DEFAULT_THRESHOLDS)[] = [
      'heartRate', 'spo2', 'temperature', 'systolic', 'diastolic', 'respiratoryRate'
    ];

    const newAlerts: Alert[] = [];

    vitalTypes.forEach((vital) => {
      const value = reading[vital];
      const status = getVitalStatus(vital, value);

      if (status !== 'normal') {
        newAlerts.push({
          id: Math.random().toString(36).substr(2, 9),
          type: status,
          vitalType: vital,
          value,
          threshold: status === 'critical' ? 'Critical' : 'Warning',
          timestamp: new Date(),
          acknowledged: false,
        });
      }
    });

    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, 50));
    }
  }, []);

  const acknowledgeAlert = useCallback(async (alertId: string) => {
    if (!useMockData) {
      try {
        await alertsApi.acknowledge(alertId);
      } catch (error) {
        console.error('Failed to acknowledge alert:', error);
      }
    }

    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  }, [useMockData]);

  const dismissAlert = useCallback(async (alertId: string) => {
    if (!useMockData) {
      try {
        await alertsApi.dismiss(alertId);
      } catch (error) {
        console.error('Failed to dismiss alert:', error);
      }
    }

    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  }, [useMockData]);

  // Mock data polling
  useEffect(() => {
    if (!useMockData) return;

    const interval = setInterval(() => {
      const newReading = generateVitalReading(readings[readings.length - 1]);
      setReadings((prev) => {
        const updated = [...prev, newReading];
        return updated.slice(-60);
      });
      checkForAlerts(newReading);
    }, API_CONFIG.pollingInterval);

    return () => clearInterval(interval);
  }, [readings, checkForAlerts, useMockData]);

  // API polling
  useEffect(() => {
    if (useMockData) return;

    const interval = setInterval(async () => {
      try {
        console.log(`📡 Fetching vitals from: ${API_CONFIG.baseUrl}/patients/${patientId}/vitals/latest`);
        const latestReading = await vitalsApi.getLatest(patientId);
        console.log('✅ Vitals fetched successfully:', latestReading);
        setReadings((prev) => {
          const updated = [...prev, latestReading];
          return updated.slice(-60);
        });
        checkForAlerts(latestReading);
        setIsConnected(true);
      } catch (error) {
        console.error('❌ Failed to fetch latest vitals:', error);
        console.error('   API URL:', API_CONFIG.baseUrl);
        if (error instanceof Error) {
          console.error('   Error message:', error.message);
          console.error('   Error stack:', error.stack);
        }
        setIsConnected(false);
      }
    }, API_CONFIG.pollingInterval);

    return () => clearInterval(interval);
  }, [patientId, checkForAlerts, useMockData]);

  return {
    currentReading,
    readings,
    alerts,
    isConnected,
    isLoading,
    acknowledgeAlert,
    dismissAlert,
  };
};
