import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useFetchTodoListById = (id) => {
  return useQuery({
    queryKey: ['todoList', id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/todos/todoList/${id}`)
        return data
      } catch (error) {
        console.log('Error when fetching todo list')
        throw error
      }
    },
  })
}
