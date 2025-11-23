import { apiClient } from "@/lib/axios"
import type {
  SignInPayload,
  SignUpPayload,
  OAuthSignInPayload,
  User
} from "./auth.types"

/**
 * Sign in API call
 * POST /api/auth/sign-in
 *
 * @param payload - Email and password
 * @returns User object (session cookie set automatically)
 */
export const signIn = async (payload: SignInPayload): Promise<User> => {
  const response = await apiClient.post<any>(
    '/auth/sign-in',
    payload
  )

  console.log('Sign in response:', response)
  console.log('Response data:', response.data)

  // The backend wraps response in { status, data, message }
  // So we need to access response.data.data to get the actual data
  const responseData = response.data.data || response.data

  // Store access_token in sessionStorage if present
  if (responseData.session?.access_token && typeof window !== 'undefined') {
    sessionStorage.setItem('access_token', responseData.session.access_token)
    console.log('Access token stored:', responseData.session.access_token)
  }

  return responseData.user
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
    '/auth/sign-up',
    payload
  )
  return data
}

/**
 * OAuth sign in API call (Google/Supabase)
 * POST /api/auth/sign-in-with-provider
 *
 * @param payload - Supabase OAuth token
 * @returns User object (session cookie set automatically)
 */
export const signInWithProvider = async (
  payload: OAuthSignInPayload
): Promise<User> => {
  const response = await apiClient.post<any>(
    '/auth/sign-in-with-provider',
    payload
  )

  console.log('OAuth sign in response:', response)
  console.log('Response data:', response.data)

  // The backend wraps response in { status, data, message }
  // So we need to access response.data.data to get the actual data
  const responseData = response.data.data || response.data

  // Store access_token in sessionStorage if present
  if (responseData.session?.access_token && typeof window !== 'undefined') {
    sessionStorage.setItem('access_token', responseData.session.access_token)
    console.log('Access token stored:', responseData.session.access_token)
  }

  return responseData.user
}

/**
 * Get current authenticated user
 * GET /api/user/me
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
  // Mark that we're logging out and clear access_token
  if (typeof window !== "undefined") {
    sessionStorage.setItem('isLoggingOut', 'true')
    sessionStorage.removeItem('access_token')  // Clear access token
    window.location.href = "/"
  }
}
