import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteTodo = (todoListId: string) => {
  return useMutation({
    mutationKey: ['deleteTodo', todoListId],
    mutationFn: async (todoId: string) => {
      try {
        await axios.delete(`http://localhost:3001/todos/${todoListId}/${todoId}`)
      } catch (error) {
        console.log('Error deleting the item')
        throw error
      }
    },
  })
}
