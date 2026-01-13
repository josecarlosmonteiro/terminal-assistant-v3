'use client'

import { useQueryClient } from "@tanstack/react-query";
import { TRegistry, TViewProps } from "../types/terminal";
import { taskServices } from "../services/tasks.services";
import { CreateTaskView } from "../components/tasks/CreateTaskView";
import { TTask } from "../types/services";
import { ListTasksView } from "../components/tasks/ListTasksView";

export function useCommandResgistry() {
  const queryClient = useQueryClient();

  const registry: TRegistry = {
    criar: {
      commands: {
        tarefa: {
          description: "Adicionar uma nova tarefa à lista",
          usage: 'criar tarefa "nome da tarefa"',
          action: async ({ payload }) => {
            if (!payload) throw new Error("Especifique a tarefa a ser adicionada.");

            const result = await taskServices.create(payload);

            queryClient.invalidateQueries({ queryKey: ['tasks'] });

            return result;
          },
          View: (props: TViewProps<TTask>) => <CreateTaskView {...props} />
        }
      },
      targetNotFound: target => `Não entendi "${target}". O que exatamente você quer criar?`
    },
    listar: {
      commands: {
        tarefas: {
          description: 'Lista todas as tarefas atualmente',
          usage: 'listar tarefas',
          action: async () => false,
          View: ListTasksView,
        }
      },
      targetNotFound: target => `Não entendi "${target}". O que exatamente você quer listar?`
    }
  }

  return registry;
}