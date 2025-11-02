"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, LogOut, Trash2, Bell, Globe, HardDrive } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/layout/bottom-nav"
import ThresholdSettings from "@/components/settings/threshold-settings"
import EmergencyContacts from "@/components/settings/emergency-contacts"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"general" | "thresholds" | "contacts">("general")
  const [preferences, setPreferences] = useState({
    units: "metric",
    language: "english",
    notifications: true,
    dataSync: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem("healsense-preferences")
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("healsense-preferences", JSON.stringify(preferences))
  }, [preferences])

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user")
      router.push("/auth/login")
    }
  }

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all cached data? This cannot be undone.")) {
      indexedDB.deleteDatabase("healsense-db")
      alert("Data cleared. Please refresh the page.")
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border overflow-x-auto">
          {(["general", "thresholds", "contacts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex-shrink-0 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "general" ? "General" : tab === "thresholds" ? "Thresholds" : "Contacts"}
            </button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Units
                </label>
                <select
                  value={preferences.units}
                  onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="metric">Metric (°C, kg, cm)</option>
                  <option value="imperial">Imperial (°F, lbs, in)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Push Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    Data Sync
                  </label>
                  <input
                    type="checkbox"
                    checked={preferences.dataSync}
                    onChange={(e) => setPreferences({ ...preferences, dataSync: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-4 bg-card border border-destructive/30 rounded-lg space-y-3">
              <h3 className="font-semibold text-sm text-destructive">Danger Zone</h3>

              <Button
                variant="outline"
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/5 bg-transparent"
                onClick={handleClearData}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cached Data
              </Button>

              <Button
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}

        {/* Thresholds */}
        {activeTab === "thresholds" && <ThresholdSettings />}

        {/* Emergency Contacts */}
        {activeTab === "contacts" && <EmergencyContacts />}
      </div>

      <BottomNav />
    </div>
  )
}
