"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalChart } from "@/components/dashboard/ProfessionalCharts";
import { ProfessionalMetricCard } from "@/components/dashboard/ProfessionalMetricCard";

// Mock traffic data
const trafficData = {
  sources: [
    { source: "Organic Search", visitors: 45000, percentage: 35.2 },
    { source: "Direct", visitors: 32000, percentage: 25.0 },
    { source: "Social Media", visitors: 28000, percentage: 21.9 },
    { source: "Paid Search", visitors: 15000, percentage: 11.7 },
    { source: "Referral", visitors: 8000, percentage: 6.2 }
  ],
  devices: [
    { device: "Mobile", visitors: 72000, percentage: 56.3 },
    { device: "Desktop", visitors: 48000, percentage: 37.5 },
    { device: "Tablet", visitors: 8000, percentage: 6.2 }
  ],
  monthly: [
    { month: "Jan", visitors: 98000, pageviews: 245000, sessions: 112000 },
    { month: "Feb", visitors: 105000, pageviews: 267000, sessions: 118000 },
    { month: "Mar", visitors: 112000, pageviews: 289000, sessions: 125000 },
    { month: "Apr", visitors: 118000, pageviews: 312000, sessions: 132000 },
    { month: "May", visitors: 125000, pageviews: 335000, sessions: 140000 },
    { month: "Jun", visitors: 132000, pageviews: 358000, sessions: 148000 },
    { month: "Jul", visitors: 128000, pageviews: 342000, sessions: 145000 },
    { month: "Aug", visitors: 135000, pageviews: 365000, sessions: 152000 },
    { month: "Sep", visitors: 142000, pageviews: 388000, sessions: 159000 },
    { month: "Oct", visitors: 148000, pageviews: 412000, sessions: 165000 },
    { month: "Nov", visitors: 155000, pageviews: 435000, sessions: 172000 },
    { month: "Dec", visitors: 162000, pageviews: 458000, sessions: 180000 }
  ],
  topPages: [
    { page: "/", views: 125000, bounceRate: 32.5, avgTime: "2:45" },
    { page: "/products", views: 89000, bounceRate: 28.3, avgTime: "3:12" },
    { page: "/about", views: 67000, bounceRate: 45.2, avgTime: "1:58" },
    { page: "/contact", views: 54000, bounceRate: 38.7, avgTime: "2:23" },
    { page: "/blog", views: 43000, bounceRate: 25.1, avgTime: "4:15" }
  ]
};

