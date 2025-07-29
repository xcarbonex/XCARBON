import React from "react";
import { Input, Typography, Button } from "@/components";
import { SelectField } from "@/components";
import token from "@/assets/token.svg";
import caution from "@/assets/caution.svg";
import sqrs from "@/assets/4sqrs.svg";
import time from "@/assets/time.svg";
import upload from "@/assets/upload.svg";
import fire from "@/assets/fire.svg";
import reload from "@/assets/reload.svg";
import check from "@/assets/check.svg";
import arrow from "@/assets/arrow.svg";
import { projects, reasonsWithdrawl, projectDetails } from "@/appData";
import { Breadcrumb } from "@/components";
const inputFields = [
  { label: "Organization/Entity Name", placeholder: "Enter Token Symbol" },
  { label: "Registry Account ID", placeholder: "E.g., VCS-ACC-123456" },
];

const tokenStatusList = [
  {
    img: fire,
    title: "Token is Burned",
    description:
      "The digital asset is permanently removed from blockchain circulation",
  },
  {
    img: reload,
    title: "Registry Updated",
    description: "The official registry is notified via API or manual update",
  },
  {
    img: check,
    title: "Status Changed",
    description: "Asset marked as Retired or Transferred on platform",
  },
];
const breadcrumbItems = [
  { label: "Wallet", path: "/wallet" },
  { label: "Withdraw Tokenized Carbon Credit", path: "/" },
];

const WithdrawTokenizedCarbonCredit = () => {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="space-y-6 text-tbase">
        {/* Asset Selection */}
        <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
          <div className="flex items-center gap-4 border-b border-[#363638] pb-4 mb-6">
            <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
              <img src={token} alt="token" className="w-6 h-6" />
            </div>
            <div>
              <Typography variant="h5">Select Tokenized Asset</Typography>
              <Typography
                variant="caption"
              >
                Choose the tokenized carbon credit you wish to withdraw from
                circulation
              </Typography>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="subtitle2">
              Available Tokenized Assets
            </Typography>
            <SelectField options={projects} isClearable />

            <div className="bg-[#E2E6E5] dark:bg-[#363638]/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Typography variant="h6">
                    Rainforest Protection Project
                  </Typography>
                  <Typography variant="caption" className="text-[#949494]">
                    VCS-123456-2022
                  </Typography>
                </div>
                <span className="bg-[#C2A57B] dark:bg-white/80 text-white px-3 py-1 text-xs rounded-full">
                  Listed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {projectDetails.map((detail, index) => (
                  <div key={index} className="mb-4">
                    <Typography variant="caption" className="text-[#949494]">
                      {detail.label}
                    </Typography>
                    <Typography variant="body1">{detail.value}</Typography>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 items-center p-3 border border-[#FFA621] bg-white/[8%] rounded-lg">
                <img src={caution} alt="caution" className="hidden sm:block" />
                <Typography variant="body2">
                  <strong>Notice:</strong> This asset is currently listed for
                  sale. Delisting will cancel the active sale listing.
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Status */}
        <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
          <div className="flex items-center gap-4 border-b border-[#363638] pb-4 mb-6">
            <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
              <img src={sqrs} alt="status" className="w-6 h-6" />
            </div>
            <div>
              <Typography variant="h5">
                Asset Status During Withdrawal
              </Typography>
              <Typography
                variant="caption"
                className="text-[#949494] dark:text-white/30"
              >
                Your asset will be locked during the withdrawal review process
              </Typography>
            </div>
          </div>

          <div className="bg-[#E2E6E5] dark:bg-[#363638]/50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
                <img src={time} alt="time" className="w-6 h-6" />
              </div>
              <Typography variant="h6">
                <strong>Asset Status:</strong> In Escrow
              </Typography>
            </div>

            <Typography variant="body2" className="text-[#949494] mb-4">
              During the withdrawal process, your asset will be placed in escrow
              and cannot be traded or transferred. This ensures the integrity of
              the carbon credit registry update.
            </Typography>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-500 rounded-full">
                <div className="h-full w-1/3 bg-[#949494] rounded-full"></div>
              </div>
              <Typography variant="caption">Pending...</Typography>
            </div>
          </div>
        </section>

        {/* Withdrawal Parameters */}
        <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
          <div className="flex items-center gap-4 border-b border-[#363638] pb-4 mb-6">
            <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
              <img src={token} alt="parameters" className="w-6 h-6" />
            </div>
            <div>
              <Typography variant="h5">Withdrawal Parameters</Typography>
              <Typography
                variant="caption"
                className="text-[#949494] dark:text-white/30"
              >
                Specify the reason and details for withdrawing this asset
              </Typography>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Typography variant="subtitle2" className="mb-2">
                Reasons for Withdrawal
              </Typography>
              <SelectField options={reasonsWithdrawl} isClearable />
            </div>

            <div className="bg-[#E2E6E5] dark:bg-[#363638]/50 rounded-lg p-4">
              <Typography variant="h6" className="mb-4">
                New Owner Information
              </Typography>
              <Typography
                variant="caption"
                className="text-[#949494] block mb-4"
              >
                Required for transferring ownership outside the platform
              </Typography>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputFields.map((field, index) => (
                  <div key={index}>
                    <Typography variant="subtitle2" className="mb-2">
                      {field.label}
                    </Typography>
                    <Input placeholder={field.placeholder} />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Typography variant="subtitle2" className="mb-2">
                  Contact E-mail
                </Typography>
                <Input placeholder="abcdef@gmail.com" type="email" />
              </div>

              <div className="mt-4">
                <Typography variant="subtitle2" className="mb-2">
                  Additional Notes
                </Typography>
                <textarea
                  placeholder="Any specific instructions for the transfer..."
                  className="w-full h-24 px-4 py-2 bg-input border rounded-lg focus:outline-none focus:ring-1 focus:ring-input resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Upload */}
        <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
          <Typography variant="h6" className="mb-2">
            Upload Documentation (Optional)
          </Typography>
          <Typography variant="caption" className="text-[#949494] block mb-4">
            Proof of ownership or registry transfer intent
          </Typography>

          <label className="block w-full p-6 border-2 border-[#363638] border-dashed rounded-lg cursor-pointer hover:bg-[#E2E6E5] dark:hover:bg-[#363638]/30 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <img src={upload} alt="upload" className="w-8 h-8" />
              <Typography
                variant="body2"
                className="text-center text-[#949494]"
              >
                Drag and drop files here, or click to browse
              </Typography>
              <Typography variant="caption" className="text-[#949494]">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </Typography>
            </div>
            <input type="file" className="hidden" />
          </label>
        </section>

        {/* Confirmation */}
        <div className="flex items-start gap-3">
          <input type="checkbox" className="mt-1.5 accent-tbase" />
          <Typography variant="body2">
            I confirm this asset will be permanently removed from circulation
            and this action cannot be reversed.
          </Typography>
        </div>

        {/* What Happens After */}
        <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
          <Typography variant="h6" className="mb-6">
            What happens after withdrawal
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tokenStatusList.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80 shrink-0">
                  <img src={item.img} alt={item.title} className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Typography variant="caption" className="text-[#949494]">
                    {item.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button
            to={-1}
            variant="outline"
            className="flex items-center text-tbase gap-2"
          >
            <img src={arrow} alt="back" className="rotate-180 w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button variant="primary" className="flex items-center gap-2">
              Withdraw Asset
              <img src={arrow} alt="proceed" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTokenizedCarbonCredit;
