import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded mb-3 overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none dark:bg-[#282828] bg-[#A6B3B1] text-black dark:text-white"
        onClick={toggleAccordion}
      >
        <span className="font-medium text-tbase">{title}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          } text-black dark:text-white`}
        />
      </button>
      {isOpen && (
        <div className="p-4 dark:bg-[#191919] bg-[#FDFDFB] text-sm text-black dark:text-[#949494]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
