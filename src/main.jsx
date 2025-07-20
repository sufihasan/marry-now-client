import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Create a client for tanstack query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
