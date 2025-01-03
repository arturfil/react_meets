import { toast } from 'react-toastify';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ErrorLoginResponse } from '@/interfaces/Error';
import { RegisterUser, User } from '@/interfaces/User';
import { delay } from '@/utils/delay';

export interface AuthState {
  status: string;
  token?: string | undefined;
  user: User | undefined;
  lastFetched: number | null;
  users: User[] | [];
  teachers: User[];
  error: ErrorLoginResponse | undefined;
  loading: boolean;

  loginUser: (
    email: string,
    password: string,
  ) => Promise<'success' | undefined>;
  signUpUser: (user: RegisterUser) => Promise<void>;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
  getAllUsers: () => Promise<void>;
  getTeachers: () => Promise<void>;
  getUserByToken: () => Promise<void>;
}

const CACHE_DURATION = 60 * 60 * 1000; // every hour

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  lastFetched: null,
  isAdmin: undefined,
  users: [],
  teachers: [],
  error: undefined,
  loading: true,

  loginUser: async (email: string, password: string) => {
    try {
      let data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      }).then((res) => res.json());

      if (data.error) {
        set({ error: data });
        setTimeout(() => {
          set({ error: undefined });
        }, 4000);
        return;
      }

      localStorage.setItem('meetings_tk', JSON.stringify(data.token));
      set({
        token: data.token,
        status: 'authenticated',
      });
      toast.success('Logged In!', {
        theme: 'colored',
      });

      get().getUserByToken();
      return 'success';
    } catch (error) {
      console.log(error);
    }
  },

  signUpUser: async (user: RegisterUser) => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  logoutUser: () => {
    toast.info('Loged Out!', {
      theme: 'colored',
    });
    localStorage.removeItem('meetings_tk');
    set({ error: undefined });
  },

  isLoggedIn: () => {
    if (typeof localStorage === 'undefined') return false; // if pre-rendered ?
    let token: string = JSON.parse(window.localStorage.getItem('meetings_tk')!);
    return token !== null;
  },

  getAllUsers: async () => {
    try {
      let token: string = JSON.parse(localStorage.getItem('meetings_tk')!)!;
      let users = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/users/admin',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      ).then((res) => res.json());
      set({ users });
    } catch (error) {}
  },

  getTeachers: async () => {
    const { lastFetched, teachers } = get();

    if (lastFetched && teachers) {
      const now = Date.now();
      if (now - lastFetched < CACHE_DURATION) {
        return;
      }
    }

    set({ loading: true });

    await delay(1000);

    try {
      let data = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/teachers',
      ).then((res) => res.json());
      set({ teachers: data, lastFetched: Date.now()});
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getUserByToken: async () => {
    let token: string = JSON.parse(localStorage.getItem('meetings_tk')!)!;
    try {
      let user: any = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/users/bytoken',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      ).then((res) => res.json());

      set({ user: user });
    } catch (error) {
      console.log(error);
    }
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-store' })),
);
