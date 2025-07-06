import React from "react";
import Select from "react-select";

const SelectField = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  ...rest
}) => {
  // Custom styles for react-select to match Tailwind config
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--bg-input)", // Matches #4C666326 (light) or #FFFFFF14 (dark)
      borderColor: "var(--border)",
      borderRadius: "0.375rem", // Matches rounded-md
      padding: ".3rem", // Matches px-3 py-3
      boxShadow: "none", // Removed conditional box shadow to fix linter error
      "&:hover": {
        borderColor: "var(--border)",
      },
      color: "var(--text-secondary)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-secondary)",
      borderColor: "var(--bg-input)",
      marginTop: "0.25rem", // Matches mt-1
      zIndex: 10,
      boxShadow: "0 0 0 1px var(--border)",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-input)",
      padding: ".5rem", // Matches px-3 py-2
      borderRadius: ".2rem",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "var(--bg-tertiary)",
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
    }),
  };

  return (
    <div className="w-full">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        placeholder={placeholder}
        className="text-secondary"
        classNamePrefix="react-select"
        {...rest}
      />
    </div>
  );
};

export default SelectField;
