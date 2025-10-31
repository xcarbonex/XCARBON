import React from "react";
import { Typography } from "..";

type CardSize = "default" | "small";

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  bordered?: boolean;
  loading?: boolean;
  size?: CardSize;
  className?: string;
  bodyClassName?: string;
  headClassName?: string;
  actions?: React.ReactNode[];
  footer?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      size = "default",
      loading = false,
      title,
      extra,
      bodyClassName = "",
      headClassName = "",
      actions,
      footer,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg shadow-neutral-900/5 dark:shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/10 dark:hover:shadow-neutral-900/30 transition-shadow duration-300 border border-neutral-200/50 dark:border-neutral-700/30 overflow-hidden";

    const sizeClasses = {
      default: "p-6",
      small: "p-4",
    };

    const headPaddingClasses = {
      default: "px-6 pt-6",
      small: "px-4 pt-4",
    };

    const actionClasses =
      "border-t border-neutral-200/50 dark:border-neutral-700/30 pt-4 mt-4 px-6"; // Style for actions
    const footerClasses =
      "border-t border-neutral-200/50 dark:border-neutral-700/30 pt-4 mt-4 px-6"; // Style for footer

    if (loading) {
      return (
        <div
          className={`animate-pulse ${baseClasses} ${sizeClasses[size]} ${className}`.trim()}
          ref={ref}
          {...props}
        >
          <div className={`flex justify-between items-center mb-4 ${headPaddingClasses[size]}`}>
            <div className="h-6 bg-neutral-300/50 dark:bg-neutral-600/50 rounded-lg w-1/3"></div>
            <div className="h-6 bg-neutral-300/50 dark:bg-neutral-600/50 rounded-lg w-1/6"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-neutral-300/50 dark:bg-neutral-600/50 rounded-lg"></div>
            <div className="h-4 bg-neutral-300/50 dark:bg-neutral-600/50 rounded-lg w-5/6"></div>
            <div className="h-4 bg-neutral-300/50 dark:bg-neutral-600/50 rounded-lg w-4/6"></div>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={`${baseClasses} ${className}`.trim()} {...props}>
        {(title || extra) && (
          <div
            className={`flex flex-row items-center justify-between border-b border-neutral-200/50 dark:border-neutral-700/30 ${headPaddingClasses[size]} pb-4 mb-4 ${headClassName}`.trim()}
          >
            {title && (
              <Typography
                variant="h6"
                className="text-neutral-900 dark:text-white font-bold text-lg"
              >
                {title}
              </Typography>
            )}
            {extra && <div className="flex-shrink-0">{extra}</div>}
          </div>
        )}
        <div className={`${sizeClasses[size]} ${bodyClassName}`.trim()}>{children}</div>
        {actions && actions.length > 0 && (
          <div className={`${actionClasses} flex justify-end gap-3`}>
            {actions.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </div>
        )}
        {footer && <div className={`${footerClasses}`}>{footer}</div>}
      </div>
    );
  }
);

export default Card;
