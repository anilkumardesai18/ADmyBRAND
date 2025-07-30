"use client";

import { useState, useMemo } from "react";

interface TableData {
  id: number;
  campaign: string;
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: string;
  ctr: string;
  conversionRate: string;
  status: string;
}

interface DataTableProps {
  data: TableData[];
  title: string;
}

export function DataTable({ data, title }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof TableData>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: keyof TableData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, sortField, sortDirection, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const SortIcon = ({ field }: { field: keyof TableData }) => {
    if (sortField !== field) {
      return <span className="material-icons text-slate-400">unfold_more</span>;
    }
    return (
      <span className="material-icons text-blue-600">
        {sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 sm:mb-0">{title}</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2">
            <span className="material-icons text-sm">file_download</span>
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('campaign')}
              >
                <div className="flex items-center gap-1">
                  Campaign
                  <SortIcon field="campaign" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('channel')}
              >
                <div className="flex items-center gap-1">
                  Channel
                  <SortIcon field="channel" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center gap-1">
                  Impressions
                  <SortIcon field="impressions" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center gap-1">
                  Clicks
                  <SortIcon field="clicks" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center gap-1">
                  Conversions
                  <SortIcon field="conversions" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-1">
                  Revenue
                  <SortIcon field="revenue" />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="py-3 px-4 text-slate-900 dark:text-slate-100 font-medium">{row.campaign}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.channel}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.conversions}</td>
                <td className="py-3 px-4 text-slate-900 dark:text-slate-100 font-medium">{row.revenue}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}