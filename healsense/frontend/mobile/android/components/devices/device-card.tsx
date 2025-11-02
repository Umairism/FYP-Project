"use client"

import { Bluetooth, Signal, Battery, MoreVertical, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Device } from "@/types"

interface DeviceCardProps {
  device: Device
  onToggle: () => void
  onDetails?: () => void
}

export default function DeviceCard({ device, onToggle, onDetails }: DeviceCardProps) {
  const getSignalColor = (rssi?: number): string => {
    if (!rssi) return "text-muted-foreground"
    if (rssi > -50) return "text-success"
    if (rssi > -70) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className="p-4 bg-card border border-border rounded-lg flex items-center justify-between group hover:border-accent/50 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <Bluetooth className="w-5 h-5 text-accent flex-shrink-0" />
          {device.connected && (
            <CheckCircle className="absolute -bottom-1 -right-1 w-3 h-3 bg-success text-card rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{device.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Signal className={`w-3 h-3 ${getSignalColor(device.rssi)}`} />
            <span>{device.rssi}dBm</span>
            {device.batteryLevel !== undefined && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Battery className="w-3 h-3" />
                  <span>{device.batteryLevel}%</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button onClick={onDetails} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="w-4 h-4" />
        </Button>
        <Button onClick={onToggle} variant={device.connected ? "default" : "outline"} size="sm">
          {device.connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  )
}
