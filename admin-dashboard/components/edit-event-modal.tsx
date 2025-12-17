"use client"

import * as React from "react"
import { Event } from "@/lib/database.types"
import { Modal } from "./ui/modal"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { supabase } from "@/lib/supabase"
import { parseJsonField, formatJsonField } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface EditEventModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function EditEventModal({ event, isOpen, onClose, onSave }: EditEventModalProps) {
  const [formData, setFormData] = React.useState<Partial<Event>>({})
  const [isSaving, setIsSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event])

  const handleChange = (field: keyof Event, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldChange = (field: keyof Event, value: string) => {
    const items = value.split(",").map(item => item.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, [field]: formatJsonField(items) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    setIsSaving(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from("events")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", event.id)

      if (updateError) throw updateError

      onSave()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event")
    } finally {
      setIsSaving(false)
    }
  }

  if (!event) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Event: ${event.event || "Untitled"}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-[#222222] border-b pb-2">
              Basic Information
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Event Name *
            </label>
            <Input
              value={formData.event || ""}
              onChange={(e) => handleChange("event", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Location
            </label>
            <Input
              value={formData.location_optional || ""}
              onChange={(e) => handleChange("location_optional", e.target.value)}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Start Date
            </label>
            <Input
              type="datetime-local"
              value={formData.start_value ? new Date(formData.start_value).toISOString().slice(0, 16) : ""}
              onChange={(e) => handleChange("start_value", e.target.value ? new Date(e.target.value).toISOString() : null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              End Date
            </label>
            <Input
              type="datetime-local"
              value={formData.end_value ? new Date(formData.end_value).toISOString().slice(0, 16) : ""}
              onChange={(e) => handleChange("end_value", e.target.value ? new Date(e.target.value).toISOString() : null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Venue Type
            </label>
            <Select
              value={formData.venue_type || ""}
              onChange={(e) => handleChange("venue_type", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="IRL">IRL</option>
              <option value="Virtual">Virtual</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Ecosystem Focus
            </label>
            <Select
              value={formData.ecosystem_focus || ""}
              onChange={(e) => handleChange("ecosystem_focus", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Adjacent">Adjacent</option>
              <option value="Core">Core</option>
              <option value="Ecosystem">Ecosystem</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Season
            </label>
            <Input
              value={formData.season || ""}
              onChange={(e) => handleChange("season", e.target.value)}
              placeholder="e.g., Spring 2025"
            />
          </div>

          {/* Links and Social */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h3 className="text-lg font-semibold text-[#222222] border-b pb-2">
              Links & Social Media
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Website Links (comma-separated)
            </label>
            <Input
              value={parseJsonField(formData.link || null).join(", ")}
              onChange={(e) => handleArrayFieldChange("link", e.target.value)}
              placeholder="https://example.com, https://example2.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Twitter
            </label>
            <Input
              value={formData.twitter || ""}
              onChange={(e) => handleChange("twitter", e.target.value)}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Farcaster
            </label>
            <Input
              value={formData.farcaster || ""}
              onChange={(e) => handleChange("farcaster", e.target.value)}
              placeholder="Farcaster handle or link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Discord
            </label>
            <Input
              value={formData.discord || ""}
              onChange={(e) => handleChange("discord", e.target.value)}
              placeholder="https://discord.gg/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Telegram
            </label>
            <Input
              value={formData.telegram || ""}
              onChange={(e) => handleChange("telegram", e.target.value)}
              placeholder="https://t.me/..."
            />
          </div>

          {/* Media */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h3 className="text-lg font-semibold text-[#222222] border-b pb-2">
              Media
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Logo URL
            </label>
            <Input
              value={formData.logo || ""}
              onChange={(e) => handleChange("logo", e.target.value)}
              placeholder="https://..."
            />
            {formData.logo && (
              <img src={formData.logo} alt="Logo preview" className="mt-2 w-20 h-20 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Banner Image URL
            </label>
            <Input
              value={formData.banner_image || ""}
              onChange={(e) => handleChange("banner_image", e.target.value)}
              placeholder="https://..."
            />
            {formData.banner_image && (
              <img src={formData.banner_image} alt="Banner preview" className="mt-2 w-full h-24 object-cover rounded" />
            )}
          </div>

          {/* Categories and Themes */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h3 className="text-lg font-semibold text-[#222222] border-b pb-2">
              Categories & Themes
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Categories (comma-separated)
            </label>
            <Input
              value={parseJsonField(formData.category_optional || null).join(", ")}
              onChange={(e) => handleArrayFieldChange("category_optional", e.target.value)}
              placeholder="Conference, Workshop, Meetup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Themes (comma-separated)
            </label>
            <Input
              value={parseJsonField(formData.theme_optional || null).join(", ")}
              onChange={(e) => handleArrayFieldChange("theme_optional", e.target.value)}
              placeholder="DeFi, NFTs, Privacy"
            />
          </div>

          {/* Status */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h3 className="text-lg font-semibold text-[#222222] border-b pb-2">
              Status
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.approved || false}
                onChange={(e) => handleChange("approved", e.target.checked)}
              />
              <span className="text-sm font-medium text-[#222222]">Approved</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.highlighted || false}
                onChange={(e) => handleChange("highlighted", e.target.checked)}
              />
              <span className="text-sm font-medium text-[#222222]">Highlighted</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

