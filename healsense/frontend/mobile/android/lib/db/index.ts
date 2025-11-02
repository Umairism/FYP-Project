import Dexie, { type Table } from "dexie"
import type { VitalReading, Alert } from "@/types"

export interface CachedVital extends VitalReading {
  syncedAt?: number
}

export interface CachedSettings {
  id: string
  thresholds: Record<string, any>
  emergencyContacts: any[]
  units: "metric" | "imperial"
  language: string
}

class HealSenseDB extends Dexie {
  vitals!: Table<CachedVital>
  alerts!: Table<Alert>
  settings!: Table<CachedSettings>

  constructor() {
    super("healsense-db")
    this.version(1).stores({
      vitals: "++id, timestamp, patient_id, &[patient_id+timestamp]",
      alerts: "++id, timestamp, patient_id",
      settings: "id",
    })
  }
}

export const db = new HealSenseDB()

export const addVital = async (vital: VitalReading): Promise<void> => {
  await db.vitals.add({
    ...vital,
    syncedAt: Date.now(),
  })
}

export const getVitals = async (patientId: string, limit = 100, offset = 0): Promise<CachedVital[]> => {
  return db.vitals.where("patient_id").equals(patientId).reverse().offset(offset).limit(limit).toArray()
}

export const getVitalsByDateRange = async (
  patientId: string,
  startDate: Date,
  endDate: Date,
): Promise<CachedVital[]> => {
  return db.vitals
    .where("patient_id")
    .equals(patientId)
    .filter((v) => {
      const vTime = new Date(v.timestamp).getTime()
      return vTime >= startDate.getTime() && vTime <= endDate.getTime()
    })
    .toArray()
}

export const addAlert = async (alert: Alert): Promise<void> => {
  await db.alerts.add(alert)
}

export const getAlerts = async (patientId: string, limit = 50): Promise<Alert[]> => {
  return db.alerts.where("patient_id").equals(patientId).reverse().limit(limit).toArray()
}

export const clearOldVitals = async (patientId: string, olderThanDays = 30): Promise<void> => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

  await db.vitals
    .where("patient_id")
    .equals(patientId)
    .filter((v) => new Date(v.timestamp) < cutoffDate)
    .delete()
}

export const getCacheStats = async (): Promise<{
  vitalCount: number
  alertCount: number
  cacheSize: string
}> => {
  const vitalCount = await db.vitals.count()
  const alertCount = await db.alerts.count()

  return {
    vitalCount,
    alertCount,
    cacheSize: `~${((vitalCount + alertCount) * 0.5).toFixed(0)}KB`,
  }
}
