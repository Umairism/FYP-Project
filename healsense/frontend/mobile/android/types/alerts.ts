import type { VitalName } from "./vitals"

export type AlertSeverity = "critical" | "warning"

export interface Alert {
  id: string
  type: AlertSeverity
  message: string
  vital: VitalName
  value: number
  threshold?: number
  timestamp: string
  patient_id?: string
  acknowledged: boolean
}
