import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Input from "./index";

export default {
  title: "Components/Input",
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
