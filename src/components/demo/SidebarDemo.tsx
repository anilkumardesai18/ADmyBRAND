"use client";

import { motion } from "framer-motion";

export function SidebarDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          🍔 Collapsible Sidebar Demo
        </h1>
        
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              How to Use the Collapsible Sidebar
            </h2>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                Click the hamburger icon (☰) in the top-left of the sidebar to toggle
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Expanded:</strong> Shows full width (280px) with icons and labels
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                <strong>Collapsed:</strong> Shows compact width (88px) with icons only
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-sm">check_circle</span>
                Smooth animations with 0.3s transition duration
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                ✅ Features Implemented
              </h3>
              <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
                <li>• React useState for state management</li>
                <li>• Hamburger icon toggle button</li>
                <li>• Smooth CSS transitions</li>
                <li>• Animated icon rotation</li>
                <li>• Responsive design</li>
                <li>• Dark mode support</li>
                <li>• Framer Motion animations</li>
                <li>• Active state indicators</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                🎨 Styling Details
              </h3>
              <ul className="space-y-1 text-purple-800 dark:text-purple-200 text-sm">
                <li>• Expanded: 280px width</li>
                <li>• Collapsed: 88px width</li>
                <li>• Transition: 0.3s ease-in-out</li>
                <li>• Gradient backgrounds</li>
                <li>• Hover effects</li>
                <li>• Focus states</li>
                <li>• Custom scrollbars</li>
                <li>• Glass morphism effects</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
              🚀 Try It Now!
            </h3>
            <p className="text-orange-800 dark:text-orange-200 mb-4">
              Look at the sidebar on the left and click the hamburger menu icon to see the collapsible functionality in action.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                Click to Toggle
              </span>
              <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                Smooth Animation
              </span>
              <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                Icon Rotation
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}