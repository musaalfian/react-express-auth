import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

// Fungsi untuk menyimpan state ke localStorage
const saveStateToLocalStorage = (state) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('authenticatedUser', serializedState);
   } catch (error) {
      console.error('Gagal menyimpan state ke localStorage:', error);
   }
};

// Fungsi untuk memuat state dari localStorage
const loadStateFromLocalStorage = () => {
   try {
      const serializedState = localStorage.getItem('authenticatedUser');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
   } catch (error) {
      console.error('Gagal memuat state dari localStorage:', error);
      return undefined;
   }
};

// Memuat state awal dari localStorage
const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
   reducer: {
      user: userSlice,
   },
   preloadedState,
});

// Simpan state ke localStorage setiap kali state berubah
store.subscribe(() => {
   saveStateToLocalStorage(store.getState());
});

export default store;
