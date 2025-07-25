import React from "react";

function Loader() {
  return (
    <div className="dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-3">
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2A57B]"></div>
        <span className="ml-3 text-[#949494]">Loading carbon credits...</span>
      </div>
    </div>
  );
}

export default Loader;
