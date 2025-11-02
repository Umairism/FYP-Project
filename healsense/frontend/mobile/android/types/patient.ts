export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

export interface Patient {
  id: string
  name: string
  age?: number
  gender?: "M" | "F" | "O"
  phone?: string
  whatsapp?: string
  medical_history?: string[]
  emergency_contacts: EmergencyContact[]
}
