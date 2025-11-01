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
    <div className="w-full space-y-8">
      {/* Premium Hero Section - Portfolio Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Portfolio Card - Premium Glass-morphism */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-success-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <Card className="relative h-full bg-gradient-to-br from-brand-50 via-white to-success-50/30 dark:from-brand-900/20 dark:via-neutral-900/90 dark:to-success-900/20 border-2 border-brand-200/70 dark:border-brand-700/40 shadow-2xl">
              <div className="space-y-6">
                {/* Premium Label with Live Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/30">
                      <IoWalletOutline className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-brand-800 dark:text-brand-300">
                      Total Portfolio Value
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-100 dark:bg-success-900/30 border border-success-300 dark:border-success-700">
                    <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                    <span className="text-xs font-bold text-success-700 dark:text-success-400">Live</span>
                  </div>
                </div>

                {/* Massive Hero Number */}
                <div className="typography-hero-number text-brand-700 dark:text-brand-400 leading-none">
                  {portfolioValue}
                </div>

                {/* Premium Change Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 border-2 border-success-300 dark:border-success-700 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-success-500">
                      <IoArrowUpOutline className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="typography-percentage text-success-700 dark:text-success-300 font-bold text-xl">
                        +{ytdChange}
                      </span>
                      <span className="typography-percentage text-success-600 dark:text-success-400 font-bold text-lg">
                        (+{ytdPercent})
                      </span>
                    </div>
                  </div>
                  <span className="typography-label text-success-700 dark:text-success-300 font-semibold">
                    YTD
                  </span>
                </div>

                {/* Premium Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-brand-200/50 dark:border-brand-700/30">
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                    <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                      24H Change
                    </div>
                    <div className="flex items-center gap-2">
                      <IoTrendingUpOutline
                        className="w-5 h-5 text-success-600 dark:text-success-400"
                        aria-hidden="true"
                      />
                      <div className="typography-body-number text-success-600 dark:text-success-400 text-xl font-bold">
                        +{dayChange}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                    <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                      All-Time High
                    </div>
                    <div className="typography-body-number text-neutral-900 dark:text-white text-xl font-bold">
                      {allTimeHigh}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                    <div className="typography-label text-neutral-600 dark:text-neutral-400 mb-2">
                      Total Returns
                    </div>
                    <div className="flex items-center gap-2">
                      <IoTrendingUpOutline
                        className="w-5 h-5 text-success-600 dark:text-success-400"
                        aria-hidden="true"
                      />
                      <div className="typography-body-number text-success-600 dark:text-success-400 text-xl font-bold">
                        +{totalReturns}
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
          {/* Primary CTA - Premium Gradient */}
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
                  <FaLock className="w-6 h-6 flex-shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs opacity-90 font-semibold uppercase tracking-wider">
                    Primary Action
                  </span>
                  <span className="text-lg font-bold">Stake Credits</span>
                </div>
              </div>
            </Button>
          </div>

          {/* Secondary CTA - Premium Card */}
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
                  <IoLeafOutline className="w-6 h-6 flex-shrink-0 text-success-600 dark:text-success-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    Quick Action
                  </span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    Buy Credits
                  </span>
                </div>
              </div>
            </Button>
          </div>

          {/* Reward CTA - Premium Highlight */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-warning-500/30 to-success-500/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <Button
              variant="tonal-primary"
              size="lg"
              fullWidth
              className="relative h-24 justify-start pl-6 text-left bg-gradient-to-br from-warning-50 to-success-50 dark:from-warning-900/20 dark:to-success-900/20 border-2 border-warning-300 dark:border-warning-700 hover:border-warning-400 dark:hover:border-warning-600 shadow-lg"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 shadow-lg">
                  <HiSparkles className="w-6 h-6 flex-shrink-0 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-warning-700 dark:text-warning-400 font-semibold">
                    Rewards Available
                  </span>
                  <span className="text-lg font-bold text-warning-800 dark:text-warning-300">
                    Claim {formatCurrency(240)}
                  </span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Financial Metrics Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
            <IoStatsChartOutline className="w-6 h-6 text-white" />
          </div>
          <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white font-bold">
            Financial Overview
          </Typography>
        </div>

        {/* Premium MetricCardGrid with enhanced styling */}
        <div className="grid grid-cols-3 gap-6">
          {/* Total Staked - Premium Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <MetricCard
              label="Total Staked"
              value={formatCurrency(35000)}
              change="+5.2%"
              changeType="positive"
              trend="up"
              subtitle="Last 30 days"
              icon={
                <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                  <FaLock className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                </div>
              }
              className="relative border-2 border-brand-200 dark:border-brand-800 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all"
            />
          </div>

          {/* Monthly Earnings - Premium Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-success-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <MetricCard
              label="Monthly Earnings"
              value={formatCurrency(5240)}
              change="+12.5%"
              changeType="positive"
              trend="up"
              subtitle="This month"
              icon={
                <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                  <FaChartLine className="w-5 h-5 text-success-700 dark:text-success-400" />
                </div>
              }
              className="relative border-2 border-success-200 dark:border-success-800 shadow-lg hover:shadow-xl hover:border-success-300 dark:hover:border-success-700 transition-all"
            />
          </div>

          {/* Available Balance - Premium Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-info-500/20 to-info-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <MetricCard
              label="Available Balance"
              value={formatCurrency(8010)}
              change="-2.1%"
              changeType="negative"
              trend="down"
              subtitle="Ready to stake"
              icon={
                <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
                  <FaWallet className="w-5 h-5 text-info-700 dark:text-info-400" />
                </div>
              }
              className="relative border-2 border-info-200 dark:border-info-800 shadow-lg hover:shadow-xl hover:border-info-300 dark:hover:border-info-700 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Premium Environmental Impact Section */}
      <div className="relative group">
        {/* Outer eco-glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-eco-leaf/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        <Card className="relative bg-gradient-to-br from-success-50 via-white to-eco-leaf/10 dark:from-success-900/20 dark:via-neutral-900/80 dark:to-eco-forest/10 border-2 border-success-200/70 dark:border-success-800/50 shadow-2xl">
          <div className="space-y-8">
            {/* Premium Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30">
                  <FaLeaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <Typography
                    variant="h5"
                    className="typography-heading text-neutral-900 dark:text-white font-bold"
                  >
                    Your Environmental Impact
                  </Typography>
                  <span className="typography-caption text-success-700 dark:text-success-400 font-medium">
                    This month's contribution to sustainability
                  </span>
                </div>
              </div>
              
              {/* Live eco badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success-100 dark:bg-success-900/30 border-2 border-success-300 dark:border-success-700">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs font-bold text-success-700 dark:text-success-400">Live Impact</span>
              </div>
            </div>

            {/* Premium Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Carbon Retired - Premium Card */}
              <div
                className="relative group/card p-6 rounded-2xl bg-gradient-to-br from-success-100 to-success-200/50 dark:from-success-900/30 dark:to-success-800/20 border-2 border-success-300 dark:border-success-700 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                role="article"
                aria-label="Carbon retirement metric"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="typography-label text-success-800 dark:text-success-300 font-semibold">
                      Carbon Retired
                    </span>
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-success-500 text-white text-xs font-bold cursor-help"
                      title="Metric tons of CO₂ equivalent offset through carbon credit retirement"
                      aria-label="Information: Metric tons of CO₂ equivalent offset"
                    >
                      ?
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-success-700 dark:text-success-400">2.5</span>
                    <span className="typography-body2 font-semibold text-success-600 dark:text-success-500">MT</span>
                  </div>
                  <div className="typography-caption text-success-700 dark:text-success-400">
                    CO₂e offset
                  </div>
                </div>
              </div>

              {/* Tree Equivalent - Premium Card */}
              <div
                className="relative group/card p-6 rounded-2xl bg-gradient-to-br from-eco-leaf/20 to-eco-forest/10 dark:from-eco-forest/20 dark:to-eco-leaf/10 border-2 border-eco-leaf/50 dark:border-eco-forest/50 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                role="article"
                aria-label="Tree equivalent metric"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="typography-label text-eco-forest dark:text-eco-leaf font-semibold">
                      Tree Equivalent
                    </span>
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-eco-forest dark:bg-eco-leaf text-white text-xs font-bold cursor-help"
                      title="Equivalent number of trees that would absorb the same amount of CO₂"
                      aria-label="Information: Number of trees equivalent to carbon offset"
                    >
                      ?
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-eco-forest dark:text-eco-leaf">3,200</span>
                  </div>
                  <div className="typography-caption text-eco-forest dark:text-eco-leaf">
                    Trees planted
                  </div>
                </div>
              </div>

              {/* Community Score - Premium Card */}
              <div
                className="relative group/card p-6 rounded-2xl bg-gradient-to-br from-info-100 to-info-200/50 dark:from-info-900/30 dark:to-info-800/20 border-2 border-info-300 dark:border-info-700 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                role="article"
                aria-label="Community score metric"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="typography-label text-info-800 dark:text-info-300 font-semibold">
                      Community Score
                    </span>
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-info-500 text-white text-xs font-bold cursor-help"
                      title="Your contribution score within the XCARBON community"
                      aria-label="Information: Community contribution score"
                    >
                      ?
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-info-700 dark:text-info-400">450</span>
                  </div>
                  <div className="typography-caption text-info-700 dark:text-info-400">
                    Impact points
                  </div>
                </div>
              </div>

              {/* Tier Progress - Premium Card */}
              <div
                className="relative group/card p-6 rounded-2xl bg-gradient-to-br from-warning-100 to-warning-200/50 dark:from-warning-900/30 dark:to-warning-800/20 border-2 border-warning-300 dark:border-warning-700 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
                role="article"
                aria-label="Tier progress metric"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="w-4 h-4 text-warning-600 dark:text-warning-400" />
                    <span className="typography-label text-warning-800 dark:text-warning-300 font-semibold">
                      Tier Progress
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-warning-700 dark:text-warning-400">75</span>
                    <span className="typography-body2 font-semibold text-warning-600 dark:text-warning-500">%</span>
                  </div>
                  <div className="typography-caption text-warning-700 dark:text-warning-400">
                    to Platinum
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Progress Bar */}
            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border-2 border-warning-200 dark:border-warning-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaTrophy className="w-4 h-4 text-warning-600 dark:text-warning-400" />
                  <span className="typography-label text-warning-800 dark:text-warning-300 font-semibold">
                    Gold → Platinum
                  </span>
                </div>
                <span className="typography-label text-warning-700 dark:text-warning-400 font-bold text-lg">
                  75%
                </span>
              </div>
              <div
                className="relative h-4 bg-warning-200 dark:bg-warning-900/30 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress from Gold to Platinum tier: 75% complete"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-warning-500 to-warning-400 rounded-full transition-all duration-500 shadow-lg shadow-warning-500/50"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="typography-caption text-warning-700 dark:text-warning-400 font-medium">
                You're 25% away from reaching Platinum tier — keep it up!
              </p>
            </div>

            {/* Premium Actions */}
            <div className="flex gap-4 pt-2">
              <Button variant="tonal-primary" size="md" className="shadow-lg">
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
      </div>

      {/* Premium Coming Soon: Active Positions */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-500/10 to-neutral-600/10 rounded-2xl blur-xl opacity-50" />
        <Card className="relative">
          <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-lg mb-6">
              <IoStatsChartOutline className="w-12 h-12 text-neutral-600 dark:text-neutral-400" />
            </div>
            <Typography
              variant="h6"
              className="typography-subheading text-neutral-700 dark:text-neutral-300 mb-3 font-bold"
            >
              Active Positions
            </Typography>
            <Typography
              variant="body2"
              className="typography-body text-neutral-600 dark:text-neutral-400"
            >
              Your staking positions and active credits will appear here
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
