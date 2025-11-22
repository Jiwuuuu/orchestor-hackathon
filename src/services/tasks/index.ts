/**
 * Tasks Service
 * Handles task preview and processing API calls
 * 
 * Usage:
 * ```typescript
 * import { previewTasks, parseCSVToTasks } from '@/services/tasks'
 * ```
 */

export { previewTasks, parseCSVToTasks, parseJSONToTasks } from "./tasks.api"
export { tasksKeys } from "./tasks.keys"
export type {
  TaskInput,
  TaskPreviewRequest,
  TaskPreviewResponse,
  ScheduledPost,
  // Deprecated types (backend doesn't return these)
  ProcessedTask,
  TaskValidation,
  ValidationIssue,
  PlatformCaptionResult,
  ScheduleSuggestion,
  TaskPreviewSummary
} from "./tasks.types"
