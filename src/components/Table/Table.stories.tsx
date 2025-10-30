// @ts-nocheck
import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import Table from "./index";

interface TableDataRow {
  name: string;
  age: number;
  email: string;
  createdDate: string;
}

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  showSearch?: boolean;
  showPageSize?: boolean;
  showDataFilter?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: any) => void;
  title?: string;
  prepend?: React.ReactNode;
  dateField?: string;
  defaultPageSize?: number;
}

export default {
  title: "Components/Table",
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ],
  data: [
    { name: "John Doe", age: 30, email: "john@example.com", createdDate: new Date().toISOString() },
    {
      name: "Jane Smith",
      age: 25,
      email: "jane@example.com",
      createdDate: new Date().toISOString(),
    },
    {
      name: "Bob Johnson",
      age: 35,
      email: "bob@example.com",
      createdDate: new Date().toISOString(),
    },
  ],
  showSearch: true,
  showPageSize: true,
  showDataFilter: true,
  title: "Example Table",
};
