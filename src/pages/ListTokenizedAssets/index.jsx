import React from "react";
import { Input, Typography } from "@/components";
import SelectField from "@/components/Select";
import { Toggle } from "@/components";

const ListTokenizedAssets = () => {
  const options = [
    { label: "VCS-123456 - Amazon Rainforest Conservation", value: "VCS-123456" },
    { label: "VCS-213434 - InfoSell", value: "VCS-213434" },  
    { label: "VCS-546743 - SHGBMF Consultants", value: "VCS-546743" },  
  ];

  const projectDetails = [
    { label: "Project Type", value: "REDD+" },
    { label: "Vintage", value: "2024" },
    { label: "Available Balance", value: "1,000 tCO2e" },
    { label: "Token ID", value: "VCS-123456" },
  ];

  return (
    <div className="bg-secondary p-4">
      <div className="space-y-4 text-black dark:text-[#FFFFFF]/80">
        <Typography variant="caption" className="text-[#4C6663] dark:text-white/30 block mb-4">
          Select an eligible tokenized asset from your wallet to list on the marketplace.
        </Typography>

        {/* Asset Selection */}
        <div className="space-y-2">
          <Typography variant="subtitle2">Select Tokenized Asset</Typography>
          <SelectField
            isClearable
            options={options}
            className="w-full"
          />
        </div>

        {/* Project Info */}
        <div className="dark:bg-[#363638]/50 bg-[#F5F6F6] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Amazon Rainforest Conservation</Typography>
            <span className="bg-[#4C6663] text-white dark:bg-[#949494] px-3 py-1 text-xs rounded-full">
              Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {projectDetails.map((item, index) => (
              <div key={index}>
                <Typography variant="caption" className="text-[#949494] block">
                  {item.label}
                </Typography>
                <Typography variant="body1" className="text-black dark:text-white">
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="space-y-2">
          <Typography variant="subtitle2">Quantity to List (tCO2e)</Typography>
          <Input
            required
            placeholder="Enter Quantity"
            suffix={<span className="text-[#949494]">Max: 1000</span>}
          />
        </div>

        {/* Listing Method */}
        <div className="space-y-2">
          <Typography variant="subtitle2">Listing Method</Typography>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative">
              <Input
                type="radio"
                name="listingMethod"
                value="spot"
                suffix={<span className="text-[#949494]">SPOT</span>}
                className="bg-transparent dark:bg-[#363638]/50 accent-tbase border"
              />
            </label>
            <label className="relative">
              <Input
                type="radio"
                name="listingMethod"
                value="auction"
                disabled
                suffix={<span className="text-[#949494]">AUCTION</span>}
                className="bg-transparent dark:bg-[#363638]/50 accent-tbase border"
              />
              <span className="absolute right-2 top-0 bg-[#4C6663] dark:bg-[#3B3B3B] text-white text-xs px-2 py-1 rounded">
                Coming Soon
              </span>
            </label>
          </div>
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <Typography variant="subtitle2">Price Per Unit (USD)</Typography>
          <Input
            required
            type="number"
            placeholder="12.50"
            prefix="$"
            suffix={<span className="text-[#949494]">Market: $12.50</span>}
            className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Typography variant="subtitle2">List Duration (Optional)</Typography>
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              isClearable
              options={[
                {value: '', label: 'Select'},
                {value: 30, label: '30 Days'},
                {value: 60, label: '60 Days'},
                {value: 90, label: '90 Days'}
              ]}
            />
            <input
              type="date"
              className="h-12 px-3 rounded-lg border-none dark:border bg-[#E2E6E5] dark:border-[#363638] placeholder:text-[#949494] dark:bg-[#363638]/50 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Transfer Restrictions */}
        <div className="dark:bg-[#363638]/50 bg-[#E2E6E5] p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <Typography variant="subtitle2">Apply Transfer Restrictions</Typography>
              <Typography variant="caption" className="text-[#4C6663] dark:text-[#949494]">
                Limit who can purchase this asset
              </Typography>
            </div>
            <Toggle />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="px-4 py-2 border border-black dark:border-[#363638] rounded-lg">
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#C2A57B] dark:bg-[#3B3B3B] text-white rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTokenizedAssets;
