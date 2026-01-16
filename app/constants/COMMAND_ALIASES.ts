export const CREATE_ALIASES: Record<string, string> = {
  "nova": "criar",
  "novo": "criar",
  "adicionar": "criar",
  "add": "criar",
  "inserir": "criar",
  "incluir": "criar",
};

export const DONE_COMMAND_ALIASES: Record<string, string> = {
  "completar": "concluir",
  "finalizar": "concluir",
  "finalizado": "concluir",
  "feito": "concluir",
};

export const REMOVE_COMMAND_ALIASES: Record<string, string> = {
  "deletar": "remover",
  "apagar": "remover",
  "excluir": "remover",
  "delete": "remover",
};

export const GLOBAL_COMMAND_ALIASES: Record<string, string> = {
  "clear": "limpar",
  "cls": "limpar",
  "help": "ajuda",
}

export const COMMAND_ALIASES: Record<string, string> = {
  ...GLOBAL_COMMAND_ALIASES,
  ...CREATE_ALIASES,
  ...DONE_COMMAND_ALIASES,
  ...REMOVE_COMMAND_ALIASES,
};