// @ts-nocheck
import type { Meta, StoryFn } from "@storybook/react-vite";
import { EmptyState } from "./index";
import { FaWallet, FaShoppingCart, FaBell, FaChartLine } from "react-icons/fa";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "EmptyState component displays a helpful message when there's no data to show, with optional action buttons to guide users.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the empty state",
    },
  },
};

export default meta;

const Template: StoryFn<typeof EmptyState> = (args) => <EmptyState {...args} />;

/**
 * Default empty state with just title and description
 */
export const Default = Template.bind({});
Default.args = {
  args: {
    title: "No data available",
    description: "There's nothing to display here yet. Get started by adding some data.",
  },
};

/**
 * Empty state with icon
 */
export const WithIcon = Template.bind({});
WithIcon.args = {
  args: {
    icon: <FaWallet />,
    title: "No assets yet",
    description: "Your wallet is empty. Start by depositing funds or purchasing carbon credits.",
  },
};

/**
 * Empty state with primary action
 */
export const WithPrimaryAction = Template.bind({});
WithPrimaryAction.args = {
  args: {
    icon: <FaWallet />,
    title: "No assets yet",
    description: "Your wallet is empty. Start by depositing funds.",
    primaryAction: {
      label: "Deposit Funds",
      onClick: () => alert("Opening deposit drawer..."),
    },
  },
};

/**
 * Empty state with both primary and secondary actions
 */
export const WithBothActions = Template.bind({});
WithBothActions.args = {
  args: {
    icon: <FaShoppingCart />,
    title: "No purchases yet",
    description: "Browse the marketplace to find carbon credits that match your criteria.",
    primaryAction: {
      label: "Browse Marketplace",
      onClick: () => alert("Navigating to marketplace..."),
    },
    secondaryAction: {
      label: "Learn More",
      onClick: () => alert("Opening help center..."),
    },
  },
};

/**
 * Small size variant
 */
export const SmallSize = Template.bind({});
SmallSize.args = {
  args: {
    icon: <FaBell />,
    title: "No notifications",
    description: "You're all caught up!",
    size: "sm",
  },
};

/**
 * Large size variant
 */
export const LargeSize = Template.bind({});
LargeSize.args = {
  args: {
    icon: <FaChartLine />,
    title: "No portfolio data",
    description:
      "Start building your carbon credit portfolio by purchasing tokenized assets from the marketplace.",
    size: "lg",
    primaryAction: {
      label: "Explore Assets",
      onClick: () => alert("Navigating..."),
    },
  },
};

/**
 * Portfolio empty state
 */
export const PortfolioEmpty = Template.bind({});
PortfolioEmpty.args = {
  args: {
    icon: <FaChartLine />,
    title: "No positions yet",
    description: "Your portfolio is empty. Start by purchasing carbon credits from the marketplace.",
    primaryAction: {
      label: "Browse Marketplace",
      onClick: () => alert("Navigate to marketplace"),
    },
    secondaryAction: {
      label: "View Available Credits",
      onClick: () => alert("View credits"),
    },
  },
};

/**
 * Wallet empty state
 */
export const WalletEmpty = Template.bind({});
WalletEmpty.args = {
  args: {
    icon: <FaWallet />,
    title: "No wallet activity",
    description: "You haven't made any transactions yet. Deposit funds to get started.",
    primaryAction: {
      label: "Deposit Funds",
      onClick: () => alert("Open deposit drawer"),
    },
  },
};

/**
 * Notifications empty state
 */
export const NotificationsEmpty = Template.bind({});
NotificationsEmpty.args = {
  args: {
    icon: <FaBell />,
    title: "No notifications",
    description: "You're all caught up! We'll notify you when something important happens.",
    size: "sm",
  },
};

/**
 * Search results empty state
 */
export const NoSearchResults = Template.bind({});
NoSearchResults.args = {
  args: {
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "No results found",
    description: "We couldn't find any matches for your search. Try different keywords or filters.",
    primaryAction: {
      label: "Clear Filters",
      onClick: () => alert("Clearing filters..."),
    },
  },
};
