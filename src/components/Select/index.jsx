import clsx from "clsx";
import React from "react";
import Select from "react-select";

const SelectField = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  formatOptionLabel,
  className,
  menuIsOpen,
  ...rest
}) => {
  // Custom styles for react-select to match Tailwind config
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-secondary)",
      borderColor: "var(--bg-input)",
      marginTop: "0.25rem", // Matches mt-1
      zIndex: 10,
      boxShadow: "0 0 0 1px var(--border)",
    }),
    option: (provided, state) => ({
      // Include state for disabled options
      ...provided,
      backgroundColor: state.isDisabled
        ? "var(--bg-disabled)"
        : "var(--bg-secondary)",
      color: state.isDisabled ? "var(--text-disabled)" : "var(--text-input)",
      padding: ".5rem", // Matches px-3 py-2
      borderRadius: ".2rem",
      cursor: state.isDisabled ? "not-allowed" : "pointer", // Cursor for options
      "&:hover": {
        backgroundColor: state.isDisabled
          ? "var(--bg-disabled)"
          : "var(--bg-input)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-secondary)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      scrollBehavior: "smooth",
    }),
    control: (provided, state) => {
      return {
        ...provided,
        backgroundColor: "var(--bg-input)", // Matches #4C666326 (light) or #FFFFFF14 (dark)
        borderColor: "var(--border)",
        borderRadius: "0.375rem", // Matches rounded-md
        padding: ".3rem", // Matches px-3 py-3
        boxShadow: "none",
        "&:hover": {
          borderColor: "var(--border)",
        },
        color: "var(--text-secondary)",
        opacity: state.isDisabled ? 0.5 : 1, // Adjust opacity for disabled state
        cursor: state.isDisabled ? "not-allowed" : "pointer", // Conditional cursor
      };
    },
  };

  return (
    <div className="w-full">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        placeholder={placeholder}
        className={clsx("text-secondary", className)}
        classNamePrefix="react-select"
        formatOptionLabel={formatOptionLabel}
        menuIsOpen={menuIsOpen}
        {...rest}
      />
    </div>
  );
};

export default SelectField;
