export type VitalName = "heart_rate" | "spo2" | "temperature" | "systolic_bp" | "diastolic_bp" | "respiratory_rate"

export interface VitalReading {
  id: string
  timestamp: string
  heart_rate?: number
  spo2?: number
  temperature?: number
  systolic_bp?: number
  diastolic_bp?: number
  respiratory_rate?: number
  device_id?: string
  patient_id?: string
}

export interface VitalThresholds {
  heart_rate: { min: number; max: number }
  spo2: { min: number }
  temperature: { max: number }
  systolic_bp: { min: number; max: number }
  diastolic_bp: { min: number; max: number }
  respiratory_rate: { min: number; max: number }
}

export type VitalStatus = "critical" | "warning" | "normal"

export interface VitalWithStatus extends VitalReading {
  status: VitalStatus
}
