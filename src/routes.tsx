import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { DoctorListPage } from './screens/DoctorListPage'
import { DoctorDetailPage } from './screens/DoctorDetailPage'
import { AppointmentsPage } from './screens/AppointmentsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DoctorListPage /> },
      { path: 'doctor/:id', element: <DoctorDetailPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

