import React from "react";
import { Outlet } from "react-router-dom";
import { Input as SearchInput } from "@/components";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useTheme } from "@/components/ThemeProvider";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import NotificationPopup from "@/components/NotificationPopup";
import { ScrollBarWrapper, PWAInstallPrompt, PWAUpdatePrompt } from "@/components";
import { UserProfile } from "@/components/Auth";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/Auth";

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <main className={`flex min-h-screen ${theme}`}>
      <Sidebar />
      <div className="flex-1 transition-all duration-500 ease-in-out flex flex-col">
        {/* Header with proper light/dark mode contrast */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-300/80 dark:border-neutral-700/50 shadow-lg">
          <div className="flex flex-row items-center justify-between px-6 py-4">
            {/* Left: Mobile menu button */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
              <button
                className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 border border-neutral-300 dark:border-neutral-600"
                onClick={toggleMobileSidebar}
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMobileOpen ? (
                  <RiCloseLine className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                ) : (
                  <RiMenu3Line className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                )}
              </button>
            </div>

            {/* Right: Control cluster */}
            <div className="flex items-center gap-3">
              <NotificationPopup />
              <div className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold text-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200">
                Google LLC
              </div>
              {/* <UserProfile /> */}
            </div>
          </div>
        </header>

        <div className=" flex-1 bg-main text-text">
          <ScrollBarWrapper>
            <main className={clsx("md:pl-2 m-2 my-4")}>
              <Outlet />
            </main>
          </ScrollBarWrapper>
        </div>
      </div>

      {/* PWA Components */}
      {/* <PWAInstallPrompt />
      <PWAUpdatePrompt /> */}
    </main>
  );
};

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          <MainLayout />
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Layout;
