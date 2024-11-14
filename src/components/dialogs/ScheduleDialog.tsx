"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ScheduleUpdateField, TimeSchedule } from '@/interfaces/Schedule';
import { useScheduleStore } from '@/store/schedules/schedule.store';
import { Button } from '../ui/button';

// Type for schedule update handler



interface Schedule {
  monday: TimeSchedule;
  tuesday: TimeSchedule;
  wednesday: TimeSchedule;
  thursday: TimeSchedule;
  friday: TimeSchedule;
  [key: string]: TimeSchedule; // Index signature for dynamic access
}

export default function ScheduleDialog() {

  const [schedule, setSchedule] = useState<Schedule>({
    monday: { start: "09:00", end: "17:00", enabled: true },
    tuesday: { start: "09:00", end: "17:00", enabled: true },
    wednesday: { start: "09:00", end: "17:00", enabled: true },
    thursday: { start: "09:00", end: "17:00", enabled: true },
    friday: { start: "09:00", end: "17:00", enabled: true },
  });


  const scheduleDialogOpen = useScheduleStore(state => state.scheduleDialogOpen)
  const setScheduleDialogOpen = useScheduleStore(state => state.setScheduleDialogOpen);

  const handleScheduleUpdate = (
    day: string,
    field: ScheduleUpdateField,
    value: string | boolean
  ): void => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };


  return (
      <Dialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>
              Set your available working hours for each day.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {Object.entries(schedule).map(([day, hours]) => (
              <div
                key={day}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label className="text-right capitalize">{day}</Label>
                <Input
                  type="time"
                  value={hours.start}
                  onChange={(e) =>
                    handleScheduleUpdate(day, "start", e.target.value)
                  }
                  disabled={!hours.enabled}
                />
                <Input
                  type="time"
                  value={hours.end}
                  onChange={(e) =>
                    handleScheduleUpdate(day, "end", e.target.value)
                  }
                  disabled={!hours.enabled}
                />
                <input
                  type="checkbox"
                  checked={hours.enabled}
                  onChange={(e) =>
                    handleScheduleUpdate(day, "enabled", e.target.checked)
                  }
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setScheduleDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

