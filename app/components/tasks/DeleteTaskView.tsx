import { TViewProps } from "@/app/types/terminal";

export function DeleteTaskView({ status, error, payload }: TViewProps) {
  const label = "sistema $>";

  if (status === 'pending')
    return <div className="text-yellow-500 italic">{label} removendo tarefa {`"${payload}"`}...</div>
  
  if (status === 'error')
    return <div className="text-red-500 italic">{label} erro ao tentar remover tarefa {`"${payload}"`}.</div>
  
  if (status === 'success')
    return <div className="text-yellow-500 italic">{label} tarefa removida.</div>
}