// Export utility functions for analytics dashboard
export interface ExportData {
  [key: string]: Record<string, string | number>[];
}

type DataRow = Record<string, string | number | undefined>;

// Enhanced CSV export function
export const exportToCSV = async (data: DataRow[], filename: string, headers?: string[]): Promise<boolean> => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    let csvContent = '';
    
    // Add headers if provided, otherwise use object keys
    if (headers) {
      csvContent = headers.join(',') + '\n';
    } else if (data[0]) {
      csvContent = Object.keys(data[0]).join(',') + '\n';
    }
    
    // Add data rows
    data.forEach(item => {
      const values = headers 
        ? headers.map(header => {
            const value = item[header];
            // Handle values that might contain commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value ?? '';
          })
        : Object.values(item).map(value => {
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value ?? '';
          });
      csvContent += values.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

// Export multiple datasets as a single CSV with multiple sheets (sections)
export const exportMultipleToCSV = async (datasets: ExportData, filename: string): Promise<boolean> => {
  try {
    let csvContent = '';
    
    Object.entries(datasets).forEach(([sheetName, data], index) => {
      if (index > 0) csvContent += '\n\n'; // Add spacing between sections
      
      csvContent += `=== ${sheetName.toUpperCase()} ===\n`;
      
      if (data && data.length > 0) {
        // Add headers
        csvContent += Object.keys(data[0]).join(',') + '\n';
        
        // Add data
        data.forEach(item => {
          const values = Object.values(item).map(value => {
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value ?? '';
          });
          csvContent += values.join(',') + '\n';
        });
      } else {
        csvContent += 'No data available\n';
      }
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}-complete.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error exporting multiple CSV:', error);
    throw error;
  }
};

// Export analytics overview data
export const exportAnalyticsOverview = async (analyticsData: Record<string, number>, goals: Record<string, string | number>[], period: string): Promise<boolean> => {
  try {
    const datasets: ExportData = {
      'Analytics Overview': [
        {
          metric: 'Total Revenue',
          value: analyticsData.totalRevenue,
          growth: `${analyticsData.revenueGrowth}%`,
          period: period
        },
        {
          metric: 'Total Users',
          value: analyticsData.totalUsers,
          growth: `${analyticsData.userGrowth}%`,
          period: period
        },
        {
          metric: 'Conversion Rate',
          value: `${analyticsData.conversionRate}%`,
          growth: `${analyticsData.conversionGrowth}%`,
          period: period
        },
        {
          metric: 'Average Order Value',
          value: analyticsData.avgOrderValue,
          growth: `${analyticsData.aovGrowth}%`,
          period: period
        }
      ],
      'Goals Progress': goals.map(goal => ({
        title: goal.title as string,
        current: goal.current as number,
        target: goal.target as number,
        unit: goal.unit as string,
        progress: `${(((goal.current as number) / (goal.target as number)) * 100).toFixed(1)}%`,
        status: (goal.current as number) >= (goal.target as number) ? 'Achieved' : 'In Progress'
      }))
    };

    return await exportMultipleToCSV(datasets, `analytics-overview-${period}`);
  } catch (error) {
    console.error('Error exporting analytics overview:', error);
    throw error;
  }
};

// Export campaign performance data
export const exportCampaignPerformance = async (data: DataRow[], selectedRows?: number[]): Promise<boolean> => {
  try {
    const dataToExport = selectedRows && selectedRows.length > 0 
      ? data.filter(row => selectedRows.includes(row.id as number))
      : data;

    if (dataToExport.length === 0) {
      throw new Error('No data selected for export');
    }

    return await exportToCSV(dataToExport, `campaign-performance-${new Date().toISOString().split('T')[0]}`);
  } catch (error) {
    console.error('Error exporting campaign performance:', error);
    throw error;
  }
};

// Export advanced reports data
export const exportAdvancedReport = async (performanceData: Record<string, string | number>[], chartData: Record<string, DataRow[]>, selectedMetric: string, dateRange: string): Promise<boolean> => {
  try {
    const datasets: ExportData = {
      'Performance Overview': performanceData.map(item => ({
        metric: item.metric as string,
        value: item.value as string,
        change: item.change as string,
        trend: item.trend as string
      })),
      'Revenue Over Time': (chartData.revenueOverTime || []).map(item => ({
        ...item
      })) as Record<string, string | number>[],
      'Revenue by Channel': (chartData.revenueByChannel || []).map(item => ({
        ...item
      })) as Record<string, string | number>[],
      'Traffic Sources': (chartData.trafficSources || []).map(item => ({
        ...item
      })) as Record<string, string | number>[]
    };

    return await exportMultipleToCSV(datasets, `advanced-report-${selectedMetric}-${dateRange}`);
  } catch (error) {
    console.error('Error exporting advanced report:', error);
    throw error;
  }
};

// Generic export function with loading state
export const handleExportWithLoading = async (
  exportFunction: () => Promise<boolean>,
  setLoading: (loading: boolean) => void,
  successMessage: string = 'Export completed successfully'
) => {
  try {
    setLoading(true);
    const success = await exportFunction();
    
    if (success) {
      // Show success message (you can replace with toast notification)
      console.log(successMessage);
    } else {
      throw new Error('Export failed');
    }
  } catch (error) {
    console.error('Export error:', error);
    alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setLoading(false);
  }
};

// Utility to validate export data
export const validateExportData = (data: DataRow[]): boolean => {
  return Array.isArray(data) && data.length > 0;
};

// Utility to format filename with timestamp
export const formatFilename = (baseName: string, extension: string = 'csv'): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${baseName}-${timestamp}.${extension}`;
};