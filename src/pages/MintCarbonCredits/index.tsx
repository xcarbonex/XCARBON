import React, { useState } from "react";
import { Typography, Input, SelectField, Stepper, StepperControls, useToast, Card } from "@/components";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaLocationDot, FaLeaf, FaClock } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Premium Header with Stats */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20">
                  <IoSparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <Typography variant="h3" className="font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                    Mint Carbon Credits
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 mt-1">
                    Tokenize your verified carbon credits on the blockchain
                  </Typography>
                </div>
              </div>
            </div>
            
            {/* Live Stats Cards */}
            <div className="flex gap-3">
              <div className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
                  <HiTrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Live Network</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Polygon Active</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <FaShieldAlt className="w-4 h-4" />
                  <span className="text-sm font-semibold">Verified</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Registry Connected</p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={clsx(
                  "relative p-4 rounded-xl border-2 transition-all duration-300",
                  idx === currentStep
                    ? "bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/50 dark:to-accent-950/50 border-brand-500 shadow-lg shadow-brand-500/20"
                    : idx < currentStep
                    ? "bg-success-50 dark:bg-success-950/30 border-success-500"
                    : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                      idx === currentStep
                        ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg"
                        : idx < currentStep
                        ? "bg-success-500 text-white"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                    )}
                  >
                    {idx < currentStep ? <IoCheckmarkCircle className="w-6 h-6" /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={clsx(
                      "text-sm font-semibold truncate",
                      idx === currentStep ? "text-brand-900 dark:text-brand-100" : "text-neutral-700 dark:text-neutral-300"
                    )}>
                      {step.label}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {step.description}
                    </p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={clsx(
                    "absolute top-1/2 -right-2 w-4 h-0.5 -translate-y-1/2",
                    idx < currentStep ? "bg-success-500" : "bg-neutral-300 dark:bg-neutral-600"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Premium Card */}
        <div className="relative">
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl rounded-3xl" />
          
          <div className="relative p-8 border border-neutral-200/50 dark:border-neutral-700/50 rounded-3xl shadow-2xl min-h-[600px]">
            <div className="space-y-8">
            {/* Step 0: Project Selection */}
            {currentStep === 0 && (
              <div className="space-y-8">
                {/* Header with Icon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                    <FaLeaf className="w-6 h-6 text-success-700 dark:text-success-400" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-2">
                      Select Carbon Credit Project
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                      Choose the verified project you want to tokenize. All projects are pre-validated from connected registries.
                    </Typography>
                  </div>
                </div>

                {/* Premium Search Bar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-2xl blur-xl" />
                  <div className="relative">
                    <Typography variant="body2" className="font-semibold mb-3 text-neutral-700 dark:text-neutral-300">
                      Search Projects
                    </Typography>
                    <div className="relative group">
                      <Input
                        placeholder="Search by project name, ID, or registry..."
                        className="w-full"
                        inputClassName="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:border-brand-500 dark:focus:border-brand-400 shadow-lg transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Premium Selected Project Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-brand-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-850 border-2 border-success-200 dark:border-success-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <RiVerifiedBadgeFill className="w-6 h-6 text-success-600 dark:text-success-400" />
                          <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white">
                            {projectInfo.name}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                          <Typography variant="caption" className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                            ID: {projectInfo.id}
                          </Typography>
                        </div>
                      </div>
                      <button className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <RxCross1 className="w-5 h-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                      </button>
                    </div>

                    {/* Premium Tags */}
                    <div className="flex gap-3 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30 border border-info-300 dark:border-info-700">
                        <FaLocationDot className="w-4 h-4 text-info-700 dark:text-info-400" />
                        <span className="text-sm font-semibold text-info-900 dark:text-info-200">{projectInfo.country}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 border border-success-300 dark:border-success-700">
                        <BsFillTreeFill className="w-4 h-4 text-success-700 dark:text-success-400" />
                        <span className="text-sm font-semibold text-success-900 dark:text-success-200">{projectInfo.type}</span>
                      </div>
                    </div>

                    {/* Premium Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/50 dark:to-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                      <div className="text-center">
                        <Typography variant="caption" className="block text-neutral-500 dark:text-neutral-400 mb-1">Registry</Typography>
                        <Typography variant="body2" className="font-bold text-neutral-900 dark:text-white">{projectInfo.registry}</Typography>
                      </div>
                      <div className="text-center border-x border-neutral-200 dark:border-neutral-700">
                        <Typography variant="caption" className="block text-neutral-500 dark:text-neutral-400 mb-1">Available Credits</Typography>
                        <Typography variant="body2" className="font-bold text-success-600 dark:text-success-400">{projectInfo.availableCredits}</Typography>
                      </div>
                      <div className="text-center">
                        <Typography variant="caption" className="block text-neutral-500 dark:text-neutral-400 mb-1">Verified</Typography>
                        <Typography variant="body2" className="font-bold text-neutral-900 dark:text-white">{projectInfo.verificationDate}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Minting Parameters */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Header with Icon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                    <FaShieldAlt className="w-6 h-6 text-brand-700 dark:text-brand-400" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-2">
                      Configure Token Parameters
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                      Set minting details and network preferences. All fields are required for compliance.
                    </Typography>
                  </div>
                </div>

                {/* Premium Form Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="w-4 h-4 text-brand-600" />
                      <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                        Vintage Year *
                      </Typography>
                    </div>
                    <SelectField
                      options={vintageYearOptions}
                      placeholder="Select year"
                      value={vintageYearOptions.find(opt => opt.value === vintageYear)}
                      onChange={(option) => setVintageYear(String(option?.value || ""))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Credits Type *
                    </Typography>
                    <SelectField
                      options={creditsTypeOptions}
                      placeholder="Select type"
                      value={creditsTypeOptions.find(opt => opt.value === creditsType)}
                      onChange={(option) => setCreditsType(String(option?.value || ""))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Blockchain Network *
                    </Typography>
                    <SelectField
                      options={blockchainOptions}
                      placeholder="Select network"
                      value={blockchainOptions.find(opt => opt.value === blockchainNetwork)}
                      onChange={(option) => setBlockchainNetwork(String(option?.value || ""))}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Quantity to Mint *
                    </Typography>
                    <Input
                      placeholder="Enter quantity (1 - 125,000)"
                      type="number"
                      value={quantityToMint}
                      onChange={(e) => setQuantityToMint(e.target.value)}
                      min="1"
                      max="125000"
                      className="text-lg"
                    />
                    <div className="flex items-center justify-between">
                      <Typography variant="caption" className="text-neutral-500">
                        Available: 125,000 credits
                      </Typography>
                      <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                        Use Max
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Gas Fee Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-info-500/10 rounded-2xl blur-xl" />
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/50 dark:to-neutral-800/50 border-2 border-brand-200 dark:border-brand-800 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600">
                          <HiTrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                          Network Fees
                        </Typography>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-success-100 dark:bg-success-900/30 border border-success-300 dark:border-success-700">
                        <span className="text-xs font-bold text-success-700 dark:text-success-400">Optimal</span>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <Typography variant="h5" className="font-bold text-brand-600 dark:text-brand-400">
                        {blockchainNetwork === "polygon" ? "0.0045 MATIC" : 
                         blockchainNetwork === "ethereum" ? "0.015 ETH" :
                         blockchainNetwork === "solana" ? "0.000005 SOL" :
                         blockchainNetwork === "bsc" ? "0.001 BNB" : "—"}
                      </Typography>
                      <Typography variant="caption" className="text-neutral-500">
                        ≈ ${blockchainNetwork === "polygon" ? "0.35" : 
                           blockchainNetwork === "ethereum" ? "24.50" :
                           blockchainNetwork === "solana" ? "0.001" :
                           blockchainNetwork === "bsc" ? "0.25" : "0.00"} USD
                      </Typography>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                      Real-time network conditions
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Optional Metadata */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Header with Icon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
                    <HiDocumentText className="w-6 h-6 text-info-700 dark:text-info-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white">
                        Supporting Documentation
                      </Typography>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        Optional
                      </span>
                    </div>
                    <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                      Upload proof of ownership or transfer documentation to expedite verification.
                    </Typography>
                  </div>
                </div>

                {/* Premium Upload Zone */}
                <div className="relative">
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
                      "relative block group cursor-pointer transition-all duration-300",
                      metadataFile && "scale-[0.98]"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-info-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={clsx(
                      "relative flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed transition-all duration-300",
                      metadataFile
                        ? "border-success-400 dark:border-success-600 bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10"
                        : "border-neutral-300 dark:border-neutral-600 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/30 dark:to-neutral-800/30 hover:border-brand-400 dark:hover:border-brand-600"
                    )}>
                      {metadataFile ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 rounded-2xl bg-success-500 shadow-lg shadow-success-500/30">
                            <IoCheckmarkCircle className="w-12 h-12 text-white" />
                          </div>
                          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-success-200 dark:border-success-800 shadow-lg">
                            <HiDocumentText className="w-6 h-6 text-success-600 dark:text-success-400" />
                            <Typography variant="body1" className="font-semibold text-neutral-900 dark:text-white">
                              {metadataFile.name}
                            </Typography>
                          </div>
                          <Typography variant="body2" className="text-success-700 dark:text-success-400 font-medium">
                            ✓ File uploaded successfully • Click to replace
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 group-hover:from-brand-100 group-hover:to-brand-200 dark:group-hover:from-brand-900/30 dark:group-hover:to-brand-800/30 transition-all">
                            <IoCloudUploadOutline className="w-12 h-12 text-neutral-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                          </div>
                          <div className="text-center">
                            <Typography variant="body1" className="font-semibold mb-2 text-neutral-900 dark:text-white">
                              Drop your files here or{" "}
                              <span className="text-brand-600 dark:text-brand-400">browse</span>
                            </Typography>
                            <Typography variant="body2" className="text-neutral-500 dark:text-neutral-400">
                              PDF, JPG, PNG supported • Maximum 10MB
                            </Typography>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Premium Info Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
                  <div className="flex gap-4">
                    <div className="p-2 rounded-xl bg-info-500 h-fit">
                      <IoSparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-2">
                        Pro Tip: Documentation speeds up verification
                      </Typography>
                      <Typography variant="body2" className="text-info-700 dark:text-info-300">
                        While optional, providing ownership proof or registry transfer documentation can reduce processing time from 48 hours to 6 hours.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Mint */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Premium Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30 mb-2">
                    <IoCheckmarkCircle className="w-8 h-8 text-white" />
                  </div>
                  <Typography variant="h4" className="font-bold text-neutral-900 dark:text-white">
                    Review & Confirm
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Please review your minting details carefully. This transaction is irreversible once confirmed on the blockchain.
                  </Typography>
                </div>

                {/* Executive Summary Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Project Details Card */}
                  <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-850 border-2 border-neutral-200 dark:border-neutral-700 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-success-100 dark:bg-success-900/30">
                        <FaLeaf className="w-5 h-5 text-success-600 dark:text-success-400" />
                      </div>
                      <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                        Project Details
                      </Typography>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <Typography variant="caption" className="text-neutral-500 mb-1 block">Project Name</Typography>
                        <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">{projectInfo.name}</Typography>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <Typography variant="caption" className="text-neutral-500 mb-1 block">Project ID</Typography>
                        <Typography variant="body2" className="font-semibold font-mono text-neutral-900 dark:text-white">{projectInfo.id}</Typography>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <Typography variant="caption" className="text-neutral-500 mb-1 block">Country</Typography>
                        <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">{projectInfo.country}</Typography>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <Typography variant="caption" className="text-neutral-500 mb-1 block">Type</Typography>
                        <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">{projectInfo.type}</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Minting Parameters Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-brand-50/30 dark:from-neutral-800 dark:to-brand-950/20 border-2 border-brand-200 dark:border-brand-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
                        <FaShieldAlt className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                        Minting Config
                      </Typography>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
                        <Typography variant="caption" className="text-neutral-500">Vintage Year</Typography>
                        <Typography variant="body2" className="font-bold text-neutral-900 dark:text-white">{vintageYear}</Typography>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
                        <Typography variant="caption" className="text-neutral-500">Credit Type</Typography>
                        <Typography variant="body2" className="font-bold text-neutral-900 dark:text-white">
                          {creditsTypeOptions.find(opt => opt.value === creditsType)?.label}
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
                        <Typography variant="caption" className="text-neutral-500">Blockchain</Typography>
                        <Typography variant="body2" className="font-bold text-brand-600 dark:text-brand-400">
                          {blockchainOptions.find(opt => opt.value === blockchainNetwork)?.label}
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <Typography variant="caption" className="text-neutral-500">Quantity</Typography>
                        <Typography variant="body2" className="font-bold text-success-600 dark:text-success-400">{quantityToMint} credits</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Costs Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-950/30 dark:to-info-900/20 border-2 border-info-200 dark:border-info-800 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-info-500">
                        <HiTrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                        Transaction Costs
                      </Typography>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Typography variant="caption" className="text-neutral-500 mb-2 block">Estimated Gas Fee</Typography>
                        <div className="flex items-baseline gap-2">
                          <Typography variant="h6" className="font-bold text-info-700 dark:text-info-400">
                            {blockchainNetwork === "polygon" ? "0.0045 MATIC" : 
                             blockchainNetwork === "ethereum" ? "0.015 ETH" :
                             blockchainNetwork === "solana" ? "0.000005 SOL" :
                             blockchainNetwork === "bsc" ? "0.001 BNB" : "—"}
                          </Typography>
                          <Typography variant="caption" className="text-neutral-500">
                            ≈ {blockchainNetwork === "polygon" ? "$0.35" : 
                               blockchainNetwork === "ethereum" ? "$24.50" :
                               blockchainNetwork === "solana" ? "$0.001" :
                               blockchainNetwork === "bsc" ? "$0.25" : "$0.00"}
                          </Typography>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-success-100 dark:bg-success-900/30 border border-success-300 dark:border-success-700">
                        <div className="flex items-center gap-2 text-success-700 dark:text-success-400">
                          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                          <Typography variant="caption" className="font-semibold">Optimal network conditions</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Confirmation Section */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-950/30 dark:to-warning-900/20 border-2 border-warning-200 dark:border-warning-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-warning-500">
                      <FaShieldAlt className="w-5 h-5 text-white" />
                    </div>
                    <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                      Required Confirmations
                    </Typography>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-600 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={confirmDetails}
                        onChange={(e) => setConfirmDetails(e.target.checked)}
                        className="mt-0.5 h-5 w-5 accent-brand-600 border-neutral-300 rounded cursor-pointer"
                      />
                      <span className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        I confirm that all details above are correct and understand that blockchain transactions are <span className="font-bold text-warning-700 dark:text-warning-400">permanent and irreversible</span>.
                      </span>
                    </label>

                    <label className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-600 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={confirmLegitimacy}
                        onChange={(e) => setConfirmLegitimacy(e.target.checked)}
                        className="mt-0.5 h-5 w-5 accent-brand-600 border-neutral-300 rounded cursor-pointer"
                      />
                      <span className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        I have verified that these carbon credits are <span className="font-bold text-success-700 dark:text-success-400">legitimate</span> and have <span className="font-bold text-success-700 dark:text-success-400">not been previously tokenized</span>.
                      </span>
                    </label>

                    <label className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-600 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={confirmTerms}
                        onChange={(e) => setConfirmTerms(e.target.checked)}
                        className="mt-0.5 h-5 w-5 accent-brand-600 border-neutral-300 rounded cursor-pointer"
                      />
                      <span className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        I agree to the <span className="font-bold text-brand-700 dark:text-brand-400">Terms of Service</span> and <span className="font-bold text-brand-700 dark:text-brand-400">Minting Policy</span>.
                      </span>
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
    </div>
  );
};

export default MintCarbonCredits;
