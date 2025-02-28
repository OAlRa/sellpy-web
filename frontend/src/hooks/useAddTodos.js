import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const handleAddTodos = async (todoListId, todos) => {
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

export const useAddTodos = (todoListId, todos) => {
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
