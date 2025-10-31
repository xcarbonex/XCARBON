import React from "react";

interface TokenProps {
  name: string;
  hex: string;
  usage: string;
}

const DesignTokens: React.FC = () => {
  const brandTokens: TokenProps[] = [
    { name: "brand-900", hex: "#0B3B2E", usage: "Primary CTAs, dark text" },
    { name: "brand-700", hex: "#166534", usage: "Buttons, primary interactions" },
    { name: "brand-600", hex: "#15803D", usage: "Hover states, secondary CTAs" },
    { name: "brand-500", hex: "#22C55E", usage: "Success states, progress" },
    { name: "brand-400", hex: "#4ADE80", usage: "Light backgrounds, accents" },
    { name: "brand-300", hex: "#86EFAC", usage: "Very light backgrounds" },
    { name: "brand-200", hex: "#BBF7D0", usage: "Subtle backgrounds" },
    { name: "brand-100", hex: "#DCFCE7", usage: "Lightest backgrounds" },
    { name: "brand-50", hex: "#F0FDF4", usage: "Minimal accents" },
  ];

  const accentTokens: TokenProps[] = [
    { name: "accent-500", hex: "#0EA5E9", usage: "Information, links" },
    { name: "accent-400", hex: "#38BDF8", usage: "Hover states" },
    { name: "accent-300", hex: "#7DD3FC", usage: "Light accents" },
    { name: "accent-200", hex: "#BAE6FD", usage: "Very light accents" },
    { name: "accent-100", hex: "#E0F2FE", usage: "Minimal accents" },
  ];

  const neutralTokens: TokenProps[] = [
    { name: "neutral-900", hex: "#0F172A", usage: "Text, dark elements" },
    { name: "neutral-800", hex: "#1E293B", usage: "Dark backgrounds" },
    { name: "neutral-700", hex: "#334155", usage: "Secondary text" },
    { name: "neutral-600", hex: "#475569", usage: "Disabled text" },
    { name: "neutral-500", hex: "#64748B", usage: "Placeholder text" },
    { name: "neutral-400", hex: "#94A3B8", usage: "Light text" },
    { name: "neutral-300", hex: "#CBD5E1", usage: "Borders" },
    { name: "neutral-200", hex: "#E2E8F0", usage: "Light borders" },
    { name: "neutral-100", hex: "#F1F5F9", usage: "Light backgrounds" },
    { name: "neutral-50", hex: "#F8FAFC", usage: "Lightest backgrounds" },
  ];

  const TokenCard: React.FC<TokenProps> = ({ name, hex, usage }) => (
    <div className="mb-4 rounded-lg border border-neutral-300 overflow-hidden shadow-sm">
      <div
        className="h-24 w-full"
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={`Color ${name} with hex value ${hex}`}
      />
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-neutral-900 text-sm">{name}</h3>
            <p className="text-xs text-neutral-500 font-mono">{hex}</p>
          </div>
        </div>
        <p className="text-xs text-neutral-600">{usage}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-900 mb-2">Design Tokens</h1>
        <p className="text-lg text-neutral-600 mb-8">
          Evergreen + Sky Palette • Brand colors, accents, and neutrals for consistent UI design
        </p>

        {/* Brand Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-700 mb-4 pb-2 border-b-2 border-brand-200">
            Brand Colors (Evergreen)
          </h2>
          <p className="text-neutral-600 mb-6">
            Primary brand colors for calls-to-action, buttons, and key interactions. Use brand-700
            for primary CTAs with white text.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandTokens.map((token) => (
              <TokenCard key={token.name} {...token} />
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-accent-500 mb-4 pb-2 border-b-2 border-accent-200">
            Accent Colors (Sky)
          </h2>
          <p className="text-neutral-600 mb-6">
            Secondary accent colors for information, links, and supporting UI elements. Use
            accent-500 for links and informational states.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accentTokens.map((token) => (
              <TokenCard key={token.name} {...token} />
            ))}
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 pb-2 border-b-2 border-neutral-300">
            Neutral Colors
          </h2>
          <p className="text-neutral-600 mb-6">
            Grayscale palette for typography, borders, backgrounds, and disabled states. Use
            neutral-900 for primary text and neutral-50 for minimal backgrounds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neutralTokens.map((token) => (
              <TokenCard key={token.name} {...token} />
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-12 bg-white p-8 rounded-lg border border-neutral-300">
          <h2 className="text-2xl font-bold text-brand-900 mb-6">Usage Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CTAs */}
            <div>
              <h3 className="text-lg font-semibold text-brand-700 mb-3">Primary CTA</h3>
              <button className="px-6 py-2 bg-brand-700 text-white rounded-lg font-medium hover:bg-brand-800 transition-colors">
                Primary Action
              </button>
              <p className="text-sm text-neutral-600 mt-2">
                Use:{" "}
                <code className="bg-neutral-100 px-2 py-1 rounded">bg-brand-700 text-white</code>
              </p>
            </div>

            {/* Secondary CTA */}
            <div>
              <h3 className="text-lg font-semibold text-brand-700 mb-3">Secondary CTA</h3>
              <button className="px-6 py-2 bg-neutral-100 text-brand-700 rounded-lg font-medium border border-brand-200 hover:bg-brand-50 transition-colors">
                Secondary Action
              </button>
              <p className="text-sm text-neutral-600 mt-2">
                Use:{" "}
                <code className="bg-neutral-100 px-2 py-1 rounded">
                  bg-neutral-100 text-brand-700
                </code>
              </p>
            </div>

            {/* Success */}
            <div>
              <h3 className="text-lg font-semibold text-brand-500 mb-3">Success State</h3>
              <div className="p-4 bg-brand-50 border-l-4 border-brand-500 rounded text-brand-700">
                ✓ Operation successful
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Use:{" "}
                <code className="bg-neutral-100 px-2 py-1 rounded">
                  bg-brand-50 border-brand-500
                </code>
              </p>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-semibold text-accent-500 mb-3">Info State</h3>
              <div className="p-4 bg-accent-100 border-l-4 border-accent-500 rounded text-accent-600">
                ℹ Information message
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Use:{" "}
                <code className="bg-neutral-100 px-2 py-1 rounded">
                  bg-accent-100 border-accent-500
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="bg-white p-8 rounded-lg border border-neutral-300">
          <h2 className="text-2xl font-bold text-brand-900 mb-4">CSS Variables</h2>
          <p className="text-neutral-600 mb-4">
            All tokens are available as CSS custom properties in{" "}
            <code className="bg-neutral-100 px-2 py-1 rounded">src/styles/tokens.css</code>:
          </p>
          <div className="bg-neutral-900 text-neutral-50 p-4 rounded font-mono text-sm overflow-auto max-h-48">
            <div>:root {"{"}</div>
            <div className="ml-4">--brand-700: #166534;</div>
            <div className="ml-4">--accent-500: #0EA5E9;</div>
            <div className="ml-4">--neutral-900: #0F172A;</div>
            <div className="ml-4">/* ... more tokens ... */</div>
            <div>{"}"}</div>
          </div>
          <p className="text-sm text-neutral-600 mt-4">
            Usage: <code className="bg-neutral-100 px-2 py-1 rounded">color: var(--brand-700)</code>
          </p>
        </section>
      </div>
    </div>
  );
};

export default DesignTokens;
