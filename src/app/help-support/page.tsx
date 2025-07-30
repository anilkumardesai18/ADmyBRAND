"use client";

import { motion } from "framer-motion";

export default function HelpSupportPage() {
  const helpCategories = [
    {
      icon: "help_center",
      title: "Getting Started",
      description: "Learn the basics of using ADmyBRAND Insights",
      articles: 12
    },
    {
      icon: "analytics",
      title: "Analytics & Reports",
      description: "Understanding your data and generating reports",
      articles: 8
    },
    {
      icon: "settings",
      title: "Account Management",
      description: "Managing your account settings and preferences",
      articles: 6
    },
    {
      icon: "security",
      title: "Security & Privacy",
      description: "Keeping your data safe and secure",
      articles: 4
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Help & Support
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Find answers to your questions and get the help you need
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 material-icons text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {helpCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="material-icons text-blue-600 dark:text-blue-400">
                {category.icon}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {category.description}
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              {category.articles} articles
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 border border-blue-200 dark:border-slate-600">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-white text-2xl">support_agent</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Need More Help?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}