import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { Typography } from "@/components";
import clsx from "clsx";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items: initialItems, className }) => {
  let items: BreadcrumbItem[] | undefined = initialItems;
  const location = useLocation();

  // If no items are provided, generate from current path
  if (!items) {
    const paths = location.pathname.split("/").filter(Boolean);
    items = paths.map((path, index): BreadcrumbItem => {
      const url = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        path: url,
      };
    });

    // Add home as first item if not empty path
    if (paths.length > 0) {
      items.unshift({ label: "Home", path: "/" });
    }
  }

  if (!items || items.length === 0) return null;

  return (
    <nav className={clsx("flex items-center space-x-2 pb-3", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <IoChevronForward
                className="flex-shrink-0 mx-2 h-4 w-4 text-neutral-400 dark:text-neutral-500"
                aria-hidden="true"
              />
            )}
            {index === items.length - 1 ? (
              <Typography
                variant="body2"
                className="text-neutral-600 dark:text-neutral-400"
                aria-current="page"
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                to={item.path}
                className="text-sm text-brand-700 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
