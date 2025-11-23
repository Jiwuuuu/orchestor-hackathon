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
  platform: string; // Single platform: "instagram", "facebook", etc. (takes first from CSV)
  postType: string;
  status: string;
  createdAt: string;
  dueDate: string;
  tags: string[];
  caption: string;
  videoUrl: string;
  thumbnailUrl: null;
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
export interface PlatformScheduleSuggestion {
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
  schedule: PlatformScheduleSuggestion[];
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
 * Backend returns preview with validation, captions, and schedule suggestions
 */
export interface TaskPreviewResponse {
  status: number;
  data: {
    tasks: ProcessedTask[];
    summary: TaskPreviewSummary;
  };
  message: string;
}

/**
 * Task preview request payload
 */
export interface TaskPreviewRequest {
  tasks: TaskInput[];
}

/**
 * Post to be scheduled (API request format)
 * Matches backend SchedulePostDto schema
 */
export interface SchedulePostInput {
  taskId: string;
  account: string | null;
  platform: string;
  caption: string;
  assetUrl: string | null;
  tags: string[];
  scheduledTime: string; // ISO 8601 format (datetime)
  project: string | null;
  section: string | null;
}

/**
 * Task schedule request payload
 */
export interface TaskScheduleRequest {
  posts: SchedulePostInput[];
}

/**
 * Task schedule response
 */
export interface TaskScheduleResponse {
  status: number;
  data: {
    scheduled: ScheduledPost[];
    failed: Array<{
      taskId: string;
      reason: string;
    }>;
  };
  message: string;
}

/**
 * DEPRECATED - Backend doesn't return this format
 * Keeping for reference only
 */
export interface ProcessedTaskOld {
  task: TaskInput;
  validation: TaskValidation;
  captions: PlatformCaptionResult[];
  schedule: PlatformScheduleSuggestion[];
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
