import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const Public = () => {
    let { employee, isLoading } = useSelector((state) => state.auth)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (employee) {
        return <Navigate to="/home" />
    }

    return <Outlet />
}

export default Public