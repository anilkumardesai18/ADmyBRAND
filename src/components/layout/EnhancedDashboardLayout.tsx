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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 64 }
  };

  const contentVariants = {
    expanded: { marginLeft: 256 },
    collapsed: { marginLeft: 64 }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Enhanced Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 shadow-xl"
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
          <motion.div
            animate={{ 
              scale: sidebarCollapsed ? 1.2 : 1,
              rotate: sidebarCollapsed ? 360 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {sidebarCollapsed ? (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND
                </span>
              </div>
            )}
          </motion.div>
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
                        ${sidebarCollapsed ? 'justify-center' : ''}
                      `}
                      whileHover={{ scale: 1.02, x: isActive ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <motion.span 
                        className="material-icons text-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.span>
                      
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="material-icons"
              animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              chevron_left
            </motion.span>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.div
        variants={contentVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col min-w-0"
      >
        {/* Enhanced Top Bar */}
        <motion.header 
          className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Enhanced Search */}
            <motion.div
              className={`relative transition-all duration-300 ${
                searchFocused ? 'w-80' : 'w-64'
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
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Time Display */}
            <motion.div 
              className="hidden md:block text-sm text-slate-600 dark:text-slate-400"
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
          className="flex-1 p-6 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </motion.div>
    </div>
  );
}

export function EnhancedDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}