// @ts-nocheck
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion from "./index";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
};
