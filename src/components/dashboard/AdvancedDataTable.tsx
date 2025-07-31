"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exportCampaignPerformance, handleExportWithLoading } from "@/lib/exportUtils";

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
  budget?: string;
  spend?: string;
  roas?: string;
}

interface AdvancedDataTableProps {
  data: TableData[];
  title: string;
  showFilters?: boolean;
  showExport?: boolean;
  showBulkActions?: boolean;
}

export function AdvancedDataTable({ 
  data, 
  title, 
  showFilters = true, 
  showExport = true,
  showBulkActions = true 
}: AdvancedDataTableProps) {
  const [sortField, setSortField] = useState<keyof TableData>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  const handleSort = (field: keyof TableData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredAndSortedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredAndSortedData.map(row => row.id));
    }
  };

  const handleExport = async () => {
    await handleExportWithLoading(
      () => exportCampaignPerformance(
        filteredAndSortedData.map(row => ({ 
          id: row.id,
          campaign: row.campaign,
          channel: row.channel,
          impressions: row.impressions,
          clicks: row.clicks,
          conversions: row.conversions,
          revenue: row.revenue,
          ctr: row.ctr,
          conversionRate: row.conversionRate,
          status: row.status,
          budget: row.budget || '',
          spend: row.spend || '',
          roas: row.roas || ''
        })), 
        selectedRows.length > 0 ? selectedRows : undefined
      ),
      setIsExporting,
      'Campaign performance data exported successfully'
    );
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(item => {
      const matchesSearch = Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesChannel = channelFilter === 'all' || item.channel === channelFilter;
      
      return matchesSearch && matchesStatus && matchesChannel;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      let aCompare: string | number = aValue || '';
      let bCompare: string | number = bValue || '';

      if (typeof aCompare === 'string') aCompare = aCompare.toLowerCase();
      if (typeof bCompare === 'string') bCompare = bCompare.toLowerCase();

      if (aCompare < bCompare) return sortDirection === 'asc' ? -1 : 1;
      if (aCompare > bCompare) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection, searchTerm, statusFilter, channelFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const uniqueStatuses = [...new Set(data.map(item => item.status))];
  const uniqueChannels = [...new Set(data.map(item => item.channel))];

  const SortIcon = ({ field }: { field: keyof TableData }) => {
    if (sortField !== field) {
      return <span className="material-icons text-slate-400 text-sm">unfold_more</span>;
    }
    return (
      <span className="material-icons text-blue-600 text-sm">
        {sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      </span>
    );
  };

  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {filteredAndSortedData.length} campaigns • {selectedRows.length} selected
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'table' 
                    ? 'bg-white dark:bg-slate-600 shadow-sm' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <span className="material-icons text-sm">table_rows</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-slate-600 shadow-sm' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <span className="material-icons text-sm">grid_view</span>
              </button>
            </div>

            {showExport && (
              <motion.button 
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-icons text-sm">
                  {isExporting ? 'hourglass_empty' : 'file_download'}
                </span>
                {isExporting ? 'Exporting...' : 'Export'}
              </motion.button>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div 
            className="mt-4 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Channels</option>
              {uniqueChannels.map(channel => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Bulk Actions */}
        <AnimatePresence>
          {showBulkActions && selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedRows.length} campaigns selected
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Pause
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Activate
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {viewMode === 'table' ? (
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                {showBulkActions && (
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                )}
                
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
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedData.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                      selectedRows.includes(row.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    {showBulkActions && (
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{row.campaign}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                        {row.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.impressions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.clicks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.conversions}</td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{row.revenue}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                          <span className="material-icons text-slate-400 text-sm">edit</span>
                        </button>
                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                          <span className="material-icons text-slate-400 text-sm">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          // Grid View
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((row, index) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{row.campaign}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {row.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Channel:</span>
                    <span className="font-medium">{row.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Revenue:</span>
                    <span className="font-medium text-green-600">{row.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Conversions:</span>
                    <span className="font-medium">{row.conversions}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2);
              if (page > totalPages) return null;
              
              return (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page}
                </motion.button>
              );
            })}
            
            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}