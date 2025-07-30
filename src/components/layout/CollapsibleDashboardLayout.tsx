"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { EnhancedThemeToggle } from "@/components/ui/EnhancedThemeToggle";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top Bar */}
        <motion.header 
          className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left Section */}
          <div className="flex items-center gap-4">
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

            {/* Date Picker */}
            <motion.input
              type="date"
              className="hidden md:block px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Time Display */}
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

            {/* User Profile */}
            <ProfileDropdown />
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

export function CollapsibleDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}