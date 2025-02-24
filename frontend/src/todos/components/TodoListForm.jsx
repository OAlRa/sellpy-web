import { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useUpdateTodos } from '../../hooks/useUpdateTodos.ts'

export const TodoListForm = ({ todoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const { mutate, isPending } = useUpdateTodos(todoList.id, todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    mutate()
  }

  // Figure out to update the todos
  // Probably a good idea to copy the whole list and update it with the response.
  // Or add to it and fetch again with a query specific for that todoList.

  // Add just the items that we want to db
  // Make a new TodoDTO and give it ids when they're created and a createdAt to sort them.

  // jag vill endast lägga till de todos som har tillkommit.

  // if the lowest index of the added todos is equal or greater than the todos.length
  //
  // const checkNewTodos = (todos: string[]) => {
  //   if(todos.length === )
  // }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos?.map((name, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    // I only want to add the todos that have a
                    // higher index than the current length of todos
                    // This is why it's working on the fe
                    // Updating the value of the todos on the index we are currently on
                    // when mapping through the todos
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                  ])
                }}
              />
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
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              disabled={isPending}
              // immutable update
              onClick={() => {
                setTodos([...todos, ''])
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
