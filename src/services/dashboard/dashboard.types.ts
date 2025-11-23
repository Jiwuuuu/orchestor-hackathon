/**
 * Dashboard API Type Definitions
 */

/**
 * Scheduled post data structure
 */
export interface DashboardPost {
  id: string;
  user_id: string;
  account: string;
  platform: string;
  source_task_id: string;
  project: string;
  section: string;
  caption: string;
  asset_url: string;
  tags: string[] | null;
  scheduled_time: string;
  status: "SCHEDULED" | "PUBLISHED" | "FAILED";
  published_time: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Dashboard summary data
 */
export interface DashboardSummaryData {
  totalScheduled: number;
  totalPublished: number;
  upcomingCount: number;
  todayCount: number;
  upcomingPosts: DashboardPost[];
}

/**
 * Dashboard summary API response
 */
export interface DashboardSummaryResponse {
  status: number;
  data: DashboardSummaryData;
  message: string;
}

/**
 * Today's schedule API response
 */
export interface TodayScheduleResponse {
  status: number;
  data: DashboardPost[];
  message: string;
}

/**
 * Recent posts API response
 */
export interface RecentPostsResponse {
  status: number;
  data: DashboardPost[];
  message: string;
}
