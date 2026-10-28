import type { Task } from "./types.js";

const STORAGE_KEY = "tasks";

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

export function getTasks(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}
