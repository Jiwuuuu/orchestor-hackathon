/**
 * React Query keys for task-related queries
 * Follows the pattern: [domain, operation, ...params]
 */

export const tasksKeys = {
  all: ["tasks"] as const,
  preview: (taskIds: string[]) => ["tasks", "preview", ...taskIds] as const,
}
