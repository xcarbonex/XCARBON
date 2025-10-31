import React, { useState } from "react";
import { Card, Button, Typography, MetricCard, MetricCardGrid } from "@/components";
import {
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoWalletOutline,
  IoTrendingUpOutline,
  IoLeafOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { FaLock, FaChartLine, FaWallet, FaLeaf, FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

/**
 * DashboardHome Component
 *
 * Professional DeFi/Finance dashboard featuring:
 * - Hero section with portfolio value
 * - Financial metrics grid
 * - Ecological impact section
 * - Quick actions
 * - Active positions (coming soon)
 *
 * Design: Modern DeFi + Finance App + Ecological branding
 */
const DashboardHome: React.FC = () => {
  // Number formatter with tabular numerals
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  // Portfolio state - using raw numbers for formatting
  const [portfolioValue] = useState(formatCurrency(48250));
  const [ytdChange] = useState(formatCurrency(3450));
  const [ytdPercent] = useState(formatPercent(7.7));
  const [dayChange] = useState(formatPercent(2.3));
  const [allTimeHigh] = useState(formatCurrency(52100));
  const [totalReturns] = useState(formatPercent(15.2));

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Hero Section - Portfolio Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Portfolio Card - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-brand-900/20 dark:via-neutral-900/80 dark:to-accent-900/20 border-brand-200/50 dark:border-brand-700/30">
            <div className="space-y-6">
              {/* Label with icon */}
              <div className="flex items-center gap-2">
                <IoWalletOutline className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                <span className="typography-label text-brand-800 dark:text-brand-300">
                  Total Portfolio Value
                </span>
              </div>

              {/* Massive number with hero typography */}
              <div className="typography-hero-number text-brand-700 dark:text-brand-400">
                {portfolioValue}
              </div>

              {/* Change indicators */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 typography-percentage text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/20 px-3 py-1.5 rounded-lg">
                    <IoArrowUpOutline className="w-5 h-5" aria-hidden="true" />
                    <span className="font-bold">+{ytdChange}</span>
                    <span className="font-bold">(+{ytdPercent})</span>
                    <span className="sr-only">
                      Increase of {ytdChange} or {ytdPercent}
                    </span>
                  </div>
                  <span className="typography-label text-neutral-600 dark:text-neutral-400">
                    YTD
                  </span>
                </div>
              </div>

              {/* Quick stats grid - Equal spacing and consistent labels */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-200/50 dark:border-brand-700/30">
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    24H Change
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IoArrowUpOutline
                      className="w-4 h-4 text-success-600 dark:text-success-400"
                      aria-hidden="true"
                    />
                    <div className="typography-body-number text-success-600 dark:text-success-400 text-lg font-bold">
                      +{dayChange}
                    </div>
                    <span className="sr-only">Increased by {dayChange} in the last 24 hours</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    All-Time High
                  </div>
                  <div className="typography-body-number text-neutral-900 dark:text-white text-lg font-bold">
                    {allTimeHigh}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    Total Returns
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IoArrowUpOutline
                      className="w-4 h-4 text-success-600 dark:text-success-400"
                      aria-hidden="true"
                    />
                    <div className="typography-body-number text-success-600 dark:text-success-400 text-lg font-bold">
                      +{totalReturns}
                    </div>
                    <span className="sr-only">Total returns of positive {totalReturns}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Column - One primary CTA, others secondary */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <FaLock className="w-5 h-5 flex-shrink-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-80 font-medium uppercase tracking-wide">
                  Primary Action
                </span>
                <span className="text-base font-bold">Stake Credits</span>
              </div>
            </div>
          </Button>

          {/* Secondary CTAs */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left"
          >
            <div className="flex items-center gap-3 w-full">
              <IoLeafOutline className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Quick Action</span>
                <span className="text-base font-semibold">Buy Credits</span>
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
              <HiSparkles className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Rewards Available</span>
                <span className="text-base font-semibold">Claim {formatCurrency(240)}</span>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Financial Metrics Grid - Standardized */}
      <div>
        <div className="mb-5">
          <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white">
            Financial Overview
          </Typography>
        </div>

        <MetricCardGrid columns={3}>
          <MetricCard
            label="Total Staked"
            value={formatCurrency(35000)}
            change="+5.2%"
            changeType="positive"
            trend="up"
            subtitle="Last 30 days"
            icon={<FaLock className="w-5 h-5" />}
          />

          <MetricCard
            label="Monthly Earnings"
            value={formatCurrency(5240)}
            change="+12.5%"
            changeType="positive"
            trend="up"
            subtitle="This month"
            icon={<FaChartLine className="w-5 h-5" />}
          />

          <MetricCard
            label="Available Balance"
            value={formatCurrency(8010)}
            change="-2.1%"
            changeType="negative"
            trend="down"
            subtitle="Ready to stake"
            icon={<FaWallet className="w-5 h-5" />}
          />
        </MetricCardGrid>
      </div>

      {/* Ecological Impact Section */}
      <Card className="bg-gradient-to-br from-eco-leaf/10 via-eco-forest/5 to-eco-water/5 dark:from-eco-forest/20 dark:via-neutral-900/80 dark:to-eco-water/10 border-eco-leaf/30 dark:border-eco-forest/30">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-eco-leaf/10 dark:bg-eco-forest/20 rounded-xl">
              <FaLeaf className="w-6 h-6 text-eco-leaf dark:text-eco-leaf" />
            </div>
            <div>
              <Typography
                variant="h5"
                className="typography-heading text-neutral-900 dark:text-white"
              >
                Your Environmental Impact
              </Typography>
              <span className="typography-caption text-neutral-600 dark:text-neutral-400">
                This month's contribution to sustainability
              </span>
            </div>
          </div>

          {/* Metrics Grid - Enhanced with tooltips and aria labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm p-4 rounded-xl border border-eco-leaf/20 dark:border-eco-forest/20"
              role="article"
              aria-label="Carbon retirement metric"
            >
              <div className="typography-label mb-2 text-eco-forest dark:text-eco-leaf flex items-center gap-1">
                Carbon Retired
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-eco-forest/10 dark:bg-eco-leaf/10 text-[10px] cursor-help"
                  title="Metric tons of CO₂ equivalent offset through carbon credit retirement"
                  aria-label="Information: Metric tons of CO₂ equivalent offset"
                >
                  ?
                </span>
              </div>
              <div className="typography-metric-medium text-eco-forest dark:text-eco-leaf font-bold">
                2.5 MT
              </div>
              <div className="typography-caption text-neutral-600 dark:text-neutral-400 mt-1">
                CO₂e offset
              </div>
            </div>

            <div
              className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm p-4 rounded-xl border border-eco-leaf/20 dark:border-eco-forest/20"
              role="article"
              aria-label="Tree equivalent metric"
            >
              <div className="typography-label mb-2 text-eco-forest dark:text-eco-leaf flex items-center gap-1">
                Tree Equivalent
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-eco-forest/10 dark:bg-eco-leaf/10 text-[10px] cursor-help"
                  title="Equivalent number of trees that would absorb the same amount of CO₂"
                  aria-label="Information: Number of trees equivalent to carbon offset"
                >
                  ?
                </span>
              </div>
              <div className="typography-metric-medium text-eco-leaf font-bold">3,200</div>
              <div className="typography-caption text-neutral-600 dark:text-neutral-400 mt-1">
                Trees planted
              </div>
            </div>

            <div
              className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm p-4 rounded-xl border border-eco-water/20 dark:border-eco-water/20"
              role="article"
              aria-label="Community score metric"
            >
              <div className="typography-label mb-2 text-eco-water dark:text-eco-water flex items-center gap-1">
                Community Score
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-eco-water/10 text-[10px] cursor-help"
                  title="Your contribution score within the XCARBON community"
                  aria-label="Information: Community contribution score"
                >
                  ?
                </span>
              </div>
              <div className="typography-metric-medium text-eco-water font-bold">450</div>
              <div className="typography-caption text-neutral-600 dark:text-neutral-400 mt-1">
                Impact points
              </div>
            </div>

            <div
              className="bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm p-4 rounded-xl border border-warning-300/50 dark:border-warning-700/30"
              role="article"
              aria-label="Tier progress metric"
            >
              <div className="typography-label mb-2 text-warning-700 dark:text-warning-500">
                Tier Progress
              </div>
              <div className="typography-metric-medium text-warning-600 dark:text-warning-500 font-bold">
                75%
              </div>
              <div className="typography-caption text-neutral-600 dark:text-neutral-400 mt-1">
                to Platinum
              </div>
            </div>
          </div>

          {/* Progress bar - Enhanced with accessible semantics */}
          <div className="space-y-2" role="region" aria-label="Membership tier progress">
            <div className="flex items-center justify-between">
              <span className="typography-label text-neutral-600 dark:text-neutral-400">
                Gold → Platinum
              </span>
              <span className="typography-label text-warning-600 dark:text-warning-500 font-bold">
                75%
              </span>
            </div>
            <div
              className="relative h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress from Gold to Platinum tier: 75% complete"
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-warning-500 to-warning-400 rounded-full transition-all duration-500 shadow-lg shadow-warning-500/30"
                style={{ width: "75%" }}
              />
            </div>
            <p className="typography-caption text-neutral-500 dark:text-neutral-400 text-center">
              You're 25% away from reaching Platinum tier
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="tonal-primary" size="md">
              <div className="flex items-center gap-2">
                <FaTrophy className="w-4 h-4" />
                <span>View Achievements</span>
              </div>
            </Button>
            <Button variant="flat-primary" size="md">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Coming Soon: Active Positions */}
      <Card>
        <div className="text-center py-12">
          <IoStatsChartOutline className="w-16 h-16 text-neutral-400 dark:text-neutral-600 mx-auto mb-4" />
          <Typography
            variant="h6"
            className="typography-subheading text-neutral-600 dark:text-neutral-400 mb-2"
          >
            Active Positions
          </Typography>
          <Typography
            variant="body2"
            className="typography-body text-neutral-500 dark:text-neutral-500"
          >
            Your staking positions and active credits will appear here
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;
