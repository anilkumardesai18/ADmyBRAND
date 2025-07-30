"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: true,
    marketing: false,
    twoFactor: true,
    loginNotifications: true,
    dataExport: false
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const privacySettings = [
    {
      category: "Data & Privacy",
      items: [
        {
          key: "dataCollection" as keyof typeof settings,
          title: "Data Collection",
          description: "Allow collection of usage data to improve our services",
          icon: "data_usage"
        },
        {
          key: "analytics" as keyof typeof settings,
          title: "Analytics Tracking",
          description: "Enable analytics tracking for better user experience",
          icon: "analytics"
        },
        {
          key: "marketing" as keyof typeof settings,
          title: "Marketing Communications",
          description: "Receive marketing emails and promotional content",
          icon: "email"
        }
      ]
    },
    {
      category: "Security",
      items: [
        {
          key: "twoFactor" as keyof typeof settings,
          title: "Two-Factor Authentication",
          description: "Add an extra layer of security to your account",
          icon: "security"
        },
        {
          key: "loginNotifications" as keyof typeof settings,
          title: "Login Notifications",
          description: "Get notified when someone logs into your account",
          icon: "notifications"
        },
        {
          key: "dataExport" as keyof typeof settings,
          title: "Data Export Requests",
          description: "Allow automatic processing of data export requests",
          icon: "file_download"
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Privacy & Security
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your privacy settings and security preferences
        </p>
      </div>

      <div className="space-y-8">
        {privacySettings.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {section.category}
              </h2>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <span className="material-icons text-slate-600 dark:text-slate-400 text-sm">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleToggle(item.key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings[item.key] 
                        ? 'bg-blue-600' 
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{
                        x: settings[item.key] ? 24 : 2
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Data Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons text-blue-600 dark:text-blue-400">file_download</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Export Data</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Download a copy of your data
            </p>
          </button>
          
          <button className="p-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons text-orange-600 dark:text-orange-400">delete_sweep</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Delete Data</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Permanently delete your data
            </p>
          </button>
          
          <button className="p-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons text-green-600 dark:text-green-400">policy</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">Privacy Policy</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Read our privacy policy
            </p>
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </motion.div>
    </motion.div>
  );
}