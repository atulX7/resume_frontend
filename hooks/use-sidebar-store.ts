import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  settings: {
    disabled: boolean;
  };
  toggleOpen: () => void;
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isOpen: true,
  settings: {
    disabled: false,
  },
  toggleOpen: () => set({ isOpen: !get().isOpen }),
})); 