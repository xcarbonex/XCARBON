import React from "react";
import List from ".";
import { Typography } from "..";

export default {
  title: "Components/List",
  component: List,
  argTypes: {
    dataSource: {
      control: "object",
      description: "Data source for the list",
    },
    renderItem: {
      control: false,
      description: "Function to render list items",
    },
    header: {
      control: "text",
      description: "Header of the list",
    },
    footer: {
      control: "text",
      description: "Footer of the list",
    },
    bordered: {
      control: "boolean",
      description: "Whether the list has borders",
    },
    loading: {
      control: "boolean",
      description: "Whether the list is in a loading state",
    },
    size: {
      control: {
        type: "select",
        options: ["small", "default", "large"],
      },
      description: "Size of the list",
    },
    split: {
      control: "boolean",
      description: "Whether to show a split line between list items",
    },
  },
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataSource: [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ],
  renderItem: (item) => <Typography>{item.name}</Typography>,
  header: "List Header",
  footer: "List Footer",
  bordered: true,
  loading: false,
  size: "default",
  split: true,
};

export const SmallList = Template.bind({});
SmallList.args = {
  ...Default.args,
  size: "small",
};

export const LargeList = Template.bind({});
LargeList.args = {
  ...Default.args,
  size: "large",
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  ...Default.args,
  bordered: false,
};

export const NoSplit = Template.bind({});
NoSplit.args = {
  ...Default.args,
  split: false,
};

export const LoadingList = Template.bind({});
LoadingList.args = {
  ...Default.args,
  loading: true,
  dataSource: [], // Empty data source when loading
};

export const CustomRenderItem = Template.bind({});
CustomRenderItem.args = {
  ...Default.args,
  dataSource: [
    { id: "a", title: "Ant Design", description: "A UI design language and React UI library" },
    { id: "b", title: "React", description: "A JavaScript library for building user interfaces" },
    { id: "c", title: "Storybook", description: "A tool for UI development" },
  ],
  renderItem: (item) => (
    <div>
      <Typography.Title level={5}>{item.title}</Typography.Title>
      <Typography.Text>{item.description}</Typography.Text>
    </div>
  ),
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  ...Default.args,
  dataSource: [],
  header: null,
  footer: null,
};

export const ItemCustomRender = Template.bind({});
ItemCustomRender.args = {
  ...Default.args,
  dataSource: [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2 with Custom Render", render: (item) => <Typography.Text strong>{item.name} - Rendered Customly</Typography.Text> },
    { id: "3", name: "Item 3" },
  ],
};
