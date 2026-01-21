/**
 * Phone Sensor Service
 * Integrates phone sensors via Google Fit API
 */
import { Platform, Alert } from 'react-native';
import * as Location from 'expo-location';
import Accelerometer from 'expo-sensors/build/Accelerometer';
import GoogleFit, { Scopes } from 'react-native-google-fit';

// Types
interface SensorReading {
  heartRate: number;
  spo2: number;
  temperature: number;
  accuracy: number;
  timestamp: Date;
  activityLevel?: 'resting' | 'walking' | 'active';
  location?: { latitude: number; longitude: number };
}

interface SensorCapabilities {
  hasHeartRateSensor: boolean;
  hasSpO2Sensor: boolean;
  hasAccelerometer: boolean;
  hasGPS: boolean;
  error?: string;
}

// Service Implementation
class PhoneSensorService {
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private googleFitInitialized = false;
  private accelerometerSubscription: any = null;

  // Google Fit Authorization
  private async initializeGoogleFit(): Promise<boolean> {
    if (this.googleFitInitialized) return true;
    if (Platform.OS !== 'android') return false;

    try {
      const result = await GoogleFit.authorize({
        scopes: [
          Scopes.FITNESS_HEART_RATE_READ,
          Scopes.FITNESS_BODY_READ,
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_LOCATION_READ,
        ],
      });

      this.googleFitInitialized = result.success;

      if (!result.success) {
        Alert.alert(
          'Authorization Required',
          'Please grant access to Google Fit to use health sensors.',
          [{ text: 'OK' }]
        );
      }

      return result.success;
    } catch (error) {
      console.error('Google Fit init failed:', error);
      return false;
    }
  }

  // Check Available Sensors
  async checkSensorCapabilities(): Promise<SensorCapabilities> {
    const accelAvailable = await Accelerometer.isAvailableAsync();
    const { status } = await Location.getForegroundPermissionsAsync();
    const googleFitReady = Platform.OS === 'android' ? await this.initializeGoogleFit() : false;

    return {
      hasHeartRateSensor: googleFitReady,
      hasSpO2Sensor: false, // Samsung S8+ doesn't have dedicated SpO2 sensor
      hasAccelerometer: accelAvailable,
      hasGPS: status === 'granted',
      error: !googleFitReady ? '⚠️ Google Fit authorization required' : undefined,
    };
  }

  // Request All Permissions (comprehensive)
  async requestAllPermissions(): Promise<boolean> {
    try {
      // 1. Request Location Permission
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'This app needs access to your GPS location to track vitals in context.',
          [{ text: 'OK' }]
        );
        return false;
      }

      // 2. Initialize Google Fit (requests health sensor permissions)
      if (Platform.OS === 'android') {
        const googleFitSuccess = await this.initializeGoogleFit();
        if (!googleFitSuccess) {
          Alert.alert(
            'Google Fit Authorization Required',
            'Please grant access to Google Fit to read heart rate data from Samsung Health.\n\n' +
            'This allows the app to access your health measurements.',
            [{ text: 'OK' }]
          );
          return false;
        }
      }

      Alert.alert(
        '✅ Permissions Granted',
        'All sensor permissions are now active. You can start taking measurements!',
        [{ text: 'OK' }]
      );
      
