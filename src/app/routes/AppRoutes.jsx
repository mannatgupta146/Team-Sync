import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../../features/dashboard/ui/pages/Dashboard'
import { useDispatch } from 'react-redux'
import { currentLoggedEmployee } from '../../features/auth/state/auth/authAction'

const AppRoutes = () => {

    const dispatch = useDispatch()

    useEffect(() => {
      (()=> {
        dispatch(currentLoggedEmployee())
      })()
    }, [])
    

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