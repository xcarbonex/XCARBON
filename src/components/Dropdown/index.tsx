import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
// @ts-expect-error - react-window types not fully compatible
import { FixedSizeList as List } from "react-window";
import { Input, Button, Loader } from "..";
import DropdownRow, { DropdownOption } from "./DropdownRow";

const OPTION_HEIGHT = 40;
const MAX_VISIBLE_OPTIONS = 8;

interface DropdownLabelFunctionParams {
  selectedState: DropdownOption | DropdownOption[] | null;
  options: DropdownOption[];
}

interface DropdownProps {
  options?: DropdownOption[];
  selectedOption?: DropdownOption | DropdownOption[] | null;
  onSelect?: (selected: DropdownOption | DropdownOption[] | null) => void;
  className?: string;
  customInput?: boolean;
  searchField?: boolean;
  buttonClassName?: string;
  dropdownClassName?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  renderOption?: (params: {
    option: DropdownOption;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
  }) => React.ReactNode;
  width?: number;
  onSearchApply?: (
    values: (string | number)[],
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  label?: string | ((params: DropdownLabelFunctionParams) => string);
  multiSelect?: boolean;
  onClick?: () => void;
  onReset?: (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
  isLoading?: boolean;
  enableSelectAll?: boolean;
  children?:
    | React.ReactNode
    | ((setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode);
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  selectedOption = null,
  onSelect = () => {},
  className,
  customInput = false,
  searchField = true,
  buttonClassName = "",
  dropdownClassName = "",
  placeholder = "Custom",
  icon,
  renderOption,
  width = 35,
  onSearchApply = () => {},
  label = "Select",
  multiSelect = false,
  onClick = () => {},
  onReset = () => {},
  isLoading = false,
  enableSelectAll = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>(options);
  const [selectedState, setSelectedState] = useState<DropdownOption | DropdownOption[] | null>(
    multiSelect ? [] : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // sync filtered options + selection when props change
  useEffect(() => {
    setFilteredOptions(options);
    setSelectedState(() => {
      if (multiSelect) {
        return Array.isArray(selectedOption) ? selectedOption : [];
      }
      return selectedOption ?? null;
    });
  }, [options, selectedOption, multiSelect]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setCustomValue("");
        setFilteredOptions(options);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: DropdownOption) => {
    if (multiSelect) {
      const allOptions = options.filter((opt) => opt.value !== "_select_all_");
      let updated: DropdownOption[];
      const currentSelection = Array.isArray(selectedState) ? selectedState : [];

      if (option.value === "_select_all_") {
        updated = currentSelection.length === allOptions.length ? [] : allOptions;
      } else {
        updated = currentSelection.some((sel: DropdownOption) => sel.value === option.value)
          ? currentSelection.filter((sel: DropdownOption) => sel.value !== option.value)
          : [...currentSelection, option];
      }
      setSelectedState(updated);
      onSelect(updated);
    } else {
      setSelectedState(option);
      onSelect(option);
      setIsOpen(false);
    }
  };

  const handleSearch = (value: string) => {
    setCustomValue(value);
    const q = value.toLowerCase();
    setFilteredOptions(options.filter((opt) => opt.label.toLowerCase().includes(q)));
  };

  const handleCustomSubmit = () => {
    onSearchApply(
      filteredOptions.map((opt) => opt.value),
      setIsOpen
    );
  };

  const handleResetFilter = () => {
    setCustomValue("");
    // setFilteredOptions(initialOptions);
    setSelectedState(multiSelect ? [] : null);
    onSelect(multiSelect ? [] : null); // notify parent of reset
    onReset(setIsOpen);
  };

  const getButtonLabel = () => {
    if (typeof label === "function") {
      return label({ selectedState, options });
    }

    if (multiSelect) {
      const arrayState = Array.isArray(selectedState) ? selectedState : [];
      return arrayState.length > 0 ? `${label}: ${arrayState.length}` : label;
    }

    const singleState = !Array.isArray(selectedState) ? selectedState : null;
    const selected = options.find((opt) => opt.value === singleState?.value);
    return selected?.label || label || "Select an option...";
  };

  const listOptions =
    multiSelect && filteredOptions.length > 0
      ? enableSelectAll
        ? [{ label: "Select All", value: "_select_all_" }, ...filteredOptions]
        : filteredOptions
      : filteredOptions;

  const listData = {
    options: listOptions,
    selectedOptionState: selectedState,
    handleOptionSelect,
    renderOption,
    multiSelect,
  };

  return (
    <div
      className={clsx("relative text-tbase min-w-[2.8rem]", className)}
      ref={dropdownRef}
      style={{ userSelect: "none" }}
    >
      <Button
        type="button"
        size="sm"
        variant="flat-secondary"
        className={clsx(
          "rounded p-1 cursor-pointer border focus:outline-none",
          { "w-full": !icon },
          buttonClassName
        )}
        onClick={handleToggle}
      >
        {icon || getButtonLabel()}
      </Button>

      {isOpen && (
        <div
          className={clsx(
            "absolute right-0 bg-white dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 z-20 p-2",
            dropdownClassName
          )}
        >
          {isLoading && <Loader />}
          {!isLoading &&
            (typeof children === "function"
              ? children(setIsOpen)
              : children || (
                  <ul className="space-y-1 w-fit text-center">
                    {listOptions.length > 0 && (
                      <List
                        height={Math.min(listOptions.length, MAX_VISIBLE_OPTIONS) * OPTION_HEIGHT}
                        itemCount={listOptions.length}
                        itemSize={OPTION_HEIGHT}
                        width={width}
                        itemData={listData}
                        scrollToAlignment="center"
                      >
                        {DropdownRow}
                      </List>
                    )}

                    {customInput && (
                      <li className="pt-2 w-full">
                        {searchField && (
                          <Input
                            value={customValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={placeholder}
                            variant="xs"
                            className="w-full px-2 py-1 mb-1 border border-neutral-300 rounded-md text-sm text-center focus:outline-none focus:ring-1 focus:ring-brand-700"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <div className="flex justify-between gap-2 w-full">
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleResetFilter}
                            className="mt-1 w-fit h-full px-2 py-1 bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 rounded text-sm hover:bg-neutral-400 dark:hover:bg-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleCustomSubmit}
                            className="w-fit px-2 py-1 text-sm rounded-md"
                          >
                            Apply
                          </Button>
                        </div>
                      </li>
                    )}
                  </ul>
                ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
