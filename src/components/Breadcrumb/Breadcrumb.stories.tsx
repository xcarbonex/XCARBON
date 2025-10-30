// @ts-nocheck
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {},
};
