import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Teaching } from '../../interfaces/Teaching';
import { useAuthStore } from '../auth/auth.store';

interface TeachingState {
  teachings: Teaching[] | null;
  loading: boolean;

  getTeachings: () => Promise<void>;
}

const storeApi: StateCreator<TeachingState> = (set) => ({
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
        process.env.NEXT_PUBLIC_API_URL + `/teachings/${user.id}`
      ).then((res) => res.json());
      console.log('Teachings', teachings);
      set({ teachings });
    } catch (error) {
      console.log('Error: ', error);
    }
  },
});

export const useTeachingStore = create<TeachingState>()(
  devtools(storeApi, {
    name: 'teachning-store',
  })
);
