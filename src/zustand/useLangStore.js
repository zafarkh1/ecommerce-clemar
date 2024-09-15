import { create } from "zustand";

export const useLangStore = create((set) => ({
  currentLanguage: localStorage.getItem("i18nextLng"),
  setCurrentLanguage: (language) => set({ currentLanguage: language }),
}));
