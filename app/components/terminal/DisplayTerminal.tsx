'use client'

import { THistoryItem } from "@/app/types/terminal"
import { useEffect, useRef } from "react";

type Props = {
  history: THistoryItem[];
}

export function DisplayTerminal({ history }: Props) {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history])

  return (
    <div ref={historyRef} className="flex flex-col gap-1 scroll-smooth overflow-auto">
      {
        history.map(item => (
          <div key={item.id} className="flex flex-col gap-1 anim-fade-in">
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