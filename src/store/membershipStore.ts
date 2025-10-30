import { create } from "zustand";
import membershipService from "../services/membershipService";
import { withDevtools } from "./withDevtools";
import type { CurrentPlan, MutationResponse } from "../services/membershipService";

interface MembershipState {
  currentPlan: CurrentPlan | null;
  upgradePlanResult: MutationResponse | null;
  otpKey: string | null;
  changeEmailResult: MutationResponse | null;
  resetPasswordResult: MutationResponse | null;
  updateProfileResult: MutationResponse | null;
  deleteAccountResult: MutationResponse | null;
  loading: boolean;
  error: string | null;
  fetchCurrentPlan: () => Promise<void>;
  upgradeUserPlan: (_planId: string) => Promise<void>;
  generateOtp: () => Promise<void>;
  changeUserEmail: (_newEmail: string, _password: string) => Promise<void>;
  resetUserPassword: (_email: string) => Promise<void>;
  updateUserProfile: (_input: Record<string, unknown>) => Promise<void>;
  deleteUserAccount: (_password: string) => Promise<void>;
  clearError: () => void;
}

const useMembershipStore = create<MembershipState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      currentPlan: null,
      upgradePlanResult: null,
      otpKey: null,
      changeEmailResult: null,
      resetPasswordResult: null,
      updateProfileResult: null,
      deleteAccountResult: null,
      loading: false,
      error: null,

      fetchCurrentPlan: async () => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.getCurrentPlan();
          if (response.success) {
            set({ currentPlan: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      upgradeUserPlan: async (planId: string) => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.upgradePlan(planId);
          if (response.success) {
            set({ upgradePlanResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      generateOtp: async () => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.generateOtpKey();
          if (response.success && response.data) {
            set({ otpKey: response.data.otpKey || null, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      changeUserEmail: async (newEmail: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.changeEmail(newEmail, password);
          if (response.success) {
            set({ changeEmailResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      resetUserPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.resetPassword(email);
          if (response.success) {
            set({ resetPasswordResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      updateUserProfile: async (input: Record<string, unknown>) => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.updateProfile(input);
          if (response.success) {
            set({ updateProfileResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      deleteUserAccount: async (password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await membershipService.deleteAccount(password);
          if (response.success) {
            set({ deleteAccountResult: response.data, loading: false });
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
    "MembershipStore"
  )
);

export default useMembershipStore;
