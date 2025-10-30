// @ts-nocheck
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Toggler from "./index";

const meta: Meta<typeof Toggler> = {
  title: "Components/Toggler",
  component: Toggler,
};

export default meta;
type Story = StoryObj<typeof Toggler>;

export const Default: Story = {
  args: {},
};
