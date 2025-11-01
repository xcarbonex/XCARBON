// @ts-nocheck
import type { Meta, StoryFn } from "@storybook/react-vite";
import { ToastProvider, useToast } from "./ToastProvider";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toast notification system with 4 variants (info, success, warning, error), auto-dismiss, stacking, and action buttons. Includes ToastProvider context and useToast hook.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

/**
 * Basic toast variants
 */
export const AllVariants: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <h2 className="text-xl font-semibold mb-4">Click to show toasts</h2>
      <Button
        variant="border-secondary"
        onClick={() => toast.info("New update available", "Version 2.0 is ready to install")}
      >
        Show Info Toast
      </Button>
      <Button
        variant="primary"
        onClick={() => toast.success("Profile updated", "Your changes have been saved successfully")}
      >
        Show Success Toast
      </Button>
      <Button
        variant="border-secondary"
        onClick={() => toast.warning("Storage almost full", "You have only 5% storage remaining")}
      >
        Show Warning Toast
      </Button>
      <Button
        variant="danger"
        onClick={() => toast.error("Failed to save", "Please check your internet connection and try again")}
      >
        Show Error Toast
      </Button>
    </div>
  );
};

/**
 * Success toast
 */
export const SuccessToast: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        variant="primary"
        onClick={() => toast.success("Transaction completed")}
      >
        Simple Success
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          toast.success(
            "Carbon credits purchased",
            "500 credits added to your portfolio"
          )
        }
      >
        Success with Description
      </Button>
    </div>
  );
};

/**
 * Error toast
 */
export const ErrorToast: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        variant="danger"
        onClick={() => toast.error("Payment failed")}
      >
        Simple Error
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error(
            "Verification failed",
            "Your identity documents could not be verified. Please contact support."
          )
        }
      >
        Error with Description
      </Button>
    </div>
  );
};

/**
 * Warning toast
 */
export const WarningToast: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        variant="border-secondary"
        onClick={() => toast.warning("Session expiring soon")}
      >
        Simple Warning
      </Button>
      <Button
        variant="border-secondary"
        onClick={() =>
          toast.warning(
            "Maintenance scheduled",
            "System will be down for 2 hours on Sunday at 3 AM UTC"
          )
        }
      >
        Warning with Description
      </Button>
    </div>
  );
};

/**
 * Info toast
 */
export const InfoToast: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        variant="border-secondary"
        onClick={() => toast.info("Welcome back!")}
      >
        Simple Info
      </Button>
      <Button
        variant="border-secondary"
        onClick={() =>
          toast.info(
            "New feature available",
            "Try our new carbon footprint calculator in the dashboard"
          )
        }
      >
        Info with Description
      </Button>
    </div>
  );
};

/**
 * Toast with action button
 */
export const WithAction: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        variant="primary"
        onClick={() =>
          toast.success("Profile updated", "Your changes have been saved", {
            action: {
              label: "View Profile",
              onClick: () => alert("Navigating to profile..."),
            },
          })
        }
      >
        Success with Action
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error("Upload failed", "The file could not be uploaded", {
            action: {
              label: "Retry",
              onClick: () => alert("Retrying upload..."),
            },
          })
        }
      >
        Error with Action
      </Button>
      <Button
        variant="border-secondary"
        onClick={() =>
          toast.warning(
            "Session expiring",
            "You will be logged out in 5 minutes",
            {
              duration: 0, // No auto-dismiss
              action: {
                label: "Extend",
                onClick: () => alert("Session extended!"),
              },
            }
          )
        }
      >
        Warning with Action (No Auto-dismiss)
      </Button>
    </div>
  );
};

/**
 * Custom duration
 */
export const CustomDuration: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-3">
      <Button
        onClick={() =>
          toast.info("Quick message", undefined, { duration: 2000 })
        }
      >
        2 Second Toast
      </Button>
      <Button
        onClick={() =>
          toast.info("Normal message", undefined, { duration: 5000 })
        }
      >
        5 Second Toast (Default)
      </Button>
      <Button
        onClick={() =>
          toast.warning("Important message", "Please read carefully", {
            duration: 10000,
          })
        }
      >
        10 Second Toast
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error("Critical error", "Requires manual dismissal", {
            duration: 0,
          })
        }
      >
        No Auto-dismiss (0 duration)
      </Button>
    </div>
  );
};

/**
 * Stacking multiple toasts
 */
export const StackedToasts: StoryFn = () => {
  const { toast } = useToast();

  const showMultiple = () => {
    toast.info("Loading data...");
    setTimeout(() => toast.success("Data loaded successfully"), 500);
    setTimeout(() => toast.warning("Cache will expire in 1 hour"), 1000);
    setTimeout(() => toast.info("Tip: You can refresh anytime"), 1500);
  };

  const showMany = () => {
    for (let i = 1; i <= 7; i++) {
      setTimeout(
        () => toast.info(`Toast ${i}`, `This is toast number ${i}`),
        i * 300
      );
    }
  };

  return (
    <div className="p-6 space-y-3">
      <Button onClick={showMultiple}>Show 4 Toasts in Sequence</Button>
      <Button onClick={showMany}>
        Show 7 Toasts (Max 5 visible)
      </Button>
      <p className="text-sm text-neutral-600">
        Only the most recent 5 toasts are displayed at once.
      </p>
    </div>
  );
};

/**
 * Real-world examples
 */
export const RealWorldExamples: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Common Use Cases</h2>

      <section>
        <h3 className="font-semibold mb-2">Form Submission</h3>
        <div className="space-y-2">
          <Button
            variant="primary"
            onClick={() =>
              toast.success("Form submitted", "We'll get back to you within 24 hours")
            }
          >
            Success
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              toast.error("Form validation failed", "Please fill in all required fields", {
                action: {
                  label: "Show Errors",
                  onClick: () => alert("Highlighting errors..."),
                },
              })
            }
          >
            Validation Error
          </Button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">File Upload</h3>
        <div className="space-y-2">
          <Button
            onClick={() => {
              toast.info("Uploading file...", undefined, { duration: 0 });
              setTimeout(() => {
                toast.success("File uploaded", "document.pdf (2.5 MB)");
              }, 3000);
            }}
          >
            Upload File
          </Button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Blockchain Transaction</h3>
        <div className="space-y-2">
          <Button
            onClick={() => {
              toast.info("Transaction pending", "Waiting for confirmation...", {
                duration: 0,
              });
              setTimeout(() => {
                toast.success(
                  "Transaction confirmed",
                  "500 carbon credits transferred",
                  {
                    action: {
                      label: "View on Explorer",
                      onClick: () => alert("Opening block explorer..."),
                    },
                  }
                );
              }, 5000);
            }}
          >
            Send Transaction
          </Button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Clipboard Copy</h3>
        <div className="space-y-2">
          <Button
            onClick={() => {
              navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc9e7595f8E4A");
              toast.success("Copied to clipboard", "Wallet address copied");
            }}
          >
            Copy Wallet Address
          </Button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Session Management</h3>
        <div className="space-y-2">
          <Button
            variant="border-secondary"
            onClick={() =>
              toast.warning(
                "Session expiring",
                "You will be logged out in 5 minutes",
                {
                  duration: 0,
                  action: {
                    label: "Stay Logged In",
                    onClick: () => {
                      toast.success("Session extended", "You're good for another hour");
                    },
                  },
                }
              )
            }
          >
            Session Warning
          </Button>
        </div>
      </section>
    </div>
  );
};
