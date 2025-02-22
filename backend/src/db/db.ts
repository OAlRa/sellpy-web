export interface ITodoList {
  id: string
  title: string
  todos: string[]
}

export const todoLists: Record<string, ITodoList> = {
  // TODO
  // Remove the key?
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: ['First todo of first list!'],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: ['First todo of second list!'],
  },
}
