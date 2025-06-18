import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { useTheme } from '@/components/ThemeProvider';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
}) => {
    const { theme } = useTheme();
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={clsx(
        'absolute w-full transition duration-slow inset-0 z-50 flex items-center bg-black justify-center  bg-opacity-60 overflow-auto',
        theme,
        { hidden: !isOpen }
      )}
      onClick={() => closeOnBackdropClick && onClose?.()}
    >
      <div
        className={clsx(
          'mx-4 p-2 bg-secondary text-tbase rounded-lg shadow-lg relative border border-[#D8D8D8] dark:border-[#363638] w-full max-w-2xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute -top-2 -right-2 bg-tertiary rounded-full p-1 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {title && <h2 className="text-xl font-semibold mb-4 px-3">{title}</h2>}
        <div className='w-full h-fit text-tbase '>{children}</div>
      </div>
    </div>
  );

  // Optional: Render into a portal if needed
  return ReactDOM.createPortal(modalContent, document.getElementById('root'));
};

export default Modal;
