"use client"

import { createContext, useContext, useMemo, useEffect, type PropsWithChildren } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { authKeys } from "@/services/auth"
import type { User } from "@/services/auth"

/**
 * Current User Context Value
 */
type CurrentUserContextValue = {
  user: User | null
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null)

/**
 * Current User Provider
 *
 * Provides authenticated user data throughout the application.
 * Uses cookie-based authentication - user data is cached from sign-in/sign-up.
 * Protects routes by redirecting to /auth if no user is cached.
 *
 * Features:
 * - Uses cached user data from React Query
 * - User data set during sign-in/sign-up mutations
 * - Redirects to /auth if no cached user found
 *
 * Usage:
 * Wrap protected routes with this provider:
 * ```tsx
 * <CurrentUserProvider>
 *   <DashboardPage />
 * </CurrentUserProvider>
 * ```
 *
 * Then consume in components:
 * ```tsx
 * const { user } = useCurrentUser()
 * ```
 */
export function CurrentUserProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Get cached user data (set by sign-in/sign-up mutations)
  const user = queryClient.getQueryData<User>(authKeys.me()) ?? null

  // Redirect to auth if no user in cache
  useEffect(() => {
    if (!user) {
      router.replace("/auth")
    }
  }, [user, router])

  const value = useMemo<CurrentUserContextValue>(
    () => ({
      user,
    }),
    [user]
  )

  // Show loading or nothing while redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-custom-green flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-[clamp(14px,1.5vw,16px)] text-black/60">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

/**
 * Hook to consume current user context
 *
 * Must be used within CurrentUserProvider
 *
 * @throws Error if used outside CurrentUserProvider
 *
 * @example
 * ```tsx
 * const { user, isLoading } = useCurrentUser()
 *
 * if (isLoading) return <Spinner />
 * if (!user) return <div>Please sign in</div>
 *
 * return <div>Welcome {user.fullname || user.email}</div>
 * ```
 */
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext)

  if (!context) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider")
  }

  return context
}
