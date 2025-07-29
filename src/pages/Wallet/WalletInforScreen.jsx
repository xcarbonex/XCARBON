import { tokenBalance } from "@/appData";
import { Tooltip } from "react-tooltip";
import Modal from "@/components/Model";
import { ListTokenizedAssets } from "..";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Table, Typography, Button } from "@/components";
import history from "@/assets/history.svg";
import plus from "@/assets/plus.svg";
import { Breadcrumb } from "@/components";
import useWalletStore from "@/store/walletStore";
// Transaction History columns configuration
const transactionColumns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={clsx("px-3 py-1 text-center max-w-24 rounded-full text-sm", {
          "bg-[#52886C] text-white": row.original.status === "Confirmed",
          "bg-[#D94F0B] text-white": row.original.status === "Pending",
          "bg-[#174954] text-white": row.original.status === "Completed",
        })}
      >
        {row.original.status}
      </p>
    ),
  },
  {
    accessorKey: "tx",
    header: "Blockchain Tx",
  },
];

// Contract Delivery Schedule columns configuration
const deliveryColumns = [
  {
    accessorKey: "contractId",
    header: "Contract ID",
  },
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "nextDelivery",
    header: "Next Delivery",
  },
  {
    accessorKey: "totalDeliveries",
    header: "Total Deliveries",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={clsx("text-center max-w-20 py-1 px-2 rounded-full text-sm", {
          "bg-[#52886C] text-white": row.original.status === "On Track",
          "bg-[#D94F0B] text-white": row.original.status === "Pending",
          "bg-[#174954] text-white": row.original.status === "Delayed",
        })}
      >
        {row.original.status}
      </p>
    ),
  },
];

// Sample transaction history data
const transactionData = [
  {
    date: "2024-03-20",
    plan: "Gold",
    type: "Deposit",
    amount: "10,000",
    status: "Confirmed",
    tx: "0x3a5f...e9d1",
  },
  {
    date: "2024-03-18",
    plan: "Platinum",
    type: "Withdrawal",
    amount: "5,000",
    status: "Completed",
    tx: "0x4b2e...f8c2",
  },
  {
    date: "2024-03-15",
    plan: "Gold",
    type: "Transfer",
    amount: "7,500",
    status: "Pending",
    tx: "0x6d9a...b4e3",
  },
  {
    date: "2024-03-12",
    plan: "Silver",
    type: "Deposit",
    amount: "3,000",
    status: "Confirmed",
    tx: "0x8f1c...a7d4",
  },
  {
    date: "2024-03-10",
    plan: "Gold",
    type: "Withdrawal",
    amount: "4,500",
    status: "Completed",
    tx: "0x2e7b...c9f5",
  },
  {
    date: "2024-03-08",
    plan: "Platinum",
    type: "Transfer",
    amount: "12,000",
    status: "Confirmed",
    tx: "0x5h3k...m2n6",
  },
  {
    date: "2024-03-05",
    plan: "Silver",
    type: "Deposit",
    amount: "2,500",
    status: "Pending",
    tx: "0x9p4q...r7s8",
  },
  {
    date: "2024-03-03",
    plan: "Gold",
    type: "Withdrawal",
    amount: "6,000",
    status: "Completed",
    tx: "0x1t5u...v9w0",
  },
  {
    date: "2024-03-01",
    plan: "Platinum",
    type: "Transfer",
    amount: "15,000",
    status: "Confirmed",
    tx: "0x7x8y...z2a3",
  },
  {
    date: "2024-02-28",
    plan: "Gold",
    type: "Deposit",
    amount: "8,000",
    status: "Confirmed",
    tx: "0x4b5c...d6e7",
  },
  {
    date: "2024-02-25",
    plan: "Silver",
    type: "Withdrawal",
    amount: "3,500",
    status: "Completed",
    tx: "0x8f9g...h1i2",
  },
  {
    date: "2024-02-22",
    plan: "Gold",
    type: "Transfer",
    amount: "5,500",
    status: "Pending",
    tx: "0x3j4k...l5m6",
  },
  {
    date: "2024-02-20",
    plan: "Platinum",
    type: "Deposit",
    amount: "20,000",
    status: "Confirmed",
    tx: "0x7n8p...q1r2",
  },
  {
    date: "2024-02-18",
    plan: "Gold",
    type: "Withdrawal",
    amount: "7,000",
    status: "Completed",
    tx: "0x5s6t...u9v0",
  },
  {
    date: "2024-02-15",
    plan: "Silver",
    type: "Transfer",
    amount: "4,000",
    status: "Confirmed",
    tx: "0x2w3x...y4z5",
  },
];

// Sample contract delivery schedule data


const WalletInfoScreen = () => {
  const { deliveryData } = useWalletStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const breadcrumbItems = [
    { label: "Wallet", path: "/wallet" },
    { label: "", path: "/" },
  ];
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="List Tokenized Assets"
      >
        <ListTokenizedAssets />
      </Modal>
      <Tooltip id="wallet" place="right" />
      <div>
        <div className="space-y-5 ">
          <Typography variant="h4" className="border-b-2 text-tbase border-[#363638] pb-2">
            Wallet
          </Typography>
          {/* Token Balances & Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Token Balances Card */}
            <div className="bg-[#4C6663] text-tbase dark:bg-[#191919] rounded-xl border border-[#363638] shadow-lg">
              <div className="p-4">
                <Typography
                  variant="h5"
                  className="border-b text-tbase border-[#363638] pb-2"
                >
                  Token Balances
                </Typography>
                <div className="mt-4 space-y-2">
                  {tokenBalance.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center px-3 py-2"
                    >
                      <Typography
                        variant="body2"
                        className={clsx({
                          "cursor-pointer hover:text-gray-200 transition-colors":
                            index !== 0,
                        })}
                        data-tooltip-id={index !== 0 ? "wallet" : undefined}
                        data-tooltip-content={
                          index !== 0 ? `Eligible to ${item.status}` : undefined
                        }
                        onClick={() => {
                          if (index !== 0) {
                            item.status === "sale"
                              ? setOpen(true)
                              : navigate("withdraw-tokenized-carbon-credit");
                          }
                        }}
                      >
                        {item.tokenName}
                      </Typography>
                      <Typography variant="body2">
                        {item.amount}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-secondary rounded-xl border border-[#D8D8D8] dark:border-[#363638] shadow-lg">
              <div className="p-4">
                <Typography
                  variant="h5"
                  className="border-b border-[#363638] pb-2 text-tbase"
                >
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
                    className="flex items-center justify-center gap-2 border-transparent"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="grid bg-secondary text-tbase rounded-xl border shadow-lg p-6">
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
          <div className="grid text-tbase  bg-secondary rounded-xl border shadow-lg p-6">
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
