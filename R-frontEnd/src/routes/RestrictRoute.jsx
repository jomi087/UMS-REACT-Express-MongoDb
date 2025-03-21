import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RestrictRoute = ({ children }) => {
    const user = useSelector((state) => state.users.users)
    
    if (user) {
        return <Navigate to="/home"/> 
    }
    return  children
}

export default RestrictRoute