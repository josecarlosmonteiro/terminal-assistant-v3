/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from "react";

export type TCommandContext = {
  action: string;
  target: string;
  flags?: string[];
  payload?: string;
}

export type TCommandStatus = 'pending' | 'success' | 'error';

export type TViewProps<TData = any> = {
  status: TCommandStatus;
  data?: TData;
  error?: string;
  payload?: string;
  flags?: string[];
}

export type TCommandDefinition = {
  description: string;
  usage: string;
  action: (args: { payload?: string; flags?: string[] }) => Promise<unknown>;
  View: ComponentType<TViewProps>;
}

export type TCommandRegistryGroup = {
  commands: Record<string, TCommandDefinition>;
  targetNotFound: (target: string) => string;
}

export type THistoryItem = {
  id: string;
  rawCommand: string;
  data?: any;
  error?: string;
  status: TCommandStatus;
  View: ComponentType<TViewProps>;
}

export type TRegistry = Record<string, TCommandRegistryGroup>;