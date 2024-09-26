import { create } from "zustand";

interface CategoryStore {
  activeCategoryId: number;
  setActiveCategoryId: (categoryId: number) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeCategoryId: 1,
  setActiveCategoryId: (categoryId) => set({ activeCategoryId: categoryId }),
}));
