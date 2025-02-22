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
  const [activeList, setActiveList] = useState<string>()
  // TODO
  const [, setTodoLists] = useState<{}>()
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
            {Object.keys(todos).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todos[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && todos[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todos[activeList]}
          saveTodoList={(id: string, { todos }: ITodoList) => {
            const listToUpdate: ITodoList = todos[id]
            setTodoLists({
              ...todos,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}
