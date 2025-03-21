import React from 'react'
import AdminLogout from '../components/AdminLogout'
import { Link } from 'react-router-dom'

const AdminSideBar = ({userCount}) => {
  return (
      <>
        <div className="w-1/4 bg-gray-800 text-white p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-4">USER-MANAGEMENT</h2>
        { userCount && <h2 className="text-lg mb-6">Total Users : {userCount} </h2>}
        <div className="flex flex-col gap-4">
            <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Dashboard</button>
            </Link>
            <AdminLogout/> 
        </div>
        </div>
      </>
  )
}

export default AdminSideBar