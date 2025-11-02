"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Bluetooth, Wifi, WifiOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/layout/bottom-nav"
import DeviceCard from "@/components/devices/device-card"
import DeviceDetailsSheet from "@/components/devices/device-details-sheet"
import { generateMockDevices } from "@/lib/mock-data"
import type { Device } from "@/types"

export default function DevicesPage() {
  const router = useRouter()
  const [devices, setDevices] = useState<Device[]>([])
  const [scanning, setScanning] = useState(false)
  const [bluetoothSupported, setBluetoothSupported] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const supported = typeof window !== "undefined" && navigator && "bluetooth" in navigator
    setBluetoothSupported(supported)

    // Load from localStorage
    const saved = localStorage.getItem("healsense-devices")
    if (saved) {
      try {
        setDevices(JSON.parse(saved))
      } catch {
        // Initialize with mock device
        setDevices([
          {
            id: "mock-1",
            name: "Mock Health Monitor",
            rssi: -45,
            connected: true,
            transport: "mock",
            batteryLevel: 85,
            firmwareVersion: "1.0.5",
          },
        ])
      }
    } else {
      // Initialize with mock device
      setDevices([
        {
          id: "mock-1",
          name: "Mock Health Monitor",
          rssi: -45,
          connected: true,
          transport: "mock",
          batteryLevel: 85,
          firmwareVersion: "1.0.5",
        },
      ])
    }
  }, [])

  useEffect(() => {
    if (devices.length > 0) {
      localStorage.setItem("healsense-devices", JSON.stringify(devices))
    }
  }, [devices])

  const handleScanBluetooth = async () => {
    if (!bluetoothSupported) {
      alert("Web Bluetooth is not supported on this device")
      return
    }

    setScanning(true)
    try {
      // Simulate scanning with new mock devices
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newDevices = generateMockDevices(3)
      setDevices((prev) => {
        const combined = [...prev, ...newDevices]
        // Remove duplicates by id
        const unique = Array.from(new Map(combined.map((d) => [d.id, d])).values())
        return unique
      })
    } catch (error) {
      console.error("Bluetooth scan failed:", error)
    } finally {
      setScanning(false)
    }
  }

  const toggleDevice = async (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          return { ...d, connected: !d.connected, lastSeen: new Date().toISOString() }
        }
        return d
      }),
    )
  }

  const handleDeviceDetails = (device: Device) => {
    setSelectedDevice(device)
    setShowDetails(true)
  }

  const connectedCount = devices.filter((d) => d.connected).length
  const availableCount = devices.filter((d) => !d.connected).length

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Devices</h1>
          <p className="text-xs text-muted-foreground">Manage connected health monitors</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Bluetooth Status */}
        <div
          className={`p-3 rounded-lg border flex items-center gap-2 ${
            bluetoothSupported
              ? "bg-success/10 border-success/30 text-success"
              : "bg-warning/10 border-warning/30 text-warning"
          }`}
        >
          {bluetoothSupported ? (
            <>
              <Bluetooth className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Bluetooth Available</p>
                <p className="text-xs opacity-80">Ready to scan for devices</p>
              </div>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Bluetooth Not Supported</p>
                <p className="text-xs opacity-80">Your browser doesn't support Web Bluetooth</p>
              </div>
            </>
          )}
        </div>

        {/* Scan Button */}
        <Button
          onClick={handleScanBluetooth}
          disabled={scanning}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {scanning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Bluetooth className="w-4 h-4 mr-2" />
              Scan for Devices
            </>
          )}
        </Button>

        {/* Connected Devices */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            Connected Devices ({connectedCount})
          </h2>
          <div className="space-y-2">
            {devices
              .filter((d) => d.connected)
              .map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onToggle={() => toggleDevice(device.id)}
                  onDetails={() => handleDeviceDetails(device)}
                />
              ))}
            {devices.filter((d) => d.connected).length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No connected devices</p>
            )}
          </div>
        </div>

        {/* Available Devices */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            Available Devices ({availableCount})
          </h2>
          <div className="space-y-2">
            {devices
              .filter((d) => !d.connected)
              .map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onToggle={() => toggleDevice(device.id)}
                  onDetails={() => handleDeviceDetails(device)}
                />
              ))}
            {devices.filter((d) => !d.connected).length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {devices.length === 0 ? "No devices available. Tap Scan to find devices." : "No available devices"}
              </p>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="p-3 bg-card border border-border rounded-lg text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground">Web Bluetooth Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Modern browser with Bluetooth support</li>
            <li>HTTPS connection required</li>
            <li>User permission required for pairing</li>
            <li>Supported on Chrome, Edge, Opera, and newer browsers</li>
          </ul>
        </div>
      </div>

      {/* Device Details Sheet */}
      <DeviceDetailsSheet
        device={selectedDevice}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onConnect={toggleDevice}
      />

      <BottomNav />
    </div>
  )
}
