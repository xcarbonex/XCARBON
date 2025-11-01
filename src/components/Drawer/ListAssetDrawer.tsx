import React, { useState, useEffect } from "react";
import { Input, Typography, SelectField, Toggle, Drawer, Button } from "@/components";
import { IoCheckmarkCircle, IoCubeOutline, IoCloudUploadOutline, IoLockClosedOutline } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa";

interface ListAssetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectDetail {
  label: string;
  value: string;
}

/**
 * ListAssetDrawer Component
 * 
 * Side drawer for listing tokenized carbon assets on the marketplace.
 * 
 * Features:
 * - Asset selection from wallet
 * - Project details display
 * - Pricing configuration
 * - Duration settings
 * - Transfer restrictions
 * 
 * Design: Premium drawer with form layout
 */
const ListAssetDrawer: React.FC<ListAssetDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [listingMethod, setListingMethod] = useState("spot");
  const [duration, setDuration] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [applyRestrictions, setApplyRestrictions] = useState(false);

  const assetOptions = [
    { label: "VCS-123456 - Amazon Rainforest Conservation", value: "VCS-123456" },
    { label: "VCS-213434 - InfoSell", value: "VCS-213434" },
    { label: "VCS-546743 - SHGBMF Consultants", value: "VCS-546743" },
  ];

  const durationOptions = [
    { value: "", label: "Select Duration" },
    { value: "30", label: "30 Days" },
    { value: "60", label: "60 Days" },
    { value: "90", label: "90 Days" },
  ];

  const projectDetails: ProjectDetail[] = [
    { label: "Project Type", value: "REDD+" },
    { label: "Vintage", value: "2024" },
    { label: "Available Balance", value: "1,000 tCO2e" },
    { label: "Token ID", value: "VCS-123456" },
  ];

  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedAsset("");
      setQuantity("");
      setPricePerUnit("");
      setListingMethod("spot");
      setDuration("");
      setCustomDate("");
      setApplyRestrictions(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    // Validate and submit listing
    console.log("Listing asset:", {
      selectedAsset,
      quantity,
      pricePerUnit,
      listingMethod,
      duration,
      customDate,
      applyRestrictions,
    });
    onClose();
  };

  const footer = (
    <>
      <Button variant="flat-secondary" size="md" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" size="md" onClick={handleSubmit} className="shadow-lg">
        List Asset
      </Button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      anchor="right"
      title="List Tokenized Asset"
      description="Select an eligible tokenized asset from your wallet to list on the marketplace"
      footer={footer}
    >
      <div className="space-y-6">
        {/* Asset Selection */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border-2 border-info-200 dark:border-info-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-info-500 shadow-lg">
              <IoCubeOutline className="w-5 h-5 text-white" />
            </div>
            <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold">
              Select Tokenized Asset
            </Typography>
          </div>
          <SelectField
            isClearable
            options={assetOptions}
            className="w-full"
            placeholder="Choose from your wallet"
            onChange={(option) => setSelectedAsset(String(option?.value || ""))}
            value={assetOptions.find((opt) => opt.value === selectedAsset)}
          />
        </div>

        {/* Project Info Card (shown when asset is selected) */}
        {selectedAsset && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 border-2 border-success-200 dark:border-success-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-success-500 shadow-lg">
                  <FaLeaf className="w-5 h-5 text-white" />
                </div>
                <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                  Amazon Rainforest Conservation
                </Typography>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-100 dark:bg-success-900/40 border-2 border-success-300 dark:border-success-700">
                <IoCheckmarkCircle className="w-4 h-4 text-success-700 dark:text-success-400" />
                <span className="text-xs font-bold text-success-700 dark:text-success-400">Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {projectDetails.map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/60 dark:bg-neutral-800/60">
                  <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 block mb-1 text-xs">
                    {item.label}
                  </Typography>
                  <Typography variant="body2" className="text-neutral-900 dark:text-white font-bold text-sm">
                    {item.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listing Details */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/10 border-2 border-brand-200 dark:border-brand-800">
          <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold mb-5">
            Listing Details
          </Typography>

          <div className="space-y-5">
            {/* Quantity Input */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Quantity to List (tCO2e) *
              </Typography>
              <Input
                required
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
                suffix={<span className="text-neutral-500 dark:text-neutral-400 font-medium text-xs">Max: 1000</span>}
                min="1"
                max="1000"
              />
            </div>

            {/* Listing Method */}
            <div className="space-y-3">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Listing Method *
              </Typography>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="listingMethod"
                    value="spot"
                    checked={listingMethod === "spot"}
                    onChange={(e) => setListingMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`p-3 rounded-xl border-2 transition-all ${
                      listingMethod === "spot"
                        ? "border-success-400 bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/40 dark:to-success-800/40"
                        : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}
                  >
                    <Typography
                      variant="body2"
                      className={`font-bold text-center ${
                        listingMethod === "spot" ? "text-success-700 dark:text-success-400" : "text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      SPOT SALE
                    </Typography>
                  </div>
                </label>
                <label className="relative cursor-not-allowed opacity-60">
                  <input type="radio" name="listingMethod" value="auction" disabled className="sr-only" />
                  <div className="p-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                    <Typography variant="body2" className="font-bold text-center text-neutral-600 dark:text-neutral-400">
                      AUCTION
                    </Typography>
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-warning-600 to-warning-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg">
                    Soon
                  </span>
                </label>
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                Price Per Unit (USD) *
              </Typography>
              <Input
                required
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="12.50"
                prefix="$"
                suffix={<span className="text-info-600 dark:text-info-400 font-medium text-xs">Market: $12.50</span>}
                step="0.01"
                min="0"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium">
                List Duration (Optional)
              </Typography>
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  isClearable
                  options={durationOptions}
                  onChange={(option) => setDuration(String(option?.value || ""))}
                  value={durationOptions.find((opt) => opt.value === duration)}
                />
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-brand-500 dark:focus:border-brand-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Restrictions */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border-2 border-warning-200 dark:border-warning-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-xl bg-warning-500 shadow-lg flex-shrink-0">
                <IoLockClosedOutline className="w-5 h-5 text-white" />
              </div>
              <div>
                <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold mb-1">
                  Apply Transfer Restrictions
                </Typography>
                <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 text-xs">
                  Limit who can purchase this asset (KYC verification, jurisdiction, etc.)
                </Typography>
              </div>
            </div>
            <Toggle onToggle={(value) => setApplyRestrictions(value)} />
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-info-500 h-fit">
              <IoCloudUploadOutline className="w-4 h-4 text-white" />
            </div>
            <div>
              <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-1 text-sm">
                Marketplace Visibility
              </Typography>
              <Typography variant="body2" className="text-info-700 dark:text-info-300 text-xs">
                Your listing will be visible to all verified buyers on the marketplace within 5 minutes
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ListAssetDrawer;
