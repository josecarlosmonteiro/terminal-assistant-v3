import { TCreateTask, TFindAllTasks } from "../types/services"
import { api } from "./api"

const findAllTasks: TFindAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

const createTask: TCreateTask = async (content) => {
  const response = await api.post('/tasks', { content });
  return response.data;
}

export const taskServices = {
  findAll: findAllTasks,
  create: createTask,
}