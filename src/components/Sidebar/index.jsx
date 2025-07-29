import React, {useState} from "react";
import {sidebar} from "@/appData";
import {NavLink} from "react-router-dom";
import {useSidebar} from "@/context/SidebarContext";
import ToggleButton from "./ToggleButton";
import Typography from "@/components/Typography";
import logoX from "@/assets/logoX.svg";
import clsx from "clsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {Modal, Button} from "@/components";
import bronze from "@/assets/bronze.svg";
function Sidebar() {
  let location = useLocation();
  const navigate = useNavigate();
  const {isCollapsed, isMobileOpen, toggleMobileSidebar} = useSidebar();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    // Here you would typically clear user session, tokens, etc.
    // console.log("User logged out");
    setIsLogoutModalOpen(false);
    navigate("/login"); // Redirect to login page
  };

  const openLogoutModal = (e) => {
    e.preventDefault(); // Prevent default NavLink navigation
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Base classes for the sidebar
  const sidebarClasses = `
    fixed lg:relative
    flex flex-col
    h-full md:h-screen
    bg-background
    py-2
    transition delay-150 duration-[300ms] ease-in-out
    dark:border-r
    ${isCollapsed ? "w-20" : "w-72"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    z-50
  `;

  // Mobile overlay
  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50
    lg:hidden
    transition-opacity duration-500
    ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
    z-40
  `;

  return (
    <>
      <div className={overlayClasses} onClick={toggleMobileSidebar} />

      <div className={sidebarClasses}>
        <Tooltip id="sidebar_nav" place="right" />
        <div className={`hidden lg:block ${isMobileOpen ? "hidden" : ""}`}>
          <ToggleButton />
        </div>

        <div className="relative flex items-center justify-center h-[10%] overflow-hidden px-4">
          <img
            src={isCollapsed ? logoX : sidebar.logo}
            alt="Logo"
            className={`
              max-h-9 object-cover
              ${isCollapsed ? "w-10 h-10" : "w-full"}
            `}
          />
        </div>

        <div className="px-4 flex flex-col flex-1 bg-background text-text">
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 py-4">
              {sidebar.navigation.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.route}
                    onClick={toggleMobileSidebar}
                    data-tooltip-id={isCollapsed ? "sidebar_nav" : undefined}
                    data-tooltip-content={isCollapsed ? item.label : undefined}
                    className={({isActive}) => `
                      flex items-center
                      px-4 py-3
                       rounded-md
                       border
                      transition-all duration-900
                      ${isCollapsed ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-[#A6B3B1] dark:bg-black border-[#A6B3B1] dark:border-[#363638]"
                          : "hover:bg-[#5d7975] dark:hover:bg-[#202020d8] border-transparent"
                      }
                    `}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`
                        h-6 w-6 min-w-[24px]
                        ${!isCollapsed && "mr-3"}
                      `}
                    />
                    {!isCollapsed && (
                      <Typography
                        variant="body2"
                        className={clsx(
                          "whitespace-nowrap text-white overflow-hidden transition-all duration-300",
                          {"font-extrabold": location.pathname === item.route}
                        )}
                      >
                        {item.label}
                      </Typography>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Navigation */}
          <footer className="mt-auto">
             <div className="flex flex-nowrap gap-3 w-full border-1 mb-3 p-3 rounded-md">
              <img
              src={bronze}
               alt={"Bronze Plan"}
              className="h-7 w-7"
                />
  
               {!isCollapsed && (
                 <Typography variant="h4" className="text-[#949494]">
                  Bronze
                 </Typography>
               )}
             </div>
            <hr className="border-[#A6B3B1] dark:border-[#363638] mb-4" />
            <ul className="space-y-1">
              {sidebar.footernav.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.route}
                    onClick={
                      item.label === "Logout"
                        ? openLogoutModal
                        : toggleMobileSidebar
                    }
                    className={({isActive}) => `
                      flex items-center
                      px-4 py-3
                       rounded-md
                       border
                      transition-all duration-900
                      ${isCollapsed ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-[#A6B3B1] dark:bg-black border-[#A6B3B1] dark:border-[#363638]"
                          : "hover:bg-[#5d7975] dark:hover:bg-[#202020d8] border-transparent"
                      }
                    `}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`
                        h-6 w-6 min-w-[24px]
                        ${!isCollapsed && "mr-3"}
                      `}
                    />
                    {!isCollapsed && (
                      <Typography
                        variant="body2"
                        className={clsx(
                          "whitespace-nowrap text-white overflow-hidden transition-all duration-300",
                          {"font-extrabold": location.pathname === item.route}
                        )}
                      >
                        {item.label}
                      </Typography>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
      >
        <Typography
          variant="body2"
          className="text-gray-700 dark:text-gray-300"
        >
          Logging out will end your current session. You will need to log in
          again to access your account.
        </Typography>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={closeLogoutModal}
            size="sm"
            className="bg-gray-300   dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            size="sm"
            className="bg-accent text-white px-4 py-2 rounded-md"
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Sidebar;
