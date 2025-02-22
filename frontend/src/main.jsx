import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const root = createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
