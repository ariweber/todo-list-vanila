import type { NewTask, Task } from "./types.js";
import { getTasks, saveTasks } from "./storage.js";

export let tasks: Task[] = getTasks();
export let editId: number | null = null;

export function addTask(newTask: NewTask): void {
    if (!newTask.text) return;
    tasks = [...tasks, { id: Date.now(), text: newTask.text, completed: false }];
    saveTasks(tasks);
}

export function deleteTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
}

export function editTask(id: number | null, text?: string): void {
    if (id !== null && text) tasks = tasks.map((task) => (task.id === id ? { ...task, text } : task));
    editId = text === undefined ? id : null;
    saveTasks(tasks);
}

export function toggleTask(id: number): void {
    tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
    saveTasks(tasks);
}

export function clearCompleted(): void {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks(tasks);
}

export function clearAll(): void {
    tasks = [];
    saveTasks(tasks);
}