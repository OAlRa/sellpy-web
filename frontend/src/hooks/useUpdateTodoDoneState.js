import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTodoDoneState = (todoListId) => {
  return useMutation({
    mutationKey: ['updateTodo', todoListId],
    mutationFn: async (todoId) => {
      try {
        await axios.put(`http://localhost:3001/todos/${todoListId}/${todoId}`)
      } catch (error) {
        console.log('Something went wrong when updating a todo')
        throw error
      }
    },
  })
}
