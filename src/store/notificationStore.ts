import { create } from "zustand";
import notificationService from "../services/notificationService";
import { withDevtools } from "./withDevtools";
import type { Notification } from "@/types/api";

interface NotificationState {
  notifications: Notification[] | null;
  notificationDetail: Notification | null;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  fetchNotificationById: (_id: string) => Promise<void>;
  clearError: () => void;
}

const useNotificationStore = create<NotificationState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
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
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      fetchNotificationById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await notificationService.getNotificationById(id);
          if (response.success) {
            set({ notificationDetail: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    "NotificationStore"
  )
);

export default useNotificationStore;
