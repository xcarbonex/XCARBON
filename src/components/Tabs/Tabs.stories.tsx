// @ts-nocheck
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {},
};
