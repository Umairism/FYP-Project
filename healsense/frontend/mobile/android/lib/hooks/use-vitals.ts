"use client"

import { useEffect, useState } from "react"
import { generateMockReading, generateMockReadings } from "@/lib/mock-data"
import { addVital, getVitals } from "@/lib/db"
import type { VitalReading } from "@/types"

export function useVitals(patientId = "patient-1") {
  const [vitals, setVitals] = useState<VitalReading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Load cached vitals
  const loadCachedVitals = async () => {
    try {
      const cached = await getVitals(patientId, 100)
      setVitals(cached as VitalReading[])
      if (cached.length > 0) {
        setLastUpdate(new Date(cached[0].timestamp))
      }
    } catch (err) {
      console.error("Failed to load cached vitals:", err)
    }
  }

  // Initialize with mock data on first load
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      try {
        // Try to load from cache
        const cached = await getVitals(patientId, 1)

        if (cached.length === 0) {
          // Initialize with mock data
          const mockReadings = generateMockReadings(100, patientId)
          for (const reading of mockReadings) {
            await addVital(reading)
          }
          setVitals(mockReadings)
        } else {
          await loadCachedVitals()
        }
      } catch (err) {
        setError("Failed to initialize vitals")
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [patientId])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(async () => {
      const newReading = generateMockReading(patientId)
      await addVital(newReading)

      setVitals((prev) => {
        const updated = [newReading, ...prev]
        return updated.slice(0, 200) // Keep last 200
      })
      setLastUpdate(new Date())
    }, 60000) // Every minute

    return () => clearInterval(interval)
  }, [patientId])

  return {
    vitals,
    loading,
    error,
    lastUpdate,
    reload: loadCachedVitals,
  }
}
