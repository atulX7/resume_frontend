import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarSettings {
  disabled: boolean;
}

export interface UserSidebarState {
  isOpen: boolean;
  isMobile: boolean;
  settings: SidebarSettings;
  toggleOpen: () => void;
  setMobile: (isMobile: boolean) => void;
  toggleDisabled: () => void;
}

export const useUserSidebarStore = create<UserSidebarState>()(
  persist(
    (set, get) => ({
      isOpen: true,
      isMobile: false,
      settings: {
        disabled: false,
      },
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      setMobile: (isMobile) => {
        const currentState = get();
        if (currentState.isMobile !== isMobile) {
          set({ isMobile });
        }
      },
      toggleDisabled: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            disabled: !state.settings.disabled,
          },
        })),
    }),
    {
      name: "user-sidebar",
      skipHydration: typeof window === "undefined",
    }
  )
); 