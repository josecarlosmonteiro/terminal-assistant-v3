export type TTask = {
  id: string;
  content: string;
  completed?: boolean;
}

export type TFindAllTasks = () => Promise<TTask[]>;
export type TCreateTask = (content: string) => Promise<void>;
export type TDeleteTask = (id: string) => Promise<void>;
export type TCompleteTask = (id: string) => Promise<void>;