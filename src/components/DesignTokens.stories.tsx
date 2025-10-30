// @ts-nocheck
import React from "react";

export default {
  title: "Design System/Tokens",
  parameters: {
    layout: "fullscreen",
  },
};

const ColorSwatch = ({ name, value, description, usage }) => (
  <div className="flex items-start gap-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
    <div
      className="w-20 h-20 rounded-lg shadow-md flex-shrink-0"
      style={{ backgroundColor: value }}
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50">{name}</h3>
      <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400">{value}</p>
      {description && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{description}</p>
      )}
      {usage && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 italic">Usage: {usage}</p>
      )}
    </div>
  </div>
);

const TokenSection = ({ title, description, children }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">{title}</h2>
    {description && <p className="text-neutral-600 dark:text-neutral-400 mb-6">{description}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export const BrandColors = () => (
  <div className="p-8 bg-white dark:bg-neutral-900 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        XCARBON Design Tokens
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        Evergreen + Sky Palette - Ecology & Sustainability Brand Refresh
      </p>

      <TokenSection
        title="Brand Colors"
        description="Primary brand colors representing ecology, sustainability, and growth. Use for CTAs, primary actions, and brand elements."
      >
        <ColorSwatch
          name="brand-900"
          value="#0B3B2E"
          description="Deepest green - Forest depth"
          usage="Headers, dark backgrounds, high-contrast text on light"
        />
        <ColorSwatch
          name="brand-700"
          value="#166534"
          description="Rich green - Primary brand"
          usage="Primary CTAs, buttons, links (white text)"
        />
        <ColorSwatch
          name="brand-600"
          value="#15803D"
          description="Strong green - Active states"
          usage="Hover states for primary buttons, focus rings"
        />
        <ColorSwatch
          name="brand-500"
          value="#22C55E"
          description="Vibrant green - Success & growth"
          usage="Success messages, positive indicators, badges"
        />
        <ColorSwatch
          name="brand-400"
          value="#4ADE80"
          description="Light green - Highlights"
          usage="Accent highlights, active selections"
        />
        <ColorSwatch
          name="brand-100"
          value="#DCFCE7"
          description="Pale green - Subtle backgrounds"
          usage="Info cards, subtle highlights, tags"
        />
      </TokenSection>

      <TokenSection
        title="Accent Colors"
        description="Sky blue accents for secondary actions, informational elements, and data visualization."
      >
        <ColorSwatch
          name="accent-500"
          value="#0EA5E9"
          description="Primary sky blue"
          usage="Secondary CTAs, informational elements, links"
        />
        <ColorSwatch
          name="accent-400"
          value="#38BDF8"
          description="Light sky blue"
          usage="Hover states, interactive highlights"
        />
        <ColorSwatch
          name="accent-300"
          value="#7DD3FC"
          description="Soft sky blue"
          usage="Chart highlights, data points"
        />
        <ColorSwatch
          name="accent-100"
          value="#E0F2FE"
          description="Pale sky"
          usage="Informational backgrounds, tooltips"
        />
      </TokenSection>

      <TokenSection
        title="Neutral Colors"
        description="Slate-based neutrals for text, backgrounds, and UI elements. Provides excellent readability and contrast."
      >
        <ColorSwatch
          name="neutral-900"
          value="#0F172A"
          description="Deepest slate - Dark mode bg"
          usage="Primary text on light backgrounds, dark mode main bg"
        />
        <ColorSwatch
          name="neutral-700"
          value="#334155"
          description="Dark slate"
          usage="Secondary text, muted headings"
        />
        <ColorSwatch
          name="neutral-500"
          value="#64748B"
          description="Mid slate"
          usage="Placeholder text, disabled states, borders"
        />
        <ColorSwatch
          name="neutral-300"
          value="#CBD5E1"
          description="Light slate"
          usage="Borders, dividers, subtle backgrounds"
        />
        <ColorSwatch
          name="neutral-100"
          value="#F1F5F9"
          description="Very light slate"
          usage="Card backgrounds, input fields, hover states"
        />
        <ColorSwatch
          name="neutral-50"
          value="#F8FAFC"
          description="Palest slate"
          usage="Page backgrounds, modal overlays"
        />
      </TokenSection>

      <div className="mt-12 p-6 bg-brand-100 dark:bg-brand-900 rounded-lg">
        <h3 className="text-xl font-bold mb-3 text-brand-900 dark:text-brand-100">
          Usage Guidelines
        </h3>
        <ul className="space-y-2 text-neutral-800 dark:text-neutral-200">
          <li>
            ✅ <strong>Primary CTA:</strong> White text on brand-700 or brand-900
          </li>
          <li>
            ✅ <strong>Success states:</strong> brand-500 with brand-900 text
          </li>
          <li>
            ✅ <strong>Info elements:</strong> accent-500 for secondary actions
          </li>
          <li>
            ✅ <strong>Text contrast:</strong> Ensure 4.5:1 minimum for WCAG AA
          </li>
          <li>
            ✅ <strong>Focus rings:</strong> Use brand-600 with 2px outline
          </li>
          <li>⚠️ Avoid brand-500 text on white (insufficient contrast)</li>
          <li>⚠️ Use brand-100 backgrounds only with dark text (brand-900/neutral-900)</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          CSS Variables
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
          All tokens are available as CSS variables for non-Tailwind usage:
        </p>
        <pre className="bg-neutral-900 text-neutral-50 p-4 rounded overflow-x-auto text-xs">
          {`:root {
  --brand-900: #0B3B2E;
  --brand-700: #166534;
  --brand-500: #22C55E;
  --accent-500: #0EA5E9;
  --neutral-900: #0F172A;
  --neutral-500: #64748B;
  --neutral-50: #F8FAFC;
}

/* Usage in components */
.primary-button {
  background-color: var(--brand-700);
  color: white;
}
`}
        </pre>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="text-xl font-bold mb-3 text-yellow-900 dark:text-yellow-200">
          ⚠️ Migration Note
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          Legacy color variables (<code>--bg-btn</code>, <code>--primary-color</code>, etc.) are now
          mapped to the new tokens for backwards compatibility. Gradually migrate components to use{" "}
          <code>brand-*</code>, <code>accent-*</code>, and <code>neutral-*</code>
          classes directly via Tailwind.
        </p>
      </div>
    </div>
  </div>
);

BrandColors.storyName = "Brand Colors & Tokens";
