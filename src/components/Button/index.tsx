import React, { useRef, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "gold"
  | "dark"
  | "tonal-primary"
  | "tonal-secondary"
  | "tonal-gold"
  | "flat-primary"
  | "flat-secondary"
  | "flat-gold"
  | "border-primary"
  | "border-secondary"
  | "border-gold"
  | "outline"
  | "success"
  | "warning"
  | "error"
  | "info";

type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface RippleEffect {
  key: number;
  style: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode | string;
  iconPosition?: IconPosition;
  disabled?: boolean;
  fullWidth?: boolean;
  to?: string;
  type?: "button" | "submit" | "reset";
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  to,
  type = "button",
  rounded = false,
  ...props
}) => {
  // Ripple state
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const rippleContainer = useRef<HTMLSpanElement>(null);

  const baseClasses =
    "inline-flex items-center justify-center transition-all duration-200 font-semibold relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-4";

  const variants = {
    // Filled variants (Evergreen + Sky palette) - Premium DeFi styling
    primary:
      "bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white shadow-lg shadow-brand-700/30 hover:shadow-xl hover:shadow-brand-700/40 active:scale-[0.98] focus-visible:outline-brand-400 focus-visible:ring-brand-400/20",
    secondary:
      "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-300 dark:border-neutral-600 shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",
    gold: "bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-300 text-white shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 active:scale-[0.98] focus-visible:outline-accent-400 focus-visible:ring-accent-400/20",
    dark: "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 [&_*]:text-white shadow-lg hover:shadow-xl active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",

    // Tonal variants (Evergreen + Sky palette) - Soft backgrounds
    "tonal-primary":
      "bg-brand-100 dark:bg-brand-900/20 hover:bg-brand-200 dark:hover:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-semibold active:scale-[0.98] focus-visible:outline-brand-400 focus-visible:ring-brand-400/20",
    "tonal-secondary":
      "bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",
    "tonal-gold":
      "bg-accent-100 dark:bg-accent-900/20 hover:bg-accent-200 dark:hover:bg-accent-900/30 text-accent-600 dark:text-accent-400 font-semibold active:scale-[0.98] focus-visible:outline-accent-400 focus-visible:ring-accent-400/20",

    // Flat variants (Evergreen + Sky palette) - Text buttons
    "flat-primary":
      "hover:bg-brand-50 dark:hover:bg-brand-900/10 text-brand-700 dark:text-brand-400 font-semibold active:scale-[0.98] focus-visible:outline-brand-400 focus-visible:ring-brand-400/20",
    "flat-secondary":
      "hover:bg-neutral-100 dark:hover:bg-neutral-800/30 text-neutral-700 dark:text-neutral-300 font-semibold active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",
    "flat-gold":
      "hover:bg-accent-50 dark:hover:bg-accent-900/10 text-accent-600 dark:text-accent-400 font-semibold active:scale-[0.98] focus-visible:outline-accent-400 focus-visible:ring-accent-400/20",

    // Border variants (Evergreen + Sky palette) - Outlined buttons
    "border-primary":
      "border-2 border-brand-700 dark:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 text-brand-700 dark:text-brand-400 font-semibold active:scale-[0.98] focus-visible:outline-brand-400 focus-visible:ring-brand-400/20",
    "border-secondary":
      "border-2 border-neutral-400 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 text-neutral-700 dark:text-neutral-300 font-semibold active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",
    "border-gold":
      "border-2 border-accent-500 dark:border-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/10 text-accent-600 dark:text-accent-400 font-semibold active:scale-[0.98] focus-visible:outline-accent-400 focus-visible:ring-accent-400/20",

    // Semantic variants (Financial - Premium DeFi)
    success:
      "bg-gradient-to-r from-success-600 to-success-500 hover:from-success-500 hover:to-success-400 text-white shadow-lg shadow-success-600/30 hover:shadow-xl hover:shadow-success-600/40 active:scale-[0.98] focus-visible:outline-success-400 focus-visible:ring-success-400/20",
    warning:
      "bg-gradient-to-r from-warning-500 to-warning-400 hover:from-warning-400 hover:to-warning-300 text-white shadow-lg shadow-warning-500/30 hover:shadow-xl hover:shadow-warning-500/40 active:scale-[0.98] focus-visible:outline-warning-400 focus-visible:ring-warning-400/20",
    error:
      "bg-gradient-to-r from-error-600 to-error-500 hover:from-error-500 hover:to-error-400 text-white shadow-lg shadow-error-600/30 hover:shadow-xl hover:shadow-error-600/40 active:scale-[0.98] focus-visible:outline-error-400 focus-visible:ring-error-400/20",
    info: "bg-gradient-to-r from-info-600 to-info-500 hover:from-info-500 hover:to-info-400 text-white shadow-lg shadow-info-600/30 hover:shadow-xl hover:shadow-info-600/40 active:scale-[0.98] focus-visible:outline-info-400 focus-visible:ring-info-400/20",

    // Outline variant (kept for backward compatibility)
    outline:
      "border-2 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800/30 text-neutral-700 dark:text-neutral-300 active:scale-[0.98] focus-visible:outline-neutral-400 focus-visible:ring-neutral-400/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
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

  const renderIcon = (iconComponent: React.ReactNode | string) => {
    if (!iconComponent) return null;

    // If icon is a React component
    if (typeof iconComponent === "function" || React.isValidElement(iconComponent)) {
      return (
        <span
          className={clsx(
            "flex items-center justify-center",
            children && (iconPosition === "left" ? "mr-2" : "ml-2")
          )}
        >
          {iconComponent}
        </span>
      );
    }

    // If icon is an image path (string)
    if (typeof iconComponent === "string") {
      return (
        <span className={clsx("w-4 h-4", children && (iconPosition === "left" ? "mr-2" : "ml-2"))}>
          <img src={iconComponent} alt="" className="w-full h-full" />
        </span>
      );
    }

    return null;
  };

  // Ripple effect handler
  const createRipple = (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    const container = rippleContainer.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = {
      key: Date.now(),
      style: {
        top: y + "px",
        left: x + "px",
        width: size + "px",
        height: size + "px",
      },
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 500); // Duration matches CSS
  };

  const content = (
    <>
      {/* Ripple container */}
      <span
        ref={rippleContainer}
        className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit"
        style={{ zIndex: 0 }}
      >
        {ripples.map((ripple) => (
          <span key={ripple.key} className="ripple-effect" style={ripple.style} />
        ))}
      </span>
      <span className="relative z-10 flex items-center justify-center w-full h-full">
        {icon && iconPosition === "left" && renderIcon(icon)}
        {children}
        {icon && iconPosition === "right" && renderIcon(icon)}
      </span>
    </>
  );

  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses + " relative overflow-hidden"}
        onPointerDown={createRipple as React.PointerEventHandler<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses + " relative overflow-hidden"}
      disabled={disabled}
      onPointerDown={createRipple}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
