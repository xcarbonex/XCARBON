import React, { useState, useEffect } from "react";
import { Typography, Input, SelectField, useToast, Modal, Button } from "@/components";
import { IoCloudUploadOutline, IoCheckmarkCircle, IoSparkles } from "react-icons/io5";
import { HiDocumentText, HiTrendingUp } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaLeaf, FaClock } from "react-icons/fa6";
import clsx from "clsx";

interface TokenizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TokenizationModal Component
 * 
 * 4-step wizard for tokenizing carbon credits:
 * 1. Registry Selection
 * 2. Credit Details
 * 3. Documentation Upload
 * 4. Review & Submit
 * 
 * Design: Premium stepper workflow in modal format
 */
const TokenizationModal: React.FC<TokenizationModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRegistry, setSelectedRegistry] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [creditAmount, setCreditAmount] = useState<string>("");
  const [vintage, setVintage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const registryOptions = [
    { value: "verra", label: "Verra Registry" },
    { value: "goldstandard", label: "Gold Standard" },
    { value: "americancarbonregistry", label: "American Carbon Registry" },
    { value: "climateactionreserve", label: "Climate Action Reserve" },
  ];

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setSelectedRegistry("");
      setProjectId("");
      setCreditAmount("");
      setVintage("");
      setFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    switch (stepIndex) {
      case 0: {
        // Registry Selection
        if (!selectedRegistry || !projectId) {
          toast.error("Incomplete Information", "Please select a registry and enter project ID");
          return false;
        }
        return true;
      }
      case 1: {
        // Credit Details
        if (!creditAmount || !vintage) {
          toast.error("Incomplete Information", "Please enter credit amount and vintage year");
          return false;
        }
        const vintageNum = parseInt(vintage);
        const currentYear = new Date().getFullYear();
        if (vintageNum < 2000 || vintageNum > currentYear) {
          toast.error("Invalid Vintage", `Vintage year must be between 2000 and ${currentYear}`);
          return false;
        }
        return true;
      }
      case 2: {
        // Documentation
        if (!file) {
          toast.error("Missing Document", "Please upload verification documents");
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

  const handleSubmit = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(
      "Tokenization Submitted!",
      "Your request has been submitted for review. You'll be notified once verification is complete."
    );
    onClose();
  };

  const steps = [
    {
      id: "registry",
      label: "Registry Selection",
      description: "Select your carbon credit registry",
    },
    {
      id: "details",
      label: "Credit Details",
      description: "Enter credit amount and vintage",
    },
    {
      id: "documents",
      label: "Documentation",
      description: "Upload verification documents",
    },
    {
      id: "review",
      label: "Review & Submit",
      description: "Confirm your information",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="Tokenize Carbon Credits"
      description="Convert your verified carbon credits into blockchain tokens"
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
          {/* Step 0: Registry Selection */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                  <RiVerifiedBadgeFill className="w-5 h-5 text-success-700 dark:text-success-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Registry Information
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Select your verified carbon credit registry and provide the project ID.
                  </Typography>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Carbon Credit Registry *
                  </Typography>
                  <SelectField
                    options={registryOptions}
                    onChange={(option) => setSelectedRegistry(String(option?.value || ""))}
                    placeholder="Select verified registry"
                    className="w-full"
                    value={registryOptions.find((opt) => opt.value === selectedRegistry)}
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Project ID *
                  </Typography>
                  <Input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="Enter project ID (e.g., VCS-2023-4582)"
                    className="font-mono"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <HiDocumentText className="w-4 h-4 text-info-600" />
                    <Typography variant="caption" className="text-neutral-500 text-xs">
                      Find this ID on your registry certificate
                    </Typography>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-info-500 h-fit">
                      <IoSparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-1 text-sm">
                        Registry Verification
                      </Typography>
                      <Typography variant="body2" className="text-info-700 dark:text-info-300 text-xs">
                        We'll verify your project with the selected registry to ensure authenticity.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Credit Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                  <HiDocumentText className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Credit Information
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Specify the amount of credits and vintage year for tokenization
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Credit Amount *
                  </Typography>
                  <Input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                  />
                  <Typography variant="caption" className="text-neutral-500 text-xs">
                    Number of credits to tokenize
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Vintage Year *
                  </Typography>
                  <Input
                    type="number"
                    value={vintage}
                    onChange={(e) => setVintage(e.target.value)}
                    placeholder="e.g., 2023"
                    min="2000"
                    max={new Date().getFullYear()}
                  />
                  <Typography variant="caption" className="text-neutral-500 text-xs">
                    Year credits were generated
                  </Typography>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 border border-success-200 dark:border-success-800">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-success-500 h-fit">
                    <FaLeaf className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-bold text-success-900 dark:text-success-200 mb-1 text-sm">
                      Environmental Impact
                    </Typography>
                    <Typography variant="body2" className="text-success-700 dark:text-success-300 text-xs">
                      {creditAmount ? `${creditAmount} tonnes of CO₂ equivalent will be tokenized` : "Enter amount to see impact"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documentation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30">
                  <IoCloudUploadOutline className="w-5 h-5 text-accent-700 dark:text-accent-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Verification Documents
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Upload official documents to verify your carbon credit ownership
                  </Typography>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <div
                    className={clsx(
                      "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                      file
                        ? "border-success-400 bg-success-50 dark:bg-success-950/20"
                        : "border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 hover:border-brand-400 hover:bg-brand-50/50 dark:hover:bg-brand-950/20"
                    )}
                  >
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                    <IoCloudUploadOutline className={clsx("w-12 h-12 mx-auto mb-3", file ? "text-success-500" : "text-neutral-400")} />
                    {file ? (
                      <div>
                        <Typography variant="body1" className="font-semibold text-success-700 dark:text-success-400 mb-1">
                          {file.name}
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
                          PDF, JPG or PNG (max. 10MB)
                        </Typography>
                      </div>
                    )}
                  </div>
                </label>

                <div className="p-4 rounded-xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border border-warning-200 dark:border-warning-800">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-warning-500 h-fit">
                      <FaClock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-warning-900 dark:text-warning-200 mb-1 text-sm">
                        Verification Timeline
                      </Typography>
                      <Typography variant="body2" className="text-warning-700 dark:text-warning-300 text-xs">
                        Documents will be reviewed within 24-48 hours by our verification team
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                  <IoCheckmarkCircle className="w-5 h-5 text-brand-700 dark:text-brand-400" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-bold text-neutral-900 dark:text-white mb-1">
                    Review & Confirm
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Please verify all information before submitting
                  </Typography>
                </div>
              </div>

              <div className="space-y-4">
                {/* Summary Card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-1 text-xs">
                        Registry
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                        {registryOptions.find((opt) => opt.value === selectedRegistry)?.label || "N/A"}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-1 text-xs">
                        Project ID
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white font-mono">
                        {projectId}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-1 text-xs">
                        Credit Amount
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                        {creditAmount} tonnes CO₂e
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-1 text-xs">
                        Vintage Year
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                        {vintage}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 mb-1 text-xs">
                        Verification Document
                      </Typography>
                      <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                        {file?.name || "N/A"}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/10 border border-brand-200 dark:border-brand-800">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-brand-500 h-fit">
                      <HiTrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-bold text-brand-900 dark:text-brand-200 mb-1 text-sm">
                        Ready to Tokenize
                      </Typography>
                      <Typography variant="body2" className="text-brand-700 dark:text-brand-300 text-xs">
                        Once verified, your credits will be converted into blockchain tokens within 48 hours
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
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="shadow-lg"
          >
            {currentStep === steps.length - 1 ? "Submit for Review" : "Continue"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TokenizationModal;
