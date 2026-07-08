import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../../features/dashboard/ui/pages/Dashboard'
import { useDispatch } from 'react-redux'
import { currentLoggedEmployee } from '../../features/auth/state/auth/authAction'
import Public from '../layouts/protectedRoutes/Public'
import Protected from '../layouts/protectedRoutes/Protected'
import { commonRoutes } from './commonRoutes'

const router = createBrowserRouter([
    {
        path: "/auth",      
        element: <Public />,
        children: [
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/auth/login" replace />
                    },
                    {
                        path: "login",
                        element: <Login />

                    },
                    {
                        path: "register",
                        element: <Register />
                    }
                ]
            }
        ]
    },

    {
        path: "/home",
        element: <Protected />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: commonRoutes
            }
        ]
    }
])

const AppRoutes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      (()=> {
        dispatch(currentLoggedEmployee())
      })()
    }, [])

    return <RouterProvider router={router} />
}

export default AppRoutes