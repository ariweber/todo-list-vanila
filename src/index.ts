import { tasks, editId, addTask, deleteTask, editTask, toggleTask, clearCompleted, clearAll } from "./tasks.js";
import { renderTasks } from "./view.js";

const taskInput = document.getElementById("task-input") as HTMLInputElement | null;
const addBtn = document.getElementById("add-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const clearAllBtn = document.getElementById("clear-all-btn");
const list = document.getElementById("task-list");

if (!taskInput || !addBtn || !clearCompletedBtn || !clearAllBtn || !list) throw new Error("Missing elements in HTML");

function refresh(): void {
    renderTasks(list!, tasks, editId);
}

function getTaskId(target: HTMLElement): number | null {
    const li = target.closest("li");
    if (!li) return null;
    return Number(li.dataset.id);
}

function handleAdd(): void {
    addTask({ text: taskInput!.value.trim() });
    taskInput!.value = "";
    refresh();
}

function handleClearCompleted(): void {
    clearCompleted();
    refresh();
}

function handleClearAll(): void {
    if (!confirm("Are you sure you want to delete all tasks?")) return;
    clearAll();
    refresh();
}

function handleListClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const action = target.dataset.action;
    const id = getTaskId(target);
    if (!action || id === null) return;
    if (action === "toggle") toggleTask(id);
    if (action === "edit") editTask(id);
    if (action === "delete") deleteTask(id);
    refresh();
}

function handleEditKey(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (!target.classList.contains("edit-input")) return;
    if (event.key === "Enter") editTask(getTaskId(target), target.value.trim());
    else if (event.key === "Escape") editTask(null);
    else return;
    refresh();
}

addBtn.addEventListener("click", handleAdd);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleAdd();
});
clearCompletedBtn.addEventListener("click", handleClearCompleted);
clearAllBtn.addEventListener("click", handleClearAll);

list.addEventListener("click", handleListClick);
list.addEventListener("keydown", handleEditKey);

refresh();