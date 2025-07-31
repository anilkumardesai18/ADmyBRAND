"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveSidebarProps {
  className?: string;
}

const navigationItems = [
  { href: "/", icon: "dashboard", label: "Overview" },
  { href: "/reports", icon: "bar_chart", label: "Reports" },
  { href: "/reports/revenue", icon: "attach_money", label: "Revenue" },
  { href: "/reports/conversions", icon: "trending_up", label: "Conversions" },
  { href: "/reports/traffic", icon: "visibility", label: "Traffic" },
  { href: "/reports/engagement", icon: "favorite", label: "Engagement" },
  { href: "/settings", icon: "settings", label: "Settings" }
];

export function ResponsiveSidebar({ className = "" }: ResponsiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      // Auto-close mobile sidebar when switching to desktop
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileOpen) {
        const sidebar = document.getElementById('responsive-sidebar');
        const hamburger = document.getElementById('hamburger-toggle');
        
        if (sidebar && !sidebar.contains(event.target as Node) && 
            hamburger && !hamburger.contains(event.target as Node)) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen]);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Mobile overlay
  const mobileOverlay = isMobile && isMobileOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={() => setIsMobileOpen(false)}
    />
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOverlay}
      </AnimatePresence>

      {/* Hamburger Button - Always visible on mobile, hidden on desktop when sidebar is expanded */}
      <motion.button
        id="hamburger-toggle"
        onClick={toggleSidebar}
        className={`
          fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-slate-800 
          text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700
          hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200
          ${isMobile ? 'block' : (isCollapsed ? 'block' : 'hidden')}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: (isMobile ? isMobileOpen : isCollapsed) ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="material-icons text-xl">
            {(isMobile ? isMobileOpen : isCollapsed) ? 'close' : 'menu'}
          </span>
        </motion.div>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        id="responsive-sidebar"
        initial={false}
        animate={{
          x: isMobile ? (isMobileOpen ? 0 : "-100%") : 0,
          width: isMobile ? 280 : (isCollapsed ? 88 : 280)
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.3
        }}
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          left-0 top-0 h-full bg-white dark:bg-slate-800 
          border-r border-slate-200 dark:border-slate-700 z-50 shadow-xl
          flex flex-col
          ${className}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <AnimatePresence mode="wait">
            {(!isMobile && isCollapsed) ? (
              <motion.div
                key="collapsed-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative z-10"
              >
                <span className="text-white font-bold text-sm">A</span>
              </motion.div>
            ) : (
              <motion.div
                key="expanded-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 relative z-10"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`
                        relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200
                        ${(!isMobile && isCollapsed) ? 'justify-center' : ''}
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }
                      `}
                      whileHover={{ scale: 1.02, x: isActive ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                      title={(!isMobile && isCollapsed) ? item.label : undefined}
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
                        {(isMobile || !isCollapsed) && (
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

        {/* User Info Section */}
        <AnimatePresence>
          {(isMobile || !isCollapsed) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-4 border-t border-slate-200 dark:border-slate-700"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle Button (Desktop Only) */}
        {!isMobile && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <motion.button
              onClick={toggleSidebar}
              className={`
                w-full flex items-center gap-2 py-3 px-4 rounded-xl 
                bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 
                font-medium hover:bg-slate-200 dark:hover:bg-slate-600 
                transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <motion.span
                className="material-icons"
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isCollapsed ? 'chevron_right' : 'chevron_left'}
              </motion.span>
              
              <AnimatePresence>
                {!isCollapsed && (
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
        )}
      </motion.aside>
    </>
  );
}