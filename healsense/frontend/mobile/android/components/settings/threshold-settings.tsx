"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ThresholdSettings() {
  const [thresholds, setThresholds] = useState({
    heartRateMin: 50,
    heartRateMax: 120,
    spo2Min: 92,
    tempMax: 38,
    sysMin: 90,
    sysMax: 140,
    diaMin: 60,
    diaMax: 90,
    rrMin: 12,
    rrMax: 20,
  })
  const [saved, setSaved] = useState(false)
  const [modified, setModified] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("healsense-thresholds")
    if (saved) {
      setThresholds(JSON.parse(saved))
    }
  }, [])

  const handleChange = (key: string, value: number) => {
    setThresholds((prev) => ({ ...prev, [key]: value }))
    setModified(true)
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem("healsense-thresholds", JSON.stringify(thresholds))
    setSaved(true)
    setModified(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    if (confirm("Reset to default thresholds?")) {
      const defaults = {
        heartRateMin: 50,
        heartRateMax: 120,
        spo2Min: 92,
        tempMax: 38,
        sysMin: 90,
        sysMax: 140,
        diaMin: 60,
        diaMax: 90,
        rrMin: 12,
        rrMax: 20,
      }
      setThresholds(defaults)
      setModified(true)
    }
  }

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning flex items-start gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>Adjust thresholds to customize when alerts are triggered. Changes are saved locally.</p>
      </div>

      <div className="p-4 bg-card border border-border rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Heart Rate (bpm)</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.heartRateMin}
                onChange={(e) => handleChange("heartRateMin", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Min"
              />
              <p className="text-xs text-muted-foreground mt-1">Min (warning)</p>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.heartRateMax}
                onChange={(e) => handleChange("heartRateMax", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Max"
              />
              <p className="text-xs text-muted-foreground mt-1">Max (warning)</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SpO₂ Minimum (%)</label>
          <input
            type="number"
            value={thresholds.spo2Min}
            onChange={(e) => handleChange("spo2Min", Number.parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">Alert below this percentage</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Temperature Maximum (°C)</label>
          <input
            type="number"
            step="0.1"
            value={thresholds.tempMax}
            onChange={(e) => handleChange("tempMax", Number.parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">Alert above this temperature</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Systolic BP (mmHg)</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.sysMin}
                onChange={(e) => handleChange("sysMin", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Min"
              />
              <p className="text-xs text-muted-foreground mt-1">Min</p>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.sysMax}
                onChange={(e) => handleChange("sysMax", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Max"
              />
              <p className="text-xs text-muted-foreground mt-1">Max</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Diastolic BP (mmHg)</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.diaMin}
                onChange={(e) => handleChange("diaMin", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Min"
              />
              <p className="text-xs text-muted-foreground mt-1">Min</p>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.diaMax}
                onChange={(e) => handleChange("diaMax", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Max"
              />
              <p className="text-xs text-muted-foreground mt-1">Max</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Respiratory Rate (br/min)</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.rrMin}
                onChange={(e) => handleChange("rrMin", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Min"
              />
              <p className="text-xs text-muted-foreground mt-1">Min</p>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={thresholds.rrMax}
                onChange={(e) => handleChange("rrMax", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm"
                placeholder="Max"
              />
              <p className="text-xs text-muted-foreground mt-1">Max</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          disabled={!modified}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
        >
          {saved ? "Saved!" : "Save Thresholds"}
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 border-border bg-transparent">
          Reset
        </Button>
      </div>
    </div>
  )
}
