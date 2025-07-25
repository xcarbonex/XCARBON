import { create } from 'zustand';
import settingsService from '../services/settingsService';
import { withDevtools } from './withDevtools';

const useSettingsStore = create(withDevtools((set) => ({
  userDetail: null,
  updateDetailResult: null,
  loading: false,
  error: null,

  fetchUserDetail: async () => {
    set({ loading: true, error: null });
    try {
      const response = await settingsService.getDetail();
      if (response.success) {
        set({ userDetail: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUserDetail: async (input) => {
    set({ loading: true, error: null });
    try {
      const response = await settingsService.updateDetail(input);
      if (response.success) {
        set({ updateDetailResult: response.data, loading: false });
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
}), 'SettingsStore'));

export default useSettingsStore; 