import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRestrictedRoute = ({ children }) => {
    const admin = useSelector((state) => state.admin.admin)
    if (admin) {
        return <Navigate to ='/dashboard' />
    }
    return children
}

export default AdminRestrictedRoute