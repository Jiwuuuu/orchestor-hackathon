/**
 * Standard API response envelope (for non-auth endpoints)
 */
export type ApiEnvelope<TData> = {
  status: number
  data: TData
  message: string
}

/**
 * Error response structure
 */
export type ApiError = {
  message: string
}

/**
 * Sign-in request payload
 */
export type SignInPayload = {
  email: string
  password: string
}

/**
 * Sign-up request payload
 */
export type SignUpPayload = {
  email: string
  password: string
  fullname: string
}

/**
 * OAuth sign-in request payload
 */
export type OAuthSignInPayload = {
  token: string
}

/**
 * User data structure (matches backend response)
 * Backend returns user directly from /api/auth/sign-in and /api/auth/sign-up
 * No token management needed - uses HTTP-only cookies
 */
export type User = {
  id: string
  email: string
  fullname?: string
  created_at: string
  updated_at: string
}

// Backwards compatibility aliases
export type PortalUser = User
export type LoginPayload = SignInPayload
export type LoginResponse = User
