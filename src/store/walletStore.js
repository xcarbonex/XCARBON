import { create } from 'zustand';
import walletService from '../services/walletService';
import { withDevtools } from './withDevtools';

const deliveryData = [
  {
    contractId: "CT-2024-010",
    asset: "Amazon Rainforest REDD+",
    nextDelivery: "2024-04-15",
    totalDeliveries: "3/12",
    status: "On Track",
  },
  {
    contractId: "CT-2024-009",
    asset: "Wind Farm Project",
    nextDelivery: "2024-04-20",
    totalDeliveries: "2/6",
    status: "Pending",
  },
  {
    contractId: "CT-2024-008",
    asset: "Solar Power Plant",
    nextDelivery: "2024-04-25",
    totalDeliveries: "4/8",
    status: "Delayed",
  },
  {
    contractId: "CT-2024-007",
    asset: "Mangrove Restoration",
    nextDelivery: "2024-05-01",
    totalDeliveries: "1/4",
    status: "On Track",
  },
  {
    contractId: "CT-2024-006",
    asset: "Hydroelectric Project",
    nextDelivery: "2024-05-05",
    totalDeliveries: "5/10",
    status: "On Track",
  },
  {
    contractId: "CT-2024-005",
    asset: "Forest Conservation",
    nextDelivery: "2024-05-10",
    totalDeliveries: "2/8",
    status: "Pending",
  },
  {
    contractId: "CT-2024-004",
    asset: "Tidal Energy Project",
    nextDelivery: "2024-05-15",
    totalDeliveries: "3/6",
    status: "On Track",
  },
  {
    contractId: "CT-2024-003",
    asset: "Biomass Plant",
    nextDelivery: "2024-05-20",
    totalDeliveries: "4/12",
    status: "Delayed",
  },
  {
    contractId: "CT-2024-002",
    asset: "Geothermal Project",
    nextDelivery: "2024-05-25",
    totalDeliveries: "1/4",
    status: "On Track",
  },
  {
    contractId: "CT-2024-001",
    asset: "Peatland Protection",
    nextDelivery: "2024-06-01",
    totalDeliveries: "2/6",
    status: "Pending",
  },

];
const useWalletStore = create(withDevtools((set) => ({
  transactionHistory: null,
  contractDeliverySchedule: null,
  loading: false,
  error: null,
  deliveryData: deliveryData,

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

  updateDeliveryData: (newData) => {
    set({ deliveryData: [newData, ...deliveryData] });
  },

  clearError: () => {
    set({ error: null });
  },
}), 'WalletStore'));

export default useWalletStore; 

