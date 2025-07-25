import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {ThemeProvider} from "./components/ThemeProvider";
import {AuthProvider} from "./components/Auth";
import {ToastContainer} from "react-toastify";
import {HeroUIProvider} from "@heroui/react";

import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </HeroUIProvider>
  </StrictMode>
);
