"use client"

import { AlertCircle, Share2, Trash2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Alert } from "@/types"

interface AlertCardProps {
  alert: Alert
  onShare: () => void
  onAcknowledge: () => void
  onDismiss: () => void
}

export default function AlertCard({ alert, onShare, onAcknowledge, onDismiss }: AlertCardProps) {
  const isAcknowledged = alert.acknowledged

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        alert.type === "critical" ? "bg-destructive/5 border-destructive/30" : "bg-warning/5 border-warning/30"
      } ${isAcknowledged ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <AlertCircle
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.type === "critical" ? "text-destructive" : "text-warning"}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm">{alert.message}</h3>
            {isAcknowledged && <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />}
          </div>
          <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
          {alert.value && (
            <p className="text-xs mt-1 opacity-75">
              Value:{" "}
              <span className="font-medium">
                {typeof alert.value === "number" ? alert.value.toFixed(1) : alert.value}
              </span>
              {alert.threshold && ` (threshold: ${alert.threshold})`}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button onClick={onShare} variant="outline" size="sm" className="text-xs bg-transparent">
          <Share2 className="w-3 h-3 mr-1" />
          Share
        </Button>
        <Button
          onClick={onAcknowledge}
          disabled={isAcknowledged}
          variant={isAcknowledged ? "outline" : "default"}
          size="sm"
          className="text-xs"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          {isAcknowledged ? "Done" : "Ack"}
        </Button>
        <Button
          onClick={onDismiss}
          variant="outline"
          size="sm"
          className="text-xs text-destructive hover:text-destructive bg-transparent"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Dismiss
        </Button>
      </div>
    </div>
  )
}
