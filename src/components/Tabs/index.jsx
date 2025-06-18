import React from 'react';
import clsx from 'clsx';
import { useTheme } from "@/components/ThemeProvider";

const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  containerClassName = '',
  tabClassName = '',
}) => {
  const theme = useTheme();

  return (
    <div className={clsx("flex gap-1 border-b md:border-transparent", containerClassName)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            "rounded-t-xl px-3 py-3 text-sm  md:text-md lg:text-lg text-tbase border-b -mb-0.5 md:-mb-1 transition-all duration-slow",
            activeTab === tab.id ? "border-tertiary" : "border-transparent",
            { "bg-tertiary": activeTab === tab.id },
            { "text-tbase": theme === "dark" },
            { "text-text": theme === "light" && activeTab === tab.id },
            { "hover:bg-tertiary/50": activeTab !== tab.id },
            tabClassName
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs; 