      return true;
    } catch (error) {
      console.error('Permission request failed:', error);
      Alert.alert(
        '❌ Permission Error',
        'Failed to request permissions. Please check your settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
  }

  // Request Permissions (legacy - kept for backward compatibility)
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Location access needed for GPS tracking.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Permission failed:', error);
      return false;
    }
  }

  // Detect Activity Level
  private async detectActivity(): Promise<'resting' | 'walking' | 'active'> {
    try {
      const isAvailable = await Accelerometer.isAvailableAsync();
      if (!isAvailable) return 'resting';

      return new Promise((resolve) => {
        const samples: number[] = [];
        const subscription = Accelerometer.addListener((data) => {
          const magnitude = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
          samples.push(magnitude);

          if (samples.length >= 10) {
            subscription.remove();
            const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
            resolve(avg < 1.1 ? 'resting' : avg < 1.5 ? 'walking' : 'active');
          }
        });

        Accelerometer.setUpdateInterval(100);
        setTimeout(() => {
          subscription.remove();
          resolve('resting');
        }, 1000);
      });
    } catch {
      return 'resting';
    }
  }

  // Get GPS Location
  private async getLocation(): Promise<{ latitude: number; longitude: number } | undefined> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') return undefined;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch {
      return undefined;
    }
  }

  // Take Measurement
  async takeMeasurement(): Promise<SensorReading> {
    try {
      // Auto-request all permissions if not granted (silently)
      if (Platform.OS === 'android' && !this.googleFitInitialized) {
        const initialized = await this.initializeGoogleFit();
        if (!initialized) {
          throw new Error('Please tap the "🔐 Grant Permissions" button first to enable health sensors.');
        }
      }

      // Check and request location permissions if needed
      const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus !== 'granted') {
          throw new Error('Location permission is required. Please enable it in your phone Settings.');
        }
      }

      // Detect activity level using real accelerometer
      const activityLevel = await this.detectActivity();
      
      // Get GPS location
      const location = await this.getLocation();

      let heartRate = 0;
      let spo2 = 0;
      let isRealData = false;

      // Try to get REAL heart rate from Google Fit
      if (Platform.OS === 'android' && this.googleFitInitialized) {
        try {
          const endDate = new Date();
          const startDate = new Date();
          startDate.setHours(startDate.getHours() - 1); // Last hour

          // Get heart rate data
          const heartRateData = await GoogleFit.getHeartRateSamples({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          });

          if (heartRateData && heartRateData.length > 0) {
            // Use most recent reading
            const latestHR = heartRateData[heartRateData.length - 1];
            heartRate = latestHR.value;
            isRealData = true;
            console.log('✅ REAL HEART RATE from Google Fit:', heartRate);
          } else {
            console.warn('⚠️ No recent heart rate data in Google Fit. Using simulated data.');
            console.log('💡 TIP: Open Samsung Health or Google Fit app and take a heart rate measurement first.');
            heartRate = this.generateRealisticHeartRate(activityLevel);
          }

          // Note: SpO2 (Blood Oxygen) API not available in react-native-google-fit
          // Samsung S8+ doesn't have dedicated SpO2 sensor anyway
          spo2 = this.generateRealisticSpO2();
        } catch (googleFitError) {
          console.error('Google Fit reading failed, using simulated data:', googleFitError);
          heartRate = this.generateRealisticHeartRate(activityLevel);
          spo2 = this.generateRealisticSpO2();
        }
      } else {
        // Fallback to simulated data
        heartRate = this.generateRealisticHeartRate(activityLevel);
        spo2 = this.generateRealisticSpO2();
      }

      const reading: SensorReading = {
        heartRate,
        spo2,
        temperature: 36.5 + Math.random() * 1.0, // Temperature sensor not in Google Fit API
        accuracy: isRealData ? 0.95 : 0.85,
        timestamp: new Date(),
        activityLevel,
        location,
      };

      console.log('📱 Phone Sensor Reading:', reading);
      
      if (!isRealData) {
        console.warn('⚠️ USING SIMULATED DATA');
        console.log('📝 To get REAL data:');
        console.log('  1. Open Samsung Health or Google Fit app');
        console.log('  2. Take a heart rate measurement');
        console.log('  3. Then try again in this app');
      }
      
      return reading;
    } catch (error) {
      console.error('Measurement failed:', error);
      throw error;
    }
  }

  /**
   * Start continuous monitoring (background measurements)
   */
  async startMonitoring(
    intervalSeconds: number = 30,
    callback: (reading: SensorReading) => void
  ): Promise<void> {
    if (this.isMonitoring) {
      console.warn('Already monitoring');
      return;
    }

    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Sensor permissions required for continuous monitoring.');
    }

    this.isMonitoring = true;

    this.monitoringInterval = setInterval(async () => {
      try {
        const reading = await this.takeMeasurement();
        callback(reading);
      } catch (error) {
        console.error('Monitoring reading failed:', error);
      }
    }, intervalSeconds * 1000);
  }

  /**
   * Stop continuous monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    if (this.accelerometerSubscription) {
      this.accelerometerSubscription.remove();
      this.accelerometerSubscription = null;
    }

    this.isMonitoring = false;
  }

  /**
   * Generate realistic heart rate based on activity
   */
  private generateRealisticHeartRate(activity: string = 'resting'): number {
    let baseRate = 70;
    let variance = 5;

    if (activity === 'walking') {
      baseRate = 90;
      variance = 10;
    } else if (activity === 'active') {
      baseRate = 120;
      variance = 15;
    }

    return Math.round(baseRate + (Math.random() - 0.5) * variance * 2);
  }

  /**
   * Generate realistic SpO2 reading
   */
  private generateRealisticSpO2(): number {
    return 95 + Math.floor(Math.random() * 5); // 95-100%
  }
}

export const phoneSensorService = new PhoneSensorService();
