import { create } from "zustand";

interface DrawerState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useDrawerStore = create<DrawerState>(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  })
);
