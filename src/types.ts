export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type NewTask = Pick<Task, "text">;