import { Schedule } from '@/interfaces/Schedule';
import { formatTime } from '@/utils/stringUtils';
import { Pencil } from 'lucide-react';
import React from 'react';
import { useScheduleStore } from '@/store/schedules/schedule.store';

interface Props {
  schedule: Schedule;
}

export default function ScheduleCard({ schedule }: Props) {
  const setScheduleDialogOpen = useScheduleStore(
    (state) => state.setScheduleDialogOpen,
  );
  const setOpType = useScheduleStore(state => state.setOpType);
  const setPrevDay = useScheduleStore(state => state.setPrevDay);

  return (
    <>
      <div
        key={schedule.day}
        className='rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-[#383d44]'
      >
        <div className='flex justify-between'>
          <div className='items-center justify-between'>
            <h3 className='font-medium capitalize'>{schedule.day}</h3>
          </div>
          <div className='hover:cursor-pointer'>
            <Pencil onClick={() => {
                setPrevDay(schedule.day);
                setScheduleDialogOpen(true);
                setOpType("EditSchedule");
              }} 
              size={20} 
            />
          </div>
        </div>
        <p className='mt-2 text-sm text-gray-400'>
          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
        </p>
      </div>
    </>
  );
}
