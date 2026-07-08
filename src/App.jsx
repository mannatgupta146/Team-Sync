import React from 'react'
import AppRoutes from './app/routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'rgba(18, 15, 29, 0.95)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            padding: '16px 24px',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '0.02em',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          },
          success: {
            iconTheme: {
              primary: '#a855f7',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#fff',
            },
          },
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App