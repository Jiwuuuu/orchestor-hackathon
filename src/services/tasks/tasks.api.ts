import { apiClient } from "@/lib/axios";
import Papa from "papaparse";
import type {
  TaskInput,
  TaskPreviewRequest,
  TaskPreviewResponse,
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
  // Skip first 2 rows (title and empty row) from Asana export
  const lines = csvContent.split("\n");
  const contentWithoutTitle = lines.slice(2).join("\n");

  const parseResult = Papa.parse<AsanaCSVRow>(contentWithoutTitle, {
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

      return {
        taskId: row["Task ID"],
        name: row.Name,
        account: row.Account || "",
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
