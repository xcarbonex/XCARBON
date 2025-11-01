import React, { useId } from "react";
import clsx from "clsx";
import Input from "../Input";

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "width"> {
  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Error message to display (sets error state)
   */
  error?: string;

  /**
   * Success message to display (sets success state)
   */
  success?: string;

  /**
   * Input size variant
   */
  variant?: "xs" | "sm" | "md" | "lg" | "fit";

  /**
   * Prefix icon or element
   */
  prefix?: React.ReactNode;

  /**
   * Suffix icon or element
   */
  suffix?: React.ReactNode;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the input
   */
  inputClassName?: string;

  /**
   * Custom className for the label
   */
  labelClassName?: string;

  /**
   * Width of input ("full" or "fit")
   */
  width?: "full" | "fit";
}

/**
 * FormField Component
 *
 * A comprehensive form field component that wraps the Input component
 * with label, required indicator, helper text, and error/success states.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email Address"
 *   type="email"
 *   required
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 *   error={errors.email}
 *   prefix={<FaEnvelope />}
 * />
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helperText,
  error,
  success,
  variant = "md",
  prefix,
  suffix,
  className,
  inputClassName,
  labelClassName,
  id: providedId,
  disabled,
  width = "full",
  ...inputProps
}) => {
  const autoId = useId();
  const id = providedId || autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "typography-label text-sm font-medium",
            "text-neutral-700 dark:text-neutral-300",
            disabled && "opacity-60 cursor-not-allowed",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="text-error-600 dark:text-error-400 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {/* Input */}
      <Input
        id={id}
        variant={variant}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        width={width}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          clsx(error && errorId, (helperText || success) && !error && helperId) || undefined
        }
        inputClassName={clsx(
          error && "!border-error-500 dark:!border-error-400",
          success && "!border-success-500 dark:!border-success-400",
          inputClassName
        )}
        {...inputProps}
      />

      {/* Helper Text */}
      {!error && !success && helperText && (
        <p
          id={helperId}
          className="typography-caption text-xs text-neutral-600 dark:text-neutral-400"
        >
          {helperText}
        </p>
      )}

      {/* Success Message */}
      {!error && success && (
        <div
          id={helperId}
          className="flex items-center gap-1.5 typography-caption text-xs text-success-600 dark:text-success-400"
          role="status"
          aria-live="polite"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          id={errorId}
          className="flex items-center gap-1.5 typography-caption text-xs text-error-600 dark:text-error-400"
          role="alert"
          aria-live="assertive"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
