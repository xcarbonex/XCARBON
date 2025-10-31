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
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200/50 dark:border-neutral-700/30 shadow-sm">
          <div className="flex flex-row items-center justify-between px-6 py-3">
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200"
                onClick={toggleMobileSidebar}
              >
                {isMobileOpen ? (
                  <RiCloseLine className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <RiMenu3Line className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <NotificationPopup />
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-md shadow-brand-700/20">
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
