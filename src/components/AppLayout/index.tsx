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
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-gradient-to-r from-brand-800 to-brand-900 dark:from-neutral-900 dark:to-neutral-950 border-b border-brand-700/30 dark:border-neutral-700/30 shadow-xl shadow-brand-900/20 dark:shadow-neutral-950/40">
          <div className="flex flex-row items-center justify-between px-6 py-4">
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
              <button
                className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                onClick={toggleMobileSidebar}
              >
                {isMobileOpen ? (
                  <RiCloseLine className="h-5 w-5 text-white" />
                ) : (
                  <RiMenu3Line className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <NotificationPopup />
              <div className="px-5 py-2.5 rounded-xl bg-white/95 text-brand-800 font-bold text-sm shadow-lg shadow-white/10 hover:bg-white transition-all duration-200">
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
