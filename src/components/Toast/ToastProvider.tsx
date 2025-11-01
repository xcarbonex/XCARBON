import React, { createContext, useContext, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Toast, ToastProps } from "./index";

interface ToastContextValue {
  toasts: Omit<ToastProps, "onClose">[];
  toast: {
    info: (title: string, description?: string, options?: ToastOptions) => void;
    success: (title: string, description?: string, options?: ToastOptions) => void;
    warning: (title: string, description?: string, options?: ToastOptions) => void;
    error: (title: string, description?: string, options?: ToastOptions) => void;
  };
  dismissToast: (id: string) => void;
}

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * ToastProvider Component
 *
 * Provides toast notification context to the app.
 * Wrap your app with this provider to enable toast notifications.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Omit<ToastProps, "onClose">[]>([]);

  // Maximum 5 visible toasts
  const MAX_TOASTS = 5;

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (
      variant: ToastProps["variant"],
      title: string,
      description?: string,
      options?: ToastOptions
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Omit<ToastProps, "onClose"> = {
        id,
        variant,
        title,
        description,
        duration: options?.duration ?? 5000,
        action: options?.action,
      };

      setToasts((prev) => {
        // Keep only the most recent MAX_TOASTS
        const updated = [...prev, newToast];
        if (updated.length > MAX_TOASTS) {
          return updated.slice(updated.length - MAX_TOASTS);
        }
        return updated;
      });
    },
    []
  );

  const toast = {
    info: (title: string, description?: string, options?: ToastOptions) =>
      addToast("info", title, description, options),
    success: (title: string, description?: string, options?: ToastOptions) =>
      addToast("success", title, description, options),
    warning: (title: string, description?: string, options?: ToastOptions) =>
      addToast("warning", title, description, options),
    error: (title: string, description?: string, options?: ToastOptions) =>
      addToast("error", title, description, options),
  };

  const contextValue: ToastContextValue = {
    toasts,
    toast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Portal for toasts */}
      {toasts.length > 0 &&
        ReactDOM.createPortal(
          <div
            className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none"
            aria-live="polite"
            aria-relevant="additions"
          >
            {toasts.map((toastProps) => (
              <div key={toastProps.id} className="pointer-events-auto">
                <Toast {...toastProps} onClose={dismissToast} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

/**
 * useToast Hook
 *
 * Custom hook to access toast notifications.
 *
 * @example
 * ```tsx
 * const { toast } = useToast();
 *
 * // Show toasts
 * toast.success("Profile updated!");
 * toast.error("Failed to save changes.");
 * toast.info("New message received.");
 * toast.warning("Session expiring soon.", "Please save your work.", {
 *   duration: 0, // No auto-dismiss
 *   action: {
 *     label: "Extend Session",
 *     onClick: () => extendSession(),
 *   },
 * });
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
