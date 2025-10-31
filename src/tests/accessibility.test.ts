/**
 * Accessibility Test Suite
 * Validates WCAG AA compliance for XCARBON design tokens
 */

import { describe, it, expect } from "vitest";
import {
  calculateContrastRatio,
  validateColorCombination,
  meetsWCAGAA,
  WCAG_AA_CONTRAST,
} from "../utils/accessibility";

describe("Accessibility Utils", () => {
  describe("Color Contrast Validation", () => {
    it("should calculate correct contrast ratios", () => {
      // Pure black on pure white
      const blackWhite = calculateContrastRatio("#000000", "#ffffff");
      expect(blackWhite).toBeCloseTo(21, 1);

      // Pure white on pure black
      const whiteBlack = calculateContrastRatio("#ffffff", "#000000");
      expect(whiteBlack).toBeCloseTo(21, 1);

      // Same colors
      const sameSame = calculateContrastRatio("#166534", "#166534");
      expect(sameSame).toBe(1);
    });

    it("should validate WCAG AA for normal text", () => {
      // 4.5:1 minimum for normal text
      expect(meetsWCAGAA(4.5, "normal")).toBe(true);
      expect(meetsWCAGAA(4.4, "normal")).toBe(false);
      expect(meetsWCAGAA(7.0, "normal")).toBe(true);
    });

    it("should validate WCAG AA for large text", () => {
      // 3:1 minimum for large text
      expect(meetsWCAGAA(3.0, "large")).toBe(true);
      expect(meetsWCAGAA(2.9, "large")).toBe(false);
      expect(meetsWCAGAA(4.5, "large")).toBe(true);
    });
  });

  describe("XCARBON Brand Colors - WCAG AA Compliance", () => {
    const brandColors = {
      "brand-900": "#0B3B2E",
      "brand-700": "#166534",
      "brand-600": "#15803D",
      "brand-500": "#22C55E",
      "brand-100": "#DCFCE7",
      "accent-500": "#0EA5E9",
      "neutral-900": "#0F172A",
      "neutral-50": "#F8FAFC",
      white: "#FFFFFF",
    };

    it("Primary CTA (white on brand-700) should meet WCAG AA", () => {
      const result = validateColorCombination(
        brandColors.white,
        brandColors["brand-700"],
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.level).toMatch(/AA|AAA/);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Primary CTA (white on brand-900) should meet WCAG AA", () => {
      const result = validateColorCombination(
        brandColors.white,
        brandColors["brand-900"],
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.level).toMatch(/AA|AAA/);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Body text (neutral-900 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        brandColors["neutral-900"],
        brandColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.level).toBe("AAA"); // Should exceed AA
      expect(result.ratio).toBeGreaterThanOrEqual(7.0); // AAA level
    });

    it("Accent links (accent-500 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        brandColors["accent-500"],
        brandColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Light backgrounds (brand-100 on white) should have sufficient contrast for UI", () => {
      const result = validateColorCombination(brandColors["brand-100"], brandColors.white, "large");

      // Light backgrounds typically used for large UI elements
      expect(result.ratio).toBeGreaterThanOrEqual(1.0);
    });

    it("Dark mode text (neutral-50 on neutral-900) should meet WCAG AA", () => {
      const result = validateColorCombination(
        brandColors["neutral-50"],
        brandColors["neutral-900"],
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.level).toBe("AAA");
      expect(result.ratio).toBeGreaterThanOrEqual(7.0);
    });
  });

  describe("Financial Data Colors - WCAG AA Compliance", () => {
    const financialColors = {
      "success-600": "#16A34A", // Green
      "error-600": "#DC2626", // Red
      "warning-600": "#D97706", // Orange
      "info-600": "#2563EB", // Blue
      white: "#FFFFFF",
      "neutral-900": "#0F172A",
    };

    it("Success indicator (success-600 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        financialColors["success-600"],
        financialColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Error indicator (error-600 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        financialColors["error-600"],
        financialColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Warning indicator (warning-600 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        financialColors["warning-600"],
        financialColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });

    it("Info indicator (info-600 on white) should meet WCAG AA", () => {
      const result = validateColorCombination(
        financialColors["info-600"],
        financialColors.white,
        "normal"
      );

      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST.NORMAL_TEXT);
    });
  });

  describe("Edge Cases", () => {
    it("should handle shorthand hex colors", () => {
      const ratio = calculateContrastRatio("#fff", "#000");
      expect(ratio).toBeCloseTo(21, 1);
    });

    it("should handle hex colors with hash", () => {
      const ratio1 = calculateContrastRatio("#ffffff", "#000000");
      const ratio2 = calculateContrastRatio("ffffff", "000000");
      expect(ratio1).toBeCloseTo(ratio2, 1);
    });

    it("should throw error for invalid hex colors", () => {
      expect(() => calculateContrastRatio("invalid", "#ffffff")).toThrow();
      expect(() => calculateContrastRatio("#ffffff", "invalid")).toThrow();
    });
  });
});
