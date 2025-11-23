import type { AxiosError } from "axios"
import type { ApiEnvelope } from "@/services/auth/auth.types"

/**
 * Type guard to check if error is an Axios error with API envelope response
 */
function isApiError<T = unknown>(error: unknown): error is AxiosError<T> {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    error.isAxiosError === true
  )
}

/**
 * Centralized error message resolution
 * Extracts user-friendly error messages from various error types
 *
 * Priority order:
 * 1. API response message (response.data.message)
 * 2. HTTP status text (response.statusText)
 * 3. Error message (error.message)
 * 4. Fallback generic message
 *
 * @param unknownError - Any error type (Axios error, Error, or unknown)
 * @returns User-friendly error message
 */
export const resolveErrorMessage = (unknownError: unknown): string => {
  // Handle Axios errors with API envelope
  if (isApiError<ApiEnvelope<unknown>>(unknownError)) {
    const payload = unknownError.response?.data

    // Try to get message from API envelope
    if (payload && typeof payload === "object" && "message" in payload) {
      return (payload as ApiEnvelope<unknown>).message
    }

    // Fallback to HTTP status text
    if (unknownError.response?.statusText) {
      return unknownError.response.statusText
    }

    // Fallback to error message
    if (unknownError.message) {
      return unknownError.message
    }
  }

  // Handle standard Error objects
  if (unknownError instanceof Error) {
    return unknownError.message
  }

  // Handle string errors
  if (typeof unknownError === "string") {
    return unknownError
  }

  // Ultimate fallback
  return "An unknown error occurred"
}

/**
 * Check if error is a network error (no response from server)
 */
export const isNetworkError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return !error.response && error.code === "ERR_NETWORK"
}

/**
 * Check if error is a timeout error
 */
export const isTimeoutError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return error.code === "ECONNABORTED" || error.code === "ERR_TIMEOUT"
}

/**
 * Check if error is an authentication error (401)
 */
export const isAuthError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return error.response?.status === 401
}

/**
 * Check if error is a forbidden error (403)
 */
export const isForbiddenError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return error.response?.status === 403
}

/**
 * Check if error is a not found error (404)
 */
export const isNotFoundError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return error.response?.status === 404
}

/**
 * Check if error is a validation error (422)
 */
export const isValidationError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  return error.response?.status === 422
}

/**
 * Check if error is a server error (5xx)
 */
export const isServerError = (error: unknown): boolean => {
  if (!isApiError(error)) return false
  const status = error.response?.status
  return status !== undefined && status >= 500 && status < 600
}
