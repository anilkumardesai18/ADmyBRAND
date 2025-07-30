"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalChart } from "@/components/dashboard/ProfessionalCharts";
import { ProfessionalMetricCard } from "@/components/dashboard/ProfessionalMetricCard";

// Mock engagement data
const engagementData = {
  social: [
    { platform: "Instagram", followers: 125000, engagement: 4.8, posts: 45 },
    { platform: "Facebook", followers: 89000, engagement: 3.2, posts: 32 },
    { platform: "Twitter", followers: 67000, engagement: 2.9, posts: 78 },
    { platform: "LinkedIn", followers: 34000, engagement: 5.1, posts: 28 },
    { platform: "TikTok", followers: 156000, engagement: 7.2, posts: 52 }
  ],
  content: [
    { type: "Blog Posts", views: 245000, shares: 3400, comments: 1200 },
    { type: "Videos", views: 189000, shares: 5600, comments: 2100 },
    { type: "Infographics", views: 134000, shares: 2800, comments: 890 },
    { type: "Podcasts", views: 67000, shares: 1200, comments: 450 },
    { type: "Webinars", views: 23000, shares: 890, comments: 340 }
  ],
  monthly: [
    { month: "Jan", likes: 12000, shares: 3400, comments: 1800, saves: 2100 },
    { month: "Feb", likes: 13500, shares: 3800, comments: 2100, saves: 2400 },
    { month: "Mar", likes: 14200, shares: 4100, comments: 2300, saves: 2600 },
    { month: "Apr", likes: 15800, shares: 4500, comments: 2600, saves: 2900 },
    { month: "May", likes: 17200, shares: 4900, comments: 2800, saves: 3200 },
    { month: "Jun", likes: 18900, shares: 5300, comments: 3100, saves: 3500 },
    { month: "Jul", likes: 20100, shares: 5700, comments: 3400, saves: 3800 },
    { month: "Aug", likes: 21500, shares: 6100, comments: 3600, saves: 4100 },
    { month: "Sep", likes: 23200, shares: 6500, comments: 3900, saves: 4400 },
    { month: "Oct", likes: 24800, shares: 6900, comments: 4200, saves: 4700 },
    { month: "Nov", likes: 26500, shares: 7300, comments: 4500, saves: 5000 },
    { month: "Dec", likes: 28200, shares: 7700, comments: 4800, saves: 5300 }
  ],
  topContent: [
    { title: "10 Marketing Trends for 2024", type: "Blog", engagement: 8.9, reach: 45000 },
    { title: "Product Launch Video", type: "Video", engagement: 12.3, reach: 67000 },
    { title: "Customer Success Stories", type: "Case Study", engagement: 6.7, reach: 23000 },
    { title: "Industry Report 2024", type: "Report", engagement: 9.8, reach: 34000 },
    { title: "Behind the Scenes", type: "Video", engagement: 11.2, reach: 56000 }
  ]
};

