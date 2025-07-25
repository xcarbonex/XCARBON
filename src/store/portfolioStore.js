import { create } from 'zustand';
import portfolioService from '../services/portfolioService';
import { withDevtools } from './withDevtools';

const usePortfolioStore = create(withDevtools((set) => ({
  openPositions: null,
  historicalTrades: null,
  pendingMonthlyContracts: null,
  agreement: null,
  walletInfo: null,
  loading: false,
  error: null,

  fetchOpenPositions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await portfolioService.getOpenPosition();
      if (response.success) {
        set({ openPositions: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchHistoricalTrades: async () => {
    set({ loading: true, error: null });
    try {
      const response = await portfolioService.getHistoricalTrades();
      if (response.success) {
        set({ historicalTrades: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPendingMonthlyContract: async () => {
    set({ loading: true, error: null });
    try {
      const response = await portfolioService.getPendingMonthlyContract();
      if (response.success) {
        set({ pendingMonthlyContracts: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAgreement: async () => {
    set({ loading: true, error: null });
    try {
      const response = await portfolioService.getAgreement();
      if (response.success) {
        set({ agreement: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchWalletInfo: async () => {
    set({ loading: true, error: null });
    try {
      const response = await portfolioService.getWalletInfo();
      if (response.success) {
        set({ walletInfo: response.data, loading: false });
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
}), 'PortfolioStore'));

export default usePortfolioStore; 