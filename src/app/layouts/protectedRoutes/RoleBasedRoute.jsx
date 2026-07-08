import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const RoleBasedRoute = ({ allowedRoles }) => {

    const { employee } = useSelector((state) => state.auth)

    if(!allowedRoles.includes(employee.role)){
        return <Navigate to={"/unauthorized"} />
    }

    return <Outlet />
}

export default RoleBasedRoute