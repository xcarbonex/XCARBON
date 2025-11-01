import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export type BottomSheetSnapPoint = number; // 0-1 (percentage of viewport height)

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is open
   */
  isOpen: boolean;

  /**
   * Callback when bottom sheet should close
   */
  onClose: () => void;

  /**
   * Bottom sheet title (H2)
   */
  title?: string;

  /**
   * Optional description below title
   */
  description?: string;

  /**
   * Bottom sheet content
   */
  children: React.ReactNode;

  /**
   * Snap points as percentage of viewport height (0-1)
   * Example: [0.3, 0.6, 0.9] = 30%, 60%, 90%
   */
  snapPoints?: BottomSheetSnapPoint[];

  /**
   * Initial snap point index (default: 0)
   */
  initialSnapPoint?: number;

  /**
   * Show drag handle at top
   */
  showDragHandle?: boolean;

  /**
   * Show close button
   */
  showCloseButton?: boolean;

  /**
   * Close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Swipe down threshold to close (in pixels, default: 100)
   */
  swipeThreshold?: number;

  /**
   * Custom className for bottom sheet container
   */
  className?: string;

  /**
   * Custom className for bottom sheet content
   */
  contentClassName?: string;

  /**
   * Footer actions (buttons, links)
   */
  footer?: React.ReactNode;

  /**
   * Disable focus trap (use cautiously)
   */
  disableFocusTrap?: boolean;

  /**
   * Custom z-index
   */
  zIndex?: number;

  /**
   * Callback when snap point changes
   */
  onSnapPointChange?: (index: number) => void;
}

/**
 * BottomSheet Component
 *
 * A mobile-optimized overlay sliding up from the bottom with:
 * - Touch swipe gestures (swipe down to close or snap)
 * - Snap points (e.g., 30%, 60%, 90% of viewport height)
 * - Drag handle for visual affordance
 * - Backdrop dimming
 * - Focus trap management
 * - Smooth animations
 * - ARIA attributes for accessibility
 *
 * Ideal for mobile quick actions, filters, or detail views.
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  snapPoints = [0.5, 0.9],
  initialSnapPoint = 0,
  showDragHandle = true,
  showCloseButton = true,
  closeOnBackdropClick = true,
  swipeThreshold = 100,
  className,
  contentClassName,
  footer,
  disableFocusTrap = false,
  zIndex = 9999,
  onSnapPointChange,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapPoint);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Clamp snap point index
  const clampedSnapIndex = Math.max(
    0,
    Math.min(currentSnapIndex, snapPoints.length - 1)
  );
  const currentSnapPoint = snapPoints[clampedSnapIndex];

  // Calculate sheet height based on snap point
  const sheetHeight = `${currentSnapPoint * 100}vh`;

  // Handle focus trap
  useEffect(() => {
    if (!isOpen || disableFocusTrap) return;

    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    const sheetElement = sheetRef.current;
    if (!sheetElement) return;

    // Focus first focusable element
    const focusableElements = sheetElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      // Return focus to previously focused element
      previousFocusRef.current?.focus();
    };
  }, [isOpen, disableFocusTrap]);

  // Prevent body scroll when open
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

  // Touch event handlers for swipe gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setDragCurrentY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      setDragCurrentY(e.touches[0].clientY);
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const dragDistance = dragCurrentY - dragStartY;

    // Swipe down to close (if at lowest snap point)
    if (dragDistance > swipeThreshold && clampedSnapIndex === 0) {
      onClose();
    }
    // Swipe down to lower snap point
    else if (dragDistance > swipeThreshold / 2 && clampedSnapIndex > 0) {
      const newIndex = clampedSnapIndex - 1;
      setCurrentSnapIndex(newIndex);
      onSnapPointChange?.(newIndex);
    }
    // Swipe up to higher snap point
    else if (
      dragDistance < -swipeThreshold / 2 &&
      clampedSnapIndex < snapPoints.length - 1
    ) {
      const newIndex = clampedSnapIndex + 1;
      setCurrentSnapIndex(newIndex);
      onSnapPointChange?.(newIndex);
    }

    setIsDragging(false);
    setDragStartY(0);
    setDragCurrentY(0);
  }, [
    isDragging,
    dragStartY,
    dragCurrentY,
    swipeThreshold,
    clampedSnapIndex,
    snapPoints.length,
    onClose,
    onSnapPointChange,
  ]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  if (!isOpen) return null;

  // Calculate transform for dragging animation
  const dragOffset = isDragging ? Math.max(0, dragCurrentY - dragStartY) : 0;

  const content = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        style={{ zIndex }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "bottom-sheet-title" : undefined}
        aria-describedby={description ? "bottom-sheet-description" : undefined}
        className={clsx(
          "fixed bottom-0 left-0 right-0",
          "bg-white dark:bg-neutral-900",
          "rounded-t-3xl shadow-2xl",
          "flex flex-col",
          "transition-all duration-300 ease-out",
          "animate-in slide-in-from-bottom",
          className
        )}
        style={{
          zIndex: zIndex + 1,
          height: sheetHeight,
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? "none" : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        {showDragHandle && (
          <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex-1 pr-4">
            {title && (
              <h2
                id="bottom-sheet-title"
                className="text-xl font-semibold text-neutral-900 dark:text-white"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="bottom-sheet-description"
                className="mt-1 text-sm text-neutral-600 dark:text-neutral-400"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={clsx(
                "flex-shrink-0 p-2 rounded-lg",
                "text-neutral-500 hover:text-neutral-700",
                "dark:text-neutral-400 dark:hover:text-neutral-200",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              )}
              aria-label="Close bottom sheet"
            >
              <IoClose size={24} />
            </button>
          )}
        </div>

        {/* Content - Scrollable */}
        <div
          ref={contentRef}
          className={clsx(
            "flex-1 overflow-y-auto px-6 py-4",
            "overscroll-contain", // Prevent scroll chaining
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default BottomSheet;
