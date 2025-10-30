import { create } from "zustand";
import dashboardService from "../services/dashboardService";
import { withDevtools } from "./withDevtools";
import useWalletStore from "./walletStore";
import type {
  CarbonCredit,
  News,
  ContractTerm,
  BuyCarbonCreditResponse,
} from "@/types/api";

interface DashboardState {
  carbonCredits: CarbonCredit[] | null;
  news: News[] | null;
  carbonCreditInfo: CarbonCredit | null;
  contractTerms: ContractTerm[] | null;
  buyCarbonCreditResult: BuyCarbonCreditResponse | null;
  loading: boolean;
  error: string | null;
  fetchCarbonCredits: () => Promise<void>;
  fetchNews: (category?: string) => Promise<void>;
  fetchCarbonCreditInfo: (id: string) => Promise<void>;
  fetchContractTerms: () => Promise<void>;
  purchaseCarbonCredit: (quantity: number) => Promise<void>;
  buyCarbonAssets: (data: unknown) => Promise<void>;
  clearError: () => void;
}

const useDashboardStore = create<DashboardState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
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
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      fetchNews: async (category?: string) => {
        set({ loading: true, error: null });
        try {
          const response = await dashboardService.getNews(category || "");
          if (response.success) {
            set({ news: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      fetchCarbonCreditInfo: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await dashboardService.getCarbonCreditInfo(id);
          if (response.success) {
            set({ carbonCreditInfo: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
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
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      purchaseCarbonCredit: async (quantity: number) => {
        set({ loading: true, error: null });
        try {
          const response = await dashboardService.buyCarbonCredit(quantity);
          if (response.success) {
            set({ buyCarbonCreditResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      buyCarbonAssets: async (data: unknown) => {
        const { updateDeliveryData } = useWalletStore.getState();
        await updateDeliveryData(data);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    "DashboardStore"
  )
);

export default useDashboardStore;
