import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Subject } from '@/interfaces/Subject';
import { useAuthStore } from '../auth/auth.store';
import { toast } from 'react-toastify';

interface TeachingState {
  teachings: Subject[] | null;
  loading: boolean;

  getTeachings: () => Promise<void>;
  createTeaching: ({
    teacher_id,
    subject_id,
  }: {
    teacher_id: string;
    subject_id: string;
  }) => Promise<void>;
  deleteTeaching: (teachingId: string) => Promise<void>;
}

const storeApi: StateCreator<TeachingState> = (set, get) => ({
  teachings: null,
  loading: false,

  getTeachings: async () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      console.log('No User');
      return;
    }

    try {
      const teachings: any = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/teachings/${user.id}`,
      ).then((res) => res.json());
      set({ teachings });
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  createTeaching: async ({
    teacher_id,
    subject_id,
  }: {
    teacher_id: string;
    subject_id: string;
  }) => {
    try {
      let token = JSON.parse(localStorage.getItem('meetings_tk')!);
      const newTeaching = { teacher_id, subject_id };
      await fetch(process.env.NEXT_PUBLIC_API_URL + '/teachings/create', {
        method: 'POST',
        body: JSON.stringify(newTeaching),
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      get().getTeachings();
      toast.success('Subject add to your teachings!', { theme: 'colored' });
    } catch (error) {
      console.log(error);
    }
  },

  deleteTeaching: async (teachingId: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/teachings/delete/' + teachingId,
        {
          method: 'DELETE',
        },
      );
      if (response.status !== 200) {
        toast.info("Couldn't delete the teaching");
      }
      const filteredTeachigns = get().teachings?.filter(
        (teaching) => teaching.id !== teachingId,
      );
      set({ teachings: filteredTeachigns });
      toast.success('Teaching deleted');
    } catch (error) {
      const msg = "Couldn't delete the teaching";
      toast.error(msg);
      throw new Error(msg);
    }
  },
});

export const useTeachingStore = create<TeachingState>()(
  devtools(storeApi, {
    name: 'teachning-store',
  }),
);
