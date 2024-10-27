import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Schedule } from '@/interfaces/Schedule';

interface ScheduleState {
  schedules: Schedule[] | null;

  getSchedules: (id: string) => Promise<void>;
}

const storeApi: StateCreator<ScheduleState> = (set) => ({
  schedules: null,

  getSchedules: async (id: string) => {
    try {
      const response: any = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/schedule/' + id
      ).then((res) => res.json());
      console.log(response);
      set({ schedules: response });
    } catch (error) {
      console.log('error', error);
    }
  },
});

export const useScheduleStore = create<ScheduleState>()(
  devtools(storeApi, { name: 'schedule-store' })
);
