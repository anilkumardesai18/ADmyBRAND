"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalChart } from "@/components/dashboard/ProfessionalCharts";
import { ProfessionalMetricCard } from "@/components/dashboard/ProfessionalMetricCard";

// Mock conversion data
const conversionData = {
  funnel: [
    { stage: "Visitors", count: 125000, rate: 100 },
    { stage: "Leads", count: 8750, rate: 7.0 },
    { stage: "Qualified", count: 3500, rate: 2.8 },
    { stage: "Customers", count: 875, rate: 0.7 }
  ],
  byChannel: [
    { channel: "Organic Search", conversions: 2847, rate: 4.2, trend: 8.5 },
    { channel: "Google Ads", conversions: 1956, rate: 3.8, trend: 12.3 },
    { channel: "Facebook Ads", conversions: 1234, rate: 2.9, trend: 5.7 },
    { channel: "Email Marketing", conversions: 987, rate: 6.1, trend: 16.9 },
    { channel: "Direct Traffic", conversions: 654, rate: 2.1, trend: 3.2 }
  ],
  monthly: [
    { month: "Jan", conversions: 1200, rate: 3.2 },
    { month: "Feb", conversions: 1350, rate: 3.5 },
    { month: "Mar", conversions: 1180, rate: 3.1 },
    { month: "Apr", conversions: 1520, rate: 3.8 },
    { month: "May", conversions: 1680, rate: 4.1 },
    { month: "Jun", conversions: 1890, rate: 4.3 },
    { month: "Jul", conversions: 2100, rate: 4.5 },
    { month: "Aug", conversions: 1950, rate: 4.2 },
    { month: "Sep", conversions: 2250, rate: 4.7 },
    { month: "Oct", conversions: 2400, rate: 4.9 },
    { month: "Nov", conversions: 2650, rate: 5.1 },
    { month: "Dec", conversions: 2890, rate: 5.3 }
  ]
};

const exportChart = async (chartType: string, format: 'png' | 'pdf' | 'csv') => {
  console.log(`Exporting ${chartType} as ${format}`);
  
  if (format === 'csv') {
    let csvContent = '';
    if (chartType === 'funnel') {
      csvContent = 'Stage,Count,Rate\n';
      conversionData.funnel.forEach(item => {
        csvContent += `${item.stage},${item.count},${item.rate}\n`;
      });
    } else if (chartType === 'channel') {
      csvContent = 'Channel,Conversions,Rate\n';
      conversionData.byChannel.forEach(item => {
        csvContent += `${item.channel},${item.conversions},${item.rate}\n`;
      });
    } else if (chartType === 'monthly') {
      csvContent = 'Month,Conversions,Rate\n';
      conversionData.monthly.forEach(item => {
        csvContent += `${item.month},${item.conversions},${item.rate}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}-conversion-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert(`${format.toUpperCase()} export functionality would be implemented here`);
  }
};

export default function ConversionsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  const periods = [
    { id: '1m', label: '1 Month' },
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' }
  ];

  const conversionMetrics = [
    {
      icon: "trending_up",
      title: "Conversion Rate",
      value: "4.2%",
      change: 8.3,
      color: "green" as const,
      subtitle: "Overall conversion rate",
      target: "5.0%",
      period: "vs last month"
    },
    {
      icon: "people",
      title: "Total Conversions",
      value: "23,456",
      change: 12.7,
      color: "blue" as const,
      subtitle: "This year",
      target: "25,000",
      period: "vs last year"
    },
    {
      icon: "speed",
      title: "Lead Quality Score",
      value: "8.7/10",
      change: 5.2,
      color: "purple" as const,
      subtitle: "Average lead score",
      target: "9.0/10",
      period: "vs last quarter"
    },
    {
      icon: "schedule",
      title: "Time to Convert",
      value: "14.2 days",
      change: -3.8,
      color: "orange" as const,
      subtitle: "Average conversion time",
      target: "12 days",
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
            Conversion Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track conversion rates and optimize your funnel performance
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
                    ? 'bg-green-500 text-white shadow-md'
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
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-icons text-sm">file_download</span>
            Export All Data
          </motion.button>
        </div>
      </motion.div>

      {/* Conversion Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {conversionMetrics.map((metric, idx) => (
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

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Conversion Funnel
          </h3>
          <div className="flex gap-2">
            <motion.button
              onClick={() => exportChart('funnel', 'csv')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('funnel', 'png')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm">image</span>
            </motion.button>
          </div>
        </div>
        
        <div className="space-y-4">
          {conversionData.funnel.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-24 text-sm font-medium text-slate-700 dark:text-slate-300">
                {stage.stage}
              </div>
              <div className="flex-1 relative">
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-blue-600' :
                      index === 1 ? 'from-green-500 to-green-600' :
                      index === 2 ? 'from-yellow-500 to-yellow-600' :
                      'from-purple-500 to-purple-600'
                    } flex items-center justify-center text-white font-medium`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.rate}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  >
                    {stage.count.toLocaleString()}
                  </motion.div>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {stage.rate}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Conversion Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
            data={conversionData.monthly}
            title="Monthly Conversion Trend"
            dataKey="conversions"
            color="#10B981"
            type="line"
            showControls={true}
            height={400}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
            data={conversionData.byChannel}
            title="Conversions by Channel"
            dataKey="conversions"
            color="#8B5CF6"
            type="bar"
            showControls={true}
            height={400}
          />
        </motion.div>
      </div>

      {/* Conversion Rate Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Channel Conversion Rates
            </h3>
            <motion.button
              onClick={() => exportChart('rates', 'csv')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Channel</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Conversions</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Rate</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Performance</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Trend</th>
              </tr>
            </thead>
            <tbody>
              {conversionData.byChannel.map((channel, index) => (
                <motion.tr
                  key={channel.channel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">
                    {channel.channel}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {channel.conversions.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {channel.rate}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(channel.rate / 6.1) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {channel.rate >= 5 ? 'Excellent' : channel.rate >= 3 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      +{channel.trend}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Conversion Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-green-200 dark:border-slate-600"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Conversion Optimization Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "email",
              title: "Email Marketing Excellence",
              description: "Email campaigns show the highest conversion rate at 6.1% - expand email marketing efforts",
              type: "success"
            },
            {
              icon: "trending_up",
              title: "Improving Funnel Performance",
              description: "Overall conversion rate improved 8.3% this month with better lead qualification",
              type: "success"
            },
            {
              icon: "schedule",
              title: "Faster Conversion Times",
              description: "Time to convert decreased by 3.8% - sales process optimizations are working",
              type: "info"
            },
            {
              icon: "target",
              title: "Channel Optimization",
              description: "Focus on improving Facebook Ads conversion rate - currently underperforming at 2.9%",
              type: "warning"
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
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