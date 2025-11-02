import { TrendingUp, TrendingDown } from "lucide-react"
import type { VitalStatus } from "@/types"

interface VitalCardProps {
  label: string
  value: string | number
  unit: string
  status: VitalStatus
  precision?: number
}

export default function VitalCard({ label, value, unit, status, precision = 0 }: VitalCardProps) {
  const statusColors: Record<VitalStatus, string> = {
    critical: "bg-destructive/10 border-destructive/30 text-destructive",
    warning: "bg-warning/10 border-warning/30 text-warning",
    normal: "bg-success/10 border-success/30 text-success",
  }

  const displayValue = typeof value === "number" ? value.toFixed(precision) : value

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="text-sm font-medium mb-2 opacity-90">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold">{displayValue}</span>
          <span className="text-xs ml-1 opacity-75">{unit}</span>
        </div>
        {status === "normal" && <TrendingUp className="w-4 h-4" />}
        {status !== "normal" && <TrendingDown className="w-4 h-4" />}
      </div>
    </div>
  )
}
