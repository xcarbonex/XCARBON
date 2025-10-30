/**
 * Type declarations for third-party libraries without official type definitions
 */

/* eslint-disable no-unused-vars */

// Add minimal type declarations for libraries that don't have @types packages
// TODO: Replace with proper types when available

declare module "react-toggle-slider" {
  import { FC } from "react";

  interface ToggleSliderProps {
    active?: boolean;
    onToggle?: () => void;
    barBackgroundColor?: string;
    barBackgroundColorActive?: string;
    barHeight?: string;
    barWidth?: string;
    draggable?: boolean;
    barTransitionDuration?: string;
    barTransitionType?: string;
  }

  const ToggleSlider: FC<ToggleSliderProps>;
  export default ToggleSlider;
}

declare module "react-qr-code" {
  import { FC, CSSProperties } from "react";

  interface QRCodeProps {
    value: string;
    size?: number;
    level?: "L" | "M" | "Q" | "H";
    bgColor?: string;
    fgColor?: string;
    style?: CSSProperties;
  }

  const QRCode: FC<QRCodeProps>;
  export default QRCode;
}

declare module "react-popup-manager" {
  export interface PopupOptions {
    [key: string]: unknown;
  }

  export function usePopupManager(): {
    open: (_id: string, _options?: PopupOptions) => void;
    close: (_id: string) => void;
    isOpen: (_id: string) => boolean;
  };
}
