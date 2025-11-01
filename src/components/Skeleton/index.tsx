import React from "react";
import clsx from "clsx";

/**
 * Base Skeleton Component
 *
 * A simple pulsing skeleton loader for generic content.
 * Respects prefers-reduced-motion for accessibility.
 */
export interface SkeletonProps {
  /**
   * Width of the skeleton (CSS value)
   */
  width?: string;

  /**
   * Height of the skeleton (CSS value)
   */
  height?: string;

  /**
   * Border radius variant
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";

  /**
   * Optional className for customization
   */
  className?: string;

  /**
   * Number of skeleton lines to render (for text skeletons)
   */
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  rounded = "md",
  className,
  lines = 1,
}) => {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  if (lines > 1) {
    return (
      <div className={clsx("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700",
              "animate-pulse motion-reduce:animate-none",
              roundedClasses[rounded]
            )}
            style={{
              width: index === lines - 1 ? `${Math.random() * 40 + 60}%` : width,
              height,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "bg-neutral-200 dark:bg-neutral-700",
        "animate-pulse motion-reduce:animate-none",
        roundedClasses[rounded],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

/**
 * SkeletonCard Component
 *
 * Skeleton loader for MetricCard or Card components
 */
export interface SkeletonCardProps {
  /**
   * Size variant matching MetricCard sizes
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional className for customization
   */
  className?: string;

  /**
   * Show change indicator skeleton
   */
  showChange?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  size = "md",
  className,
  showChange = true,
}) => {
  const sizeClasses = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={clsx(
        "backdrop-blur-xl",
        "bg-white/80 dark:bg-neutral-900/80",
        "border border-neutral-200/50 dark:border-neutral-700/30",
        "rounded-2xl",
        "shadow-lg",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    >
      <div className="space-y-3">
        {/* Label skeleton */}
        <Skeleton width="40%" height="0.75rem" rounded="sm" />

        {/* Value skeleton - large */}
        <Skeleton width="70%" height={size === "lg" ? "2rem" : "1.5rem"} rounded="md" />

        {/* Change indicator skeleton */}
        {showChange && <Skeleton width="25%" height="0.875rem" rounded="sm" />}
      </div>
    </div>
  );
};

/**
 * SkeletonTable Component
 *
 * Skeleton loader for Table rows
 */
export interface SkeletonTableProps {
  /**
   * Number of columns
   */
  columns: number;

  /**
   * Number of rows to display
   */
  rows?: number;

  /**
   * Optional className for customization
   */
  className?: string;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columns,
  rows = 5,
  className,
}) => {
  return (
    <div className={className} role="status" aria-live="polite" aria-label="Loading table data...">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={clsx(
            "grid gap-4 px-6 py-4",
            "border-b border-neutral-200/50 dark:border-neutral-700/30"
          )}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="1rem" rounded="sm" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * SkeletonText Component
 *
 * Skeleton loader for text content (paragraphs, descriptions)
 */
export interface SkeletonTextProps {
  /**
   * Number of lines
   */
  lines?: number;

  /**
   * Optional className for customization
   */
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className }) => {
  return (
    <div className={className} role="status" aria-live="polite" aria-label="Loading text...">
      <Skeleton lines={lines} height="1rem" />
    </div>
  );
};

/**
 * SkeletonAvatar Component
 *
 * Skeleton loader for avatar/profile images
 */
export interface SkeletonAvatarProps {
  /**
   * Size of the avatar
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Optional className for customization
   */
  className?: string;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = "md", className }) => {
  const sizeMap = {
    sm: "2rem",
    md: "3rem",
    lg: "4rem",
    xl: "5rem",
  };

  return (
    <Skeleton
      width={sizeMap[size]}
      height={sizeMap[size]}
      rounded="full"
      className={className}
      aria-label="Loading avatar..."
    />
  );
};

/**
 * SkeletonButton Component
 *
 * Skeleton loader for buttons
 */
export interface SkeletonButtonProps {
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional className for customization
   */
  className?: string;
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({ size = "md", className }) => {
  const sizeMap = {
    sm: { width: "5rem", height: "2rem" },
    md: { width: "6rem", height: "2.5rem" },
    lg: { width: "7rem", height: "3rem" },
  };

  return (
    <Skeleton
      width={sizeMap[size].width}
      height={sizeMap[size].height}
      rounded="lg"
      className={className}
      aria-label="Loading button..."
    />
  );
};

export default Skeleton;
