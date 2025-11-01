import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal title (H2)
   */
  title?: string;

  /**
   * Optional description below title
   */
  description?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Size variant
   */
  size?: ModalSize;

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
   * Custom className for modal container
   */
  className?: string;

  /**
   * Custom className for modal content
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
}

/**
 * Modal Component
 *
 * A fully accessible modal dialog with:
 * - Focus trap management
 * - ESC key handling
 * - Backdrop click closing
 * - Size variants (sm, md, lg, xl)
 * - Portal rendering
 * - Smooth animations
 * - ARIA attributes
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   size="md"
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  className,
  contentClassName,
  footer,
  disableFocusTrap = false,
  zIndex = 1050,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Size configurations
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

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

    // Focus first focusable element in modal
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }

    // Trap focus within modal
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

  // Prevent body scroll when modal is open
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

  const modalContent = (
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

      {/* Modal Container */}
      <div
        className={clsx(
          "fixed inset-0",
          "flex items-center justify-center",
          "p-4 sm:p-6",
          "overflow-y-auto"
        )}
        style={{ zIndex: zIndex + 1 }}
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className={clsx(
            // Base styles
            "relative w-full",
            sizeClasses[size],
            "mx-auto my-auto",

            // Glassmorphism
            "backdrop-blur-xl",
            "bg-white/95 dark:bg-neutral-900/95",

            // Border & Shadow
            "border border-neutral-200/50 dark:border-neutral-700/30",
            "shadow-2xl",

            // Rounded
            "rounded-2xl",

            // Animations
            "animate-in zoom-in-95 fade-in motion-reduce:animate-none",
            "transition-all duration-250",

            // Custom className
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {showCloseButton && (
            <button
              type="button"
              className={clsx(
                "absolute -top-3 -right-3 z-10",
                "w-10 h-10",
                "rounded-full",
                "bg-white dark:bg-neutral-800",
                "border-2 border-neutral-200 dark:border-neutral-700",
                "text-neutral-600 dark:text-neutral-400",
                "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                "hover:text-neutral-900 dark:hover:text-neutral-100",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-200",
                "flex items-center justify-center"
              )}
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoClose className="w-5 h-5" />
            </button>
          )}

          {/* Header */}
          {(title || description) && (
            <div className="px-6 pt-6 pb-4 border-b border-neutral-200/50 dark:border-neutral-700/30">
              {title && (
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-neutral-900 dark:text-white mb-1"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={clsx(
              "px-6 py-4",
              "text-neutral-900 dark:text-neutral-100",
              "overflow-y-auto",
              "max-h-[calc(100vh-16rem)]",
              contentClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 pb-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/30">
              <div className="flex items-center justify-end gap-3">{footer}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Render into portal at document body
  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
