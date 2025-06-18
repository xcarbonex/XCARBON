import React from 'react'
import { sidebar } from '@/appData'
import { NavLink } from "react-router-dom";
import { useSidebar } from '@/context/SidebarContext';
import ToggleButton from './ToggleButton';
import Typography from '@/components/Typography';
import logoX from '@/assets/logoX.svg';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'

function Sidebar() {
  const location = useLocation()
  const { isCollapsed, isMobileOpen, toggleMobileSidebar } = useSidebar();

  // Base classes for the sidebar
  const sidebarClasses = `
    fixed lg:relative
    flex flex-col
    h-full md:h-screen
    bg-background
    py-2
    transition delay-150 duration-[300ms] ease-in-out
    dark:border-r
    ${isCollapsed ? 'w-20' : 'w-72'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    z-50
  `;

  // Mobile overlay
  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50
    lg:hidden
    transition-opacity duration-500
    ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    z-40
  `;

  return (
    <>

      <div className={overlayClasses} onClick={toggleMobileSidebar} />

      <div className={sidebarClasses}>
      <Tooltip id="sidebar_nav" place="right"/>
        <div className={`hidden lg:block ${isMobileOpen ? 'hidden' : ''}`}>
          <ToggleButton />
        </div>
        
        <div className='relative flex items-center justify-center h-[10%] overflow-hidden px-4'>
          <img 
            src={isCollapsed ? logoX : sidebar.logo} 
            alt="Logo" 
            className={`
              max-h-9 object-cover
              ${isCollapsed ? 'w-10 h-10' : 'w-full'}
            `}
          />
        </div>
              
        <div className='px-4 flex flex-col flex-1 bg-background text-text'>
          <nav className='flex-1 overflow-y-auto'>
            <ul className='space-y-1 py-4'>
              {sidebar.navigation.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.route}
                    onClick={toggleMobileSidebar}
                    data-tooltip-id={isCollapsed ? 'sidebar_nav' : undefined}
                    data-tooltip-content={isCollapsed ? item.label : undefined}
                    className={({ isActive }) => `
                      flex items-center
                      px-4 py-3
                       rounded-md
                       border
                      transition-all duration-900
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive ? 'bg-[#A6B3B1] dark:bg-black border-[#A6B3B1] dark:border-[#363638]' : 'hover:bg-[#5d7975] dark:hover:bg-[#202020d8] border-transparent'}
                    `}
                  >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className={`
                        h-6 w-6 min-w-[24px]
                        ${!isCollapsed && 'mr-3'}
                      `}
                    />
                    {!isCollapsed && (
                      <Typography variant="body2" className={clsx("whitespace-nowrap text-white overflow-hidden transition-all duration-300", {'font-extrabold': location.pathname === item.route})}>
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
            <hr className='border-[#A6B3B1] dark:border-[#363638] mb-4'/>
            <ul className='space-y-1'>
              {sidebar.footernav.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.route}
                    className={({ isActive }) => `
                      flex items-center
                      px-4 py-3
                       rounded-md
                       border
                      transition-all duration-900
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive ? 'bg-[#A6B3B1] dark:bg-black border-[#A6B3B1] dark:border-[#363638]' : 'hover:bg-[#5d7975] dark:hover:bg-[#202020d8] border-transparent'}
                    `}
                  >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className={`
                        h-6 w-6 min-w-[24px]
                        ${!isCollapsed && 'mr-3'}
                      `}
                    />
                    {!isCollapsed && (
                      <Typography variant="body2" className={clsx("whitespace-nowrap text-white overflow-hidden transition-all duration-300", {'font-extrabold': location.pathname === item.route})}>
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
    </>
  )
}

export default Sidebar