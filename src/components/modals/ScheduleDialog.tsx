'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth/auth.store';
import { useScheduleStore } from '@/store/schedules/schedule.store';
import { Schedule, WeekDay } from '@/interfaces/Schedule';
import { capitalize } from '@/utils/stringUtils';
import { Button } from '../ui/button';
import { OperationType } from '@/types/Schedule';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ScheduleDialog() {
  const schedules = useScheduleStore((state) => state.schedules);
  const weekdays: WeekDay[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  const user = useAuthStore((state) => state.user);
  const prevDay = useScheduleStore(state => state.prevDay);
  const scheduleDialogOpen = useScheduleStore(
    (state) => state.scheduleDialogOpen,
  );
  const setScheduleDialogOpen = useScheduleStore(
    (state) => state.setScheduleDialogOpen,
  );
  const opType = useScheduleStore((state) => state.opTtype);
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const editSchedule = useScheduleStore((state) => state.editSchedule);

  const [schedule, setSchedule] = useState<Schedule>({
    user_id: user?.id ?? '',
    start_time: '',
    end_time: '',
    day: '',
  });

  function handleScheduleSubmit() {
    if (opType === 'AddSchedule') addSchedule(schedule);
    if (opType === 'EditSchedule') editSchedule(schedule, prevDay);

    setScheduleDialogOpen(false);
  }

  return (
    <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {schedules ? 'Edit Schedule' : 'Add your schedules'}
          </DialogTitle>
          <DialogDescription>
            Set your available working hours for each day.
          </DialogDescription>
        </DialogHeader>
        <select
          onChange={(e) =>
            setSchedule({ ...schedule, day: e.target.value as WeekDay })
          }
          defaultValue='default'
          className='rounded-md border-2 border-gray-300 p-2 px-10 dark:bg-[#191c21]'
        >
          <option disabled value='default'>
            Choose a day
          </option>
          {weekdays.map((day) => (
            <option key={day} value={day}>
              {capitalize(day)}
            </option>
          ))}
        </select>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Label className='capitalize'>Star Time</Label>
            <Input
              onChange={(e) =>
                setSchedule({ ...schedule, start_time: e.target.value })
              }
              value={schedule.start_time}
              type='time'
            />
          </div>
          <div>
            <Label className='capitalize'>End Time</Label>
            <Input
              onChange={(e) =>
                setSchedule({ ...schedule, end_time: e.target.value })
              }
              value={schedule.end_time}
              type='time'
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleScheduleSubmit}>
            {schedules ? 'Save changes' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
