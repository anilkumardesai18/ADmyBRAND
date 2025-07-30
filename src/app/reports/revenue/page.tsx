"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalChart } from "@/components/dashboard/ProfessionalCharts";
import { ProfessionalMetricCard } from "@/components/dashboard/ProfessionalMetricCard";

// Mock revenue data
const revenueData = {
  monthly: [
    { month: "Jan", revenue: 45000, target: 50000 },
    { month: "Feb", revenue: 52000, target: 50000 },
    { month: "Mar", revenue: 48000, target: 50000 },
    { month: "Apr", revenue: 61000, target: 55000 },
    { month: "May", revenue: 55000, target: 55000 },
    { month: "Jun", revenue: 67000, target: 60000 },
    { month: "Jul", revenue: 71000, target: 65000 },
    { month: "Aug", revenue: 69000, target: 65000 },
    { month: "Sep", revenue: 78000, target: 70000 },
    { month: "Oct", revenue: 82000, target: 75000 },
    { month: "Nov", revenue: 89000, target: 80000 },
    { month: "Dec", revenue: 95000, target: 85000 }
  ],
  byChannel: [
    { channel: "Google Ads", revenue: 285000, percentage: 35 },
    { channel: "Facebook Ads", revenue: 228000, percentage: 28 },
    { channel: "Organic Search", revenue: 162000, percentage: 20 },
    { channel: "Email Marketing", revenue: 97200, percentage: 12 },
    { channel: "Direct Traffic", revenue: 40800, percentage: 5 }
  ],
  byProduct: [
    { product: "Premium Plan", revenue: 324000, units: 1080, growth: 12.3 },
    { product: "Standard Plan", revenue: 243000, units: 1620, growth: 8.7 },
    { product: "Basic Plan", revenue: 162000, units: 2700, growth: 15.2 },
    { product: "Enterprise", revenue: 184000, units: 230, growth: 6.9 }
  ]
};

const exportChart = async (chartType: string, format: 'png' | 'pdf' | 'csv') => {
  // Simulate export functionality
  console.log(`Exporting ${chartType} as ${format}`);
  
  // Create a simple CSV for demonstration
  if (format === 'csv') {
    let csvContent = '';
    if (chartType === 'monthly') {
      csvContent = 'Month,Revenue,Target\n';
      revenueData.monthly.forEach(item => {
        csvContent += `${item.month},${item.revenue},${item.target}\n`;
      });
    } else if (chartType === 'channel') {
      csvContent = 'Channel,Revenue,Percentage\n';
      revenueData.byChannel.forEach(item => {
        csvContent += `${item.channel},${item.revenue},${item.percentage}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}-revenue-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    // For PNG/PDF, we would typically use a library like html2canvas or jsPDF
    alert(`${format.toUpperCase()} export functionality would be implemented here`);
  }
};

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  const periods = [
    { id: '1m', label: '1 Month' },
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' }
  ];

  const revenueMetrics = [
    {
      icon: "attach_money",
      title: "Total Revenue",
      value: "$813,000",
      change: 15.2,
      color: "blue" as const,
      subtitle: "Annual revenue",
      target: "$900,000",
      period: "vs last year"
    },
    {
      icon: "trending_up",
      title: "Monthly Growth",
      value: "12.5%",
      change: 3.2,
      color: "green" as const,
      subtitle: "Month over month",
      target: "15%",
      period: "vs last month"
    },
    {
      icon: "account_balance",
      title: "Average Deal Size",
      value: "$2,847",
      change: 8.7,
      color: "purple" as const,
      subtitle: "Per transaction",
      target: "$3,000",
      period: "vs last quarter"
    },
    {
      icon: "payments",
      title: "Revenue per User",
      value: "$156",
      change: -2.1,
      color: "orange" as const,
      subtitle: "Monthly ARPU",
      target: "$180",
      period: "vs last month"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Revenue Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Comprehensive revenue tracking and analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            {periods.map(period => (
              <motion.button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {period.label}
              </motion.button>
            ))}
          </div>

          {/* Export All Button */}
          <motion.button
            onClick={() => exportChart('all', 'csv')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-icons text-sm">file_download</span>
            Export All Data
          </motion.button>
        </div>
      </motion.div>

      {/* Revenue Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {revenueMetrics.map((metric, idx) => (
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

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <motion.button
              onClick={() => exportChart('monthly', 'csv')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('monthly', 'png')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">image</span>
            </motion.button>
          </div>
          <ProfessionalChart
            data={revenueData.monthly}
            title="Monthly Revenue Trend"
            dataKey="revenue"
            color="#3B82F6"
            type="area"
            showControls={true}
            height={400}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <motion.button
              onClick={() => exportChart('channel', 'csv')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('channel', 'png')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">image</span>
            </motion.button>
          </div>
          <ProfessionalChart
            data={revenueData.byChannel}
            title="Revenue by Channel"
            dataKey="revenue"
            color="#10B981"
            type="bar"
            showControls={true}
            height={400}
          />
        </motion.div>
      </div>

      {/* Revenue Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Revenue by Product
            </h3>
            <motion.button
              onClick={() => exportChart('products', 'csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="material-icons text-sm">file_download</span>
              Export
            </motion.button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Product</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Revenue</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Units Sold</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Avg Price</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Growth</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.byProduct.map((product, index) => (
                <motion.tr
                  key={product.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">
                    {product.product}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {product.units.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    ${Math.round(product.revenue / product.units)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      +{product.growth}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Revenue Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-blue-200 dark:border-slate-600"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Revenue Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "trending_up",
              title: "Strong Growth Trajectory",
              description: "Revenue has grown 15.2% year-over-year with consistent monthly increases",
              type: "success"
            },
            {
              icon: "target",
              title: "Target Achievement",
              description: "Currently at 90% of annual revenue target with 2 months remaining",
              type: "info"
            },
            {
              icon: "warning",
              title: "ARPU Decline",
              description: "Average revenue per user has decreased 2.1% - consider upselling strategies",
              type: "warning"
            },
            {
              icon: "lightbulb",
              title: "Optimization Opportunity",
              description: "Google Ads channel shows highest ROI - consider increasing budget allocation",
              type: "info"
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl"
            >
              <div className={`p-2 rounded-lg ${
                insight.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                insight.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                <span className={`material-icons text-sm ${
                  insight.type === 'success' ? 'text-green-600 dark:text-green-400' :
                  insight.type === 'warning' ? 'text-orange-600 dark:text-orange-400' :
                  'text-blue-600 dark:text-blue-400'
                }`}>
                  {insight.icon}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}