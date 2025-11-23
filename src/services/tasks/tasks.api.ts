import { apiClient } from "@/lib/axios";
import Papa from "papaparse";
import type {
  TaskInput,
  TaskPreviewRequest,
  TaskPreviewResponse,
  TaskScheduleRequest,
  TaskScheduleResponse,
  ProcessedTask,
} from "./tasks.types";

const TASKS_ENDPOINT = "/api/tasks";

/**
 * Submit tasks for AI preview and processing
 * POST /api/tasks/preview
 *
 * @param tasks - Array of task objects to process
 * @returns Processed tasks with AI enhancements and validation
 */
export const previewTasks = async (
  tasks: TaskInput[]
): Promise<TaskPreviewResponse> => {
  const payload: TaskPreviewRequest = { tasks };

  const { data } = await apiClient.post<TaskPreviewResponse>(
    `${TASKS_ENDPOINT}/preview`,
    payload
  );

  return data;
};

/**
 * Transform ProcessedTask array to SchedulePostInput array
 * Converts preview format to schedule API format
 */
const transformToSchedulePosts = (tasks: ProcessedTask[]) => {
  if (!Array.isArray(tasks)) {
    console.error('transformToSchedulePosts: tasks is not an array:', tasks);
    throw new Error('Invalid tasks data: expected array');
  }

  return tasks.map((processedTask, index) => {
    try {
      const { task, schedule = [], captions = [] } = processedTask || {};

      if (!task) {
        console.error(`Task at index ${index} is undefined:`, processedTask);
        throw new Error(`Task at index ${index} is undefined`);
      }

      // Get primary platform from schedule or task
      const primaryPlatform = schedule[0]?.platform || task.platform || "instagram";

      // Get optimized caption or use original
      const primaryCaption = captions.find(c => c.platform === primaryPlatform);
      const caption = primaryCaption?.optimized || task.caption || "";

      // Get hashtags from caption
      const hashtags = primaryCaption?.hashtags || task.tags || [];

      // Convert suggested time to ISO 8601
      // Format: "18:00 UTC+7" -> "2025-11-21T18:00:00.000Z"
      const suggestedTime = schedule[0]?.suggestedTime || "12:00 UTC+7";
      const dueDate = task.dueDate || new Date().toISOString().split('T')[0]; // e.g., "11/21/2025"

      // Parse date and time
      const [datePart] = dueDate.split(' '); // Handle both "11/21/2025" and "2025-11-21"
      let year: string, month: string, day: string;

      if (datePart.includes('/')) {
        // Format: "11/21/2025"
        const [m, d, y] = datePart.split('/');
        year = y;
        month = m.padStart(2, '0');
        day = d.padStart(2, '0');
      } else {
        // Format: "2025-11-21"
        [year, month, day] = datePart.split('-');
      }

      // Extract time from suggestedTime (e.g., "18:00 UTC+7" -> "18:00")
      const [timePart] = suggestedTime.split(' ');
      const [hours, minutes] = timePart.split(':');

      // Create ISO 8601 timestamp (UTC)
      const scheduledTime = `${year}-${month}-${day}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;

      const post = {
        taskId: task.taskId || "",
        account: task.account || null,
        platform: primaryPlatform,
        caption: caption || "",
        assetUrl: task.videoUrl || null,
        tags: Array.isArray(hashtags) ? hashtags : [],
        scheduledTime: scheduledTime,
        project: task.project || null,
        section: task.section || null
      };

      console.log(`Transformed task ${index}:`, post);
      return post;
    } catch (error) {
      console.error(`Error transforming task at index ${index}:`, error, processedTask);
      throw error;
    }
  });
};

/**
 * Submit processed tasks for scheduling
 * POST /api/tasks/schedule
 *
 * @param tasks - Array of processed tasks to schedule
 * @returns Scheduled posts and any failed tasks
 */
export const scheduleTasks = async (
  tasks: ProcessedTask[]
): Promise<TaskScheduleResponse> => {
  console.log('scheduleTasks called with tasks:', tasks);

  // Check authentication
  if (typeof window !== 'undefined') {
    const accessToken = sessionStorage.getItem('access_token');
    console.log('Access token present:', !!accessToken);
    if (accessToken) {
      console.log('Token preview:', accessToken.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No access token found in sessionStorage! User may not be authenticated.');
    }
  }

  const posts = transformToSchedulePosts(tasks);
  console.log('Transformed posts:', posts);
  console.log('Transformed posts count:', posts.length);
  console.log('First post structure:', posts[0]);

  const payload: TaskScheduleRequest = { posts };
  console.log('Sending payload to API:', JSON.stringify(payload, null, 2));
  console.log('Payload keys:', Object.keys(payload));
  console.log('Posts array length:', payload.posts.length);

  const { data } = await apiClient.post<TaskScheduleResponse>(
    `${TASKS_ENDPOINT}/schedule`,
    payload
  );

  console.log('API response:', data);
  return data;
};

/**
 * CSV Row structure from Asana export
 */
interface AsanaCSVRow {
  "Task ID": string;
  "Created At": string;
  "Completed At": string;
  "Last Modified": string;
  Name: string;
  "Section/Column": string;
  Assignee: string;
  "Assignee Email": string;
  "Start Date": string;
  "Due Date": string;
  Tags: string;
  Notes: string;
  Projects: string;
  "Parent task": string;
  "Blocked By (Dependencies)": string;
  "Blocking (Dependencies)": string;
  Account: string;
  "IG/FB": string; // Platform field (e.g., "Instagram", "Facebook", "Instagram, Facebook")
  "Post Type": string;
  Status: string;
}

/**
 * Extract video and thumbnail URLs from Notes field
 */
const extractMediaFromNotes = (
  notes: string
): {
  videoUrl: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  caption: string;
} => {
  const videoMatch = notes.match(/Video:\s*(https?:\/\/[^\s\n]+)/i);
  const thumbnailMatch = notes.match(/Thumbnail:\s*(https?:\/\/[^\s\n]+)/i);
  const imageMatch = notes.match(/Image:\s*(https?:\/\/[^\s\n]+)/i);
  const captionMatch = notes.match(/Caption:\s*([^\n]+)/i);

  return {
    videoUrl: videoMatch ? videoMatch[1].trim() : "",
    thumbnailUrl: thumbnailMatch ? thumbnailMatch[1].trim() : null,
    imageUrl: imageMatch ? imageMatch[1].trim() : null,
    caption: captionMatch
      ? captionMatch[1].trim().replace(/#\w+/g, "").trim()
      : "",
  };
};

/**
 * Parse CSV content to TaskInput array using PapaParse
 * Handles Asana export format
 */
export const parseCSVToTasks = (csvContent: string): TaskInput[] => {
  // Remove BOM if present
  const cleanContent = csvContent.replace(/^\uFEFF/, '');

  // Detect if we need to skip header rows
  const lines = cleanContent.split("\n");
  let contentToParse = cleanContent;

  // Check if first line looks like a title row (doesn't have standard CSV headers)
  if (lines.length > 0 && !lines[0].includes("Task ID")) {
    // Skip first 2 rows (title and empty row) from old Asana export format
    contentToParse = lines.slice(2).join("\n");
  }

  const parseResult = Papa.parse<AsanaCSVRow>(contentToParse, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (parseResult.errors.length > 0) {
    console.error("CSV parsing errors:", parseResult.errors);
    throw new Error(`CSV parsing failed: ${parseResult.errors[0].message}`);
  }

  // Debug: Log first row to see actual headers
  console.log("CSV Headers:", parseResult.meta.fields);
  console.log("First row data:", parseResult.data[0]);
  console.log("Total rows:", parseResult.data.length);

  const tasks: TaskInput[] = parseResult.data
    .filter((row) => {
      const hasTaskId =
        row["Task ID"] && row["Task ID"].toString().trim() !== "";
      const hasName = row["Name"] && row["Name"].toString().trim() !== "";
      console.log("Row filter check:", {
        hasTaskId,
        hasName,
        taskId: row["Task ID"],
        name: row["Name"],
      });
      return hasTaskId && hasName;
    })
    .map((row) => {
      const { videoUrl, thumbnailUrl, imageUrl, caption } =
        extractMediaFromNotes(row.Notes || "");

      // Parse platform from IG/FB column (e.g., "Instagram", "Facebook", "Instagram, Facebook")
      // Takes only the first platform if multiple are specified
      const platformsRaw = row["IG/FB"] || "";
      const platforms = platformsRaw
        .split(",")
        .map((p) => p.trim().toLowerCase())
        .filter((p) => p.length > 0);
      const platform = platforms.length > 0 ? platforms[0] : "instagram";

      return {
        taskId: row["Task ID"],
        name: row.Name,
        account: row.Account || "",
        platform: platform, // Single platform (first one if multiple specified)
        postType: row["Post Type"] || "",
        status: row.Status || "To be Scheduled",
        createdAt: row["Created At"] || new Date().toISOString().split("T")[0],
        dueDate: row["Due Date"] || new Date().toISOString().split("T")[0],
        tags: row.Tags ? row.Tags.split(",").map((t) => t.trim()) : [],
        caption: caption,
        videoUrl: videoUrl || imageUrl || "",
        thumbnailUrl: thumbnailUrl,
        assignee: row.Assignee || "",
        assigneeEmail: row["Assignee Email"] || "",
        project: row.Projects || "",
        section: row["Section/Column"] || "To do",
      };
    });

  console.log("Filtered tasks count:", tasks.length);

  if (tasks.length === 0) {
    throw new Error(
      'No valid tasks found in CSV file. Please check that the CSV has "Task ID" and "Name" columns.'
    );
  }

  return tasks;
};

/**
 * Parse JSON content to TaskInput array
 */
export const parseJSONToTasks = (jsonContent: string): TaskInput[] => {
  const parsed = JSON.parse(jsonContent);

  // Handle different JSON formats
  if (Array.isArray(parsed)) {
    return parsed as TaskInput[];
  }

  if (parsed.tasks && Array.isArray(parsed.tasks)) {
    return parsed.tasks as TaskInput[];
  }

  throw new Error("Invalid JSON format. Expected { tasks: [...] } or [...]");
};
