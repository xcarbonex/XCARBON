import { create } from "zustand";
import listAssetsService from "../services/listAssetsService";
import { withDevtools } from "./withDevtools";
import type {
  SaleTokenizedAsset,
  ListedAsset,
  ListAssetsInput,
} from "@/types/api";

interface ListAssetsState {
  saleTokenizedAssets: SaleTokenizedAsset[] | null;
  listAssetsResult: ListedAsset | null;
  searchAssetsResult: ListedAsset | null;
  loading: boolean;
  error: string | null;
  fetchSaleTokenizedAssets: () => Promise<void>;
  listUserAssets: (payload: ListAssetsInput) => Promise<void>;
  searchUserAssets: (id: string) => Promise<void>;
  clearError: () => void;
}

const useListAssetsStore = create<ListAssetsState>()(
  withDevtools(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set: any) => ({
      saleTokenizedAssets: null,
      listAssetsResult: null,
      searchAssetsResult: null,
      loading: false,
      error: null,

      fetchSaleTokenizedAssets: async () => {
        set({ loading: true, error: null });
        try {
          const response =
            await listAssetsService.getSaleTokenizedAssets();
          if (response.success) {
            set({ saleTokenizedAssets: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      listUserAssets: async (payload: ListAssetsInput) => {
        set({ loading: true, error: null });
        try {
          const response = await listAssetsService.listAssets(payload);
          if (response.success) {
            set({ listAssetsResult: response.data, loading: false });
          } else {
            set({ error: response.message, loading: false });
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "An error occurred";
          set({ error: message, loading: false });
        }
      },

      searchUserAssets: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await listAssetsService.searchAssets(id);
          if (response.success) {
            set({ searchAssetsResult: response.data, loading: false });
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
    "ListAssetsStore"
  )
);

export default useListAssetsStore;
