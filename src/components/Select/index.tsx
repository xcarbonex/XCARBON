import clsx from "clsx";
import React from "react";
import Select, {
  Props as ReactSelectProps,
  StylesConfig,
  SingleValue,
  MultiValue,
} from "react-select";

interface SelectOption {
  value: string | number;
  label: string;
  [key: string]: unknown;
}

interface SelectFieldProps extends Omit<ReactSelectProps<SelectOption>, "styles" | "onChange"> {
  options?: SelectOption[];
  value?: SelectOption | null;
  onChange?: (option: SelectOption | null) => void;
  placeholder?: string;
  formatOptionLabel?: (option: SelectOption) => React.ReactNode;
  className?: string;
  menuIsOpen?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  formatOptionLabel,
  className,
  menuIsOpen,
  ...rest
}) => {
  // Custom styles for react-select to match brand tokens
  const customStyles: StylesConfig<SelectOption> = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--neutral-900)",
      color: "var(--neutral-50)",
      borderColor: "var(--neutral-700)",
      marginTop: "0.5rem",
      zIndex: 10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.5rem",
      border: "1px solid var(--neutral-700/50)",
      backdropFilter: "blur(12px)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled
        ? "var(--neutral-800)"
        : state.isSelected
          ? "var(--brand-700)"
          : "var(--neutral-900)",
      color: state.isDisabled
        ? "var(--neutral-600)"
        : state.isSelected
          ? "var(--neutral-50)"
          : "var(--neutral-50)",
      padding: "0.625rem 0.75rem",
      borderRadius: "0.375rem",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: state.isDisabled
          ? "var(--neutral-800)"
          : state.isSelected
            ? "var(--brand-600)"
            : "var(--neutral-800)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--neutral-900)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--neutral-500)",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0.5rem",
      scrollBehavior: "smooth",
    }),
    control: (provided, state) => {
      return {
        ...provided,
        backgroundColor: "white",
        borderColor: state.isFocused ? "var(--brand-700)" : "var(--neutral-300)",
        borderRadius: "0.5rem",
        padding: "0.25rem",
        boxShadow: state.isFocused
          ? "0 0 0 2px rgba(22, 101, 52, 0.1)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: state.isFocused ? "var(--brand-700)" : "var(--neutral-400)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
        color: "var(--neutral-900)",
        opacity: state.isDisabled ? 0.5 : 1,
        cursor: state.isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  const handleChange = (newValue: SingleValue<SelectOption> | MultiValue<SelectOption>) => {
    if (onChange) {
      // Assuming single select mode
      onChange(newValue as SelectOption | null);
    }
  };

  return (
    <div className="w-full">
      <Select
        options={options}
        value={value}
        onChange={handleChange}
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
