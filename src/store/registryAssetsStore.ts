import { create } from "zustand";
import registryAssetsService from "../services/registryAssetsService";
import { withDevtools } from "./withDevtools";
import type { CcAsset, TokenizedCcData, CcAssetsParams } from "@/types/api";

interface RegistryAssetsState {
  ccAssets: CcAsset[] | null;
  tokenizedCcData: TokenizedCcData | null;
  loading: boolean;
  error: string | null;
  fetchCcAssets: (_params: CcAssetsParams) => Promise<void>;
  fetchTokenizedCcDataByTokenizeAssetId: (_tokenizeAssetId: string) => Promise<void>;
  clearError: () => void;
}

const useRegistryAssetsStore = create<RegistryAssetsState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      ccAssets: null,
      tokenizedCcData: null,
      loading: false,
      error: null,

      fetchCcAssets: async (params: CcAssetsParams) => {
        set({ loading: true, error: null });
        try {
          const response = await registryAssetsService.getCcAssets(params);
          if (response.success) {
            set({ ccAssets: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      fetchTokenizedCcDataByTokenizeAssetId: async (tokenizeAssetId: string) => {
        set({ loading: true, error: null });
        try {
          const response =
            await registryAssetsService.getTokenizedCcDataByTokenizeAssetId(tokenizeAssetId);
          if (response.success) {
            set({ tokenizedCcData: response.data, loading: false });
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
    "RegistryAssetsStore"
  )
);

export default useRegistryAssetsStore;
