import React from "react";
import clsx from "clsx";

function Input({ className,inputClassName, suffix, prefix, type, variant='md',  ...rest }) {
  const isCheckbox = type === "checkbox"||type === "radio";

  const sizeVariant = {
    xs : 'h-9',
    sm : 'h-9 md:h-11',
    md : 'h-10 md:h-12',
    lg : 'h-11 md:h-14'
  }
  let classes = clsx(
    "flex flex-nowrap items-center gap-3 w-full px-4 bg-input border rounded-md shadow-sm focus-within:ring-1 focus-within:ring-input",
    sizeVariant[variant],
    className
  );

  let inputClasses = clsx(
    "border-none outline-none focus-within:border-none focus-within:outline-none bg-transparent ",
    {
      "w-4 h-4": isCheckbox,
      "w-full h-full": !isCheckbox,
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
}

export default Input;


