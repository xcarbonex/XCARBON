import { tokenBalance } from "@/appData"
import { Tooltip } from 'react-tooltip'
import Modal from "@/components/Model";
import { ListTokenizedAssets } from "..";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Table, Typography, Button } from '@/components';
import history from "@/assets/history.svg";
import plus from "@/assets/plus.svg";

// Transaction History columns configuration
const transactionColumns = [
  {
    accessorKey: "date",
    header: "Date"
  },
  {
    accessorKey: "plan",
    header: "Plan"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "amount",
    header: "Amount"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p className={clsx(
        "px-3 py-1 text-center max-w-24 rounded-full text-sm",
        {
          "bg-green-600 text-white": row.original.status === "Confirmed",
          "bg-yellow-600 text-white": row.original.status === "Pending",
          "bg-blue-600 text-white": row.original.status === "Completed"
        }
      )}>
        {row.original.status}
      </p>
    )
  },
  {
    accessorKey: "tx",
    header: "Blockchain Tx"
  }
];

// Contract Delivery Schedule columns configuration
const deliveryColumns = [
  {
    accessorKey: "contractId",
    header: "Contract ID"
  },
  {
    accessorKey: "asset",
    header: "Asset"
  },
  {
    accessorKey: "nextDelivery",
    header: "Next Delivery"
  },
  {
    accessorKey: "totalDeliveries",
    header: "Total Deliveries"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p className={clsx(
        "text-center max-w-20 py-1 px-2 rounded-full text-sm",
        {
          "bg-green-600 text-white": row.original.status === "On Track",
          "bg-yellow-600 text-white": row.original.status === "Pending",
          "bg-red-600 text-white": row.original.status === "Delayed"
        }
      )}>
        {row.original.status}
      </p>
    )
  }
];

// Sample transaction history data
const transactionData = [
  {
    date: "2024-03-20",
    plan: "Gold",
    type: "Deposit",
    amount: "10,000",
    status: "Confirmed",
    tx: "0x3a5f...e9d1"
  },
  {
    date: "2024-03-18",
    plan: "Platinum",
    type: "Withdrawal",
    amount: "5,000",
    status: "Completed",
    tx: "0x4b2e...f8c2"
  },
  {
    date: "2024-03-15",
    plan: "Gold",
    type: "Transfer",
    amount: "7,500",
    status: "Pending",
    tx: "0x6d9a...b4e3"
  },
  {
    date: "2024-03-12",
    plan: "Silver",
    type: "Deposit",
    amount: "3,000",
    status: "Confirmed",
    tx: "0x8f1c...a7d4"
  },
  {
    date: "2024-03-10",
    plan: "Gold",
    type: "Withdrawal",
    amount: "4,500",
    status: "Completed",
    tx: "0x2e7b...c9f5"
  },
  {
    date: "2024-03-08",
    plan: "Platinum",
    type: "Transfer",
    amount: "12,000",
    status: "Confirmed",
    tx: "0x5h3k...m2n6"
  },
  {
    date: "2024-03-05",
    plan: "Silver",
    type: "Deposit",
    amount: "2,500",
    status: "Pending",
    tx: "0x9p4q...r7s8"
  },
  {
    date: "2024-03-03",
    plan: "Gold",
    type: "Withdrawal",
    amount: "6,000",
    status: "Completed",
    tx: "0x1t5u...v9w0"
  },
  {
    date: "2024-03-01",
    plan: "Platinum",
    type: "Transfer",
    amount: "15,000",
    status: "Confirmed",
    tx: "0x7x8y...z2a3"
  },
  {
    date: "2024-02-28",
    plan: "Gold",
    type: "Deposit",
    amount: "8,000",
    status: "Confirmed",
    tx: "0x4b5c...d6e7"
  },
  {
    date: "2024-02-25",
    plan: "Silver",
    type: "Withdrawal",
    amount: "3,500",
    status: "Completed",
    tx: "0x8f9g...h1i2"
  },
  {
    date: "2024-02-22",
    plan: "Gold",
    type: "Transfer",
    amount: "5,500",
    status: "Pending",
    tx: "0x3j4k...l5m6"
  },
  {
    date: "2024-02-20",
    plan: "Platinum",
    type: "Deposit",
    amount: "20,000",
    status: "Confirmed",
    tx: "0x7n8p...q1r2"
  },
  {
    date: "2024-02-18",
    plan: "Gold",
    type: "Withdrawal",
    amount: "7,000",
    status: "Completed",
    tx: "0x5s6t...u9v0"
  },
  {
    date: "2024-02-15",
    plan: "Silver",
    type: "Transfer",
    amount: "4,000",
    status: "Confirmed",
    tx: "0x2w3x...y4z5"
  }
];