const exportChart = async (chartType: string, format: 'png' | 'pdf' | 'csv') => {
  console.log(`Exporting ${chartType} as ${format}`);
  
  if (format === 'csv') {
    let csvContent = '';
    if (chartType === 'social') {
      csvContent = 'Platform,Followers,Engagement,Posts\n';
      engagementData.social.forEach(item => {
        csvContent += `${item.platform},${item.followers},${item.engagement},${item.posts}\n`;
      });
    } else if (chartType === 'content') {
      csvContent = 'Type,Views,Shares,Comments\n';
      engagementData.content.forEach(item => {
        csvContent += `${item.type},${item.views},${item.shares},${item.comments}\n`;
      });
    } else if (chartType === 'monthly') {
      csvContent = 'Month,Likes,Shares,Comments,Saves\n';
      engagementData.monthly.forEach(item => {
        csvContent += `${item.month},${item.likes},${item.shares},${item.comments},${item.saves}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartType}-engagement-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert(`${format.toUpperCase()} export functionality would be implemented here`);
  }
};

export default function EngagementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  const periods = [
    { id: '1m', label: '1 Month' },
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' }
  ];

  const engagementMetrics = [
    {
      icon: "favorite",
      title: "Engagement Rate",
      value: "5.8%",
      change: 12.4,
      color: "orange" as const,
      subtitle: "Average across platforms",
      target: "6.5%",
      period: "vs last month"
    },
    {
      icon: "share",
      title: "Total Shares",
      value: "67.2K",
      change: 18.7,
      color: "blue" as const,
      subtitle: "Content shares",
      target: "75K",
      period: "vs last month"
    },
    {
      icon: "comment",
      title: "Comments",
      value: "42.8K",
      change: 15.3,
      color: "green" as const,
      subtitle: "User comments",
      target: "50K",
      period: "vs last month"
    },
    {
      icon: "bookmark",
      title: "Saves/Bookmarks",
      value: "48.3K",
      change: 22.1,
      color: "purple" as const,
      subtitle: "Content saves",
      target: "55K",
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
            Engagement Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track user engagement across all platforms and content types
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
                    ? 'bg-orange-500 text-white shadow-md'
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
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-icons text-sm">file_download</span>
            Export All Data
          </motion.button>
        </div>
      </motion.div>

      {/* Engagement Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {engagementMetrics.map((metric, idx) => (
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

      {/* Social Media Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Social Media Performance
          </h3>
          <div className="flex gap-2">
            <motion.button
              onClick={() => exportChart('social', 'csv')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('social', 'png')}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm">image</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {engagementData.social.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  platform.platform === 'Instagram' ? 'bg-pink-100 dark:bg-pink-900/30' :
                  platform.platform === 'Facebook' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  platform.platform === 'Twitter' ? 'bg-sky-100 dark:bg-sky-900/30' :
                  platform.platform === 'LinkedIn' ? 'bg-indigo-100 dark:bg-indigo-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className={`material-icons ${
                  platform.platform === 'Instagram' ? 'text-pink-600 dark:text-pink-400' :
                  platform.platform === 'Facebook' ? 'text-blue-600 dark:text-blue-400' :
                  platform.platform === 'Twitter' ? 'text-sky-600 dark:text-sky-400' :
                  platform.platform === 'LinkedIn' ? 'text-indigo-600 dark:text-indigo-400' :
                  'text-purple-600 dark:text-purple-400'
                }`}>
                  {platform.platform === 'Instagram' ? 'camera_alt' :
                   platform.platform === 'Facebook' ? 'facebook' :
                   platform.platform === 'Twitter' ? 'alternate_email' :
                   platform.platform === 'LinkedIn' ? 'business' :
                   'music_note'}
                </span>
              </motion.div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {platform.platform}
              </h4>
              <div className="space-y-1 text-sm">
                <div className="text-slate-600 dark:text-slate-400">
                  {platform.followers.toLocaleString()} followers
                </div>
                <div className="font-medium text-orange-600 dark:text-orange-400">
                  {platform.engagement}% engagement
                </div>
                <div className="text-slate-500 dark:text-slate-500">
                  {platform.posts} posts
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Engagement Charts */}
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
            data={engagementData.monthly}
            title="Monthly Engagement Trend"
            dataKey="likes"
            color="#F59E0B"
            type="area"
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
              onClick={() => exportChart('content', 'csv')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export CSV"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">file_download</span>
            </motion.button>
            <motion.button
              onClick={() => exportChart('content', 'png')}
              className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              title="Export PNG"
            >
              <span className="material-icons text-sm text-slate-600 dark:text-slate-400">image</span>
            </motion.button>
          </div>
          <ProfessionalChart
            data={engagementData.content}
            title="Content Performance"
            dataKey="views"
            color="#EF4444"
            type="bar"
            showControls={true}
            height={400}
          />
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Top Performing Content
            </h3>
            <motion.button
              onClick={() => exportChart('top-content', 'csv')}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
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
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Content</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Type</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Engagement Rate</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Reach</th>
                <th className="text-left py-3 px-6 font-medium text-slate-600 dark:text-slate-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {engagementData.topContent.map((content, index) => (
                <motion.tr
                  key={content.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">
                    {content.title}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.type === 'Video' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      content.type === 'Blog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      content.type === 'Case Study' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {content.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-orange-600 dark:text-orange-400">
                      {content.engagement}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {content.reach.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(content.engagement / 15) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {content.engagement >= 10 ? 'Excellent' : 
                         content.engagement >= 7 ? 'Good' : 'Average'}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Engagement Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-orange-200 dark:border-slate-600"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Engagement Optimization Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "video_library",
              title: "Video Content Dominance",
              description: "Video content shows 40% higher engagement rates - prioritize video production",
              type: "success"
            },
            {
              icon: "schedule",
              title: "Peak Engagement Times",
              description: "Highest engagement occurs between 2-4 PM and 7-9 PM - schedule posts accordingly",
              type: "info"
            },
            {
              icon: "trending_up",
              title: "Growing TikTok Presence",
              description: "TikTok shows 7.2% engagement rate - highest among all platforms, expand presence",
              type: "success"
            },
            {
              icon: "bookmark",
              title: "Save Rate Increasing",
              description: "Content saves increased 22.1% - users find content valuable for future reference",
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