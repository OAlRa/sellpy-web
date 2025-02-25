import { ErrorBoundary } from 'react-error-boundary'

const AppErrorBoundary = ({
  children,
  fallbackMessage = "Oops, something didn't go as planned",
}: {
  children: any
  fallbackMessage?: string
}) => (
  <ErrorBoundary fallback={<p style={{ color: 'red' }}>{fallbackMessage}</p>}>
    {children}
  </ErrorBoundary>
)

export default AppErrorBoundary
