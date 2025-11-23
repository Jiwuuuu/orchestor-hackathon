/**
 * React Query keys for dashboard-related queries
 * Follows the pattern: [domain, operation, ...params]
 */

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => ["dashboard", "summary"] as const,
  today: () => ["dashboard", "today"] as const,
  recent: () => ["dashboard", "recent"] as const,
};
