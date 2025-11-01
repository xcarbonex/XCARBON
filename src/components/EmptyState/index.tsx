import React from "react";
import clsx from "clsx";
import { Button } from "..";

export interface EmptyStateProps {
  /**
   * Icon component or element to display
   */
  icon?: React.ReactNode;

  /**
   * Main heading text
   */
  title: string;

  /**
   * Supporting description text
   */
  description?: string;

  /**
   * Primary action button
   */
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  /**
   * Secondary action button
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  /**
   * Optional className for customization
   */
  className?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
}

/**
 * EmptyState Component
 *
 * Displays an empty state with icon, message, and optional action buttons.
 * Used when there's no data to display in a section.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<FaWallet />}
 *   title="No assets yet"
 *   description="Start by depositing funds or purchasing carbon credits"
 *   primaryAction={{
 *     label: "Deposit Funds",
 *     onClick: () => openDepositDrawer()
 *   }}
 *   secondaryAction={{
 *     label: "Browse Marketplace",
 *     onClick: () => navigate('/marketplace')
 *   }}
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: {
      container: "py-8",
      iconWrapper: "w-12 h-12",
      iconSize: "w-6 h-6",
      title: "text-base",
      description: "text-xs",
    },
    md: {
      container: "py-12",
      iconWrapper: "w-16 h-16",
      iconSize: "w-8 h-8",
      title: "text-lg",
      description: "text-sm",
    },
    lg: {
      container: "py-16",
      iconWrapper: "w-20 h-20",
      iconSize: "w-10 h-10",
      title: "text-xl",
      description: "text-base",
    },
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        sizeClasses[size].container,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      {icon && (
        <div
          className={clsx(
            "rounded-full flex items-center justify-center mb-4",
            "bg-neutral-100 dark:bg-neutral-800",
            "text-neutral-400 dark:text-neutral-500",
            sizeClasses[size].iconWrapper
          )}
        >
          <div className={sizeClasses[size].iconSize}>{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3
        className={clsx(
          "font-semibold mb-2",
          "text-neutral-900 dark:text-neutral-100",
          sizeClasses[size].title
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={clsx(
            "mb-6 max-w-md",
            "text-neutral-600 dark:text-neutral-400",
            sizeClasses[size].description
          )}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {primaryAction && (
            <Button
              variant="primary"
              size={size === "sm" ? "sm" : "md"}
              onClick={primaryAction.onClick}
              icon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="border-secondary"
              size={size === "sm" ? "sm" : "md"}
              onClick={secondaryAction.onClick}
              icon={secondaryAction.icon}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
