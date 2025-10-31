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
    <div className="border border-neutral-200 dark:border-neutral-700/50 rounded-lg mb-3 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 dark:focus:ring-0 focus:ring-0 dark:bg-neutral-800/50 bg-neutral-50/50 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200"
        onClick={toggleAccordion}
      >
        <span className="font-semibold text-base">{title}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ease-out ${
            isOpen ? "transform rotate-180" : ""
          } text-neutral-900 dark:text-neutral-50`}
        />
      </button>
      {isOpen && (
        <div className="p-4 dark:bg-neutral-900/50 bg-neutral-100/30 text-sm text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700/50">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
