# 📱 Phone Sensor Integration Guide

## Overview

Integrate smartphone health sensors (Samsung Health, Apple Health, Google Fit) alongside dedicated IoT devices for a **hybrid monitoring system**.

---

## 🔍 Technical Feasibility

### Samsung S8+ Available Sensors
| Sensor | Capability | API Access |
|--------|-----------|------------|
| **PPG (Heart Rate)** | Optical heart rate monitoring | ✅ Samsung Health SDK |
| **SpO2 Sensor** | Blood oxygen saturation | ✅ Samsung Health SDK |
| **Accelerometer** | Activity, fall detection | ✅ Native Android |
| **Gyroscope** | Movement patterns | ✅ Native Android |
| **Barometer** | Altitude, stress indicators | ✅ Native Android |
| **GPS** | Location for emergencies | ✅ Native Android |
| **Temperature** | Ambient (limited accuracy) | ⚠️ Not body temp |

### iOS Health Kit (iPhone)
- Heart Rate (Apple Watch required for continuous)
- SpO2 (iPhone/Apple Watch with sensor)
- Step count, activity
- Sleep analysis

### Google Fit (Android)
- Heart rate (if phone has sensor)
- Activity tracking
- Sleep monitoring
- Integration with wearables

---

## 🏗️ Architecture Design

```
┌─────────────────────────────────────────────────────────┐
│                    HealSense Backend                     │
│                 (Unified Data Ingestion)                 │
└─────────────────────────────────────────────────────────┘
                          ▲  ▲
                          │  │
          ┌───────────────┘  └───────────────┐
          │                                   │
┌─────────┴─────────┐              ┌─────────┴─────────┐
│   Phone Sensors   │              │   IoT Device      │
│  (Mobile App)     │              │  (ESP32/Arduino)  │
├───────────────────┤              ├───────────────────┤
│ • Heart Rate      │              │ • MAX30102 (HR)   │
│ • SpO2            │              │ • DS18B20 (Temp)  │
│ • Activity        │              │ • MLX90614 (IR)   │
│ • Location (GPS)  │              │ • Always-on       │
│ • Battery Life+   │              │ • Medical-grade   │
└───────────────────┘              └───────────────────┘
```

### Data Source Priority
1. **IoT Device** - Primary (when connected, more accurate)
2. **Phone Sensor** - Fallback (when IoT unavailable)
3. **Manual Entry** - Last resort

---

## 📊 Backend Implementation

### Updated Device Model

We'll enhance the `Device` model to support both hardware types:

```python
class DeviceType(str, Enum):
    IOT_HARDWARE = "iot_hardware"      # Dedicated IoT device
    MOBILE_APP = "mobile_app"          # Phone sensors via app
    WEARABLE = "wearable"              # Smartwatch
    MANUAL = "manual"                  # Manual entry

class Device(Base):
    __tablename__ = "devices"
    
    device_id = Column(String, primary_key=True, index=True)
    device_type = Column(Enum(DeviceType), default=DeviceType.IOT_HARDWARE)
    
    # Phone-specific fields
    phone_model = Column(String, nullable=True)  # "Samsung S8+"
    phone_os = Column(String, nullable=True)     # "Android 11"
    sensor_capabilities = Column(JSON, nullable=True)  # Available sensors
    
    # Existing fields
    patient_id = Column(String, ForeignKey("patients.id"))
    connected = Column(Boolean, default=False)
    battery_level = Column(Integer)
    signal_strength = Column(Integer)
    last_heartbeat = Column(DateTime, default=datetime.utcnow)
```

### Data Source Tracking in VitalSigns

```python
class VitalSigns(Base):
    __tablename__ = "vital_signs"
    
    # Existing fields...
    device_id = Column(String, ForeignKey("devices.device_id"))
    
    # NEW: Track data source
    data_source = Column(Enum(DeviceType), default=DeviceType.IOT_HARDWARE)
    sensor_accuracy = Column(Float, nullable=True)  # Confidence score
    
    # Phone-specific metadata
    activity_context = Column(String, nullable=True)  # "resting", "walking"
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
```

