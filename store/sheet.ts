import { boolean } from "drizzle-orm/mysql-core";
import { create } from "zustand";

interface Sheet {
  id: string;
  isOpen: boolean;
}

interface SheetStore {
  sheets: Record<string, Sheet>;
  openSheet: (id: string) => void;
  closeSheet: (id: string) => void;
  toggleSheet: (id: string, value: boolean) => void;
  getSheet: (id: string) => Sheet | undefined;
}

export const useSheetStore = create<SheetStore>(
  (set, get) => ({
    sheets: {},

    openSheet: (id: string) =>
      set((state) => ({
        sheets: {
          ...state.sheets,
          [id]: { id, isOpen: true },
        },
      })),

    closeSheet: (id: string) =>
      set((state) => ({
        sheets: {
          ...state.sheets,
          [id]: { ...state.sheets[id], isOpen: false },
        },
      })),

    toggleSheet: (id: string, value: boolean) => {
      set((state) => ({
        sheets: {
          ...state.sheets,
          [id]: {
            id,
            isOpen: value,
          },
        },
      }));
    },

    getSheet: (id: string) => get().sheets[id],
  })
);
