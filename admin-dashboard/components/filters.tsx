"use client"

import * as React from "react"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Search, X, Filter } from "lucide-react"

export interface FilterState {
  search: string
  venueType: string
  approved: string
  highlighted: string
  ecosystemFocus: string
  startDate: string
  endDate: string
}

interface FiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      search: "",
      venueType: "",
      approved: "",
      highlighted: "",
      ecosystemFocus: "",
      startDate: "",
      endDate: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== "")

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events by name, location, or theme..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 bg-[#52c7f3] text-white rounded-full px-2 py-0.5 text-xs">
                {Object.values(filters).filter(v => v !== "").length}
              </span>
            )}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Venue Type
              </label>
              <Select
                value={filters.venueType}
                onChange={(e) => handleChange("venueType", e.target.value)}
              >
                <option value="">All</option>
                <option value="IRL">IRL</option>
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Approval Status
              </label>
              <Select
                value={filters.approved}
                onChange={(e) => handleChange("approved", e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Approved</option>
                <option value="false">Not Approved</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Highlighted
              </label>
              <Select
                value={filters.highlighted}
                onChange={(e) => handleChange("highlighted", e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Ecosystem Focus
              </label>
              <Select
                value={filters.ecosystemFocus}
                onChange={(e) => handleChange("ecosystemFocus", e.target.value)}
              >
                <option value="">All</option>
                <option value="Adjacent">Adjacent</option>
                <option value="Core">Core</option>
                <option value="Ecosystem">Ecosystem</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Start Date From
              </label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                End Date To
              </label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