---

## 📱 Mobile App Implementation

### React Native - Accessing Phone Sensors

#### 1. Install Sensor Libraries

```bash
npm install react-native-sensors
npm install @react-native-community/geolocation
npm install react-native-health  # iOS HealthKit
```

#### 2. Samsung Health SDK (Android)

```typescript
// src/services/SamsungHealthService.ts
import { NativeModules } from 'react-native';

const { SamsungHealth } = NativeModules;

export class SamsungHealthService {
  async initialize() {
    return await SamsungHealth.initialize();
  }

  async getHeartRate() {
    return await SamsungHealth.readHeartRate();
  }

  async getSpO2() {
    return await SamsungHealth.readSpO2();
  }

  async startContinuousMonitoring() {
    // Start background heart rate monitoring
    return await SamsungHealth.startContinuousHR();
  }
}
```

#### 3. Generic Sensor Access (Cross-platform)

```typescript
// src/services/PhoneSensorService.ts
import { accelerometer, gyroscope } from 'react-native-sensors';
import Geolocation from '@react-native-community/geolocation';

export class PhoneSensorService {
  private sensorData = {
    heartRate: 0,
    spo2: 0,
    activity: 'resting',
    location: null,
  };

  // Start monitoring all available sensors
  startMonitoring() {
    // 1. Heart Rate (if available)
    this.monitorHeartRate();
    
    // 2. Activity Detection
    this.monitorActivity();
    
    // 3. Location Tracking
    this.monitorLocation();
  }

  private monitorHeartRate() {
    // Use Samsung Health or Apple HealthKit
    setInterval(async () => {
      const hr = await this.getHeartRateFromSensor();
      this.sensorData.heartRate = hr;
      this.sendToBackend();
    }, 30000); // Every 30 seconds
  }

  private monitorActivity() {
    // Use accelerometer to detect activity level
    accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x*x + y*y + z*z);
      this.sensorData.activity = this.classifyActivity(magnitude);
    });
  }

  private monitorLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.sensorData.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      }
    );
  }

  private async sendToBackend() {
    // Send to HealSense backend
    await fetch('http://localhost:5000/api/v1/patients/P001/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        heart_rate: this.sensorData.heartRate,
        spo2: this.sensorData.spo2,
        device_id: 'PHONE_001',
        data_source: 'mobile_app',
        activity_context: this.sensorData.activity,
        location_lat: this.sensorData.location?.lat,
        location_lng: this.sensorData.location?.lng,
      }),
    });
  }
}
```

#### 4. UI Component - Phone Sensor Toggle

```tsx
// src/screens/MonitoringScreen.tsx
import React, { useState } from 'react';
import { PhoneSensorService } from '../services/PhoneSensorService';

export const MonitoringScreen = () => {
  const [usePhoneSensors, setUsePhoneSensors] = useState(false);
  const [iotConnected, setIotConnected] = useState(false);
  const phoneSensorService = new PhoneSensorService();

  const togglePhoneSensors = () => {
    if (!usePhoneSensors) {
      phoneSensorService.startMonitoring();
      setUsePhoneSensors(true);
    } else {
      phoneSensorService.stopMonitoring();
      setUsePhoneSensors(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Monitoring Options</Text>
      
      {/* IoT Device Status */}
      <Card>
        <Text>IoT Device: {iotConnected ? '✅ Connected' : '❌ Disconnected'}</Text>
        {iotConnected && (
          <Text>Using dedicated IoT sensor (Medical-grade accuracy)</Text>
        )}
      </Card>

      {/* Phone Sensor Toggle */}
      <Card>
        <Switch
          value={usePhoneSensors}
          onValueChange={togglePhoneSensors}
          disabled={iotConnected} // Auto-disable when IoT connected
        />
        <Text>Use Phone Sensors</Text>
        {usePhoneSensors && (
          <View>
            <Text>📱 Samsung S8+ Sensors Active</Text>
            <Text>• Heart Rate Monitor</Text>
            <Text>• SpO2 Sensor</Text>
            <Text>• Activity Tracking</Text>
          </View>
        )}
      </Card>

      {/* Data Source Indicator */}
      <Card>
        <Text style={styles.label}>Current Data Source:</Text>
        <Text style={styles.value}>
          {iotConnected ? '🔧 IoT Device (Primary)' : 
           usePhoneSensors ? '📱 Phone Sensors (Active)' : 
           '✍️ Manual Entry Only'}
        </Text>
      </Card>
    </View>
  );
};
```

