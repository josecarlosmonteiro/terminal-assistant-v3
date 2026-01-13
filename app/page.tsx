'use client'

import { Input } from "./components/Input";
import { DisplayTerminal } from "./components/terminal/DisplayTerminal";
import { useTerminalExecutor } from "./hooks/useTerminalExecutor";
import { useTerminalHistory } from "./hooks/useTerminalHistory";

export default function Home() {
  const userLabel = "monteiro";

  const { history, appendHistory, createItem, updateHistory } = useTerminalHistory();
  const { execute } = useTerminalExecutor({
    userLabel,
    createHistoryItem: createItem,
    appendHistory,
    updateHistory,
  })

  return (
    <div className="w-[80vw] mx-auto flex flex-col gap-4 p-4">
      <DisplayTerminal history={history} />

      <Input
        label={userLabel}
        handleInput={execute}
      />
    </div>
  );
}
