import React from 'react';
import clsx from 'clsx';
import { Typography } from '@/components';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  to,
  type = 'button',
  rounded = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center transition-all duration-200";
  
  const variants = {
    // Filled variants
    primary: "bg-btn hover:bg-btn-500 text-white dark:border-[#363638] shadow-sm hover:shadow-md",
    secondary: "dark:bg-btn bg-[#4C6663] hover:bg-opacity-90 text-white dark:border-[#363638] border shadow-sm hover:shadow-md",
    gold: "bg-[#C2A57B] hover:bg-opacity-90 text-white dark:bg-[#3B3B3B] shadow-sm hover:shadow-md",
    dark: "bg-black text-white dark:bg-black dark:text-white hover:bg-opacity-90 [&_*]:text-white shadow-sm hover:shadow-md",
    
    // Tonal variants
    'tonal-primary': "bg-btn/10 hover:bg-btn/20 text-btn dark:text-btn-300",
    'tonal-secondary': "bg-[#4C6663]/10 hover:bg-[#4C6663]/20 text-[#4C6663] dark:text-[#4C6663]/80",
    'tonal-gold': "bg-[#C2A57B]/10 hover:bg-[#C2A57B]/20 text-[#C2A57B] dark:text-[#C2A57B]/80",
    
    // Flat variants
    'flat-primary': "hover:bg-btn/5 text-btn dark:text-btn-300",
    'flat-secondary': "hover:bg-[#4C6663]/5 text-[#4C6663] dark:text-[#4C6663]/80",
    'flat-gold': "hover:bg-[#C2A57B]/5 text-[#C2A57B] dark:text-[#C2A57B]/80",
    
    // Border variants
    'border-primary': "border-2 border-btn hover:bg-btn/5 text-btn dark:text-btn-300",
    'border-secondary': "border-2 border-[#4C6663] hover:bg-[#4C6663]/5 text-[#4C6663] dark:text-[#4C6663]/80",
    'border-gold': "border-2 border-[#C2A57B] hover:bg-[#C2A57B]/5 text-[#C2A57B] dark:text-[#C2A57B]/80",
    
    // Outline variant (kept for backward compatibility)
    outline: "border border-black dark:border-[#363638] hover:bg-opacity-5 hover:bg-black dark:hover:bg-white/5",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3"
  };

  const buttonClasses = clsx(
    baseClasses,
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    rounded ? "rounded-full" : "rounded-lg",
    // Apply variant styles first, then custom className to allow overrides
    variants[variant],
    className
  );

  const renderIcon = (iconComponent) => {
    if (!iconComponent) return null;
    
    // If icon is a React component
    if (typeof iconComponent === 'function' || React.isValidElement(iconComponent)) {
      return (
        <span className={clsx(
          "flex items-center justify-center",
          children && (iconPosition === 'left' ? "mr-2" : "ml-2")
        )}>
          {iconComponent}
        </span>
      );
    }
    
    // If icon is an image path
    return (
      <span className={clsx(
        "w-4 h-4",
        children && (iconPosition === 'left' ? "mr-2" : "ml-2")
      )}>
        <img src={iconComponent} alt="" className="w-full h-full" />
      </span>
    );
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && renderIcon(icon)}
        {children}
      {icon && iconPosition === 'right' && renderIcon(icon)}
    </>
  );

  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...props}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button; 