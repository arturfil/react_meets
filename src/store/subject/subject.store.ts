import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Category } from '@/interfaces/Category';
import { Subject } from '@/interfaces/Subject';

interface SubjectState {
  subjects: Subject[] | null;
  loading: boolean;
  categories: Category[] | null;
  isSubjectDialogOpen: boolean;
  searchedSubjects: Subject[] | null;

  getSubjects: () => Promise<void>;
  getSubjectCategories: () => Promise<void>;
  setSubjectDialogOpen: (val: boolean) => void;
  searchSubjects: (queryWord: string) => void;
}

const storeApi: StateCreator<SubjectState> = (set) => ({
  subjects: [],
  loading: false,
  categories: [],
  isSubjectDialogOpen: false,
  searchedSubjects: [],

  getSubjects: async () => {
    try {
      const subjects: any = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/subjects',
      ).then((res) => res.json());
      set({ subjects });
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  getSubjectCategories: async () => {
    try {
      const categories = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/categories',
      ).then((res) => res.json());
      set({ categories });
    } catch (error) {
      console.error('Error fetching subject categories:', error);
    }
  },

  searchSubjects: async (queryWord: string) => {
    try {
      const searchedSubjects = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/subjects/search?queryWord=${queryWord}`,
      ).then((res) => res.json());
      if (searchedSubjects !== null) {
        set({ searchedSubjects });
      }
    } catch (error) {
      console.log('Error', error);
    }
  },

  setSubjectDialogOpen: (val: boolean) => set({ isSubjectDialogOpen: val }),
});

export const useSubjectStore = create<SubjectState>()(
  devtools(storeApi, { name: 'subject-store' }),
);
