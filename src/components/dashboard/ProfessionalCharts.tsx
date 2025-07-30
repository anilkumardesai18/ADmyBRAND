"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

interface ChartDataPoint {
  [key: string]: string | number;
}

interface ProfessionalChartProps {
  data: ChartDataPoint[];
  title: string;
  dataKey: string;
  color?: string;
  type?: 'line' | 'bar' | 'area';
  showControls?: boolean;
  height?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: string | number;
    color: string;
  }>;
  label?: string;
}

const chartColors = {
  primary: "#3B82F6",
  secondary: "#10B981", 
  tertiary: "#F59E0B",
  quaternary: "#EF4444",
  quinary: "#8B5CF6"
};

export function ProfessionalChart({ 
  data, 
  title, 
  dataKey, 
  color = chartColors.primary,
  type = 'line',
  showControls = true,
  height = 320
}: ProfessionalChartProps) {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-detect the X-axis key from the data
  const getXAxisKey = () => {
    if (!data || data.length === 0) return 'month';
    const firstItem = data[0];
    const keys = Object.keys(firstItem);
    
    // Priority order for X-axis keys
    const preferredKeys = ['month', 'channel', 'name', 'date', 'category', 'label'];
    for (const key of preferredKeys) {
      if (keys.includes(key)) return key;
    }
    
    // Fallback to first non-numeric key
    return keys.find(key => typeof firstItem[key] === 'string') || keys[0];
  };

  const xAxisKey = getXAxisKey();

  const chartTypes = [
    { id: 'line', label: 'Line', icon: 'show_chart' },
    { id: 'bar', label: 'Bar', icon: 'bar_chart' },
    { id: 'area', label: 'Area', icon: 'area_chart' },
  ];

  const timeRanges = [
    { id: 'all', label: 'All Time' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xAxisKey}
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <YAxis 
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`colorGradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xAxisKey}
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <YAxis 
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#colorGradient-${title.replace(/\s+/g, '-')})`}
              strokeWidth={3}
            />
          </AreaChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xAxisKey}
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <YAxis 
              className="text-slate-600 dark:text-slate-400"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  // Calculate stats safely
  const calculateStats = () => {
    if (!data || data.length === 0) {
      return { total: 0, average: 0, growth: 0 };
    }

    const total = data.reduce((sum, item) => {
      const value = item[dataKey];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);

    const average = Math.round(total / data.length);
    
    // Calculate growth (comparing first and last values)
    const firstValue = data[0]?.[dataKey];
    const lastValue = data[data.length - 1]?.[dataKey];
    const growth = firstValue && lastValue && typeof firstValue === 'number' && typeof lastValue === 'number'
      ? ((lastValue - firstValue) / firstValue * 100)
      : 0;

    return { total, average, growth };
  };

  const stats = calculateStats();

  return (
    <motion.div
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Performance metrics over time
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {showControls && (
              <>
                {/* Time Range Selector */}
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timeRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>

                {/* Chart Type Selector */}
                <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                  {chartTypes.map(type => (
                    <motion.button
                      key={type.id}
                      onClick={() => setChartType(type.id as 'line' | 'bar' | 'area')}
                      className={`p-2 rounded-md transition-all ${
                        chartType === type.id 
                          ? 'bg-white dark:bg-slate-600 shadow-sm' 
                          : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={type.label}
                    >
                      <span className="material-icons text-sm">{type.icon}</span>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Fullscreen Toggle */}
            <motion.button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-icons text-sm">
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </motion.button>

            {/* Menu */}
            <motion.button
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-icons text-sm">more_vert</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chart - SIMPLIFIED WITHOUT COMPLEX ANIMATIONS */}
      <div className="p-6">
        <div style={{ height: isFullscreen ? 'calc(100vh - 200px)' : height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {stats.average.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Average</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${
              stats.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.growth >= 0 ? '+' : ''}{stats.growth.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Growth</div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}