import { create } from 'zustand';
import membershipService from '../services/membershipService';
import { withDevtools } from './withDevtools';

const useMembershipStore = create(withDevtools((set) => ({
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
      set({ error: error.message, loading: false });
    }
  },

  upgradeUserPlan: async (planId) => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.upgradePlan(planId);
      if (response.success) {
        set({ upgradePlanResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  generateOtp: async () => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.generateOtpKey();
      if (response.success) {
        set({ otpKey: response.data.otpKey, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  changeUserEmail: async (newEmail, password) => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.changeEmail(newEmail, password);
      if (response.success) {
        set({ changeEmailResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  resetUserPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.resetPassword(email);
      if (response.success) {
        set({ resetPasswordResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUserProfile: async (input) => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.updateProfile(input);
      if (response.success) {
        set({ updateProfileResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteUserAccount: async (password) => {
    set({ loading: true, error: null });
    try {
      const response = await membershipService.deleteAccount(password);
      if (response.success) {
        set({ deleteAccountResult: response.data, loading: false });
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
}), 'MembershipStore'));

export default useMembershipStore; 