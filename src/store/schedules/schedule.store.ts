import { toast } from 'react-toastify';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Schedule, WeekDay } from '@/interfaces/Schedule';
import { OperationType } from '@/types/Schedule';


interface ScheduleState {
  schedules: Schedule[];
  scheduleDialogOpen: boolean;
  opTtype: OperationType;
  prevDay: WeekDay | null;

  getSchedules: (id: string) => Promise<void>;
  addSchedule: (schedule: Schedule) => Promise<void>;
  editSchedule: (schedule: Schedule, prevDay: WeekDay) => Promise<void>;
  setScheduleDialogOpen: (val: boolean) => void;
  setOpType: (val: OperationType) => void;
  setPrevDay: (day: WeekDay) => void;
}

const storeApi: StateCreator<ScheduleState> = (set, get) => ({
  schedules: new Array(),
  scheduleDialogOpen: false,
  opTtype: null,
  prevDay: null,

  getSchedules: async (id: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/schedules/' + id,
      ).then((res) => res.json());
      console.log(response);

      set({ schedules: response });

      if (response.err) {
        toast.error(response.err);
        console.log(response.error);

        return;
      }
      console.log('response -> ', response);
    } catch (error) {
      console.log('error', error);
    }
  },

  addSchedule: async (schedule: Schedule) => {

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/schedules/schedule',
        {
          method: 'POST',
          body: JSON.stringify(schedule),
        },
      );
      if (response.status !== 200) {
        toast.error("Couldn't submit schedule");
      }
      toast.success('Created a schedule successfully');
      // if it's not an array, set it to an array
      if (!Array.isArray(get().schedules)) {
        set({schedules: [schedule]})
      } else {
        set({ schedules: [...get().schedules, schedule] });
      }
    } catch (error) {
      console.log("Error -->", typeof(get().schedules))
    }
  },

  editSchedule: async (schedule: Schedule, prevDay: WeekDay) => {

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/schedules/schedule/' + prevDay,
        {
          method: 'PUT',
          body: JSON.stringify(schedule),
        },
      );
      if (response.status !== 200) {
        toast.error("Couldn't submit schedule");
      }
      toast.success('Created a schedule successfully');
      // if it's not an array, set it to an array
      if (!Array.isArray(get().schedules)) {
        set({schedules: [schedule]})
      } else {
        set({ schedules: [...get().schedules.filter(s => s.day !== prevDay), schedule] });
      }
    } catch (error) {
      console.log("Error -->", typeof(get().schedules))
    }
  },

  setScheduleDialogOpen: (val: boolean) => set({ scheduleDialogOpen: val }),

  setOpType: (val: OperationType) => set({opTtype: val}),

  setPrevDay: (day: WeekDay) => set({prevDay: day}),
});

export const useScheduleStore = create<ScheduleState>()(
  devtools(storeApi, { name: 'schedule-store' }),
);
