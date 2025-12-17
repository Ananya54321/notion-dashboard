"use client"

import * as React from "react"
import { Event } from "@/lib/database.types"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Edit, ExternalLink, Calendar, MapPin, Check, X } from "lucide-react"
import { format } from "date-fns"
import { parseJsonField } from "@/lib/utils"

interface EventsTableProps {
  events: Event[]
  onEdit: (event: Event) => void
}

export function EventsTable({ events, onEdit }: EventsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#222222] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Event
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Venue Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Ecosystem
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  No events found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      {event.logo && (
                        <img
                          src={event.logo}
                          alt={event.event || "Event"}
                          className="w-10 h-10 rounded object-cover flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-[#222222] truncate">
                          {event.event || "Untitled Event"}
                        </div>
                        {event.theme_optional && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {parseJsonField(event.theme_optional).slice(0, 2).map((theme, idx) => (
                              <Badge key={idx} variant="default" className="text-xs">
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {event.location_optional || "TBA"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <div>
                        {event.start_value && (
                          <div>{format(new Date(event.start_value), "MMM d, yyyy")}</div>
                        )}
                        {event.end_value && event.start_value !== event.end_value && (
                          <div className="text-xs text-gray-500">
                            to {format(new Date(event.end_value), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {event.venue_type && (
                      <Badge variant="default">{event.venue_type}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {event.approved ? (
                          <Badge variant="success" className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="flex items-center gap-1">
                            <X className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      {event.highlighted && (
                        <Badge variant="default" className="w-fit">
                          ⭐ Highlighted
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {event.ecosystem_focus && (
                      <Badge variant="default">{event.ecosystem_focus}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(event)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      {event.link && (
                        <a
                          href={parseJsonField(event.link)[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#52c7f3] hover:text-[#52c7f3]/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

