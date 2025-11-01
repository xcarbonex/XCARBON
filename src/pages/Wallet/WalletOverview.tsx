import React, { useState } from "react";
import { Card, Button, Typography, MetricCard, MetricCardGrid, useToast } from "@/components";
import {
  IoCopy,
  IoCheckmarkCircle,
  IoArrowUpOutline,
  IoWalletOutline,
  IoSwapHorizontalOutline,
  IoSendOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";
import { FaWallet, FaLock, FaCoins } from "react-icons/fa";

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
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc...";
  const fullAddress = "0x742d35Cc6634C0532925a3b844Bc9e0F11F5d2A4";

  // Calculate total portfolio value
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const totalValue = 45200 + 12450 + 1850; // Sum of all assets

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      toast.success("Copied!", "Wallet address copied to clipboard");
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
      toast.error("Copy Failed", "Unable to copy wallet address to clipboard");
    }
  };

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Hero Section - Total Wallet Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Value - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-gradient-to-br from-accent-50 via-white to-brand-50 dark:from-accent-900/20 dark:via-neutral-900/80 dark:to-brand-900/20 border-accent-200/50 dark:border-accent-700/30">
            <div className="space-y-6">
              {/* Label with icon */}
              <div className="flex items-center gap-2">
                <IoWalletOutline className="w-5 h-5 text-accent-700 dark:text-accent-400" />
                <span className="typography-label text-accent-800 dark:text-accent-300">
                  Total Wallet Balance
                </span>
              </div>

              {/* Massive number with hero typography */}
              <div className="typography-hero-number text-accent-700 dark:text-accent-400">
                {formatCurrency(totalValue)}
              </div>

              {/* Wallet info */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
                  <span className="typography-body text-neutral-700 dark:text-neutral-300 font-mono text-sm">
                    {walletAddress}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-colors"
                    aria-label="Copy wallet address"
                  >
                    {copiedAddress ? (
                      <IoCheckmarkCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                    ) : (
                      <IoCopy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-accent-200/50 dark:border-accent-700/30">
                <div>
                  <div className="typography-label mb-2 text-neutral-600 dark:text-neutral-400">
                    Network
                  </div>
                  <div className="typography-body text-neutral-900 dark:text-white font-semibold">
                    Ethereum
                  </div>
                </div>
                <div>
                  <div className="typography-label mb-2 text-neutral-600 dark:text-neutral-400">
                    Assets
                  </div>
                  <div className="typography-body text-neutral-900 dark:text-white font-semibold">
                    {assets.length}
                  </div>
                </div>
                <div>
                  <div className="typography-label mb-2 text-neutral-600 dark:text-neutral-400">
                    24H Change
                  </div>
                  <div className="flex items-center gap-1">
                    <IoArrowUpOutline className="w-4 h-4 text-success-600 dark:text-success-400" />
                    <div className="typography-body text-success-600 dark:text-success-400 font-semibold">
                      +1.8%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-3">
          {/* Primary Action - Send */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <IoSendOutline className="w-5 h-5 flex-shrink-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-80 font-medium uppercase tracking-wide">
                  Primary Action
                </span>
                <span className="text-base font-bold">Send Assets</span>
              </div>
            </div>
          </Button>

          {/* Secondary Actions */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left"
          >
            <div className="flex items-center gap-3 w-full">
              <IoDownloadOutline className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Quick Action</span>
                <span className="text-base font-semibold">Receive</span>
              </div>
            </div>
          </Button>

          <Button
            variant="tonal-primary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left"
          >
            <div className="flex items-center gap-3 w-full">
              <IoSwapHorizontalOutline className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Quick Action</span>
                <span className="text-base font-semibold">Swap Tokens</span>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Wallet Metrics - Using MetricCard */}
      <div>
        <div className="mb-5">
          <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white">
            Wallet Overview
          </Typography>
        </div>

        <MetricCardGrid columns={3}>
          <MetricCard
            label="Liquid Assets"
            value={formatCurrency(totalValue)}
            change="+2.5%"
            changeType="positive"
            trend="up"
            subtitle="Available now"
            icon={<FaWallet className="w-5 h-5" />}
          />

          <MetricCard
            label="Staked Assets"
            value={formatCurrency(35000)}
            change="+5.2%"
            changeType="positive"
            trend="up"
            subtitle="Earning rewards"
            icon={<FaLock className="w-5 h-5" />}
          />

          <MetricCard
            label="Total Assets"
            value={formatCurrency(totalValue + 35000)}
            change="+3.8%"
            changeType="positive"
            trend="up"
            subtitle="All holdings"
            icon={<FaCoins className="w-5 h-5" />}
          />
        </MetricCardGrid>
      </div>

      {/* Asset Balances - Premium Cards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white">
            Your Assets
          </Typography>
          <Button variant="flat-primary" size="sm">
            Add Token
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                {/* Asset Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {asset.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        className="text-neutral-900 dark:text-white font-bold"
                      >
                        {asset.symbol}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {asset.name}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 typography-percentage">
                    {asset.changeType === "positive" ? (
                      <IoArrowUpOutline className="w-4 h-4 text-success-600 dark:text-success-400" />
                    ) : (
                      <IoArrowUpOutline className="w-4 h-4 text-error-600 dark:text-error-400 transform rotate-180" />
                    )}
                    <span
                      className={`font-semibold ${
                        asset.changeType === "positive"
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {asset.change24h}
                    </span>
                  </div>
                </div>

                {/* Balance Display */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/50 dark:border-neutral-700/30">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    Balance
                  </div>
                  <div className="typography-metric-medium text-neutral-900 dark:text-white font-bold">
                    {asset.balance}
                  </div>
                  <div className="typography-body text-neutral-600 dark:text-neutral-400">
                    {asset.usdValue}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" fullWidth>
                    Send
                  </Button>
                  <Button variant="tonal-primary" size="sm" fullWidth>
                    Swap
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity - Premium Design */}
      <Card>
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography
              variant="h5"
              className="typography-heading text-neutral-900 dark:text-white"
            >
              Recent Activity
            </Typography>
            <Button variant="flat-primary" size="sm">
              View All
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
            {["All", "Sent", "Received", "Staking", "Claims"].map((filter, index) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  index === 0
                    ? "bg-brand-700 dark:bg-brand-600 text-white shadow-lg shadow-brand-700/30"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="group p-4 rounded-xl border border-neutral-200/50 dark:border-neutral-700/30 hover:border-brand-500/50 dark:hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        tx.type === "staking"
                          ? "bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30"
                          : tx.type === "claim"
                            ? "bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30"
                            : tx.type === "sent"
                              ? "bg-gradient-to-br from-error-500 to-error-600 shadow-lg shadow-error-500/30"
                              : "bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30"
                      }`}
                    >
                      {tx.type === "sent" ? (
                        <HiArrowUpRight className="w-6 h-6 text-white" />
                      ) : (
                        <HiArrowDownLeft className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Typography
                        variant="body2"
                        className="text-neutral-900 dark:text-white font-bold capitalize"
                      >
                        {tx.type}{" "}
                        {tx.type === "staking" ? "Staked" : tx.type === "claim" ? "Claimed" : ""}
                      </Typography>
                      {tx.status === "confirmed" && (
                        <span className="flex items-center gap-1 typography-caption text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/20 px-2 py-0.5 rounded-full">
                          <IoCheckmarkCircle className="w-3 h-3" />
                          Confirmed
                        </span>
                      )}
                    </div>
                    <Typography
                      variant="caption"
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {tx.timestamp}
                    </Typography>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <div className="typography-body-number text-neutral-900 dark:text-white font-bold">
                      {tx.amount} {tx.asset}
                    </div>
                    {tx.usdValue && (
                      <div className="typography-caption text-neutral-600 dark:text-neutral-400">
                        {tx.usdValue}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-2">
            <Button variant="flat-secondary" size="md" fullWidth>
              Load More Transactions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletInfoScreen;
