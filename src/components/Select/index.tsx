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
      marginTop: "0.25rem",
      zIndex: 10,
      boxShadow: "0 0 0 1px var(--neutral-700)",
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
      padding: ".5rem",
      borderRadius: ".2rem",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
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
      padding: 0,
      scrollBehavior: "smooth",
    }),
    control: (provided, state) => {
      return {
        ...provided,
        backgroundColor: "var(--neutral-50)",
        borderColor: "var(--neutral-300)",
        borderRadius: "0.375rem",
        padding: ".3rem",
        boxShadow: state.isFocused ? `0 0 0 3px var(--brand-700, rgba(22, 101, 52, 0.1))` : "none",
        "&:hover": {
          borderColor: "var(--brand-700)",
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
