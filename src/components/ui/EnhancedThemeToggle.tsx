"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export function EnhancedThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-600 dark:to-purple-600 opacity-20"
        animate={{
          scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
          rotate: isDark ? [0, 180, 360] : [0, -180, -360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon container */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="material-icons text-slate-600 dark:text-slate-300 absolute"
            >
              dark_mode
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="material-icons text-slate-600 dark:text-slate-300 absolute"
            >
              light_mode
            </motion.span>
          )}
        </AnimatePresence>

        {/* Rotating rays for sun */}
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-1 bg-yellow-500 rounded-full"
                style={{
                  top: "2px",
                  left: "50%",
                  transformOrigin: "50% 10px",
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Twinkling stars for moon */}
        {isDark && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
                style={{
                  top: `${10 + i * 8}px`,
                  left: `${8 + i * 6}px`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white dark:bg-slate-300 rounded-xl opacity-0"
        animate={{
          scale: [0, 2],
          opacity: [0.5, 0]
        }}
        transition={{ duration: 0.6 }}
        key={theme} // Re-trigger animation on theme change
      />
    </motion.button>
  );
}