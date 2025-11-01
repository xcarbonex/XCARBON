// @ts-nocheck
import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Stepper, StepperControls } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Multi-step wizard navigation with linear validation flow, keyboard navigation, and responsive design. Perfect for onboarding, checkout, and multi-step forms.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const basicSteps = [
  { id: 1, label: "Account", description: "Create your account" },
  { id: 2, label: "Profile", description: "Set up your profile" },
  { id: 3, label: "Preferences", description: "Choose preferences" },
  { id: 4, label: "Complete", description: "Finish setup" },
];

/**
 * Basic horizontal stepper
 */
export const BasicHorizontal: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="p-6">
      <Stepper
        steps={basicSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
      />
      <div className="mt-8">
        <p className="text-sm text-neutral-600">
          Current step: {currentStep + 1} of {basicSteps.length}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))
            }
            disabled={currentStep === basicSteps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Vertical stepper
 */
export const VerticalStepper: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="p-6 flex gap-8">
      <Stepper
        steps={basicSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="vertical"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">
          Step {currentStep + 1}: {basicSteps[currentStep].label}
        </h3>
        <p className="text-neutral-600 mb-4">
          {basicSteps[currentStep].description}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))
            }
            disabled={currentStep === basicSteps.length - 1}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * With StepperControls component
 */
export const WithControls: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Stepper
        steps={basicSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg min-h-[200px]">
        <h3 className="font-semibold text-lg mb-2">
          {basicSteps[currentStep].label}
        </h3>
        <p className="text-neutral-600">
          {basicSteps[currentStep].description}
        </p>
      </div>

      <StepperControls
        currentStep={currentStep}
        totalSteps={basicSteps.length}
        onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onNext={() =>
          setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))
        }
        onComplete={() => alert("Wizard completed!")}
      />
    </div>
  );
};

/**
 * Linear validation flow
 */
export const LinearValidation: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const validateStep = async (stepIndex: number) => {
    setIsValidating(true);
    // Simulate async validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsValidating(false);
    return true; // Always pass for demo
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Stepper
        steps={basicSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        linear={true}
        validateStep={validateStep}
      />

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg min-h-[200px]">
        <h3 className="font-semibold text-lg mb-2">
          {basicSteps[currentStep].label}
        </h3>
        <p className="text-neutral-600 mb-4">
          This stepper has linear validation. You cannot skip steps.
        </p>
        <p className="text-sm text-brand-600">
          Try clicking on future steps - they won't be clickable until you
          complete the current step.
        </p>
      </div>

      <StepperControls
        currentStep={currentStep}
        totalSteps={basicSteps.length}
        onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onNext={async () => {
          const isValid = await validateStep(currentStep);
          if (isValid) {
            setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1));
          }
        }}
        onComplete={() => alert("All steps completed!")}
        isLoading={isValidating}
      />
    </div>
  );
};

/**
 * Carbon credit tokenization wizard
 */
export const TokenizationWizard: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    assetType: "",
    quantity: "",
    price: "",
  });

  const steps = [
    { id: 1, label: "Select Asset", description: "Choose carbon credits" },
    { id: 2, label: "Set Quantity", description: "Enter number of credits" },
    { id: 3, label: "Set Price", description: "Enter price per credit" },
    { id: 4, label: "Review", description: "Confirm details" },
    { id: 5, label: "Confirm", description: "Complete tokenization" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tokenize Carbon Credits</h2>

      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        linear={true}
      />

      <div className="mt-8 p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        {currentStep === 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Select Asset Type</h3>
            <div className="space-y-3">
              {["Reforestation", "Renewable Energy", "Ocean Conservation"].map(
                (type) => (
                  <label key={type} className="flex items-center gap-3 p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                    <input
                      type="radio"
                      name="assetType"
                      value={type}
                      checked={formData.assetType === type}
                      onChange={(e) =>
                        setFormData({ ...formData, assetType: e.target.value })
                      }
                    />
                    <span>{type}</span>
                  </label>
                )
              )}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Enter Quantity</h3>
            <input
              type="number"
              placeholder="Number of carbon credits"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
            <p className="mt-2 text-sm text-neutral-600">
              Minimum: 100 credits
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Set Price</h3>
            <input
              type="number"
              placeholder="Price per credit (USD)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
            <p className="mt-2 text-sm text-neutral-600">
              Market price: $24.50
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Review Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                <span className="text-neutral-600">Asset Type:</span>
                <span className="font-semibold">
                  {formData.assetType || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                <span className="text-neutral-600">Quantity:</span>
                <span className="font-semibold">
                  {formData.quantity || "0"} credits
                </span>
              </div>
              <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                <span className="text-neutral-600">Price:</span>
                <span className="font-semibold">
                  ${formData.price || "0"} per credit
                </span>
              </div>
              <div className="flex justify-between p-3 bg-brand-50 dark:bg-brand-900/20 rounded">
                <span className="font-semibold">Total Value:</span>
                <span className="font-bold text-brand-600">
                  $
                  {(
                    parseFloat(formData.quantity || "0") *
                    parseFloat(formData.price || "0")
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-semibold text-lg mb-2">
              Tokenization Complete!
            </h3>
            <p className="text-neutral-600">
              Your carbon credits have been successfully tokenized.
            </p>
          </div>
        )}
      </div>

      <StepperControls
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onNext={() =>
          setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
        }
        onComplete={() => alert("Tokenization completed!")}
        isNextDisabled={
          (currentStep === 0 && !formData.assetType) ||
          (currentStep === 1 && !formData.quantity) ||
          (currentStep === 2 && !formData.price)
        }
      />
    </div>
  );
};

/**
 * Non-linear stepper (can jump to any step)
 */
export const NonLinear: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Settings Sections</h2>
      <p className="text-sm text-neutral-600 mb-6">
        Click on any step to jump to that section
      </p>

      <Stepper
        steps={[
          { id: 1, label: "Profile", description: "Personal information" },
          { id: 2, label: "Security", description: "Password & 2FA" },
          { id: 3, label: "Notifications", description: "Email preferences" },
          { id: 4, label: "Billing", description: "Payment methods" },
        ]}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        linear={false}
      />

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <p className="text-neutral-600">
          Non-linear stepper allows jumping to any step directly
        </p>
      </div>
    </div>
  );
};

/**
 * Mobile responsive (vertical below 768px)
 */
export const Responsive: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="p-6">
      <p className="text-sm text-brand-600 mb-4">
        Resize your browser to see the stepper switch from horizontal to
        vertical layout on mobile
      </p>

      <Stepper
        steps={basicSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
      />

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold mb-2">
          {basicSteps[currentStep].label}
        </h3>
        <p className="text-neutral-600">
          {basicSteps[currentStep].description}
        </p>
      </div>

      <StepperControls
        currentStep={currentStep}
        totalSteps={basicSteps.length}
        onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onNext={() =>
          setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))
        }
        onComplete={() => alert("Done!")}
      />
    </div>
  );
};
