import { useEffect, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'
import { useUpdateTodos } from '../../hooks/useUpdateTodos.ts'
import { ITodo, ITodoList } from '../../types/types.ts'

import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'

export const TodoListForm = ({ todoList }: { todoList: ITodoList }) => {
  const [todos, setTodos] = useState<ITodo[]>(todoList.todos)
  const { mutate, isPending } = useUpdateTodos(todoList.id, todos)
  const { showBoundary } = useErrorBoundary()

  const handleSubmit = (event) => {
    event.preventDefault()
    mutate()
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos?.map((todo, index) => {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ margin: '8px' }} variant='h6'>
                  {index + 1}
                </Typography>
                <TextField
                  sx={{
                    flexGrow: 1,
                    marginTop: '1rem',
                  }}
                  label='What to do?'
                  value={todo.title}
                  color={todo.done ? 'success' : 'primary'}
                  focused={todo.done ? true : false}
                  onChange={(event) => {
                    setTodos([
                      // immutable update
                      ...todos.slice(0, index),
                      { title: event.target.value, done: false, listId: todoList.id },
                      ...todos.slice(index + 1),
                    ])
                  }}
                />
                <Button
                  size='small'
                  color={todo.done ? 'success' : 'inherit'}
                  sx={{ margin: '8px' }}
                  onClick={() => {
                    setTodos([
                      ...todos.slice(0, index),
                      { ...todo, done: !todo.done },
                      ...todos.slice(index + 1),
                    ])
                  }}
                >
                  <DoneIcon />
                </Button>
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='secondary'
                  onClick={() => {
                    setTodos([
                      // immutable delete
                      ...todos.slice(0, index),
                      ...todos.slice(index + 1),
                    ])
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            )
          })}
          <CardActions>
            <Button
              type='button'
              color='primary'
              disabled={isPending}
              // immutable update
              onClick={() => {
                setTodos([...todos, { done: false, listId: todoList.id, title: '' }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
