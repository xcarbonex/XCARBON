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
  // Check if this is a number/financial input
  const isNumericInput =
    type === "number" || rest.inputMode === "numeric" || rest.inputMode === "decimal";

  let classes = clsx(
    "flex flex-nowrap items-center gap-3 px-4",
    // Glassmorphism
    "backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80",
    // Border
    "border-2 border-neutral-300 dark:border-neutral-700",
    // Focus state with glow
    "focus-within:border-brand-500 dark:focus-within:border-brand-400",
    "focus-within:ring-4 focus-within:ring-brand-500/20 dark:focus-within:ring-brand-400/20",
    "focus-within:shadow-lg focus-within:shadow-brand-500/10",
    // Hover
    "hover:border-neutral-400 dark:hover:border-neutral-600",
    // Transitions
    "transition-all duration-200",
    // Rounded
    "rounded-xl",
    // Disabled state
    {
      "opacity-60 cursor-not-allowed bg-neutral-100/50 dark:bg-neutral-800/50": rest.disabled,
    },
    sizeVariant[variant],
    widthVariant[width],
    className
  );

  let inputClasses = clsx(
    "border-none outline-none focus-within:border-none focus-within:outline-none bg-transparent",
    "placeholder-neutral-400 dark:placeholder-neutral-500",
    "text-neutral-900 dark:text-white",
    {
      "w-4 h-4": isCheckbox,
      "w-full h-full": !isCheckbox,
      "cursor-not-allowed": rest.disabled,
      // Financial/numeric inputs use monospace font
      "font-mono font-semibold text-lg": isNumericInput && !isCheckbox,
      "font-sans": !isNumericInput && !isCheckbox,
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
