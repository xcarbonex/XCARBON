import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-neutral-300 dark:border-neutral-700 rounded mb-3 overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none dark:focus:ring-2 dark:focus:ring-brand-700 focus:ring-2 focus:ring-brand-700 dark:bg-neutral-800 bg-neutral-100 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        onClick={toggleAccordion}
      >
        <span className="font-medium text-base">{title}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          } text-neutral-900 dark:text-neutral-50`}
        />
      </button>
      {isOpen && (
        <div className="p-4 dark:bg-neutral-900 bg-neutral-50 text-sm text-neutral-900 dark:text-neutral-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
