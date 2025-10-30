import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Select from "./index";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {};
