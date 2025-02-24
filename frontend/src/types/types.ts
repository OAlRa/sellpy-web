export interface ITodoList {
  id: string
  title: string
  todos: ITodo[]
  allDone: boolean
  createdAt?: Date
}

export interface ITodo {
  id?: string
  done: boolean
  listId: string
  title: string
}
