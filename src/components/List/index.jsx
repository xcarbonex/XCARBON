import React from "react";
import {Typography} from "..";

function List({
  dataSource: externalDataSource = [], // Rename to avoid conflict if `items` and `data` are provided
  renderItem,
  header,
  footer,
  bordered = false,
  loading = false,
  size = "default", // "small", "default", "large"
  split = true,
  items = [], // New prop for defining list structure
  data = {}, // New prop for data to be displayed
}) {
  // Determine the effective dataSource
  const effectiveDataSource =
    items.length > 0 && Object.keys(data).length > 0
      ? items.map((item) => ({
          ...item,
          value:
            data[item.key] !== null && data[item.key] !== undefined
              ? typeof data[item.key] === "object"
                ? JSON.stringify(data[item.key])
                : data[item.key]
              : "-",
        }))
      : externalDataSource;

  const baseClasses = "border-gray-200 dark:border-gray-700 h-fit";
  const borderClasses = bordered ? `border ${baseClasses} rounded-md` : "";

  const sizeClasses = {
    small: "py-1 px-2 text-sm",
    default: "py-2 px-3 text-base",
    large: "py-3 px-4 text-lg",
  };

  const itemClasses = `${sizeClasses[size]} ${
    split ? `border-b ${baseClasses}` : ""
  } last:border-b-0`;

  if (loading) {
    return (
      <div className={`flex justify-center items-center ${borderClasses} p-4`}>
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (effectiveDataSource.length === 0) {
    return (
      <div className={`flex justify-center items-center ${borderClasses} p-4`}>
        <Typography>No Data</Typography>
      </div>
    );
  }

  return (
    <div className={`${borderClasses}`}>
      {header && <div className={`font-semibold ${itemClasses}`}>{header}</div>}
      {effectiveDataSource.map((item, index) => (
        <div key={item.id || index} className={itemClasses}>
          {item.render && typeof item.render === "function" ? (
            item.render(item, index)
          ) : renderItem ? (
            renderItem(item, index)
          ) : (
            <Typography>{JSON.stringify(item)}</Typography>
          )}
        </div>
      ))}
      {footer && <div className={`font-semibold ${itemClasses}`}>{footer}</div>}
    </div>
  );
}

export default List;
