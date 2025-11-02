# 📱 HealSense Mobile App - Architecture & Implementation Guide

**Project:** HealSense IoT + AI Health Monitoring System  
**Platform:** Flutter (iOS + Android)  
**Last Updated:** November 2, 2025

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Why Mobile-First?](#why-mobile-first)
3. [Technology Stack](#technology-stack)
4. [App Architecture](#app-architecture)
5. [Features & Screens](#features--screens)
6. [Bluetooth Integration](#bluetooth-integration)
7. [WhatsApp Integration](#whatsapp-integration)
8. [Push Notifications](#push-notifications)
9. [State Management](#state-management)
10. [Local Database](#local-database)
11. [API Integration](#api-integration)
12. [UI/UX Design](#uiux-design)
13. [Implementation Roadmap](#implementation-roadmap)

---

## 🎯 Overview

HealSense mobile app is the **primary user interface** for the health monitoring system. It provides:
- **Direct Bluetooth connection** to ESP32/Arduino sensors
- **Real-time vital signs monitoring** with beautiful charts
- **WhatsApp emergency alerts** to family members and doctors
- **Push notifications** for critical health conditions
- **Offline mode** with local data storage
- **Cross-platform** support (iOS + Android with single codebase)

---

## 🚀 Why Mobile-First?

### ✅ Advantages Over Web App

| Feature | Mobile App | Web App |
|---------|------------|---------|
| **Hardware Access** | ✅ Direct Bluetooth/BLE | ❌ Limited (Web Bluetooth unreliable) |
| **Notifications** | ✅ Native push notifications | ⚠️ Limited (requires browser open) |
| **Offline Mode** | ✅ Full offline capability | ⚠️ Limited offline support |
| **Portability** | ✅ Always with user | ❌ Requires PC/laptop |
| **WhatsApp Integration** | ✅ Native deep linking | ⚠️ Opens browser |
| **Sensors** | ✅ GPS, Camera, Accelerometer | ⚠️ Limited access |
| **User Experience** | ✅ Native feel, smooth | ⚠️ Browser-dependent |
| **Battery Efficiency** | ✅ Background services | ❌ High battery drain |
| **App Store Presence** | ✅ Professional credibility | ❌ Not applicable |

### 🏥 Healthcare-Specific Benefits

1. **Elderly-Friendly:** Larger touch targets, simpler navigation
2. **Emergency Access:** Quick access even from lock screen
3. **Voice Commands:** Hands-free operation for patients
4. **Camera Integration:** QR code scanning for medication, patient ID
5. **Family Monitoring:** Parents can monitor children/elderly relatives remotely

---

## 🛠️ Technology Stack

### Core Framework
```yaml
Framework: Flutter 3.16+
Language: Dart 3.0+
Platforms: iOS 13+, Android 8.0+ (API 26+)
```

### Key Dependencies

```yaml
# State Management
riverpod: ^2.4.0              # Modern state management
flutter_riverpod: ^2.4.0      # Riverpod for Flutter

# Networking & API
dio: ^5.3.0                    # HTTP client
retrofit: ^4.0.0               # Type-safe API client
json_annotation: ^4.8.0        # JSON serialization

# Bluetooth Communication
flutter_blue_plus: ^1.14.0     # BLE connectivity
permission_handler: ^11.0.0    # Bluetooth permissions

# Local Database
sqflite: ^2.3.0                # SQLite database
hive: ^2.2.3                   # NoSQL database (alternative)
shared_preferences: ^2.2.0     # Key-value storage

# Push Notifications
firebase_core: ^2.17.0         # Firebase initialization
firebase_messaging: ^14.7.0    # FCM push notifications
flutter_local_notifications: ^15.1.0  # Local notifications

# UI & Visualization
fl_chart: ^0.64.0              # Beautiful charts
syncfusion_flutter_charts: ^23.1.0  # Advanced charts (optional)
lottie: ^2.6.0                 # Animations
cached_network_image: ^3.3.0   # Image caching

# Communication
url_launcher: ^6.2.0           # WhatsApp/Phone integration
share_plus: ^7.2.0             # Share reports

# Utilities
intl: ^0.18.0                  # Internationalization
timeago: ^3.5.0                # Time formatting
qr_code_scanner: ^1.0.0        # QR code scanning
image_picker: ^1.0.0           # Camera access
connectivity_plus: ^5.0.0      # Network status

# Security
flutter_secure_storage: ^9.0.0  # Secure credential storage

# PDF Generation
pdf: ^3.10.0                   # Generate health reports
printing: ^5.11.0              # Print/share PDFs
```

---

## 🏗️ App Architecture

### Clean Architecture with MVVM

```
lib/
├── main.dart                          # App entry point
├── app/
│   ├── app.dart                       # Main app widget
│   ├── routes.dart                    # Navigation routes
│   └── theme.dart                     # App theme
│
├── core/                              # Core functionality
│   ├── constants/
│   │   ├── api_constants.dart         # API endpoints
│   │   ├── app_constants.dart         # App constants
│   │   └── bluetooth_constants.dart   # BLE UUIDs
│   ├── utils/
│   │   ├── validators.dart            # Input validators
│   │   ├── formatters.dart            # Data formatters
│   │   └── logger.dart                # Logging utility
│   └── errors/
│       ├── exceptions.dart            # Custom exceptions
│       └── failures.dart              # Failure classes
│
├── data/                              # Data layer
│   ├── models/                        # Data models
│   │   ├── vital_signs.dart           # Vital signs model
│   │   ├── patient.dart               # Patient model
│   │   ├── prediction.dart            # ML prediction model
│   │   └── alert.dart                 # Alert model
│   ├── datasources/
│   │   ├── local/
│   │   │   ├── database_helper.dart   # SQLite helper
│   │   │   └── cache_manager.dart     # Cache management
│   │   └── remote/
│   │       ├── api_client.dart        # API client
│   │       └── endpoints.dart         # API endpoints
│   └── repositories/
│       ├── vital_signs_repository.dart
│       ├── auth_repository.dart
│       └── bluetooth_repository.dart
│
├── domain/                            # Business logic layer
│   ├── entities/                      # Business entities
│   │   ├── vital_signs_entity.dart
│   │   └── patient_entity.dart
│   ├── usecases/                      # Use cases
│   │   ├── connect_bluetooth.dart
│   │   ├── fetch_vital_signs.dart
│   │   ├── send_whatsapp_alert.dart
│   │   └── predict_health_status.dart
│   └── repositories/                  # Repository interfaces
│       └── ivital_signs_repository.dart
│
├── presentation/                      # UI layer
│   ├── screens/
│   │   ├── splash/
│   │   │   ├── splash_screen.dart
│   │   │   └── splash_provider.dart
│   │   ├── auth/
│   │   │   ├── login_screen.dart
│   │   │   ├── register_screen.dart
│   │   │   └── auth_provider.dart
│   │   ├── home/
│   │   │   ├── home_screen.dart
│   │   │   ├── home_provider.dart
│   │   │   └── widgets/
│   │   │       ├── vital_card.dart
│   │   │       └── quick_actions.dart
│   │   ├── monitoring/
│   │   │   ├── real_time_monitoring_screen.dart
│   │   │   ├── monitoring_provider.dart
│   │   │   └── widgets/
│   │   │       ├── heart_rate_chart.dart
│   │   │       ├── spo2_gauge.dart
│   │   │       └── temperature_indicator.dart
│   │   ├── bluetooth/
│   │   │   ├── device_scan_screen.dart
│   │   │   ├── device_connect_screen.dart
│   │   │   └── bluetooth_provider.dart
│   │   ├── history/
│   │   │   ├── history_screen.dart
│   │   │   ├── history_provider.dart
│   │   │   └── widgets/
│   │   │       └── history_chart.dart
│   │   ├── alerts/
│   │   │   ├── alerts_screen.dart
│   │   │   ├── alert_settings_screen.dart
│   │   │   └── alerts_provider.dart
│   │   ├── emergency/
│   │   │   ├── emergency_contacts_screen.dart
│   │   │   └── emergency_provider.dart
│   │   ├── settings/
│   │   │   ├── settings_screen.dart
│   │   │   └── settings_provider.dart
│   │   └── profile/
│   │       ├── profile_screen.dart
│   │       └── profile_provider.dart
│   │
│   ├── widgets/                       # Reusable widgets
│   │   ├── custom_button.dart
│   │   ├── vital_sign_card.dart
│   │   ├── chart_widget.dart
│   │   ├── loading_indicator.dart
│   │   └── error_widget.dart
│   │
│   └── theme/
│       ├── app_colors.dart
│       ├── app_text_styles.dart
│       └── app_dimensions.dart
│
├── services/                          # Platform services
│   ├── bluetooth_service.dart         # BLE communication
│   ├── notification_service.dart      # Push notifications
│   ├── whatsapp_service.dart          # WhatsApp integration
│   ├── location_service.dart          # GPS location
│   └── background_service.dart        # Background tasks
│
└── config/
    ├── app_config.dart                # App configuration
    └── environment.dart               # Environment variables
```

---

## 📱 Features & Screens

### 1. **Splash Screen**
- App logo with animation
- Check authentication status
- Initialize services (Bluetooth, Firebase)

### 2. **Authentication**
- **Login:** Email/password or biometric (fingerprint/face)
- **Register:** Patient registration with medical history
- **Forgot Password:** Email reset link

### 3. **Home Dashboard**
- **Quick Stats:** Latest vital signs in cards
- **Status Indicator:** Overall health status (Normal/Warning/Critical)
- **Quick Actions:**
  - Start Monitoring
  - Connect Bluetooth Device
  - Emergency SOS
  - View History

### 4. **Real-Time Monitoring**
- **Live Charts:**
  - Heart Rate: Line chart with BPM
  - SpO2: Gauge chart (0-100%)
  - Temperature: Thermometer visual
  - Blood Pressure: Systolic/Diastolic bars
- **Alert Indicators:** Visual/audio alerts for abnormal values
- **Recording Controls:** Start/Stop/Pause monitoring

### 5. **Bluetooth Device Management**
- **Scan for Devices:** List of nearby BLE devices
- **Device Details:** Signal strength, battery level
- **Connect/Disconnect:** Manage sensor connections
- **Device Settings:** Update sensor configuration

### 6. **History & Analytics**
- **Date Range Selector:** Daily/Weekly/Monthly/Custom
- **Trend Charts:** Historical data visualization
- **Export Report:** Generate PDF/Excel reports
- **Share:** Share reports via WhatsApp/Email

### 7. **Alerts & Notifications**
- **Alert History:** List of past alerts
- **Alert Settings:**
  - Customize thresholds (HR, SpO2, Temp, BP)
  - Notification preferences (Push, WhatsApp, SMS)
  - Emergency contacts configuration
- **Silent Mode:** Disable notifications temporarily

### 8. **Emergency Contacts**
- **Add Contacts:** Family members, doctors
- **Contact Cards:** Name, relation, phone, WhatsApp
- **Quick Actions:** Call, WhatsApp, SMS buttons
- **Auto-Alert Settings:** Auto-send alerts on critical conditions

### 9. **Profile & Settings**
- **Patient Profile:** Name, age, gender, medical history
- **App Settings:**
  - Language selection
  - Theme (Light/Dark mode)
  - Units (Metric/Imperial)
  - Notification sound
- **Privacy Settings:** Data sharing preferences
- **About:** App version, terms, privacy policy

### 10. **AI Predictions**
- **Health Risk Score:** 0-100 risk indicator
- **Prediction Details:** Disease probability breakdown
- **Recommendations:** Personalized health tips
- **Trend Analysis:** Predict future health trends

---

## 🔵 Bluetooth Integration

### BLE Architecture

```dart
// services/bluetooth_service.dart
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class BluetoothService {
  static final BluetoothService _instance = BluetoothService._internal();
  factory BluetoothService() => _instance;
  BluetoothService._internal();

  // BLE UUIDs (match Arduino/ESP32)
  static const String SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  static const String HEART_RATE_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
  static const String SPO2_CHAR_UUID = "1c95d5e3-d8f7-413a-bf3d-7a2e5d7be87e";
  static const String TEMP_CHAR_UUID = "7d19c5e4-4b1a-4b3f-8c0e-9d2f4a5b6c7d";

  BluetoothDevice? connectedDevice;
  Stream<List<int>>? heartRateStream;
  Stream<List<int>>? spo2Stream;
  Stream<List<int>>? tempStream;

  // Scan for BLE devices
  Future<List<ScanResult>> scanForDevices({Duration timeout = const Duration(seconds: 10)}) async {
    List<ScanResult> results = [];
    
    // Start scanning
    await FlutterBluePlus.startScan(timeout: timeout);
    
    // Listen to scan results
    await for (List<ScanResult> scanResults in FlutterBluePlus.scanResults) {
      results = scanResults;
      if (results.isNotEmpty) break;
    }
    
    // Stop scanning
    await FlutterBluePlus.stopScan();
    
    return results;
  }

  // Connect to device
  Future<bool> connectToDevice(BluetoothDevice device) async {
    try {
      await device.connect(timeout: Duration(seconds: 15));
      connectedDevice = device;
      
      // Discover services
      List<BluetoothService> services = await device.discoverServices();
      
      // Find HealSense service
      for (BluetoothService service in services) {
        if (service.uuid.toString() == SERVICE_UUID) {
          // Setup characteristic streams
          for (BluetoothCharacteristic char in service.characteristics) {
            await char.setNotifyValue(true);
            
            if (char.uuid.toString() == HEART_RATE_CHAR_UUID) {
              heartRateStream = char.value;
            } else if (char.uuid.toString() == SPO2_CHAR_UUID) {
              spo2Stream = char.value;
            } else if (char.uuid.toString() == TEMP_CHAR_UUID) {
              tempStream = char.value;
            }
          }
        }
      }
      
      return true;
    } catch (e) {
      print("Connection error: $e");
      return false;
    }
  }

  // Disconnect device
  Future<void> disconnect() async {
    if (connectedDevice != null) {
      await connectedDevice!.disconnect();
      connectedDevice = null;
    }
  }

  // Listen to heart rate data
  Stream<int> getHeartRateStream() {
    return heartRateStream!.map((data) {
      // Parse bytes to integer (BPM)
      return data[0];
    });
  }

  // Listen to SpO2 data
  Stream<int> getSpO2Stream() {
    return spo2Stream!.map((data) {
      return data[0];
    });
  }

  // Listen to temperature data
  Stream<double> getTemperatureStream() {
    return tempStream!.map((data) {
      // Convert bytes to temperature (2 bytes, IEEE 754 float)
      int rawValue = (data[0] << 8) | data[1];
      return rawValue / 100.0;
    });
  }
}
```

### ESP32 BLE Server (Arduino Code)

```cpp
// hardware/arduino/ble_server/ble_server.ino
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <MAX30100_PulseOximeter.h>
#include <Adafruit_MLX90614.h>

// BLE UUIDs (must match Flutter app)
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define HR_CHAR_UUID        "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define SPO2_CHAR_UUID      "1c95d5e3-d8f7-413a-bf3d-7a2e5d7be87e"
#define TEMP_CHAR_UUID      "7d19c5e4-4b1a-4b3f-8c0e-9d2f4a5b6c7d"

BLEServer* pServer = NULL;
BLECharacteristic* pHRCharacteristic = NULL;
BLECharacteristic* pSpO2Characteristic = NULL;
BLECharacteristic* pTempCharacteristic = NULL;

PulseOximeter pox;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

bool deviceConnected = false;

class ServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        deviceConnected = true;
        Serial.println("Device connected");
    }
    
    void onDisconnect(BLEServer* pServer) {
        deviceConnected = false;
        Serial.println("Device disconnected");
        // Restart advertising
        BLEDevice::startAdvertising();
    }
};

void setup() {
    Serial.begin(115200);
    
    // Initialize sensors
    Wire.begin();
    pox.begin();
    mlx.begin();
    
    // Initialize BLE
    BLEDevice::init("HealSense-ESP32");
    
    // Create BLE Server
    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new ServerCallbacks());
    
    // Create BLE Service
    BLEService *pService = pServer->createService(SERVICE_UUID);
    
    // Create BLE Characteristics
    pHRCharacteristic = pService->createCharacteristic(
        HR_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pHRCharacteristic->addDescriptor(new BLE2902());
    
    pSpO2Characteristic = pService->createCharacteristic(
        SPO2_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pSpO2Characteristic->addDescriptor(new BLE2902());
    
    pTempCharacteristic = pService->createCharacteristic(
        TEMP_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pTempCharacteristic->addDescriptor(new BLE2902());
    
    // Start service
    pService->start();
    
    // Start advertising
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
    
    Serial.println("BLE Server ready. Waiting for connection...");
}

void loop() {
    pox.update();
    
    if (deviceConnected) {
        // Read vital signs
        float heartRate = pox.getHeartRate();
        float spO2 = pox.getSpO2();
        float bodyTemp = mlx.readObjectTempC();
        
        // Send data via BLE
        if (heartRate > 40 && heartRate < 200) {
            uint8_t hrValue = (uint8_t)heartRate;
            pHRCharacteristic->setValue(&hrValue, 1);
            pHRCharacteristic->notify();
        }
        
        if (spO2 > 70) {
            uint8_t spo2Value = (uint8_t)spO2;
            pSpO2Characteristic->setValue(&spo2Value, 1);
            pSpO2Characteristic->notify();
        }
        
        if (bodyTemp > 30.0 && bodyTemp < 45.0) {
            uint16_t tempValue = (uint16_t)(bodyTemp * 100);
            uint8_t tempData[2] = {(uint8_t)(tempValue >> 8), (uint8_t)(tempValue & 0xFF)};
            pTempCharacteristic->setValue(tempData, 2);
            pTempCharacteristic->notify();
        }
        
        delay(1000);  // Update every second
    }
}
```

---

## 💬 WhatsApp Integration

### Method 1: URL Scheme (Simple)

```dart
// services/whatsapp_service.dart
import 'package:url_launcher/url_launcher.dart';

class WhatsAppService {
  // Send message via WhatsApp
  static Future<bool> sendMessage({
    required String phoneNumber,  // Format: +1234567890
    required String message,
  }) async {
    // Remove special characters
    String phone = phoneNumber.replaceAll(RegExp(r'[^\d+]'), '');
    
    // Encode message
    String encodedMessage = Uri.encodeComponent(message);
    
    // Create WhatsApp URL
    final Uri whatsappUrl = Uri.parse(
      "whatsapp://send?phone=$phone&text=$encodedMessage"
    );
    
    // Check if WhatsApp is installed
    if (await canLaunchUrl(whatsappUrl)) {
      return await launchUrl(whatsappUrl);
    } else {
      // Fallback to web WhatsApp
      final Uri webUrl = Uri.parse(
        "https://wa.me/$phone?text=$encodedMessage"
      );
      return await launchUrl(webUrl, mode: LaunchMode.externalApplication);
    }
  }

  // Send critical alert
  static Future<void> sendCriticalAlert({
    required String contactName,
    required String phoneNumber,
    required String patientName,
    required Map<String, dynamic> vitals,
  }) async {
    String message = """
🚨 *CRITICAL HEALTH ALERT* 🚨

Patient: *$patientName*
Time: ${DateTime.now().toString()}

⚠️ Abnormal Vital Signs Detected:
${vitals['heart_rate'] != null ? '❤️ Heart Rate: ${vitals['heart_rate']} bpm' : ''}
${vitals['spo2'] != null ? '🫁 SpO2: ${vitals['spo2']}%' : ''}
${vitals['temperature'] != null ? '🌡️ Temperature: ${vitals['temperature']}°C' : ''}
${vitals['blood_pressure'] != null ? '🩸 BP: ${vitals['blood_pressure']} mmHg' : ''}

📍 Action Required: Please check on patient immediately!

This is an automated alert from HealSense Health Monitoring System.
    """;
    
    await sendMessage(phoneNumber: phoneNumber, message: message);
  }

  // Send daily report
  static Future<void> sendDailyReport({
    required String phoneNumber,
    required String patientName,
    required Map<String, dynamic> summary,
  }) async {
    String message = """
📊 *Daily Health Report*

Patient: *$patientName*
Date: ${DateTime.now().toLocal().toString().split(' ')[0]}

✅ Summary:
❤️ Avg Heart Rate: ${summary['avg_hr']} bpm
🫁 Avg SpO2: ${summary['avg_spo2']}%
🌡️ Avg Temperature: ${summary['avg_temp']}°C
⚠️ Alerts Today: ${summary['alert_count']}

Status: ${summary['status']}

Generated by HealSense App
    """;
    
    await sendMessage(phoneNumber: phoneNumber, message: message);
  }
}
```

### Method 2: WhatsApp Business API (Advanced)

```dart
// For production: Use WhatsApp Business API via backend
import 'package:dio/dio.dart';

class WhatsAppBusinessService {
  final Dio _dio = Dio();
  final String apiUrl = "https://your-backend.com/api/v1/whatsapp/send";

  Future<bool> sendAlert({
    required String to,
    required String templateName,
    required Map<String, dynamic> parameters,
  }) async {
    try {
      final response = await _dio.post(
        apiUrl,
        data: {
          "to": to,
          "template": templateName,
          "parameters": parameters,
        },
        options: Options(
          headers: {
            "Authorization": "Bearer YOUR_API_TOKEN",
            "Content-Type": "application/json",
          },
        ),
      );
      
      return response.statusCode == 200;
    } catch (e) {
      print("WhatsApp API error: $e");
      return false;
    }
  }
}
```

### Usage in Alert System

```dart
// presentation/screens/monitoring/monitoring_provider.dart
class MonitoringProvider extends StateNotifier<MonitoringState> {
  final WhatsAppService _whatsappService = WhatsAppService();
  final NotificationService _notificationService = NotificationService();

  void checkVitalSigns(VitalSigns vitals) {
    bool isCritical = false;
    Map<String, dynamic> abnormalVitals = {};

    // Check heart rate
    if (vitals.heartRate < 50 || vitals.heartRate > 120) {
      isCritical = true;
      abnormalVitals['heart_rate'] = vitals.heartRate;
    }

    // Check SpO2
    if (vitals.spo2 < 92) {
      isCritical = true;
      abnormalVitals['spo2'] = vitals.spo2;
    }

    // Check temperature
    if (vitals.temperature > 38.0 || vitals.temperature < 36.0) {
      isCritical = true;
      abnormalVitals['temperature'] = vitals.temperature;
    }

    // If critical, send alerts
    if (isCritical) {
      _sendCriticalAlerts(vitals.patientName, abnormalVitals);
    }
  }

  Future<void> _sendCriticalAlerts(String patientName, Map<String, dynamic> abnormalVitals) async {
    // 1. Send local push notification
    await _notificationService.showCriticalAlert(
      title: "Critical Health Alert!",
      body: "Abnormal vital signs detected. Check patient immediately.",
    );

    // 2. Send WhatsApp alerts to emergency contacts
    List<EmergencyContact> contacts = await _getEmergencyContacts();
    
    for (var contact in contacts) {
      await _whatsappService.sendCriticalAlert(
        contactName: contact.name,
        phoneNumber: contact.phoneNumber,
        patientName: patientName,
        vitals: abnormalVitals,
      );
    }

    // 3. Play alarm sound
    await _notificationService.playAlarmSound();
  }
}
```

---

## 🔔 Push Notifications

### Firebase Cloud Messaging Setup

```dart
// services/notification_service.dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

// Background message handler
@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print("Background message: ${message.messageId}");
}

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = 
      FlutterLocalNotificationsPlugin();

  // Initialize notifications
  Future<void> initialize() async {
    // Request permission (iOS)
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
      criticalAlert: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');
    }

    // Get FCM token
    String? token = await _fcm.getToken();
    print("FCM Token: $token");
    // Send token to backend

    // Initialize local notifications
    const AndroidInitializationSettings androidInit =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const DarwinInitializationSettings iosInit =
        DarwinInitializationSettings();
    const InitializationSettings initSettings =
        InitializationSettings(android: androidInit, iOS: iosInit);

    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _showLocalNotification(message);
    });

    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _handleNotificationTap(message);
    });
  }

  // Show local notification
  Future<void> _showLocalNotification(RemoteMessage message) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'healsense_alerts',
      'Health Alerts',
      channelDescription: 'Critical health monitoring alerts',
      importance: Importance.max,
      priority: Priority.high,
      playSound: true,
      enableVibration: true,
    );

    const DarwinNotificationDetails iosDetails =
        DarwinNotificationDetails(sound: 'default');

    const NotificationDetails details =
        NotificationDetails(android: androidDetails, iOS: iosDetails);

    await _localNotifications.show(
      message.hashCode,
      message.notification?.title ?? 'HealSense Alert',
      message.notification?.body ?? 'New health notification',
      details,
      payload: message.data['route'],
    );
  }

  // Handle notification tap
  void _onNotificationTapped(NotificationResponse response) {
    if (response.payload != null) {
      // Navigate to specific screen
      print("Navigate to: ${response.payload}");
    }
  }

  void _handleNotificationTap(RemoteMessage message) {
    // Navigate based on message data
    if (message.data['type'] == 'critical_alert') {
      // Navigate to monitoring screen
    }
  }

  // Show critical alert notification
  Future<void> showCriticalAlert({
    required String title,
    required String body,
  }) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'critical_alerts',
      'Critical Alerts',
      channelDescription: 'Urgent health alerts',
      importance: Importance.max,
      priority: Priority.high,
      playSound: true,
      sound: RawResourceAndroidNotificationSound('alarm'),
      enableVibration: true,
      vibrationPattern: Int64List.fromList([0, 1000, 500, 1000]),
      fullScreenIntent: true,
      category: AndroidNotificationCategory.alarm,
    );

    const NotificationDetails details =
        NotificationDetails(android: androidDetails);

    await _localNotifications.show(
      999,  // Fixed ID for critical alerts
      title,
      body,
      details,
    );
  }
}
```

---

## 🎨 UI/UX Design

### Design System

```dart
// presentation/theme/app_colors.dart
class AppColors {
  // Primary colors
  static const Color primary = Color(0xFF2196F3);
  static const Color primaryDark = Color(0xFF1976D2);
  static const Color accent = Color(0xFF00BCD4);

  // Health status colors
  static const Color normal = Color(0xFF4CAF50);   // Green
  static const Color warning = Color(0xFFFF9800);   // Orange
  static const Color critical = Color(0xFFF44336);  // Red

  // Vital sign colors
  static const Color heartRate = Color(0xFFE91E63);    // Pink
  static const Color spo2 = Color(0xFF2196F3);         // Blue
  static const Color temperature = Color(0xFFFF5722);  // Deep Orange
  static const Color bloodPressure = Color(0xFF9C27B0); // Purple

  // Neutral colors
  static const Color background = Color(0xFFF5F5F5);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF757575);
}
```

### Theme Configuration

```dart
// app/theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.light,
    ),
    appBarTheme: AppBarTheme(
      elevation: 0,
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.dark,
    ),
    // ... dark theme configuration
  );
}
```

---

## 🗓️ Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Setup Flutter project
- [ ] Configure dependencies
- [ ] Implement authentication screens
- [ ] Setup Firebase
- [ ] Create basic navigation

### Phase 2: Bluetooth Integration (Weeks 3-4)
- [ ] Implement BLE scanning
- [ ] Connect to ESP32/Arduino
- [ ] Receive real-time data
- [ ] Test sensor communication

### Phase 3: UI Development (Weeks 5-6)
- [ ] Design home dashboard
- [ ] Create monitoring screen
- [ ] Implement charts (fl_chart)
- [ ] Build history screen

### Phase 4: Backend Integration (Weeks 7-8)
- [ ] API client setup (Retrofit/Dio)
- [ ] Integrate with backend endpoints
- [ ] Implement data sync
- [ ] Test API calls

### Phase 5: Notifications (Week 9)
- [ ] Setup FCM
- [ ] Implement local notifications
- [ ] WhatsApp integration
- [ ] Alert system logic

### Phase 6: Local Database (Week 10)
- [ ] SQLite database setup
- [ ] Offline mode implementation
- [ ] Data caching strategy
- [ ] Sync mechanism

### Phase 7: Polish & Testing (Weeks 11-12)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Unit testing
- [ ] Integration testing
- [ ] Beta testing

### Phase 8: Deployment (Week 13)
- [ ] Android APK build
- [ ] iOS IPA build
- [ ] Google Play Store submission
- [ ] Apple App Store submission

---

## 🚀 Next Steps

1. **Setup Flutter Development Environment:**
   ```bash
   flutter doctor -v
   flutter create healsense_mobile
   cd healsense_mobile
   flutter pub add riverpod flutter_blue_plus dio firebase_core
   ```

2. **Configure Firebase:**
   - Create Firebase project
   - Add Android/iOS apps
   - Download google-services.json / GoogleService-Info.plist

3. **Start Building:**
   - Begin with authentication screens
   - Test Bluetooth connection
   - Implement real-time monitoring UI

---

**Status:** ✅ Architecture Documented - Ready for Implementation  
**Next:** Start Flutter project setup and authentication screens

