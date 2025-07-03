import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@/components";
import Input from "@/components/Input";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTreeFill } from "react-icons/bs";
import { SelectField } from "@/components";
import upload from "@/assets/upload.svg";

const index = () => {
  const items = [
    { title: "Registry", subtitle: "Verra" },
    { title: "Available Credits", subtitle: "125,000" },
    { title: "Verification Date", subtitle: "March 15 2025" },
  ];

  const projectSelections = [
    {
      key: "vintageYear",
      label: "Vintage Year",
      placeholder: "2002",
      options: ["2017", "2018", "2019", "2020", "2021", "2022"],
    },
    {
      key: "creditsType",
      label: "Credits Type",
      placeholder: "Methane Capture",
      options: [
        "Methane Capture",
        "Reforestation",
        "Renewable Energy",
        "Energy Efficiency",
      ],
    },
    {
      key: "blockChainNetwork",
      label: "Blockchain Network",
      placeholder: "Solana",
      options: ["Solana", "Ethereum", "Polygon", "Binance Smart Chain"],
    },
  ];

  return (
    <>
      <div>
        <div className="space-y-6 text-black dark:text-[#FFFFFF]/80 ">
          <Typography
            variant="h4"
            className="border-b-2 border-[#363638] pb-[8px]"
          >
            Mint Carbon Credits
          </Typography>

          <Typography variant="subtitle1">Project Selection</Typography>

          <div className="space-y-[8px]">
            <Typography variant="body1">Select Project</Typography>
            <Input
              placeholder="Search projects by name or ID..."
              className="w-full"
              inputClassName="w-full"
              variant="md"
              suffix={<BiSearch className="cursor-pointer" />}
            />
          </div>

          <div className="mt-[24px] bg-[#E2E6E5] dark:bg-[#282828]/65 border dark:border-[#363638] p-5 rounded-xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="subtitle1">
                  Amazon Rainforest Reforestation
                </Typography>
                <p className="text-[#949494] text-[14px]">
                  Project ID: VCS-2023-4582
                </p>
              </div>
              <div>
                <RxCross1 className="cursor-pointer" />
              </div>
            </div>

            <div className="mt-[14px] flex gap-x-4 items-center">
              <div className="w-fit px-5 py-1 rounded-2xl flex gap-x-1 items-center text-white bg-[#949494]">
                <div>
                  <FaLocationDot />
                </div>

                <div>Brazil</div>
              </div>
              <div className="w-fit px-5 py-1 rounded-2xl flex gap-x-1 items-center text-white bg-[#949494]">
                <div>
                  <BsFillTreeFill />
                </div>

                <div>REDD+</div>
              </div>
            </div>

            <div className="mt-[44px]">
              <div className="w-[90%] grid gap-5 sm:gap-0 sm:flex items-center justify-between">
                {items.map((item, index) => (
                  <div key={index} className="">
                    <h2 className="text-[16px] text-[#949494]">{item.title}</h2>
                    <p>{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border dark:border-[#363638] p-5 rounded-lg shadow-xl">
            <Typography variant="subtitle1">Project Selection</Typography>
            <div className="mt-5 grid grid-cols-2 gap-5">
              {projectSelections.map((field) => (
                <div key={field.key} className="">
                  <Typography variant="body2" className="pb-3">
                    {field.label}
                  </Typography>
                  <SelectField
                    options={field.options.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              ))}
              <div className="">
                <Typography variant="body2" className="pb-3">
                  Quantity to Mint
                </Typography>
                <Input placeholder="10000" type="number" />
              </div>
            </div>
          </div>

          <div className="border dark:border-[#363638] p-5 rounded-md shadow-xl">
            <div>
              <Typography variant="subtitle1">Optional Metadata</Typography>
              <p className="text-[14px] text-[#949494]">
                Proof of ownership or registry transfer intent
              </p>
            </div>

            <div className="mt-[15px] p-5 bg-[#FFFFFF]/5 rounded-md dark:border dark:border-[#363638]">
              <label
                for="uploadFile1"
                class=" text-[#949494]  font-semibold  rounded p-[40px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
              >
                <img src={upload} alt="upload" className="mb-[5px]" />
                <p className="text-center">
                  Drag and drop files here, or click to browse
                </p>
                <input type="file" id="uploadFile1" class="hidden" />
                <p class="text-[10px] font-medium text-[#949494] mt-2">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>

                <div className="px-5 py-1 bg-[#333438] text-white rounded-md mt-4">
                  Upload
                </div>
              </label>
            </div>
          </div>

          <div>
            <div className="bg-[#E2E6E5] dark:bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 dark:border-[#363638] p-8 rounded-md shadow-xl ">
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-semibold">Estimated Gas Fee</p>
                <p className="text-[20px] font-semibold">0.0045 MATIC</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-[#949494]">
                  Based on current network conditions
                </p>
                <p className="text-[16px] text-[#949494]">0.0045 MATIC</p>
              </div>
            </div>

            <div className="mt-10 flex flex-row-reverse gap-x-5">
              <div>
                <button className="py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg cursor-pointer">
                  <Link to="/MintCarbonCreditsSummary">Continue To Review</Link>
                </button>
              </div>
              <div>
                <button className="py-2 px-3 border text-white dark:bg-transparent bg-[#4C6663] dark:border-[#363638] rounded-lg cursor-pointer">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
