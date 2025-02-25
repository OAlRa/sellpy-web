import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppErrorBoundary from './AppErrorBoundary'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root'))
root.render(
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppErrorBoundary>
)
