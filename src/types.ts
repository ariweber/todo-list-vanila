export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type NewTask = Pick<Task, "text">;

export type EditTask = Pick<Task, "id"> & Partial<Pick<Task, "text" | "completed">>;

export type TaskHandlers = {
  onEdit: (id: number | null, text?: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};