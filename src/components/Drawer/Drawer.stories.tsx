// @ts-nocheck
import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Drawer } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Fully accessible drawer/side sheet with focus trap, ESC handling, URL state management, navigation arrows, and smooth slide animations.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

/**
 * Basic drawer from right
 */
export const BasicRight: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer Title"
        description="This is a basic drawer from the right side."
        size="md"
        anchor="right"
      >
        <div className="space-y-4">
          <p>This is the drawer content. The parent page remains visible but dimmed.</p>
          <p>Click the backdrop or press ESC to close.</p>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Drawer from left
 */
export const BasicLeft: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Navigation"
        anchor="left"
        size="sm"
      >
        <nav className="space-y-2">
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Dashboard</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Portfolio</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Wallet</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Marketplace</a>
        </nav>
      </Drawer>
    </div>
  );
};

/**
 * Small drawer
 */
export const SmallSize: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Small Drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Notification" size="sm">
        <div className="space-y-3">
          <p className="font-semibold">New message received</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            You have a new message from John Doe.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Large drawer
 */
export const LargeSize: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Large Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Project Details"
        size="lg"
      >
        <div className="space-y-6">
          <section>
            <h3 className="font-semibold text-lg mb-2">Overview</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Detailed project information goes here...
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Type</p>
                <p className="font-semibold">Reforestation</p>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Location</p>
                <p className="font-semibold">Brazil</p>
              </div>
            </div>
          </section>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Drawer with navigation arrows
 */
export const WithNavigation: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { id: 1, title: "Notification 1", content: "Content for notification 1" },
    { id: 2, title: "Notification 2", content: "Content for notification 2" },
    { id: 3, title: "Notification 3", content: "Content for notification 3" },
  ];

  const currentItem = items[currentIndex];

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Drawer with Navigation</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={currentItem?.title}
        size="md"
        navigation={{
          onPrevious: () => setCurrentIndex((i) => Math.max(0, i - 1)),
          onNext: () => setCurrentIndex((i) => Math.min(items.length - 1, i + 1)),
          hasPrevious: currentIndex > 0,
          hasNext: currentIndex < items.length - 1,
        }}
      >
        <div className="space-y-4">
          <p>{currentItem?.content}</p>
          <p className="text-sm text-neutral-500">
            Item {currentIndex + 1} of {items.length}
          </p>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Drawer with footer actions
 */
export const WithFooter: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Drawer with Footer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Withdrawal"
        description="Review your withdrawal details"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm Withdrawal
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Amount</p>
            <p className="text-2xl font-bold">$1,250.00</p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">To</p>
            <p className="font-mono text-sm">Bank Account •••• 4567</p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Fee</p>
            <p>$2.50</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Drawer with form
 */
export const WithForm: StoryFn<typeof Drawer> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Form Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Deposit Funds"
        description="Choose your deposit method"
        size="lg"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="deposit-form">
              Continue
            </Button>
          </>
        }
      >
        <form id="deposit-form" className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>Bank Transfer</option>
              <option>Credit Card</option>
              <option>Crypto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
            <p className="text-sm text-brand-700 dark:text-brand-400">
              💡 Minimum deposit amount is $100
            </p>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
