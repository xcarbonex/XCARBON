import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import Typography from "./index";

export default {
  title: "Components/Typography",
  component: Typography,
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {};
