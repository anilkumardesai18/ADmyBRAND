"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalMetricCard } from "@/components/dashboard/ProfessionalMetricCard";
import { ProfessionalChart } from "@/components/dashboard/ProfessionalCharts";
import { AdvancedDataTable } from "@/components/dashboard/AdvancedDataTable";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";

import chartData from "@/data/chartData.json";
import tableData from "@/data/enhancedTableData.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [dashboardView, setDashboardView] = useState<'overview' | 'detailed'>('overview');

  // Professional metrics data
  const professionalMetrics = [
    {
      icon: "attach_money",
      title: "Total Revenue",
      value: "$245,890",
      change: 12.5,
      color: "blue" as const,
      subtitle: "Monthly recurring revenue",
      target: "$300,000",
      period: "vs last month"
    },
    {
      icon: "people",
      title: "Active Users",
      value: "12,847",
      change: 8.3,
      color: "green" as const,
      subtitle: "Unique monthly users",
      target: "15,000",
      period: "vs last month"
    },
    {
      icon: "trending_up",
      title: "Conversion Rate",
      value: "4.2%",
      change: -2.1,
      color: "purple" as const,
      subtitle: "Overall conversion rate",
      target: "5.0%",
      period: "vs last month"
    },
    {
      icon: "shopping_cart",
      title: "Avg Order Value",
      value: "$89.50",
      change: 5.7,
      color: "orange" as const,
      subtitle: "Average order value",
      target: "$95.00",
      period: "vs last month"
    },
    {
      icon: "visibility",
      title: "Page Views",
      value: "1.2M",
      change: 15.2,
      color: "blue" as const,
      subtitle: "Total page views",
      target: "1.5M",
      period: "vs last month"
    },
    {
      icon: "schedule",
      title: "Avg Session",
      value: "3m 42s",
      change: 7.8,
      color: "green" as const,
      subtitle: "Average session duration",
      target: "4m 00s",
      period: "vs last month"
    }
  ];

  const timeRanges = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Enhanced Page Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div className="space-y-2">
          <motion.h1 
            className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Analytics Dashboard
          </motion.h1>
          <motion.p 
            className="text-slate-600 dark:text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Monitor your business performance and key metrics in real-time
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* View Toggle */}
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <motion.button
              onClick={() => setDashboardView('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                dashboardView === 'overview'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Overview
            </motion.button>
            <motion.button
              onClick={() => setDashboardView('detailed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                dashboardView === 'detailed'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Detailed
            </motion.button>
          </div>

          {/* Time Range Selector */}
          <motion.div 
            className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {timeRanges.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => setSelectedTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTimeRange === range.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="material-icons text-sm"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                refresh
              </motion.span>
              Refresh
            </motion.button>
            
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-icons text-sm">add</span>
              New Campaign
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Conditional Content Based on View */}
      {dashboardView === 'overview' ? (
        <div>
          <AnalyticsOverview />
        </div>
      ) : (
        <>
          {/* Professional Metric Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
          >
            {professionalMetrics.map((metric, idx) => (
              <ProfessionalMetricCard
                key={idx}
                icon={metric.icon}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                color={metric.color}
                subtitle={metric.subtitle}
                target={metric.target}
                period={metric.period}
                delay={idx * 0.1}
              />
            ))}
          </motion.div>

          {/* Professional Charts Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <ProfessionalChart
              data={chartData.revenueOverTime}
              title="Revenue Analytics"
              dataKey="revenue"
              color="#3B82F6"
              type="area"
              showControls={true}
            />
            
            <ProfessionalChart
              data={chartData.revenueByChannel}
              title="Channel Performance"
              dataKey="revenue"
              color="#10B981"
              type="bar"
              showControls={true}
            />
          </motion.div>

          {/* Advanced Data Table */}
          <motion.div variants={itemVariants}>
            <AdvancedDataTable
              data={tableData}
              title="Campaign Performance Analytics"
              showFilters={true}
              showExport={true}
              showBulkActions={true}
            />
          </motion.div>

          {/* AI Insights Section */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border border-blue-200 dark:border-slate-600"
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10 flex items-start gap-6">
              <motion.div 
                className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="material-icons text-white text-2xl">psychology</span>
              </motion.div>
              
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  AI-Powered Business Insights
                </motion.h3>
                
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      text: "Revenue growth is accelerating with a 12.5% increase this month", 
                      color: "green", 
                      icon: "trending_up",
                      priority: "high"
                    },
                    { 
                      text: "Conversion rate declined by 2.1% - consider optimizing landing pages", 
                      color: "orange", 
                      icon: "warning",
                      priority: "medium"
                    },
                    { 
                      text: "Mobile traffic increased 25% - mobile optimization is working", 
                      color: "blue", 
                      icon: "phone_android",
                      priority: "info"
                    },
                    { 
                      text: "Top performing channel: Organic Search (45% of traffic)", 
                      color: "purple", 
                      icon: "search",
                      priority: "info"
                    }
                  ].map((insight, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          insight.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                          insight.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          insight.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                          'bg-purple-100 dark:bg-purple-900/30'
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className={`material-icons text-sm ${
                          insight.color === 'green' ? 'text-green-600 dark:text-green-400' :
                          insight.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          insight.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`}>
                          {insight.icon}
                        </span>
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{insight.text}</span>
                        <div className={`text-xs mt-1 font-medium ${
                          insight.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                          insight.priority === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                          'text-slate-500 dark:text-slate-400'
                        }`}>
                          {insight.priority.toUpperCase()} PRIORITY
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}