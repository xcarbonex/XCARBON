import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={clsx(
        "absolute w-full transition-all duration-300 inset-0 z-50 flex items-center bg-black justify-center bg-opacity-50 backdrop-blur-sm overflow-auto",
        theme,
        { hidden: !isOpen }
      )}
      onClick={() => closeOnBackdropClick && onClose?.()}
    >
      <div
        className={clsx(
          "mx-4 p-6 bg-white dark:bg-neutral-900/95 backdrop-blur-sm text-neutral-900 dark:text-neutral-50 rounded-xl shadow-2xl relative border border-neutral-200 dark:border-neutral-700/50 w-full max-w-2xl transform transition-all duration-300",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute -top-3 -right-3 bg-white dark:bg-neutral-800 rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {title && <h2 className="text-2xl font-bold mb-4 px-2 pr-8">{title}</h2>}
        <div className="w-full h-fit text-tbase ">{children}</div>
      </div>
    </div>
  );

  // Optional: Render into a portal if needed
  const rootElement = document.getElementById("root");
  return rootElement ? ReactDOM.createPortal(modalContent, rootElement) : null;
};

export default Modal;
