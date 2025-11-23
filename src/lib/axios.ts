import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from "axios"

// API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://unputrefiable-yu-unlibellous.ngrok-free.dev"

// Base axios configuration for cookie-based authentication
const baseConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  timeout: 120_000, // 120 seconds (2 minutes) - for AI processing tasks
  withCredentials: true, // CRITICAL: Include HTTP-only cookies in requests
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
}

/**
 * Factory function to create a configured axios instance
 * with cookie-based authentication and token support
 *
 * Note: Uses both HTTP-only cookies and Authorization header
 */
export const createApiClient = (
  config: AxiosRequestConfig = {}
): AxiosInstance => {
  const client = axios.create({
    ...baseConfig,
    ...config,
    withCredentials: true // Ensure cookies are always included
  })

  // Request interceptor: Add access token to Authorization header if available
  client.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const accessToken = sessionStorage.getItem('access_token')
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor: Handle 401 Unauthorized
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear invalid token
        if (typeof window !== "undefined") {
          sessionStorage.removeItem('access_token')
        }

        // Don't redirect for /user/me - let CurrentUserProvider handle it
        // This prevents double redirects and infinite loops
        const isUserMeEndpoint = error.config?.url?.includes('/user/me')

        if (!isUserMeEndpoint && typeof window !== "undefined") {
          window.location.href = "/auth"
        }
      }
      return Promise.reject(error)
    }
  )

  return client
}

/**
 * Default configured API client with cookie-based authentication
 * Automatically includes HTTP-only cookies in all requests
 */
export const apiClient = createApiClient()
