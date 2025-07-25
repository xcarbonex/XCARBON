import { create } from 'zustand';
import walletService from '../services/walletService';
import { withDevtools } from './withDevtools';

const useWalletStore = create(withDevtools((set) => ({
  transactionHistory: null,
  contractDeliverySchedule: null,
  loading: false,
  error: null,

  fetchTransactionHistory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await walletService.getTransactionHistory();
      if (response.success) {
        set({ transactionHistory: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchContractDeliverySchedule: async () => {
    set({ loading: true, error: null });
    try {
      const response = await walletService.getContractDeliverySchedule();
      if (response.success) {
        set({ contractDeliverySchedule: response.data, loading: false });
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
}), 'WalletStore'));

export default useWalletStore; 