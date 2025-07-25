import React from "react";
import { HiOutlineExclamationCircle, HiOutlineRefresh } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

const NoDataFound = ({ onRetry, searchCriteria }) => {
  return (
    <div className="dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-8 mt-2">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <HiOutlineExclamationCircle className="h-16 w-16 text-[#949494] dark:text-white/40" />
            <div className="absolute -top-1 -right-1 bg-[#C2A57B] rounded-full p-1">
              <IoIosSearch className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-[24px] font-medium text-black dark:text-white mb-3">
          No Data Available
        </h2>

        <p className="text-[16px] text-[#949494] dark:text-white/60 mb-6 max-w-md mx-auto">
          We couldn't find any carbon credit records matching your search
          criteria in the selected registry.
        </p>

        {/* Search Criteria Summary */}
        {searchCriteria && (
          <div className="bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#363638] rounded-lg p-4 mb-6 max-w-md mx-auto">
            <h3 className="text-[14px] font-medium text-black dark:text-white mb-2">
              Search Criteria:
            </h3>
            <div className="text-[12px] text-[#666666] dark:text-white/70 space-y-1">
              <div>
                <span className="font-medium">Registry:</span>{" "}
                {searchCriteria.registry}
              </div>
              <div>
                <span className="font-medium">Reference Type:</span>{" "}
                {searchCriteria.assetReferenceType}
              </div>
              <div>
                <span className="font-medium">Reference:</span>{" "}
                {searchCriteria.reference}
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="mb-8">
          <h3 className="text-[16px] font-medium text-black dark:text-white mb-4">
            Try the following:
          </h3>
          <div className="text-left max-w-lg mx-auto space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#C2A57B] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[14px] text-[#666666] dark:text-white/70">
                Double-check your reference number for any typos
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#C2A57B] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[14px] text-[#666666] dark:text-white/70">
                Try searching with a different reference type (Serial Number,
                Project ID, or Registry URL)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#C2A57B] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[14px] text-[#666666] dark:text-white/70">
                Select a different registry if the asset might be registered
                elsewhere
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#C2A57B] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[14px] text-[#666666] dark:text-white/70">
                Ensure the carbon credit is publicly available and not retired
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E0E0E0] dark:border-[#363638]">
          <p className="text-[12px] text-[#949494] dark:text-white/40">
            Need help? Contact support or check the registry's official website
            for more information about your carbon credit asset.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
