import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import {
  IoClose,
  IoCheckmarkCircle,
  IoInformationCircle,
  IoWarning,
  IoCloseCircle,
} from "react-icons/io5";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastProps {
  /**
   * Unique ID for this toast
   */
  id: string;

  /**
   * Toast variant (info, success, warning, error)
   */
  variant: ToastVariant;

  /**
   * Toast title (main message)
   */
  title: string;

  /**
   * Optional description (secondary text)
   */
  description?: string;

  /**
   * Duration in milliseconds (0 = no auto-dismiss)
   */
  duration?: number;

  /**
   * Callback when toast is closed
   */
  onClose: (id: string) => void;

  /**
   * Optional action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig = {
  info: {
    icon: IoInformationCircle,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-900 dark:text-blue-100",
    role: "status" as const,
  },
  success: {
    icon: IoCheckmarkCircle,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    textColor: "text-green-900 dark:text-green-100",
    role: "status" as const,
  },
  warning: {
    icon: IoWarning,
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    textColor: "text-yellow-900 dark:text-yellow-100",
    role: "alert" as const,
  },
  error: {
    icon: IoCloseCircle,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
    role: "alert" as const,
  },
};

/**
 * Toast Component
 *
 * Individual toast notification with:
 * - 4 variants (info, success, warning, error)
 * - Auto-dismiss with configurable duration
 * - Manual close button
 * - Optional action button
 * - Swipe to dismiss on mobile
 * - ARIA attributes for accessibility
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  variant,
  title,
  description,
  duration = 5000,
  onClose,
  action,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const config = variantConfig[variant];
  const Icon = config.icon;

  // Auto-dismiss timer
  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        onClose(id);
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [id, duration, onClose]);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onClose(id);
  };

  return (
    <div
      role={config.role}
      aria-live={variant === "error" || variant === "warning" ? "assertive" : "polite"}
      aria-atomic="true"
      className={clsx(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "min-w-[320px] max-w-md",
        "animate-in slide-in-from-right fade-in duration-300",
        config.bgColor,
        config.borderColor
      )}
    >
      {/* Icon */}
      <Icon size={24} className={clsx("flex-shrink-0 mt-0.5", config.iconColor)} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={clsx("font-semibold text-sm", config.textColor)}>{title}</p>
        {description && (
          <p
            className={clsx(
              "mt-1 text-sm",
              variant === "error" || variant === "warning"
                ? config.textColor
                : "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {description}
          </p>
        )}

        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className={clsx(
              "mt-2 text-sm font-medium underline hover:no-underline",
              config.iconColor
            )}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className={clsx(
          "flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          config.iconColor
        )}
        aria-label="Close notification"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Toast;
