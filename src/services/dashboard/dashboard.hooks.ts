import { useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary, fetchTodaySchedule, fetchRecentPosts } from "./dashboard.api";
import { dashboardKeys } from "./dashboard.keys";

/**
 * Hook to fetch dashboard summary
 */
export const useDashboardSummary = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: fetchDashboardSummary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch today's schedule
 */
export const useTodaySchedule = () => {
  return useQuery({
    queryKey: dashboardKeys.today(),
    queryFn: fetchTodaySchedule,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch recent posts
 */
export const useRecentPosts = () => {
  return useQuery({
    queryKey: dashboardKeys.recent(),
    queryFn: fetchRecentPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