---

## 🔌 Backend API Endpoints

### New Endpoint: Register Phone as Device

```python
# backend/api/routes/devices.py

@router.post("/register/phone", response_model=DeviceStatus)
async def register_phone_device(
    patient_id: str,
    phone_model: str,
    phone_os: str,
    sensors: List[str],  # ["heart_rate", "spo2", "accelerometer"]
    db: Session = Depends(get_db)
):
    """Register patient's phone as a monitoring device"""
    
    # Generate unique device ID for phone
    device_id = f"PHONE_{patient_id}"
    
    # Check if already exists
    existing = db.query(Device).filter(Device.device_id == device_id).first()
    
    if existing:
        # Update capabilities
        existing.phone_model = phone_model
        existing.phone_os = phone_os
        existing.sensor_capabilities = sensors
        existing.connected = True
        existing.updated_at = datetime.utcnow()
        device = existing
    else:
        # Create new phone device
        device = Device(
            device_id=device_id,
            device_type=DeviceType.MOBILE_APP,
            patient_id=patient_id,
            phone_model=phone_model,
            phone_os=phone_os,
            sensor_capabilities=sensors,
            connected=True,
            battery_level=100,  # Phone manages its own battery
            signal_strength=100,
            last_heartbeat=datetime.utcnow()
        )
        db.add(device)
    
    db.commit()
    db.refresh(device)
    
    return device
```

### Enhanced Vitals Endpoint (Accepts Phone Data)

```python
@router.post("/{patient_id}/vitals/phone")
async def record_vitals_from_phone(
    patient_id: str,
    vitals: PhoneVitalsInput,  # New schema
    db: Session = Depends(get_db)
):
    """Record vitals from phone sensors"""
    
    # Validate patient exists
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Create vital signs record
    vital_record = VitalSigns(
        id=f"V_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}",
        patient_id=patient_id,
        device_id=vitals.device_id,
        heart_rate=vitals.heart_rate,
        spo2=vitals.spo2,
        temperature=vitals.temperature or 37.0,  # Optional
        data_source=DeviceType.MOBILE_APP,
        activity_context=vitals.activity_context,
        location_lat=vitals.location_lat,
        location_lng=vitals.location_lng,
        sensor_accuracy=vitals.accuracy,
        timestamp=datetime.utcnow()
    )
    
    db.add(vital_record)
    db.commit()
    
    # Check for alerts (same logic as IoT)
    await check_and_create_alerts(patient_id, vital_record, db)
    
    return {"message": "Vitals recorded", "vital_id": vital_record.id}
```

---

## 🎯 Implementation Checklist

### Phase 1: Backend Updates
- [ ] Update Device model with `device_type` enum
- [ ] Add phone-specific fields (phone_model, sensor_capabilities)
- [ ] Update VitalSigns model with `data_source` tracking
- [ ] Create `/devices/register/phone` endpoint
- [ ] Create `/patients/{id}/vitals/phone` endpoint
- [ ] Run database migration

### Phase 2: Mobile App Integration
- [ ] Install sensor libraries (react-native-sensors)
- [ ] Create PhoneSensorService class
- [ ] Implement Samsung Health SDK integration
- [ ] Add sensor toggle UI in app
- [ ] Implement background monitoring
- [ ] Test heart rate & SpO2 reading

