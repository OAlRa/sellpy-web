import type { ITodoListDTO } from '../types/DTOs.ts'

export const todoLists: ITodoListDTO[] = [
  {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        id: '5319a868-cd81-4cc9-bd25-522a9a1a0e3c',
        title: 'First todo of first list',
        done: false,
        listId: '0000000001',
        createdAt: new Date(),
      },
    ],
    allDone: false,
    createdAt: new Date(),
  },
  {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        id: '9f869213-0789-4052-a066-a4a0094a5a00',
        title: 'First todo of second list',
        done: false,
        listId: '0000000002',
        createdAt: new Date(),
      },
    ],
    allDone: false,
    createdAt: new Date(),
  },
]
