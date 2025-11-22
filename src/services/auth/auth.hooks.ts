import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"
import { signIn, signUp, signInWithProvider, getCurrentUser, logout } from "./auth.api"
import { authKeys } from "./auth.keys"
import type {
  SignInPayload,
  SignUpPayload,
  OAuthSignInPayload,
  User
} from "./auth.types"

/**
 * Mutation hook for user sign in
 *
 * Usage:
 * ```tsx
 * const signInMutation = useSignInMutation()
 *
 * const handleSignIn = async () => {
 *   const user = await signInMutation.mutateAsync({
 *     email: "user@example.com",
 *     password: "password123"
 *   })
 *   // Session cookie is set automatically
 *   router.push("/dashboard")
 * }
 * ```
 */
export const useSignInMutation = (
  options?: UseMutationOptions<User, unknown, SignInPayload>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSuccess: (user) => {
      // Update the user query cache
      queryClient.setQueryData(authKeys.me(), user)
    },
    ...options,
  })
}

/**
 * Mutation hook for user sign up
 *
 * Usage:
 * ```tsx
 * const signUpMutation = useSignUpMutation()
 *
 * const handleSignUp = async () => {
 *   const user = await signUpMutation.mutateAsync({
 *     email: "user@example.com",
 *     password: "password123",
 *     fullname: "John Doe"
 *   })
 *   // Session cookie is set automatically
 *   router.push("/dashboard")
 * }
 * ```
 */
export const useSignUpMutation = (
  options?: UseMutationOptions<User, unknown, SignUpPayload>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      // Update the user query cache
      queryClient.setQueryData(authKeys.me(), user)
    },
    ...options,
  })
}

/**
 * Mutation hook for OAuth sign in (Google/Apple)
 *
 * Usage:
 * ```tsx
 * const oauthMutation = useOAuthSignInMutation()
 *
 * const handleGoogleSignIn = async (googleToken: string) => {
 *   const user = await oauthMutation.mutateAsync({
 *     provider: "google",
 *     token: googleToken
 *   })
 *   router.push("/dashboard")
 * }
 * ```
 */
export const useOAuthSignInMutation = (
  options?: UseMutationOptions<User, unknown, OAuthSignInPayload>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signInWithProvider,
    onSuccess: (user) => {
      // Update the user query cache
      queryClient.setQueryData(authKeys.me(), user)
    },
    ...options,
  })
}

/**
 * Query hook for fetching current authenticated user
 *
 * Features:
 * - Uses session cookie for authentication (no token needed)
 * - Automatically refetches when invalidated
 * - Uses React Query cache with 5-minute stale time
 *
 * Usage:
 * ```tsx
 * const { data: user, isLoading, error } = useCurrentUserQuery()
 *
 * if (isLoading) return <Spinner />
 * if (error) return <div>Please sign in</div>
 * if (user) return <div>Welcome {user.fullname}</div>
 * ```
 */
export const useCurrentUserQuery = (
  options?: Omit<UseQueryOptions<User, unknown, User, ReturnType<typeof authKeys.me>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentUser,
    retry: false, // Don't retry on 401 (just redirect)
    ...options,
  })

/**
 * Mutation hook for user logout
 *
 * Usage:
 * ```tsx
 * const logoutMutation = useLogoutMutation()
 *
 * const handleLogout = () => {
 *   logoutMutation.mutate()
 * }
 * ```
 */
export const useLogoutMutation = (
  options?: UseMutationOptions<void, unknown, void>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear()
    },
    ...options,
  })
}

// Backwards compatibility aliases
export const useLoginMutation = useSignInMutation
