import React, { useState } from "react";
import clsx from "clsx";
import { Table, Tabs } from "@/components";
import { portfolioData, activeAgreements } from "@/appData/portfolioData";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("openPositions");

  // Convert portfolio data into tabs format
  const tabs = Object.keys(portfolioData).map(key => ({
    id: key,
    label: portfolioData[key].title
  }));

  // Define table columns for each tab
  const tableColumns = {
    openPositions: [
      {
        accessorKey: "assetName",
        header: "Asset Name",
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            <div>{row.original.assetName}</div>
          </div>
        )
      },
      {
        accessorKey: "projectType",
        header: "Project Type"
      },
      {
        accessorKey: "quantity",
        header: "Quantity"
      },
      {
        accessorKey: "marketValue",
        header: "Market Value"
      },
      {
        accessorKey: "costBasis",
        header: "Cost Basis"
      },
      {
        accessorKey: "vintage",
        header: "Vintage"
      },
      {
        accessorKey: "location",
        header: "Location"
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-secondary  text-tbase">
            {row.original.status}
          </span>
        )
      }
    ],
    historicalTrades: [
      {
        accessorKey: "tradeId",
        header: "Trade ID"
      },
      {
        accessorKey: "assetName",
        header: "Asset Name"
      },
      {
        accessorKey: "projectType",
        header: "Project Type"
      },
      {
        accessorKey: "quantity",
        header: "Quantity"
      },
      {
        accessorKey: "tradedValue",
        header: "Traded Value"
      },
      {
        accessorKey: "tradeType",
        header: "Type",
        cell: ({ row }) => (
          <p className={clsx(
            "px-2 py-1 text-center max-w-14 rounded-full text-sm",
            row.original.tradeType === "Buy" ? "bg-green-600" : "bg-red-600",
            "text-white"
          )}>
            {row.original.tradeType}
          </p>
        )
      },
      {
        accessorKey: "date",
        header: "Date"
      },
      {
        accessorKey: "status",
        header: "Status"
      }
    ],
    pendingContracts: [
      {
        accessorKey: "contractId",
        header: "Contract ID"
      },
      {
        accessorKey: "assetName",
        header: "Asset Name"
      },
      {
        accessorKey: "projectType",
        header: "Project Type"
      },
      {
        accessorKey: "quantity",
        header: "Quantity"
      },
      {
        accessorKey: "value",
        header: "Value"
      },
      {
        accessorKey: "dueDate",
        header: "Due Date"
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <p className="px-2 py-1 text-center max-w-36 rounded-full text-sm bg-amber-600 text-white">
            {row.original.status}
          </p>
        )
      }
    ]
  };

  const agreementColumns = [
    {
      accessorKey: "agreementId",
      header: "Agreement ID"
    },
    {
      accessorKey: "assetName",
      header: "Asset Name"
    },
    {
      accessorKey: "projectType",
      header: "Project Type"
    },
    {
      accessorKey: "nextDelivery",
      header: "Next Delivery"
    },
    {
      accessorKey: "totalDeliveries",
      header: "Total Deliveries"
    },
    {
      accessorKey: "quantity",
      header: "Quantity"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={clsx(
          "px-3 py-1 rounded-full text-sm",
          row.original.status === "On Track" ? "bg-green-600" : "bg-amber-600",
          "text-white"
        )}>
          {row.original.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Portfolio Section */}
      <div className="bg-secondary shadow-xl border rounded-custom p-4">
        {/* <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        /> */}

        <div className="grid">
          <Table
            columns={tableColumns[activeTab]}
            data={portfolioData[activeTab].data}
            showSearch
            showPageSize
            showDataFilter
            dateField="date"
            defaultPageSize={5}
            prepend={<Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />}
          />
        </div>
      </div>

      {/* Active Agreements Section */}
      <div className=" grid shadow-xl bg-secondary border rounded-custom p-4 w-full overflow-auto">
        <Table
          columns={agreementColumns}
          data={activeAgreements.data}
          showSearch
          showPageSize
          showDataFilter
          dateField="nextDelivery"
          title={activeAgreements.title}
          defaultPageSize={5}
        />
      </div>
    </div>
  );
};

export default Portfolio;
