'use client'

import { useQueryClient } from "@tanstack/react-query";
import { TRegistry, TViewProps } from "../types/terminal";
import { taskServices } from "../services/tasks.services";
import { CreateTaskView } from "../components/tasks/CreateTaskView";
import { TTask } from "../types/tasks";
import { ListTasksView } from "../components/tasks/ListTasksView";
import { HelpView } from "../components/HelpView";
import { DeleteTaskView } from "../components/tasks/DeleteTaskView";

export function useCommandResgistry() {
  const queryClient = useQueryClient();

  const registry: TRegistry = {
    ajuda: {
      commands: {
        "": {
          description: "Lista de comandos válidos",
          usage: "ajuda",
          action: async () => { },
          View: HelpView,
        }
      },
      targetNotFound: () => `Tente apenas "ajuda" para uma lista de comandos válidos`,
    },
    limpar: {
      commands: {
        "": {
          description: 'Limpa o terminal',
          usage: "limpar",
          action: async () => false,
          View: () => null,
        }
      },
      targetNotFound: () => 'Use apenas "limpar"',
    },
    criar: {
      commands: {
        tarefa: {
          description: "Adiciona uma nova tarefa à lista",
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
    },
    remover: {
      commands: {
        tarefa: {
          description: "Remove uma tarefa a partir do seu ID",
          usage: 'remover tarefa "ab01"',
          action: async ({ payload }) => {
            if (!payload) throw new Error("tarefa não reconhecida");

            await taskServices.delete(payload);
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
          },
          View: props => <DeleteTaskView {...props} />
        }
      },
      targetNotFound: target => `Não entendi "${target}". O que exatamente você quer apagar?`
    }
  }

  return registry;
}