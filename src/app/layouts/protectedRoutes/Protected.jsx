import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const Protected = () => {
    let { employee, isLoading } = useSelector((state) => state.auth)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!employee) {
        return <Navigate to="/auth/login" />
    }

    return <Outlet />
}

export default Protected