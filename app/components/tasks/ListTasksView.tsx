'use client';

import { taskServices } from "@/app/services/tasks.services";
import { useQuery } from "@tanstack/react-query";

export function ListTasksView() {
  const label = "sistema $>";

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskServices.findAll,
  });

  if (isLoading) return (
    <div className="italic text-yellow-500">
      {label} Carregando lista...
    </div>
  );

  if (isError) return (
    <div className="text-red-500">
      {label} Erro ao buscar lista de tarefas. Tente novamente.
    </div>
  )

  if (!data?.length) return (
    <div className="text-yellow-500 italic">
      {label} Não há itens na lista atualmente.
    </div>
  );

  return (
    <div className="text-yellow-500 flex flex-col gap-4 my-4">
      <div>{label} listando tarefas encontradas</div>

      <div className="p-4 rounded bg-white/5">
        <table className="w-fit">
          <thead>
            <tr className="border-b-2 border-yellow-700">
              <th className="px-4"></th>
              <th className="px-4">ID</th>
              <th className="px-4 text-left">Tarefa</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2"></td></tr>
            {
              data.map(task => (
                <tr key={task.id}>
                  <td className="px-4">
                    {task.completed ? "🟢" : "🔴"}
                  </td>
                  <td className="px-4">{task.id}</td>
                  <td className="px-4">{task.content}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}