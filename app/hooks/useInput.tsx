'use client'

import { KeyboardEvent, useRef, useState } from "react";
import { useCommandHistory } from "./useCommandHistory";
import { useCompleteCommand } from "./useCompleteCommand";

export function useInput(handleInput: (value: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToStack, getPrevious, getNext } = useCommandHistory();

  const [value, setValue] = useState<string>("");

  const { suggestions, selectedSuggestion, arrowUpSuggestion, arrowDownSuggestion, autocompleteValue } = useCompleteCommand(value);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    if (event.key === "Enter" && selectedSuggestion !== null && !!suggestions.length) {
      const newValue = autocompleteValue(value, suggestions[selectedSuggestion])
      setValue(newValue);
      return;
    }

    if (event.key === 'Enter' && value.trim()) {
      addToStack(value);
      handleInput(value);
      setValue("");
    }

    if (event.key === "ArrowUp") {
      if (value) {
        event.preventDefault();

        arrowUpSuggestion();

        return;
      };

      event.preventDefault();
      const prev = getPrevious();
      if (!!prev) setValue(prev);
    }

    if (event.key === "ArrowDown") {
      if (value) {
        event.preventDefault();

        arrowDownSuggestion();

        return;
      };

      event.preventDefault();
      const next = getNext();
      setValue(next);
    }
  }

  return {
    value,
    setValue,
    inputRef,
    handleKeyDown,
    suggestions,
    selectedSuggestion,
  }
}