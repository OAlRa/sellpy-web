import { v4 as uuidv4 } from 'uuid'
import { todoLists } from '../db/db.ts'
import { NotFoundError } from '../errors/customErrors.ts'
import type { IRequestTodo } from '../types/request.ts'
import type { ITodoDTO, ITodoListDTO } from '../types/DTOs.ts'

export const findTodoList = (todoListId: string): ITodoListDTO => {
  const findTodoList = todoLists.find((list) => list.id === todoListId)
  if (!findTodoList) {
    throw new NotFoundError(`Todolist with id ${todoListId}`)
  }
  return findTodoList
}

export const isExistingTodo = (todo: IRequestTodo, todoList: ITodoListDTO): boolean => {
  if (!todo.id) return false
  if (!todoList.todos.find((dbTodo) => dbTodo.id === todo.id)) return false
  return true
}

export const handleUpdateTodo = (todo: IRequestTodo, todoList: ITodoListDTO): ITodoDTO => {
  const todoToUpdate = todoList.todos.find((dbTodo) => dbTodo.id === todo.id)
  return {
    ...todoToUpdate,
    done: todo.done,
    listId: todo.listId,
    title: todo.title,
  }
}

export const handleNewTodo = (todo: IRequestTodo, todoList: ITodoListDTO): ITodoDTO => {
  return {
    id: uuidv4(),
    title: todo.title,
    done: todo.done,
    listId: todoList.id,
    createdAt: new Date(),
  }
}
