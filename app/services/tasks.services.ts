import { TCompleteTask, TCreateTask, TDeleteTask, TFindAllTasks } from "../types/tasks"
import { api } from "./api"

const findAllTasks: TFindAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

const createTask: TCreateTask = async (content) => {
  const response = await api.post('/tasks', { content });
  return response.data;
}

const deleteTask: TDeleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

const completeTask: TCompleteTask = async (id) => {
  const response = await api.patch(`/tasks/${id}`, { completed: true });
  return response.data;
}

export const taskServices = {
  findAll: findAllTasks,
  create: createTask,
  delete: deleteTask,
  complete: completeTask,
}