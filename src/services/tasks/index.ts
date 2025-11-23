/**
 * Tasks Service
 * Handles task preview and scheduling API calls
 *
 * Usage:
 * ```typescript
 * import { previewTasks, scheduleTasks, parseCSVToTasks } from '@/services/tasks'
 * ```
 */

export { previewTasks, scheduleTasks, parseCSVToTasks, parseJSONToTasks } from "./tasks.api"
export { tasksKeys } from "./tasks.keys"
export type {
  TaskInput,
  TaskPreviewRequest,
  TaskPreviewResponse,
  TaskScheduleRequest,
  TaskScheduleResponse,
  SchedulePostInput,
  ScheduledPost,
  // Deprecated types (backend doesn't return these)
  ProcessedTask,
  TaskValidation,
  ValidationIssue,
  PlatformCaptionResult,
  PlatformScheduleSuggestion,
  TaskPreviewSummary
} from "./tasks.types"
