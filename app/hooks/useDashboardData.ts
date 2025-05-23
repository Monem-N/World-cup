import { useState, useEffect } from 'react';
import { loadDashboardData, type DashboardData } from '../api/dashboardDataLoader';

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataError(null);
        const data = await loadDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setDataError('Failed to load trip data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate days left based on real data or fallback
  const startDate = dashboardData?.tripOverview.startDate 
    ? new Date(dashboardData.tripOverview.startDate) 
    : new Date('June 15, 2025');
  const daysLeft = Math.ceil((startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.max(0, Math.min(100, ((14 - daysLeft) / 14) * 100));

  return {
    isLoading,
    dashboardData,
    dataError,
    daysLeft,
    progress
  };
}
