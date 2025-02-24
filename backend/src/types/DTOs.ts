export interface ITodoListDTO {
  id: string
  title: string
  todos: ITodoDTO[]
  allDone: boolean
  createdAt?: Date
}

export interface ITodoDTO {
  id: string
  title: string
  listId: string
  done: boolean
  createdAt?: Date
}
