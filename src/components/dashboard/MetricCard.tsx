import React from "react";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: number;
}

export function MetricCard({ icon, title, value, change }: MetricCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 flex flex-col gap-2 min-w-[200px] transition hover:shadow-md">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
        <span className="material-icons text-2xl">{icon}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <span className="material-icons text-base">{isPositive ? "arrow_upward" : "arrow_downward"}</span>
        {Math.abs(change)}%
      </div>
    </div>
  );
}
