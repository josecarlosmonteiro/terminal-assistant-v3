'use client'

import { THistoryItem } from "@/app/types/terminal"
import { delay } from "@/app/utils/delay";
import { useEffect, useRef } from "react";

type Props = {
  history: THistoryItem[];
}

export function DisplayTerminal({ history }: Props) {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function() {
      await delay(10);

      if (historyRef.current) {
        historyRef.current.scrollTop = historyRef.current.scrollHeight;
      }
    })()
  }, [history]);

  if (!history.length) return (
    <div className="h-[80vh] text-gray-600 font-semibold">
      <i>Sistema pronto. Use {'"ajuda"'} para uma lista de comandos.</i>
    </div>
  )

  return (
    <div
      ref={historyRef}
      className="h-[80vh] pr-4 flex flex-col gap-1 scroll-smooth overflow-auto custom-scrollbar"
    >
      {
        history.map(item => (
          <div key={item.id} className="flex flex-col gap-1 animate-terminal-line">
            <span>{item.rawCommand}</span>

            <item.View {...item} />
          </div>
        ))
      }

      {
        !history.length && (
          <div className="text-gray-600 italic">
            Sistema pronto. Digite um comando para começar...
          </div>
        )
      }
    </div>
  )
}