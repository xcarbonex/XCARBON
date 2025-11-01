import React, { useState, useEffect } from "react";
import { Typography, Input, SelectField, useToast, Modal, Button } from "@/components";
import { BiSearch } from "react-icons/bi";
import { FaLocationDot, FaLeaf, FaClock } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { BsFillTreeFill } from "react-icons/bs";
import { IoCheckmarkCircle, IoCloudUploadOutline, IoSparkles } from "react-icons/io5";
import { HiDocumentText, HiTrendingUp } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import clsx from "clsx";

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MintingModal Component
 * 
 * 4-step wizard for minting carbon credits to blockchain:
 * 1. Project Selection
 * 2. Minting Parameters
 * 3. Optional Metadata
 * 4. Review & Mint
 * 
 * Design: Premium stepper workflow in modal format
 */
const MintingModal: React.FC<MintingModalProps> = ({ isOpen, onClose }) => {
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
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
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setMetadataFile(selectedFile);
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

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMintComplete = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(
      "Carbon Credits Minted!",
      "Your carbon credits have been successfully minted to the blockchain."
    );
    onClose();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="Mint Carbon Credits"
      description="Tokenize your verified carbon credits on the blockchain"
      className="overflow-visible"
    >
      <div className="space-y-6">
        {/* Premium Progress Stepper */}
        <div className="grid grid-cols-4 gap-3">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={clsx(
                "relative p-3 rounded-xl border-2 transition-all duration-300",
                idx === currentStep
                  ? "bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-950/30 border-brand-500 dark:border-brand-600 shadow-lg shadow-brand-500/20"
                  : idx < currentStep
                  ? "bg-success-50 dark:bg-success-950/20 border-success-300 dark:border-success-800"
                  : "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all",
                    idx === currentStep
                      ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg"
                      : idx < currentStep
                      ? "bg-success-500 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {idx < currentStep ? <IoCheckmarkCircle className="w-5 h-5" /> : idx + 1}
                </div>
              </div>
              <Typography variant="caption" className="font-semibold text-neutral-900 dark:text-white block mb-0.5 text-xs">
                {step.label}
              </Typography>
              <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 text-[10px]">
                {step.description}
              </Typography>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {/* Step 0: Project Selection */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                  <FaLeaf className="w-5 h-5 text-success-700 dark:text-success-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Select Carbon Credit Project
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Choose the verified project you want to tokenize from connected registries.
                  </Typography>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Typography variant="body2" className="font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                    Search Projects
                  </Typography>
                  <div className="relative">
                    <Input
                      placeholder="Search by project name, ID, or registry..."
                      className="w-full pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                {/* Selected Project Card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 border-2 border-success-200 dark:border-success-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <RiVerifiedBadgeFill className="w-5 h-5 text-success-600 dark:text-success-400" />
                        <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white">
                          {projectInfo.name}
                        </Typography>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <HiDocumentText className="w-3.5 h-3.5" />
                          <span>{projectInfo.id}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaLocationDot className="w-3.5 h-3.5" />
                          <span>{projectInfo.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BsFillTreeFill className="w-3.5 h-3.5" />
                          <span>{projectInfo.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white/60 dark:bg-neutral-800/60">
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                        Registry
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {projectInfo.registry}
                      </Typography>
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 dark:bg-neutral-800/60">
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                        Available Credits
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {projectInfo.availableCredits}
                      </Typography>
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 dark:bg-neutral-800/60">
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                        Verified
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {projectInfo.verificationDate}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Minting Parameters */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                  <HiTrendingUp className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Configure Minting Parameters
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Specify the details for your carbon credit tokenization
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Vintage Year *
                  </Typography>
                  <SelectField
                    options={vintageYearOptions}
                    onChange={(option) => setVintageYear(String(option?.value || ""))}
                    placeholder="Select year"
                    value={vintageYearOptions.find((opt) => opt.value === vintageYear)}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Credits Type *
                  </Typography>
                  <SelectField
                    options={creditsTypeOptions}
                    onChange={(option) => setCreditsType(String(option?.value || ""))}
                    placeholder="Select type"
                    value={creditsTypeOptions.find((opt) => opt.value === creditsType)}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Blockchain Network *
                  </Typography>
                  <SelectField
                    options={blockchainOptions}
                    onChange={(option) => setBlockchainNetwork(String(option?.value || ""))}
                    placeholder="Select network"
                    value={blockchainOptions.find((opt) => opt.value === blockchainNetwork)}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Quantity to Mint *
                  </Typography>
                  <Input
                    type="number"
                    value={quantityToMint}
                    onChange={(e) => setQuantityToMint(e.target.value)}
                    placeholder="Enter quantity"
                    min="1"
                    max="125000"
                  />
                  <Typography variant="caption" className="text-neutral-500 text-xs">
                    Max: 125,000 credits available
                  </Typography>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-info-500 h-fit">
                    <FaShieldAlt className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-1 text-sm">
                      Estimated Gas Fee
                    </Typography>
                    <Typography variant="body2" className="text-info-700 dark:text-info-300 text-xs">
                      {blockchainNetwork === "polygon" ? "~0.0045 MATIC" : blockchainNetwork === "ethereum" ? "~0.012 ETH" : "Network fee will be calculated"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Optional Metadata */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30">
                  <IoCloudUploadOutline className="w-5 h-5 text-accent-700 dark:text-accent-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Optional Metadata (Recommended)
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Upload additional documents to enhance trust and transparency
                  </Typography>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <div
                    className={clsx(
                      "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                      metadataFile
                        ? "border-success-400 bg-success-50 dark:bg-success-950/20"
                        : "border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 hover:border-brand-400 hover:bg-brand-50/50 dark:hover:bg-brand-950/20"
                    )}
                  >
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png,.json" />
                    <IoCloudUploadOutline className={clsx("w-12 h-12 mx-auto mb-3", metadataFile ? "text-success-500" : "text-neutral-400")} />
                    {metadataFile ? (
                      <div>
                        <Typography variant="body1" className="font-semibold text-success-700 dark:text-success-400 mb-1">
                          {metadataFile.name}
                        </Typography>
                        <Typography variant="caption" className="text-success-600 dark:text-success-500">
                          File uploaded successfully
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="body1" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                          Click to upload or drag and drop
                        </Typography>
                        <Typography variant="caption" className="text-neutral-500">
                          PDF, JPG, PNG, or JSON (max. 10MB)
                        </Typography>
                      </div>
                    )}
                  </div>
                </label>

                <div className="p-4 rounded-xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border border-warning-200 dark:border-warning-800">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-warning-500 h-fit">
                      <IoSparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-warning-900 dark:text-warning-200 mb-1 text-sm">
                        Enhanced Transparency
                      </Typography>
                      <Typography variant="body2" className="text-warning-700 dark:text-warning-300 text-xs">
                        Adding metadata increases buyer confidence and can improve marketability
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Mint */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                  <IoCheckmarkCircle className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Review & Confirm Minting
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Please verify all information before minting to blockchain
                  </Typography>
                </div>
              </div>

              <div className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-2 text-xs block">
                      Project Details
                    </Typography>
                    <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {projectInfo.name}
                    </Typography>
                    <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 text-xs font-mono">
                      {projectInfo.id}
                    </Typography>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-2 text-xs block">
                      Minting Configuration
                    </Typography>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400">Vintage:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">{vintageYear}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400">Type:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {creditsTypeOptions.find((opt) => opt.value === creditsType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400">Network:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {blockchainOptions.find((opt) => opt.value === blockchainNetwork)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400">Quantity:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">{quantityToMint} credits</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkboxes */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 space-y-3">
                  <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white mb-3">
                    Required Confirmations
                  </Typography>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={confirmDetails}
                      onChange={(e) => setConfirmDetails(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      I confirm that the above details are correct and understand that minting will be permanent and irreversible.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={confirmLegitimacy}
                      onChange={(e) => setConfirmLegitimacy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      I have verified that the carbon credits are legitimate and have not been previously tokenized.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={confirmTerms}
                      onChange={(e) => setConfirmTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      I agree to the <span className="font-semibold">Terms of Service</span> and <span className="font-semibold">Minting Policy</span>.
                    </span>
                  </label>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/10 border border-brand-200 dark:border-brand-800">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-brand-500 h-fit">
                      <FaClock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-brand-900 dark:text-brand-200 mb-1 text-sm">
                        Processing Time
                      </Typography>
                      <Typography variant="body2" className="text-brand-700 dark:text-brand-300 text-xs">
                        Minting typically completes within 2-5 minutes depending on network congestion
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <Button variant="flat-secondary" size="md" onClick={currentStep === 0 ? onClose : handleBack}>
            {currentStep === 0 ? "Cancel" : "Back"}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={currentStep === steps.length - 1 ? handleMintComplete : handleNext}
            className="shadow-lg"
          >
            {currentStep === steps.length - 1 ? "Mint to Blockchain" : "Continue"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MintingModal;
