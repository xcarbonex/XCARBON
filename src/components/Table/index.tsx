import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { IoIosSearch } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import clsx from "clsx";
import { Input } from "..";
import Pagination from "./Pagination";
import Dropdown from "../Dropdown";
// import Datepicker from 'react-tailwindcss-datepicker';
import Typography from "../Typography";
import { ScrollBarWrapper } from "..";
import { DateRangeCalander } from "..";

interface DateRangeState {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  showSearch?: boolean;
  showPageSize?: boolean;
  showDataFilter?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: any) => void;
  title?: string;
  prepend?: React.ReactNode;
  dateField?: string;
  defaultPageSize?: number;
}

// TODO: Helper funcition to get date range based on filter
const getDateRange = (filter: string | null): string | null => {
  const now = new Date();
  // Set seconds and milliseconds to 0 for more precise time comparison
  now.setSeconds(0);
  now.setMilliseconds(0);

  let fromDate;
  switch (filter) {
    case "12H":
      fromDate = new Date(now);
      fromDate.setHours(now.getHours() - 12);
      return fromDate.toISOString();
    case "1D":
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 1);
      return fromDate.toISOString();
    case "1W":
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 7);
      return fromDate.toISOString();
    case "1M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 1);
      return fromDate.toISOString();
    case "3M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 3);
      return fromDate.toISOString();
    case "6M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 6);
      return fromDate.toISOString();
    default:
      return null;
  }
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  showSearch = false,
  showPageSize = false,
  showDataFilter = false,
  onRowClick = () => {},
  title = "",
  prepend = null,
  dateField = "createdDate",
  defaultPageSize = 10,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedDataFilter, setSelectedDataFilter] = useState<string | null>(null);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeState>({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Update pageSize when defaultPageSize prop changes
  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize]);

  // Handle click outside to close date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        // setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset all filters
  const resetFilters = () => {
    setGlobalFilter("");
    setSelectedDataFilter(null);
    setDateRange({ startDate: null, endDate: null, key: "selection" });
    setSorting([]);
    setPageSize(defaultPageSize);
    setPageIndex(0);
  };

  // Check if any filter is active
  const isFilterActive =
    globalFilter ||
    selectedDataFilter ||
    sorting.length > 0 ||
    (dateRange.startDate && dateRange.endDate);

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    let filtered = data;
    // let startDate = dateRange.startDate?.toISOString();
    // let endDate = dateRange.endDate?.toISOString();
    // Apply quick filter (dropdown)
    if (selectedDataFilter && dateField) {
      const fromDate = getDateRange(selectedDataFilter);
      if (fromDate) {
        const now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        const currentDate = now.toISOString();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filtered = filtered.filter((row: any) => {
          const rowDate = row[dateField];
          return rowDate >= fromDate && rowDate <= currentDate;
        });
      }
    }

    // Apply date range picker filter
    if (dateRange.startDate && dateRange.endDate && dateField) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filtered = filtered.filter((row: any) => {
        const rowDate = new Date(row[dateField]);
        const startDate = new Date(dateRange.startDate as Date);
        const endDate = new Date(dateRange.endDate as Date);
        endDate.setHours(23, 59, 59, 999); // Include the entire end date
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    return filtered;
  }, [data, selectedDataFilter, dateRange, dateField]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: {
        pageSize,
        pageIndex,
      },
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(table.getState().pagination);
        setPageSize(newState.pageSize);
        setPageIndex(newState.pageIndex);
      } else {
        setPageSize(updater.pageSize);
        setPageIndex(updater.pageIndex);
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  return (
    <div className={clsx("w-full overflow-auto")}>
      <div className="flex flex-col items-center sm:flex-row gap-4">
        <div className={clsx({ hidden: !prepend })}>{prepend}</div>
        <Typography variant="h4" className={clsx("whitespace-nowrap md:mb-4", { hidden: !title })}>
          {title}
        </Typography>

        <div className="flex flex-wrap items-center mb-4 gap-3 w-full sm:w-auto ml-auto">
          {/* Search Input - Full width on mobile */}
          {showSearch && (
            <div className="w-full sm:w-auto order-1">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-[250px] lg:w-[300px] rounded-[4rem] text-tbase"
                variant="xs"
                prefix={<IoIosSearch className="w-5 h-6" />}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                aria-label="Search table"
              />
            </div>
          )}

          {/* Filter Controls Group */}
          <div className="flex items-center gap-2 sm:gap-3 order-2 ml-auto sm:ml-0">
            {/* Reset Filters */}
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                title="Reset all filters"
              >
                <MdFilterAltOff className="w-4 h-4" />
              </button>
            )}

            {/* Date Picker */}
            {/* <div className="relative" ref={datePickerRef}>
              <button 
                className="p-2 bg-secondary text-tbase border hover:bg-black/5 rounded-full transition-colors"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <IoMdCalendar className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
              {!showDatePicker && (
                <div className="absolute right-0 top-full bg-secondary h-fit mt-2 z-50 rounded-md overflow-hidden">
                  <DateRangeCalander onChange={item=>setDateRange(item)}/>
                </div>
               )}
            </div> */}

            {/* Time Range Filter */}
            {showDataFilter && (
              <Dropdown
                options={options}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelect={(value: any) => setSelectedDataFilter(value?.value || null)}
                selectedOption={
                  selectedDataFilter
                    ? options.find((opt) => opt.value === selectedDataFilter) || null
                    : null
                }
                buttonClassName="text-sm sm:text-base"
              />
            )}

            {/* Page Size Dropdown */}
            {showPageSize && (
              <Dropdown
                options={sizeOptions}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelect={(value: any) => table.setPageSize(value.value)}
                icon={<HiDotsVertical className="w-5 h-5" />}
                buttonClassName={clsx("rounded-full p-[7px] hover:bg-black/5")}
              />
            )}
          </div>
        </div>
      </div>

      <div className={clsx("w-full text-tbase overflow-auto")}>
        <table className={clsx("w-full")}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-y border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "px-6 py-5 text-nowrap text-left text-neutral-700 dark:text-neutral-300 opacity-75 text-sm font-medium tracking-wider",
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="group flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="ml-2 text-neutral-500 dark:text-neutral-400 transition-opacity cursor-pointer">
                          {{
                            asc: <FaSortUp />,
                            desc: <FaSortDown />,
                          }[header.column.getIsSorted() as string] || <FaSort />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-brand-50 dark:hover:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700"
                  onClick={() => onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="text-center py-8 text-neutral-500 dark:text-neutral-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      className="w-12 h-12 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <p className="text-base">No data available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 text-text">
        <div className="flex justify-end items-center w-full gap-4">
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalCount={table.getRowCount()}
            pageSize={table.getState().pagination.pageSize}
            onPageChange={(page: number) => table.setPageIndex(page - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;

const options = [
  {
    label: "12H",
    value: "12H",
  },
  {
    label: "1D",
    value: "1D",
  },
  {
    label: "1W",
    value: "1W",
  },
  {
    label: "1M",
    value: "1M",
  },
  {
    label: "3M",
    value: "3M",
  },
  {
    label: "6M",
    value: "6M",
  },
];

const sizeOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];
