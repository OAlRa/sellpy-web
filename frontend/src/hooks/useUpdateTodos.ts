import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ITodo } from '../types/types'

const handleUpdateTodos = async (todoListId: string, todos: ITodo[]) => {
  try {
    const { data } = await axios.put(`http://localhost:3001/todos/${todoListId}`, { todos })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
    }
    console.log('Something went wrong when updating the todos for')
  }
}

// TODO
// Consider having Todo be its own entry in DB
export const useUpdateTodos = (todoListId: string, todos: ITodo[]) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTodos', todoListId],
    mutationFn: () => handleUpdateTodos(todoListId, todos),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // TODO
        // REFACTOR
        // Only invalidate the selected todo list
        queryKey: ['todoLists'],
      })
    },
  })
}
