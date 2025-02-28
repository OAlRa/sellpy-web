import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ITodo } from '../types/types'

const handleAddTodos = async (todoListId: string, todos: ITodo[]) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/todos/${todoListId}`, { todos })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
    }
    console.log('Something went wrong when adding the todos')
  }
}

export const useAddTodos = (todoListId: string, todos: ITodo[]) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTodos', todoListId],
    mutationFn: () => handleAddTodos(todoListId, todos),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todoList', todoListId],
      })
    },
  })
}
