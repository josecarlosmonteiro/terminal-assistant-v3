export type TTask = {
  id: string;
  content: string;
}

export type TFindAllTasks = () => Promise<TTask[]>;
export type TCreateTask = (content: string) => Promise<void>;