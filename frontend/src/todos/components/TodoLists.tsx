import { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm.jsx'
import { useFetchTodoLists } from '../../hooks/useFetchTodoLists.ts'
import { ITodoList } from '../../types/types.ts'

export const TodoLists = ({ style }: { style: any }) => {
  const [activeList, setActiveList] = useState<ITodoList>()

  const {
    data: todos,
    isLoading: todosIsLoading,
    isError: todosIsError,
    error: todosError,
  } = useFetchTodoLists()

  if (todosIsLoading) return <p>Loading</p>
  if (todosIsError) return <p>Error</p>
  if (todos === undefined) return null

  if (!Object.keys(todos).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todos?.map((todo) => (
              <ListItemButton key={todo.id} onClick={() => setActiveList(todo)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todo.title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && <TodoListForm key={activeList.id} todoList={activeList} />}
    </Fragment>
  )
}
