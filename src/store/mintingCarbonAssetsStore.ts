import { create } from "zustand";
import mintingCarbonAssetsService from "../services/mintingCarbonAssetsService";
import { withDevtools } from "./withDevtools";
import type {
  MintCarbonCreditInput,
  MintCarbonCreditResponse,
  GasFees,
} from "@/types/api";

interface MintingCarbonAssetsState {
  saveMintCarbonCreditResult: MintCarbonCreditResponse | null;
  gasFees: GasFees | null;
  loading: boolean;
  error: string | null;
  saveMintCarbonCredit: (payload: MintCarbonCreditInput) => Promise<void>;
  fetchGasFees: (quantity: number) => Promise<void>;
  clearError: () => void;
}

const useMintingCarbonAssetsStore = create<MintingCarbonAssetsState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      saveMintCarbonCreditResult: null,
      gasFees: null,
      loading: false,
      error: null,

      saveMintCarbonCredit: async (payload: MintCarbonCreditInput) => {
        set({ loading: true, error: null });
        try {
          const response =
            await mintingCarbonAssetsService.saveMintCarbonCredit(payload);
          if (response.success) {
            set({
              saveMintCarbonCreditResult: response.data,
              loading: false,
            });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      fetchGasFees: async (quantity: number) => {
        set({ loading: true, error: null });
        try {
          const response =
            await mintingCarbonAssetsService.getGasFees(quantity);
          if (response.success) {
            set({ gasFees: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    "MintingCarbonAssetsStore"
  )
);

export default useMintingCarbonAssetsStore;
