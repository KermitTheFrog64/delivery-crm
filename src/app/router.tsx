import { createBrowserRouter } from 'react-router-dom'
import {
    CourierPage,
    HomePage,
    ClientPage,
    DispatcherPage,
    AdminPage,
    EmployeesPage,
    DeliveryPage,
    LogInPage,
    SignUpPage,
    ClientInfoPage
} from '../pages'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <LogInPage />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '/courier',
        element: <CourierPage />,
    },
    {
        path: '/client',
        element: <ClientPage />
    },
    {
        path: '/client/personalinfo',
        element: <ClientInfoPage />
    },
    {
        path: '/dispatcher',
        element: <DispatcherPage />
    },
    {
        path: '/admin',
        element: <AdminPage />
    },
    {
        path: '/admin/employees',
        element: <EmployeesPage />
    },
    {
        path: '/deliveries/:id',
        element: <DeliveryPage />
    }
])

export default router