'use client'

import { useState } from "react";
import { COMMAND_ALIASES } from "../constants/COMMAND_ALIASES";
import { useCommandResgistry } from "./useCommandRegistry";

export function useCompleteCommand(value: string) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(value.trim() ? null : null);
  const commands = useCommandResgistry();

  const findCommands = (value: string) => {
    if (!value.trim()) return [];

    const tokens = value.trimStart().split(' ');
    const currentAction = tokens[0]?.toLowerCase();
    const currentTarget = tokens[1]?.toLowerCase();

    if (tokens.length > 2) return [];

    if (tokens.length <= 1) {
      const allActions = [
        ...Object.keys(commands),
        ...Object.keys(COMMAND_ALIASES),
      ];

      return allActions
        .filter(cmd => cmd.startsWith(currentAction) && cmd !== currentAction);
    }

    const resolvedAction = COMMAND_ALIASES[currentAction] || currentAction;
    const group = commands[resolvedAction];

    if (group) {
      return Object.keys(group.commands)
        .filter(target => target !== "" && target.startsWith(currentTarget));
    }

    return [];
  }

  const suggestions = [...new Set(findCommands(value))];

  const arrowUpSuggestion = () => {
    if (selectedSuggestion === null) {
      if (!!suggestions.length) setSelectedSuggestion(suggestions.length - 1);

      return;
    }

    if (selectedSuggestion > 0) {
      setSelectedSuggestion(prev => prev! - 1);
      return;
    } else {
      setSelectedSuggestion(0);
    }
  }

  const arrowDownSuggestion = () => {
    if (selectedSuggestion === null) return;

    if (selectedSuggestion >= 0 && selectedSuggestion <= suggestions.length - 1) {
      setSelectedSuggestion(prev => prev! + 1);
      return
    }

    if (selectedSuggestion > suggestions.length - 1) {
      setSelectedSuggestion(null);
      return;
    }
  }

  const autocompleteValue = (currentValue: string, suggestion: string): string => {
    const tokens = currentValue.trimStart().split(" ");

    if (tokens.length <= 1) {
      return suggestion;
    }

    const action = tokens[0];
    setSelectedSuggestion(null);

    return `${action} ${suggestion}`;
  }

  return {
    suggestions,
    selectedSuggestion,
    arrowUpSuggestion,
    arrowDownSuggestion,
    autocompleteValue,
  };
}