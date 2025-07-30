"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300`}>
          <div className="h-16 flex items-center justify-center font-bold text-xl tracking-tight border-b border-slate-200 dark:border-slate-700">
            {sidebarCollapsed ? "A" : "ADmyBRAND"}
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`flex items-center ${sidebarCollapsed ? 'px-4 justify-center' : 'px-6'} py-2 rounded-lg font-semibold bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400`}>
                  <span className="material-icons">dashboard</span>
                  {!sidebarCollapsed && <span className="ml-3">Overview</span>}
                </Link>
              </li>
              <li>
                <Link href="/reports" className={`flex items-center ${sidebarCollapsed ? 'px-4 justify-center' : 'px-6'} py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700`}>
                  <span className="material-icons">bar_chart</span>
                  {!sidebarCollapsed && <span className="ml-3">Reports</span>}
                </Link>
              </li>
              <li>
                <Link href="/settings" className={`flex items-center ${sidebarCollapsed ? 'px-4 justify-center' : 'px-6'} py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700`}>
                  <span className="material-icons">settings</span>
                  {!sidebarCollapsed && <span className="ml-3">Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            >
              <span className="material-icons">{sidebarCollapsed ? 'chevron_right' : 'chevron_left'}</span>
              {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            {/* Left: Search and Date Picker */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Right: Notifications, Theme Toggle, User Profile */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <span className="material-icons">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <ThemeToggle />
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">A</span>
                <span className="hidden md:block font-medium">Admin</span>
                <span className="material-icons">expand_more</span>
              </div>
            </div>
          </header>
          {/* Main content */}
          <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-900 min-h-0">
            {children}
          </main>
        </div>
      </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}