import React from "react";
import { getPaginationRange } from "./paginationRange";
import clsx from "clsx";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const range = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex items-center space-x-2 text-tbase gap-1 mt-4">
      <button
        type="button"
        className={clsx("border p-2 rounded-md")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineKeyboardArrowLeft className="" />
      </button>

      {range.map((item, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={item !== "..." ? () => onPageChange(item) : () => {}}
            className={clsx(" px-2 ", {
              "font-extrabold": item === currentPage,
              "cursor-default": item === "...",
            })}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className={clsx("border p-2 rounded-md")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
