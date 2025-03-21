import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
    const admin = useSelector((state) => state.admin.admin)
    if (!admin) {
        return <Navigate to ='/' />
    }
  return children
}

export default AdminProtectedRoute