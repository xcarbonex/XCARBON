import React from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCube,
} from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

const bgTags = ["bg-[#A6B3B1]", "bg-[#4C6663]", "bg-[#C2A57B]", "bg-[#949494]"];

const CarbonCreditList = ({ carbonCredits, onSelectCredit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2A57B]"></div>
          <span className="ml-3 text-[#949494]">Loading carbon credits...</span>
        </div>
      </div>
    );
  }

  if (!carbonCredits || carbonCredits.length === 0) {
    return (
      <div className="dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
        <div className="text-center py-8">
          <HiOutlineCube className="mx-auto h-12 w-12 text-[#949494] mb-4" />
          <p className="text-[#949494] text-lg">No carbon credits found</p>
          <p className="text-[#949494] text-sm mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
      {/* Header */}
      <div className="border-b-2 border-[#363638] pb-4 mb-4">
        <h1 className="text-[24px] text-black dark:text-white">
          Carbon Credit Assets
        </h1>
        <p className="text-[14px] text-[#949494] dark:text-white/30">
          Found {carbonCredits.length} carbon credit
          {carbonCredits.length !== 1 ? "s" : ""} matching your search
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {carbonCredits.map((credit, index) => (
          <div
            key={index}
            onClick={() => onSelectCredit(credit)}
            className="group cursor-pointer border border-[#363638] rounded-lg p-4 hover:border-[#C2A57B] hover:bg-[#C2A57B]/5 dark:hover:bg-[#C2A57B]/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Project Name and Status */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-medium text-black dark:text-white group-hover:text-[#C2A57B] transition-colors">
                    {credit.projectName || "Unnamed Project"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "px-3 py-1 text-[12px] rounded-full text-white",
                        credit.status === "Active"
                          ? "bg-[#4C6663]"
                          : credit.status === "Retired"
                          ? "bg-[#949494]"
                          : "bg-[#A6B3B1]"
                      )}
                    >
                      {credit.status || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="h-4 w-4 text-[#949494]" />
                    <span className="text-[14px] text-[#949494] dark:text-white/60">
                      {credit.country || "Unknown Location"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineCalendar className="h-4 w-4 text-[#949494]" />
                    <span className="text-[14px] text-[#949494] dark:text-white/60">
                      Vintage: {credit.vintageYear || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineCube className="h-4 w-4 text-[#949494]" />
                    <span className="text-[14px] text-[#949494] dark:text-white/60">
                      Quantity: {credit.quantity || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Project ID */}
                <div className="mb-3">
                  <span className="text-[12px] text-[#949494] dark:text-white/40">
                    Project ID: {credit.projectId || credit.reference || "N/A"}
                  </span>
                </div>

                {/* Description */}
                {credit.description && (
                  <div className="mb-3">
                    <p className="text-[14px] text-[#666666] dark:text-white/70 line-clamp-2">
                      {credit.description}
                    </p>
                  </div>
                )}

                {/* Impact Tags */}
                {credit.impactTags && credit.impactTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {credit.impactTags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={clsx(
                          "text-[10px] px-2 py-1 rounded-full text-white",
                          bgTags[tagIndex % bgTags.length]
                        )}
                      >
                        {tag.tag || tag}
                      </span>
                    ))}
                    {credit.impactTags.length > 3 && (
                      <span className="text-[10px] px-2 py-1 rounded-full bg-[#949494] text-white">
                        +{credit.impactTags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="ml-4">
                <IoIosArrowForward className="h-5 w-5 text-[#949494] group-hover:text-[#C2A57B] transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#363638]">
        <p className="text-[12px] text-[#949494] dark:text-white/40 text-center">
          Click on any carbon credit to view details and proceed with
          tokenization
        </p>
      </div>
    </div>
  );
};

export default CarbonCreditList;
