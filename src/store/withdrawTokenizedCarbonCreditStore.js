import { create } from 'zustand';
import withdrawTokenizedCarbonCreditService from '../services/withdrawTokenizedCarbonCreditService';
import { withDevtools } from './withDevtools';

const useWithdrawTokenizedCarbonCreditStore = create(withDevtools((set) => ({
  assetById: null,
  saveWithdrawAssetsResult: null,
  loading: false,
  error: null,

  fetchAssetById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await withdrawTokenizedCarbonCreditService.getAssetById(id);
      if (response.success) {
        set({ assetById: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  saveUserWithdrawAssets: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await withdrawTokenizedCarbonCreditService.saveWithdrawAssets(payload);
      if (response.success) {
        set({ saveWithdrawAssetsResult: response.data, loading: false });
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
})), 'WithdrawTokenizedCarbonCreditStore');

export default useWithdrawTokenizedCarbonCreditStore; 