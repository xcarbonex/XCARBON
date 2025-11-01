// @ts-nocheck
import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Modal } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Fully accessible modal dialog with focus trap, ESC handling, backdrop click, size variants, and smooth animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;

/**
 * Basic modal with title and description
 */
export const Basic: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
        description="This is a basic modal with a title and description."
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          This is the modal body content. You can put any content here including forms, text,
          images, etc.
        </p>
      </Modal>
    </>
  );
};

/**
 * Small size modal
 */
export const SmallSize: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Small Modal"
        size="sm"
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          This is a small modal (max-w-md). Good for simple confirmations or short messages.
        </p>
      </Modal>
    </>
  );
};

/**
 * Medium size modal (default)
 */
export const MediumSize: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Medium Modal"
        size="md"
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          This is a medium modal (max-w-2xl). The default size, suitable for most use cases.
        </p>
      </Modal>
    </>
  );
};

/**
 * Large size modal
 */
export const LargeSize: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Large Modal"
        size="lg"
      >
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>This is a large modal (max-w-4xl). Useful for forms or detailed content.</p>
          <p>You can add multiple sections of content here.</p>
          <p>The modal will scroll if content exceeds viewport height.</p>
        </div>
      </Modal>
    </>
  );
};

/**
 * Extra large modal
 */
export const ExtraLargeSize: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open XL Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Extra Large Modal"
        size="xl"
      >
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>This is an extra large modal (max-w-6xl). Best for complex forms or data tables.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">Column 1</div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">Column 2</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 * Modal with footer actions
 */
export const WithFooter: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          This action cannot be undone. Please review carefully before confirming.
        </p>
      </Modal>
    </>
  );
};

/**
 * Modal without close button
 */
export const WithoutCloseButton: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal (No Close Button)</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Important Notice"
        showCloseButton={false}
        closeOnBackdropClick={false}
        closeOnEsc={false}
        footer={
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            I Understand
          </Button>
        }
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          This modal requires explicit action. You must click "I Understand" to close it.
        </p>
      </Modal>
    </>
  );
};

/**
 * Modal with form
 */
export const WithForm: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        description="Update your account information"
        size="md"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="edit-profile-form">
              Save Changes
            </Button>
          </>
        }
      >
        <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              rows={4}
              defaultValue="Carbon credit enthusiast"
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

/**
 * Modal with long scrollable content
 */
export const WithScrollableContent: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Terms and Conditions"
        size="lg"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
};

/**
 * Destructive action modal
 */
export const DestructiveAction: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="error" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Account"
        description="This action is permanent and cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="border-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={() => setIsOpen(false)}>
              Delete Account
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
          <p>You are about to delete your account. This will:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Remove all your data permanently</li>
            <li>Cancel any active subscriptions</li>
            <li>Revoke all API keys</li>
          </ul>
          <p className="font-semibold text-error-600 dark:text-error-400">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};
