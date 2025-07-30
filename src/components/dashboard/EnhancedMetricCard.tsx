"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: number;
  trend?: "up" | "down" | "stable";
  color?: "blue" | "green" | "purple" | "orange";
  delay?: number;
}

const colorVariants = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: "text-blue-500",
    glow: "shadow-blue-500/20"
  },
  green: {
    gradient: "from-green-500 to-green-600", 
    bg: "bg-green-50 dark:bg-green-950/30",
    text: "text-green-600 dark:text-green-400",
    icon: "text-green-500",
    glow: "shadow-green-500/20"
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30", 
    text: "text-purple-600 dark:text-purple-400",
    icon: "text-purple-500",
    glow: "shadow-purple-500/20"
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400", 
    icon: "text-orange-500",
    glow: "shadow-orange-500/20"
  }
};

export function EnhancedMetricCard({ 
  icon, 
  title, 
  value, 
  change, 
  trend = change >= 0 ? "up" : "down",
  color = "blue",
  delay = 0 
}: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const colors = colorVariants[color];
  const isPositive = change >= 0;
  
  // Animate value counting up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const numericValue = typeof value === 'string' 
        ? parseFloat(value.replace(/[^0-9.-]+/g, "")) 
        : value;
      
      if (!isNaN(numericValue)) {
        const duration = 1500;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setAnimatedValue(numericValue);
            clearInterval(counter);
          } else {
            setAnimatedValue(current);
          }
        }, duration / steps);
        
        return () => clearInterval(counter);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatAnimatedValue = (val: number) => {
    if (typeof value === 'string' && value.includes('$')) {
      return `$${val.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20, 
        scale: isVisible ? 1 : 0.95 
      }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        bg-white dark:bg-slate-800/50 backdrop-blur-sm
        border border-slate-200/50 dark:border-slate-700/50
        shadow-lg hover:shadow-xl transition-all duration-300
        ${isHovered ? colors.glow : ''}
        group
      `}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        initial={false}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
      />
      
      {/* Floating particles effect */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${colors.bg} rounded-full`}
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * 200, 
                  y: Math.random() * 100 
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: [100, -20],
                  x: Math.random() * 200
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2,
                  repeat: Infinity 
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Header with icon and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="material-icons text-xl">{icon}</span>
          </motion.div>
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Trend indicator */}
        <motion.div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
        >
          <motion.span 
            className="material-icons text-xs"
            animate={{ 
              y: trend === "up" ? [-1, 1, -1] : trend === "down" ? [1, -1, 1] : 0 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {trend === "up" ? "trending_up" : trend === "down" ? "trending_down" : "trending_flat"}
          </motion.span>
          <span>{Math.abs(change)}%</span>
        </motion.div>
      </div>

      {/* Main value */}
      <motion.div 
        className="mb-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: isVisible ? 1 : 0.8 }}
        transition={{ delay: delay + 0.2 }}
      >
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {isVisible ? formatAnimatedValue(animatedValue) : '0'}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="relative">
        <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${Math.min(Math.abs(change) * 10, 100)}%` : 0 }}
            transition={{ delay: delay + 0.4, duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.div>
  );
}