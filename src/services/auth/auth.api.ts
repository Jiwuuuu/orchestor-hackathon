import { apiClient } from "@/lib/axios"
import type {
  SignInPayload,
  SignUpPayload,
  OAuthSignInPayload,
  User
} from "./auth.types"

const AUTH_ENDPOINT = "/api/auth"

/**
 * Sign in API call
 * POST /api/auth/sign-in
 *
 * @param payload - Email and password
 * @returns User object (session cookie set automatically)
 */
export const signIn = async (payload: SignInPayload): Promise<User> => {
  const { data } = await apiClient.post<User>(
    `${AUTH_ENDPOINT}/sign-in`,
    payload
  )
  return data
}

/**
 * Sign up API call
 * POST /api/auth/sign-up
 *
 * @param payload - Email, password, and fullname
 * @returns User object (session cookie set automatically)
 */
export const signUp = async (payload: SignUpPayload): Promise<User> => {
  const { data } = await apiClient.post<User>(
    `${AUTH_ENDPOINT}/sign-up`,
    payload
  )
  return data
}

/**
 * OAuth sign in API call (Google/Apple)
 * POST /api/auth/sign-in-with-provider
 *
 * @param payload - Provider, token, and optional access token
 * @returns User object (session cookie set automatically)
 */
export const signInWithProvider = async (
  payload: OAuthSignInPayload
): Promise<User> => {
  const { data } = await apiClient.post<User>(
    `${AUTH_ENDPOINT}/sign-in-with-provider`,
    payload
  )
  return data
}

/**
 * Get current authenticated user
 * NOTE: Not implemented - user data is cached from sign-in/sign-up
 * No additional API call needed since we use cookie-based auth
 *
 * @returns Cached user data or throws error
 */
export const getCurrentUser = async (): Promise<User> => {
  throw new Error("getCurrentUser should use cached data from sign-in/sign-up")
}

// Backwards compatibility aliases
export const login = signIn
export const logout = async (): Promise<void> => {
  // No server-side logout endpoint - just redirect client-side
  // Cookies will expire naturally
  if (typeof window !== "undefined") {
    window.location.href = "/auth"
  }
}
