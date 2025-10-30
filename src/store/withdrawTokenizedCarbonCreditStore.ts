import { create } from "zustand";
import withdrawTokenizedCarbonCreditService from "../services/withdrawTokenizedCarbonCreditService";
import { withDevtools } from "./withDevtools";
import type { AssetDetail, WithdrawAssetInput, WithdrawAssetsResponse } from "@/types/api";

interface WithdrawTokenizedCarbonCreditState {
  assetById: AssetDetail | null;
  saveWithdrawAssetsResult: WithdrawAssetsResponse | null;
  loading: boolean;
  error: string | null;
  fetchAssetById: (_id: string) => Promise<void>;
  saveUserWithdrawAssets: (_payload: WithdrawAssetInput) => Promise<void>;
  clearError: () => void;
}

const useWithdrawTokenizedCarbonCreditStore = create<WithdrawTokenizedCarbonCreditState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      assetById: null,
      saveWithdrawAssetsResult: null,
      loading: false,
      error: null,

      fetchAssetById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await withdrawTokenizedCarbonCreditService.getAssetById(id);
          if (response.success) {
            set({ assetById: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      saveUserWithdrawAssets: async (payload: WithdrawAssetInput) => {
        set({ loading: true, error: null });
        try {
          const response = await withdrawTokenizedCarbonCreditService.saveWithdrawAssets(payload);
          if (response.success) {
            set({ saveWithdrawAssetsResult: response.data, loading: false });
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
    "WithdrawTokenizedCarbonCreditStore"
  )
);

export default useWithdrawTokenizedCarbonCreditStore;
