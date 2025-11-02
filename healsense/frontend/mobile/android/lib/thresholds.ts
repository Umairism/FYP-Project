import type { VitalStatus, VitalThresholds } from "@/types"

const DEFAULT_THRESHOLDS: VitalThresholds = {
  heart_rate: { min: 50, max: 120 },
  spo2: { min: 92 },
  temperature: { max: 38.0 },
  systolic_bp: { min: 90, max: 140 },
  diastolic_bp: { min: 60, max: 90 },
  respiratory_rate: { min: 12, max: 20 },
}

const CRITICAL_THRESHOLDS: VitalThresholds = {
  heart_rate: { min: 40, max: 130 },
  spo2: { min: 90 },
  temperature: { max: 40 },
  systolic_bp: { min: 80, max: 180 },
  diastolic_bp: { min: 50, max: 120 },
  respiratory_rate: { min: 8, max: 30 },
}

export const evaluateVitalStatus = (
  vital: string,
  value: number | undefined,
  thresholds: VitalThresholds = DEFAULT_THRESHOLDS,
): VitalStatus => {
  if (value === undefined) return "normal"

  const critical = CRITICAL_THRESHOLDS[vital as keyof VitalThresholds]
  const warning = thresholds[vital as keyof VitalThresholds]

  if (!critical || !warning) return "normal"

  const thresholdObj = critical as any
  if ("min" in thresholdObj && value < thresholdObj.min) return "critical"
  if ("max" in thresholdObj && value > thresholdObj.max) return "critical"

  const warningObj = warning as any
  if ("min" in warningObj && value < warningObj.min) return "warning"
  if ("max" in warningObj && value > warningObj.max) return "warning"

  return "normal"
}

export const getDefaultThresholds = (): VitalThresholds => DEFAULT_THRESHOLDS

export const getVitalUnit = (vital: string): string => {
  const units: Record<string, string> = {
    heart_rate: "bpm",
    spo2: "%",
    temperature: "°C",
    systolic_bp: "mmHg",
    diastolic_bp: "mmHg",
    respiratory_rate: "br/min",
  }
  return units[vital] || ""
}

export const getVitalLabel = (vital: string): string => {
  const labels: Record<string, string> = {
    heart_rate: "Heart Rate",
    spo2: "SpO₂",
    temperature: "Temperature",
    systolic_bp: "Systolic BP",
    diastolic_bp: "Diastolic BP",
    respiratory_rate: "Respiratory Rate",
  }
  return labels[vital] || vital
}
