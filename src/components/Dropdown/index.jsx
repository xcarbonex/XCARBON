import {clsx} from "clsx";
import {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import {FixedSizeList as List} from "react-window";
import {Input, Button, Loader} from "..";
import DropdownRow from "./DropdownRow";
const OPTION_HEIGHT = 40;
const MAX_VISIBLE_OPTIONS = 8;

const Dropdown = ({
  options = [],
  selectedOption = null,
  onSelect = () => {},
  className,
  customInput = false,
  searchField=true,
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
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedState, setSelectedState] = useState(multiSelect ? [] : null);
  const dropdownRef = useRef(null);

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
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setCustomValue("");
        setFilteredOptions(options);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [options]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    if (multiSelect) {
      const allOptions = options.filter((opt) => opt.value !== "_select_all_");
      let updated;
      if (option.value === "_select_all_") {
        updated = selectedState.length === allOptions.length ? [] : allOptions;
      } else {
        updated = selectedState.some((sel) => sel.value === option.value)
          ? selectedState.filter((sel) => sel.value !== option.value)
          : [...selectedState, option];
      }
      setSelectedState(updated);
      onSelect(updated);
    } else {
      setSelectedState(option);
      onSelect(option);
      setIsOpen(false);
    }
  };

  const handleSearch = (value) => {
    setCustomValue(value);
    const q = value.toLowerCase();
    setFilteredOptions(
      options.filter((opt) => opt.label.toLowerCase().includes(q))
    );
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
      return label({selectedState, options});
    }

    if (multiSelect) {
      return selectedState.length > 0
        ? `${label}: ${selectedState.length}`
        : label;
    }

    const selected = options.find((opt) => opt.value === selectedState?.value);
    return selected?.label || label || "Select an option...";
  };

  const listOptions =
    multiSelect && filteredOptions.length > 0
      ? enableSelectAll
        ? [{label: "Select All", value: "_select_all_"}, ...filteredOptions]
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
      style={{userSelect: "none"}}
    >
      <Button
        type="button"
        size="xs"
        variant="flat-secondary"
        className={clsx(
          "rounded p-1 cursor-pointer border focus:outline-none",
          {"w-full": !icon},
          buttonClassName
        )}
        onClick={handleToggle}
      >
        {icon || getButtonLabel()}
      </Button>

      {isOpen && (
        <div
          className={clsx(
            "absolute right-0 bg-secondary border rounded shadow-lg z-20 p-1",
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
                        height={
                          Math.min(listOptions.length, MAX_VISIBLE_OPTIONS) *
                          OPTION_HEIGHT
                        }
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
                       {searchField && <Input
                          value={customValue}
                          onChange={(e) => handleSearch(e.target.value)}
                          placeholder={placeholder}
                          variant="xs"
                          className="w-full px-2 py-1 mb-1 border border-gray-300 rounded-md text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />}
                        <div className="flex justify-between gap-2 w-full">
                          <Button
                            type="button"
                            size="xs"
                            onClick={handleResetFilter}
                            className="mt-1 w-fit h-full px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            size="xs"
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ),
  selectedOption: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      })
    ),
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onSelect: PropTypes.func,
  className: PropTypes.string,
  customInput: PropTypes.bool,
  buttonClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  renderOption: PropTypes.func,
  width: PropTypes.number,
  onSearchApply: PropTypes.func,
  multiSelect: PropTypes.bool,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Dropdown;
