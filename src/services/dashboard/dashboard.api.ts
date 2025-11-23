import { apiClient } from "@/lib/axios";
import type {
  DashboardSummaryResponse,
  TodayScheduleResponse,
  RecentPostsResponse,
} from "./dashboard.types";

const DASHBOARD_ENDPOINT = "/dashboard";

/**
 * Fetch dashboard summary
 * GET /api/dashboard/summary
 *
 * @returns Dashboard summary with stats and upcoming posts
 */
export const fetchDashboardSummary = async (): Promise<DashboardSummaryResponse> => {
  const { data } = await apiClient.get<DashboardSummaryResponse>(
    `${DASHBOARD_ENDPOINT}/summary`
  );
  return data;
};

/**
 * Fetch today's scheduled posts
 * GET /api/dashboard/today
 *
 * @returns Posts scheduled for today
 */
export const fetchTodaySchedule = async (): Promise<TodayScheduleResponse> => {
  const { data } = await apiClient.get<TodayScheduleResponse>(
    `${DASHBOARD_ENDPOINT}/today`
  );
  return data;
};

/**
 * Fetch recent posts
 * GET /api/dashboard/recent
 *
 * @returns Recently created posts
 */
export const fetchRecentPosts = async (): Promise<RecentPostsResponse> => {
  const { data } = await apiClient.get<RecentPostsResponse>(
    `${DASHBOARD_ENDPOINT}/recent`
  );
  return data;
};
