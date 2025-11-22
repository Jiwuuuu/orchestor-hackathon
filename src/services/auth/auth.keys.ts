/**
 * Query key factory for auth-related queries
 * Provides type-safe, hierarchical cache keys for React Query
 *
 * Hierarchy:
 * - ["auth"] - All auth queries
 * - ["auth", "me"] - Current user query
 */
export const authKeys = {
  all: () => ["auth"] as const,
  me: () => [...authKeys.all(), "me"] as const,
}
