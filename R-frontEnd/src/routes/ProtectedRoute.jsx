import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.users.users)
    if (!user) {
        return <Navigate to="/"/> //component
    }
    return  children
}

export default ProtectedRoute