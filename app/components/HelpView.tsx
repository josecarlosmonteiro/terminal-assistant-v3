// components/Terminal/Views/HelpView.tsx
'use client';

import { COMMAND_ALIASES } from "../constants/COMMAND_ALIASES";
import { useCommandResgistry } from "../hooks/useCommandRegistry";
import { TViewProps } from "../types/terminal";

export function HelpView({ status }: TViewProps) {
  const registry = useCommandResgistry();
  const label = "sistema>";

  const getAliasesFor = (commandName: string) => {
    return Object.entries(COMMAND_ALIASES)
      .filter(([, original]) => original === commandName)
      .map(([alias]) => alias)
  }

  if (status === "error") return <div className="text-red-500">{label} Erro ao gerar manual.</div>;

  return (
    <div className="flex flex-col gap-4 mx-auto text-zinc-300 p-4 rounded bg-white/5 font-mono my-2">
      <div className="text-emerald-500 font-bold border-b border-yellow-900/50 pb-1">
        --- MANUAL DE COMANDOS DISPONÍVEIS ---
      </div>

      <table className="w-fit text-left table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-widest">
            <th className="px-4 pr-16 py-1 border-b border-zinc-800">Comando Principal</th>
            <th className="px-4 pr-16 py-1 border-b border-zinc-800">Sintaxe</th>
            <th className="px-4 pr-16 py-1 border-b border-zinc-800">Sinônimos Aceitos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {Object.entries(registry).map(([cmdName, group]) => {
            const aliases = getAliasesFor(cmdName);

            // Pegamos o primeiro subcomando (geralmente "" ou "tarefa") para a descrição
            const firstSubKey = Object.keys(group.commands)[0];
            const definition = group.commands[firstSubKey];

            return (
              <tr key={cmdName} className="hover:bg-white/2 transition-colors duration-300">
                {/* Comando Oficial */}
                <td className="px-4 py-3 align-top">
                  <span className="text-green-400 font-bold">{cmdName}</span>
                </td>

                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-300 text-sm">{definition.description}</span>
                    <code className="text-zinc-600 text-sm mt-1 italic">
                      Ex: {definition.usage}
                    </code>
                  </div>
                </td>

                {/* Aliases Agrupados */}
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {aliases.length > 0 && (
                      aliases.map(alias => (
                        <span key={alias} className="text-zinc-500 text-xs bg-zinc-800 px-1.5 py-0.5 rounded">
                          {alias}
                        </span>
                      ))
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <footer className="text-zinc-600 text-sm mt-2 italic">
        * Use aspas para argumentos que contenham espaços. Ex: criar tarefa {'"Nova Tarefa"'}
      </footer>
    </div>
  );
}