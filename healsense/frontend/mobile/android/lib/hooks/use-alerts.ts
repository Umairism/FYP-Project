"use client"

import { useEffect, useState } from "react"
import { generateMockAlert } from "@/lib/mock-data"
import { addAlert, getAlerts } from "@/lib/db"
import type { Alert } from "@/types"

export function useAlerts(patientId = "patient-1") {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const loadAlerts = async () => {
    try {
      const cached = await getAlerts(patientId, 50)
      setAlerts(cached)
      setUnreadCount(cached.filter((a) => !a.acknowledged).length)
    } catch (err) {
      console.error("Failed to load alerts:", err)
    }
  }

  useEffect(() => {
    loadAlerts()
    setLoading(false)
  }, [patientId])

  // Simulate alert generation
  useEffect(() => {
    const interval = setInterval(async () => {
      const newAlert = generateMockAlert(patientId)
      if (newAlert) {
        await addAlert(newAlert)
        setAlerts((prev) => [newAlert, ...prev].slice(0, 50))
        setUnreadCount((prev) => prev + 1)
      }
    }, 120000) // Every 2 minutes

    return () => clearInterval(interval)
  }, [patientId])

  const acknowledgeAlert = async (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return {
    alerts,
    loading,
    unreadCount,
    reload: loadAlerts,
    acknowledgeAlert,
  }
}
