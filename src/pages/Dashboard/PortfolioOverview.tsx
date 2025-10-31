import React, { useState } from "react";
import { Card, Button, Typography } from "@/components";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa";

interface PortfolioMetric {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

const PortfolioOverview: React.FC = () => {
  const [totalValue] = useState<string>("$48,250.00");
  const [ytdChange] = useState<string>("+$3,450 (+7.7%)");

  const metrics: PortfolioMetric[] = [
    {
      label: "Total Staked",
      value: "$35,000",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      label: "Earned This Month",
      value: "+$5,240",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      label: "Available Balance",
      value: "$8,010",
      change: "-2.1%",
      changeType: "negative",
    },
  ];

  const ecologyMetrics = {
    carbonRetired: "2.5 MT CO₂e",
    treesEquivalent: "3,200 trees",
    communityScore: "450 points",
    tierProgress: "Gold → Platinum (75%)",
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Hero Section - Portfolio Value */}
      <Card
        className="bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/10 dark:to-neutral-900/50"
        size="default"
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 mb-2">
                Portfolio Value
              </Typography>
              <Typography variant="h2" className="text-brand-700 dark:text-brand-400 font-bold">
                {totalValue}
              </Typography>
            </div>
            <div className="bg-success-100 dark:bg-success-900/20 px-4 py-3 rounded-lg">
              <div className="flex items-center gap-2 text-success-700 dark:text-success-400 font-semibold">
                <IoArrowUpOutline className="w-5 h-5" />
                {ytdChange}
              </div>
              <Typography variant="body2" className="text-success-600 dark:text-success-300">
                YTD Performance
              </Typography>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm p-4 rounded-lg border border-neutral-200 dark:border-neutral-700/50"
              >
                <Typography
                  variant="caption"
                  className="text-neutral-600 dark:text-neutral-400 mb-1"
                >
                  {metric.label}
                </Typography>
                <div className="flex items-baseline gap-2">
                  <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white">
                    {metric.value}
                  </Typography>
                  {metric.change && (
                    <span
                      className={`text-sm font-semibold flex items-center gap-1 ${
                        metric.changeType === "positive"
                          ? "text-success-600 dark:text-success-400"
                          : metric.changeType === "negative"
                            ? "text-error-600 dark:text-error-400"
                            : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {metric.changeType === "positive" ? (
                        <IoArrowUpOutline className="w-4 h-4" />
                      ) : metric.changeType === "negative" ? (
                        <IoArrowDownOutline className="w-4 h-4" />
                      ) : null}
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Ecology Impact Card - Mobile Optimized */}
      <Card className="bg-gradient-to-br from-eco-leaf/10 to-eco-forest/5 dark:from-eco-forest/10 dark:to-neutral-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaLeaf className="w-6 h-6 text-eco-leaf" />
            <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white">
              Your Impact This Month
            </Typography>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Carbon Retired", value: ecologyMetrics.carbonRetired },
              { label: "Trees Equivalent", value: ecologyMetrics.treesEquivalent },
              { label: "Community Score", value: ecologyMetrics.communityScore },
              { label: "Tier Progress", value: ecologyMetrics.tierProgress },
            ].map((item, index) => (
              <div key={index} className="bg-white/30 dark:bg-neutral-800/30 p-3 rounded-lg">
                <Typography
                  variant="caption"
                  className="text-neutral-600 dark:text-neutral-400 mb-1"
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold text-neutral-900 dark:text-white"
                >
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="primary" size="sm">
              View Details
            </Button>
            <Button variant="flat-secondary" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button variant="primary" size="md" fullWidth className="h-auto py-3">
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90 font-medium">Quick Action</span>
            <span className="text-sm font-semibold">Stake XCARBON</span>
          </div>
        </Button>
        <Button variant="secondary" size="md" fullWidth className="h-auto py-3">
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90 font-medium">Quick Action</span>
            <span className="text-sm font-semibold">Buy Credits</span>
          </div>
        </Button>
        <Button variant="tonal-primary" size="md" fullWidth className="h-auto py-3">
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90 font-medium">Quick Action</span>
            <span className="text-sm font-semibold">Claim Rewards</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default PortfolioOverview;
