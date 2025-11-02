"use client"

import { useState } from "react"
import { ChevronLeft, AlertCircle, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/layout/bottom-nav"
import AlertCard from "@/components/alerts/alert-card"
import { useAlerts } from "@/lib/hooks"

export default function AlertsPage() {
  const router = useRouter()
  const patientId = "patient-1"
  const { alerts, acknowledgeAlert, unreadCount } = useAlerts(patientId)
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning">("all")
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const filteredAlerts = alerts.filter((a) => {
    if (dismissedIds.has(a.id)) return false
    if (filterSeverity === "all") return true
    return a.type === filterSeverity
  })

  const criticalCount = alerts.filter((a) => a.type === "critical" && !dismissedIds.has(a.id)).length
  const warningCount = alerts.filter((a) => a.type === "warning" && !dismissedIds.has(a.id)).length

  const handleShare = (alert: any) => {
    const message = `Alert: ${alert.message} - ${new Date(alert.timestamp).toLocaleString()}`
    if (navigator.share) {
      navigator.share({ text: message })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(message).then(() => {
        alert("Alert copied to clipboard")
      })
    }
  }

  const handleDismiss = (alertId: string) => {
    setDismissedIds((prev) => new Set([...prev, alertId]))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Alerts</h1>
          <p className="text-xs text-muted-foreground">
            {filteredAlerts.length} active alert{filteredAlerts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-lg font-bold">{filteredAlerts.length}</p>
          </div>
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-xs text-destructive mb-1">Critical</p>
            <p className="text-lg font-bold text-destructive">{criticalCount}</p>
          </div>
          <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <p className="text-xs text-warning mb-1">Warning</p>
            <p className="text-lg font-bold text-warning">{warningCount}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {(["all", "critical", "warning"] as const).map((severity) => {
            const count =
              severity === "all" ? filteredAlerts.length : severity === "critical" ? criticalCount : warningCount
            return (
              <button
                key={severity}
                onClick={() => setFilterSeverity(severity)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  filterSeverity === severity
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
                <span className="text-xs ml-1 opacity-75">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Alert List */}
        <div className="space-y-2">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-3" />
              <p className="text-muted-foreground font-medium mb-1">
                {dismissedIds.size > 0 ? "All alerts dismissed" : "No alerts"}
              </p>
              <p className="text-xs text-muted-foreground">
                {dismissedIds.size > 0 ? "Check back later for new alerts" : "You're all caught up, keep monitoring"}
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onShare={() => handleShare(alert)}
                onAcknowledge={() => acknowledgeAlert(alert.id)}
                onDismiss={() => handleDismiss(alert.id)}
              />
            ))
          )}
        </div>

        {/* Info Card */}
        {dismissedIds.size > 0 && (
          <div className="p-3 bg-muted/50 border border-border rounded-lg text-xs text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            <p>
              {dismissedIds.size} alert{dismissedIds.size !== 1 ? "s" : ""} dismissed in this session
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
