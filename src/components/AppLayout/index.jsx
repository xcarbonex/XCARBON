import React from "react";
import {Outlet} from "react-router-dom";
import {Input as SearchInput} from "@/components";
import {IoIosSearch} from "react-icons/io";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useTheme} from "@/components/ThemeProvider";
import {SidebarProvider, useSidebar} from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import NotificationPopup from "@/components/NotificationPopup";
import {
  ScrollBarWrapper,
  PWAInstallPrompt,
  PWAUpdatePrompt,
} from "@/components";
import {UserProfile} from "@/components/Auth";
import clsx from "clsx";
import {ThemeProvider} from "@/components/ThemeProvider";
import {AuthProvider} from "@/components/Auth";
function MainLayout() {
  const {theme} = useTheme();
  const {isMobileOpen, toggleMobileSidebar} = useSidebar();

  return (
    <main className={`flex min-h-screen ${theme}`}>
      <Sidebar />
      <div className="flex-1 transition-all duration-500 ease-in-out flex flex-col">
        <header className="sticky top-0 z-30 bg-[#A6B3B1] dark:bg-background text-tbase border-b">
          <div className="flex flex-row items-center justify-between px-4 py-2">
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 py-2 sm:py-0">
              <button
                className="lg:hidden bg-transparent p-2 rounded-md hover:bg-black/10 transition-colors duration-300"
                onClick={toggleMobileSidebar}
              >
                {isMobileOpen ? (
                  <RiCloseLine className="h-6 w-6 text-tbase" />
                ) : (
                  <RiMenu3Line className="h-6 w-6 text-tbase" />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 py-2 sm:py-0">
              <NotificationPopup />
              <UserProfile />
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
}

function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          <MainLayout />
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Layout;
