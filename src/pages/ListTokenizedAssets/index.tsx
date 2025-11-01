import React from "react";
import { Input, Typography, Card } from "@/components";
import SelectField from "@/components/Select";
import { Toggle } from "@/components";
import { IoCheckmarkCircle, IoCubeOutline, IoCloudUploadOutline, IoLockClosedOutline } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa";

interface ProjectDetail {
  label: string;
  value: string;
}

const ListTokenizedAssets: React.FC = () => {
  const options = [
    { label: "VCS-123456 - Amazon Rainforest Conservation", value: "VCS-123456" },
    { label: "VCS-213434 - InfoSell", value: "VCS-213434" },
    { label: "VCS-546743 - SHGBMF Consultants", value: "VCS-546743" },
  ];

  const projectDetails: ProjectDetail[] = [
    { label: "Project Type", value: "REDD+" },
    { label: "Vintage", value: "2024" },
    { label: "Available Balance", value: "1,000 tCO2e" },
    { label: "Token ID", value: "VCS-123456" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Premium Header */}
        <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg shadow-success-500/30">
              <IoCloudUploadOutline className="w-6 h-6 text-success-700 dark:text-success-400" />
            </div>
            <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
              List Tokenized Asset
            </Typography>
          </div>
          <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 ml-14">
            Select an eligible tokenized asset from your wallet to list on the marketplace.
          </Typography>
        </Card>

        {/* Premium Asset Selection Card */}
        <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
              <IoCubeOutline className="w-5 h-5 text-info-700 dark:text-info-400" />
            </div>
            <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold">
              Select Tokenized Asset
            </Typography>
          </div>
          <SelectField isClearable options={options} className="w-full" />
        </Card>

        {/* Premium Project Info Card */}
        <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                <FaLeaf className="w-5 h-5 text-success-700 dark:text-success-400" />
              </div>
              <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                Amazon Rainforest Conservation
              </Typography>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 border-2 border-success-300 dark:border-success-700">
              <IoCheckmarkCircle className="w-4 h-4 text-success-700 dark:text-success-400" />
              <span className="text-sm font-bold text-success-700 dark:text-success-400">Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {projectDetails.map((item, index) => (
              <div key={index} className="p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
                <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 block mb-1">
                  {item.label}
                </Typography>
                <Typography variant="body1" className="text-neutral-900 dark:text-white font-bold">
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        {/* Premium Listing Details Card */}
        <Card className="border-2 border-brand-200 dark:border-brand-800 shadow-xl">
          <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold mb-6">
            Listing Details
          </Typography>
          
          <div className="space-y-6">
            {/* Quantity Input */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Quantity to List (tCO2e)
              </Typography>
              <Input
                required
                placeholder="Enter Quantity"
                suffix={<span className="text-neutral-500 dark:text-neutral-400 font-medium">Max: 1000</span>}
                className="h-12"
              />
            </div>

            {/* Listing Method */}
            <div className="space-y-3">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Listing Method
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <div className="p-4 rounded-xl border-2 border-success-200 dark:border-success-800 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-950/20 dark:to-success-900/20 hover:from-success-100 hover:to-success-200 dark:hover:from-success-900/30 dark:hover:to-success-800/30 transition-all">
                    <Input
                      type="radio"
                      name="listingMethod"
                      value="spot"
                      className="sr-only"
                    />
                    <Typography variant="body1" className="text-neutral-900 dark:text-white font-bold text-center">
                      SPOT SALE
                    </Typography>
                  </div>
                </label>
                <label className="relative cursor-not-allowed opacity-60">
                  <div className="p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/20 dark:to-neutral-800/20">
                    <Input
                      type="radio"
                      name="listingMethod"
                      value="auction"
                      disabled
                      className="sr-only"
                    />
                    <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400 font-bold text-center">
                      AUCTION
                    </Typography>
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-warning-600 to-warning-700 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    Coming Soon
                  </span>
                </label>
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Price Per Unit (USD)
              </Typography>
              <Input
                required
                type="number"
                placeholder="12.50"
                prefix="$"
                suffix={<span className="text-info-600 dark:text-info-400 font-medium">Market: $12.50</span>}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-12"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                List Duration (Optional)
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  isClearable
                  options={[
                    { value: "", label: "Select Duration" },
                    { value: 30, label: "30 Days" },
                    { value: 60, label: "60 Days" },
                    { value: 90, label: "90 Days" },
                  ]}
                />
                <input
                  type="date"
                  className="h-12 px-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-brand-500 dark:focus:border-brand-500 outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Premium Transfer Restrictions Card */}
        <Card className="border-2 border-warning-200 dark:border-warning-800 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30">
                <IoLockClosedOutline className="w-5 h-5 text-warning-700 dark:text-warning-400" />
              </div>
              <div>
                <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold mb-1">
                  Apply Transfer Restrictions
                </Typography>
                <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                  Limit who can purchase this asset (KYC verification, jurisdiction, etc.)
                </Typography>
              </div>
            </div>
            <Toggle onToggle={() => {}} />
          </div>
        </Card>

        {/* Premium Actions */}
        <div className="flex justify-end gap-4 pt-2">
          <button className="px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            Cancel
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-lg font-bold shadow-lg shadow-brand-600/40 hover:shadow-brand-600/60 transition-all">
            List Asset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTokenizedAssets;
