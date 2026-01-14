// components/Terminal/Views/HelpView.tsx
'use client';

import { useCommandResgistry } from "../hooks/useCommandRegistry";
import { TViewProps } from "../types/terminal";

export function HelpView({ status }: TViewProps) {
  const registry = useCommandResgistry();
  const label = "sistema>";

  if (status === "error") return <div className="text-red-500">{label} Erro ao gerar manual.</div>;

  return (
    <div className="flex flex-col gap-4 text-zinc-300 p-4 rounded bg-white/5 font-mono my-2">
      <div className="text-yellow-500 font-bold border-b border-yellow-900/50 pb-1">
        --- MANUAL DE COMANDOS DISPONÍVEIS ---
      </div>

      <table className="w-full text-left table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-widest">
            <th className="px-2 py-1 border-b border-zinc-800">Domínio</th>
            <th className="px-2 py-1 border-b border-zinc-800">Uso (Sintaxe)</th>
            <th className="px-2 py-1 border-b border-zinc-800">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(registry).map(([domain, group]) => (
            // Percorremos cada subcomando dentro do domínio (grupo)
            Object.entries(group.commands).map(([subCommand, def]) => (
              <tr key={`${domain}-${subCommand}`} className="hover:bg-white/5 transition-colors group">
                {/* Domínio: Mostrado apenas na primeira linha ou repetido de forma discreta */}
                <td className="px-2 py-1 align-top">
                  <span className="bg-zinc-800 text-blue-400 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">
                    {domain}
                  </span>
                </td>

                {/* Uso: O comando real que o usuário deve digitar */}
                <td className="px-2 py-1 align-top text-green-400 font-bold">
                  {def.usage}
                </td>

                {/* Descrição: O que o comando faz */}
                <td className="px-2 py-1 align-top text-zinc-400 text-sm leading-relaxed">
                  {def.description}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      <footer className="text-zinc-600 text-[10px] mt-2 italic">
        * Use aspas para argumentos que contenham espaços. Ex: tarefa criar {'"Nova Tarefa"'}
      </footer>
    </div>
  );
}