import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ITodoList } from '../types/types'

export const useFetchTodoListById = (id: string) => {
  return useQuery({
    queryKey: ['todoList', id],
    queryFn: async () => {
      try {
        const { data } = await axios.get<ITodoList>(`http://localhost:3001/todos/todoList/${id}`)
        return data
      } catch (error) {
        console.log('Error when fetching todo list')
        throw error
      }
    },
  })
}
