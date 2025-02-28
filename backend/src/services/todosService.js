import { v4 as uuidv4 } from 'uuid'
import { todoLists } from '../db/db.js'
import { NotFoundError } from '../errors/customErrors.js'

export const findTodoList = (todoListId) => {
  const findTodoList = todoLists.find((list) => list.id === todoListId)
  if (!findTodoList) {
    throw new NotFoundError(`Todolist with id ${todoListId}`)
  }
  return findTodoList
}

export const isExistingTodo = (todo, todoList) => {
  if (!todo.id) return false
  if (!todoList.todos.find((dbTodo) => dbTodo.id === todo.id)) return false
  return true
}

export const handleUpdateTodo = (todo, todoList) => {
  const todoToUpdate = todoList.todos.find((dbTodo) => dbTodo.id === todo.id)
  return {
    ...todoToUpdate,
    done: todo.done,
    listId: todo.listId,
    title: todo.title,
  }
}

export const handleNewTodo = (todo, todoList) => {
  return {
    id: uuidv4(),
    title: todo.title,
    done: todo.done,
    listId: todoList.id,
    createdAt: new Date(),
  }
}
