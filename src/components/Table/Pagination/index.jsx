import React from 'react';
import { getPaginationRange } from './paginationRange';
import clsx from 'clsx';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
 
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex items-center space-x-2 text-tbase gap-1 mt-4">
      <button  className={clsx("border p-2 rounded-md")}  onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        <MdOutlineKeyboardArrowLeft className=''/>
      </button>
 
      {range.map((item, index) => {
 
        return (
          <button
            key={index}
            onClick={item !== '...'? () => table.setPageIndex(item - 1): () => {}}
            className={clsx(" px-2 ", {'font-extrabold': item === currentPage, 'cursor-default': item === '...' })}
          >
            {item}
          </button>
        );
      })}
 
      <button className={clsx("border p-2 rounded-md")} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <MdOutlineKeyboardArrowRight/>
      </button>
    </div>
  );
};

export default Pagination;