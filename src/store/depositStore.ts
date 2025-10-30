import { create } from "zustand";
import depositService from "../services/depositService";
import { withDevtools } from "./withDevtools";
import type { DepositResponse, DepositListItem } from "@/types/api";

interface DepositState {
  depositResult: DepositResponse | null;
  depositList: DepositListItem[] | null;
  loading: boolean;
  error: string | null;
  makeDeposit: (
    currency: string,
    amount: number,
    method: string
  ) => Promise<void>;
  fetchDepositList: () => Promise<void>;
  clearError: () => void;
}

const useDepositStore = create<DepositState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      depositResult: null,
      depositList: null,
      loading: false,
      error: null,

      makeDeposit: async (currency: string, amount: number, method: string) => {
        set({ loading: true, error: null });
        try {
          const response = await depositService.deposit(
            currency,
            amount,
            method
          );
          if (response.success) {
            set({ depositResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
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
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    "DepositStore"
  )
);

export default useDepositStore;
