// @ts-nocheck
import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
} from "./index";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Skeleton loader components for displaying placeholder content while data is loading. Respects prefers-reduced-motion for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

/**
 * Basic skeleton loader
 */
const SkeletonTemplate: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Basic = SkeletonTemplate.bind({});
Basic.args = {
  width: "200px",
  height: "20px",
  rounded: "md",
};

/**
 * Multiple text lines
 */
export const TextLines = SkeletonTemplate.bind({});
TextLines.args = {
  lines: 3,
  height: "16px",
  rounded: "sm",
};

/**
 * Skeleton Card - for MetricCard loading state
 */
const CardTemplate: StoryFn<typeof SkeletonCard> = (args) => <SkeletonCard {...args} />;

export const CardSmall = CardTemplate.bind({});
CardSmall.args = {
  size: "sm",
  showChange: true,
};

export const CardMedium = CardTemplate.bind({});
CardMedium.args = {
  size: "md",
  showChange: true,
};

export const CardLarge = CardTemplate.bind({});
CardLarge.args = {
  size: "lg",
  showChange: true,
};

/**
 * Skeleton Table - for table loading state
 */
const TableTemplate: StoryFn<typeof SkeletonTable> = (args) => (
  <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
    <SkeletonTable {...args} />
  </div>
);

export const Table = TableTemplate.bind({});
Table.args = {
  columns: 4,
  rows: 5,
};

/**
 * Skeleton Text - for paragraph loading
 */
const TextTemplate: StoryFn<typeof SkeletonText> = (args) => <SkeletonText {...args} />;

export const TextParagraph = TextTemplate.bind({});
TextParagraph.args = {
  lines: 5,
};

/**
 * Skeleton Avatar - for profile images
 */
const AvatarTemplate: StoryFn<typeof SkeletonAvatar> = (args) => <SkeletonAvatar {...args} />;

export const AvatarSmall = AvatarTemplate.bind({});
AvatarSmall.args = {
  size: "sm",
};

export const AvatarMedium = AvatarTemplate.bind({});
AvatarMedium.args = {
  size: "md",
};

export const AvatarLarge = AvatarTemplate.bind({});
AvatarLarge.args = {
  size: "lg",
};

/**
 * Skeleton Button
 */
const ButtonTemplate: StoryFn<typeof SkeletonButton> = (args) => <SkeletonButton {...args} />;

export const ButtonMedium = ButtonTemplate.bind({});
ButtonMedium.args = {
  size: "md",
};

/**
 * Complete Dashboard Loading Example
 */
export const DashboardLoading: StoryFn = () => (
  <div className="space-y-6 p-6">
    {/* Header */}
    <div className="space-y-2">
      <Skeleton width="200px" height="32px" rounded="md" />
      <Skeleton width="300px" height="20px" rounded="sm" />
    </div>

    {/* Metric Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonCard size="md" />
      <SkeletonCard size="md" />
      <SkeletonCard size="md" />
    </div>

    {/* Table */}
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
      <SkeletonTable columns={5} rows={8} />
    </div>
  </div>
);
