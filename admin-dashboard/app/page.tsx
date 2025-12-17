"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Event } from "@/lib/database.types"
import { EventsTable } from "@/components/events-table"
import { Filters, FilterState } from "@/components/filters"
import { EditEventModal } from "@/components/edit-event-modal"
import { Button } from "@/components/ui/button"
import { RefreshCw, Database } from "lucide-react"

export default function AdminDashboard() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    venueType: "",
    approved: "",
    highlighted: "",
    ecosystemFocus: "",
    startDate: "",
    endDate: "",
  })

  const fetchEvents = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_value", { ascending: false })

      if (error) throw error
      setEvents(data || [])
      setFilteredEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  React.useEffect(() => {
    let filtered = [...events]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(event => 
        event.event?.toLowerCase().includes(searchLower) ||
        event.location_optional?.toLowerCase().includes(searchLower) ||
        event.theme_optional?.toLowerCase().includes(searchLower)
      )
    }

    // Venue type filter
    if (filters.venueType) {
      filtered = filtered.filter(event => event.venue_type === filters.venueType)
    }

    // Approved filter
    if (filters.approved !== "") {
      const isApproved = filters.approved === "true"
      filtered = filtered.filter(event => event.approved === isApproved)
    }

    // Highlighted filter
    if (filters.highlighted !== "") {
      const isHighlighted = filters.highlighted === "true"
      filtered = filtered.filter(event => event.highlighted === isHighlighted)
    }

    // Ecosystem focus filter
    if (filters.ecosystemFocus) {
      filtered = filtered.filter(event => event.ecosystem_focus === filters.ecosystemFocus)
    }

    // Start date filter
    if (filters.startDate) {
      filtered = filtered.filter(event => 
        event.start_value && new Date(event.start_value) >= new Date(filters.startDate)
      )
    }

    // End date filter
    if (filters.endDate) {
      filtered = filtered.filter(event => 
        event.end_value && new Date(event.end_value) <= new Date(filters.endDate)
      )
    }

    setFilteredEvents(filtered)
  }, [filters, events])

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    fetchEvents()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-[#222222] text-white shadow-lg">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#52c7f3] p-3 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Events Admin Dashboard</h1>
                <p className="text-gray-300 text-sm mt-1">
                  Manage and monitor all events
                </p>
              </div>
            </div>
            <Button
              onClick={fetchEvents}
              variant="outline"
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Events</div>
            <div className="text-3xl font-bold text-[#222222]">{events.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1">Approved</div>
            <div className="text-3xl font-bold text-green-600">
              {events.filter(e => e.approved).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1">Highlighted</div>
            <div className="text-3xl font-bold text-[#52c7f3]">
              {events.filter(e => e.highlighted).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1">Filtered Results</div>
            <div className="text-3xl font-bold text-[#222222]">{filteredEvents.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-[#52c7f3] mx-auto mb-4" />
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : (
          <EventsTable events={filteredEvents} onEdit={handleEdit} />
        )}
      </main>

      {/* Edit Modal */}
      <EditEventModal
        event={selectedEvent}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedEvent(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
