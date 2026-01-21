/**
 * Phone Sensor Screen - Camera-Based Heart Rate Detection
 * Direct camera access with automatic permission requests (NO middleware)
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { cameraHeartRateService } from '@/services/CameraHeartRateService';
import { vitalsApi } from '@/lib/api';
import { useDarkMode } from '@/contexts/DarkModeContext';

const PATIENT_ID = 'P001';

export const PhoneSensorScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastReading, setLastReading] = useState<any>(null);
  const [capabilities, setCapabilities] = useState<any>(null);

  useEffect(() => {
    checkCapabilities();
    autoRequestPermissions();
    
    return () => {
      cameraHeartRateService.stopMonitoring();
    };
  }, []);

  const autoRequestPermissions = async () => {
    console.log('🚀 Auto-requesting permissions...');
    await cameraHeartRateService.autoRequestPermissions();
    await checkCapabilities();
  };

  const checkCapabilities = async () => {
    const caps = await cameraHeartRateService.checkSensorCapabilities();
    setCapabilities(caps);
  };

  const handleGrantPermissions = async () => {
    setIsLoading(true);
    try {
      const granted = await cameraHeartRateService.autoRequestPermissions();
      if (granted) {
        await checkCapabilities();
        Alert.alert(
          '✅ Success',
          'Camera permission granted! You can now take measurements.',
          [{ text: 'OK' }]
        );
      }
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || 'Failed to request permissions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakeMeasurement = async () => {
    setIsLoading(true);
    try {
      Alert.alert(
        '📸 Place Finger on Camera',
        'Cover the back camera completely with your fingertip. Hold still for 10 seconds.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsLoading(false),
          },
          {
            text: 'Start',
            onPress: async () => {
              try {
                const reading = await cameraHeartRateService.takeMeasurement();
                setLastReading(reading);

                await vitalsApi.createFromPhone(PATIENT_ID, {
                  device_id: 'PHONE_P001',
                  heart_rate: reading.heartRate,
                  spo2: reading.spo2,
                  temperature: reading.temperature,
                  activity_context: reading.activityLevel || 'resting',
                  accuracy: reading.accuracy,
                  location_lat: reading.location?.latitude,
                  location_lng: reading.location?.longitude,
                });

                Alert.alert(
                  '✅ Complete',
                  `Heart Rate: ${reading.heartRate} bpm\nSpO2: ${reading.spo2}%\nTemp: ${reading.temperature.toFixed(1)}°C`,
                  [{ text: 'OK' }]
                );
              } catch (error: any) {
                if (error.message && error.message.includes('Camera')) {
                  Alert.alert(
                    '🔐 Camera Permission Required',
                    'Tap "Grant Permissions" button to enable camera.',
                    [{ text: 'OK' }]
                  );
                } else {
                  Alert.alert('❌ Error', error.message || 'Measurement failed');
                }
              } finally {
                setIsLoading(false);
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('❌ Error', error.message);
      setIsLoading(false);
    }
  };

  const handleToggleMonitoring = async () => {
    if (isMonitoring) {
      cameraHeartRateService.stopMonitoring();
      setIsMonitoring(false);
      Alert.alert('Monitoring Stopped', 'Continuous monitoring disabled.');
    } else {
      try {
        await cameraHeartRateService.startMonitoring(30, async (reading) => {
          setLastReading(reading);
          
          try {
            await vitalsApi.createFromPhone(PATIENT_ID, {
              device_id: 'PHONE_P001',
              heart_rate: reading.heartRate,
              spo2: reading.spo2,
              temperature: reading.temperature,
              activity_context: reading.activityLevel || 'resting',
              accuracy: reading.accuracy,
              location_lat: reading.location?.latitude,
              location_lng: reading.location?.longitude,
            });
          } catch (error: any) {
            console.error('API Error:', error?.response?.data || error.message);
          }
        });
        
        setIsMonitoring(true);
        Alert.alert(
          '📱 Monitoring Started',
          'Measuring every 30 seconds.',
          [{ text: 'OK' }]
        );
      } catch (error: any) {
        Alert.alert('❌ Error', error.message);
      }
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📸 Camera Heart Rate</Text>
        <Text style={styles.subtitle}>Direct Access • No Middleware</Text>
      </View>

      {capabilities && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Sensors</Text>
          {capabilities.error && (
            <View style={[styles.warningBanner, { backgroundColor: isDarkMode ? '#4a3000' : '#fff3cd' }]}>
              <Text style={[styles.warningText, { color: isDarkMode ? '#ffc107' : '#856404' }]}>
                ⚠️ Camera permission required
              </Text>
            </View>
          )}
          <View style={styles.capabilityList}>
            <SensorCapability name="Camera (Heart Rate)" available={capabilities.hasCamera} isDarkMode={isDarkMode} />
            <SensorCapability name="SpO2 (Estimated)" available={capabilities.hasCamera} isDarkMode={isDarkMode} />
            <SensorCapability name="Activity Tracking" available={capabilities.hasAccelerometer} isDarkMode={isDarkMode} />
            <SensorCapability name="GPS Location" available={capabilities.hasGPS} isDarkMode={isDarkMode} />
          </View>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📖 How to Measure</Text>
        <Text style={styles.instruction}>1. Cover camera lens with fingertip</Text>
        <Text style={styles.instruction}>2. Press gently and stay still</Text>
        <Text style={styles.instruction}>3. Hold for 10 seconds</Text>
        <Text style={styles.instruction}>4. Results appear automatically</Text>
        <Text style={[styles.instruction, { fontStyle: 'italic', marginTop: 8, color: isDarkMode ? '#888' : '#666' }]}>
          💡 Works on ANY Android phone!
        </Text>
      </View>

      {lastReading && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last Reading</Text>
          <View style={styles.readingRow}>
            <Text style={styles.readingLabel}>Heart Rate:</Text>
            <Text style={styles.readingValue}>{lastReading.heartRate} bpm</Text>
          </View>
          <View style={styles.readingRow}>
            <Text style={styles.readingLabel}>SpO2:</Text>
            <Text style={styles.readingValue}>{lastReading.spo2}%</Text>
          </View>
          <View style={styles.readingRow}>
            <Text style={styles.readingLabel}>Temperature:</Text>
            <Text style={styles.readingValue}>{lastReading.temperature.toFixed(1)}°C</Text>
          </View>
          <View style={styles.readingRow}>
            <Text style={styles.readingLabel}>Accuracy:</Text>
            <Text style={styles.readingValue}>{Math.round(lastReading.accuracy * 100)}%</Text>
          </View>
          <Text style={styles.timestamp}>
            {new Date(lastReading.timestamp).toLocaleString()}
          </Text>
        </View>
      )}

      {capabilities && capabilities.error && (
        <TouchableOpacity
          style={[styles.button, styles.warningButton]}
          onPress={handleGrantPermissions}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🔐 Grant Permissions</Text>
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleTakeMeasurement}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>📊 Take Measurement</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isMonitoring ? styles.dangerButton : styles.secondaryButton]}
        onPress={handleToggleMonitoring}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isMonitoring ? '⏹️ Stop Monitoring' : '▶️ Start Monitoring'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>💡 Best results in good lighting when resting</Text>
        <Text style={[styles.footerText, { marginTop: 8, fontWeight: '600' }]}>
          📸 Camera-based • No middleware • Universal
        </Text>
      </View>
    </ScrollView>
  );
};

const SensorCapability = ({
  name,
  available,
  isDarkMode,
}: {
  name: string;
  available: boolean;
  isDarkMode: boolean;
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
    <Text style={{ fontSize: 20, marginRight: 8 }}>{available ? '✅' : '❌'}</Text>
    <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 16 }}>{name}</Text>
  </View>
);

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
      padding: 16,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: isDarkMode ? '#aaa' : '#666',
    },
    card: {
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 12,
    },
    warningBanner: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#ffc107',
    },
    warningText: {
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    capabilityList: {
      marginTop: 8,
    },
    instruction: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#333',
      marginVertical: 4,
      paddingLeft: 8,
    },
    readingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 6,
    },
    readingLabel: {
      fontSize: 16,
      color: isDarkMode ? '#aaa' : '#666',
    },
    readingValue: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    timestamp: {
      fontSize: 12,
      color: isDarkMode ? '#888' : '#999',
      marginTop: 8,
      textAlign: 'center',
    },
    button: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: '#007AFF',
    },
    secondaryButton: {
      backgroundColor: '#34C759',
    },
    dangerButton: {
      backgroundColor: '#FF3B30',
    },
    warningButton: {
      backgroundColor: '#FF9500',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    footer: {
      marginTop: 20,
      marginBottom: 40,
      padding: 16,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      borderRadius: 12,
    },
    footerText: {
      fontSize: 14,
      color: isDarkMode ? '#aaa' : '#666',
      textAlign: 'center',
    },
  });

export default PhoneSensorScreen;
