import React from "react";
import { Typography } from "..";

interface ListItem {
  id?: string | number;
  key?: string;
  value?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (item: any, index: number) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type ListSize = "small" | "default" | "large";

interface ListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem?: (item: any, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  loading?: boolean;
  size?: ListSize;
  split?: boolean;
  items?: ListItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}

const List: React.FC<ListProps> = ({
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
}) => {
  // Determine the effective dataSource
  const effectiveDataSource =
    items.length > 0 && Object.keys(data).length > 0
      ? items.map((item) => {
          const key = item.key;
          const dataValue = key ? data[key] : undefined;
          return {
            ...item,
            value:
              dataValue !== null && dataValue !== undefined
                ? typeof dataValue === "object"
                  ? JSON.stringify(dataValue)
                  : dataValue
                : "-",
          };
        })
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
};

export default List;
