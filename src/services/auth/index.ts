/**
 * Auth Service - Barrel Export
 *
 * Single import point for all auth-related functionality:
 * - API functions (login, getCurrentUser, logout)
 * - React Query hooks (useLoginMutation, useCurrentUserQuery, useLogoutMutation)
 * - Query keys (authKeys)
 * - Type definitions (LoginPayload, LoginResponse, PortalUser, etc.)
 */
export * from "./auth.api"
export * from "./auth.hooks"
export * from "./auth.keys"
export * from "./auth.types"
