import React from "react";
import {Typography} from "@/components";
import {List} from "@/components";
import useStore from "@/store/store";
import {IoIosArrowBack} from "react-icons/io";

const bgTags = [
  "bg-[#A6B3B1]",
  "bg-[#4C6663]",
  "bg-[#C2A57B]",
  "bg-[#949494]",
  "bg-[#A6B3B1]",
];

const previewProjectItems = [
  {
    label: "Project Name",
    key: "projectName",
  },
  {
    label: "Location",
    key: "location",
  },
  {
    label: "Impact Tags",
    key: "impactTags",
    render: (item) => {
      try {
        const sdgs = JSON.parse(item.value);
        return (
          <div className="flex justify-between">
            <Typography>{item.label}</Typography>
            <div className="flex flex-wrap gap-2">
              {sdgs?.map((tag, index) => (
                <div
                  key={index}
                  className={`text-[12px] w-fit text-white text-nowrap px-2 py-1 dark:bg-[#949494] rounded-[50px] ${
                    bgTags[index % bgTags.length]
                  }`}
                >
                  {tag.tag}
                </div>
              ))}
            </div>
          </div>
        );
      } catch (error) {
        console.error("Failed to parse impactTags JSON:", error);
        return <Typography>{item.value}</Typography>;
      }
    },
  },
  {
    label: "Project Type",
    key: "type",
  },
  {
    label: "Project Developer",
    key: "project_developer",
  },
];
const previewAssetItems = [
  {
    label: "Vintage Year",
    key: "vintageYear",
  },
  {
    label: "Quantity",
    key: "quantity",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Asset Serial Number",
    key: "serial_number",
  },
  {
    label: "Transferable",
    key: "transferable",
  },
  {
    label: "Verification Body",
    key: "verification_body",
  },
  {
    label: "Token Name",
    key: "tokenSymbol",
  },
  {
    label: "Price",
    key: "listingPrice",
  },
  {
    label: "Listing Duration",
    key: "listingDuration",
  },
  {
    label: "Fraction",
    key: "fraction",
  },
  {
    label: "Files Uploaded",
    key: "files",
  },
];
export default function TokenizationPreview({reviewData}) {
  const {togglePreview} = useStore();
  const onBackToList = () => {
    togglePreview();
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          onClick={onBackToList}
          className="flex items-center gap-2 p-2 text-[#949494] hover:text-[#C2A57B] transition-colors border border-[#363638] rounded-lg hover:border-[#C2A57B]"
        >
          <IoIosArrowBack className="h-4 w-4" />
        </button>
        <Typography variant="h5">Review Tokenization </Typography>
      </div>
      <hr className="mt-2 mb-4" />
      <div className="grid grid-cols-2 gap-3 ">
        <div>
          <div className="bg-secondary h-fit">
            <List
              items={previewProjectItems}
              data={reviewData}
              renderItem={(item) => (
                <div className="flex justify-between items-center">
                  <Typography>{item.label}</Typography>
                  <Typography>{item.value}</Typography>
                </div>
              )}
              header={"Project"}
              bordered={true}
              size="default"
            />
          </div>
          <div className="bg-secondary border p-3 rounded-md mt-4">
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
        <div className="bg-secondary">
          <List
            items={previewAssetItems}
            data={reviewData}
            renderItem={(item) => (
              <div className="flex justify-between items-center">
                <Typography>{item.label}</Typography>
                <Typography>{item.value || "-"}</Typography>
              </div>
            )}
            header={"Asset"}
            bordered={true}
            size="default"
          />
        </div>
      </div>
    </>
  );
}
