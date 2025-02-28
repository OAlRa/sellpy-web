import { useEffect, useMemo, useState } from 'react'

import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'

import { useAddTodos } from '../../hooks/useAddTodos.js'
import { useFetchTodoListById } from '../../hooks/useFetchTodoListById.js'
import { useDeleteTodo } from '../../hooks/useDeleteTodo.js'
import { useUpdateTodoDoneState } from '../../hooks/useUpdateTodoDoneState.js'

export const TodoListForm = ({ todoListId }) => {
  const { data: todoList, isLoading, isError, error } = useFetchTodoListById(todoListId)

  const [todos, setTodos] = useState(todoList?.todos || [])

  useEffect(() => {
    if (todoList) {
      setTodos(todoList.todos)
    }
  }, [todoList])

  const { mutate: addTodosMutate, isPending: addTodosIsPending } = useAddTodos(todoList?.id, todos)
  const { mutate: deleteTodoMutate, isPending: deleteTodoIsPending } = useDeleteTodo(todoList?.id)
  const { mutate: updateTodoMutate, isPending: updateTodoIsPending } = useUpdateTodoDoneState(
    todoList?.id
  )

  const allDone = useMemo(() => todos?.every((todo) => todo.done), [todos])

  const handleSubmit = (event) => {
    event.preventDefault()
    addTodosMutate()
  }

  const handleDelete = (todoId, index) => {
    if (!todoId) {
      setTodos((prevTodos) => [...prevTodos.slice(0, index), ...prevTodos.slice(index + 1)])
      return
    }
    deleteTodoMutate(todoId, {
      onSuccess: () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
      },
      onError: (error) => {
        console.log(`Error deleting the todo. Message: ${error.message}`)
        // Toast Error
      },
    })
  }

  const toggleTodoState = (todos, index) => {
    const todoToUpdate = todos[index]
    return [
      ...todos.slice(0, index),
      { ...todoToUpdate, done: !todoToUpdate.done },
      ...todos.slice(index + 1),
    ]
  }

  const handleUpdateTodoDoneState = (todoId, index) => {
    if (!todoId) {
      setTodos((prevTodos) => toggleTodoState(prevTodos, index))
    } else {
      updateTodoMutate(todoId, {
        onSuccess: () => {
          setTodos((prevTodos) => toggleTodoState(prevTodos, index))
        },
        onError: () => {
          console.log('Something went wrong when updating the todo')
          // Toast Error
        },
      })
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        {allDone ? (
          <Typography sx={{ margin: '1rem 0' }} variant='h6'>
            All done! ✅ 👏
          </Typography>
        ) : (
          ''
        )}
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
                  disabled={updateTodoIsPending}
                  color={todo.done ? 'success' : 'inherit'}
                  sx={{ margin: '8px' }}
                  onClick={() => handleUpdateTodoDoneState(todo.id, index)}
                >
                  <DoneIcon />
                </Button>
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='secondary'
                  disabled={deleteTodoIsPending}
                  onClick={() => handleDelete(todo.id, index)}
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
              disabled={addTodosIsPending}
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
