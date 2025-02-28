import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const handleFetchTodoLists = async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/todos')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
    }
    console.log(`Something went wrong in when fetching todos`)
    throw error
  }
}

export const useFetchTodoLists = () => {
  return useQuery({
    queryKey: ['todoLists'],
    queryFn: handleFetchTodoLists,
  })
}
