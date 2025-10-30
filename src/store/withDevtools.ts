import { devtools } from "zustand/middleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDevtools = (config: any, name: string): any =>
  devtools(config, { name });
