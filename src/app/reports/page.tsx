"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLineChart } from "@/components/dashboard/LineChart";
import { DashboardBarChart } from "@/components/dashboard/BarChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { DataTable } from "@/components/dashboard/DataTable";

import chartData from "@/data/chartData.json";
import tableData from "@/data/tableData.json";

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

export default function ReportsPage() {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [dateRange, setDateRange] = useState("30d");
  const [isExporting, setIsExporting] = useState(false);

  const metrics = [
    { id: "revenue", label: "Revenue", icon: "attach_money", color: "blue" },
    { id: "conversions", label: "Conversions", icon: "trending_up", color: "green" },
    { id: "traffic", label: "Traffic", icon: "visibility", color: "purple" },
    { id: "engagement", label: "Engagement", icon: "favorite", color: "orange" }
  ];

  const performanceData = [
    { metric: "Total Revenue", value: "$52,890", change: "+12.5%", trend: "up" },
    { metric: "Total Conversions", value: "2,847", change: "+8.3%", trend: "up" },
    { metric: "Avg. Conversion Rate", value: "4.2%", change: "-0.3%", trend: "down" },
    { metric: "Cost Per Acquisition", value: "$18.50", change: "-5.2%", trend: "up" }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Enhanced Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div className="space-y-2">
          <motion.h1 
            className="text-responsive-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Advanced Reports
          </motion.h1>
          <motion.p 
            className="text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Detailed analytics and performance insights across all campaigns
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </motion.select>

          <motion.button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isExporting ? (
                <motion.span
                  key="loading"
                  className="material-icons text-sm animate-spin"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                >
                  refresh
                </motion.span>
              ) : (
                <motion.span
                  key="download"
                  className="material-icons text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  file_download
                </motion.span>
              )}
            </AnimatePresence>
            {isExporting ? "Exporting..." : "Export Report"}
          </motion.button>
        </div>
      </motion.div>

      {/* Metric Selector */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-3"
      >
        {metrics.map((metric, index) => (
          <motion.button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              selectedMetric === metric.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <span className="material-icons text-sm">{metric.icon}</span>
            <span className="font-medium">{metric.label}</span>
            {selectedMetric === metric.id && (
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                layoutId="selectedIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Performance Overview */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8"
      >
        <motion.h2 
          className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Performance Overview
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <motion.div 
                className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                {item.value}
              </motion.div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {item.metric}
              </div>
              <motion.div
                className={`flex items-center justify-center gap-1 text-xs font-medium ${
                  item.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <motion.span 
                  className="material-icons text-xs"
                  animate={{ 
                    y: item.trend === 'up' ? [-1, 1, -1] : [1, -1, 1] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  {item.trend === 'up' ? 'trending_up' : 'trending_down'}
                </motion.span>
                {item.change}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLineChart
            data={chartData.revenueOverTime}
            title="Revenue Trend Analysis"
            dataKey="revenue"
            color="#3B82F6"
          />
        </motion.div>
        
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <DashboardBarChart
            data={chartData.revenueByChannel}
            title="Channel Performance Comparison"
            dataKey="revenue"
            color="#10B981"
          />
        </motion.div>
      </motion.div>

      {/* Second Charts Row */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <DonutChart
            data={chartData.trafficSources}
            title="Traffic Source Distribution"
          />
        </motion.div>
        
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Top Performing Campaigns
          </h3>
          <div className="space-y-4">
            {tableData.slice(0, 5).map((campaign, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {campaign.campaign}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {campaign.channel}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {campaign.revenue}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {campaign.conversions} conversions
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Detailed Campaign Table */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <DataTable
          data={tableData}
          title="Comprehensive Campaign Analysis"
        />
      </motion.div>
    </motion.div>
  );
}