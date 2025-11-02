"use client"

import { useState, useEffect } from "react"
import { Heart, AlertCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import VitalCard from "@/components/vitals/vital-card"
import StatusBadge from "@/components/vitals/status-badge"
import BottomNav from "@/components/layout/bottom-nav"
import { useVitals, useAlerts } from "@/lib/hooks"
import { evaluateVitalStatus } from "@/lib/thresholds"
import { buildWhatsAppLink, buildEmergencySOSMessage } from "@/lib/whatsapp"

export default function HomePage() {
  const patientId = "patient-1"
  const { vitals, lastUpdate } = useVitals(patientId)
  const { alerts, unreadCount } = useAlerts(patientId)
  const [overallStatus, setOverallStatus] = useState<"normal" | "warning" | "critical">("normal")

  const latestReading = vitals[0]

  useEffect(() => {
    if (!latestReading) return

    const statuses = [
      evaluateVitalStatus("heart_rate", latestReading.heart_rate),
      evaluateVitalStatus("spo2", latestReading.spo2),
      evaluateVitalStatus("temperature", latestReading.temperature),
      evaluateVitalStatus("systolic_bp", latestReading.systolic_bp),
      evaluateVitalStatus("diastolic_bp", latestReading.diastolic_bp),
      evaluateVitalStatus("respiratory_rate", latestReading.respiratory_rate),
    ]

    if (statuses.includes("critical")) {
      setOverallStatus("critical")
    } else if (statuses.includes("warning")) {
      setOverallStatus("warning")
    } else {
      setOverallStatus("normal")
    }
  }, [latestReading])

  if (!latestReading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">Loading vitals...</div>
      </div>
    )
  }

  const handleEmergencySOS = () => {
    const message = buildEmergencySOSMessage("Patient", latestReading)
    const whatsappLink = buildWhatsAppLink("1234567890", message)
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-bold">HealSense</h1>
        </div>
        <div className="text-xs text-muted-foreground">Mock Mode</div>
      </header>

      {/* Status Banner */}
      <div className="p-4">
        <StatusBadge status={overallStatus} />
      </div>

      {/* Recent Alerts */}
      {unreadCount > 0 && (
        <div className="px-4 py-2">
          <button className="w-full flex items-center justify-between p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
            <span className="font-medium text-sm">
              {unreadCount} New Alert{unreadCount !== 1 ? "s" : ""}
            </span>
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Vital Cards Grid */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Latest Reading</p>
          <div className="grid grid-cols-2 gap-3">
            <VitalCard
              label="Heart Rate"
              value={latestReading.heart_rate || 0}
              unit="bpm"
              status={evaluateVitalStatus("heart_rate", latestReading.heart_rate)}
            />
            <VitalCard
              label="SpO₂"
              value={latestReading.spo2 || 0}
              unit="%"
              status={evaluateVitalStatus("spo2", latestReading.spo2)}
            />
            <VitalCard
              label="Temperature"
              value={latestReading.temperature || 0}
              unit="°C"
              status={evaluateVitalStatus("temperature", latestReading.temperature)}
              precision={1}
            />
            <VitalCard
              label="BP"
              value={`${latestReading.systolic_bp}/${latestReading.diastolic_bp}`}
              unit="mmHg"
              status={evaluateVitalStatus("systolic_bp", latestReading.systolic_bp)}
            />
          </div>
        </div>

        {/* Respiratory Rate */}
        <div>
          <VitalCard
            label="Respiratory Rate"
            value={latestReading.respiratory_rate || 0}
            unit="br/min"
            status={evaluateVitalStatus("respiratory_rate", latestReading.respiratory_rate)}
          />
        </div>

        {/* Last Update */}
        {lastUpdate && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            <Heart className="w-4 h-4 mr-2" />
            Monitor
          </Button>
          <Button variant="outline" className="border-border hover:bg-muted bg-transparent" size="lg">
            <AlertCircle className="w-4 h-4 mr-2" />
            Alerts ({unreadCount})
          </Button>
        </div>

        <Button
          onClick={handleEmergencySOS}
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          size="lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Emergency SOS
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
