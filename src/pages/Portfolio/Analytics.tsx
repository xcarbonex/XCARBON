import React, { useState } from "react";
import { Card, Button, Typography } from "@/components";
import { IoArrowUpOutline, IoArrowDownOutline, IoStatsChartOutline, IoTrendingUpOutline, IoPieChartOutline } from "react-icons/io5";
import { FaChartPie, FaChartLine } from "react-icons/fa";

interface AssetPerformance {
  symbol: string;
  amount: string;
  value: string;
  change: string;
  changePercent: string;
  changeType: "positive" | "negative" | "neutral";
}

interface TimeRange {
  label: string;
  value: string;
}

const PortfolioAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("1M");

  const timeRanges: TimeRange[] = [
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "All", value: "All" },
  ];

  const performanceData: AssetPerformance[] = [
    {
      symbol: "XCC",
      amount: "5,234",
      value: "$35,000",
      change: "+$3,200",
      changePercent: "+10.1%",
      changeType: "positive",
    },
    {
      symbol: "USDC",
      amount: "10,000",
      value: "$10,000",
      change: "-$100",
      changePercent: "-1.0%",
      changeType: "negative",
    },
    {
      symbol: "Others",
      amount: "Mixed",
      value: "$3,250",
      change: "+$350",
      changePercent: "+12.0%",
      changeType: "positive",
    },
  ];

  const allocationData = [
    { asset: "XCC", percentage: 72, value: "$35,000" },
    { asset: "USDC", percentage: 21, value: "$10,000" },
    { asset: "Others", percentage: 7, value: "$3,250" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20">
      <div className="w-full space-y-8">
        {/* Premium Compact Header (Per Phase 5: Remove hero KPI duplication) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-brand-200 dark:border-brand-800 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
              <IoStatsChartOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
                Portfolio Analytics
              </Typography>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  $48,250.00
                </span>
                <span className="px-2 py-1 rounded-lg bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 text-xs font-bold">
                  +$3,450 YTD
                </span>
              </div>
            </div>
          </div>

          {/* Premium Time Range Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedTimeRange(range.value)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedTimeRange === range.value
                    ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Chart Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-info-500/20 rounded-3xl blur-2xl opacity-50" />
          
          <Card className="relative bg-gradient-to-br from-white via-neutral-50 to-success-50/30 dark:from-neutral-900 dark:via-neutral-800/50 dark:to-success-900/10 border-2 border-success-200 dark:border-success-800 shadow-2xl">
            {/* Premium Chart Area */}
            <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg mb-4">
                  <FaChartLine className="w-12 h-12 text-success-700 dark:text-success-400" />
                </div>
                <Typography variant="h6" className="text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Portfolio Value Chart
                </Typography>
                <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                  [Chart component integration ready]
                </Typography>
              </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "High", value: "$50,000", color: "success" },
                { label: "Low", value: "$44,800", color: "error" },
                { label: "Avg", value: "$47,200", color: "info" },
                { label: "Current", value: "$48,250", color: "brand" },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border-2 shadow-lg ${
                    stat.color === "success" 
                      ? "bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800"
                      : stat.color === "error"
                        ? "bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800"
                        : stat.color === "info"
                          ? "bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800"
                          : "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800"
                  }`}
                >
                  <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 font-semibold">
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-bold text-neutral-900 dark:text-white mt-2 text-lg"
                  >
                    {stat.value}
                  </Typography>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Premium Asset Allocation & Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Premium Asset Allocation Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <Card className="relative border-2 border-success-200 dark:border-success-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30">
                  <IoPieChartOutline className="w-6 h-6 text-white" />
                </div>
                <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white">
                  Asset Allocation
                </Typography>
              </div>

              {/* Premium Pie Chart Placeholder */}
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 rounded-2xl mb-6 border-2 border-success-200 dark:border-success-700">
                <div className="text-center">
                  <FaChartPie className="w-16 h-16 text-success-600 dark:text-success-400 mx-auto mb-2" />
                  <Typography variant="caption" className="text-success-700 dark:text-success-400 font-semibold">
                    [Pie Chart Ready]
                  </Typography>
                </div>
              </div>

              {/* Premium Legend */}
              <div className="space-y-3">
                {allocationData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-success-300 dark:hover:border-success-700 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg"
                        style={{
                          backgroundColor: ["#10B981", "#0284C7", "#F59E0B"][idx],
                        }}
                      ></div>
                      <Typography
                        variant="body2"
                        className="text-neutral-900 dark:text-white font-bold"
                      >
                        {item.asset}
                      </Typography>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Typography
                        variant="body2"
                        className="font-bold text-neutral-900 dark:text-white text-lg"
                      >
                        {item.percentage}%
                      </Typography>
                      <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 font-medium">
                        {item.value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Premium Performance Summary Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-info-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <Card className="relative border-2 border-info-200 dark:border-info-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
                  <IoTrendingUpOutline className="w-6 h-6 text-white" />
                </div>
                <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white">
                  Performance Summary
                </Typography>
              </div>

              <div className="space-y-4">
                {performanceData.map((asset, idx) => (
                  <div
                    key={idx}
                    className="relative group/item"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-info-500/10 rounded-xl blur opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    
                    <div className="relative p-4 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-info-300 dark:hover:border-info-700 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <Typography
                            variant="body2"
                            className="font-bold text-neutral-900 dark:text-white text-lg"
                          >
                            {asset.symbol}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-neutral-600 dark:text-neutral-400 font-medium"
                          >
                            {asset.amount}
                          </Typography>
                        </div>
                        <span
                          className={`text-sm font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 flex-shrink-0 border-2 ${
                            asset.changeType === "positive"
                              ? "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 border-success-300 dark:border-success-700"
                              : asset.changeType === "negative"
                                ? "bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400 border-error-300 dark:border-error-700"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700"
                          }`}
                        >
                          {asset.changeType === "positive" ? (
                            <IoTrendingUpOutline className="w-4 h-4" />
                          ) : (
                            <IoTrendingUpOutline className="w-4 h-4 transform rotate-180" />
                          )}
                          {asset.changePercent}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Typography
                          variant="body2"
                          className="text-neutral-900 dark:text-white font-bold text-lg"
                        >
                          {asset.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          className={`font-bold ${
                            asset.changeType === "positive"
                              ? "text-success-600 dark:text-success-400"
                              : "text-error-600 dark:text-error-400"
                          }`}
                        >
                          {asset.change}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

      {/* Performance Breakdown Table - Mobile Optimized */}
      <Card>
        <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-4">
          Performance Breakdown
        </Typography>

        {/* Mobile: Stack view, Desktop: Table view */}
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700/50">
                  <th className="text-left py-2 px-2 font-semibold text-neutral-700 dark:text-neutral-300">
                    Asset
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-neutral-700 dark:text-neutral-300">
                    Amount
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-neutral-700 dark:text-neutral-300">
                    Value
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-neutral-700 dark:text-neutral-300">
                    Change
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-neutral-700 dark:text-neutral-300">
                    %
                  </th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((asset, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-neutral-200 dark:border-neutral-700/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                  >
                    <td className="py-3 px-2 text-neutral-900 dark:text-white font-medium">
                      {asset.symbol}
                    </td>
                    <td className="py-3 px-2 text-right text-neutral-600 dark:text-neutral-400 font-mono">
                      {asset.amount}
                    </td>
                    <td className="py-3 px-2 text-right text-neutral-900 dark:text-white font-bold font-mono">
                      {asset.value}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-semibold ${
                        asset.changeType === "positive"
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {asset.change}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-bold ${
                        asset.changeType === "positive"
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {asset.changePercent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stack View */}
          <div className="md:hidden space-y-2">
            {performanceData.map((asset, idx) => (
              <div
                key={idx}
                className="p-3 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200 dark:border-neutral-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Typography
                      variant="body2"
                      className="font-bold text-neutral-900 dark:text-white"
                    >
                      {asset.symbol}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {asset.amount}
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography
                      variant="body2"
                      className="font-bold text-neutral-900 dark:text-white"
                    >
                      {asset.value}
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-neutral-700/50">
                  <Typography
                    variant="caption"
                    className={
                      asset.changeType === "positive"
                        ? "text-success-600 dark:text-success-400"
                        : "text-error-600 dark:text-error-400"
                    }
                  >
                    {asset.change}
                  </Typography>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      asset.changeType === "positive"
                        ? "bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400"
                        : "bg-error-100 dark:bg-error-900/20 text-error-700 dark:text-error-400"
                    }`}
                  >
                    {asset.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

        {/* Premium Export/Actions */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button variant="tonal-primary" fullWidth className="sm:flex-1 shadow-lg font-semibold">
            📊 Download Report
          </Button>
          <Button variant="tonal-secondary" fullWidth className="sm:flex-1 shadow-lg font-semibold">
            📤 Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
