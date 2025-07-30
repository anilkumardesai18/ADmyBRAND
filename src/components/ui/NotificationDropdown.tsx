"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Campaign Performance Alert',
      message: 'Summer Sale 2024 campaign has exceeded its target by 15%',
      type: 'success',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Budget Warning',
      message: 'Product Launch campaign is approaching 90% of budget',
      type: 'warning',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'New Report Available',
      message: 'Monthly analytics report for November is ready',
      type: 'info',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      message: 'Dashboard will be updated tonight at 2 AM EST',
      type: 'info',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: '5',
      title: 'Low Conversion Rate',
      message: 'Email Newsletter campaign conversion rate dropped below 2%',
      type: 'error',
      timestamp: '2 days ago',
      read: false
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-orange-600 dark:text-orange-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-icons text-slate-600 dark:text-slate-400">
          notifications
        </span>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <motion.button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Mark all read
                    </motion.button>
                  )}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {notifications.length} total
                  </span>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <span className="material-icons text-slate-400 text-4xl mb-2">notifications_none</span>
                  <p className="text-slate-500 dark:text-slate-400">No notifications</p>
                </div>
              ) : (
                <div className="py-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-l-4 ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20 border-l-blue-500' : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                          <span className="material-icons text-sm">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${
                              !notification.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <motion.button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                                  whileHover={{ scale: 1.1 }}
                                  title="Mark as read"
                                >
                                  <span className="material-icons text-xs text-slate-400">done</span>
                                </motion.button>
                              )}
                              <motion.button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                                whileHover={{ scale: 1.1 }}
                                title="Delete"
                              >
                                <span className="material-icons text-xs text-slate-400">close</span>
                              </motion.button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
              <motion.button
                className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                whileHover={{ scale: 1.02 }}
              >
                View all notifications
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}