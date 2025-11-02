"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { VitalReading } from "@/types"

interface VitalLineChartProps {
  title: string
  data: VitalReading[]
  dataKey?: keyof VitalReading
  dataKeyX?: keyof VitalReading
  dataKeyY?: keyof VitalReading
  unit: string
  color: string
}

export default function VitalLineChart({ title, data, dataKey, dataKeyX, dataKeyY, unit, color }: VitalLineChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((item, idx) => ({
      time: idx,
      value: dataKey ? (item[dataKey] as number) : undefined,
      valueX: dataKeyX ? (item[dataKeyX] as number) : undefined,
      valueY: dataKeyY ? (item[dataKeyY] as number) : undefined,
    }))

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" vertical={false} />
            <XAxis dataKey="time" stroke="oklch(0.65 0 0)" style={{ fontSize: "12px" }} />
            <YAxis stroke="oklch(0.65 0 0)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.22 0 0)",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
            />
            {dataKey && (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
              />
            )}
            {dataKeyX && (
              <Line
                type="monotone"
                dataKey="valueX"
                stroke={color}
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
              />
            )}
            {dataKeyY && (
              <Line
                type="monotone"
                dataKey="valueY"
                stroke={color}
                strokeWidth={2}
                strokeDasharray="5 5"
                isAnimationActive={false}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Showing last 15 readings ({unit})</p>
    </div>
  )
}
