import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // props
  isSideNavOpen: boolean;

  // method interfaces
  toggleSideNav: () => void;
}

export const useUIStore = create<State>()(
  persist(
    (set, get) => ({
      isSideNavOpen: false,

      toggleSideNav: () => set({ isSideNavOpen: !get().isSideNavOpen }),
    }),

    { name: "ui_store" },
  ),
);
