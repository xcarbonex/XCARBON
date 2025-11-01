import React, { useState } from "react";
import { Typography, Input, SelectField, Stepper, StepperControls, useToast, Card } from "@/components";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaLocationDot, FaLeaf, FaShieldAlt, FaClock } from "react-icons/fa6";
import { BsFillTreeFill } from "react-icons/bs";
import { IoCheckmarkCircle, IoCloudUploadOutline, IoSparkles } from "react-icons/io5";
import { HiDocumentText, HiTrendingUp } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import clsx from "clsx";

const MintCarbonCredits: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Project Selection
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject] = useState(true); // Mock - project pre-selected
  
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
  
  // Project info (mock data)
  const projectInfo = {
    name: "Amazon Rainforest Reforestation",
    id: "VCS-2023-4582",
    country: "Brazil",
    type: "REDD+",
    registry: "Verra",
    availableCredits: "125,000",
    verificationDate: "March 15 2025",
  };

  const vintageYearOptions = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"].map((year) => ({
    label: year,
    value: year,
  }));
  
  const creditsTypeOptions = [
    { label: "Methane Capture", value: "methane" },
    { label: "Reforestation", value: "reforestation" },
    { label: "Renewable Energy", value: "renewable" },
    { label: "Energy Efficiency", value: "efficiency" },
  ];
  
  const blockchainOptions = [
    { label: "Polygon", value: "polygon" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Solana", value: "solana" },
    { label: "Binance Smart Chain", value: "bsc" },
  ];

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

                <div className="space-y-2">
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

                {/* Selected Project Card */}
                <div className="bg-white dark:bg-[#282828]/65 border border-gray-200 dark:border-[#363638] p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Typography variant="subtitle1" className="text-gray-900 dark:text-white">
                        {projectInfo.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        Project ID: {projectInfo.id}
                      </Typography>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <RxCross1 className="cursor-pointer" />
                    </button>
                  </div>

                  <div className="flex gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-500 text-white text-sm">
                      <FaLocationDot />
                      <span>{projectInfo.country}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-500 text-white text-sm">
                      <BsFillTreeFill />
                      <span>{projectInfo.type}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Typography variant="caption" className="text-gray-500">Registry</Typography>
                      <Typography variant="body2" className="font-medium">{projectInfo.registry}</Typography>
                    </div>
                    <div>
                      <Typography variant="caption" className="text-gray-500">Available Credits</Typography>
                      <Typography variant="body2" className="font-medium">{projectInfo.availableCredits}</Typography>
                    </div>
                    <div>
                      <Typography variant="caption" className="text-gray-500">Verification Date</Typography>
                      <Typography variant="body2" className="font-medium">{projectInfo.verificationDate}</Typography>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Minting Parameters */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="mb-4">Minting Parameters</Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                    Configure the details for your carbon credit tokens
                  </Typography>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Typography variant="body2" className="mb-2">Vintage Year *</Typography>
                    <SelectField
                      options={vintageYearOptions}
                      placeholder="Select year"
                      value={vintageYearOptions.find(opt => opt.value === vintageYear)}
                      onChange={(option) => setVintageYear(String(option?.value || ""))}
                    />
                  </div>

                  <div>
                    <Typography variant="body2" className="mb-2">Credits Type *</Typography>
                    <SelectField
                      options={creditsTypeOptions}
                      placeholder="Select type"
                      value={creditsTypeOptions.find(opt => opt.value === creditsType)}
                      onChange={(option) => setCreditsType(String(option?.value || ""))}
                    />
                  </div>

                  <div>
                    <Typography variant="body2" className="mb-2">Blockchain Network *</Typography>
                    <SelectField
                      options={blockchainOptions}
                      placeholder="Select network"
                      value={blockchainOptions.find(opt => opt.value === blockchainNetwork)}
                      onChange={(option) => setBlockchainNetwork(String(option?.value || ""))}
                    />
                  </div>

                  <div>
                    <Typography variant="body2" className="mb-2">Quantity to Mint *</Typography>
                    <Input
                      placeholder="Enter quantity"
                      type="number"
                      value={quantityToMint}
                      onChange={(e) => setQuantityToMint(e.target.value)}
                      min="1"
                      max="125000"
                    />
                    <Typography variant="caption" className="text-gray-500 mt-1 block">
                      Maximum: 125,000 credits
                    </Typography>
                  </div>
                </div>

                {/* Estimated Gas Fee */}
                <div className="mt-6 bg-gray-50 dark:bg-[#FFFFFF]/5 border border-gray-200 dark:border-[#363638] p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Typography variant="subtitle1">Estimated Gas Fee</Typography>
                    <Typography variant="subtitle1" className="font-bold">
                      {blockchainNetwork === "polygon" ? "0.0045 MATIC" : 
                       blockchainNetwork === "ethereum" ? "0.015 ETH" :
                       blockchainNetwork === "solana" ? "0.000005 SOL" :
                       blockchainNetwork === "bsc" ? "0.001 BNB" : "—"}
                    </Typography>
                  </div>
                  <Typography variant="caption" className="text-gray-500">
                    Based on current network conditions
                  </Typography>
                </div>
              </div>
            )}

            {/* Step 2: Optional Metadata */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="mb-4">Optional Metadata</Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                    Upload additional documentation (proof of ownership or registry transfer intent)
                  </Typography>
                </div>

                <div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="metadata-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="metadata-upload"
                    className={clsx(
                      "flex flex-col items-center justify-center w-full p-12",
                      "border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200",
                      metadataFile
                        ? "border-green-500/50 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-tertiary/50"
                    )}
                  >
                    {metadataFile ? (
                      <div className="flex flex-col items-center gap-3">
                        <IoCheckmarkCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                          <HiDocumentText className="w-6 h-6" />
                          <Typography variant="body1" className="font-medium">{metadataFile.name}</Typography>
                        </div>
                        <Typography variant="caption" className="text-green-600 dark:text-green-400">
                          File uploaded successfully • Click to change
                        </Typography>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <IoCloudUploadOutline className="w-16 h-16 text-gray-400" />
                        <div className="text-center">
                          <Typography variant="body1" className="font-medium mb-1">
                            Drag and drop files here, or{" "}
                            <span className="text-tertiary">click to browse</span>
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            Supported formats: PDF, JPG, PNG (Max 10MB)
                          </Typography>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Typography variant="subtitle2" className="text-blue-700 dark:text-blue-300 mb-2">
                    Note: This step is optional
                  </Typography>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    You can proceed without uploading documents, but providing proof of ownership may expedite verification.
                  </Typography>
                </div>
              </div>
            )}

            {/* Step 3: Review & Mint */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="mb-4">Review & Mint</Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                    Review your information and confirm to mint carbon credits
                  </Typography>
                </div>

                {/* Review Sections */}
                <div className="space-y-4">
                  {/* Project Details */}
                  <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Typography variant="subtitle2" className="mb-3">Project Details</Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Typography variant="caption" className="text-gray-500">Project Name</Typography>
                        <Typography variant="body2" className="font-medium">{projectInfo.name}</Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Project ID</Typography>
                        <Typography variant="body2" className="font-medium font-mono">{projectInfo.id}</Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Country</Typography>
                        <Typography variant="body2" className="font-medium">{projectInfo.country}</Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Type</Typography>
                        <Typography variant="body2" className="font-medium">{projectInfo.type}</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Minting Parameters */}
                  <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Typography variant="subtitle2" className="mb-3">Minting Parameters</Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Typography variant="caption" className="text-gray-500">Vintage Year</Typography>
                        <Typography variant="body2" className="font-medium">{vintageYear}</Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Credit Type</Typography>
                        <Typography variant="body2" className="font-medium">
                          {creditsTypeOptions.find(opt => opt.value === creditsType)?.label}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Blockchain</Typography>
                        <Typography variant="body2" className="font-medium">
                          {blockchainOptions.find(opt => opt.value === blockchainNetwork)?.label}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-500">Quantity</Typography>
                        <Typography variant="body2" className="font-medium">{quantityToMint} credits</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Costs */}
                  <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Typography variant="subtitle2" className="mb-3">Transaction Costs</Typography>
                    <div className="flex justify-between items-center">
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                        Estimated Gas Fee
                      </Typography>
                      <Typography variant="body1" className="font-bold">
                        {blockchainNetwork === "polygon" ? "0.0045 MATIC (~$0.01)" : 
                         blockchainNetwork === "ethereum" ? "0.015 ETH (~$45)" :
                         blockchainNetwork === "solana" ? "0.000005 SOL (~$0.001)" :
                         blockchainNetwork === "bsc" ? "0.001 BNB (~$0.60)" : "—"}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkboxes */}
                <div className="p-5 border border-gray-200 dark:border-[#363638] rounded-xl space-y-3">
                  <Typography variant="subtitle1">Confirmation</Typography>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={confirmDetails}
                      onChange={(e) => setConfirmDetails(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-brand-600 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      I confirm that the above details are correct and understand that minting will be permanent and irreversible.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={confirmLegitimacy}
                      onChange={(e) => setConfirmLegitimacy(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-brand-600 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      I have verified that the carbon credits are legitimate and have not been previously tokenized.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={confirmTerms}
                      onChange={(e) => setConfirmTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-brand-600 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the <strong>Terms of Service</strong> and <strong>Minting Policy</strong>.
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Controls */}
          <div className="mt-8">
            <StepperControls
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={async () => {
                const isValid = await validateStep(currentStep);
                if (isValid && currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              onPrevious={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                }
              }}
              onComplete={handleMintComplete}
              labels={{
                previous: "Back",
                next: "Continue",
                complete: "Mint Carbon Credits"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintCarbonCredits;
