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
  timeout: 15_000, // 15 seconds
  withCredentials: true, // CRITICAL: Include HTTP-only cookies in requests
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
}

/**
 * Factory function to create a configured axios instance
 * with cookie-based authentication
 *
 * Note: No token management needed - backend uses HTTP-only cookies
 */
export const createApiClient = (
  config: AxiosRequestConfig = {}
): AxiosInstance => {
  const client = axios.create({
    ...baseConfig,
    ...config,
    withCredentials: true // Ensure cookies are always included
  })

  // Response interceptor: Handle 401 Unauthorized
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Redirect to auth page on unauthorized
        if (typeof window !== "undefined") {
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
