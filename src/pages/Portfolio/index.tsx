import React, { useState } from "react";
import clsx from "clsx";
import { Table, Tabs, Card, Button, MetricCard, MetricCardGrid } from "@/components";
import type { Tab } from "@/components/Tabs";
import { portfolioData, activeAgreements } from "@/appData/portfolioData";
import { Typography } from "@/components";
import {
  IoTrendingUpOutline,
  IoStatsChartOutline,
  IoWalletOutline,
  IoArrowUpOutline,
} from "react-icons/io5";
import { FaChartPie, FaChartLine, FaLeaf } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface PortfolioRow {
  assetName?: string;
  projectType?: string;
  quantity?: string;
  marketValue?: string;
  costBasis?: string;
  vintage?: string;
  location?: string;
  status?: string;
  tradeId?: string;
  tradedValue?: string;
  tradeType?: string;
  date?: string;
  contractId?: string;
  value?: string;
  dueDate?: string;
  agreementId?: string;
  nextDelivery?: string;
  type?: string;
  yearlyQuantity?: string;
  duration?: string;
}

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("openPositions");

  // Number formatter
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Convert portfolio data into tabs format
  const tabs: Tab[] = Object.keys(portfolioData).map((key) => ({
    id: key,
    label: portfolioData[key as keyof typeof portfolioData].title,
  }));

  // Define table columns for each tab
  const tableColumns = {
    openPositions: [
      {
        accessorKey: "assetName",
        header: "Asset Name",
        cell: ({ row }: { row: { original: PortfolioRow } }) => (
          <div className="whitespace-nowrap">
            <div>{row.original.assetName}</div>
          </div>
        ),
      },
      {
        accessorKey: "projectType",
        header: "Project Type",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "marketValue",
        header: "Market Value",
      },
      {
        accessorKey: "costBasis",
        header: "Cost Basis",
      },
      {
        accessorKey: "vintage",
        header: "Vintage",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: { original: PortfolioRow } }) => (
          <span className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-secondary  text-tbase">
            {row.original.status}
          </span>
        ),
      },
    ],
    historicalTrades: [
      {
        accessorKey: "tradeId",
        header: "Trade ID",
      },
      {
        accessorKey: "assetName",
        header: "Asset Name",
      },
      {
        accessorKey: "projectType",
        header: "Project Type",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "tradedValue",
        header: "Traded Value",
      },
      {
        accessorKey: "tradeType",
        header: "Type",
        cell: ({ row }: { row: { original: PortfolioRow } }) => (
          <p
            className={clsx(
              "px-2 py-1 text-center max-w-14 rounded-full text-sm",
              row.original.tradeType === "Buy" ? "bg-[#52886C]" : "bg-[#D94F0B]",
              "text-white"
            )}
          >
            {row.original.tradeType}
          </p>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    pendingContracts: [
      {
        accessorKey: "contractId",
        header: "Contract ID",
      },
      {
        accessorKey: "assetName",
        header: "Asset Name",
      },
      {
        accessorKey: "projectType",
        header: "Project Type",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "value",
        header: "Value",
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: { original: PortfolioRow } }) => (
          <p className="px-2 py-1 text-center max-w-36 rounded-full text-sm bg-[#D94F0B] text-white">
            {row.original.status}
          </p>
        ),
      },
    ],
  };

  const agreementColumns = [
    {
      accessorKey: "agreementId",
      header: "Agreement ID",
    },
    {
      accessorKey: "assetName",
      header: "Asset Name",
    },
    {
      accessorKey: "projectType",
      header: "Project Type",
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
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: PortfolioRow } }) => (
        <span
          className={clsx(
            "px-3 py-1 rounded-full text-sm text-white",
            row.original.status === "On Track"
              ? "bg-[#52886C]"
              : row.original.status === "Delayed"
                ? "bg-[#174954]"
                : "bg-[#D94F0B]"
          )}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Hero Section - Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Portfolio Value - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-gradient-to-br from-eco-leaf/10 via-white to-eco-forest/5 dark:from-eco-forest/20 dark:via-neutral-900/80 dark:to-eco-leaf/10 border-eco-leaf/30 dark:border-eco-forest/30">
            <div className="space-y-6">
              {/* Label with icon */}
              <div className="flex items-center gap-2">
                <IoStatsChartOutline className="w-5 h-5 text-eco-forest dark:text-eco-leaf" />
                <span className="typography-label text-eco-forest dark:text-eco-leaf">
                  Total Portfolio Value
                </span>
              </div>

              {/* Massive number with hero typography */}
              <div className="typography-hero-number text-eco-forest dark:text-eco-leaf">
                {formatCurrency(142500)}
              </div>

              {/* Change indicator */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 typography-percentage text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/20 px-3 py-1.5 rounded-lg">
                    <IoArrowUpOutline className="w-5 h-5" aria-hidden="true" />
                    <span className="font-bold">+{formatCurrency(8500)}</span>
                    <span className="font-bold">(+6.3%)</span>
                    <span className="sr-only">Increase of {formatCurrency(8500)} or 6.3%</span>
                  </div>
                  <span className="typography-label text-neutral-600 dark:text-neutral-400">
                    YTD
                  </span>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-eco-leaf/20 dark:border-eco-forest/30">
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    Total Credits
                  </div>
                  <div className="typography-body-number text-neutral-900 dark:text-white text-lg font-bold">
                    12,450 MT
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    Active Positions
                  </div>
                  <div className="typography-body-number text-neutral-900 dark:text-white text-lg font-bold">
                    {portfolioData.openPositions.data.length}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="typography-label text-neutral-600 dark:text-neutral-400">
                    Avg. Cost Basis
                  </div>
                  <div className="typography-body-number text-neutral-900 dark:text-white text-lg font-bold">
                    $11.44/MT
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-3">
          {/* Primary Action */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="h-20 justify-start pl-6 text-left group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                <IoTrendingUpOutline className="w-5 h-5 flex-shrink-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-80 font-medium uppercase tracking-wide">
                  Primary Action
                </span>
                <span className="text-base font-bold">Trade Credits</span>
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
              <IoStatsChartOutline className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Quick Action</span>
                <span className="text-base font-semibold">View Analytics</span>
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
              <FaLeaf className="w-5 h-5 flex-shrink-0 opacity-70" />
              <div className="flex flex-col">
                <span className="text-xs opacity-70 font-medium">Impact</span>
                <span className="text-base font-semibold">Carbon Report</span>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div>
        <div className="mb-5">
          <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white">
            Portfolio Breakdown
          </Typography>
        </div>

        <MetricCardGrid columns={3}>
          <MetricCard
            label="Open Positions"
            value={formatCurrency(87500)}
            change="+5.2%"
            changeType="positive"
            trend="up"
            subtitle="Active investments"
            icon={<IoWalletOutline className="w-5 h-5" />}
          />

          <MetricCard
            label="Historical Value"
            value={formatCurrency(35000)}
            change="+12.5%"
            changeType="positive"
            trend="up"
            subtitle="Realized trades"
            icon={<FaChartLine className="w-5 h-5" />}
          />

          <MetricCard
            label="Pending Contracts"
            value={formatCurrency(20000)}
            change="-2.1%"
            changeType="negative"
            trend="down"
            subtitle="Awaiting settlement"
            icon={<FaChartPie className="w-5 h-5" />}
          />
        </MetricCardGrid>
      </div>

      {/* Portfolio Section - Tables */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography
              variant="h5"
              className="typography-heading text-neutral-900 dark:text-white"
            >
              Portfolio Details
            </Typography>
            <Button variant="flat-primary" size="sm">
              Export Data
            </Button>
          </div>

          <Table
            columns={tableColumns[activeTab as keyof typeof tableColumns]}
            data={portfolioData[activeTab as keyof typeof portfolioData].data}
            showSearch
            showPageSize
            showDataFilter
            dateField="date"
            defaultPageSize={5}
            prepend={
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as string)}
              />
            }
          />
        </div>
      </Card>

      {/* Active Agreements Section */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography
              variant="h5"
              className="typography-heading text-neutral-900 dark:text-white"
            >
              {activeAgreements.title}
            </Typography>
            <Button variant="flat-primary" size="sm">
              Manage Agreements
            </Button>
          </div>

          <Table
            columns={agreementColumns}
            data={activeAgreements.data}
            showSearch
            showPageSize
            showDataFilter
            dateField="nextDelivery"
            defaultPageSize={5}
          />
        </div>
      </Card>
    </div>
  );
};

export default Portfolio;
