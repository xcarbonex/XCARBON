import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="dark:bg-neutral-900/50 bg-neutral-50/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 rounded-xl p-6 mt-4 shadow-sm">
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-neutral-300 dark:border-neutral-700 border-t-brand-700 dark:border-t-brand-500 transition-all duration-300"></div>
        <span className="ml-4 text-neutral-700 dark:text-neutral-300 font-medium">
          Loading carbon credits...
        </span>
      </div>
    </div>
  );
};

export default Loader;
