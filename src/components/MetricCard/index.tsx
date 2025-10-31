import React from "react";
import clsx from "clsx";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

export type MetricChangeType = "positive" | "negative" | "neutral";
export type MetricTrend = "up" | "down" | "flat";
export type MetricSize = "sm" | "md" | "lg";

export interface MetricCardProps {
  /**
   * Label for the metric (e.g., "Total Portfolio Value")
   */
  label: string;

  /**
   * The main value to display (e.g., "$48,250.00")
   */
  value: string;

  /**
   * Optional change indicator (e.g., "+7.7%", "+$3,450")
   */
  change?: string;

  /**
   * Type of change (affects color)
   */
  changeType?: MetricChangeType;

  /**
   * Trend direction (shows arrow icon)
   */
  trend?: MetricTrend;

  /**
   * Optional icon to display with the label
   */
  icon?: React.ReactNode;

  /**
   * Size variant
   */
  size?: MetricSize;

  /**
   * Optional className for customization
   */
  className?: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Optional action button/link
   */
  action?: React.ReactNode;

  /**
   * Loading state
   */
  loading?: boolean;
}

/**
 * MetricCard Component
 *
 * A premium card component for displaying financial metrics with:
 * - Glassmorphism background
 * - Large monospace numbers
 * - Change indicators with colors
 * - Trend arrows
 * - Optional icons
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Total Portfolio Value"
 *   value="$48,250.00"
 *   change="+7.7%"
 *   changeType="positive"
 *   trend="up"
 *   icon={<FaWallet />}
 * />
 * ```
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeType = "neutral",
  trend,
  icon,
  size = "md",
  className,
  subtitle,
  action,
  loading = false,
}) => {
  // Size-specific classes
  const sizeClasses = {
    sm: {
      container: "p-4",
      value: "typography-metric-small",
      label: "text-xs",
    },
    md: {
      container: "p-5",
      value: "typography-metric-medium",
      label: "text-xs",
    },
    lg: {
      container: "p-6",
      value: "typography-metric-large",
      label: "typography-label",
    },
  };

  // Change type colors
  const changeColors = {
    positive: "text-success-600 dark:text-success-400",
    negative: "text-error-600 dark:text-error-400",
    neutral: "text-neutral-600 dark:text-neutral-400",
  };

  if (loading) {
    return (
      <div
        className={clsx(
          "backdrop-blur-xl",
          "bg-white/80 dark:bg-neutral-900/80",
          "rounded-2xl",
          "border border-neutral-200/50 dark:border-neutral-700/30",
          "shadow-lg",
          sizeClasses[size].container,
          "animate-pulse",
          className
        )}
      >
        <div className="space-y-3">
          <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-1/3"></div>
          <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4"></div>
          <div className="h-3 bg-neutral-300 dark:bg-neutral-600 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        // Glassmorphism
        "backdrop-blur-xl",
        "bg-white/80 dark:bg-neutral-900/80",

        // Border
        "border border-neutral-200/50 dark:border-neutral-700/30",

        // Shadow & Hover
        "shadow-lg hover:shadow-xl",
        "hover:-translate-y-0.5",

        // Transitions
        "transition-all duration-300",

        // Rounded
        "rounded-2xl",

        // Padding
        sizeClasses[size].container,

        // Custom className
        className
      )}
    >
      <div className="flex flex-col space-y-3">
        {/* Label Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-neutral-500 dark:text-neutral-400 flex-shrink-0">{icon}</span>
            )}
            <span
              className={clsx(
                sizeClasses[size].label,
                "typography-label text-neutral-600 dark:text-neutral-400 font-medium"
              )}
            >
              {label}
            </span>
          </div>
          {action && <div>{action}</div>}
        </div>

        {/* Value - Large monospace number */}
        <div
          className={clsx(sizeClasses[size].value, "text-neutral-900 dark:text-white font-bold")}
        >
          {value}
        </div>

        {/* Change & Subtitle Row */}
        {(change || subtitle) && (
          <div className="flex items-center justify-between gap-2">
            {/* Change indicator */}
            {change && (
              <div
                className={clsx(
                  "flex items-center gap-1",
                  "typography-percentage",
                  changeColors[changeType]
                )}
              >
                {trend === "up" && <IoArrowUpOutline className="w-4 h-4" />}
                {trend === "down" && <IoArrowDownOutline className="w-4 h-4" />}
                <span className="font-semibold">{change}</span>
              </div>
            )}

            {/* Subtitle */}
            {subtitle && (
              <span className="typography-caption text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * MetricCardGrid Component
 *
 * A responsive grid container for multiple MetricCards
 *
 * @example
 * ```tsx
 * <MetricCardGrid>
 *   <MetricCard label="Value 1" value="$1,000" />
 *   <MetricCard label="Value 2" value="$2,000" />
 *   <MetricCard label="Value 3" value="$3,000" />
 * </MetricCardGrid>
 * ```
 */
export const MetricCardGrid: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}> = ({ children, columns = 3, className }) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={clsx("grid gap-4 md:gap-6", gridClasses[columns], className)}>{children}</div>
  );
};

export default MetricCard;
