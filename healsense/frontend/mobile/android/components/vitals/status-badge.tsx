import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

interface StatusBadgeProps {
  status: "normal" | "warning" | "critical"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    normal: {
      bg: "bg-success/10 border-success/30",
      text: "text-success",
      icon: CheckCircle,
      label: "All Vitals Normal",
    },
    warning: {
      bg: "bg-warning/10 border-warning/30",
      text: "text-warning",
      icon: AlertTriangle,
      label: "Warning - Check Vitals",
    },
    critical: {
      bg: "bg-destructive/10 border-destructive/30",
      text: "text-destructive",
      icon: AlertCircle,
      label: "Critical Alert",
    },
  }

  const config = configs[status]
  const Icon = config.icon

  return (
    <div className={`p-3 rounded-lg border flex items-center gap-2 ${config.bg} ${config.text}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium text-sm">{config.label}</span>
    </div>
  )
}
