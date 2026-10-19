import { create } from "zustand";

interface UIState {
  darkMode: boolean;
  compactView: boolean;
  toggleDarkMode: () => void;
  toggleCompactView: () => void;
}

const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  compactView: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleCompactView: () => set((state) => ({ compactView: !state.compactView })),
}));

export default useUIStore;
