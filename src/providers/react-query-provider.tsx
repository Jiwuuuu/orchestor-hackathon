"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type PropsWithChildren, useState } from "react"
import { createQueryClient } from "@/lib/react-query"

/**
 * React Query Provider
 *
 * Wraps the application with QueryClientProvider to enable
 * React Query hooks throughout the component tree.
 *
 * Features:
 * - Creates a stable QueryClient instance using useState
 * - Includes React Query DevTools in development mode
 * - Provides centralized data fetching and caching
 *
 * Usage:
 * Wrap your app root or layout:
 * ```tsx
 * <ReactQueryProvider>
 *   <YourApp />
 * </ReactQueryProvider>
 * ```
 */
export function ReactQueryProvider({ children }: PropsWithChildren) {
  // Create a stable QueryClient instance
  // Using useState ensures the client is only created once
  const [client] = useState(createQueryClient)

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* Show DevTools only in development */}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools buttonPosition="bottom-right" />
      ) : null}
    </QueryClientProvider>
  )
}
