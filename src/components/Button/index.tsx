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
  | "outline";

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
    "inline-flex items-center justify-center transition-all duration-200 hover:opacity-80";

  const variants = {
    // Filled variants (Evergreen + Sky palette)
    primary:
      "bg-brand-700 hover:bg-brand-600 text-white dark:border-neutral-800 shadow-sm hover:shadow-md",
    secondary:
      "dark:bg-neutral-700 bg-neutral-700 hover:bg-neutral-600 text-white dark:border-neutral-800 border shadow-sm hover:shadow-md",
    gold: "bg-accent-500 hover:bg-accent-400 text-white dark:bg-neutral-800 shadow-sm hover:shadow-md",
    dark: "bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white hover:bg-neutral-800 [&_*]:text-white shadow-sm hover:shadow-md",

    // Tonal variants (Evergreen + Sky palette)
    "tonal-primary": "bg-brand-700/10 hover:bg-brand-700/20 text-brand-700 dark:text-brand-400",
    "tonal-secondary":
      "bg-neutral-700/10 hover:bg-neutral-700/20 text-neutral-700 dark:text-neutral-400",
    "tonal-gold": "bg-accent-500/10 hover:bg-accent-500/20 text-accent-500 dark:text-accent-400",

    // Flat variants (Evergreen + Sky palette)
    "flat-primary": "hover:bg-brand-700/5 text-brand-700 dark:text-brand-400",
    "flat-secondary": "hover:bg-neutral-700/5 text-neutral-700 dark:text-neutral-400",
    "flat-gold": "hover:bg-accent-500/5 text-accent-500 dark:text-accent-400",

    // Border variants (Evergreen + Sky palette)
    "border-primary":
      "border-2 border-brand-700 hover:bg-brand-700/5 text-brand-700 dark:text-brand-400",
    "border-secondary":
      "border-2 border-neutral-700 hover:bg-neutral-700/5 text-neutral-700 dark:text-neutral-400",
    "border-gold":
      "border-2 border-accent-500 hover:bg-accent-500/5 text-accent-500 dark:text-accent-400",

    // Outline variant (kept for backward compatibility)
    outline:
      "border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-900/5 hover:bg-neutral-900 dark:hover:bg-white/5",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3",
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
