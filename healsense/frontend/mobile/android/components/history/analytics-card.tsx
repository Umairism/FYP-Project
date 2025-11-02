"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  unit: string
  currentValue: number
  avgValue: number
  minValue: number
  maxValue: number
  trend: "up" | "down" | "stable"
}

export default function AnalyticsCard({
  title,
  unit,
  currentValue,
  avgValue,
  minValue,
  maxValue,
  trend,
}: AnalyticsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-destructive" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-success" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="p-4 bg-card border border-border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{title}</h3>
        {getTrendIcon()}
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-2xl font-bold">
            {currentValue.toFixed(1)} <span className="text-sm text-muted-foreground">{unit}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Avg</p>
            <p className="font-semibold">{avgValue.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Min</p>
            <p className="font-semibold text-success">{minValue.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Max</p>
            <p className="font-semibold text-destructive">{maxValue.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
