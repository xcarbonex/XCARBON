import React, { useState } from "react";
import { Typography, Input, SelectField, Stepper, StepperControls, useToast, Card } from "@/components";
import { IoCloudUploadOutline, IoCheckmarkCircle, IoSparkles } from "react-icons/io5";
import { HiDocumentText, HiTrendingUp } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaLeaf, FaClock } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import clsx from "clsx";

const CarbonCreditTokenization: React.FC = () => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
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

  const handleSubmit = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      "Tokenization Submitted!",
      "Your request has been submitted for review. You'll be notified once verification is complete."
    );
    // Reset form
    setCurrentStep(0);
    setSelectedRegistry("");
    setProjectId("");
    setCreditAmount("");
    setVintage("");
    setFile(null);
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Premium Header Section */}
          <div className="space-y-6">
            {/* Title with Icon */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20">
                <IoSparkles className="w-7 h-7 text-white" />
              </div>
              <Typography variant="h3" className="font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                Tokenize Carbon Credits
              </Typography>
            </div>

            {/* Live Stats Cards */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
                  <HiTrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Live Processing</span>
                </div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <RiVerifiedBadgeFill className="w-4 h-4" />
                  <span className="text-sm font-semibold">Registry Verified</span>
                </div>
              </div>
            </div>

            {/* Premium Progress Grid */}
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={clsx(
                    "relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    idx === currentStep
                      ? "bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-950/30 border-brand-500 dark:border-brand-600 shadow-lg shadow-brand-500/20"
                      : idx < currentStep
                      ? "bg-success-50 dark:bg-success-950/20 border-success-300 dark:border-success-800"
                      : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                  )}
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                        idx === currentStep
                          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg"
                          : idx < currentStep
                          ? "bg-success-500 text-white"
                          : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                      )}
                    >
                      {idx < currentStep ? (
                        <IoCheckmarkCircle className="w-6 h-6" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                  </div>
                  <div>
                    <Typography variant="caption" className="font-semibold text-neutral-900 dark:text-white block mb-1">
                      {step.label}
                    </Typography>
                    <Typography variant="caption" className="text-neutral-500 dark:text-neutral-400 text-xs">
                      {step.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Glass-Morphism Content Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl rounded-3xl" />
            
            <div className="relative p-8 border border-neutral-200/50 dark:border-neutral-700/50 rounded-3xl shadow-2xl min-h-[600px]">
              <div className="space-y-8">
                {/* Step 0: Registry Selection */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                        <RiVerifiedBadgeFill className="w-6 h-6 text-success-700 dark:text-success-400" />
                      </div>
                      <div className="flex-1">
                        <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-2">
                          Registry Information
                        </Typography>
                        <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                          Select your verified carbon credit registry and provide the project identification number.
                        </Typography>
                      </div>
                    </div>
                    
                    {/* Premium Form Fields */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                          Carbon Credit Registry *
                        </Typography>
                        <SelectField
                          options={registryOptions}
                          onChange={(option) => setSelectedRegistry(String(option?.value || ""))}
                          placeholder="Select verified registry"
                          className="w-full"
                          value={registryOptions.find(opt => opt.value === selectedRegistry)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                          Project ID *
                        </Typography>
                        <Input
                          type="text"
                          value={projectId}
                          onChange={(e) => setProjectId(e.target.value)}
                          placeholder="Enter project ID (e.g., VCS-2023-4582)"
                          className="text-lg font-mono"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <HiDocumentText className="w-4 h-4 text-info-600" />
                          <Typography variant="caption" className="text-neutral-500">
                            Find this ID on your registry certificate or verification document
                          </Typography>
                        </div>
                      </div>

                      {/* Info Card */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
                        <div className="flex gap-4">
                          <div className="p-2 rounded-xl bg-info-500 h-fit">
                            <IoSparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-2">
                              Registry Verification
                            </Typography>
                            <Typography variant="body2" className="text-info-700 dark:text-info-300">
                              We'll verify your project with the selected registry to ensure authenticity before tokenization.
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Credit Details */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                        <HiDocumentText className="w-6 h-6 text-brand-700 dark:text-brand-400" />
                      </div>
                      <div className="flex-1">
                        <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-2">
                          Credit Information
                        </Typography>
                        <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                          Specify the amount of credits and vintage year for tokenization
                        </Typography>
                      </div>
                    </div>

                    {/* Premium Form Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                          Credit Amount *
                        </Typography>
                        <Input
                          type="number"
                          value={creditAmount}
                          onChange={(e) => setCreditAmount(e.target.value)}
                          placeholder="Enter amount"
                          min="1"
                          className="text-lg"
                        />
                        <div className="flex items-center justify-between">
                          <Typography variant="caption" className="text-neutral-500">
                            Number of credits to tokenize
                          </Typography>
                          <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                            Use Available
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Typography variant="body2" className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                          Vintage Year *
                        </Typography>
                        <Input
                          type="number"
                          value={vintage}
                          onChange={(e) => setVintage(e.target.value)}
                          placeholder="YYYY"
                          min="2000"
                          max={new Date().getFullYear()}
                          className="text-lg"
                        />
                        <Typography variant="caption" className="text-neutral-500">
                          Year the emissions were reduced
                        </Typography>
                      </div>
                    </div>

                    {/* Premium Summary Card */}
                    {creditAmount && vintage && (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10 border-2 border-success-200 dark:border-success-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-success-500">
                              <IoCheckmarkCircle className="w-5 h-5 text-white" />
                            </div>
                            <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                              Tokenization Summary
                            </Typography>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-800">
                              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                                Credits to Tokenize
                              </Typography>
                              <Typography variant="body1" className="font-bold text-success-600 dark:text-success-400">
                                {creditAmount} tCO₂e
                              </Typography>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-800">
                              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                                Vintage Year
                              </Typography>
                              <Typography variant="body1" className="font-bold text-neutral-900 dark:text-white">
                                {vintage}
                              </Typography>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-800">
                              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                                Registry
                              </Typography>
                              <Typography variant="body1" className="font-bold text-neutral-900 dark:text-white">
                                {registryOptions.find(opt => opt.value === selectedRegistry)?.label}
                              </Typography>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-800">
                              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                                Project ID
                              </Typography>
                              <Typography variant="body2" className="font-bold font-mono text-neutral-900 dark:text-white">
                                {projectId}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Documentation */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
                        <IoCloudUploadOutline className="w-6 h-6 text-info-700 dark:text-info-400" />
                      </div>
                      <div className="flex-1">
                        <Typography variant="h5" className="font-bold text-neutral-900 dark:text-white mb-2">
                          Verification Documents
                        </Typography>
                        <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                          Upload proof of ownership or registry transfer documentation
                        </Typography>
                      </div>
                    </div>

                    {/* Premium Upload Zone */}
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="file-upload"
                        className={clsx(
                          "relative block group cursor-pointer transition-all duration-300",
                          file && "scale-[0.98]"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-info-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={clsx(
                          "relative flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed transition-all duration-300",
                          file
                            ? "border-success-400 dark:border-success-600 bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/10"
                            : "border-neutral-300 dark:border-neutral-600 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/30 dark:to-neutral-800/30 hover:border-brand-400 dark:hover:border-brand-600"
                        )}>
                          {file ? (
                            <div className="flex flex-col items-center gap-4">
                              <div className="p-4 rounded-2xl bg-success-500 shadow-lg shadow-success-500/30">
                                <IoCheckmarkCircle className="w-12 h-12 text-white" />
                              </div>
                              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-success-200 dark:border-success-800 shadow-lg">
                                <HiDocumentText className="w-6 h-6 text-success-600 dark:text-success-400" />
                                <Typography variant="body1" className="font-semibold text-neutral-900 dark:text-white">
                                  {file.name}
                                </Typography>
                              </div>
                              <Typography variant="body2" className="text-success-700 dark:text-success-400 font-medium">
                                ✓ Document uploaded successfully • Click to replace
                              </Typography>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-4">
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 group-hover:from-brand-100 group-hover:to-brand-200 dark:group-hover:from-brand-900/30 dark:group-hover:to-brand-800/30 transition-all">
                                <IoCloudUploadOutline className="w-12 h-12 text-neutral-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                              </div>
                              <div className="text-center">
                                <Typography variant="body1" className="font-semibold mb-2 text-neutral-900 dark:text-white">
                                  Drop your verification documents here or{" "}
                                  <span className="text-brand-600 dark:text-brand-400">browse</span>
                                </Typography>
                                <Typography variant="body2" className="text-neutral-500 dark:text-neutral-400">
                                  PDF, DOC, DOCX supported • Maximum 10MB
                                </Typography>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Premium Requirements Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border border-warning-200 dark:border-warning-800">
                      <div className="flex gap-4">
                        <div className="p-2 rounded-xl bg-warning-500 h-fit">
                          <IoSparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Typography variant="subtitle2" className="font-bold text-warning-900 dark:text-warning-200 mb-3">
                            Document Requirements
                          </Typography>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <IoCheckmarkCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
                              <Typography variant="body2" className="text-warning-700 dark:text-warning-300">
                                Registry certificate or retirement document
                              </Typography>
                            </li>
                            <li className="flex items-start gap-2">
                              <IoCheckmarkCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
                              <Typography variant="body2" className="text-warning-700 dark:text-warning-300">
                                Clear and legible scans only (minimum 300 DPI)
                              </Typography>
                            </li>
                            <li className="flex items-start gap-2">
                              <IoCheckmarkCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
                              <Typography variant="body2" className="text-warning-700 dark:text-warning-300">
                                Ensure project ID matches the one entered in Step 0
                              </Typography>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
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
                        Please verify all details before submitting for tokenization. This process is irreversible once approved.
                      </Typography>
                    </div>

                    {/* Executive Summary Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Registry Info Card */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-850 border-2 border-neutral-200 dark:border-neutral-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
                            <FaLeaf className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                          </div>
                          <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                            Registry Information
                          </Typography>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                            <Typography variant="caption" className="text-neutral-500 mb-1 block">Registry</Typography>
                            <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                              {registryOptions.find(opt => opt.value === selectedRegistry)?.label}
                            </Typography>
                          </div>
                          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                            <Typography variant="caption" className="text-neutral-500 mb-1 block">Project ID</Typography>
                            <Typography variant="body2" className="font-semibold font-mono text-neutral-900 dark:text-white">
                              {projectId}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      {/* Credit Details Card */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-brand-50/30 dark:from-neutral-800 dark:to-brand-950/20 border-2 border-brand-200 dark:border-brand-800 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
                            <HiDocumentText className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                          </div>
                          <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                            Credit Details
                          </Typography>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
                            <Typography variant="caption" className="text-neutral-500">Amount</Typography>
                            <Typography variant="body2" className="font-bold text-success-600 dark:text-success-400">
                              {creditAmount} tCO₂e
                            </Typography>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <Typography variant="caption" className="text-neutral-500">Vintage Year</Typography>
                            <Typography variant="body2" className="font-bold text-neutral-900 dark:text-white">
                              {vintage}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      {/* Documentation Card */}
                      <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-950/30 dark:to-success-900/20 border-2 border-success-200 dark:border-success-800 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-success-500">
                            <IoCheckmarkCircle className="w-5 h-5 text-white" />
                          </div>
                          <Typography variant="subtitle1" className="font-bold text-neutral-900 dark:text-white">
                            Uploaded Documentation
                          </Typography>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-success-200 dark:border-success-800">
                          <HiDocumentText className="w-6 h-6 text-success-600 dark:text-success-400" />
                          <Typography variant="body2" className="font-semibold text-neutral-900 dark:text-white">
                            {file?.name}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Process Timeline Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-info-50 to-info-100/50 dark:from-info-900/20 dark:to-info-800/10 border border-info-200 dark:border-info-800">
                      <div className="flex gap-4">
                        <div className="p-2 rounded-xl bg-info-500 h-fit">
                          <IoSparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Typography variant="subtitle2" className="font-bold text-info-900 dark:text-info-200 mb-3">
                            What Happens Next?
                          </Typography>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-info-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                1
                              </div>
                              <Typography variant="body2" className="text-info-700 dark:text-info-300">
                                Your request will be submitted for verification
                              </Typography>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-info-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                2
                              </div>
                              <Typography variant="body2" className="text-info-700 dark:text-info-300">
                                Our team will review your documents (2-3 business days)
                              </Typography>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-info-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                3
                              </div>
                              <Typography variant="body2" className="text-info-700 dark:text-info-300">
                                Upon approval, credits will be converted to XCB tokens
                              </Typography>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-success-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                4
                              </div>
                              <Typography variant="body2" className="text-info-700 dark:text-info-300">
                                Tokens will be transferred to your connected wallet
                              </Typography>
                            </div>
                          </div>
                        </div>
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
                  onComplete={handleSubmit}
                  labels={{
                    previous: "Back",
                    next: "Continue",
                    complete: "Submit for Tokenization"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <Typography variant="subtitle1" className="text-blue-700 dark:text-blue-300 mb-2">
                Tokenization Process
              </Typography>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    1
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Submit your carbon credit details and verification documents
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    2
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Our team verifies the submitted information
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    3
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Upon approval, credits are converted to XCB tokens
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    4
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Tokens are transferred to your wallet
                  </Typography>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-800">
              <Typography variant="subtitle1" className="text-yellow-700 dark:text-yellow-300 mb-2">
                Important Notes
              </Typography>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Ensure all submitted documents are clear and valid
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Verification process may take 2-3 business days
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Keep your registry credentials handy for verification
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Make sure your wallet is ready to receive XCB tokens
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditTokenization;
