import { apiClient } from "@/lib/axios"
import type {
  TaskInput,
  TaskPreviewRequest,
  TaskPreviewResponse
} from "./tasks.types"

const TASKS_ENDPOINT = "/tasks"

/**
 * Submit tasks for AI preview and processing
 * POST /tasks/preview
 *
 * @param tasks - Array of task objects to process
 * @returns Processed tasks with AI enhancements and validation
 */
export const previewTasks = async (tasks: TaskInput[]): Promise<TaskPreviewResponse> => {
  const payload: TaskPreviewRequest = { tasks }
  
  const { data } = await apiClient.post<TaskPreviewResponse>(
    `${TASKS_ENDPOINT}/preview`,
    payload
  )
  
  return data
}

/**
 * Parse CSV content to TaskInput array
 * TODO: Implement proper CSV parsing based on Asana export format
 */
export const parseCSVToTasks = (csvContent: string): TaskInput[] => {
  // Simple CSV parser - should be enhanced for production
  const lines = csvContent.trim().split('\n')
  if (lines.length < 2) {
    throw new Error('CSV file is empty or invalid')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const tasks: TaskInput[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    
    const task: TaskInput = {
      taskId: values[headers.indexOf('taskId')] || `task-${i}`,
      name: values[headers.indexOf('name')] || '',
      account: values[headers.indexOf('account')] || '',
      postType: values[headers.indexOf('postType')] || '',
      status: values[headers.indexOf('status')] || 'To be Scheduled',
      createdAt: values[headers.indexOf('createdAt')] || new Date().toISOString().split('T')[0],
      dueDate: values[headers.indexOf('dueDate')] || new Date().toISOString().split('T')[0],
      tags: values[headers.indexOf('tags')]?.split(';') || [],
      caption: values[headers.indexOf('caption')] || '',
      videoUrl: values[headers.indexOf('videoUrl')] || '',
      thumbnailUrl: values[headers.indexOf('thumbnailUrl')] || null,
      assignee: values[headers.indexOf('assignee')] || '',
      assigneeEmail: values[headers.indexOf('assigneeEmail')] || '',
      project: values[headers.indexOf('project')] || '',
      section: values[headers.indexOf('section')] || 'To do'
    }

    tasks.push(task)
  }

  return tasks
}

/**
 * Parse JSON content to TaskInput array
 */
export const parseJSONToTasks = (jsonContent: string): TaskInput[] => {
  const parsed = JSON.parse(jsonContent)
  
  // Handle different JSON formats
  if (Array.isArray(parsed)) {
    return parsed as TaskInput[]
  }
  
  if (parsed.tasks && Array.isArray(parsed.tasks)) {
    return parsed.tasks as TaskInput[]
  }
  
  throw new Error('Invalid JSON format. Expected { tasks: [...] } or [...]')
}
