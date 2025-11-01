import React, { useState } from "react";
import { marketplace } from "@/appData";
import { newsESG, newsMajorTrades, newsRegulatory } from "@/appData";
import { IoIosSearch } from "react-icons/io";
import { Input as SearchInput } from "../../../src/components/index";
import { IoMdCalendar } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { CiTimer } from "react-icons/ci";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Table } from "@/components";
import { useNavigate } from "react-router-dom";
import BuyCarbonCreditModal from "@/components/Modals/BuyCarbonCreditModal";
import { Typography } from "../../../src/components/index";
import { Breadcrumb } from "../../../src/components/index";

interface MarketplaceAsset {
  assetName: string;
  date?: string;
  projectType: string;
  insuranceYear: string;
  location: string;
  registry: string;
  price: string;
  availableVolume: string;
  supplier: string;
  vintage: string;
  quantity: string;
}

interface BreadcrumbItem {
  label: string;
  path: string;
}

type NewsCategory = "ESG" | "Major Trades" | "Regulatory";

const MarketPlaceAssets: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("ESG");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
  const [selectedCredit, setSelectedCredit] = useState<MarketplaceAsset | null>(null);

  // Get news based on category
  const getNewsByCategory = () => {
    switch (activeCategory) {
      case "Major Trades":
        return newsMajorTrades;
      case "Regulatory":
        return newsRegulatory;
      case "ESG":
      default:
        return newsESG;
    }
  };
  const news = getNewsByCategory();

  const handleBuyClick = (rowData: MarketplaceAsset) => {
    setSelectedCredit(rowData);
    setIsBuyModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "assetName",
      header: "Asset Name",
      enableSorting: false,
      cell: ({ row }: { row: { original: MarketplaceAsset } }) => {
        return (
          <div className="whitespace-nowrap dark:text-white">
            <div>{row.original.assetName}</div>
            <div>{row.original.date}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "projectType",
      header: "Project Type",
    },
    {
      accessorKey: "insuranceYear",
      header: "Insurance Year",
    },
    {
      accessorKey: "location",
      header: "Location",
      enableSorting: false,
    },
    {
      accessorKey: "registry",
      header: "Registry",
      enableSorting: false,
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "availableVolume",
      header: "Available Volume",
      enableSorting: false,
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      enableSorting: false,
    },
    {
      accessorKey: "vintage",
      header: "Vintage",
      enableSorting: false,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "action",
      header: "Action",
      enableSorting: false,
      cell: ({ row }: { row: { original: MarketplaceAsset } }) => {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBuyClick(row.original);
            }}
            className="text-white px-4 py-1 rounded-md bg-[#C2A57B] border dark:border-[#363638] dark:bg-black hover:bg-opacity-90"
          >
            BUY
          </button>
        );
      },
    },
  ];

  const _breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "Marketplace", path: "/marketplace" },
  ];

  return (
    <>
      {/* Premium Background Wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 transition-all duration-slow">
        <div className="space-y-6 text-black dark:text-[#FFFFFF]/80">
          {/* Premium Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30 shadow-lg shadow-info-500/30">
              <IoIosSearch className="w-7 h-7 text-info-700 dark:text-info-400" />
            </div>
            <div>
              <Typography variant="h4" className="typography-heading text-neutral-900 dark:text-white font-bold mb-1">
                Carbon Credit Marketplace
              </Typography>
              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                Browse and purchase verified carbon credits from global projects
              </Typography>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Premium Table Card */}
            <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden backdrop-blur-xl">
              <Table
                columns={columns}
                data={marketplace}
                showSearch
                showPageSize
                showDataFilter
                onRowClick={(data) => navigate(`/project-detail/${data.assetName}`)}
                title="Available Carbon Credits"
                // className="bg-[#FDFDFB] text-white shadow-xl dark:bg-[#191919] p-5 border dark:border-[#363638] rounded-custom"
              />
            </div>

            {/* Premium Live News Card */}
            <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-neutral-200 dark:border-neutral-700 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg">
                    <CiTimer className="w-6 h-6 text-success-700 dark:text-success-400" />
                  </div>
                  <Typography variant="h5" className="typography-heading text-neutral-900 dark:text-white font-bold">
                    Live News
                  </Typography>
                </div>

                <div className="flex gap-3">
                  {(["ESG", "Major Trades", "Regulatory"] as NewsCategory[]).map(
                    (category, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          activeCategory === category
                            ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40"
                            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Premium News Section */}
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                {news.map((item, index) => (
                  <div
                    key={index}
                    className="group relative p-5 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-600 hover:border-info-400 dark:hover:border-info-600 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        <CiTimer className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.timeLabel}</span>
                      </div>

                      <div className="px-3 py-1 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-xs font-bold rounded-lg shadow-md">
                        {item.tag}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold leading-snug">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {item.description}
                      </Typography>
                    </div>

                    {/* Hover effect indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-info-500 to-brand-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCredit && (
        <BuyCarbonCreditModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          creditData={selectedCredit}
        />
      )}
    </>
  );
};

export default MarketPlaceAssets;
