/**
 * Accessibility Testing Utilities
 * Provides axe-core integration and WCAG validation helpers
 */

import type { AxeResults, Result as AxeResult, NodeResult } from "axe-core";

/**
 * Selector type from axe-core (can be string[] or complex selectors)
 */
type AxeSelector = string[] | unknown;

/**
 * WCAG AA Contrast Requirements
 */
export const WCAG_AA_CONTRAST = {
  NORMAL_TEXT: 4.5, // 14pt+ or 18.5pt+
  LARGE_TEXT: 3.0, // 18pt+ (24px) or 14pt bold (18.5px)
  UI_COMPONENTS: 3.0, // Interactive components
} as const;

/**
 * Severity levels for accessibility issues
 */
export type A11ySeverity = "critical" | "serious" | "moderate" | "minor";

/**
 * Accessibility issue interface
 */
export interface A11yIssue {
  id: string;
  impact: A11ySeverity;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: AxeSelector;
    failureSummary?: string;
  }>;
}

/**
 * Format axe-core results into readable issues
 */
export function formatAxeResults(results: AxeResults): {
  passed: number;
  violations: A11yIssue[];
  incomplete: A11yIssue[];
  summary: string;
} {
  const violations: A11yIssue[] = results.violations.map(formatAxeViolation);
  const incomplete: A11yIssue[] = results.incomplete.map(formatAxeViolation);

  const totalViolations = violations.reduce((sum, v) => sum + v.nodes.length, 0);
  const totalIncomplete = incomplete.reduce((sum, i) => sum + i.nodes.length, 0);

  const summary = `
Accessibility Scan Results:
✅ Passed: ${results.passes.length} rules
❌ Violations: ${totalViolations} issues (${violations.length} rules)
⚠️  Incomplete: ${totalIncomplete} issues (${incomplete.length} rules)
`.trim();

  return {
    passed: results.passes.length,
    violations,
    incomplete,
    summary,
  };
}

/**
 * Format individual axe violation
 */
function formatAxeViolation(result: AxeResult): A11yIssue {
  return {
    id: result.id,
    impact: result.impact as A11ySeverity,
    description: result.description,
    help: result.help,
    helpUrl: result.helpUrl,
    nodes: result.nodes.map((node: NodeResult) => ({
      html: node.html,
      target: node.target as AxeSelector,
      failureSummary: node.failureSummary,
    })),
  };
}

/**
 * Calculate contrast ratio between two colors
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get relative luminance of a color
 * @param hex - Color in hex format
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): [number, number, number] {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export function meetsWCAGAA(
  contrastRatio: number,
  textSize: "normal" | "large" = "normal"
): boolean {
  const threshold =
    textSize === "large" ? WCAG_AA_CONTRAST.LARGE_TEXT : WCAG_AA_CONTRAST.NORMAL_TEXT;
  return contrastRatio >= threshold;
}

/**
 * Validate color combination for WCAG AA
 */
export function validateColorCombination(
  foreground: string,
  background: string,
  textSize: "normal" | "large" = "normal"
): {
  ratio: number;
  passes: boolean;
  level: "AAA" | "AA" | "FAIL";
} {
  const ratio = calculateContrastRatio(foreground, background);
  const aaThreshold =
    textSize === "large" ? WCAG_AA_CONTRAST.LARGE_TEXT : WCAG_AA_CONTRAST.NORMAL_TEXT;
  const aaaThreshold = textSize === "large" ? 4.5 : 7.0;

  let level: "AAA" | "AA" | "FAIL" = "FAIL";
  if (ratio >= aaaThreshold) {
    level = "AAA";
  } else if (ratio >= aaThreshold) {
    level = "AA";
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= aaThreshold,
    level,
  };
}

/**
 * Common accessibility violations to check
 */
export const COMMON_A11Y_CHECKS = {
  "color-contrast": "Ensures sufficient color contrast",
  "button-name": "Buttons must have discernible text",
  "link-name": "Links must have discernible text",
  "image-alt": "Images must have alternate text",
  "input-button-name": "Input buttons must have discernible text",
  label: "Form elements must have labels",
  "aria-required-attr": "Required ARIA attributes must be provided",
  "aria-valid-attr": "ARIA attributes must be valid",
  "aria-hidden-focus": "Elements with aria-hidden must not be focusable",
  "focus-order-semantics": "Focus order should follow DOM order",
  "landmark-one-main": "Page must have one main landmark",
  "page-has-heading-one": "Page should contain a level-one heading",
  region: "All content must be contained in landmarks",
} as const;

/**
 * Generate accessibility report summary
 */
export function generateA11yReport(results: AxeResults): string {
  const { violations, incomplete, summary } = formatAxeResults(results);

  const criticalIssues = violations.filter((v) => v.impact === "critical");
  const seriousIssues = violations.filter((v) => v.impact === "serious");

  let report = summary + "\n\n";

  if (criticalIssues.length > 0) {
    report += "🚨 CRITICAL ISSUES:\n";
    criticalIssues.forEach((issue) => {
      report += `  • ${issue.help} (${issue.nodes.length} instances)\n`;
      report += `    ${issue.helpUrl}\n`;
    });
    report += "\n";
  }

  if (seriousIssues.length > 0) {
    report += "⚠️  SERIOUS ISSUES:\n";
    seriousIssues.forEach((issue) => {
      report += `  • ${issue.help} (${issue.nodes.length} instances)\n`;
    });
    report += "\n";
  }

  if (incomplete.length > 0) {
    report += "❓ NEEDS REVIEW:\n";
    incomplete.forEach((issue) => {
      report += `  • ${issue.help} (${issue.nodes.length} instances)\n`;
    });
  }

  return report;
}

/**
 * Keyboard navigation helpers
 */
export const KEYBOARD_KEYS = {
  TAB: "Tab",
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
} as const;

/**
 * Check if element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabindex = element.getAttribute("tabindex");
  const isInteractive =
    element.tagName === "A" ||
    element.tagName === "BUTTON" ||
    element.tagName === "INPUT" ||
    element.tagName === "SELECT" ||
    element.tagName === "TEXTAREA";

  return isInteractive || (tabindex !== null && parseInt(tabindex, 10) >= 0);
}

/**
 * Get focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector));
}

/**
 * Trap focus within a container (useful for modals)
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== KEYBOARD_KEYS.TAB) return;

  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}
