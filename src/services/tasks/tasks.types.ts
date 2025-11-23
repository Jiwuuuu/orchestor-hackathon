/**
 * Task API Type Definitions
 * Based on ACTUAL backend response (updated Nov 23, 2025)
 */

/**
 * Task input format (matches backend request schema)
 */
export interface TaskInput {
  taskId: string;
  name: string;
  account: string;
  postType: string;
  status: string;
  createdAt: string;
  dueDate: string;
  tags: string[];
  caption: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  assignee: string;
  assigneeEmail: string;
  project: string;
  section: string;
}

/**
 * Scheduled post returned by backend
 * This is what we actually get from POST /api/tasks/preview
 */
export interface ScheduledPost {
  id: string;
  user_id: string;
  account: string;
  platform: string;
  caption: string;
  asset_url: string;
  tags: string[];
  scheduled_time: string;
  source_task_id: string;
  project: string;
  section: string;
  status: "SCHEDULED" | "DRAFT" | "PUBLISHED";
  created_at: string;
}

/**
 * Validation issue from backend
 */
export interface ValidationIssue {
  code: string;
  severity: "info" | "warning" | "error";
  message: string;
}

/**
 * Task validation result
 */
export interface TaskValidation {
  score: number;
  issues: ValidationIssue[];
}

/**
 * Caption optimization for a platform
 */
export interface PlatformCaptionResult {
  platform: string;
  original: string;
  optimized: string;
  hashtags: string[];
}

/**
 * Schedule suggestion for a platform
 */
export interface ScheduleSuggestion {
  platform: string;
  suggestedTime: string;
  conflict: boolean;
  reason: string;
}

/**
 * Processed task with AI enhancements
 */
export interface ProcessedTask {
  task: TaskInput;
  validation: TaskValidation;
  captions: PlatformCaptionResult[];
  schedule: ScheduleSuggestion[];
  ready: boolean;
}

/**
 * Task preview summary
 */
export interface TaskPreviewSummary {
  totalTasks: number;
  readyToSchedule: number;
  avgCompleteness: number;
  keyRisks: string[];
}

/**
 * ACTUAL backend response (updated Nov 23, 2025)
 * Backend returns scheduled posts directly, not preview with validation
 */
export interface TaskPreviewResponse {
  status: number;
  data: ScheduledPost[];
  message: string;
}

/**
 * Task preview request payload
 */
export interface TaskPreviewRequest {
  tasks: TaskInput[];
}

/**
 * DEPRECATED - Backend doesn't return this format
 * Keeping for reference only
 */
export interface ProcessedTaskOld {
  task: TaskInput;
  validation: TaskValidation;
  captions: PlatformCaptionResult[];
  schedule: ScheduleSuggestion[];
  ready: boolean;
}

/**
 * DEPRECATED - Backend doesn't return preview with validation
 * Keeping for reference only
 */
export interface TaskPreviewResponseOld {
  status: number;
  data: {
    tasks: ProcessedTask[];
    summary: TaskPreviewSummary;
  };
  message: string;
}
