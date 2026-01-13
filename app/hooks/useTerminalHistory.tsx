'use client'

import { useState } from "react"
import { THistoryItem } from "../types/terminal";

export function useTerminalHistory() {
  const [history, setHistory] = useState<THistoryItem[]>([]);

  const createItem = (data: Omit<THistoryItem, 'id'>): THistoryItem => {
    return {
      ...data,
      id: crypto.randomUUID(),
    };
  }

  const appendHistory = (item: THistoryItem) => {
    setHistory(prev => [...prev, item]);
  }

  const updateHistory = (id: string, data: Partial<THistoryItem>) => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  }

  const clearHistory = () => {
    setHistory([]);
  }

  return {
    history,
    createItem,
    appendHistory,
    updateHistory,
    clearHistory,
  }
}