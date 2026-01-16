import { TTask } from "@/app/types/tasks";
import { TViewProps } from "@/app/types/terminal";

export function CompleteTaskView({ status, data, error }: TViewProps<TTask>) {
  const label = "sistema $>";

  if (status === 'pending') return (
    <div className="text-gray-500 italic">{label} processando...</div>
  )

  if (status === "error") return (
    <div className="text-red-500">
      {label} {error}
    </div>
  )

  return (
    <div className="text-yellow-500">
      {label} tarefa {data?.id} concluída!
    </div>
  )
}