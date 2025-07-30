"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AnalyticsData {
  totalRevenue: number;
  totalUsers: number;
  conversionRate: number;
  avgOrderValue: number;
  revenueGrowth: number;
  userGrowth: number;
  conversionGrowth: number;
  aovGrowth: number;
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export function AnalyticsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 245890,
    totalUsers: 12847,
    conversionRate: 4.2,
    avgOrderValue: 89.50,
    revenueGrowth: 12.5,
    userGrowth: 8.3,
    conversionGrowth: -2.1,
    aovGrowth: 5.7
  });

  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Monthly Revenue',
      current: 245890,
      target: 300000,
      unit: '$',
      color: 'blue'
    },
    {
      id: '2', 
      title: 'New Users',
      current: 12847,
      target: 15000,
      unit: '',
      color: 'green'
    },
    {
      id: '3',
      title: 'Conversion Rate',
      current: 4.2,
      target: 5.0,
      unit: '%',
      color: 'purple'
    }
  ]);

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toLocaleString()}`;
    }
    if (unit === '%') {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  const getProgressColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return 'text-green-600 dark:text-green-400';
    if (progress >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics Overview</h2>
          <p className="text-slate-600 dark:text-slate-400">Track your key performance indicators</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {periods.map(period => (
              <motion.button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {period.label}
              </motion.button>
            ))}
          </div>
          
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-icons text-sm">download</span>
            Export
          </motion.button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
              <span className="material-icons text-blue-600 dark:text-blue-400">attach_money</span>
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.revenueGrowth >= 0 ? '+' : ''}{analyticsData.revenueGrowth}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            ${analyticsData.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
              <span className="material-icons text-green-600 dark:text-green-400">people</span>
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.userGrowth >= 0 ? '+' : ''}{analyticsData.userGrowth}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {analyticsData.totalUsers.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Users</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
              <span className="material-icons text-purple-600 dark:text-purple-400">trending_up</span>
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.conversionGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.conversionGrowth >= 0 ? '+' : ''}{analyticsData.conversionGrowth}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {analyticsData.conversionRate}%
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Conversion Rate</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
              <span className="material-icons text-orange-600 dark:text-orange-400">shopping_cart</span>
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.aovGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.aovGrowth >= 0 ? '+' : ''}{analyticsData.aovGrowth}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            ${analyticsData.avgOrderValue}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Avg Order Value</div>
        </motion.div>
      </div>

      {/* Goals Section */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Goals Progress</h3>
          <motion.button
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Manage Goals
          </motion.button>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <motion.div
                key={goal.id}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">{goal.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatValue(goal.current, goal.unit)} of {formatValue(goal.target, goal.unit)}
                    </p>
                  </div>
                  <div className={`text-right ${getProgressColor(goal.current, goal.target)}`}>
                    <div className="text-lg font-bold">{progress.toFixed(0)}%</div>
                    <div className="text-xs">Complete</div>
                  </div>
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      goal.color === 'blue' ? 'bg-blue-500' :
                      goal.color === 'green' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-blue-200 dark:border-slate-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: 'campaign', label: 'Create Campaign', color: 'blue' },
            { icon: 'analytics', label: 'View Reports', color: 'green' },
            { icon: 'settings', label: 'Settings', color: 'purple' },
            { icon: 'help', label: 'Get Help', color: 'orange' }
          ].map((action, index) => (
            <motion.button
              key={action.label}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-700"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className={`p-2 rounded-lg ${
                action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-950/30' :
                action.color === 'green' ? 'bg-green-100 dark:bg-green-950/30' :
                action.color === 'purple' ? 'bg-purple-100 dark:bg-purple-950/30' :
                'bg-orange-100 dark:bg-orange-950/30'
              }`}>
                <span className={`material-icons text-sm ${
                  action.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  action.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  action.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                  'text-orange-600 dark:text-orange-400'
                }`}>
                  {action.icon}
                </span>
              </div>
              <span className="font-medium text-slate-900 dark:text-slate-100">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}