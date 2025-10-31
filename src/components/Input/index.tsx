import React from "react";
import clsx from "clsx";

type InputVariant = "xs" | "sm" | "md" | "lg" | "fit";
type InputWidth = "full" | "fit";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  className?: string;
  inputClassName?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  type?: string;
  variant?: InputVariant;
  width?: InputWidth;
}

const Input: React.FC<InputProps> = ({
  className,
  inputClassName,
  suffix,
  prefix,
  type,
  variant = "md",
  width = "full",
  ...rest
}) => {
  const isCheckbox = type === "checkbox" || type === "radio";

  const sizeVariant = {
    xs: "h-9",
    sm: "h-9 md:h-11",
    md: "h-10 md:h-12",
    lg: "h-11 md:h-14",
    fit: "h-fit",
  };
  const widthVariant = {
    full: "w-full",
    fit: "w-fit",
  };
  let classes = clsx(
    "flex flex-nowrap items-center gap-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus-within:ring-1 focus-within:ring-brand-700",
    {
      "opacity-70 cursor-not-allowed": rest.disabled,
    },
    sizeVariant[variant],
    widthVariant[width],
    className
  );

  let inputClasses = clsx(
    "border-none outline-none focus-within:border-none focus-within:outline-none bg-transparent ",
    {
      "w-4 h-4": isCheckbox,
      "w-full h-full": !isCheckbox,
      "cursor-not-allowed": rest.disabled,
    },
    inputClassName
  );

  return (
    <div className={classes}>
      {prefix}
      <input type={type} className={inputClasses} {...rest} />
      {suffix}
    </div>
  );
};

export default Input;
