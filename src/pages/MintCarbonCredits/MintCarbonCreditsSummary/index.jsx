import React from "react";
import { Typography } from "@/components";
import { Breadcrumb } from "@/components";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MintCarbonCreditsSummary = () => {
  const projectDetails = [
    {
      label: "Project Name",
      value: "Amazon Rainforest Reforestation",
    },
    {
      label: "Project ID",
      value: "VCS-2023-4582",
    },
    {
      label: "Country",
      value: "Brazil",
    },
    {
      label: "Methodology",
      value: "REDD+",
    },
  ];

  const batchDetails = [
    {
      label: "Vintage Year",
      value: "2022",
    },
    {
      label: "Credits To Mint",
      value: "10000",
    },
    {
      label: "Credit Type",
      value: "Reforestation",
    },
    {
      label: "Blockchain",
      value: "Polygon",
    },
  ];

  const breadcrumbItems = [
    { label: "MintCarbonCredits", path: "/MintCarbonCredits" },
    { label: "Mint Summary", path: "/" },
  ];

  const showAlert = () => {
    alert("Your Carbon Credits have been minted");
  };
  return (
    <>
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          <Typography
            variant="h4"
            className="border-b-2 border-[#363638] pb-[8px]"
          >
            Mint Summary
          </Typography>
          <Typography variant="h5">Review & Mint Carbon Credits</Typography>
          <p className="text-[14px] text-[#949494]">
            Confirm details before minting to blockchain
          </p>

          {/* Row 1 */}

          <div className="border dark:border-[#363638] rounded-xl p-5 shadow-xl">
            <div className="grid grid-cols-2 gap-5 border-b-2  border-[#363638] pb-5">
              {/* Project Details */}
              <div>
                <Typography variant="h5">Project Details</Typography>

                <div className="mt-5">
                  {projectDetails.map((item, index) => (
                    <div
                      key={index}
                      className="flex mt-2 items-center justify-between"
                    >
                      <div className="text-[16px]">{item.label}</div>
                      <div className="text-[16px]">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/*Batch Details */}
                <div>
                  <Typography variant="h5">Batch Details</Typography>

                  <div className="mt-5">
                    {batchDetails.map((item, index) => (
                      <div
                        key={index}
                        className="flex mt-2 items-center justify-between"
                      >
                        <div className="text-[16px]">{item.label}</div>
                        <div className="text-[16px]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Typography variant="h5">Transaction Costs</Typography>

              <div className="mt-5 bg-[#E2E6E5] dark:bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 dark:border-[#363638] p-8 rounded-md ">
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
            </div>
          </div>

          <div className="border dark:border-[#363638] rounded-xl p-5 shadow-xl  col-span-2 space-y-2">
            <p className=" text-[20px]">Confirmation</p>
            <div>
              <input
                type="checkbox"
                name="UBO"
                className="h-4 w-4 accent-tbase  border-gray-300 rounded"
              />
              <label className="ml-3 text-[14px] text-[#8996A9]  ">
                I confirm that the above details are correct and understand that
                minting will be permanent and irreversible.
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="UBO"
                className="h-4 w-4 accent-tbase border-gray-300 rounded"
              />
              <label className="ml-3 text-[14px] text-[#8996A9]  ">
                I have verified that the carbon credits are legitimate and have
                not been previously tokenized.
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="UBO"
                className="h-4 w-4 accent-tbase border-gray-300 rounded"
              />
              <label className="ml-3 text-[14px] text-[#8996A9]  ">
                I agree to the <b>Terms of Service</b> and <b>Minting Policy</b>
                .
              </label>
            </div>
          </div>

          <div className="mt-10 flex justify-between gap-x-5">
            <div>
              <div className=" py-2 px-3 border text-black dark:text-white  bg-transparent dark:border-[#363638] rounded-lg cursor-pointer">
                <Link
                  to="/MintCarbonCredits"
                  className="flex gap-x-1 items-center"
                >
                  <FaArrowLeft /> <p>Back To Details</p>
                </Link>
              </div>
            </div>
            <div className="flex gap-x-5 justify-between">
              <div className="py-2 px-3 border text-white dark:bg-transparent bg-[#4C6663] dark:border-[#363638] rounded-lg cursor-pointer">
                Save as Draft
              </div>

              <div
                onClick={showAlert}
                className="py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg cursor-pointer"
              >
                Mint Carbon Credits
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintCarbonCreditsSummary;
