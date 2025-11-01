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
  IoSparkles,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";
import { FaWallet, FaLock, FaCoins, FaEthereum } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20">
      <div className="w-full space-y-8">
        {/* Premium Hero Section - Total Wallet Value */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Premium Main Wallet Value - Takes 2 columns */}
          <div className="lg:col-span-2">
            {/* Outer glow effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <Card className="relative h-full bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-brand-900/20 dark:via-neutral-900/80 dark:to-accent-900/20 border-2 border-brand-200/70 dark:border-brand-800/50 shadow-2xl">
                <div className="space-y-6">
                  {/* Premium label with icon badge and live indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/30">
                        <IoWalletOutline className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-brand-800 dark:text-brand-300">
                        Total Wallet Balance
                      </span>
                    </div>
                    
                    {/* Live badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-100 dark:bg-success-900/30 border border-success-300 dark:border-success-700">
                      <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                      <span className="text-xs font-bold text-success-700 dark:text-success-400">Live</span>
                    </div>
                  </div>

                  {/* Massive number with hero typography */}
                  <div className="typography-hero-number text-brand-700 dark:text-brand-400 leading-none">
                    {formatCurrency(totalValue)}
                  </div>

                  {/* Premium wallet address card */}
                  <div className="p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-brand-200 dark:border-brand-800">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
                          <FaEthereum className="w-5 h-5 text-info-700 dark:text-info-400" />
                        </div>
                        <span className="typography-body text-neutral-700 dark:text-neutral-300 font-mono text-sm truncate">
                          {walletAddress}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyAddress}
                        className="flex-shrink-0 p-2 rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
                        aria-label="Copy wallet address"
                      >
                        {copiedAddress ? (
                          <IoCheckmarkCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                        ) : (
                          <IoCopy className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Premium stats grid with backdrop-blur */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-brand-200/50 dark:border-brand-800/30">
                    <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                      <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                        Network
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEthereum className="w-4 h-4 text-info-600 dark:text-info-400" />
                        <div className="typography-body text-neutral-900 dark:text-white font-bold">
                          Ethereum
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                      <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                        Assets
                      </div>
                      <div className="text-xl font-bold text-neutral-900 dark:text-white">
                        {assets.length}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                      <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                        24H Change
                      </div>
                      <div className="flex items-center gap-2">
                        <IoTrendingUpOutline className="w-5 h-5 text-success-600 dark:text-success-400" />
                        <div className="text-xl font-bold text-success-600 dark:text-success-400">
                          +1.8%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Premium Quick Actions Column */}
          <div className="space-y-4">
            {/* Primary Action - Send */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="relative h-24 justify-start pl-6 text-left bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-xl"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
                    <IoSendOutline className="w-6 h-6 flex-shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs opacity-90 font-semibold uppercase tracking-wider">
                      Primary Action
                    </span>
                    <span className="text-lg font-bold">Send Assets</span>
                  </div>
                </div>
              </Button>
            </div>

            {/* Secondary Action - Receive */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-success-500/30 to-brand-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="relative h-24 justify-start pl-6 text-left bg-white dark:bg-neutral-800 border-2 hover:border-brand-400 dark:hover:border-brand-600 shadow-lg"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-success-100 dark:bg-success-900/30 group-hover:bg-success-200 dark:group-hover:bg-success-800/40 transition-colors">
                    <IoDownloadOutline className="w-6 h-6 flex-shrink-0 text-success-600 dark:text-success-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      Quick Action
                    </span>
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      Receive
                    </span>
                  </div>
                </div>
              </Button>
            </div>

            {/* Swap Action - Premium Highlight */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-info-500/30 to-brand-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button
                variant="tonal-primary"
                size="lg"
                fullWidth
                className="relative h-24 justify-start pl-6 text-left bg-gradient-to-br from-info-50 to-brand-50 dark:from-info-900/20 dark:to-brand-900/20 border-2 border-info-300 dark:border-info-700 hover:border-info-400 dark:hover:border-info-600 shadow-lg"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg">
                    <IoSwapHorizontalOutline className="w-6 h-6 flex-shrink-0 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-info-700 dark:text-info-400 font-semibold">
                      Quick Action
                    </span>
                    <span className="text-lg font-bold text-info-800 dark:text-info-300">
                      Swap Tokens
                    </span>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Wallet Metrics */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
              <IoSparkles className="w-6 h-6 text-white" />
            </div>
            <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white font-bold">
              Wallet Overview
            </Typography>
          </div>

          {/* Premium MetricCardGrid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Liquid Assets */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-success-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MetricCard
                label="Liquid Assets"
                value={formatCurrency(totalValue)}
                change="+2.5%"
                changeType="positive"
                trend="up"
                subtitle="Available now"
                icon={
                  <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                    <FaWallet className="w-5 h-5 text-success-700 dark:text-success-400" />
                  </div>
                }
                className="relative border-2 border-success-200 dark:border-success-800 shadow-lg hover:shadow-xl hover:border-success-300 dark:hover:border-success-700 transition-all"
              />
            </div>

            {/* Staked Assets */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MetricCard
                label="Staked Assets"
                value={formatCurrency(35000)}
                change="+5.2%"
                changeType="positive"
                trend="up"
                subtitle="Earning rewards"
                icon={
                  <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                    <FaLock className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                  </div>
                }
                className="relative border-2 border-brand-200 dark:border-brand-800 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all"
              />
            </div>

            {/* Total Assets */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-warning-500/20 to-warning-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MetricCard
                label="Total Assets"
                value={formatCurrency(totalValue + 35000)}
                change="+3.8%"
                changeType="positive"
                trend="up"
                subtitle="All holdings"
                icon={
                  <div className="p-2 rounded-xl bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30">
                    <FaCoins className="w-5 h-5 text-warning-700 dark:text-warning-400" />
                  </div>
                }
                className="relative border-2 border-warning-200 dark:border-warning-800 shadow-lg hover:shadow-xl hover:border-warning-300 dark:hover:border-warning-700 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Premium Asset Balances */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30">
                <FaCoins className="w-6 h-6 text-white" />
              </div>
              <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white font-bold">
                Your Assets
              </Typography>
            </div>
            <Button variant="tonal-primary" size="sm" className="shadow-lg">
              + Add Token
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, index) => (
              <div key={index} className="relative group">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <Card className="relative border-2 border-brand-200 dark:border-brand-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="space-y-5">
                    {/* Premium Asset Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full blur opacity-50"></div>
                          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                            {asset.symbol.substring(0, 2)}
                          </div>
                        </div>
                        <div>
                          <Typography
                            variant="h6"
                            className="text-neutral-900 dark:text-white font-bold text-lg"
                          >
                            {asset.symbol}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-neutral-600 dark:text-neutral-400 font-medium"
                          >
                            {asset.name}
                          </Typography>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                        asset.changeType === "positive"
                          ? "bg-success-100 dark:bg-success-900/30 border border-success-300 dark:border-success-700"
                          : "bg-error-100 dark:bg-error-900/30 border border-error-300 dark:border-error-700"
                      }`}>
                        {asset.changeType === "positive" ? (
                          <IoTrendingUpOutline className="w-4 h-4 text-success-600 dark:text-success-400" />
                        ) : (
                          <IoTrendingUpOutline className="w-4 h-4 text-error-600 dark:text-error-400 transform rotate-180" />
                        )}
                        <span
                          className={`font-bold text-sm ${
                            asset.changeType === "positive"
                              ? "text-success-700 dark:text-success-400"
                              : "text-error-700 dark:text-error-400"
                          }`}
                        >
                          {asset.change24h}
                        </span>
                      </div>
                    </div>

                    {/* Premium Balance Display */}
                    <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
                      <div className="typography-label text-neutral-600 dark:text-neutral-400 font-semibold">
                        Balance
                      </div>
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {asset.balance}
                      </div>
                      <div className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">
                        {asset.usdValue}
                      </div>
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm" fullWidth className="font-semibold">
                        Send
                      </Button>
                      <Button variant="tonal-primary" size="sm" fullWidth className="font-semibold">
                        Swap
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Recent Activity Section */}
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-info-500/10 to-brand-500/10 rounded-3xl blur-xl opacity-50" />
          
          <Card className="relative border-2 border-info-200 dark:border-info-800 shadow-xl">
            <div className="space-y-6">
              {/* Premium Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
                    <IoSwapHorizontalOutline className="w-6 h-6 text-white" />
                  </div>
                  <Typography
                    variant="h5"
                    className="typography-heading text-neutral-900 dark:text-white font-bold"
                  >
                    Recent Activity
                  </Typography>
                </div>
                <Button variant="tonal-primary" size="sm" className="shadow-lg">
                  View All
                </Button>
              </div>

              {/* Premium Filter Tabs */}
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                {["All", "Sent", "Received", "Staking", "Claims"].map((filter, index) => (
                  <button
                    key={filter}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                      index === 0
                        ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Premium Transaction List */}
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="relative group/tx"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-info-500/10 rounded-2xl blur opacity-0 group-hover/tx:opacity-100 transition-opacity" />
                    
                    <div className="relative p-5 rounded-2xl border-2 border-neutral-200/50 dark:border-neutral-700/30 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-neutral-900">
                      <div className="flex items-center gap-4">
                        {/* Premium Icon */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-2xl blur opacity-50 ${
                                tx.type === "staking"
                                  ? "bg-info-500"
                                  : tx.type === "claim"
                                    ? "bg-success-500"
                                    : tx.type === "sent"
                                      ? "bg-error-500"
                                      : "bg-success-500"
                              }`}
                            />
                            <div
                              className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover/tx:scale-110 ${
                                tx.type === "staking"
                                  ? "bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/40"
                                  : tx.type === "claim"
                                    ? "bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/40"
                                    : tx.type === "sent"
                                      ? "bg-gradient-to-br from-error-500 to-error-600 shadow-lg shadow-error-500/40"
                                      : "bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/40"
                              }`}
                            >
                              {tx.type === "sent" ? (
                                <HiArrowUpRight className="w-7 h-7 text-white" />
                              ) : (
                                <HiArrowDownLeft className="w-7 h-7 text-white" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Premium Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Typography
                              variant="body2"
                              className="text-neutral-900 dark:text-white font-bold capitalize text-base"
                            >
                              {tx.type}{" "}
                              {tx.type === "staking" ? "Staked" : tx.type === "claim" ? "Claimed" : ""}
                            </Typography>
                            {tx.status === "confirmed" && (
                              <span className="flex items-center gap-1 typography-caption text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/30 px-3 py-1 rounded-full border border-success-300 dark:border-success-700 font-semibold">
                                <IoCheckmarkCircle className="w-4 h-4" />
                                Confirmed
                              </span>
                            )}
                          </div>
                          <Typography
                            variant="caption"
                            className="text-neutral-600 dark:text-neutral-400 font-medium"
                          >
                            {tx.timestamp}
                          </Typography>
                        </div>

                        {/* Premium Amount */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold text-neutral-900 dark:text-white">
                            {tx.amount} {tx.asset}
                          </div>
                          {tx.usdValue && (
                            <div className="typography-caption text-neutral-600 dark:text-neutral-400 font-semibold">
                              {tx.usdValue}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Load More */}
              <div className="text-center pt-4">
                <Button variant="tonal-secondary" size="md" fullWidth className="shadow-lg">
                  Load More Transactions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletInfoScreen;
