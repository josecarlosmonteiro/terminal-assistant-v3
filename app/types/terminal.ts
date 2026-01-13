export type TCommandContext = {
  action: string;
  target: string;
  flags?: string[];
  payload?: string;
}