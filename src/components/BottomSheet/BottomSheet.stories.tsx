// @ts-nocheck
import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { BottomSheet } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Mobile-optimized bottom sheet with swipe gestures, snap points, and drag handle. Ideal for mobile quick actions, filters, and detail views.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

/**
 * Basic bottom sheet with single snap point (50%)
 */
export const Basic: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Quick Actions"
        description="Choose an action to perform"
        snapPoints={[0.5]}
      >
        <div className="space-y-3">
          <button className="w-full px-4 py-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
            📷 Take Photo
          </button>
          <button className="w-full px-4 py-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
            📁 Choose from Library
          </button>
          <button className="w-full px-4 py-3 text-left rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
            📄 Upload Document
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet with multiple snap points (30%, 60%, 90%)
 */
export const MultipleSnapPoints: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSnap, setCurrentSnap] = useState(0);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open with Snap Points</Button>
      <p className="mt-2 text-sm text-neutral-600">
        Try swiping up and down to snap to different heights
      </p>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filter Options"
        snapPoints={[0.3, 0.6, 0.9]}
        initialSnapPoint={0}
        onSnapPointChange={(index) => setCurrentSnap(index)}
      >
        <div className="space-y-6">
          <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
            <p className="text-sm text-brand-700 dark:text-brand-400">
              Current snap: {currentSnap + 1} of 3 (
              {[30, 60, 90][currentSnap]}%)
            </p>
          </div>

          <section>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$0 - $100</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$100 - $500</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$500+</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-3">Carbon Project Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Reforestation</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Renewable Energy</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Ocean Conservation</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Community Projects</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-3">Location</h3>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>All Locations</option>
              <option>North America</option>
              <option>South America</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Africa</option>
              <option>Oceania</option>
            </select>
          </section>
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet with footer actions
 */
export const WithFooter: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open with Footer</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Transfer"
        description="Review transfer details"
        snapPoints={[0.6]}
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm Transfer
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Amount
            </p>
            <p className="text-2xl font-bold">500 Carbon Credits</p>
          </div>

          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              To
            </p>
            <p className="font-mono text-sm">0x742d...8E4A</p>
          </div>

          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              Network Fee
            </p>
            <p>0.05 ETH</p>
          </div>

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              ⚠️ This action cannot be undone
            </p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet without drag handle
 */
export const WithoutDragHandle: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open without Handle</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
        snapPoints={[0.7]}
        showDragHandle={false}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
            <span>Notifications</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
            <span>Email Updates</span>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
            <span>Dark Mode</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet with scrollable content
 */
export const WithScrollableContent: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Sheet</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Transaction History"
        description="View all your carbon credit transactions"
        snapPoints={[0.5, 0.9]}
      >
        <div className="space-y-3">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">
                  Transfer #{1000 + i}
                </span>
                <span className="text-sm text-neutral-500">
                  {i + 1} days ago
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Amount: {(Math.random() * 1000).toFixed(0)} credits
              </p>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet with form
 */
export const WithForm: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Form Sheet</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Payment Method"
        snapPoints={[0.8]}
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="payment-form">
              Add Card
            </Button>
          </>
        }
      >
        <form id="payment-form" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>

          <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
            <p className="text-sm text-brand-700 dark:text-brand-400">
              🔒 Your payment information is encrypted and secure
            </p>
          </div>
        </form>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet for mobile share menu
 */
export const ShareMenu: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Share</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share Carbon Project"
        snapPoints={[0.4]}
      >
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: "📱", label: "Message" },
            { icon: "📧", label: "Email" },
            { icon: "🔗", label: "Copy Link" },
            { icon: "📲", label: "WhatsApp" },
            { icon: "🐦", label: "Twitter" },
            { icon: "💼", label: "LinkedIn" },
            { icon: "📘", label: "Facebook" },
            { icon: "➕", label: "More" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Bottom sheet for mobile product details
 */
export const ProductDetails: StoryFn<typeof BottomSheet> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>View Product Details</Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Amazon Rainforest Conservation"
        description="Verified Carbon Standard (VCS) Project"
        snapPoints={[0.4, 0.7, 0.95]}
        initialSnapPoint={1}
        footer={
          <Button variant="primary" className="w-full">
            Purchase Credits
          </Button>
        }
      >
        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-video bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-4xl">
            🌳
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">1.2M</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Tons CO₂
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">98%</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Verified
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">$24</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Per Credit
              </p>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="font-semibold mb-2">About This Project</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              This project protects 50,000 hectares of pristine Amazon
              rainforest, preventing deforestation and preserving critical
              biodiversity. The project works with local communities to provide
              sustainable livelihoods while protecting one of Earth's most
              important carbon sinks.
            </p>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>VCS and CCB Standards certified</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Protects endangered species habitat</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Benefits 3,000+ community members</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Annual third-party verification</span>
              </li>
            </ul>
          </section>
        </div>
      </BottomSheet>
    </div>
  );
};
