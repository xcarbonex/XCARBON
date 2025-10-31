import React, { useState } from "react";
import { Card, Button, Typography } from "@/components";
import { IoCopy, IoCheckmarkCircle } from "react-icons/io5";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";

interface WalletAsset {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  change24h: string;
  changeType: "positive" | "negative" | "neutral";
}

interface Transaction {
  id: string;
  type: "sent" | "received" | "staking" | "claim";
  asset: string;
  amount: string;
  timestamp: string;
  status: "confirmed" | "pending";
  usdValue?: string;
}

const WalletInfoScreen: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc...";
  const fullAddress = "0x742d35Cc6634C0532925a3b844Bc9e0F11F5d2A4";

  const assets: WalletAsset[] = [
    {
      symbol: "XCC",
      name: "XCARBON",
      balance: "5,234.50",
      usdValue: "$45,200",
      change24h: "+2.5%",
      changeType: "positive",
    },
    {
      symbol: "USDC",
      name: "USDC Stablecoin",
      balance: "12,450.00",
      usdValue: "$12,450",
      change24h: "+0.1%",
      changeType: "positive",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "0.75",
      usdValue: "$1,850",
      change24h: "-1.2%",
      changeType: "negative",
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "staking",
      asset: "XCC",
      amount: "+500",
      timestamp: "2 days ago",
      status: "confirmed",
      usdValue: "$4,300",
    },
    {
      id: "2",
      type: "claim",
      asset: "XCC",
      amount: "+125.50",
      timestamp: "5 days ago",
      status: "confirmed",
      usdValue: "+$1,080",
    },
    {
      id: "3",
      type: "received",
      asset: "USDC",
      amount: "+5,000",
      timestamp: "1 week ago",
      status: "confirmed",
      usdValue: "$5,000",
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Wallet Status Card */}
      <Card className="bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/10 dark:to-neutral-900/50">
        <div className="space-y-4">
          <div>
            <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 mb-2">
              Connected Wallet
            </Typography>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
              <Typography
                variant="h6"
                className="text-neutral-900 dark:text-white font-mono text-sm"
              >
                {walletAddress}
              </Typography>
            </div>
            <Typography variant="caption" className="text-success-600 dark:text-success-400">
              ✓ Connected to Ethereum Mainnet
            </Typography>
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="flat-secondary"
              size="sm"
              onClick={handleCopyAddress}
              className="flex items-center gap-1"
            >
              <IoCopy className="w-4 h-4" />
              {copiedAddress ? "Copied!" : "Copy"}
            </Button>
            <Button variant="flat-secondary" size="sm">
              View on Etherscan
            </Button>
            <Button variant="flat-primary" size="sm">
              Disconnect
            </Button>
          </div>
        </div>
      </Card>

      {/* Balances - Mobile Optimized */}
      <div className="space-y-3">
        <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold px-1">
          Your Balances
        </Typography>
        {assets.map((asset, index) => (
          <Card key={index} size="default">
            <div className="flex items-start justify-between gap-3 md:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                      {asset.symbol}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {asset.name}
                    </Typography>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      asset.changeType === "positive"
                        ? "bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400"
                        : asset.changeType === "negative"
                          ? "bg-error-100 dark:bg-error-900/20 text-error-700 dark:text-error-400"
                          : "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-400"
                    }`}
                  >
                    {asset.change24h}
                  </span>
                </div>
                <div className="text-right md:text-left">
                  <Typography
                    variant="body2"
                    className="text-neutral-900 dark:text-white font-mono"
                  >
                    {asset.balance} {asset.symbol}
                  </Typography>
                </div>
              </div>
              <div className="text-right md:flex-1">
                <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                  {asset.usdValue}
                </Typography>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700/50">
              <Button variant="secondary" size="sm" fullWidth>
                Send
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Receive
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity - Mobile Optimized */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 mb-3">
          <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
            Recent Activity
          </Typography>
          <button className="text-brand-700 dark:text-brand-400 text-sm font-medium hover:opacity-80 transition-opacity">
            View All
          </button>
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {["All", "Sent", "Received", "Staking", "Claims"].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <Card key={tx.id} size="default" className="hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "staking"
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : tx.type === "claim"
                          ? "bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400"
                          : tx.type === "sent"
                            ? "bg-error-100 dark:bg-error-900/20 text-error-600 dark:text-error-400"
                            : "bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400"
                    }`}
                  >
                    {tx.type === "sent" ? (
                      <HiArrowUpRight className="w-5 h-5" />
                    ) : (
                      <HiArrowDownLeft className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Typography
                        variant="body2"
                        className="text-neutral-900 dark:text-white font-semibold capitalize"
                      >
                        {tx.type}{" "}
                        {tx.type === "staking" ? "Staked" : tx.type === "claim" ? "Claimed" : ""}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {tx.timestamp}
                      </Typography>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {tx.status === "confirmed" && (
                          <IoCheckmarkCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <Typography
                    variant="body2"
                    className="text-neutral-900 dark:text-white font-mono font-bold"
                  >
                    {tx.amount} {tx.asset}
                  </Typography>
                  {tx.usdValue && (
                    <Typography
                      variant="caption"
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {tx.usdValue}
                    </Typography>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletInfoScreen;
