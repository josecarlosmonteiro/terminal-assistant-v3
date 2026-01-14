'use client';

import { COMMAND_ALIASES } from "../constants/COMMAND_ALIASES";
import { THistoryItem } from "../types/terminal";
import { useCommandParser } from "./useCommandParser";
import { useCommandResgistry } from "./useCommandRegistry";

type Props = {
  createHistoryItem: (item: Omit<THistoryItem, 'id'>) => THistoryItem;
  appendHistory: (item: THistoryItem) => void;
  updateHistory: (id: string, updates: Partial<THistoryItem>) => void;
  clearHistory: VoidFunction;
  userLabel?: string;
}

export function useTerminalExecutor({
  userLabel,
  createHistoryItem,
  appendHistory,
  updateHistory,
  clearHistory,
}: Props) {

  const { parse } = useCommandParser();
  const registry = useCommandResgistry();

  const execute = async (input: string) => {
    const { action, target, payload, flags } = parse(input);
    const rawCommand = `${userLabel} $> ${input}`;

    const actionName = COMMAND_ALIASES[action] || action;

    if (actionName === 'limpar') return clearHistory();

    const commandGroup = registry[actionName];

    if (!commandGroup) {
      const errorItem = createHistoryItem({
        rawCommand,
        status: 'error',
        error: `Comando "${action}" não reconhecido.`,
        View: ({ error }) => <div className="text-red-500 italic">sistema {"$>"} {error}</div>,
      });

      return appendHistory(errorItem);
    }

    const commandDefinition = commandGroup.commands[target];

    if (!commandDefinition) {
      const errorItem = createHistoryItem({
        rawCommand,
        status: 'error',
        error: commandGroup.targetNotFound ? commandGroup.targetNotFound(target) : `Target "${target}" não encontrado.`,
        View: ({ error }) => <div className="text-red-500 italic">sistema {"$>"} {error}</div>
      });

      return appendHistory(errorItem);
    }

    const executionItem = createHistoryItem({
      rawCommand,
      status: 'pending',
      View: commandDefinition.View,
    });

    appendHistory(executionItem);

    try {
      const result = await commandDefinition.action({ payload, flags });

      updateHistory(executionItem.id, {
        status: 'success',
        data: result,
      })
    } catch (error: unknown) {
      updateHistory(executionItem.id, {
        status: 'error',
        error: error instanceof Error ? error.message : "Erro inesperado.",
      })
    }
  }

  return { execute };
}