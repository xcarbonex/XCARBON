import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

export type DrawerSize = "sm" | "md" | "lg" | "xl";
export type DrawerAnchor = "left" | "right";

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;

  /**
   * Callback when drawer should close
   */
  onClose: () => void;

  /**
   * Drawer title (H2)
   */
  title?: string;

  /**
   * Optional description below title
   */
  description?: string;

  /**
   * Drawer content
   */
  children: React.ReactNode;

  /**
   * Size variant
   */
  size?: DrawerSize;

  /**
   * Anchor side
   */
  anchor?: DrawerAnchor;

  /**
   * Show close button
   */
  showCloseButton?: boolean;

  /**
   * Close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Close on ESC key (default: true)
   */
  closeOnEsc?: boolean;

  /**
   * Custom className for drawer container
   */
  className?: string;

  /**
   * Custom className for drawer content
   */
  contentClassName?: string;

  /**
   * Footer actions (buttons, links)
   */
  footer?: React.ReactNode;

  /**
   * URL state management - query param name (e.g., "detail")
   */
  urlParam?: string;

  /**
   * URL state value (e.g., "123")
   */
  urlParamValue?: string;

  /**
   * Navigation arrows for cycling through items
   */
  navigation?: {
    onPrevious?: () => void;
    onNext?: () => void;
    hasPrevious?: boolean;
    hasNext?: boolean;
  };

  /**
   * Disable focus trap (use cautiously)
   */
  disableFocusTrap?: boolean;

  /**
   * Custom z-index
   */
  zIndex?: number;
}

/**
 * Drawer Component (Side Sheet)
 *
 * A fully accessible drawer/side sheet with:
 * - Focus trap management
 * - ESC key handling
 * - Backdrop click closing
 * - Size variants (sm, md, lg, xl)
 * - Left/right anchoring
 * - URL state management for deep linking
 * - Navigation arrows for list item cycling
 * - Portal rendering
 * - Smooth slide animations
 * - ARIA attributes
 * - Mobile responsive (converts to BottomSheet or full-screen below 768px)
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Notification Details"
 *   size="md"
 *   anchor="right"
 *   urlParam="detail"
 *   urlParamValue="123"
 *   navigation={{
 *     onPrevious: () => loadPrevious(),
 *     onNext: () => loadNext(),
 *     hasPrevious: currentIndex > 0,
 *     hasNext: currentIndex < items.length - 1
 *   }}
 * >
 *   <p>Drawer content</p>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  anchor = "right",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  className,
  contentClassName,
  footer,
  urlParam,
  urlParamValue,
  navigation,
  disableFocusTrap = false,
  zIndex = 1050,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Size configurations (width in pixels)
  const sizeClasses = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[32rem]",
    xl: "w-[48rem]",
  };

  // Slide animation classes
  const slideClasses = {
    left: {
      enter: "animate-in slide-in-from-left motion-reduce:animate-none",
      exit: "animate-out slide-out-to-left motion-reduce:animate-none",
    },
    right: {
      enter: "animate-in slide-in-from-right motion-reduce:animate-none",
      exit: "animate-out slide-out-to-right motion-reduce:animate-none",
    },
  };

  // Update URL when drawer opens/closes
  useEffect(() => {
    if (!urlParam) return;

    if (isOpen && urlParamValue) {
      searchParams.set(urlParam, urlParamValue);
      setSearchParams(searchParams, { replace: true });
    } else if (!isOpen && searchParams.has(urlParam)) {
      searchParams.delete(urlParam);
      setSearchParams(searchParams, { replace: true });
    }
  }, [isOpen, urlParam, urlParamValue, searchParams, setSearchParams]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEsc]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || disableFocusTrap) return;

    // Save currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus first focusable element in drawer
    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }

    // Trap focus within drawer
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusableElements) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);

    // Cleanup: restore focus
    return () => {
      document.removeEventListener("keydown", handleTabKey);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, disableFocusTrap]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  if (!isOpen) return null;

  const drawerContent = (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0",
          "bg-black/50 dark:bg-black/70",
          "backdrop-blur-sm",
          "transition-opacity duration-250",
          "animate-in fade-in motion-reduce:animate-none"
        )}
        style={{ zIndex }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className={clsx(
          // Position
          "fixed top-0 bottom-0",
          anchor === "left" ? "left-0" : "right-0",

          // Size
          sizeClasses[size],

          // Mobile: Full width below 768px
          "max-md:w-full max-md:max-w-full",

          // Glassmorphism
          "backdrop-blur-xl",
          "bg-white/95 dark:bg-neutral-900/95",

          // Border
          anchor === "left"
            ? "border-r border-neutral-200/50 dark:border-neutral-700/30"
            : "border-l border-neutral-200/50 dark:border-neutral-700/30",

          // Shadow
          "shadow-2xl",

          // Animation
          slideClasses[anchor].enter,

          // Flex layout
          "flex flex-col",

          // Custom className
          className
        )}
        style={{ zIndex: zIndex + 1 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        aria-describedby={description ? "drawer-description" : undefined}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-neutral-200/50 dark:border-neutral-700/30">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-xl font-bold text-neutral-900 dark:text-white truncate"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="drawer-description"
                  className="text-sm text-neutral-600 dark:text-neutral-400 mt-1"
                >
                  {description}
                </p>
              )}
            </div>

            {/* Close Button */}
            {showCloseButton && (
              <button
                type="button"
                className={clsx(
                  "flex-shrink-0",
                  "w-8 h-8",
                  "rounded-lg",
                  "text-neutral-600 dark:text-neutral-400",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "hover:text-neutral-900 dark:hover:text-neutral-100",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  "transition-all duration-200",
                  "flex items-center justify-center"
                )}
                onClick={onClose}
                aria-label="Close drawer"
              >
                <IoClose className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Arrows */}
          {navigation && (navigation.hasPrevious || navigation.hasNext) && (
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                className={clsx(
                  "px-3 py-1.5 rounded-lg",
                  "text-sm font-medium",
                  "border border-neutral-300 dark:border-neutral-700",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  "transition-all duration-200",
                  "flex items-center gap-1.5",
                  !navigation.hasPrevious && "opacity-50 cursor-not-allowed"
                )}
                onClick={navigation.onPrevious}
                disabled={!navigation.hasPrevious}
                aria-label="Previous item"
              >
                <IoChevronBack className="w-4 h-4" />
                Previous
              </button>
              <button
                type="button"
                className={clsx(
                  "px-3 py-1.5 rounded-lg",
                  "text-sm font-medium",
                  "border border-neutral-300 dark:border-neutral-700",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  "transition-all duration-200",
                  "flex items-center gap-1.5",
                  !navigation.hasNext && "opacity-50 cursor-not-allowed"
                )}
                onClick={navigation.onNext}
                disabled={!navigation.hasNext}
                aria-label="Next item"
              >
                Next
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Body (Scrollable) */}
        <div
          className={clsx(
            "flex-1 overflow-y-auto",
            "px-6 py-4",
            "text-neutral-900 dark:text-neutral-100",
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-neutral-200/50 dark:border-neutral-700/30">
            <div className="flex items-center justify-end gap-3">{footer}</div>
          </div>
        )}
      </div>
    </>
  );

  // Render into portal at document body
  return ReactDOM.createPortal(drawerContent, document.body);
};

export default Drawer;
