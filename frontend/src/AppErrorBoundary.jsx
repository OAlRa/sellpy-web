import { ErrorBoundary } from 'react-error-boundary'

const AppErrorBoundary = ({
  children,
  fallbackMessage = "Oops, something didn't go as planned",
}) => (
  <ErrorBoundary fallback={<p style={{ color: 'red' }}>{fallbackMessage}</p>}>
    {children}
  </ErrorBoundary>
)

export default AppErrorBoundary
