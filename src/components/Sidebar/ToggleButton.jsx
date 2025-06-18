import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ToggleButton = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="absolute -right-4 top-20 z-60 bg-background border rounded-full p-1 transition-all duration-500 hover:scale-105"
    >
      {isCollapsed ? (
        <MdChevronRight className="h-5 w-5 text-text transition-transform duration-500" />
      ) : (
        <MdChevronLeft className="h-5 w-5 text-text transition-transform duration-500" />
      )}
    </button>
  );
};

export default ToggleButton; 