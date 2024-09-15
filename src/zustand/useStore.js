import { create } from "zustand";

// Function to save state to localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Function to load state from localStorage
const loadFromLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
};

export const useStore = create((set, get) => ({
  favorites: loadFromLocalStorage("favourites", []),

  toggleFavorite: (product) => {
    set((state) => {
      const isFavorited = state.favorites.some((fav) => fav.id === product.id);
      const updatedFavorites = isFavorited
        ? state.favorites.filter((fav) => fav.id !== product.id)
        : [...state.favorites, product];

      saveToLocalStorage("favorites", updatedFavorites);
      return { favorites: updatedFavorites };
    });
  },
}));
