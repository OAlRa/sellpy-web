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
import { TodoListForm } from './TodoListForm.tsx'
import { useFetchTodoLists } from '../../hooks/useFetchTodoLists.ts'
import { ITodoList } from '../../types/types.ts'
import AppErrorBoundary from '../../AppErrorBoundary.tsx'

export const TodoLists = ({ style }: { style: any }) => {
  const [activeList, setActiveList] = useState<ITodoList>()

  const {
    data: todoLists,
    isLoading: todoListsIsLoading,
    isError: todoListsIsError,
    error: todoListsError,
  } = useFetchTodoLists()

  if (todoListsIsLoading) return <p>Loading</p>
  if (todoListsIsError)
    return (
      <p>
        Error! Type: {todoListsError.name} Message: {todoListsError.message}
      </p>
    )
  if (todoLists === undefined) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <AppErrorBoundary>
            <List>
              {todoLists?.map((todoList) => (
                <ListItemButton key={todoList.id} onClick={() => setActiveList(todoList)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={todoList.title} />
                </ListItemButton>
              ))}
            </List>
          </AppErrorBoundary>
        </CardContent>
      </Card>
      <AppErrorBoundary>
        {activeList && <TodoListForm key={activeList.id} todoListId={activeList.id} />}
      </AppErrorBoundary>
    </Fragment>
  )
}
