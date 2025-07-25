import { create } from 'zustand';
import depositService from '../services/depositService';
import { withDevtools } from './withDevtools';

const useDepositStore = create(withDevtools((set) => ({
  depositResult: null,
  depositList: null,
  loading: false,
  error: null,

  makeDeposit: async (currency, amount, method) => {
    set({ loading: true, error: null });
    try {
      const response = await depositService.deposit(currency, amount, method);
      if (response.success) {
        set({ depositResult: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchDepositList: async () => {
    set({ loading: true, error: null });
    try {
      const response = await depositService.getDepositList();
      if (response.success) {
        set({ depositList: response.data, loading: false });
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
}), 'DepositStore'));

export default useDepositStore; 