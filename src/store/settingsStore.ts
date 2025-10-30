import { create } from "zustand";
import settingsService from "../services/settingsService";
import { withDevtools } from "./withDevtools";
import type { UserDetail, UpdateDetailResponse } from "../services/settingsService";

interface SettingsState {
  userDetail: UserDetail | null;
  updateDetailResult: UpdateDetailResponse | null;
  loading: boolean;
  error: string | null;
  fetchUserDetail: () => Promise<void>;
  updateUserDetail: (_input: Partial<UserDetail>) => Promise<void>;
  clearError: () => void;
}

const useSettingsStore = create<SettingsState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
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
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      updateUserDetail: async (input: Partial<UserDetail>) => {
        set({ loading: true, error: null });
        try {
          const response = await settingsService.updateDetail(input);
          if (response.success) {
            set({ updateDetailResult: response.data, loading: false });
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
    "SettingsStore"
  )
);

export default useSettingsStore;
