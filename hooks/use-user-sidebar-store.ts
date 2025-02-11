import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggleOpen: () => void;
  settings: {
    disabled: boolean;
  };
}

export const useUserSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  settings: {
    disabled: false,
  },
})); 