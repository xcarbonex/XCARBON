import { create } from 'zustand';
import mintingCarbonAssetsService from '../services/mintingCarbonAssetsService';
import { withDevtools } from './withDevtools';

const useMintingCarbonAssetsStore = create(withDevtools((set) => ({
  saveMintCarbonCreditResult: null,
  gasFees: null,
  loading: false,
  error: null,

  saveMintCarbonCredit: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await mintingCarbonAssetsService.saveMintCarbonCredit(payload);
      if (response.success) {
        set({ saveMintCarbonCreditResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchGasFees: async (quantity) => {
    set({ loading: true, error: null });
    try {
      const response = await mintingCarbonAssetsService.getGasFees(quantity);
      if (response.success) {
        set({ gasFees: response.data, loading: false });
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
}), 'MintingCarbonAssetsStore'));

export default useMintingCarbonAssetsStore; 