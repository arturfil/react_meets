"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FiltersMenuProps {
  toggleSidebar: Function | any;
  isSidebarOpen: Boolean;
}

export default function FiltersMenu({
  isSidebarOpen,
  toggleSidebar,
}: FiltersMenuProps) {
  const [filters, setFilters] = useState({
    search: "",
    rating: [0],
    subjects: {
      mathematics: false,
      physics: false,
      computerScience: false,
      chemistry: false,
      biology: false,
    },
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
    },
  });

  const formatLabel = (str: string) => {
    return str
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const asideClass = `
    fixed left-0 top-0 z-40 h-full w-[85vw] max-w-[300px] 
    transform overflow-y-auto bg-gray-100 px-4 py-6 
    transition-transform duration-300 ease-in-out lg:sticky 
    lg:top-0 lg:translate-x-0 lg:border-r lg:px-6 
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:h-screen lg:w-[300px] dark:bg-gray-700 rounded-l-md
  `

  return (
    <aside
      className={asideClass}
    >
      {/* Close button for mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute right-4 top-4 p-2 lg:hidden"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="space-y-8 pt-8 lg:pt-0">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Search</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Courses..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-8 bg-white"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Rating</h2>
          <Slider
            defaultValue={[0]}
            max={5}
            step={0.5}
            value={filters.rating}
            onValueChange={(value) => setFilters({ ...filters, rating: value })}
          />
          <div className="mt-2 text-sm text-muted-foreground">
            Minimum rating: {filters.rating[0]}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Subjects</h2>
          <div className="space-y-3">
            {Object.entries(filters.subjects).map(([subject, checked]) => (
              <div
                key={subject}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`subject-${subject}`}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      subjects: {
                        ...filters.subjects,
                        [subject]: checked === true,
                      },
                    })
                  }
                />
                <Label
                  htmlFor={`subject-${subject}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {formatLabel(subject)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Availability</h2>
          <div className="space-y-3">
            {Object.entries(filters.availability).map(([day, checked]) => (
              <div
                key={day}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`day-${day}`}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      availability: {
                        ...filters.availability,
                        [day]: checked === true,
                      },
                    })
                  }
                />
                <Label
                  htmlFor={`day-${day}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {formatLabel(day)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
