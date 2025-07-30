"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { EnhancedThemeToggle } from "@/components/ui/EnhancedThemeToggle";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { href: "/", icon: "dashboard", label: "Overview", color: "blue" },
  { href: "/reports", icon: "bar_chart", label: "Reports", color: "green" },
  { href: "/reports/revenue", icon: "attach_money", label: "Revenue", color: "blue" },
  { href: "/reports/conversions", icon: "trending_up", label: "Conversions", color: "green" },
  { href: "/reports/traffic", icon: "visibility", label: "Traffic", color: "purple" },
  { href: "/reports/engagement", icon: "favorite", label: "Engagement", color: "orange" },
  { href: "/settings", icon: "settings", label: "Settings", color: "purple" }
];

function DashboardContent({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        const hamburger = document.getElementById('hamburger-button');
        
        if (sidebar && !sidebar.contains(event.target as Node) && 
            hamburger && !hamburger.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        id="mobile-sidebar"
        initial={{ x: isMobile ? "-100%" : 0 }}
        animate={{ 
          x: isMobile ? (sidebarOpen ? 0 : "-100%") : 0 
        }}
        transition={{ 
          type: "spring" as const, 
          stiffness: 300, 
          damping: 30 
        }}
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 
          border-r border-slate-200 dark:border-slate-700 z-50 shadow-xl
          ${!isMobile ? 'block' : ''}
        `}
      >
        {/* Logo Section */}
        <motion.div 
          className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ADmyBRAND
            </span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`
                        relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }
                      `}
                      whileHover={{ scale: 1.02, x: isActive ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <motion.span 
                        className="material-icons text-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.span>
                      
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* User Info Section (Mobile) */}
        {isMobile && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  John Doe
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  john@admybrand.com
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${!isMobile ? 'ml-0' : ''}`}>
        {/* Enhanced Top Bar */}
        <motion.header 
          className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Button */}
            <motion.button
              id="hamburger-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`
                p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 
                hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200
                ${isMobile ? 'block' : 'lg:hidden'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="material-icons text-xl">
                  {sidebarOpen ? 'close' : 'menu'}
                </span>
              </motion.div>
            </motion.button>

            {/* Enhanced Search */}
            <motion.div
              className={`relative transition-all duration-300 ${
                searchFocused ? 'w-64 lg:w-80' : 'w-48 lg:w-64'
              }`}
              whileFocus={{ scale: 1.02 }}
            >
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-icons text-slate-400 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search anything..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-600 transition-all duration-200"
              />
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Recent searches will appear here...
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Date Picker (Hidden on small screens) */}
            <motion.input
              type="date"
              className="hidden md:block px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Time Display (Hidden on mobile) */}
            <motion.div 
              className="hidden lg:block text-sm text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </motion.div>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Theme Toggle */}
            <EnhancedThemeToggle />

            {/* User Profile (Hidden on mobile when sidebar is available) */}
            <div className={`${isMobile ? 'hidden' : 'block'}`}>
              <ProfileDropdown />
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main 
          className="flex-1 p-4 lg:p-6 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function HamburgerDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}