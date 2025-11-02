"use client"

import { X, Battery, Smartphone, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Device } from "@/types"

interface DeviceDetailsSheetProps {
  device: Device | null
  isOpen: boolean
  onClose: () => void
  onConnect: (device: Device) => void
}

export default function DeviceDetailsSheet({ device, isOpen, onClose, onConnect }: DeviceDetailsSheetProps) {
  if (!isOpen || !device) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-lg max-h-96 overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Device Details</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Device Info */}
          <div className="space-y-3 mb-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Device Name</p>
              <p className="font-medium">{device.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Signal Strength
                </p>
                <p className="font-medium">{device.rssi} dBm</p>
              </div>

              {device.batteryLevel !== undefined && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Battery className="w-3 h-3" />
                    Battery
                  </p>
                  <p className="font-medium">{device.batteryLevel}%</p>
                </div>
              )}
            </div>

            {device.firmwareVersion && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  Firmware
                </p>
                <p className="font-medium">v{device.firmwareVersion}</p>
              </div>
            )}

            {device.lastSeen && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Last Seen</p>
                <p className="font-medium text-sm">{new Date(device.lastSeen).toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => {
                onConnect(device)
                onClose()
              }}
              disabled={device.connected}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {device.connected ? "Connected" : "Connect Device"}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