// Sample contract delivery schedule data
const deliveryData = [
  {
    contractId: "CT-2024-001",
    asset: "Amazon Rainforest REDD+",
    nextDelivery: "2024-04-15",
    totalDeliveries: "3/12",
    status: "On Track"
  },
  {
    contractId: "CT-2024-002",
    asset: "Wind Farm Project",
    nextDelivery: "2024-04-20",
    totalDeliveries: "2/6",
    status: "Pending"
  },
  {
    contractId: "CT-2024-003",
    asset: "Solar Power Plant",
    nextDelivery: "2024-04-25",
    totalDeliveries: "4/8",
    status: "Delayed"
  },
  {
    contractId: "CT-2024-004",
    asset: "Mangrove Restoration",
    nextDelivery: "2024-05-01",
    totalDeliveries: "1/4",
    status: "On Track"
  },
  {
    contractId: "CT-2024-005",
    asset: "Hydroelectric Project",
    nextDelivery: "2024-05-05",
    totalDeliveries: "5/10",
    status: "On Track"
  },
  {
    contractId: "CT-2024-006",
    asset: "Forest Conservation",
    nextDelivery: "2024-05-10",
    totalDeliveries: "2/8",
    status: "Pending"
  },
  {
    contractId: "CT-2024-007",
    asset: "Tidal Energy Project",
    nextDelivery: "2024-05-15",
    totalDeliveries: "3/6",
    status: "On Track"
  },
  {
    contractId: "CT-2024-008",
    asset: "Biomass Plant",
    nextDelivery: "2024-05-20",
    totalDeliveries: "4/12",
    status: "Delayed"
  },
  {
    contractId: "CT-2024-009",
    asset: "Geothermal Project",
    nextDelivery: "2024-05-25",
    totalDeliveries: "1/4",
    status: "On Track"
  },
  {
    contractId: "CT-2024-010",
    asset: "Peatland Protection",
    nextDelivery: "2024-06-01",
    totalDeliveries: "2/6",
    status: "Pending"
  },
  {
    contractId: "CT-2024-011",
    asset: "Reforestation Project",
    nextDelivery: "2024-06-05",
    totalDeliveries: "5/10",
    status: "On Track"
  },
  {
    contractId: "CT-2024-012",
    asset: "Wind Farm Extension",
    nextDelivery: "2024-06-10",
    totalDeliveries: "3/8",
    status: "On Track"
  },
  {
    contractId: "CT-2024-013",
    asset: "Solar Array Project",
    nextDelivery: "2024-06-15",
    totalDeliveries: "2/6",
    status: "Delayed"
  },
  {
    contractId: "CT-2024-014",
    asset: "Coastal Protection",
    nextDelivery: "2024-06-20",
    totalDeliveries: "1/4",
    status: "Pending"
  },
  {
    contractId: "CT-2024-015",
    asset: "Forest Management",
    nextDelivery: "2024-06-25",
    totalDeliveries: "4/12",
    status: "On Track"
  }
];

const WalletInfoScreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="List Tokenized Assets"
       
      >
        <ListTokenizedAssets/>
      </Modal>
      <Tooltip id="wallet" place="right"/>
      <div>
        <div className="space-y-5">
          {/* Token Balances & Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Token Balances Card */}
            <div className="bg-[#4C6663] text-white dark:bg-[#191919] rounded-xl border border-[#363638] shadow-lg">
              <div className="p-4">
                <Typography variant="h5" className="border-b border-[#363638] pb-2 text-white">
                  Token Balances
                </Typography>
                <div className="mt-4 space-y-2">
                  {tokenBalance.map((item, index) => (
                    <div key={index} className="flex justify-between items-center px-3 py-2">
                      <Typography 
                        variant="body2"
                        className={clsx(
                          'text-white',
                          {'cursor-pointer hover:text-gray-200 transition-colors': index !== 0}
                        )}
                        data-tooltip-id={index !== 0 ? 'wallet' : undefined}
                        data-tooltip-content={index !== 0 ? `Eligible to ${item.status}` : undefined}
                        onClick={() => {
                          if (index !== 0) {
                            item.status === 'sale' ? setOpen(true) : navigate('withdraw-tokenized-carbon-credit');
                          }
                        }}
                      >
                        {item.tokenName}
                      </Typography>
                      <Typography variant="body2" className="text-white">
                        {item.amount}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-[#A6B3B1] dark:bg-[#191919] rounded-xl border border-[#D8D8D8] dark:border-[#363638] shadow-lg">
              <div className="p-4">
                <Typography variant="h5" className="border-b border-[#363638] pb-2">
                  Deposit / Withdraw
                </Typography>
                <div className="grid gap-4 mt-4">
                  <Button
                    to="deposit"
                    variant="primary"
                    fullWidth
                    icon={plus}
                    className="flex items-center justify-center gap-2"
                  >
                    Deposit (Fiat / Crypto)
                  </Button>
                  <Button
                    to="withdraw-tokenized-carbon-credit"
                    variant="secondary"
                    fullWidth
                    icon={history}
                    className="flex items-center justify-center gap-2 border-transparent text-[#fff]"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="grid bg-secondary rounded-xl border shadow-lg p-6">
            <Table
              columns={transactionColumns}
              data={transactionData}
              showSearch
              showPageSize
              showDataFilter
              dateField="date"
              title="Transaction History"
              defaultPageSize={5}
            />
          </div>

          {/* Contract Delivery Schedule */}
          <div className="grid bg-secondary rounded-xl border shadow-lg p-6">
            <Table
              columns={deliveryColumns}
              data={deliveryData}
              showSearch
              showPageSize
              showDataFilter
              dateField="nextDelivery"
              title="Contract Delivery Schedule"
              defaultPageSize={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletInfoScreen;
