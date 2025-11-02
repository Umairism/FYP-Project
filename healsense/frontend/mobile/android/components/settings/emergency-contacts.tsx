"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Phone } from "lucide-react"

interface Contact {
  id: string
  name: string
  relation: string
  phone: string
}

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Emergency Service",
      relation: "Emergency",
      phone: "911",
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newContact, setNewContact] = useState({ name: "", relation: "", phone: "" })
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("healsense-emergency-contacts")
    if (saved) {
      setContacts(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("healsense-emergency-contacts", JSON.stringify(contacts))
    }
  }, [contacts])

  const validateContact = () => {
    const newErrors: string[] = []
    if (!newContact.name.trim()) newErrors.push("Name is required")
    if (!newContact.phone.trim()) newErrors.push("Phone number is required")
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleAdd = () => {
    if (validateContact()) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString() }])
      setNewContact({ name: "", relation: "", phone: "" })
      setShowForm(false)
      setErrors([])
    }
  }

  const handleDelete = (id: string) => {
    if (id !== "1" || confirm("Delete emergency service? This cannot be undone.")) {
      setContacts(contacts.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Emergency Contacts</h3>
          <p className="text-xs text-muted-foreground">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 bg-card border border-border rounded-lg flex items-center justify-between group hover:border-accent/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <h3 className="font-medium text-sm">{contact.name}</h3>
              </div>
              {contact.relation && <p className="text-xs text-muted-foreground mt-1">{contact.relation}</p>}
              <p className="text-xs font-mono mt-1 text-primary">{contact.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
              className="text-muted-foreground hover:text-destructive transition-colors ml-4 opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-4 bg-card border border-border rounded-lg space-y-3">
          {errors.length > 0 && (
            <div className="p-2 bg-destructive/10 border border-destructive/30 rounded text-xs text-destructive space-y-1">
              {errors.map((err, i) => (
                <p key={i}>• {err}</p>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="text"
            placeholder="Relation (e.g., Mother, Doctor)"
            value={newContact.relation}
            onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex gap-2">
            <Button onClick={handleAdd} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Contact
            </Button>
            <Button
              onClick={() => {
                setShowForm(false)
                setErrors([])
              }}
              variant="outline"
              className="flex-1 border-border"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      )}
    </div>
  )
}
