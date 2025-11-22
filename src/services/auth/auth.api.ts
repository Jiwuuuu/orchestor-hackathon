import { apiClient } from "@/lib/axios"
import type {
  SignInPayload,
  SignUpPayload,
  OAuthSignInPayload,
  User
} from "./auth.types"

/**
 * Sign in API call
 * POST /auth/sign-in
 *
 * @param payload - Email and password
 * @returns User object (session cookie set automatically)
 */
export const signIn = async (payload: SignInPayload): Promise<User> => {
  const { data } = await apiClient.post<User>(
    '/auth/sign-in',
    payload
  )
  return data
}

/**
 * Sign up API call
 * POST /auth/sign-up
 *
 * @param payload - Email, password, and fullname
 * @returns User object (session cookie set automatically)
 */
export const signUp = async (payload: SignUpPayload): Promise<User> => {
  const { data } = await apiClient.post<User>(
    '/auth/sign-up',
    payload
  )
  return data
}

/**
 * OAuth sign in API call (Google/Apple)
 * POST /auth/sign-in-with-provider
 *
 * @param payload - Provider, token, and optional access token
 * @returns User object (session cookie set automatically)
 */
export const signInWithProvider = async (
  payload: OAuthSignInPayload
): Promise<User> => {
  const { data } = await apiClient.post<User>(
    '/auth/sign-in-with-provider',
    payload
  )
  return data
}

/**
 * Get current authenticated user
 * GET /user/me
 *
 * @returns Current user data from backend
 */
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/user/me')
  return data
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
