'use client'

import { useState } from "react";

export function useCommandHistory() {
  const [stack, setStack] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const addToStack = (command: string) => {
    setStack(prev => {
      if (prev[prev.length - 1] === command) return prev;

      return [...prev, command];
    });

    setPointer(-1);
  }

  const getPrevious = () => {
    let newPointer = pointer;
    const history = [...stack].reverse();

    if (pointer < history.length - 1) {
      newPointer = pointer + 1;
      setPointer(newPointer);
      return history[newPointer];
    }

    return history[pointer];
  }

  const getNext = () => {
    if (pointer > 0) {
      const newPointer = pointer - 1;
      setPointer(newPointer);
      const history = [...stack].reverse();
      return history[newPointer];
    }

    setPointer(-1);
    return "";
  }

  return {
    addToStack,
    getPrevious,
    getNext,
  };
}