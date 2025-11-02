import type { VitalReading, Alert, VitalStatus, Device } from "@/types"

const getRandomVital = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getVitalStatus = (vital: string, value: number): VitalStatus => {
  const thresholds: Record<string, { critical: [number, number]; warning: [number, number] }> = {
    heart_rate: { critical: [40, 130], warning: [50, 120] },
    spo2: { critical: [90, 100], warning: [92, 100] },
    temperature: { critical: [37.8, 40], warning: [37.2, 38.5] },
    systolic_bp: { critical: [180, 300], warning: [140, 160] },
    diastolic_bp: { critical: [120, 200], warning: [90, 110] },
    respiratory_rate: { critical: [40, 50], warning: [20, 30] },
  }

  const t = thresholds[vital]
  if (!t) return "normal"

  if (value < t.critical[0] || value > t.critical[1]) return "critical"
  if (value < t.warning[0] || value > t.warning[1]) return "warning"
  return "normal"
}

export const generateMockReading = (patientId = "patient-1"): VitalReading => {
  return {
    id: `reading-${Date.now()}`,
    timestamp: new Date().toISOString(),
    heart_rate: getRandomVital(60, 100),
    spo2: getRandomVital(94, 99),
    temperature: 36.5 + Math.random() * 1.0,
    systolic_bp: getRandomVital(110, 130),
    diastolic_bp: getRandomVital(70, 85),
    respiratory_rate: getRandomVital(12, 20),
    patient_id: patientId,
    device_id: "mock-device",
  }
}

export const generateMockAlert = (patientId = "patient-1"): Alert | null => {
  const reading = generateMockReading(patientId)

  // 10% chance of alert
  if (Math.random() > 0.1) return null

  const vitals: Array<keyof Omit<VitalReading, "id" | "timestamp" | "device_id" | "patient_id">> = [
    "heart_rate",
    "spo2",
    "temperature",
    "systolic_bp",
    "diastolic_bp",
    "respiratory_rate",
  ]

  const vital = vitals[Math.floor(Math.random() * vitals.length)]
  const value = reading[vital as keyof VitalReading] as number
  const status = getVitalStatus(vital, value)

  if (status === "normal") return null

  return {
    id: `alert-${Date.now()}`,
    type: status === "critical" ? "critical" : "warning",
    message: `${vital.replace("_", " ")}: ${value}`,
    vital: vital as any,
    value,
    timestamp: new Date().toISOString(),
    patient_id: patientId,
    acknowledged: false,
  }
}

export const generateMockReadings = (count = 100, patientId = "patient-1"): VitalReading[] => {
  const readings: VitalReading[] = []
  const now = Date.now()

  for (let i = count - 1; i >= 0; i--) {
    const reading = generateMockReading(patientId)
    reading.timestamp = new Date(now - i * 60000).toISOString() // 1 minute apart
    readings.push(reading)
  }

  return readings
}

export const generateMockDevices = (count = 5): Device[] => {
  const deviceNames = [
    "Pulse Pro",
    "HealthBand+",
    "VitalWatch",
    "SmartMonitor",
    "CardioTracker",
    "OxySense",
    "TempGuard",
    "PressureCheck",
  ]

  const devices: Device[] = []
  for (let i = 0; i < count; i++) {
    const name = deviceNames[Math.floor(Math.random() * deviceNames.length)]
    devices.push({
      id: `device-${Date.now()}-${i}`,
      name: `${name} ${String.fromCharCode(65 + i)}`,
      rssi: Math.floor(Math.random() * -50) - 30, // -30 to -80 dBm
      connected: false,
      transport: "web_bluetooth",
      batteryLevel: Math.floor(Math.random() * 100) + 20,
      firmwareVersion: `1.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}`,
      lastSeen: new Date().toISOString(),
    })
  }
  return devices
}
