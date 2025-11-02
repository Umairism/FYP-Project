"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Play, Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/layout/bottom-nav"
import VitalLineChart from "@/components/monitor/vital-line-chart"
import AlertPanel from "@/components/monitor/alert-panel"
import { useVitals, useAlerts } from "@/lib/hooks"

export default function MonitorPage() {
  const router = useRouter()
  const patientId = "patient-1"
  const { vitals, lastUpdate } = useVitals(patientId)
  const { alerts } = useAlerts(patientId)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }
    return `${minutes}:${String(secs).padStart(2, "0")}`
  }

  const last15MinVitals = vitals.slice(0, 15)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Live Monitor</h1>
          <p className="text-xs text-muted-foreground">Session: {formatTime(sessionTime)}</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Session Controls */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`flex-1 ${
              isMonitoring ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
            } text-white`}
          >
            {isMonitoring ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Session
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </>
            )}
          </Button>
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <VitalLineChart
            title="Heart Rate"
            data={last15MinVitals}
            dataKey="heart_rate"
            unit="bpm"
            color="oklch(0.62 0.25 25)"
          />
          <VitalLineChart title="SpO₂" data={last15MinVitals} dataKey="spo2" unit="%" color="oklch(0.60 0.26 261)" />
          <VitalLineChart
            title="Temperature"
            data={last15MinVitals}
            dataKey="temperature"
            unit="°C"
            color="oklch(0.65 0.15 155)"
          />
          <VitalLineChart
            title="Blood Pressure"
            data={last15MinVitals}
            dataKeyX="systolic_bp"
            dataKeyY="diastolic_bp"
            unit="mmHg"
            color="oklch(0.70 0.23 70)"
          />
          <VitalLineChart
            title="Respiratory Rate"
            data={last15MinVitals}
            dataKey="respiratory_rate"
            unit="br/min"
            color="oklch(0.55 0.18 10)"
          />
        </div>

        {/* Alerts Panel */}
        {alerts.length > 0 && <AlertPanel alerts={alerts.slice(0, 5)} />}

        {lastUpdate && (
          <p className="text-xs text-muted-foreground text-center">Last update: {lastUpdate.toLocaleTimeString()}</p>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
