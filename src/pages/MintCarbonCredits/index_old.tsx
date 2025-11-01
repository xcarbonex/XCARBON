import React, { useState } from "react";
import { Typography, Input, SelectField, Stepper, StepperControls, useToast } from "@/components";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTreeFill } from "react-icons/bs";
import { IoCheckmarkCircle, IoCloudUploadOutline } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";
import upload from "@/assets/upload.svg";
import clsx from "clsx";

interface Item {
  title: string;
  subtitle: string;
}

interface ProjectSelection {
  key: string;
  label: string;
  placeholder: string;
  options: string[];
}

const MintCarbonCredits: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Project Selection
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(true); // Mock - project pre-selected
  
  // Step 2: Minting Parameters
  const [vintageYear, setVintageYear] = useState("");
  const [creditsType, setCreditsType] = useState("");
  const [blockchainNetwork, setBlockchainNetwork] = useState("");
  const [quantityToMint, setQuantityToMint] = useState("");
  
  // Step 3: Optional Metadata
  const [metadataFile, setMetadataFile] = useState<File | null>(null);
  
  // Step 4: Confirmation checkboxes
  const [confirmDetails, setConfirmDetails] = useState(false);
  const [confirmLegitimacy, setConfirmLegitimacy] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);
  
  const items: Item[] = [
    { title: "Registry", subtitle: "Verra" },
    { title: "Available Credits", subtitle: "125,000" },
    { title: "Verification Date", subtitle: "March 15 2025" },
  ];

  const vintageYearOptions = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
  const creditsTypeOptions = ["Methane Capture", "Reforestation", "Renewable Energy", "Energy Efficiency"];
  const blockchainOptions = ["Polygon", "Ethereum", "Solana", "Binance Smart Chain"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMetadataFile(file);
    }
  };

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    switch (stepIndex) {
      case 0: {
        // Project Selection
        if (!selectedProject) {
          toast.error("No Project Selected", "Please select a project to continue");
          return false;
        }
        return true;
      }
      case 1: {
        // Minting Parameters
        if (!vintageYear || !creditsType || !blockchainNetwork || !quantityToMint) {
          toast.error("Incomplete Information", "Please fill in all required minting parameters");
          return false;
        }
        const quantity = parseInt(quantityToMint);
        if (isNaN(quantity) || quantity <= 0) {
          toast.error("Invalid Quantity", "Please enter a valid quantity greater than 0");
          return false;
        }
        if (quantity > 125000) {
          toast.error("Insufficient Credits", "Quantity exceeds available credits (125,000)");
          return false;
        }
        return true;
      }
      case 2: {
        // Optional Metadata - always valid since it's optional
        return true;
      }
      case 3: {
        // Review & Confirm - check all confirmations
        if (!confirmDetails || !confirmLegitimacy || !confirmTerms) {
          toast.error("Confirmation Required", "Please confirm all checkboxes to proceed");
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  };

  const handleMintComplete = async () => {
    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(
      "Carbon Credits Minted!",
      "Your carbon credits have been successfully minted to the blockchain."
    );
    // Reset form
    setCurrentStep(0);
    setSearchQuery("");
    setVintageYear("");
    setCreditsType("");
    setBlockchainNetwork("");
    setQuantityToMint("");
    setMetadataFile(null);
    setConfirmDetails(false);
    setConfirmLegitimacy(false);
    setConfirmTerms(false);
  };

  const steps = [
    {
      id: "project",
      label: "Project Selection",
      description: "Choose your carbon credit project",
    },
    {
      id: "parameters",
      label: "Minting Parameters",
      description: "Configure minting details",
    },
    {
      id: "metadata",
      label: "Optional Metadata",
      description: "Upload supporting documents",
    },
    {
      id: "review",
      label: "Review & Mint",
      description: "Confirm and mint credits",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <Typography variant="h4" className="font-medium">
            Mint Carbon Credits
          </Typography>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            Convert your verified carbon credits into blockchain tokens
          </Typography>
        </div>

        {/* Stepper */}
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          validateStep={validateStep}
          orientation="horizontal"
          className="mb-6"
        />

        {/* Step Content */}
        <div className="bg-secondary/30 p-6 rounded-xl border border-secondary/50 min-h-[500px]">
          <div className="space-y-6">
            {/* Step 0: Project Selection */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="mb-4">Select Your Project</Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                    Choose the carbon credit project you want to mint tokens from
                  </Typography>
                </div>

                <div className="space-y-[8px]">
                  <Typography variant="body1">Search Project</Typography>
                  <Input
                    placeholder="Search projects by name or ID..."
                    className="w-full"
                    inputClassName="w-full"
                    variant="md"
                    suffix={<BiSearch className="cursor-pointer" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

          <div className="mt-[24px] bg-[#E2E6E5] dark:bg-[#282828]/65 border dark:border-[#363638] p-5 rounded-xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="subtitle1">Amazon Rainforest Reforestation</Typography>
                <p className="text-[#949494] text-[14px]">Project ID: VCS-2023-4582</p>
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
                htmlFor="uploadFile1"
                className=" text-[#949494]  font-semibold  rounded p-[40px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
              >
                <img src={upload} alt="upload" className="mb-[5px]" />
                <p className="text-center">Drag and drop files here, or click to browse</p>
                <input type="file" id="uploadFile1" className="hidden" />
                <p className="text-[10px] font-medium text-[#949494] mt-2">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>

                <div className="px-5 py-1 bg-[#333438] text-white rounded-md mt-4">Upload</div>
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
                <p className="text-[16px] text-[#949494]">Based on current network conditions</p>
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

export default MintCarbonCredits;
