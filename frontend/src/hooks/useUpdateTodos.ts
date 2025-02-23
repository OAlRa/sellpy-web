import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const handleUpdateTodos = async (id: string, todos: string[]) => {
  try {
    const { data } = await axios.put(`http://localhost:3001/todos/${id}`, { todos })
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
export const useUpdateTodos = (id: string, todos: string[]) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTodos', id],
    mutationFn: () => handleUpdateTodos(id, todos),
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