const exportChart = async (chartType: string, format: 'png' | 'pdf' | 'csv') => {
  console.log(`Exporting ${chartType} as ${format}`);
  
  if (format === 'csv') {
    let csvContent = '';
    if (chartType === 'sources') {
      csvContent = 'Source,Visitors,Percentage\n';
      trafficData.sources.forEach(item => {
        csvContent += `${item.source},${item.visitors},${item.percentage}\n`;
      });
    } else if (chartType === 'devices') {
      csvContent = 'Device,Visitors,Percentage\n';
      trafficData.devices.forEach(item => {
        csvContent += `${item.device},${item.visitors},${item.percentage}\n`;
      });
    } else if (chartType === 'monthly') {
      csvContent = 'Month,Visitors,Pageviews,Sessions\n';
      trafficData.monthly.forEach(item => {
        csvContent += `${item.month},${item.visitors},${item.pageviews},${item.sessions}\n`;
      });
    } else if (chartType === 'pages') {
      csvContent = 'Page,Views,Bounce Rate,Avg Time\n';
      trafficData.topPages.forEach(item => {
        csvContent += `${item.page},${item.views},${item.bounceRate},${item.avgTime}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}-traffic-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert(`${format.toUpperCase()} export functionality would be implemented here`);
  }
};

export default function TrafficPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  const periods = [
    { id: '1m', label: '1 Month' },
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' }
  ];

  const trafficMetrics = [
    {
      icon: "visibility",
      title: "Total Visitors",
      value: "1.58M",
      change: 15.8,
      color: "purple" as const,
      subtitle: "Unique visitors",
      target: "1.8M",
      period: "vs last year"
    },
    {
      icon: "pageview",
      title: "Page Views",
      value: "4.12M",
      change: 12.3,
      color: "blue" as const,
      subtitle: "Total page views",
      target: "4.5M",
      period: "vs last year"
    },
    {
      icon: "schedule",
      title: "Avg Session Duration",
      value: "3m 42s",
      change: 8.7,
      color: "green" as const,
      subtitle: "Time on site",
      target: "4m 00s",
      period: "vs last month"
    },
    {
      icon: "bounce_rate",
      title: "Bounce Rate",
      value: "32.4%",
      change: -5.2,
      color: "orange" as const,
      subtitle: "Single page sessions",
      target: "30%",
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
            Traffic Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Monitor website traffic patterns and user behavior
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
                    ? 'bg-purple-500 text-white shadow-md'
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
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-icons text-sm">file_download</span>
            Export All Data
          </motion.button>
        </div>
      </motion.div>

      {/* Traffic Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {trafficMetrics.map((metric, idx) => (
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

      {/* Traffic Charts */}
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
            data={trafficData.monthly}
            title="Monthly Traffic Trend"
            dataKey="visitors"
            color="#8B5CF6"
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
              onClick={() => exportChart('sources', 'csv')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('sources', 'png')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">image</span>
            </motion.button>
          </div>
          <ProfessionalChart
            data={trafficData.sources}
            title="Traffic Sources"
            dataKey="visitors"
            color="#3B82F6"
            type="bar"
            showControls={true}
            height={400}
          />
        </motion.div>
      </div>

      {/* Device Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Device Breakdown
          </h3>
          <div className="flex gap-2">
            <motion.button
              onClick={() => exportChart('devices', 'csv')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('devices', 'png')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm">image</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trafficData.devices.map((device, index) => (
            <motion.div
              key={device.device}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-purple-100 dark:bg-purple-900/30' :
                  index === 1 ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-green-100 dark:bg-green-900/30'
                }`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className={`material-icons text-2xl ${
                  index === 0 ? 'text-purple-600 dark:text-purple-400' :
                  index === 1 ? 'text-blue-600 dark:text-blue-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {device.device === 'Mobile' ? 'smartphone' : 
                   device.device === 'Desktop' ? 'computer' : 'tablet'}
                </span>
              </motion.div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {device.device}
              </h4>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {device.visitors.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {device.percentage}% of traffic
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    index === 0 ? 'bg-purple-500' :
                    index === 1 ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${device.percentage}%` }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Pages Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Top Pages Performance
            </h3>
            <motion.button
              onClick={() => exportChart('pages', 'csv')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
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
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Page</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Views</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Bounce Rate</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Avg Time</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.topPages.map((page, index) => (
                <motion.tr
                  key={page.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">
                    <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                      {page.page}
                    </code>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${
                      page.bounceRate < 30 ? 'text-green-600 dark:text-green-400' :
                      page.bounceRate < 40 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {page.bounceRate}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {page.avgTime}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            page.bounceRate < 30 ? 'bg-green-500' :
                            page.bounceRate < 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${100 - page.bounceRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {page.bounceRate < 30 ? 'Excellent' : 
                         page.bounceRate < 40 ? 'Good' : 'Needs Work'}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Traffic Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-purple-200 dark:border-slate-600"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Traffic Optimization Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "smartphone",
              title: "Mobile-First Traffic",
              description: "56.3% of traffic comes from mobile devices - ensure mobile optimization is prioritized",
              type: "info"
            },
            {
              icon: "search",
              title: "Strong Organic Presence",
              description: "Organic search drives 35.2% of traffic - SEO efforts are paying off significantly",
              type: "success"
            },
            {
              icon: "schedule",
              title: "Improving Engagement",
              description: "Average session duration increased 8.7% - content quality improvements are working",
              type: "success"
            },
            {
              icon: "bounce_rate",
              title: "Reduced Bounce Rate",
              description: "Bounce rate decreased 5.2% to 32.4% - page load speed optimizations are effective",
              type: "success"
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