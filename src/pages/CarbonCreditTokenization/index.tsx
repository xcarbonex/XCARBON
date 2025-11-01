import React, { useState } from "react";
import { Typography, Input, SelectField, Stepper, StepperControls, useToast } from "@/components";
import { IoCloudUploadOutline, IoCheckmarkCircle } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";
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
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-1">
          <Typography variant="h4" className="font-medium">
            Tokenize Carbon Credits
          </Typography>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            Convert your registry carbon credits into XCB tokens. Please ensure you have the
            required documentation ready.
          </Typography>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section with Stepper */}
          <div className="lg:col-span-2 space-y-6">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              validateStep={validateStep}
              orientation="horizontal"
              className="mb-6"
            />
            
            <div className="bg-secondary/30 p-6 rounded-xl border border-secondary/50 min-h-[400px]">
              <div className="space-y-6">
                {/* Step 0: Registry Selection */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <Typography variant="h6" className="mb-4">Registry Information</Typography>
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                        Select the carbon credit registry and provide your project ID
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="subtitle2" className="mb-1.5">
                        Carbon Credit Registry *
                      </Typography>
                      <SelectField
                        options={registryOptions}
                        onChange={(option) => setSelectedRegistry(String(option?.value || ""))}
                        placeholder="Select registry"
                        className="w-full"
                        value={registryOptions.find(opt => opt.value === selectedRegistry)}
                      />
                    </div>

                    <div>
                      <Typography variant="subtitle2" className="mb-1.5">
                        Project ID *
                      </Typography>
                      <Input
                        type="text"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="Enter project ID from registry (e.g., VCS-2023-4582)"
                      />
                      <Typography variant="caption" className="text-gray-500 mt-1 block">
                        This ID can be found on your registry certificate
                      </Typography>
                    </div>
                  </div>
                )}

                {/* Step 1: Credit Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Typography variant="h6" className="mb-4">Credit Information</Typography>
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                        Specify the amount of credits and vintage year
                      </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Typography variant="subtitle2" className="mb-1.5">
                          Credit Amount *
                        </Typography>
                        <Input
                          type="number"
                          value={creditAmount}
                          onChange={(e) => setCreditAmount(e.target.value)}
                          placeholder="Enter amount"
                          min="1"
                        />
                        <Typography variant="caption" className="text-gray-500 mt-1 block">
                          Number of credits to tokenize
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2" className="mb-1.5">
                          Vintage Year *
                        </Typography>
                        <Input
                          type="number"
                          value={vintage}
                          onChange={(e) => setVintage(e.target.value)}
                          placeholder="YYYY"
                          min="2000"
                          max={new Date().getFullYear()}
                        />
                        <Typography variant="caption" className="text-gray-500 mt-1 block">
                          Year the emissions were reduced
                        </Typography>
                      </div>
                    </div>

                    {/* Summary Card */}
                    {creditAmount && vintage && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Typography variant="subtitle2" className="text-blue-700 dark:text-blue-300 mb-2">
                          Summary
                        </Typography>
                        <div className="space-y-1">
                          <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                            {creditAmount} credits from {vintage} vintage year
                          </Typography>
                          <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                            Registry: {registryOptions.find(opt => opt.value === selectedRegistry)?.label}
                          </Typography>
                          <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                            Project: {projectId}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Documentation */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Typography variant="h6" className="mb-4">Verification Documents</Typography>
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                        Upload proof of ownership or registry transfer documents
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="subtitle2" className="mb-1.5">
                        Required Documents *
                      </Typography>
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
                            "flex flex-col items-center justify-center w-full",
                            "p-8 border-2 border-dashed rounded-lg cursor-pointer",
                            "transition-colors duration-200",
                            file
                              ? "border-green-500/50 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-300 dark:border-gray-600 hover:border-tertiary/50"
                          )}
                        >
                          {file ? (
                            <div className="flex flex-col items-center gap-3">
                              <IoCheckmarkCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                <HiDocumentText className="w-6 h-6" />
                                <Typography variant="body1" className="font-medium">{file.name}</Typography>
                              </div>
                              <Typography variant="caption" className="text-green-600 dark:text-green-400">
                                File uploaded successfully • Click to change
                              </Typography>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <IoCloudUploadOutline className="w-12 h-12 text-gray-400" />
                              <div className="text-center">
                                <Typography variant="body1" className="font-medium mb-1">
                                  Drop your verification documents here or{" "}
                                  <span className="text-tertiary">browse</span>
                                </Typography>
                                <Typography variant="caption" className="text-gray-500">
                                  Supports PDF, DOC, DOCX (max 10MB)
                                </Typography>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <Typography variant="subtitle2" className="text-yellow-700 dark:text-yellow-300 mb-2">
                        Document Requirements
                      </Typography>
                      <ul className="list-disc list-inside space-y-1">
                        <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                          Registry certificate or retirement document
                        </li>
                        <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                          Clear and legible scans only
                        </li>
                        <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                          Ensure project ID matches the one entered
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Typography variant="h6" className="mb-4">Review Your Information</Typography>
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-6">
                        Please verify all details before submitting for tokenization
                      </Typography>
                    </div>

                    {/* Review Cards */}
                    <div className="space-y-4">
                      {/* Registry Info */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Typography variant="subtitle2" className="mb-3 text-gray-700 dark:text-gray-300">
                          Registry Information
                        </Typography>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                              Registry:
                            </Typography>
                            <Typography variant="body2" className="font-medium">
                              {registryOptions.find(opt => opt.value === selectedRegistry)?.label}
                            </Typography>
                          </div>
                          <div className="flex justify-between">
                            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                              Project ID:
                            </Typography>
                            <Typography variant="body2" className="font-medium font-mono">
                              {projectId}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      {/* Credit Details */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Typography variant="subtitle2" className="mb-3 text-gray-700 dark:text-gray-300">
                          Credit Details
                        </Typography>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                              Amount:
                            </Typography>
                            <Typography variant="body2" className="font-medium">
                              {creditAmount} credits
                            </Typography>
                          </div>
                          <div className="flex justify-between">
                            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                              Vintage Year:
                            </Typography>
                            <Typography variant="body2" className="font-medium">
                              {vintage}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      {/* Documentation */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Typography variant="subtitle2" className="mb-3 text-gray-700 dark:text-gray-300">
                          Documentation
                        </Typography>
                        <div className="flex items-center gap-2">
                          <HiDocumentText className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <Typography variant="body2" className="font-medium">
                            {file?.name}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Important Notice */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Typography variant="subtitle2" className="text-blue-700 dark:text-blue-300 mb-2">
                        What happens next?
                      </Typography>
                      <ol className="list-decimal list-inside space-y-1">
                        <li className="text-blue-600 dark:text-blue-400 text-sm">
                          Your request will be submitted for verification
                        </li>
                        <li className="text-blue-600 dark:text-blue-400 text-sm">
                          Our team will review your documents (2-3 business days)
                        </li>
                        <li className="text-blue-600 dark:text-blue-400 text-sm">
                          Upon approval, credits will be converted to XCB tokens
                        </li>
                        <li className="text-blue-600 dark:text-blue-400 text-sm">
                          Tokens will be transferred to your connected wallet
                        </li>
                      </ol>
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
