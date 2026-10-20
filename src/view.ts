import type { Task } from "./types.js";
import { createButton, createCheckbox, createInput } from "./dom.js";

function createTaskLi(task: Task): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = String(task.id);
    if (task.completed) li.classList.add("completed");
    return li;
}

function sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
}

function createEditItem(task: Task): HTMLLIElement {
    const li = createTaskLi(task);
    const editInput = createInput(task.text, "edit-input");
    li.append(editInput);
    return li;
}

function createViewItem(task: Task): HTMLLIElement {
    const li = createTaskLi(task);
    const checkbox = createCheckbox(task.completed, "task-checkbox", "toggle");
    const text = document.createElement("span");
    text.textContent = task.text;
    const editBtn = createButton("ערוך", "edit-btn", "edit");
    const deleteBtn = createButton("מחק", "delete-btn", "delete");
    li.append(checkbox, text, editBtn, deleteBtn);
    return li;
}

export function renderTasks(list: HTMLElement, tasks: Task[], editId: number | null): void {
    list.innerHTML = "";
    sortTasks(tasks).forEach((task) => {
        if (task.id === editId) list.append(createEditItem(task));
        else list.append(createViewItem(task));
    });
    list.querySelector<HTMLInputElement>(".edit-input")?.focus();
}