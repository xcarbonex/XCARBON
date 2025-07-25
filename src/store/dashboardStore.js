import { create } from 'zustand';
import dashboardService from '../services/dashboardService';
import { withDevtools } from './withDevtools';

const useDashboardStore = create(withDevtools((set) => ({
  carbonCredits: null,
  news: null,
  carbonCreditInfo: null,
  contractTerms: null,
  buyCarbonCreditResult: null,
  loading: false,
  error: null,

  fetchCarbonCredits: async () => {
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.getCarbonCredit();
      if (response.success) {
        set({ carbonCredits: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchNews: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.getNews(category);
      if (response.success) {
        set({ news: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCarbonCreditInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.getCarbonCreditInfo(id);
      if (response.success) {
        set({ carbonCreditInfo: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchContractTerms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.getContractTerms();
      if (response.success) {
        set({ contractTerms: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  purchaseCarbonCredit: async (quantity) => {
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.buyCarbonCredit(quantity);
      if (response.success) {
        set({ buyCarbonCreditResult: response.data, loading: false });
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
}), 'DashboardStore'));

export default useDashboardStore; 