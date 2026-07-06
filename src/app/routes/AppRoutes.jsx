import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../../features/dashboard/ui/pages/Dashboard'

const AppRoutes = () => {

    let router = createBrowserRouter([
        {
            path: "/auth",
            element: <AuthLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        },

        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                {
                    path: "home",
                    element: <Dashboard />
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRoutes