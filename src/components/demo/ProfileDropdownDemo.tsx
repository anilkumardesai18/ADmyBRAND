"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export function ProfileDropdownDemo() {
  const { user, isAuthenticated } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          👤 Profile Dropdown Demo
        </h1>
        
        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              ✅ Functional Profile Dropdown Implemented
            </h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              The profile dropdown in the top-right corner is now fully functional with:
            </p>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Dynamic User Data:</strong> Shows real user information from AuthContext
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Navigation Links:</strong> Profile, Settings, Help & Support, Privacy pages
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Logout Functionality:</strong> Clears session and redirects to login
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Responsive Design:</strong> Works on all screen sizes
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                🔗 Navigation Links
              </h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                <li>• <strong>Profile:</strong> /profile - User profile page</li>
                <li>• <strong>Account Settings:</strong> /settings - Settings page</li>
                <li>• <strong>Help & Support:</strong> /help-support - Help center</li>
                <li>• <strong>Privacy & Security:</strong> /privacy - Privacy settings</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                👤 Current User Data
              </h3>
              {isAuthenticated && user ? (
                <div className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Last Login:</strong> {user.lastLogin}</p>
                </div>
              ) : (
                <p className="text-purple-800 dark:text-purple-200 text-sm">
                  No user logged in
                </p>
              )}
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
              🚀 How to Test
            </h3>
            <ol className="space-y-2 text-orange-800 dark:text-orange-200 text-sm">
              <li><strong>1.</strong> Look at the top-right corner of the page</li>
              <li><strong>2.</strong> Click on the user avatar/profile button</li>
              <li><strong>3.</strong> Try clicking on different menu items to navigate</li>
              <li><strong>4.</strong> Test the "Sign Out" button to see logout functionality</li>
              <li><strong>5.</strong> Use demo credentials on login page: admin@admybrand.com / password</li>
            </ol>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              🔧 Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Components:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• ProfileDropdown.tsx</li>
                  <li>• AuthContext.tsx</li>
                  <li>• Navigation pages</li>
                  <li>• Login page</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Features:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• Next.js App Router</li>
                  <li>• React Context API</li>
                  <li>• TypeScript support</li>
                  <li>• Framer Motion animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}