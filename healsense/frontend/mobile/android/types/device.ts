export type DeviceTransport = "web_bluetooth" | "mock" | "server"

export interface Device {
  id: string
  name: string
  rssi?: number
  connected: boolean
  transport: DeviceTransport
  lastSeen?: string
  batteryLevel?: number
  firmwareVersion?: string
}
