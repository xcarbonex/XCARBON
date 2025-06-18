import React, { useState } from "react";
import { marketplace } from "@/appData";
import { newsESG, newsMajorTrades, newsRegulatory } from "@/appData";
import { IoIosSearch } from "react-icons/io";
import { Input as SearchInput } from "../../../src/components/index";
import { IoMdCalendar } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { CiTimer } from "react-icons/ci";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {Table} from "@/components"
import { useNavigate } from "react-router-dom";
import BuyCarbonCreditModal from "@/components/Modals/BuyCarbonCreditModal";

const MarketPlaceAssets = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState("ESG");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);

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

  const handleBuyClick = (rowData) => {
    setSelectedCredit(rowData);
    setIsBuyModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "assetName",
      header: "Asset Name", 
      enableSorting: false,
      cell: ({row}) => {
        return (
          <div className="whitespace-nowrap dark:text-white">
            <div>{row.original.assetName}</div>
            <div>{row.original.date}</div>
          </div>
        );
      }
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
      enableSorting: false
    },
    {
      accessorKey: "registry",
      header: "Registry",
      enableSorting: false  
    },
    {
      accessorKey: "price",
      header: "Price", 
    },
    {
      accessorKey: "availableVolume",
      header: "Available Volume",
      enableSorting: false 
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      enableSorting: false, 
    },
    {
      accessorKey: "vintage",
      header: "Vintage", 
      enableSorting: false 
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "action",
      header: "Action", 
      enableSorting: false,
      cell: ({row}) => {
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
      } 
    },
  ];

  return (
    <>
      <div className="transition-all duration-slow">
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          {/* Row 1 */}

          <div className="grid  gap-5">
            <div className="grid shadow-xl p-4 border rounded-custom">
              <Table
                columns={columns}
                data={marketplace}
                showSearch
                showPageSize
                showDataFilter
                onRowClick={(data)=>navigate(`project-detail/${data.assetName}`)}
                title="Marketplace Instruments"
                // className="bg-[#FDFDFB] text-white shadow-xl dark:bg-[#191919] p-5 border dark:border-[#363638] rounded-custom"
              />
            </div>

            <div className="grid bg-[#FDFDFB] text-white shadow-xl dark:bg-[#191919] p-5 border dark:border-[#363638] rounded-custom">
              <div className="grid sm:flex border-b-2 dark:border-[#333438] justify-between items-center pb-[10px]">
                <div>
                  <h1 className="text-[24px] text-black dark:text-white pb-[10px]">
                    Live News
                  </h1>
                </div>

                <div>
                  <div className="flex gap-5 text-[13px] text-white">
                    <div className="flex gap-5 text-[13px] text-white">
                      {["ESG", "Major Trades", "Regulatory"].map((category, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveCategory(category)}
                          className="px-3 py-1 bg-[#C2A57B] rounded-md text-[13px] transition-all duration-slow hover:bg-black dark:bg-black dark:hover:bg-[#949494]"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* News Section */}
              <div className="grid gap-5 my-5">
                <div className="grid">
                  {/* News rendering */}
                  <div className="grid sm:grid-cols-2 gap-5 my-5">
                    {news.map((item) => (
                      <div
                        key={item.id}
                        className="dark:bg-[#282828] bg-[#A6B3B1] text-[#4C6663] dark:text-[#949494] p-3 rounded-xl"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3">
                            <CiTimer className="h-5 w-5" />
                            <span className="text-[13px]">
                              {item.timeLabel}
                            </span>
                          </div>

                          <div>
                            <div className="px-3 py-1 bg-[#C2A57B] text-white text-[13px] rounded-md transition-all duration-slow dark:bg-black">
                              {item.tag}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h1 className="text-[16px] dark:text-white text-[#4C6663] font-bold">
                            {item.title}
                          </h1>
                          <p className="text-[13px]">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BuyCarbonCreditModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        creditData={selectedCredit}
      />
    </>
  );
};

export default MarketPlaceAssets;
