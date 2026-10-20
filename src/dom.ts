export function createButton(label: string, className: string, action: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = className;
    button.dataset.action = action;
    return button;
}

export function createInput(value: string, className: string): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.className = className;
    return input;
}

export function createCheckbox(checked: boolean, className: string, action: string): HTMLInputElement {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.className = className;
    checkbox.dataset.action = action;
    return checkbox;
}