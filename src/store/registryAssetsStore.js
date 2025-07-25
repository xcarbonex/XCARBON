import { create } from 'zustand';
import registryAssetsService from '../services/registryAssetsService';
import { withDevtools } from './withDevtools';

const useRegistryAssetsStore = create(withDevtools((set) => ({
  ccAssets: null,
  tokenizedCcData: null,
  loading: false,
  error: null,

  fetchCcAssets: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await registryAssetsService.getCcAssets(params);
      if (response.success) {
        set({ ccAssets: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTokenizedCcDataByTokenizeAssetId: async (tokenizeAssetId) => {
    set({ loading: true, error: null });
    try {
      const response = await registryAssetsService.getTokenizedCcDataByTokenizeAssetId(tokenizeAssetId);
      if (response.success) {
        set({ tokenizedCcData: response.data, loading: false });
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
}), 'RegistryAssetsStore'));

export default useRegistryAssetsStore; 