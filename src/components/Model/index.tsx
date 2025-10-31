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
        "absolute w-full transition duration-slow inset-0 z-50 flex items-center bg-black justify-center  bg-opacity-60 overflow-auto",
        theme,
        { hidden: !isOpen }
      )}
      onClick={() => closeOnBackdropClick && onClose?.()}
    >
      <div
        className={clsx(
          "mx-4 p-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 rounded-lg shadow-lg relative border border-neutral-300 dark:border-neutral-700 w-full max-w-2xl",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute -top-2 -right-2 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {title && <h2 className="text-xl font-semibold mb-4 px-3">{title}</h2>}
        <div className="w-full h-fit text-tbase ">{children}</div>
      </div>
    </div>
  );

  // Optional: Render into a portal if needed
  const rootElement = document.getElementById("root");
  return rootElement ? ReactDOM.createPortal(modalContent, rootElement) : null;
};

export default Modal;
