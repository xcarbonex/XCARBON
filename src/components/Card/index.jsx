import React from "react";
import {Typography} from "..";
import PropTypes from "prop-types";

const Card = ({
  title,
  extra,
  children,
  bordered = true,
  loading = false,
  size = "default", // "default", "small"
  className = "",
  bodyClassName = "",
  headClassName = "",
  actions, // New prop for action buttons
  footer, // New prop for footer content
  ...props
}) => {
  const baseClasses = "bg-white dark:bg-dark-secondary rounded-lg shadow-sm";
  const borderClasses = bordered
    ? "border border-gray-200 dark:border-gray-700"
    : "";

  const sizeClasses = {
    default: "p-4",
    small: "p-3",
  };

  const headPaddingClasses = {
    default: "px-4 pt-4",
    small: "px-3 pt-3",
  };

  const actionClasses =
    "border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 px-4"; // Style for actions
  const footerClasses =
    "border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 px-4"; // Style for footer

  if (loading) {
    return (
      <div
        className={`animate-pulse ${baseClasses} ${borderClasses} ${sizeClasses[size]} ${className}`.trim()}
        {...props}
      >
        <div
          className={`flex justify-between items-center mb-4 ${headPaddingClasses[size]}`}
        >
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${borderClasses} ${className}`.trim()}
      {...props}
    >
      {(title || extra) && (
        <div
          className={`flex   flex-col border-b text-tbase border-gray-200 dark:border-gray-700 ${headPaddingClasses[size]} pb-3 mb-3 ${headClassName}`.trim()}
        >
          {title && (
            <Typography variant="h6" className="text-tbase font-semibold">
              {title}
            </Typography>
          )}
          {extra && <div className="ml-auto">{extra}</div>}
        </div>
      )}
      <div className={`${sizeClasses[size]} ${bodyClassName}`.trim()}>
        {children}
      </div>
      {actions && actions.length > 0 && (
        <div className={`${actionClasses} flex justify-end gap-2`}>
          {actions.map((action, index) => (
            <React.Fragment key={index}>{action}</React.Fragment>
          ))}
        </div>
      )}
      {footer && <div className={`${footerClasses}`}>{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  children: PropTypes.node,
  bordered: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["default", "small"]),
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  headClassName: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node), // PropType for actions
  footer: PropTypes.node, // PropType for footer
};

export default Card;
