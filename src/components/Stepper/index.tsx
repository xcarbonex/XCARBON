import React from "react";
import clsx from "clsx";
import { IoCheckmark } from "react-icons/io5";

export interface Step {
  /**
   * Unique step identifier
   */
  id: string | number;

  /**
   * Step label (main text)
   */
  label: string;

  /**
   * Optional description (secondary text)
   */
  description?: string;

  /**
   * Optional custom icon
   */
  icon?: React.ReactNode;
}

export type StepStatus = "completed" | "active" | "upcoming";

export interface StepperProps {
  /**
   * Array of steps
   */
  steps: Step[];

  /**
   * Current active step index (0-based)
   */
  currentStep: number;

  /**
   * Callback when step changes (navigation)
   */
  onStepChange?: (stepIndex: number) => void;

  /**
   * Linear flow (can't skip steps without validation)
   */
  linear?: boolean;

  /**
   * Validate step before allowing navigation
   */
  validateStep?: (stepIndex: number) => boolean | Promise<boolean>;

  /**
   * Orientation (horizontal or vertical)
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Show step numbers instead of icons
   */
  showNumbers?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Stepper Component
 *
 * Multi-step wizard navigation with:
 * - 3 states: completed (checkmark), active (filled), upcoming (outlined)
 * - Linear validation flow
 * - Horizontal and vertical layouts
 * - Step numbers or custom icons
 * - Keyboard navigation
 * - ARIA attributes for accessibility
 * - Responsive (vertical on mobile)
 *
 * Ideal for multi-step forms, onboarding flows, and checkout processes.
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  linear = true,
  validateStep,
  orientation = "horizontal",
  showNumbers = false,
  className,
}) => {
  const getStepStatus = (stepIndex: number): StepStatus => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "active";
    return "upcoming";
  };

  const handleStepClick = async (stepIndex: number) => {
    if (!onStepChange) return;

    // In linear mode, can only go back or to completed steps
    if (linear && stepIndex > currentStep) {
      // Validate current step before proceeding
      if (validateStep) {
        const isValid = await validateStep(currentStep);
        if (!isValid) return;
      }
    }

    onStepChange(stepIndex);
  };

  const isStepClickable = (stepIndex: number): boolean => {
    if (!onStepChange) return false;
    if (!linear) return true;
    // In linear mode, can only navigate to completed steps or previous step
    return stepIndex <= currentStep;
  };

  const isResponsive = orientation === "horizontal";

  return (
    <nav
      role="navigation"
      aria-label="Progress"
      className={clsx(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-center max-md:flex-col max-md:items-start"
          : "flex-col",
        className
      )}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isClickable = isStepClickable(index);
        const isLastStep = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div
              className={clsx(
                "flex items-center",
                orientation === "vertical" && "flex-col items-start",
                isResponsive && "max-md:w-full"
              )}
            >
              <button
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                aria-current={status === "active" ? "step" : undefined}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                  isClickable
                    ? "cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    : "cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                  isResponsive && "max-md:w-full"
                )}
              >
                {/* Step Icon/Number */}
                <div
                  className={clsx(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    "border-2 transition-all duration-200",
                    status === "completed" &&
                      "bg-brand-600 border-brand-600 text-white",
                    status === "active" &&
                      "bg-brand-600 border-brand-600 text-white",
                    status === "upcoming" &&
                      "border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600"
                  )}
                >
                  {status === "completed" && !showNumbers ? (
                    <IoCheckmark size={24} />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 text-left">
                  <p
                    className={clsx(
                      "font-medium text-sm",
                      status === "active"
                        ? "text-brand-600 dark:text-brand-400"
                        : status === "completed"
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 dark:text-neutral-500"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p
                      className={clsx(
                        "text-xs mt-0.5",
                        status === "upcoming"
                          ? "text-neutral-400 dark:text-neutral-600"
                          : "text-neutral-600 dark:text-neutral-400"
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </button>
            </div>

            {/* Connector Line */}
            {!isLastStep && (
              <div
                className={clsx(
                  "transition-all duration-200",
                  orientation === "horizontal"
                    ? "flex-1 h-0.5 mx-2 max-md:hidden"
                    : "w-0.5 h-8 ml-8 my-1",
                  index < currentStep
                    ? "bg-brand-600"
                    : "bg-neutral-200 dark:bg-neutral-800"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

/**
 * StepperControls Component
 *
 * Navigation buttons for Stepper (Back, Next, Complete).
 * Use this with the Stepper component to create a complete wizard.
 */
export interface StepperControlsProps {
  /**
   * Current step index
   */
  currentStep: number;

  /**
   * Total number of steps
   */
  totalSteps: number;

  /**
   * Callback to go to previous step
   */
  onPrevious: () => void;

  /**
   * Callback to go to next step
   */
  onNext: () => void;

  /**
   * Callback when final step is completed
   */
  onComplete?: () => void;

  /**
   * Disable next/complete button
   */
  isNextDisabled?: boolean;

  /**
   * Loading state (e.g., during validation)
   */
  isLoading?: boolean;

  /**
   * Custom button labels
   */
  labels?: {
    previous?: string;
    next?: string;
    complete?: string;
  };

  /**
   * Custom className
   */
  className?: string;
}

export const StepperControls: React.FC<StepperControlsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  isNextDisabled = false,
  isLoading = false,
  labels = {
    previous: "Back",
    next: "Next",
    complete: "Complete",
  },
  className,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className={clsx(
          "px-6 py-2.5 rounded-lg font-medium transition-all duration-200",
          "border-2 border-neutral-300 dark:border-neutral-700",
          "hover:border-neutral-400 dark:hover:border-neutral-600",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        )}
      >
        {labels.previous}
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled || isLoading}
        className={clsx(
          "px-6 py-2.5 rounded-lg font-medium transition-all duration-200",
          "bg-brand-600 hover:bg-brand-700 text-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
          isLoading && "cursor-wait"
        )}
      >
        {isLoading
          ? "Loading..."
          : isLastStep
          ? labels.complete
          : labels.next}
      </button>
    </div>
  );
};

export default Stepper;
