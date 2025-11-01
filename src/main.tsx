import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./components/Auth";
import { ToastProvider } from "./components"; // Our custom Toast system
import { HeroUIProvider } from "@heroui/react";

import "react-tooltip/dist/react-tooltip.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./index.css";
import "driver.js/dist/driver.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </HeroUIProvider>
  </StrictMode>
);
