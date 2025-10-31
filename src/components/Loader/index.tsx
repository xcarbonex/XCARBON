import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="dark:bg-neutral-900 bg-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 mt-3">
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-700"></div>
        <span className="ml-3 text-neutral-600 dark:text-neutral-400">
          Loading carbon credits...
        </span>
      </div>
    </div>
  );
};

export default Loader;
