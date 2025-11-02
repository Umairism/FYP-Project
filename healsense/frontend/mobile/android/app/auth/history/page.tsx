"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, Download, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/layout/bottom-nav"
import HistoryChart from "@/components/history/history-chart"
import AnalyticsCard from "@/components/history/analytics-card"
import { useVitals } from "@/lib/hooks"
import type { VitalReading } from "@/types"

export default function HistoryPage() {
  const router = useRouter()
  const patientId = "patient-1"
  const { vitals } = useVitals(patientId)
  const [selectedVital, setSelectedVital] = useState<keyof VitalReading>("heart_rate")
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("7d")

  const vitalOptions = [
    { key: "heart_rate" as const, label: "Heart Rate", unit: "bpm" },
    { key: "spo2" as const, label: "SpO₂", unit: "%" },
    { key: "temperature" as const, label: "Temperature", unit: "°C" },
    { key: "systolic_bp" as const, label: "Systolic BP", unit: "mmHg" },
    { key: "diastolic_bp" as const, label: "Diastolic BP", unit: "mmHg" },
    { key: "respiratory_rate" as const, label: "Respiratory Rate", unit: "br/min" },
  ]

  const filteredVitals = useMemo(() => {
    const now = Date.now()
    const rangeMs = {
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "90d": 90 * 24 * 60 * 60 * 1000,
    }[dateRange]

    return vitals.filter((v) => now - new Date(v.timestamp).getTime() <= rangeMs)
  }, [vitals, dateRange])

  const vitalStats = useMemo(() => {
    if (filteredVitals.length === 0) return null

    const values = filteredVitals
      .map((v) => v[selectedVital as keyof VitalReading] as number)
      .filter((v) => typeof v === "number")

    if (values.length === 0) return null

    return {
      current: values[0],
      avg: values.reduce((a, b) => a + b) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    }
  }, [filteredVitals, selectedVital])

  const calculateTrend = (values: number[]) => {
    if (values.length < 2) return "stable"
    const recent = values.slice(0, Math.ceil(values.length / 4)).reduce((a, b) => a + b) / Math.ceil(values.length / 4)
    const older = values.slice(-Math.ceil(values.length / 4)).reduce((a, b) => a + b) / Math.ceil(values.length / 4)
    if (recent > older * 1.05) return "up"
    if (recent < older * 0.95) return "down"
    return "stable"
  }

  const trend = useMemo(() => {
    if (!vitalStats) return "stable"
    const values = filteredVitals
      .map((v) => v[selectedVital as keyof VitalReading] as number)
      .filter((v) => typeof v === "number")
    return calculateTrend(values)
  }, [vitalStats, filteredVitals, selectedVital])

  const handleExportCSV = () => {
    const headers = ["Timestamp", "Heart Rate", "SpO2", "Temperature", "Systolic BP", "Diastolic BP", "RR"]
    const rows = filteredVitals.map((v) => [
      new Date(v.timestamp).toISOString(),
      v.heart_rate || "",
      v.spo2 || "",
      v.temperature?.toFixed(1) || "",
      v.systolic_bp || "",
      v.diastolic_bp || "",
      v.respiratory_rate || "",
    ])

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `health-history-${dateRange}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const selectedVitalLabel = vitalOptions.find((v) => v.key === selectedVital)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Health History</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {dateRange === "7d" ? "Last 7 days" : dateRange === "30d" ? "Last 30 days" : "Last 90 days"}
          </p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Time Range Filter */}
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                dateRange === range
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {range === "7d" ? "1W" : range === "30d" ? "1M" : "3M"}
            </button>
          ))}
        </div>

        {/* Vital Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Vital</label>
          <select
            value={selectedVital}
            onChange={(e) => setSelectedVital(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {vitalOptions.map((vital) => (
              <option key={vital.key} value={vital.key}>
                {vital.label} ({vital.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Chart */}
        <HistoryChart vitals={filteredVitals} selectedVital={selectedVital} />

        {/* Analytics Card */}
        {vitalStats && selectedVitalLabel && (
          <AnalyticsCard
            title={selectedVitalLabel.label}
            unit={selectedVitalLabel.unit}
            currentValue={vitalStats.current}
            avgValue={vitalStats.avg}
            minValue={vitalStats.min}
            maxValue={vitalStats.max}
            trend={trend as "up" | "down" | "stable"}
          />
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total Readings</p>
            <p className="text-2xl font-bold">{filteredVitals.length}</p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Avg per Day</p>
            <p className="text-2xl font-bold">
              {(filteredVitals.length / (dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90)).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExportCSV}
          disabled={filteredVitals.length === 0}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as CSV
        </Button>

        {/* Info */}
        {filteredVitals.length === 0 && (
          <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning">
            No data available for the selected date range
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
