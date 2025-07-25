import { create } from 'zustand';
import listAssetsService from '../services/listAssetsService';
import { withDevtools } from './withDevtools';

const useListAssetsStore = create(withDevtools((set) => ({
  saleTokenizedAssets: null,
  listAssetsResult: null,
  searchAssetsResult: null,
  loading: false,
  error: null,

  fetchSaleTokenizedAssets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await listAssetsService.getSaleTokenizedAssets();
      if (response.success) {
        set({ saleTokenizedAssets: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  listUserAssets: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await listAssetsService.listAssets(payload);
      if (response.success) {
        set({ listAssetsResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  searchUserAssets: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await listAssetsService.searchAssets(id);
      if (response.success) {
        set({ searchAssetsResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}), 'ListAssetsStore'));

export default useListAssetsStore; 