import React from "react";
import clsx from "clsx";

export interface Tab {
  id: string | number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string | number;
  onTabChange: (tabId: string | number) => void;
  containerClassName?: string;
  tabClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  containerClassName = "",
  tabClassName = "",
}) => {
  return (
    <div
      className={clsx(
        "flex gap-1 border-b border-neutral-200 dark:border-neutral-700/50 md:border-transparent transition-colors duration-200",
        containerClassName
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            "px-4 py-3 text-sm md:text-base lg:text-lg font-medium rounded-t-lg border-b -mb-0.5 md:-mb-1 transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            activeTab === tab.id
              ? "border-brand-700 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 shadow-sm dark:shadow-brand-900/20 focus-visible:outline-brand-400"
              : "border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200 focus-visible:outline-neutral-400",
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
