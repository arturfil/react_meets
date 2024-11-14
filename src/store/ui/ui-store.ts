import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface State {
  isSideNavOpen: boolean;
  theme: Theme;
  toggleSideNav: () => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const storedTheme = localStorage.getItem('ui_store') 
      ? JSON.parse(localStorage.getItem('ui_store')!).state.theme
      : null;
    
    if (storedTheme) {
      return storedTheme;
    }
    
    // If no stored theme, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
};

const uiStore: StateCreator<State> = (set, get) => ({
  isSideNavOpen: false,
  theme: getInitialTheme(),

  toggleSideNav: () =>
    set({
      isSideNavOpen: !get().isSideNavOpen,
    }),

  setTheme: (theme: Theme) => set({ theme }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
});

export const useUIStore = create<State>()(
  persist(uiStore, { 
    name: 'ui_store',
    onRehydrateStorage: () => {
      // Apply theme as soon as store is rehydrated
      if (typeof window !== 'undefined') {
        const theme = getInitialTheme();
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
      return (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
        }
      };
    },
  })
);
