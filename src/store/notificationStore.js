import { create } from 'zustand';
import notificationService from '../services/notificationService';
import { withDevtools } from './withDevtools';

const useNotificationStore = create(withDevtools((set) => ({
  notifications: null,
  notificationDetail: null,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await notificationService.getNotifications();
      if (response.success) {
        set({ notifications: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchNotificationById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await notificationService.getNotificationById(id);
      if (response.success) {
        set({ notificationDetail: response.data, loading: false });
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
}), 'NotificationStore'));

export default useNotificationStore; 