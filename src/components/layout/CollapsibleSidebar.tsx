"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
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

export function CollapsibleSidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : 'sidebar--expanded'} ${className}`}
      animate={{ width: isCollapsed ? 88 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header with Hamburger Toggle */}
      <div className="sidebar__header">
        <motion.button
          onClick={toggleSidebar}
          className="sidebar__toggle"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 90 }}
            transition={{ duration: 0.3 }}
            className="sidebar__hamburger"
          >
            <span className="material-icons">
              {isCollapsed ? 'menu' : 'close'}
            </span>
          </motion.div>
        </motion.button>
        
        {/* Logo - Only show when expanded */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="sidebar__logo"
            >
              <div className="sidebar__logo-icon">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="sidebar__logo-text">ADmyBRAND</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="sidebar__nav-item"
              >
                <Link href={item.href} className={`sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sidebar__nav-content"
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="sidebar__active-indicator"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.span 
                      className="sidebar__nav-icon material-icons"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    {/* Label - Only show when expanded */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="sidebar__nav-label"
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

      {/* Footer - Only show when expanded */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="sidebar__footer"
          >
            <div className="sidebar__user">
              <div className="sidebar__user-avatar">
                <span className="text-white font-bold text-xs">JD</span>
              </div>
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">John Doe</div>
                <div className="sidebar__user-email">john@admybrand.com</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}