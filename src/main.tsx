import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes'
import { DoctorsProvider } from './providers/DoctorsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DoctorsProvider>
      <RouterProvider router={router} />
    </DoctorsProvider>
  </React.StrictMode>,
)

