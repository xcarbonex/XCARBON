import React from "react";
import Card from ".";
import { Typography, Button } from "..";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: {
      control: "text",
      description: "Title of the card",
    },
    extra: {
      control: false,
      description: "Extra content in the top right corner",
    },
    children: {
      control: "text",
      description: "Content of the card",
    },
    bordered: {
      control: "boolean",
      description: "Whether the card has a border",
    },
    loading: {
      control: "boolean",
      description: "Whether the card is in a loading state",
    },
    size: {
      control: {
        type: "select",
        options: ["default", "small"],
      },
      description: "Size of the card",
    },
    className: {
      control: "text",
      description: "Custom class name for the card container",
    },
    bodyClassName: {
      control: "text",
      description: "Custom class name for the card body",
    },
    headClassName: {
      control: "text",
      description: "Custom class name for the card header",
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Default Card",
  children: "This is a default card.",
  bordered: true,
  loading: false,
  size: "default",
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  ...Default.args,
  title: "Card Without Border",
  bordered: false,
};

export const WithExtra = Template.bind({});
WithExtra.args = {
  ...Default.args,
  title: "Card With Extra Content",
  extra: <Button type="primary">More</Button>,
  children: "This card has extra content in the header.",
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  ...Default.args,
  title: "Small Card",
  size: "small",
  children: "This is a small card.",
};

export const LoadingCard = Template.bind({});
LoadingCard.args = {
  ...Default.args,
  title: "Loading Card",
  loading: true,
  children: "Content will appear after loading...",
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  ...Default.args,
  title: "Card with Custom Styling",
  className: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  bodyClassName: "font-mono",
  headClassName: "text-red-500",
  children: "This card has custom background and text colors, and custom font for body and header.",
};

export const WithActions = Template.bind({});
WithActions.args = {
  ...Default.args,
  title: "Card With Actions",
  children: "This card has action buttons at the bottom.",
  actions: [
    <Button key="cancel">Cancel</Button>,
    <Button key="ok" type="primary">OK</Button>,
  ],
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  ...Default.args,
  title: "Card With Footer",
  children: "This card has a custom footer.",
  footer: <Typography.Text>Card Footer Content</Typography.Text>,
}; 