### Phase 3: Data Quality & Fallback
- [ ] Implement priority logic (IoT > Phone > Manual)
- [ ] Add sensor accuracy scoring
- [ ] Create data source indicator in UI
- [ ] Implement automatic fallback when IoT disconnects
- [ ] Add calibration mechanism

### Phase 4: Advanced Features
- [ ] Fall detection using accelerometer
- [ ] Emergency location sharing (GPS)
- [ ] Activity-based heart rate zones
- [ ] Battery optimization for continuous monitoring

---

## 📊 Comparison: IoT vs Phone Sensors

| Feature | Dedicated IoT Device | Phone Sensors |
|---------|---------------------|---------------|
| **Accuracy** | ⭐⭐⭐⭐⭐ Medical-grade | ⭐⭐⭐⭐ Consumer-grade |
| **Cost** | $50-200 | $0 (already owned) |
| **Convenience** | Wearable, dedicated | Multi-purpose device |
| **Battery Life** | 7-30 days | 1 day (heavy use) |
| **Continuous Monitoring** | ✅ Always-on | ⚠️ Background limited |
| **Accessibility** | Need to purchase | ✅ Immediate |
| **Sensor Quality** | Clinical-grade | Consumer-grade |
| **Data Reliability** | Very High | High |

---

## 🔋 Battery Optimization Tips

### For Phone Sensors
```typescript
// Optimize battery usage
const MONITORING_INTERVALS = {
  resting: 60000,      // 1 minute when resting
  active: 30000,       // 30 seconds when active
  emergency: 5000,     // 5 seconds in emergency
};

// Adaptive sampling
function getMonitoringInterval(context: string) {
  return MONITORING_INTERVALS[context] || 60000;
}
```

---

## 🚀 Quick Start

### Step 1: Update Backend Database

```bash
cd e:\Github\FYP-Project\healsense\backend

# Create migration
alembic revision --autogenerate -m "Add phone sensor support"

# Apply migration
alembic upgrade head
```

### Step 2: Test Phone Registration

```bash
# Register Samsung S8+ as device
curl -X POST http://localhost:5000/api/v1/devices/register/phone \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": "P001",
    "phone_model": "Samsung Galaxy S8+",
    "phone_os": "Android 11",
    "sensors": ["heart_rate", "spo2", "accelerometer", "gps"]
  }'
```

### Step 3: Send Test Data from Phone

```bash
curl -X POST http://localhost:5000/api/v1/patients/P001/vitals/phone \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "PHONE_P001",
    "heart_rate": 78,
    "spo2": 97,
    "activity_context": "resting",
    "accuracy": 0.92,
    "location_lat": 31.5497,
    "location_lng": 74.3436
  }'
```

---

## 🎓 Best Practices

1. **Hybrid Approach**: Use IoT device as primary, phone as backup
2. **Accuracy Indicators**: Show data source and confidence level in UI
3. **Battery Management**: Adjust sampling rate based on battery level
4. **Privacy**: Request location only during emergencies
5. **Calibration**: Allow users to calibrate phone sensors against medical devices
6. **Background Monitoring**: Use efficient background tasks (WorkManager on Android)

---

## 📱 Supported Devices

### Android
- Samsung Galaxy S8/S8+/S9/S10 (with heart rate sensor)
- Samsung Galaxy Watch integration
- Google Pixel (with Fitbit integration)
- Any Android with external sensors

### iOS
- iPhone with Apple Watch (recommended)
- iPhone 14+ (limited sensors)
- HealthKit integration

---

## 🔮 Future Enhancements

1. **ML-based Sensor Fusion**: Combine IoT + Phone data for better accuracy
2. **Smartwatch Integration**: Apple Watch, Galaxy Watch, Fitbit
3. **Camera-based PPG**: Use phone camera for heart rate (no sensor needed!)
4. **Voice Analysis**: Detect stress/respiratory issues
5. **Multi-device Sync**: Aggregate data from all sources

---

**Status**: 🟡 Implementation Ready  
**Estimated Time**: 2-3 days for full integration  
**Priority**: ⭐⭐⭐⭐ High (Increases accessibility)
