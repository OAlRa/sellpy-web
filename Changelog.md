# Changelog

### Points of interest

#### Changed from CRA to vite

A lot of dependencies are hiding under the hood when working with create-react-app. I chose to eject the app and refactor it to not work with the sunsetted CRA but rather the community supported vite.

### Changed the db structure

The string key is redundant since we have the same value in the id
From Record<[key: string]: {id: string, title: string, todos: string[], createdAt?: Date}>

### Introducing react-query

The lib is being used to fetch data from the server as well as mutate/update it.
We're using invalidateQueris when the POST request is finished for updating todos on a todo list. This will make react query drop its cache and refetch the updated data from the server.

### API approach

Refactored the approach to be less reliant on the save button functionality. The delete icon and check icon handles functionality to delete/update todos. If a todo is not saved to the db it will only update the component state. If it is previously saved in the db it will update the db and update then update the state if the network operation was successful.

The save button saves new todos and updates existing todos.
