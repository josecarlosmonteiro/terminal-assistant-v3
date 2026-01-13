// components/Terminal/Views/HelpView.tsx
'use client';

import { useCommandResgistry } from "../hooks/useCommandRegistry";
import { TViewProps } from "../types/terminal";

export function HelpView({ status }: TViewProps) {
  // O componente de ajuda consome o próprio registro do sistema
  const registry = useCommandResgistry();
  const label = "sistema $>";

  if (status === "error") return <div className="text-red-500">{label} Erro ao gerar ajuda.</div>;

  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-white/5 text-zinc-300 font-mono">
      <header>
        <div className="text-yellow-500 font-bold">--- MANUAL DO SISTEMA ---</div>
        <div className="text-zinc-500 text-xs">Lista de todos os comandos e domínios registrados.</div>
      </header>

      {Object.entries(registry).map(([domain, group]) => (
        <section key={domain} className="flex flex-col gap-2">
          {/* Nome do Grupo (ex: TAREFA, SISTEMA) */}
          <div className="text-blue-400 font-bold uppercase text-sm border-b border-zinc-800 w-fit">
            [{domain}]
          </div>

          <div className="flex flex-col gap-3 pl-4">
            {Object.entries(group.commands).map(([subCommand, def]) => {
              // Evitamos renderizar o próprio comando de ajuda na lista se desejar
              if (domain === 'ajuda') return null;

              return (
                <div key={subCommand} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 min-w-30">Exemplo: {def.usage}</span>
                    <span className="text-zinc-400 text-sm italic">{def.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="mt-2 text-zinc-600 text-[10px] uppercase tracking-tighter">
        Fim do manual. Use as setas para navegar no histórico.
      </footer>
    </div>
  );
}