import React, { useState } from "react";
import { Card, Button, Typography } from "@/components";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

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
    <div className="w-full space-y-4 md:space-y-6">
      {/* Analytics Header with Time Range Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold mb-1">
            Portfolio Analytics
          </Typography>
          <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
            Total Value: $48,250.00 | YTD: +$3,450 (+7.7%)
          </Typography>
        </div>

        {/* Time Range Buttons - Mobile Optimized */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedTimeRange(range.value)}
              className={`px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                selectedTimeRange === range.value
                  ? "bg-brand-700 text-white shadow-md"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Placeholder - Mobile Responsive */}
      <Card className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800/30 dark:to-neutral-900/30">
        <div className="w-full h-64 md:h-96 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/50 rounded-lg">
          <div className="text-center">
            <Typography variant="h6" className="text-neutral-600 dark:text-neutral-400 mb-2">
              Portfolio Value Chart
            </Typography>
            <Typography variant="caption" className="text-neutral-500 dark:text-neutral-500">
              [Chart component integration ready]
            </Typography>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: "High", value: "$50,000" },
            { label: "Low", value: "$44,800" },
            { label: "Avg", value: "$47,200" },
            { label: "Current", value: "$48,250" },
          ].map((stat, idx) => (
            <div key={idx} className="p-2 bg-neutral-100 dark:bg-neutral-800/50 rounded">
              <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-neutral-900 dark:text-white mt-1"
              >
                {stat.value}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      {/* Asset Allocation - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-4">
            Asset Allocation
          </Typography>

          {/* Pie Chart Placeholder */}
          <div className="w-full h-48 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/50 rounded-lg mb-4">
            <Typography variant="caption" className="text-neutral-500 dark:text-neutral-500">
              [Pie Chart]
            </Typography>
          </div>

          {/* Legend - Mobile Optimized */}
          <div className="space-y-2">
            {allocationData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800/30 rounded"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: ["#10B981", "#0284C7", "#F59E0B"][idx],
                    }}
                  ></div>
                  <Typography
                    variant="body2"
                    className="text-neutral-900 dark:text-white font-medium"
                  >
                    {item.asset}
                  </Typography>
                </div>
                <div className="text-right flex-shrink-0">
                  <Typography
                    variant="body2"
                    className="font-bold text-neutral-900 dark:text-white"
                  >
                    {item.percentage}%
                  </Typography>
                  <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                    {item.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Summary - Mobile Optimized */}
        <Card>
          <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-4">
            Performance Summary
          </Typography>

          <div className="space-y-3">
            {performanceData.map((asset, idx) => (
              <div
                key={idx}
                className="p-3 bg-neutral-50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200 dark:border-neutral-700/50"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
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
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 flex-shrink-0 ${
                      asset.changeType === "positive"
                        ? "bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400"
                        : asset.changeType === "negative"
                          ? "bg-error-100 dark:bg-error-900/20 text-error-700 dark:text-error-400"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400"
                    }`}
                  >
                    {asset.changeType === "positive" ? (
                      <IoArrowUpOutline className="w-3 h-3" />
                    ) : (
                      <IoArrowDownOutline className="w-3 h-3" />
                    )}
                    {asset.changePercent}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Typography
                    variant="body2"
                    className="text-neutral-900 dark:text-white font-mono"
                  >
                    {asset.value}
                  </Typography>
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
                </div>
              </div>
            ))}
          </div>
        </Card>
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

      {/* Export/Actions - Mobile Optimized */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <Button variant="secondary" fullWidth className="sm:flex-1">
          Download Report
        </Button>
        <Button variant="secondary" fullWidth className="sm:flex-1">
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
