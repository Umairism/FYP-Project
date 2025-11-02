"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, Activity, Smartphone, AlertCircle, Settings } from "lucide-react"

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Activity, label: "Monitor", href: "/monitor" },
  { icon: Smartphone, label: "Devices", href: "/devices" },
  { icon: AlertCircle, label: "Alerts", href: "/alerts" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="grid grid-cols-5 gap-0">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
