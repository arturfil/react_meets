import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Schedule } from '@/interfaces/Schedule';

interface ScheduleState {
  schedules: Schedule[] | null;
  scheduleDialogOpen: boolean;

  getSchedules: (id: string) => Promise<void>;
  setScheduleDialogOpen: (val: boolean) => void;
}

const storeApi: StateCreator<ScheduleState> = (set) => ({
  schedules: null,
  scheduleDialogOpen: false,

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

  setScheduleDialogOpen: (val: boolean) => set({scheduleDialogOpen: val}),
});

export const useScheduleStore = create<ScheduleState>()(
  devtools(storeApi, { name: 'schedule-store' })
);
