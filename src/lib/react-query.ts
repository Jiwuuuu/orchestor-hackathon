import { QueryClient, type QueryClientConfig } from "@tanstack/react-query"

const FIVE_MINUTES = 1000 * 60 * 5

/**
 * Standardized React Query configuration
 * - Queries are cached and considered fresh for 5 minutes
 * - Garbage collection removes unused cache after 5 minutes
 * - No automatic refetching on window focus or reconnect
 * - Failed queries retry once
 */
export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,        // Data is fresh for 5 minutes
      gcTime: FIVE_MINUTES,            // Cache for 5 minutes after becoming unused
      refetchOnWindowFocus: false,     // Don't refetch when window regains focus
      refetchOnReconnect: false,       // Don't refetch when network reconnects
      retry: 1,                        // Retry failed queries once
    },
    mutations: {
      retry: 0,                        // Don't retry failed mutations
    },
  },
}

/**
 * Factory function to create a new QueryClient instance
 * with the standardized configuration
 */
export const createQueryClient = () => new QueryClient(queryClientConfig)

/**
 * Default QueryClient instance for the application
 */
export const queryClient = createQueryClient()
