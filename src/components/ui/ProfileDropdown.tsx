"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get user data and logout function from AuthContext
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    setIsOpen(false);
    logout(); // This will clear session data and redirect to /login
  };

  // Navigation menu items with their respective routes
  const navigationItems = [
    { 
      icon: "person", 
      label: "Profile", 
      href: "/profile",
      description: "View and edit your profile"
    },
    { 
      icon: "settings", 
      label: "Account Settings", 
      href: "/settings",
      description: "Manage your account preferences"
    },
    { 
      icon: "help", 
      label: "Help & Support", 
      href: "/help-support",
      description: "Get help and contact support"
    },
    { 
      icon: "security", 
      label: "Privacy & Security", 
      href: "/privacy",
      description: "Manage privacy and security settings"
    }
  ];

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Fallback user data if not available
  const displayUser = user || {
    name: 'Guest User',
    email: 'guest@admybrand.com',
    role: 'Guest'
  };

  const userInitials = getUserInitials(displayUser.name);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {userInitials}
        </motion.div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {displayUser.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {displayUser.role}
          </div>
        </div>
        <motion.span 
          className="material-icons text-slate-400 text-sm"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          expand_more
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50"
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {userInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {displayUser.name}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {displayUser.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu Items */}
            <div className="py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.div
                    className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="material-icons text-sm text-slate-500 dark:text-slate-400">
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </div>
                    </div>
                    <span className="material-icons text-xs text-slate-400">
                      chevron_right
                    </span>
                  </motion.div>
                </Link>
              ))}

              {/* Divider */}
              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

              {/* Sign Out Button */}
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="material-icons text-sm">logout</span>
                <div className="flex-1">
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-red-500 dark:text-red-400">
                    End your current session
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Version 2.1.0 • Last login: {user?.lastLogin || 'Today'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}