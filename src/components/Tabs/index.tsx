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
        "flex gap-1 border-b border-neutral-200 dark:border-neutral-700 md:border-transparent",
        containerClassName
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            "rounded-t-xl px-3 py-3 text-sm md:text-md lg:text-lg text-neutral-900 dark:text-neutral-50 border-b -mb-0.5 md:-mb-1 transition-all duration-200",
            activeTab === tab.id
              ? "border-brand-700 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              : "border-transparent",
            { "hover:bg-neutral-100 dark:hover:bg-neutral-800": activeTab !== tab.id },
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
