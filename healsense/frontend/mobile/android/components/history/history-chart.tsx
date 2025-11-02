"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { VitalReading } from "@/types"

interface HistoryChartProps {
  vitals: VitalReading[]
  selectedVital: keyof VitalReading
}

export default function HistoryChart({ vitals, selectedVital }: HistoryChartProps) {
  const chartData = vitals
    .slice()
    .reverse()
    .map((v, idx) => ({
      idx,
      value: v[selectedVital as keyof VitalReading],
      time: new Date(v.timestamp).toLocaleDateString(),
    }))
    .filter((item) => item.value !== undefined)

  const stats = {
    min: Math.min(...chartData.map((d) => d.value as number)),
    max: Math.max(...chartData.map((d) => d.value as number)),
    avg: chartData.reduce((sum, d) => sum + (d.value as number), 0) / chartData.length,
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" vertical={false} />
            <XAxis dataKey="idx" stroke="oklch(0.65 0 0)" style={{ fontSize: "12px" }} />
            <YAxis stroke="oklch(0.65 0 0)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.22 0 0)",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="oklch(0.60 0.26 261)"
              fill="oklch(0.60 0.26 261)"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Minimum</p>
          <p className="text-lg font-bold text-success">{stats.min.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Average</p>
          <p className="text-lg font-bold text-primary">{stats.avg.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Maximum</p>
          <p className="text-lg font-bold text-destructive">{stats.max.toFixed(1)}</p>
        </div>
      </div>
    </div>
  )
}
