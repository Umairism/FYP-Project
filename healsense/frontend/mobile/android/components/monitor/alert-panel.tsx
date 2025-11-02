import { AlertCircle, AlertTriangle } from "lucide-react"
import type { Alert } from "@/types"

interface AlertPanelProps {
  alerts: Alert[]
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  if (alerts.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Recent Alerts
      </h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-2 rounded text-xs flex items-center gap-2 ${
              alert.type === "critical"
                ? "bg-destructive/10 text-destructive border border-destructive/30"
                : "bg-warning/10 text-warning border border-warning/30"
            }`}
          >
            {alert.type === "critical" ? (
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-medium">{alert.message}</p>
              <p className="opacity-75">{new Date(alert.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
