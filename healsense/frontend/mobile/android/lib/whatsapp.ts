export const buildWhatsAppLink = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

export const buildEmergencySOSMessage = (patientName: string, reading: Record<string, any>): string => {
  const timestamp = new Date().toLocaleTimeString()
  return `🚨 CRITICAL ALERT for ${patientName}\nHR: ${reading.heart_rate} bpm | SpO₂: ${reading.spo2}% | Temp: ${reading.temperature}°C | BP: ${reading.systolic_bp}/${reading.diastolic_bp} | RR: ${reading.respiratory_rate}\nTime: ${timestamp}\n\n⚠️ Please check immediately — HealSense`
}
