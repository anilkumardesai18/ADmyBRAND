"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    monthly: false
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@admybrand.com",
    timezone: "UTC-5",
    language: "English"
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: "person" },
    { id: "notifications", label: "Notifications", icon: "notifications" },
    { id: "security", label: "Security", icon: "security" },
    { id: "api", label: "API", icon: "code" }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const ToggleSwitch = ({ checked, onChange, label, description }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
      <div>
        <div className="font-medium text-slate-900 dark:text-slate-100">{label}</div>
        <div className="text-sm text-slate-600 dark:text-slate-400">{description}</div>
      </div>
      <motion.label 
        className="relative inline-flex items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <motion.div
          className={`w-11 h-6 rounded-full transition-all duration-300 ${
            checked ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
          animate={{ backgroundColor: checked ? '#3B82F6' : '#64748B' }}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full shadow-md"
            animate={{ x: checked ? 22 : 2, y: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </motion.div>
      </motion.label>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <motion.h1 
          className="text-responsive-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Settings & Preferences
        </motion.h1>
        <motion.p 
          className="text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Manage your account settings and application preferences
        </motion.p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl"
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <span className="material-icons text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {activeTab === "profile" && (
            <>
              {/* Profile Settings */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    A
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Profile Information</h2>
                    <p className="text-slate-600 dark:text-slate-400">Update your personal details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <motion.input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <motion.input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Timezone
                      </label>
                      <motion.select
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </motion.select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Language
                      </label>
                      <motion.select
                        value={profile.language}
                        onChange={(e) => setProfile({...profile, language: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </motion.select>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleSave()}
                    disabled={isSaving}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSaving ? (
                        <motion.span
                          key="saving"
                          className="material-icons animate-spin"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          refresh
                        </motion.span>
                      ) : (
                        <motion.span
                          key="save"
                          className="material-icons"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          save
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Account Stats */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Account Statistics</h2>
                
                <div className="space-y-4">
                  {[
                    { label: "Account Created", value: "March 15, 2024", icon: "calendar_today" },
                    { label: "Total Campaigns", value: "47", icon: "campaign" },
                    { label: "Data Usage", value: "2.3 GB / 10 GB", icon: "storage" },
                    { label: "API Calls", value: "1,247 / 10,000", icon: "api" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="material-icons text-blue-600 dark:text-blue-400 text-sm">
                            {stat.icon}
                          </span>
                        </motion.div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {stat.label}
                        </span>
                      </div>
                      <span className="text-slate-600 dark:text-slate-400 font-mono">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === "notifications" && (
            <motion.div 
              className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
              variants={itemVariants}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                <ToggleSwitch
                  checked={notifications.email}
                  onChange={(checked) => setNotifications({...notifications, email: checked})}
                  label="Email Notifications"
                  description="Receive important updates and alerts via email"
                />
                
                <ToggleSwitch
                  checked={notifications.push}
                  onChange={(checked) => setNotifications({...notifications, push: checked})}
                  label="Push Notifications"
                  description="Get real-time notifications in your browser"
                />
                
                <ToggleSwitch
                  checked={notifications.weekly}
                  onChange={(checked) => setNotifications({...notifications, weekly: checked})}
                  label="Weekly Reports"
                  description="Receive comprehensive weekly performance summaries"
                />
                
                <ToggleSwitch
                  checked={notifications.monthly}
                  onChange={(checked) => setNotifications({...notifications, monthly: checked})}
                  label="Monthly Reports"
                  description="Get detailed monthly analytics and insights"
                />
              </div>

              <motion.button
                onClick={() => handleSave()}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-icons">save</span>
                Save Notification Settings
              </motion.button>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div 
              className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
              variants={itemVariants}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Security Settings
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <motion.button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enable 2FA
                  </motion.button>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Password
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Last changed 30 days ago
                  </p>
                  <motion.button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Change Password
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div 
              className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
              variants={itemVariants}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                API Configuration
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sk-1234567890abcdef"
                      readOnly
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    />
                    <motion.button
                      className="px-4 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Regenerate
                    </motion.button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-app.com/webhook"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Danger Zone */}
      <motion.div 
        variants={itemVariants}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-medium text-red-900 dark:text-red-100">Delete Account</div>
            <div className="text-sm text-red-700 dark:text-red-300">
              Permanently delete your account and all associated data
            </div>
          </div>
          <motion.button
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-icons text-sm">delete_forever</span>
            Delete Account
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}